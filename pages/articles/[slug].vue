<script setup lang="ts">
const { locale, t } = useI18n()
const route = useRoute()
const config = useRuntimeConfig()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const slug = computed(() => String(route.params.slug))

const { data: article } = await useAsyncData(
  () => `article:${locale.value}:${slug.value}`,
  () =>
    queryCollection('articles')
      .where('locale', '=', locale.value)
      .where('slug', '=', slug.value)
      .first(),
  {
    watch: [locale, slug]
  }
)

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

const canonicalPath = localePath(route.path)

useSeoMeta({
  title: () => article.value?.title ?? t('siteName'),
  ogTitle: () => article.value?.title ?? t('siteName'),
  description: () => article.value?.description,
  ogDescription: () => article.value?.description,
  ogImage: () => article.value?.image,
  ogType: 'article',
  twitterCard: 'summary_large_image'
})

useHead(() => ({
  htmlAttrs: {
    lang: locale.value === 'zh' ? 'zh-Hant' : locale.value === 'ko' ? 'ko-KR' : 'en-US'
  },
  link: [
    { rel: 'canonical', href: `${config.public.siteUrl}${canonicalPath}` },
    { rel: 'alternate', hreflang: 'zh-Hant', href: `${config.public.siteUrl}${switchLocalePath('zh')}` },
    { rel: 'alternate', hreflang: 'en-US', href: `${config.public.siteUrl}${switchLocalePath('en')}` },
    { rel: 'alternate', hreflang: 'ko-KR', href: `${config.public.siteUrl}${switchLocalePath('ko')}` }
  ]
}))

/* 瀏覽器顯示圖片大致經過：

下載圖片檔案
解碼圖片（JPEG、PNG、WebP 等格式轉成像素）
繪製到畫面上

其中 解碼（Decode） 是需要消耗 CPU 的。

如果圖片很大，或同時載入很多圖片，瀏覽器可能會暫停畫面更新，造成：

頁面卡頓（jank）
首次渲染延遲
滾動不流暢

decoding="async" 可以提升頁面流暢度，不阻塞主執行緒

*/
</script>

<template>
  <article v-if="article" class="article-page">
    <NuxtLinkLocale to="/" class="back-link">{{ t('backToHome') }}</NuxtLinkLocale>
    <header class="article-hero">
      <div>
        <time :datetime="article.date">{{ article.date }}</time>
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
      </div>
      <img :src="article.image" :alt="article.title" loading="eager" decoding="async" />
    </header>

    <ContentRenderer class="prose" :value="article" />
  </article>
</template>
