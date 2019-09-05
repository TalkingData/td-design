<style lang="less" scoped>
.card {
  width: 100%;
  height: auto;
  padding: 24px 160px 24px 0;
  background: #ffffff;
  box-shadow: inset 0 -1px 0 0 #e7e9eb;
  transition: transform 0.4s ease 0s;
  &:hover {
    transform: translateX(-5px);
    -webkit-transform: translateX(-5px); /*兼容-webkit-引擎浏览器*/
    -moz-transform: translateX(-5px);
  }
  &-title {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(23, 35, 61, 0.75);
    line-height: 22px;
  }
  h2 {
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #17233d;
    line-height: 38px;
    padding-bottom: 12px;
  }
  p {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(23, 35, 61, 0.75);
    line-height: 24px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
<style lang="less">
.TDD-card-details em {
  color: #3399ff;
  font-style: normal;
}
</style>
<template>
  <main class="card TDD-card-details">
    <router-link :to="data.path">
      <div class="card-title">
        {{ data.parent }}
        <template v-if="data.children">
          <Icon custom="i-td i-td-keyboard_arrow_right" />
          {{ data.children }}
        </template>
      </div>
      <h2 v-html="data.name"></h2>
      <p v-html="data.describe"></p>
    </router-link>
  </main>
</template>
<script>
export default {
  props: {
    data: {
      type: Object
    }
  }
};
</script>
