<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link to="/dishes" class="navbar-brand">Restaurant App</router-link>

      <!-- Left-aligned items -->
      <div class="navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/dishes" class="nav-link" :class="{ 'active': $route.path === '/dishes' }">
              Dishes
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Right-aligned items -->
      <div class="navbar-collapse justify-content-end">
        <ul class="navbar-nav">
          <li class="nav-item">
            <button @click="logout" class="btn btn-outline-danger">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  </template>
  
  <script>

  export default {
    methods: {
      logout() {
        // Clear the token and redirect to the login page
        localStorage.removeItem('token');
        this.$router.push('/');
      }
    }
  };
  </script>
  
  <style scoped>
/* Add your styling here */
.navbar-nav .nav-item .nav-link.active {
  text-decoration: underline;
  color: grey; /* Add this line to set the color to grey */
  margin-left: 20px;
}
  </style>
  