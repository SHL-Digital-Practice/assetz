export default defineEventHandler((event) => {
  console.log(event);
  return {
    hello: "world",
  };
});
