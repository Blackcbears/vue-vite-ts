import { useTimeoutFn } from "@/hooks/core/useTimeout";
import { useBreakpoint } from "@/hooks/event/useBreakpoint";
import { useEventListener } from "@/hooks/event/useEventListener";

import echarts from "@/utils/lib/echarts";
import { tryOnUnmounted, useDebounceFn } from "@vueuse/core";
import type { EChartsOption } from "echarts";
import type { Ref } from "vue";
import { computed, nextTick, ref, unref, watch } from "vue";

// import { useRootSetting } from '@/hooks/setting/useRootSetting';
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}
export function useECharts(
  elRef: Ref<HTMLDivElement>,
  theme: "light" | "dark" | "default" = "light"
) {
  const getDarkMode = "light";
  let chartInstance: echarts.ECharts | null = null;
  let resizeFn: Fn = resize;
  const cacheOptions = ref<EChartsOption>({});
  let removeResizeFn: Fn = () => {};

  resizeFn = useDebounceFn(resize, 200);

  const getOptions = computed((): EChartsOption => {
    return {
      backgroundColor: "transparent",
      ...cacheOptions.value,
    };
  });

  function initCharts(t = theme) {
    const el = unref(elRef);
    if (!el || !unref(el)) {
      return;
    }

    chartInstance = echarts.init(el, t);
    const { removeEvent } = useEventListener({
      el: window,
      name: "resize",
      listener: resizeFn,
    });
    removeResizeFn = removeEvent;
    const { widthRef, screenEnum } = useBreakpoint();
    if (unref(widthRef) <= screenEnum.MD || el.offsetHeight === 0) {
      useTimeoutFn(() => {
        resizeFn();
      }, 30);
    }
  }

  function setOptions(options: EChartsOption, clear = true) {
    cacheOptions.value = options;
    if (unref(elRef)?.offsetHeight === 0) {
      useTimeoutFn(() => {
        setOptions(unref(getOptions));
      }, 30);
      return;
    }
    nextTick(() => {
      useTimeoutFn(() => {
        if (!chartInstance) {
          initCharts(getDarkMode.value as "default");

          if (!chartInstance) {
            return;
          }
        }
        clear && chartInstance?.clear();

        chartInstance?.setOption(unref(getOptions));
      }, 30);
    });
  }

  function resize() {
    chartInstance?.resize();
  }

  watch(
    () => getDarkMode.value,
    (theme) => {
      if (chartInstance) {
        chartInstance.dispose();
        initCharts(theme as "default");
        setOptions(cacheOptions.value);
      }
    }
  );

  tryOnUnmounted(() => {
    if (!chartInstance) {
      return;
    }
    removeResizeFn();
    chartInstance.dispose();
    chartInstance = null;
  });

  function getInstance(): echarts.ECharts | null {
    if (!chartInstance) {
      initCharts(getDarkMode.value as "default");
    }
    return chartInstance;
  }

  return {
    setOptions,
    resize,
    echarts,
    getInstance,
  };
}
