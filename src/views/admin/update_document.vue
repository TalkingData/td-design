<template>
  <div>
    <Input type="text" v-model="component_id" placeholder="component_id" />
    <Input
      v-if="showInfo"
      type="textarea"
      v-model="content"
      :autosize="{ minRows: 6 }"
      placeholder="content"
    />
    <Button @click="search" v-if="!showInfo">查询内容</Button>
    <Button @click="search($event, 1)" v-if="!showInfo">删除内容</Button>
    <Button @click="create" v-if="showInfo">修改文档</Button>
  </div>
</template>
<script>
import { ajax } from "@/util/ajax";
export default {
  data() {
    return {
      component_id: "",
      content: "",
      showInfo: false
    };
  },
  methods: {
    create() {
      if (this.component_id === "") {
        this.$Message.error("component_id 不能为空");
        return;
      }
      if (this.content === "") {
        this.$Message.error("content 不能为空");
        return;
      }
      ajax({
        urlKey: "/api/document/update",
        methods: "POST",
        data: {
          id: this.component_id,
          content: this.content
        }
      }).then(res => {
        if (res.status === 1) {
          this.$Message.success("创建成功");
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    search(e, del) {
      if (this.component_id === "") {
        this.$Message.error("component_id 不能为空");
        return;
      }
      let url = "/api/document/get";
      if (del) {
        url = "/api/document/delete";
      }
      ajax({
        urlKey: url,
        methods: "POST",
        data: {
          id: this.component_id
        }
      }).then(res => {
        if (res.status === 1) {
          if (!del) {
            this.content = res.data[0].content;
            this.showInfo = true;
          } else {
            this.$Message.success(res.message);
          }
        } else {
          this.$Message.error(res.message);
        }
      });
    }
  }
};
</script>
