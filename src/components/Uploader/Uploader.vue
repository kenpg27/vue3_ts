<template>
  <div class="k-uploader">
    <div class="k-uploader_hd">
      <div class="k-uploader_title">{{ title }}</div>
      <div class="k-uploader_info">{{ fileList.length }} / {{ limit }}</div>
    </div>
    <div class="k-uploader_bd">
      <ul class="k-uploader_files">
        <li
          :class="{
              'k-uploader_file': true,
              'k-uploader_file-status': !!item.fetchStatus && item.fetchStatus !== 'success'
            }"
          v-for="(item, index) in fileList"
          :key="index"
          :style="{
              backgroundImage: `url(${item.url})`
            }"
          @click="handleFileClick($event, item, index)"
        >
          <div
            v-if="!!item.fetchStatus && item.fetchStatus !== 'success'"
            class="k-uploader_file-content"
          >
            {{ item.fetchStatus === 'progress' ? item.progress + '%' : '' }}
            <!-- progress !== 0 && progress < 100 -->
            <i v-if="item.fetchStatus === 'fail'" class="upload-error"></i>
          </div>
        </li>
      </ul>
      <div class="k-uploader_input-box" v-show="fileList.length < limit && !readonly">
        <input
          class="k-uploader_input"
          ref="input"
          type="file"
          name="uploadInput"
          accept="image/*"
          :capture="capture"
          :multiple="multiple"
          @change="handleChange"
        />
      </div>
    </div>
    <div class="k-uploader_previewer" id="previewer" v-if="previewVisible">
      <div
        ref="previewerImg"
        class="k-uploader_preview-img"
        id="previewerImg"
        @click="hidePreviewer"
      ></div>
      <div class="k-uploader_del" v-if="!readonly" @click="deleteImg"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, onMounted, onUpdated, onUnmounted } from "vue";
import { handleFile, transformCoordinate, dataURItoBlob } from "./utils";
// 文件信息接口
interface IFile {
  url: string;
}
interface IFileItem {
  url: string;
  blob: any;
}
// input接口
interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
export default {
  name: "Uploader",
  props: {
    title: {
      type: String,
      default: "图片上传",
    },
    files: {
      type: Array, //初始化数据源
      default: () => [],
    },
    limit: {
      type: Number, //限制上传图片个数
      default: 5,
    },
    capture: {
      type: Boolean, //是否只选择调用相机
      default: false,
    },
    enableCompress: {
      type: Boolean, //是否压缩
      default: true,
    },
    maxWidth: {
      type: Number, //图片压缩最大宽度
      default: 1024,
    },
    quality: {
      type: Number, //图片压缩率
      default: 0.9,
    },
    url: {
      type: String, //上传服务器url
      default: "",
    },
    params: {
      type: Object, //上传文件时携带的自定义参数
    },
    name: {
      type: String, //上传文件时FormData的Key，默认为file
      default: "file",
    },
    autoUpload: {
      type: Boolean, //是否自动开启上传
      default: true,
    },
    multiple: {
      type: Boolean, //是否支持多选, `false`为不支持
      default: "",
    },
    readonly: {
      type: Boolean, //只读模式（隐藏添加和删除按钮）
      default: false,
    },
  },
  setup(props, context) {
    const { limit, title, files, readonly } = props;
    // 待上传文件
    const fileList: object[] = reactive([]);
    // 预览开关
    let previewVisible = ref(false);
    // 当前预览的图片序号
    let currentIndex = ref(0);
    // 文件变更操作
    const handleChange = (event: HTMLInputEvent): void => {
      const { enableCompress, maxWidth, quality, autoUpload } = props;
      const target = event.target || event.srcElement;
      const inputChangeFiles: [] | any = target.files;
      console.log("files", inputChangeFiles);
      if (inputChangeFiles.length <= 0) {
        // 调用取消
        return;
      }
      const fileCount = fileList.length + inputChangeFiles.length;
      if (fileCount > limit) {
        alert(`不能上传超过${limit}张图片`);
        return;
      }

      // 执行操作
      Promise.all(
        Array.prototype.map.call(inputChangeFiles, (file) => {
          return handleFile(file, {
            maxWidth,
            quality,
            enableCompress,
          }).then((blob) => {
            const blobURL = URL.createObjectURL(blob);
            const fileItem: any = <IFileItem>{
              url: blobURL,
              blob,
            };
            for (let key in file) {
              if (["slice", "webkitRelativePath"].indexOf(key) === -1) {
                fileItem[key] = file[key];
              }
            }
            if (autoUpload) {
              uploadFile(blob, fileItem)
                .then((result) => {
                  fileList.push(fileItem);
                  // 回调方法
                  // vue2.x写法 ：this.$emit('on-change', fileItem, fileList);
                })
                .catch((e) => {
                  fileList.push(fileItem);
                });
            } else {
            }
          });
        })
      ).then(() => {});
    };

    // 上传文件
    const uploadFile = (blob: string, fileItem: any) => {
      return new Promise((resolve, reject) => {
        const me = this;
        const { url, params, name } = props;
        const formData = new FormData();
        const xhr = new XMLHttpRequest();

        formData.append(name, blob);
        if (params) {
          for (let key in params) {
            formData.append(key, params[key]);
          }
        }
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 1) {
            const accessToken: any = localStorage.getItem("token")
              ? localStorage.getItem("token")
              : "";
            xhr.setRequestHeader("Authorization", accessToken);
          }
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              const result = JSON.parse(xhr.responseText);
              resolve(result);
            } else {
              reject(xhr);
            }
          }
        };
        xhr.upload.addEventListener(
          "progress",
          function (evt) {
            if (evt.lengthComputable) {
              const precent = Math.ceil((evt.loaded / evt.total) * 100);
            }
          },
          false
        );
        xhr.open("POST", url, true);
        xhr.send(formData);
      });
    };
    onMounted(() => {
      console.log("mounted!");
    });
    onUpdated(() => {
      console.log("updated!");
    });
    onUnmounted(() => {
      console.log("unmounted!");
    });
    // 预览图片、删除图片
    const handleFileClick = (
      e: MouseEvent,
      item: IFile,
      index: number
    ): void => {
      showPreviewer();
      // const previewerImg: any = <HTMLElement | null>(
      //   document.getElementById("previewerImg")
      // );
      const previewerImg: any = ref(null);
      console.log(item);
      console.log(previewerImg);
      previewerImg.value.style.backgroundImage = `url(${item.url})`;
      currentIndex.value = index;
    };

    // 显示预览
    const showPreviewer = () => {
      previewVisible.value = true;
    };

    // 隐藏预览
    const hidePreviewer = () => {
      previewVisible.value = false;
    };

    // 删除图片
    const deleteImg = () => {
      const delFn = () => {
        hidePreviewer();
        fileList.splice(currentIndex.value, 1);
      };
    };

    return {
      fileList,
      title,
      files,
      limit,
      readonly,
      previewVisible,
      handleChange,
      handleFileClick,
      hidePreviewer,
      deleteImg,
    };
  },
};
</script>

<style lang="scss" scoped>
@font-face {
  font-weight: normal;
  font-style: normal;
  font-family: "weui";
  src: url("data:application/octet-stream;base64,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")
    format("truetype");
}

.k-uploader {
  padding: 10px 15px;
  .k-uploader_hd {
    display: flex;
    padding-bottom: 10px;
    .k-uploader_title {
      flex: 1;
      text-align: left;
    }
    .k-uploader_info {
      color: #b2b2b2;
    }
  }
  .k-uploader_bd {
    overflow: hidden;
    margin-left: -9px;
    .k-uploader_files {
      list-style: none;
      padding: 0;
      .k-uploader_file {
        float: left;
        margin-left: 9px;
        margin-bottom: 9px;
        width: 79px;
        height: 79px;
        background: no-repeat center center;
        background-size: cover;
      }
      .k-uploader_file-status {
        position: relative;
        &:before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.4);
        }
      }
      .k-uploader_file-content {
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        color: #fff;
        .upload-error {
          display: inline-block;
          font-size: 23px;
          color: #f43530;
          font-family: "weui";
          font-style: normal;
          &:before {
            content: "\EA0B";
          }
        }
      }
    }
    .k-uploader_input-box {
      float: left;
      position: relative;
      margin-left: 9px;
      margin-bottom: 9px;
      width: 77px;
      height: 77px;
      border: 1px solid #d9d9d9;
      &:before,
      &:after {
        content: " ";
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background-color: #d9d9d9;
      }
      &:before {
        width: 2px;
        height: 39.5px;
      }
      &:after {
        width: 39.5px;
        height: 2px;
      }
      .k-uploader_input {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }
    }
  }
  .k-uploader_previewer {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #000;
    z-index: 1000;
    .k-uploader_preview-img {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 60px;
      left: 0;
      background: center center no-repeat;
      background-size: contain;
    }
    .k-uploader_del {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: #0d0d0d;
      color: #ffffff;
      height: 60px;
      line-height: 60px;
      text-align: center;
      font-family: "weui";
      &:after {
        color: #ffffff;
        font-size: 22px;
        content: "\EA11";
      }
    }
  }
}
</style>>
