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

      // axios.post('/api/login', credentials)
      axios.post('http://127.0.0.1:8000/api/login', credentials, { withCredentials: true })
        .then(response => {
          console.log(response.data);
          const token = response.data.token;

          // Save the token to local storage or wherever you prefer
          localStorage.setItem('token', token);

          // Redirect to another route after successful login
          this.$router.push('/dishes');
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