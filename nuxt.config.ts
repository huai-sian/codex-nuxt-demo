export default defineNuxtConfig({
  modules: ["@nuxt/content", "@nuxtjs/i18n", "@element-plus/nuxt"],
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  compatibilityDate: "2026-06-24",
  app: {
    head: {
      htmlAttrs: { lang: "zh-Hant" },
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#ffffff" },
      ],
      link: [{ rel: "icon", href: "/favicon.ico" }],
    },
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://example.com",
    },
  },
  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
          searchDepth: 3,
        },
      },
    },
  },
  i18n: {
    strategy: "prefix_except_default",
    defaultLocale: "zh",
    langDir: "locales",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "site_locale",
      redirectOn: "root",
    },
    locales: [
      {
        code: "zh",
        name: "中文",
        language: "zh-Hant",
        file: "zh.ts",
      },
      {
        code: "en",
        name: "English",
        language: "en-US",
        file: "en.ts",
      },
      {
        code: "ko",
        name: "한국어",
        language: "ko-KR",
        file: "ko.ts",
      },
    ],
  },
});
