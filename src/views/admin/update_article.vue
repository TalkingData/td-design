<template>
  <div>
    <Input type="text" v-model="name" placeholder="name" />
    <Input
      v-if="showInfo"
      type="textarea"
      v-model="content"
      :autosize="{ minRows: 6 }"
      placeholder="content"
    />
    <Button @click="search" v-if="!showInfo">查询内容</Button>
    <Button @click="create" v-if="showInfo">修改文章</Button>
  </div>
</template>
<script>
import { ajax } from "@/util/ajax";
export default {
  data() {
    return {
      name: "",
      content: "",
      showInfo: false
    };
  },
  methods: {
    create() {
      if (this.name === "") {
        this.$Message.error("name 不能为空");
        return;
      }
      if (this.content === "") {
        this.$Message.error("content 不能为空");
        return;
      }
      ajax({
        urlKey: "/api/article/update",
        methods: "POST",
        data: {
          name: this.name,
          content: this.content
        }
      }).then(res => {
        if (res.status === 1) {
          this.$Message.success("修改成功");
        } else {
          this.$Message.error(res.data);
        }
      });
    },
    search() {
      if (this.name === "") {
        this.$Message.error("name 不能为空");
        return;
      }
      ajax({
        urlKey: "/api/article/get",
        methods: "POST",
        data: {
          name: this.name
        }
      }).then(res => {
        if (res.status === 1) {
          this.content = res.data.content;
          this.showInfo = true;
        } else {
          this.$Message.error(res.data);
        }
      });
    }
  }
};
</script>
