<template>
  <main>
    <div v-for="(option, index) in code" :key="index">
      <h2>{{ option.name }}</h2>
      <p>{{ option.details }}</p>
      <my-display :code="option.title"></my-display>
    </div>
  </main>
</template>

<script>
import myDisplay from "./display";
import defaultCode from "../../../public/lib/default-code.js";

export default {
  data() {
    return {
      code: defaultCode
    };
  },
  components: { myDisplay }
};
</script>
