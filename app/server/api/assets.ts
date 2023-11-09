import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/types/database.types";

export default defineEventHandler(async (event) => {
  const db = await serverSupabaseClient<Database>(event);

  const { data, error, count } = await db
    .from("assets")
    .select("*", { count: "exact" })
    .limit(9);

  return data;
});
