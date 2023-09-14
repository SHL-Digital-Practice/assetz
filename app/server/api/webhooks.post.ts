export default defineEventHandler(async (event) => {
  const { payload } = await readBody(event);
  // Parse webhook payload
  if (payload.event.event_name !== "commit_create")
    return { message: "skipped" };

  // Get commit from payload
  const commit = payload.event.data.commit;
  const commitObjectId = commit.objectId;

  // Get assets from commit
  GqlTest();

  // Update assets database
  return {
    message: "success",
  };
});
