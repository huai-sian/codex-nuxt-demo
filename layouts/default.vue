<script setup lang="ts">
const { locale, locales, setLocale, t } = useI18n()

const availableLocales = computed(() =>
  locales.value.map((item) => (typeof item === 'string' ? { code: item, name: item } : item))
)

const switchLanguage = (value: string | number | boolean | undefined) => {
  if (value === 'zh' || value === 'en' || value === 'ko') {
    setLocale(value)
  }
}
</script>

<template>
  <ElContainer class="site-shell">
    <ElHeader class="site-header" height="72px">
      <NuxtLinkLocale to="/" class="brand" aria-label="Home">
        <span class="brand-mark">N</span>
        <span>{{ t('siteName') }}</span>
      </NuxtLinkLocale>

      <nav class="header-actions" :aria-label="t('language')">
        <ElSegmented
          :model-value="locale"
          :options="availableLocales.map((item) => ({ label: item.name, value: item.code }))"
          @update:model-value="switchLanguage"
        />
      </nav>
    </ElHeader>

    <ElMain class="site-main">
      <slot />
    </ElMain>

    <ElFooter class="site-footer" height="auto">
      <span>{{ t('footer') }}</span>
    </ElFooter>
  </ElContainer>
</template>
