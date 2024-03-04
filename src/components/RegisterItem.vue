<template>
  <div class="register-container">
        <el-card class="register-card">
          <h2 class="register-title">Register</h2>
          <el-form ref="registerForm" class="register-form" label-position="top">
            <el-form-item prop="email">
              <el-input v-model="email" placeholder="Email" clearable></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="password" placeholder="Password" show-password clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="register" class="register-button">Register</el-button>
            </el-form-item>
            <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
          </el-form>
        </el-card>
      </div>
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isLoading: false,
      email: "",
      password: "",
      errorMessage: "",
      passwordRequirements: "",
    };
  },
  methods: {
    async register() {
      this.isLoading = true;
      const form = new FormData();
      form.append("email", this.email);
      form.append("password", this.password);
      try {
        const response = await axios.post("http://localhost:8080/user/register", form);
        console.log(response)
        this.$router.push('/');
      } catch (error) {
        if(error.response.data.messages.email){
          this.errorMessage = 'This email is already taken';
        } else if(error.response.data.messages.password){
          this.errorMessage = 'Password must be 8 chars long';
        } else {
          this.errorMessage = error.response.data.messages || "Registration failed";
          console.error("Registration failed:", error);
        }  
      } finally{
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.register-card {
  width: 400px;
}

.register-title {
  text-align: center;
  margin-bottom: 20px;
}

.register-form {
  width: 80%;
  margin: 0 auto;
}

.register-button {
  width: 100%;
}
.error-message {
  color: red;
}
</style>
