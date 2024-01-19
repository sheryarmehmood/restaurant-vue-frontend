<template>
    <div class="login-container">
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="user_name">Username:</label>
          <input type="text" v-model="user_name" class="form-control" id="user_name" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" v-model="password" class="form-control" id="password" required>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
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
  
        axios.post('/login', credentials)
          .then(response => {
            const token = response.data.token;
  
            // Save the token to local storage or wherever you prefer
            localStorage.setItem('token', token);
  
            // Redirect to another route after successful login
            this.$router.push('/');
          })
          .catch(error => {
            console.error('Login failed:', error);
            // Handle login failure, show error message, etc.
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
  .form-group {
    margin-bottom: 15px;
  }
  </style>
  