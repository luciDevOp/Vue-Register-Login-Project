<template>
  <nav class="el-navbar">
    <el-button v-if="!loggedIn" size="large"  type="text" style="font-size: 20px" @click="$router.push('/register')">Register</el-button>
    <el-button v-if="!loggedIn" size="large" type="text" style="font-size: 20px" @click="$router.push('/')">Login</el-button>
    <el-button v-if="loggedIn" size="large" type="text" style="font-size: 20px" @click="logout">Logout</el-button>
  </nav>
</template>

<script>

export default {
  data(){
    return{
      isLoading: false,
    }
  },
  name: "NavbarItem",
  props: ["loggedIn"],
  methods: {
    logout() {
      try {
        this.$store.dispatch("logout");
      }finally{
        this.isLoading = false;
      }
    }
  },
};
</script>


<style>
.el-navbar {
  background-color: #f8f9fa;
  padding: 10px 20px; 
  border-bottom: 1px solid #e9ecef;
}
</style>
