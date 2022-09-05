<template>
  <v-text-field v-model="currentText" :label="label" :disabled="disabled" solo>
    {{ currentText }}
  </v-text-field>
</template>

<script>
export default {
  props: ["text", "label", "disabled"],
  data() {
    return {
      currentText: this.text,
    };
  },
  watch: {
    currentText() {
      this.$emit("update:text", this.currentText || null);
    },
    text() {
      this.currentText = this.text;
    },
  },
};
</script>

<style lang="scss"></style>
