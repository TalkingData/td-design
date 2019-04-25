<template>
  <div>
    <Input type="text" v-model="code_id" placeholder="code_id" />
    <Input
      type="textarea"
      v-model="content"
      :autosize="{ minRows: 6 }"
      placeholder="content"
    />
    <Button @click="create">修改代码</Button>
  </div>
</template>
<script>
import { ajax } from "@/util/ajax";
export default {
  data() {
    return {
      code_id: "",
      content: ""
    };
  },
  methods: {
    create() {
      ajax({
        urlKey: "/api/code/create",
        methods: "POST",
        data: {
          code_id: this.code_id,
          content: this.content
        }
      }).then(res => {
        console.log(res);
        if (res.status === 1) {
          this.$Message.success("修改成功");
        } else {
          this.$Message.error(res.message);
        }
      });
    }
  }
};
</script>
