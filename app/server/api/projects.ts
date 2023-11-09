import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/types/database.types";

export default defineEventHandler(async (event) => {
  const db = await serverSupabaseClient<Database>(event);

  const { data: allAssetsProjectId } = await db
    .from("assets")
    .select("project_id");

  if (!allAssetsProjectId) {
    return [];
  }

  const uniqueProjectIds = [
    ...new Set(allAssetsProjectId.map((x) => x.project_id)),
  ];

  return uniqueProjectIds;
});
