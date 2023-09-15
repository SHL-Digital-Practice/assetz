// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["nuxt-graphql-client", "@nuxtjs/supabase"],
  nitro: {
    preset: "netlify",
  },
  sourcemap: {
    server: true,
    client: true,
  },
  runtimeConfig: {
    public: {
      GQL_HOST: "https://speckle.xyz/graphql",
    },
  },
  typescript: {
    shim: false,
  },
});
