export default defineEventHandler((event) => {
  console.log(JSON.stringify(event));
  return {
    hello: "world",
  };
});
