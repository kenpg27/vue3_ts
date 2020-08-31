<template>
  <div>
    <h1>Vue3.0-upload调用</h1>
    <k-uploader :fileList="fileList" title="vue3.0组件上传"></k-uploader>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
import KUploader from "../components/Uploader/Uploader.vue";

// 附件对象接口
interface IFile {
  url: string;
}
export default {
  components: {
    KUploader,
  },
  setup() {
    const activeId = ref<number | null>(null);
    // 默认附件数据
    const fileList = reactive<Array<IFile>>([
      {
        url: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
      },
      {
        url: "https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg",
      },
      {
        url: "https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg",
      },
    ]);
    return {
      fileList,
      activeId,
    };
  },
};
</script>

<style>
</style>