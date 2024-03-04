<template>
  <div id="app">
    <NavbarItem :loggedIn="loggedIn" />
    <router-view  />
  </div>
</template>

<script>
import NavbarItem from "./components/NavbarItem.vue";


export default {
  name: "App",
  components: {
    NavbarItem,
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loginState;
    }
  },
  created() {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      this.$store.commit("login");
    }
  },
};
</script>

<style></style>
