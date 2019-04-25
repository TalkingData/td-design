<template>
  <main class="myCode">
    <div v-for="(option, index) in code" :key="index" class="myCode-content">
      <Card>
        <div class="myCode-case">
          <my-display :code="option.content"></my-display>
        </div>

        <header class="myCode-header">
          <span>{{ option.title }}</span>
        </header>

        <div class="myCode-desc">
          <p>{{ option.desc }}</p>
        </div>

        <my-transition :value="option.content"></my-transition>
      </Card>
    </div>
  </main>
</template>

<script>
import myDisplay from "./display";
// import defaultCode from "../../../public/lib/default-code.js";
import myTransition from "./my-transition";
export default {
  props: {
    code: Array
  },
  components: { myDisplay, myTransition }
};
</script>
