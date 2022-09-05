<template>
  <v-combobox v-model="currentSelect" :items="list" solo clearable></v-combobox>
</template>

<script>
export default {
  props: ["list", "select"],
  data() {
    return {
      currentSelect: this.select,
    };
  },
  watch: {
    currentSelect() {
      this.$emit("update:select", this.currentSelect);
    },
    select() {
      this.currentSelect = this.select;
    },
  },
};
</script>

<style lang="scss"></style>
