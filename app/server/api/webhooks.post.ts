import { Database } from "~/types/database.types";

export default defineEventHandler(async (event) => {
  const { payload } = await readBody(event);
  // Parse webhook payload
  if (payload.event.event_name !== "commit_create")
    return { message: "skipped" };

  // Get commit from payload
  const commit = payload.event.data.commit;
  const { objectId, projectId, versionId, modelId } = commit;

  console.log(JSON.stringify(commit));

  // Get assets from commit
  const data = await GqlGetFurnitures({
    objectId,
    streamId: modelId,
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

  const assets =
    data.stream?.object?.children.objects.map<
      Database["public"]["Tables"]["assets"]["Insert"]
    >((obj) => {
      const id = obj?.data["id"];
      const familyName = obj?.data["family"];
      const typeName = obj?.data["type"];
      const category = obj?.data["category"];

      let assetName: string =
        familyName === typeName ? familyName : familyName + ":" + typeName;

      return {
        model_id: modelId,
        project_id: projectId,
        version_id: versionId,
        speckle_id: id,
        name: assetName,
        category: category,
      };
    }) || [];

  const db = useSupabaseClient<Database>();
  const result = await db.from("assets").insert(assets);

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
