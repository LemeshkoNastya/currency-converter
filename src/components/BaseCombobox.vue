<template>
  <div class="combobox">
    <v-combobox v-model="currentSelect" :items="list" solo></v-combobox>
  </div>
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

<style lang="scss">
@import "@/assets/scss/mixins";

.combobox {
  width: 100%;

  .v-select__slot {
    font-weight: 400;
    font-size: 20px;
    color: black;
    font-size: 18px;

    @include for-size(phone) {
      font-size: 16px;
    }
  }

  .v-text-field.v-text-field--solo .v-input__control {
    min-height: 36px;

    & > .v-input__slot {
      margin: 0;
      background: transparent;
      box-shadow: none;
      border: 1px solid transparent;
      cursor: pointer;

      input {
        text-align: center;
      }

      &:hover {
        border: 1px solid #6d0fca;
      }
    }
  }

  .v-text-field__details {
    display: none;
  }
}

.v-menu__content {
  &::-webkit-scrollbar {
    width: 8px;
    background-color: white;
    border: 1px solid #6d0fca;
    border-radius: 15px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #6d0fca;
    border: 1px solid #6d0fca;
    border-radius: 15px;
  }
}
</style>
