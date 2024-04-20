<!-- RegisterForm.vue -->

<template>
    <div class="register-container">
      <div class="card shadow-sm">
        <div class="card-body">
          <h5 class="card-title text-center mb-4">REGISTER Form</h5>
          
          <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
            <p v-for="(message, index) in errorMessage" :key="index">{{ message }}</p>
          </div>

          <form @submit.prevent="register">
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" v-model="name" class="form-control" id="name" required>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" v-model="email" class="form-control" id="email" required>
            </div>
            <div class="form-group">
              <label for="user_name">Register Username</label>
              <input type="text" v-model="user_name" class="form-control" id="user_name" required>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" v-model="password" class="form-control" id="password" required>
            </div>
            <div class="form-group">
              <label for="confirm_password">Confirm Password</label>
              <input type="password" v-model="confirm_password" class="form-control" id="confirm_password" required>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Register</button>
            <p class="mt-3">Already have an account? <router-link to="/">Login</router-link></p>
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
        name: '',
        user_name: '',
        email: '',
        password: '',
        confirm_password: '',
        errorMessage: null
      };
    },
    methods: {
      register() {
        const credentials = {
        name: this.name,   
        email: this.email,  
        user_name: this.user_name,
        password: this.password,
        confirm_password: this.confirm_password,
      };

      axios.post(`${backendBaseUrl}/api/register`, credentials, { withCredentials: true })
        .then(response => {
          if (response.data.status) {
          console.log(response.data);
          this.$router.push('/');
          }else {
          this.errorMessage = response.data.message;
        }
        })
        .catch(error => {
          this.errorMessage = error.response.data.error;
          console.error('Login failed:', error);
        });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Use the same styling as LoginForm.vue */
  .register-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    margin-top:50px;
  }
  
  .card {
    border: none;
    border-radius: 10px;
    border: 1px solid silver;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  /* Left-align and bold the labels */
  .form-group label {
    display: block;
    font-weight: bold;
    text-align: left;
  }
  
  /* Responsive styles */
  @media (max-width: 576px) {
    .register-container {
      padding: 10px;
    }
  }
  </style>
  