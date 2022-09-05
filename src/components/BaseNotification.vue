<template>
  <div class="notification">
    <v-alert outlined text border="left" color="red">
      <div class="notification__content">
        <v-icon color="red" class="notification__icon">mdi-alert</v-icon>
        <span class="notification__text">
          {{ text }}
        </span>
      </div>
    </v-alert>
  </div>
</template>

<script>
export default {
  props: ["text"],
};
</script>

<style lang="scss">
.notification {
  &__content {
    display: flex;
    align-items: center;
  }
  &__text {
    width: 100%;
    font-size: 16px;
    color: red;
  }
  &__icon {
    margin-right: 20px;
  }
}
</style>
