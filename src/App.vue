<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap");

#app {
  font-family: "Open Sans", sans-serif;
  background: white;
}
</style>
