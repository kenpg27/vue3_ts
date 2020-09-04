<template>
  <div>
    <h1>Vue3.0-ts-upload</h1>
    <k-uploader
      :files="fileList"
      title="vue3.0_ts_组件上传"
      @on-change="onChange"
      @on-success="onSuccess"
      @on-error="onError"
      :limit="limit"
    ></k-uploader>
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
    let fileList = reactive<Array<IFile>>([
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

    const onSuccess = (res: IFile) => {
      console.log(res);
      console.log("success");
    };
    const onError = (res: IFile) => {
      console.log(res);
      console.log("error");
    };
    const onChange = (res: IFile[]) => {
      console.log(res);
      console.log("change");
    };
    const limit = ref(4);
    setTimeout(() => {
      limit.value = 9;
      fileList = [
        {
          url:
            "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
        },
        {
          url:
            "https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg",
        },
      ];
    }, 3000);
    return {
      fileList,
      activeId,
      onSuccess,
      onError,
      onChange,
      limit,
    };
  },
};
</script>

<style>
</style>