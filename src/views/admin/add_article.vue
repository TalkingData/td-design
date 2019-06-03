<template>
  <div>
    <Input type="text" v-model="name" placeholder="name" />
    <Input
      type="textarea"
      v-model="content"
      :autosize="{ minRows: 6 }"
      placeholder="content"
    />
    <Button @click="create">创建文章</Button>
  </div>
</template>
<script>
import { ajax } from "@/util/ajax";
export default {
  data() {
    return {
      name: "",
      content: ""
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
        urlKey: "/api/article/create",
        methods: "POST",
        data: {
          name: this.name,
          content: this.content
        }
      }).then(res => {
        if (res.status === 1) {
          this.$Message.success("创建成功");
        } else {
          this.$Message.error(res.data);
        }
      });
    }
  }
};
</script>
