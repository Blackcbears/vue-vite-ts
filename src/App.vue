<template>
  <n-config-provider
    :locale="zhCN"
    :theme="getDarkTheme"
    :theme-overrides="getThemeOverrides"
    :date-locale="dateZhCN"
  >
    <AppProvider>
      <RouterView />
    </AppProvider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { AppProvider } from "@/components/Application";
import { useDesignSettingStore } from "@/store/modules/designSetting";
import { lighten } from "@/utils";
import { darkTheme, dateZhCN, zhCN } from "naive-ui";
import { computed } from "vue";

const designStore = useDesignSettingStore();

/**
 * @type import('naive-ui').GlobalThemeOverrides
 */
const getThemeOverrides = computed(() => {
  const appTheme = designStore.appTheme;
  const lightenStr = lighten(designStore.appTheme, 6);
  return {
    common: {
      primaryColor: appTheme,
      primaryColorHover: lightenStr,
      primaryColorPressed: lightenStr,
    },
    LoadingBar: {
      colorLoading: appTheme,
    },
  };
});
const getDarkTheme = computed(() =>
  designStore.darkTheme ? darkTheme : undefined
);
</script>

<style lang="sass"></style>
