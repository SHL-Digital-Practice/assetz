// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@nuxtjs/supabase",
    "nuxt-graphql-client",
  ],
  supabase: {
    redirect: false,
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
});
