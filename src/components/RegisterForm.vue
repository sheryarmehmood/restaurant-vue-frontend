<!-- RegisterForm.vue -->

<template>
    <div class="register-container">
      <div class="card shadow-sm">
        <div class="card-body">
          <h5 class="card-title text-center mb-4">REGISTER</h5>
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
              <label for="user_name">Username</label>
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
            <p class="mt-3">Already have an account? <router-link to="/login">Login</router-link></p>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        name: '',
        user_name: '',
        email: '',
        password: '',
        confirm_password: ''
      };
    },
    methods: {
      register() {
        // Implement your registration logic using axios.post('/register', { ... })
        // Similar to the login method in LoginForm.vue
        const credentials = {
        name: this.name,   
        email: this.email,  
        user_name: this.user_name,
        password: this.password,
        confirm_password: this.confirm_password,
      };

      // axios.post('/api/login', credentials)
      axios.post('http://127.0.0.1:8000/api/register', credentials, { withCredentials: true })
        .then(response => {
          console.log(response.data);
        //   const token = response.data.token;
// 
          // Save the token to local storage or wherever you prefer
        //   localStorage.setItem('token', token);

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
  /* Use the same styling as LoginForm.vue */
  .register-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
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
  