<template>
  <div class="upload">
    <Upload
      action="https://up.qbox.me"
      :show-upload-list="false"
      :data="uploadForm"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-progress="handleProgress"
    >
      <Button type="primary">上传文件</Button>
      {{ uploadPercent }}%
    </Upload>

    <p>{{ prefix + file_name }}</p>
  </div>
</template>
<script>
import { ajax } from "@/util/ajax";
export default {
  data() {
    return {
      prefix: "http://design.talkingdata.com/",
      file_name: "",
      uploadForm: {},
      uploadPercent: 0,
      uploadStatus: 0 // 0未上传，1上传中
    };
  },
  methods: {
    beforeUpload() {
      return ajax({
        methods: "post",
        urlKey: "/api/upload/token",
        data: {}
      }).then(res => {
        const data = res.data;
        if (data && data.key) {
          this.uploadForm = {
            token: data.token,
            key: data.key
          };
        } else {
          this.$Message.error("error...");
        }
      });
    },
    handleSuccess(res) {
      this.file_name = res.key;
      this.uploadStatus = 0;
    },
    handleError() {
      this.uploadStatus = 0;
    },
    handleProgress(event) {
      this.uploadStatus = 1;
      this.uploadPercent = parseInt(event.percent);
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.upload {
  width: 100%;
  padding: 200px;
  text-align: center;

  p {
    margin-top: 60px;
  }
}
</style>
