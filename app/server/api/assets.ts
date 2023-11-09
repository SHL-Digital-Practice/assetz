import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~/types/database.types";

export default defineEventHandler(async (event) => {
  const db = await serverSupabaseClient<Database>(event);

  const query = getQuery(event);
  const page = query.page ? (query.page as number) : 0;

  const { data, error, count } = await db
    .from("assets")
    .select("*", { count: "exact" })
    .range(page * 8, (page + 1) * 8);

  return data;
});
