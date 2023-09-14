import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  console.log("event", event);
  console.log("context", context);
  return { statusCode: 200, body: JSON.stringify({ hello: "world" }) };
};

export { handler };
