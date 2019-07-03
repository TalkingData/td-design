<template>
  <div>
    <Input type="text" v-model="label" placeholder="label" />
    <Input type="text" v-model="text" placeholder="text" />
    <Button @click="create">创建</Button>

    <div style="margin-top:50px">
      <Input type="text" v-model="id" placeholder="id" />
      <Button @click="del">删除</Button>
    </div>
  </div>
</template>
<script>
import { ajax } from "@/util/ajax";
export default {
  data() {
    return {
      label: "",
      text: "",
      id: ""
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
    },
    del() {
      if (this.id === "") {
        this.$Message.error("id 不能为空");
        return;
      }
      this.$Modal.confirm({
        title: "警告",
        content: `<p>确认删除,${this.id}?</p>`,
        onOk: () => {
          ajax({
            urlKey: "/api/component/delete",
            methods: "POST",
            data: {
              id: this.id
            }
          }).then(res => {
            if (res.status === 1) {
              this.$Message.success(res.data);
            } else {
              this.$Message.error(res.data);
            }
          });
        },
        onCancel: () => {}
      });
    }
  }
};
</script>
