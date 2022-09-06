<template>
  <v-main class="main-page">
    <div class="main-page__form">
      <h1 class="main-page__title">Convert</h1>
      <div class="main-page__content">
        <BaseLoader v-if="loading" />
        <BaseNotification v-else-if="error" :text="error" />
        <div v-else class="main-page__converter">
          <div class="main-page__field">
            <label v-if="!mobile" class="main-page__label"> From </label>
            <div class="main-page__amount">
              <BaseInput
                :text.sync="amountConverter"
                :label="'Amount'"
                :append="!mobile ? symbolFrom : null"
                class="main-page__input"
              />
              <div class="main-page__button">
                <BaseButtonIcon
                  :icon="'mdi-rotate-3d-variant'"
                  class="main-page__button-content"
                  @click.native.prevent="changeCurrencies"
                />
              </div>
            </div>
            <div class="main-page__comboboxes">
              <span v-if="mobile" class="main-page__combobox-code">
                {{ symbolFrom }}
              </span>
              <BaseCombobox
                :list="listSymbols"
                :select.sync="selectSymbolFrom"
                class="main-page__combobox"
              />
            </div>
          </div>
          <div class="main-page__field">
            <label v-if="!mobile" class="main-page__label"> To </label>
            <BaseInput
              :text="resultConverter"
              :disabled="true"
              :prepend="!mobile ? symbolTo : null"
              class="main-page__input"
            />
            <div class="main-page__comboboxes">
              <span v-if="mobile" class="main-page__combobox-code">
                {{ symbolTo }}
              </span>
              <BaseCombobox
                :list="listSymbols"
                :select.sync="selectSymbolTo"
                class="main-page__combobox"
              />
            </div>
          </div>
        </div>
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
import listCountryCurrency from "@/data/listCountryCurrency.js";

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
      isClickButton: false,
    };
  },
  watch: {
    amountConverter(value) {
      this.changeAmount(value);
      if (!this.isClickButton) this.checkConverter();
    },
    selectSymbolFrom(value) {
      this.changeSymbol({ param: "from", symbol: value });
      if (!this.isClickButton) this.checkConverter();
    },
    selectSymbolTo(value) {
      this.changeSymbol({ param: "to", symbol: value });
      if (!this.isClickButton) this.checkConverter();
    },
    listSymbols() {
      this.defineUserCurrency();
    },
  },
  computed: {
    ...mapGetters([
      "loading",
      "error",
      "listSymbols",
      "listCodeSymbols",
      "resultConverter",
      "errorConverter",
      "symbolFrom",
      "symbolTo",
    ]),
    mobile() {
      return this.$vuetify.breakpoint.width < 961;
    },
  },
  methods: {
    ...mapMutations(["changeAmount"]),
    ...mapActions(["loadSymbols", "changeSymbol", "checkConverter"]),
    changeCurrencies() {
      this.isClickButton = true;

      const copyFrom = this.selectSymbolFrom;
      this.selectSymbolFrom = this.selectSymbolTo;
      this.selectSymbolTo = copyFrom;
      if (this.resultConverter) this.amountConverter = this.resultConverter;

      this.checkConverter();
      setTimeout(() => {
        this.isClickButton = false;
      }, 100);
    },
    defineUserCurrency() {
      const language = window.navigator
        ? (
            window.navigator.language ||
            window.navigator.systemLanguage ||
            window.navigator.userLanguage
          ).toUpperCase()
        : "US";

      const localeLanguage = language.includes("-")
        ? language.split("-")[1]
        : language;

      const localeCurrency = this.defineCurrency(localeLanguage, "USD");

      this.selectSymbolFrom = this.defineSelect(localeCurrency);
      this.selectSymbolTo = this.defineSelect("EUR");
      this.amountConverter = 100;
    },
    defineCurrency(country, defaultCurrency) {
      return (
        listCountryCurrency.find((item) => item.country === country)
          ?.currency || defaultCurrency
      );
    },
    defineSelect(currency) {
      const indexCode = this.listCodeSymbols.findIndex(
        (code) => code === currency
      );

      return indexCode > -1 ? this.listSymbols[indexCode] : null;
    },
  },
  mounted() {
    this.$vuetify.theme.themes.light.primary = "#6d0fca";
    this.loadSymbols();
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/mixins";

.v-main__wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-page {
  &__form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px;
    background: #f0f0f0;
    border-radius: 15px;
    width: 60%;

    @include for-size(desktop) {
      width: 80%;
    }

    @include for-size(small-desktop) {
      width: 90%;
    }

    @include for-size(tablet-portrait) {
      width: 100%;
      padding: 20px;
      height: 100%;
    }
  }

  &__title {
    font-weight: 700;
    font-size: 45px;
    line-height: 61px;
    color: black;

    @include for-size(small-desktop) {
      font-size: 36px;
    }
  }

  &__content {
    margin: 50px 0;
    width: 100%;
  }

  &__converter {
    display: flex;
    width: 100%;

    @include for-size(tablet) {
      flex-direction: column;
    }
  }

  &__field {
    display: flex;
    flex-direction: column;
    width: 100%;

    @include for-size(tablet) {
      padding: 40px;
      background: white;
      border-radius: 15px;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);

      @include for-size(phone) {
        padding: 40px 20px;
      }

      &:first-child {
        flex-direction: column-reverse;

        .main-page__input {
          margin-top: 20px;
        }
      }
    }

    &:not(:first-child) {
      margin-left: 60px;
      text-align: end;

      @include for-size(tablet) {
        margin-left: 0;
        margin-top: 40px;

        @include for-size(phone) {
          margin-top: 20px;
        }

        .main-page__input {
          margin-bottom: 20px;
        }
      }

      .main-page__input
        > .v-input
        > .v-input__control
        > .v-input__slot
        > .v-text-field__slot
        > input {
        text-align: end;

        @include for-size(tablet) {
          text-align: start;
        }
      }
    }
  }

  &__label {
    font-weight: 600;
    font-size: 28px;
    color: black;

    @include for-size(small-desktop) {
      font-size: 24px;
    }
  }

  &__amount {
    position: relative;
  }

  &__button {
    position: absolute;
    top: 0;
    left: calc(100% - 10px);
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 76px;
    height: 76px;
    background: #f0f0f0;
    border-radius: 50%;

    @include for-size(tablet) {
      top: calc(100% + 20px);
      left: calc(100% - 60px);
    }

    @include for-size(phone) {
      left: calc(100% - 60px);
      width: 60px;
      height: 60px;
    }

    & &-content {
      width: 56px;
      height: 56px;
      background: white;
      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);

      @include for-size(phone) {
        width: 44px;
        height: 44px;
      }

      .v-icon {
        font-size: 35px;
        color: #6d0fca;
      }
    }
  }

  &__comboboxes {
    display: flex;
    align-items: center;
  }

  &__combobox {
    &-code {
      line-height: 20px;
    }
  }
}
</style>
