<template>
  <div class="stylelib-box">
    <top></top>
    <div class="admin-box main-top">
      <Tabs value="tpl">
        <TabPane label="分类" name="cate">
          <Button class="mb" @click="createCate" type="primary">创建分类</Button>
          <Table border :columns="cateColumns" :data="cateList"></Table>
        </TabPane>
        <TabPane label="模版" name="tpl">
          <tpl :cate="cateList"></tpl>
        </TabPane>
      </Tabs>
    </div>
    <!-- 编辑 -->
    <Modal v-model="update" title="分类" footer-hide>
      <Form ref="cateValidate" :model="cateValidate" :rules="cateRuleValidate" :label-width="80">
        <FormItem label="分类名称" prop="name">
          <Input v-model="cateValidate.name" placeholder="输入分类名称" />
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleCate('cateValidate')">
            {{
            isCreate ? "创建" : "保存"
            }}
          </Button>
          <!-- <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button> -->
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import top from "@/components/framework/top";
import tpl from "./stylelib-tpl";
import { ajax } from "@/util/ajax";
export default {
  components: {
    top,
    tpl
  },
  data() {
    return {
      update: false,
      cateColumns: [
        {
          title: "ID",
          key: "id"
        },
        {
          title: "名称",
          key: "name",
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "person"
                }
              }),
              h("strong", params.row.name)
            ]);
          }
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.editCate(params.row);
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.removeCate(params.row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      cateList: [],
      cateValidate: {
        name: ""
      },
      cateRuleValidate: {
        name: [
          {
            required: true,
            message: "分类名称不能为空且至少2个字符至多8个字符",
            trigger: "blur",
            min: 2,
            max: 8
          }
        ]
      },
      isCreate: false
    };
  },
  created() {
    this.getCate();
  },
  methods: {
    // 获取分类
    async getCate() {
      let res = await ajax({
        urlKey: "/api/template/tag/list",
        methods: "POST",
        data: {}
      });
      if (res && res.status == 1) {
        this.cateList = res.data;
      } else {
        this.$Message.error(res.data);
      }
    },
    editCate(row) {
      this.isCreate = false;
      this.cateValidate = { ...row };
      this.update = true;
    },
    removeCate(row) {
      this.$Modal.confirm({
        title: "警告",
        content: `<p>确认删除,${row.name}?</p>`,
        onOk: () => {
          ajax({
            urlKey: "/api/template/tag/delete",
            methods: "POST",
            data: {
              tag_id: row.id
            }
          }).then(res => {
            if (res.status === 1) {
              this.$Message.success("删除成功!");
              this.getCate();
            } else {
              this.$Message.error(res.msg);
            }
          });
        },
        onCancel: () => {}
      });
    },
    createCate() {
      this.$refs.cateValidate.resetFields();
      this.isCreate = true;
      this.update = true;
    },
    handleCate(name) {
      const fd = {};
      let url = "/api/template/tag/create";
      fd.name = this.cateValidate.name;
      if (!this.isCreate) {
        fd.tag_id = this.cateValidate.id;
        url = "/api/template/tag/update";
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          ajax({
            urlKey: url,
            methods: "POST",
            data: fd
          }).then(res => {
            if (res.status === 1) {
              this.$Message.success("Success!");
              this.update = false;
              this.getCate();
            } else {
              this.$Message.error(res.msg);
            }
          });
        } else {
          this.$Message.error("Fail!");
        }
      });
    }
  }
};
</script>

<style lang="less">
.stylelib-box {
  .admin-box {
    padding: 20px;
    .mb {
      margin-bottom: 20px;
    }
  }
}
</style>
