<template>
  <main class="myCode">
    <div v-for="(option, index) in code" :key="index" class="myCode-content">
      <Card>
        <div class="myCode-case">
          <my-display :code="option.template"></my-display>
        </div>

        <header class="myCode-header">
          <span>{{ option.name }}</span>
        </header>

        <div class="myCode-desc">
          <p>{{ option.details }}</p>
        </div>

        <my-transition :value="option.template"></my-transition>
      </Card>
    </div>
  </main>
</template>

<script>
import myDisplay from "./display";
import defaultCode from "../../../public/lib/default-code.js";
import myTransition from "./my-transition";
export default {
  data() {
    return {
      code: defaultCode
    };
  },
  components: { myDisplay, myTransition }
};
</script>
