<template>
  <div class="login-container">
    <div class="card shadow-sm">
      <div class="card-body">
        <h5 class="card-title text-center mb-4">LOGIN</h5>
        <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
            {{ errorMessage }}
          </div>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="user_name">Username</label>
            <input type="text" v-model="user_name" class="form-control" id="user_name" required>
          </div>
          <div class="form-group">
            <label for="password">Login Password</label>
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
      password: '',
      errorMessage: null
    };
  },
  mounted() {
    // Remove token from localStorage when the component is mounted
    localStorage.removeItem('token');
  },
  methods: {
    login() {
      const credentials = {
        user_name: this.user_name,
        password: this.password
      };
      axios.post(`${backendBaseUrl}/api/login`, credentials, { withCredentials: true })
        .then(response => {
         
        if (response.data.status) {
          const token = response.data.token;
          localStorage.setItem('token', token);
          this.$router.push('/dishes');
        } else {
          this.errorMessage = response.data.message;
        }
  
        })
        .catch(error => {
          console.error('Login failed:', error);
          this.errorMessage = error.response.data.error;

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
  margin-top:50px;
  
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