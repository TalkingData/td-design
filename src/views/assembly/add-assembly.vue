<style>
.addAssembly {
  padding: 20px;
}
</style>

<template>
  <main class="addAssembly">
    <Form
      ref="formCustom"
      :model="formCustom"
      :rules="ruleCustom"
      :label-width="60"
    >
      <FormItem label="名称" prop="name">
        <Input v-model="formCustom.name" placeholder="请输入..."></Input>
      </FormItem>

      <FormItem label="详情" prop="details">
        <Input
          v-model="formCustom.details"
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 20 }"
          placeholder="请输入..."
        ></Input>
      </FormItem>

      <FormItem label="代码" prop="html">
        <Input
          v-model="formCustom.html"
          type="textarea"
          :autosize="{ minRows: 15, maxRows: 20 }"
          placeholder="请输入..."
        ></Input>
      </FormItem>

      <FormItem label="">
        <Button type="primary" @click="run()">运行</Button>
      </FormItem>

      <FormItem label="运行事例">
        <my-display :code="formCustom.html" ref="refDisplay"></my-display>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="handleSubmit('formCustom')">提交</Button>
        <Button @click="handleReset('formCustom')" style="margin-left: 8px"
          >重置</Button
        >
      </FormItem>
    </Form>
  </main>
</template>
<script>
import myDisplay from "./display";
// import defaultCode from "./default-code.js";
export default {
  components: { myDisplay },
  data() {
    return {
      formCustom: {
        name: "",
        details: "",
        html: ""
      },
      ruleCustom: {
        name: [
          {
            required: true,
            message: "请填写名称",
            trigger: "blur"
          }
        ],
        details: [
          {
            required: true,
            message: "请填写详情",
            trigger: "blur"
          }
        ],
        html: [
          {
            required: true,
            message: "请填写代码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
      this.$refs.refDisplay.destroyCode();
    },
    run() {
      this.$refs.refDisplay.renderCode();
    }
  }
};
</script>
