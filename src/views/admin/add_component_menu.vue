<template>
  <div>
    <Input type="text" v-model="label" placeholder="label" />
    <Input type="text" v-model="text" placeholder="text" />
    <Button @click="create">创建</Button>
  </div>
</template>
<script>
import { ajax } from "@/util/ajax";
export default {
  data() {
    return {
      label: "",
      text: ""
    };
  },
  methods: {
    create() {
      if (this.label === "") {
        this.$Message.error("label 不能为空");
        return;
      }
      if (this.text === "") {
        this.$Message.error("text 不能为空");
        return;
      }
      ajax({
        urlKey: "/api/component/create",
        methods: "POST",
        data: {
          label: this.label,
          text: this.text
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
