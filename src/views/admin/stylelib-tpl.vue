<template>
  <div class="stylelib-tpl">
    <div class="opr">
      <Button @click="createCate" type="primary">创建模版</Button>
      <Select v-model="search.keyType" style="width: 160px" @on-change="searchTpl">
        <Option v-for="(i, j) in searchCate" :key="j" :value="i.id">{{ i.name }}</Option>
      </Select>
    </div>
    <Table border :loading="loading" :columns="cateColumns" :data="cateList">
      <template slot-scope="{ row }" slot="time">
        <span>{{ row.created_at | moment }}</span>
      </template>
    </Table>

    <!-- 编辑 -->
    <Modal v-model="update" title="模版" footer-hide>
      <Form ref="cateValidate" :model="cateValidate" :rules="cateRuleValidate" :label-width="80">
        <FormItem label="名称" prop="title">
          <Input v-model="cateValidate.title" placeholder="输入模版名称" />
        </FormItem>
        <FormItem label="分类" prop="tag_id">
          <Select v-model="cateValidate.tag_id" placeholder="请选择模版分类">
            <Option v-for="(i, j) in cate" :key="j" :value="i.id+''">{{ i.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="描述" prop="desc">
          <Input v-model="cateValidate.desc" placeholder="输入模版描述" />
        </FormItem>
        <FormItem label="图片KEY" prop="cover">
          <Input v-model="cateValidate.cover" placeholder="输入模版图片KEY" />
        </FormItem>
        <FormItem label="代码仓库" prop="url">
          <Input v-model="cateValidate.url" placeholder="输入模版代码仓库地址" />
        </FormItem>
        <FormItem label="预览地址" prop="preview">
          <Input v-model="cateValidate.preview" placeholder="输入模版预览地址" />
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleCate('cateValidate')">{{ isCreate ? "创建" : "保存" }}</Button>
          <!-- <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button> -->
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { ajax } from "@/util/ajax";
export default {
  props: {
    cate: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    searchCate() {
      return [{ name: "全部", id: 0 }, ...this.cate];
    }
  },
  data() {
    return {
      update: false,
      loading: false,
      // searchCate: [],
      search: {
        keyWord: "",
        keyType: 0
      },
      cateColumns: [
        {
          title: "名称",
          key: "title",
          render: (h, params) => {
            return h("div", [h("strong", params.row.title)]);
          }
        },
        {
          title: "描述",
          key: "desc"
        },
        {
          title: "图片KEY",
          key: "cover"
        },
        {
          title: "代码仓库",
          key: "url"
        },
        {
          title: "预览地址",
          key: "preview"
        },
        {
          title: "热度",
          key: "hot"
        },
        {
          title: "创建时间",
          slot: "time"
          // key: "created_at",
          // render: (h, params) => {
          //   return h("div", [h("strong", params.row.created_at)]);
          // }
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
        title: "",
        tag_id: "",
        desc: "",
        cover: "",
        url: "",
        preview: ""
      },
      cateRuleValidate: {
        title: [
          {
            required: true,
            message: "模版名称不能为空且不超过10个字符",
            trigger: "blur",
            max: 10
          }
        ],
        tag_id: [
          {
            required: true,
            message: "请选择模版分类",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "模版描述不能为空",
            trigger: "blur"
          }
        ],
        cover: [
          {
            required: true,
            message: "图片上传KEY不能为空",
            trigger: "blur"
          }
        ],
        url: [
          {
            required: true,
            message: "请输入仓库url",
            trigger: "blur",
            type: "url"
          }
        ],
        preview: [
          {
            required: true,
            message: "请输入预览url",
            trigger: "blur",
            type: "url"
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
    // 获取模版
    async getCate(tag_id) {
      this.loading = true;
      let res = await ajax({
        urlKey: "/api/template/item/list",
        methods: "POST",
        data: {
          tag_id: tag_id
        }
      });
      if (res && res.status == 1) {
        this.cateList = res.data;
      } else {
        this.$Message.error(res.data);
      }
      this.loading = false;
    },
    editCate(row) {
      this.isCreate = false;
      this.cateValidate = { ...row };
      this.update = true;
    },
    removeCate(row) {
      this.$Modal.confirm({
        title: "警告",
        content: `<p>确认删除,${row.title}?</p>`,
        onOk: () => {
          ajax({
            urlKey: "/api/template/item/delete",
            methods: "POST",
            data: {
              template_id: row.id
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
      let fd = {},
        url = "/api/template/item/create";
      fd = { ...this.cateValidate };
      if (!this.isCreate) {
        fd.template_id = this.cateValidate.id;
        url = "/api/template/item/update";
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
    },
    searchTpl() {
      this.getCate(this.search.keyType);
    }
  }
};
</script>

<style lang="less" scoped>
.stylelib-tpl {
  .opr {
    height: 60px;
    line-height: 60px;
    button {
      margin-right: 20px;
    }
  }
}
</style>
