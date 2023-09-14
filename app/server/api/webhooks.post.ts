export default defineEventHandler(async (event) => {
  const { payload } = await readBody(event);
  // Parse webhook payload
  if (payload.event.event_name !== "commit_create")
    return { message: "skipped" };

  // Get commit from payload
  const commit = payload.event.data.commit;
  const objectId = commit.objectId;
  const streamId = commit.streamId;

  // Get assets from commit
  const data = await GqlGetFurnitures({
    objectId,
    streamId,
    myQuery: [
      {
        field: "speckle_type",
        value:
          "Objects.BuiltElements.Revit.RevitElementType:Objects.BuiltElements.Revit.RevitSymbolElementType",
        operator: "=",
      },
    ],
  });

  // Create assets in database
  interface Asset {
    id: string;
    name: string;
    cost?: number | null;
    category: string;
    projectId: string;
  }

  const assets =
    data.stream?.object?.children.objects.map<Asset>((obj) => {
      const id = obj?.data["id"];
      const familyName = obj?.data["family"];
      const typeName = obj?.data["type"];
      const category = obj?.data["category"];

      let assetName: string =
        familyName === typeName ? familyName : familyName + ":" + typeName;

      const asset: Asset = {
        id,
        name: assetName,
        category,
        projectId: streamId,
      };

      return asset;
    }) || [];

  const queryTotalCount = data.stream?.object?.children.totalCount;
  const assetsCount = assets?.length;
  if (queryTotalCount !== assetsCount) {
    console.warn(
      "Query total count and assets parsed count do not match, implement pagination query more."
    );
  }

  return {
    message: "success",
  };
});
