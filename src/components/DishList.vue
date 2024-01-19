<template>
    <div class="container mt-5">
      <h2 class="mb-2 text-start">Dishes</h2>
  
      <!-- Display Dishes in a Table -->
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dish in dishes" :key="dish.id">
            <td>{{ dish.name }}</td>
            <td>{{ dish.description }}</td>
            <td>
              <img :src="dish.image_url" alt="Dish Image" style="max-width: 100px; max-height: 100px;">
            </td>
            <td>{{ dish.price }}</td>
          </tr>
        </tbody>
      </table>
  
      <!-- Display Pagination Links -->
      <nav aria-label="Page navigation">
        <ul class="pagination">
          <li class="page-item" :class="{ 'disabled': !dishes.prev_page_url }">
            <a class="page-link" @click.prevent="fetchDishes(dishes.prev_page_url)" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
  
          <li class="page-item" v-for="page in dishes.last_page" :key="page" :class="{ 'active': page === dishes.current_page }">
            <a class="page-link" @click.prevent="fetchDishes(page)" href="#">{{ page }}</a>
          </li>
  
          <li class="page-item" :class="{ 'disabled': !dishes.next_page_url }">
            <a class="page-link" @click.prevent="fetchDishes(dishes.next_page_url)" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        dishes: [],
      };
    },
    mounted() {
      this.fetchDishes();
    },
    methods: {
      fetchDishes(url = 'http://127.0.0.1:8000/api/get-dishes') {
        const token = localStorage.getItem('token');

        axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
          .then(response => {
            console.log('response',response);
            this.dishes = response.data.data.data;
          })
          .catch(error => {
            console.error('Error fetching dishes:', error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styling here */
  /* You can add custom styles for table, pagination, etc. */
  </style>
  