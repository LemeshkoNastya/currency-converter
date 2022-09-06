<template>
  <div class="input">
    <v-text-field
      v-model="currentText"
      :label="label"
      :disabled="disabled"
      :append-icon="append"
      :prepend-inner-icon="prepend"
      solo
    >
      {{ currentText }}
    </v-text-field>
  </div>
</template>

<script>
export default {
  props: ["text", "label", "disabled", "append", "prepend"],
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

<style lang="scss">
@import "@/assets/scss/mixins";

.input {
  width: 100%;

  .v-label {
    font-weight: 300;
    font-size: 24px;
    color: #6d0fca;
    height: 100%;

    @include for-size(small-desktop) {
      font-size: 20px;
    }

    @include for-size(tablet) {
      font-size: 32px;
    }
  }

  .v-text-field.v-text-field--solo .v-input__control input {
    max-height: 75px;
    font-weight: 300;
    font-size: 24px;
    line-height: 54px;
    color: #6d0fca;

    @include for-size(small-desktop) {
      font-size: 20px;
    }

    @include for-size(tablet) {
      font-size: 32px;
    }
  }

  .v-input__slot {
    margin: 0;
    border-radius: 15px;
  }

  .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
    > .v-input__control
    > .v-input__slot {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    @include for-size(tablet) {
      box-shadow: none;
      border: 1px solid #6d0fca;
    }
  }

  .v-text-field__details {
    display: none;
  }

  .v-icon {
    font-size: 18px;
    font-style: normal;
  }

  .theme--light.v-icon.v-icon.v-icon--disabled {
    color: rgba(0, 0, 0, 0.54) !important;
  }

  .v-input__icon--append {
    margin-right: 10px;
  }

  .v-input__icon--prepend-inner {
    margin-left: 10px;
  }
}
</style>
