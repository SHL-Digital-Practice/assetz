import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~/types/database.types";

export default defineEventHandler(async (event) => {
  const db = await serverSupabaseClient<Database>(event);
  const query = getQuery(event);
  const id = query.id as string;
  if (!id) {
    throw new Error("Missing id query parameter.");
  }

  const { data, error } = await db
    .from("assets")
    .select()
    .eq("id", id)
    .single();

  return data;
});
