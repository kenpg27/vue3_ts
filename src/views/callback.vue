<template>
  <div>Vue3 Composition API中的提取和重用逻辑</div>
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