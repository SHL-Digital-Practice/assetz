import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~/types/database.types";

export default defineEventHandler(async (event) => {
  const { payload } = await readBody(event);

  if (payload.event.event_name !== "commit_create")
    return { message: "skipped" };

  const commit = payload.event.data.commit;
  const { objectId, projectId, versionId, modelId, streamId } = commit;

  const data = await GqlGetRevitTypes({
    objectId,
    streamId,
  });

  const assets =
    (data.stream?.object?.children.objects as any[]).map<
      Database["public"]["Tables"]["assets"]["Insert"]
    >((obj: any) => {
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

  const db = await serverSupabaseClient<Database>(event);

  const result = await db.from("assets").insert(assets);

  console.log(result);

  return {
    message: "success",
  };
});
