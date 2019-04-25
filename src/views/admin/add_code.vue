<template>
  <div>
    <Input type="text" v-model="component_id" placeholder="component_id" />
    <Input type="text" v-model="title" placeholder="title" />
    <Input
      type="textarea"
      v-model="desc"
      :autosize="{ minRows: 4 }"
      placeholder="desc"
    />
    <Input
      type="textarea"
      v-model="content"
      :autosize="{ minRows: 6 }"
      placeholder="content"
    />
    <Button @click="create">创建代码</Button>
  </div>
</template>
<script>
import { ajax } from "@/util/ajax";
export default {
  data() {
    return {
      component_id: "",
      title: "",
      desc: "",
      content: ""
    };
  },
  methods: {
    create() {
      ajax({
        urlKey: "/api/code/create",
        methods: "POST",
        data: {
          id: this.component_id,
          content: this.content,
          title: this.title,
          desc: this.desc
        }
      }).then(res => {
        console.log(res);
        if (res.status === 1) {
          this.$Message.success("创建成功");
        } else {
          this.$Message.error(res.message);
        }
      });
    }
  }
};
</script>
