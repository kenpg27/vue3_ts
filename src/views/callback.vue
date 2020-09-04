<template>
  <div>
    Vue3 Composition API中的提取和重用逻辑
    <span>
      vue3.0与react的比较：
      同样的逻辑组合、复用能力
      composition api 的 setup() 只会调用一次，相比与react hooks
      符合js 直觉
      没有闭包变量问题
      不会在每次渲染时重复执行，降低垃圾回收的压力；
      不存在内联回调导致子组件永远更新的问题
      不存在忘记记录依赖的问题，也不需要“useEffect”和“useMemo”并传入依赖数组以捕获过时的变量。Vue 的自动依赖跟踪可以确保侦听器和计算值总是准确无误。
    </span>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import { useSearchLogic } from "./searchLogin";
export default {
  setup() {
    const { textArr, searchKey, searchText } = useSearchLogic();
    return {
      textArr,
      searchKey,
      searchText,
    };
  },
};
</script>

<style>
</style>