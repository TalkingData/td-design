<style lang="less" scoped>
@import "./index.less";
</style>

<template>
  <div class="login">
    <div class="login-con">
      <div class="login-con-form">
        <!-- <img src="../../../public/img/login-logo.png" alt="" /> -->
        <div class="login-con-form-title">
          <img src="../../assets/logo.svg" alt="" />
        </div>
        <login-form
          v-if="loginType === 'signIn'"
          @switch-type="switchType($event)"
        ></login-form>
        <addmembers
          v-if="loginType === 'register'"
          @switch-type="switchType($event)"
        ></addmembers>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "./login-form";
import addmembers from "./addmembers";

export default {
  components: {
    LoginForm,
    addmembers
  },
  data() {
    return {
      loginType: "signIn"
    };
  },
  methods: {
    switchType(data) {
      this.loginType = data;
    }
  }
};
</script>
