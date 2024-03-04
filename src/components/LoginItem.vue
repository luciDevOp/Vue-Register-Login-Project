<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="login-title">Login</h2>
      <el-form ref="loginForm" class="login-form" label-position="top">
        <el-form-item prop="email">
          <el-input v-model="email" placeholder="Email" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="password" placeholder="Password" show-password clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" class="login-button">Login</el-button>
        </el-form-item>
        <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:8080/user',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest'
  }
});


export default {
  data() {
    return {
      isLoading: false,
      email: '',
      password: '',
      errorMessage: '',
      token: null,
      expires_in: null,
    };
  },
  methods: {
    login() {
      this.isLoading = true;
      const auth = {
        username: process.env.VUE_APP_USERNAME,
        password: process.env.VUE_APP_PASSWORD,
        
      };
      api.post('/login', {
        grant_type: 'password',
        username: this.email,
        password: this.password
      }, { auth })
      .then(response => {
        this.token = response.data.access_token;
        this.expires_in = response.data.expires_in;
        const expiresMs = this.expires_in * 1000;
        const now = new Date();
        const expireDate = new Date(now.getTime() + expiresMs);

        localStorage.setItem("expires", expireDate);
        localStorage.setItem('accessToken', response.data.access_token);

        this.$store.commit("login"); 
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        this.$router.push('/products');
      })
      .catch(error => {
        console.error('Error logging in:', error);
      }).finally(() => {
        this.isLoading = false;
      });
    },
  },
};
</script>


<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  width: 400px;
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
}

.login-form {
  width: 80%;
  margin: 0 auto;
}

.login-button {
  width: 100%;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>