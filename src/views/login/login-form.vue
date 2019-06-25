<style lang="less" scoped>
.land {
  background: #2486ff;
  box-shadow: 0 1px 2px 0 rgba(23, 35, 61, 0.35);
  border-radius: 22px;
  width: 100%;
  height: 40px;
  font-size: 16px;
}

.signIn {
  height: 30px;
  line-height: 12px;

  span {
    float: right;
    color: #ed4014;
  }

  p {
    float: left;

    a {
      color: #2d8cf0;
      text-decoration: none;
    }
  }
}

h2 {
  font-size: 18px;
  color: rgba(23, 35, 61, 0.75);
  text-align: left;
  line-height: 26px;
  padding: 42px 0 20px 0;
  font-weight: 400;
}
</style>

<style>
.ivu-input {
  height: 40px;
}
</style>

<template>
  <div>
    <h2></h2>

    <Form
      ref="loginForm"
      :model="form"
      :rules="rules"
      @keydown.enter.native="handleSubmit"
    >
      <FormItem prop="userName">
        <Input v-model="form.userName" placeholder="请输入用户名/邮箱"></Input>
      </FormItem>
      <FormItem prop="password">
        <Input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
        ></Input>
      </FormItem>
      <FormItem>
        <div class="signIn">
          <span v-if="errorNews">{{ errorNews }}</span>
          <p>
            还没有账户?
            <a @click="switchType()">立即注册</a>
          </p>
        </div>
        <Button @click="handleSubmit" type="primary" long class="land"
          >登录</Button
        >
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { ajax } from "@/util/ajax";
import cookie from "js-cookie";
export default {
  name: "LoginForm",
  inject: ["app"],
  props: {
    userNameRules: {
      type: Array,
      // eslint-disable-next-line
            default: () => {
        return [
          {
            required: true,
            message: "用户名/邮箱不能为空",
            trigger: "blur"
          }
        ];
      }
    },
    passwordRules: {
      type: Array,
      // eslint-disable-next-line
            default: () => {
        return [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ];
      }
    }
  },
  data() {
    return {
      form: {
        userName: "",
        password: ""
      },
      errorNews: ""
    };
  },
  computed: {
    rules() {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      };
    }
  },
  mounted() {},
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const form = this.form;
          ajax({
            urlKey: "/api/login",
            methods: "POST",
            data: {
              name: form.userName,
              pass: form.password
            }
          }).then(res => {
            if (res.status === 1) {
              const authorization = JSON.parse(res.data.Authorization);
              cookie.set("token", authorization.token, {
                expires: 365,
                path: ""
              });
              cookie.set("user_info", authorization, {
                expires: 365,
                path: ""
              });
              this.$router.push(`/home`);
            } else {
              this.$Message.error(res.message);
            }
          });
        }
      });
    },
    switchType() {
      this.$emit("switch-type", "register");
    }
  }
};
</script>
