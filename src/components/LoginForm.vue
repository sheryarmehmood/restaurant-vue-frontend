<template>
  <div class="login-container">
    <div class="card shadow-sm">
      <div class="card-body">
        <h5 class="card-title text-center mb-4">LOGIN</h5>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="user_name">Username</label>
            <input type="text" v-model="user_name" class="form-control" id="user_name" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" v-model="password" class="form-control" id="password" required>
          </div>
          <button type="submit" class="btn btn-primary btn-block">Login</button>
          <p class="mt-3">Don't have an account, <router-link to="/register">Register</router-link></p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { backendBaseUrl } from '@/config/config';

export default {
  data() {
    return {
      user_name: '',
      password: ''
    };
  },
  methods: {
    login() {
      const credentials = {
        user_name: this.user_name,
        password: this.password
      };
      axios.post(`${backendBaseUrl}/api/login`, credentials, { withCredentials: true })
        .then(response => {
          const token = response.data.token;
          localStorage.setItem('token', token);
          this.$router.push('/dishes');
        })
        .catch(error => {
          console.error('Login failed:', error);
        });
    }
  }
};
</script>


<style scoped>

/* Add your styling here */
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  
}

.card {
  border: none;
  border-radius: 10px;
  border:1px solid silver;
}

.form-group {
  margin-bottom: 15px;
}

/* Left-align and bold the labels */
.form-group label {
  display: block;
  font-weight: bold;
  text-align: left
}

/* Responsive styles */
@media (max-width: 576px) {
  .login-container {
    padding: 10px;
  }
}
</style>