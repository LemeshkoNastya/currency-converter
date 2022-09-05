<template>
  <v-main class="main-page">
    <h1 class="main-page__title">Convert</h1>

    <div class="main-page__content">
      <BaseLoader v-if="loading" />
      <BaseNotification v-else-if="error" :text="error" />
      <div v-else class="main-page__converter">
        <label>From</label>
        <div class="main-page__converter-field">
          <BaseInput :text.sync="amountConverter" :label="'Amount'" />
          <BaseCombobox :list="listSymbols" :select.sync="selectSymbolFrom" />
        </div>
        <label>To</label>
        <div class="main-page__converter-field">
          <BaseInput :text="resultConverter" :disabled="true" />
          <BaseCombobox :list="listSymbols" :select.sync="selectSymbolTo" />
        </div>
        <BaseButtonIcon
          :icon="'mdi-rotate-3d-variant'"
          @click.native.prevent="changeCurrencies"
        />
        <BaseNotification v-if="errorConverter" :text="errorConverter" />
      </div>
    </div>
  </v-main>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import BaseLoader from "@/components/BaseLoader";
import BaseNotification from "@/components/BaseNotification";
import BaseInput from "@/components/BaseInput";
import BaseCombobox from "@/components/BaseCombobox";
import BaseButtonIcon from "@/components/BaseButtonIcon";

export default {
  components: {
    BaseLoader,
    BaseNotification,
    BaseInput,
    BaseCombobox,
    BaseButtonIcon,
  },
  data() {
    return {
      amountConverter: null,
      selectSymbolFrom: null,
      selectSymbolTo: null,
    };
  },
  watch: {
    amountConverter(value) {
      this.changeAmount(value);
      this.checkConverter();
    },
    selectSymbolFrom(value) {
      this.changeSymbol({ param: "from", symbol: value });
      this.checkConverter();
    },
    selectSymbolTo(value) {
      this.changeSymbol({ param: "to", symbol: value });
      this.checkConverter();
    },
  },
  computed: {
    ...mapGetters([
      "loading",
      "error",
      "listSymbols",
      "resultConverter",
      "errorConverter",
    ]),
  },
  methods: {
    ...mapMutations(["changeAmount"]),
    ...mapActions(["loadSymbols", "changeSymbol", "checkConverter"]),
    changeCurrencies() {
      const copyFrom = this.selectSymbolFrom;
      this.selectSymbolFrom = this.selectSymbolTo;
      this.selectSymbolTo = copyFrom;
    },
  },
  mounted() {
    this.loadSymbols();
  },
};
</script>

<style lang="scss">
.main-page {
  margin: 30px;

  &____title {
  }

  &__content {
    margin-top: 50px;
  }

  &__converter {
    &-field {
      display: flex;
      width: 100%;
    }
  }
}
</style>
