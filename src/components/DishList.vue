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
              <a :href="getFullImageUrl(dish.image_url)" target="_blank">
              <img :src="getFullImageUrl(dish.image_url)" alt="Dish Image" style="max-width: 100px; max-height: 100px;"></a>
            </td>
            <td>{{ dish.price }}</td>
          </tr>
        </tbody>
      </table>
  

     <!-- Display Pagination Links -->
     <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{ 'disabled': !links.prev_page_url }">
          <a v-if="links.prev_page_url" class="page-link" @click.prevent="fetchDishes(links.prev_page_url)" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
          <span v-else class="page-link" aria-label="Previous" disabled>
            <span aria-hidden="true">&laquo;</span>
          </span>
        </li>

        <li class="page-item" v-for="page in links.last_page" :key="page" :class="{ 'active': page === links.current_page }">
          <a class="page-link" @click.prevent="fetchDishes(`${links.path}?page=${page}`)" href="#">{{ page }}</a>
        </li>


        <li class="page-item" :class="{ 'disabled': !links.next_page_url }">
          <a v-if="links.next_page_url" class="page-link" @click.prevent="fetchDishes(links.next_page_url)" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
          <span v-else class="page-link" aria-label="Next" disabled>
            <span aria-hidden="true">&raquo;</span>
          </span>
        </li>
      </ul>
    </nav>


    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { backendBaseUrl } from '@/config/config';

  export default {
    data() {
      return {
        dishes: [],
        links: [],
      };
    },
    mounted() {
      this.fetchDishes();
    },
    methods: {
      fetchDishes(url = `${backendBaseUrl}/api/get-dishes`) {
        const token = localStorage.getItem('token');

        axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
          .then(response => {       
            this.dishes = response.data.data.data;
            this.links = response.data.data;        
          })
          .catch(error => {
            console.error('Error fetching dishes:', error);
          });
      },

        getFullImageUrl(imageUrl) { 
            return  backendBaseUrl + imageUrl;     
        },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styling here */
  
  </style>
  