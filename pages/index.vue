<script setup lang="ts">
const { locale, t } = useI18n();
const route = useRoute();
const config = useRuntimeConfig();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
const search = ref("");
const activeLocale = locale.value;

const { data: articles } = await useAsyncData(
  `articles:${activeLocale}`,
  () =>
    queryCollection("articles")
      .where("locale", "=", activeLocale)
      .order("date", "DESC")
      .all(),
  {
    default: () => [],
    immediate: true,
  },
);

const filteredArticles = computed(() => {
  const keyword = search.value.trim().toLowerCase();
  const list = articles.value ?? [];

  if (!keyword) {
    return list;
  }

  return list.filter((article) => {
    const haystack = [
      article.title,
      article.description,
      article.tags?.join(" "),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(keyword);
  });
});

const canonicalPath = localePath(route.path);
const title = computed(() => t("homeSeoTitle"));
const description = computed(() => t("homeSeoDescription"));

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogType: "website",
  twitterCard: "summary_large_image",
});

useHead(() => ({
  htmlAttrs: {
    lang:
      locale.value === "zh"
        ? "zh-Hant"
        : locale.value === "ko"
        ? "ko-KR"
        : "en-US",
  },
  link: [
    { rel: "canonical", href: `${config.public.siteUrl}${canonicalPath}` },
    {
      rel: "alternate",
      hreflang: "zh-Hant",
      href: `${config.public.siteUrl}${switchLocalePath("zh")}`,
    },
    {
      rel: "alternate",
      hreflang: "en-US",
      href: `${config.public.siteUrl}${switchLocalePath("en")}`,
    },
    {
      rel: "alternate",
      hreflang: "ko-KR",
      href: `${config.public.siteUrl}${switchLocalePath("ko")}`,
    },
  ],
}));
</script>

<template>
  <section class="hero">
    <div class="hero-copy">
      <p class="eyebrow">{{ t("eyebrow") }}</p>
      <h1>{{ t("headline") }}</h1>
      <p>{{ t("intro") }}</p>
    </div>
    <div class="search-panel">
      <ElInput
        v-model="search"
        size="large"
        clearable
        :placeholder="t('searchPlaceholder')"
        :aria-label="t('search')"
      />
    </div>
  </section>

  <section class="article-grid" :aria-label="t('articleList')">
    <article
      v-for="article in filteredArticles"
      :key="article.id"
      class="article-card"
    >
      <NuxtLinkLocale :to="`/articles/${article.slug}`" class="article-link">
        <img
          :src="article.image"
          :alt="article.title"
          loading="lazy"
          decoding="async"
        />
        <div class="article-body">
          <time :datetime="article.date">{{ article.date }}</time>
          <h2>{{ article.title }}</h2>
          <p>{{ article.description }}</p>
          <div class="tag-row">
            <ElTag
              v-for="tag in article.tags"
              :key="tag"
              size="small"
              effect="plain"
            >
              {{ tag }}
            </ElTag>
          </div>
        </div>
      </NuxtLinkLocale>
    </article>

    <ElEmpty
      v-if="filteredArticles.length === 0"
      :description="t('noResults')"
    />
  </section>
</template>
