<template>
  <div class="product-list">
    <h1>Product List</h1>

    <!-- Search bar -->
    <div class="search-bar">
      <input type="text" v-model="search" @input="debouncedFetchProducts" placeholder="Search products" class="search-input">
    </div>

    <!-- Product list -->
    <ul class="product-items">
      <li v-for="product in products" :key="product.set_id" class="product-item">
        <h3 @click="goToDetail(product.set_id)">{{ product.effective_time }}</h3>
      </li>
    </ul>

    <!-- Pagination controls -->
    <div v-if="pagination.total_pages > 1" class="pagination">
      <button @click="firstPage" :disabled="pagination.current_page === 1" class="pagination-button">First</button>
      <button @click="prevPage" :disabled="pagination.current_page === 1" class="pagination-button">Previous</button>
      <span class="pagination-current">Page: {{ pagination.current_page }}</span>
      <button @click="nextPage" :disabled="pagination.current_page === pagination.total_pages" class="pagination-button">Next</button>
      <button @click="lastPage" :disabled="pagination.current_page === pagination.total_pages" class="pagination-button">Last</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';

export default {
  data() {
    return {
      products: [],
      search: '',
      pagination: {
        current_page: 1,
        total_pages: 1
      }
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:8000/api/products/', {
          params: {
            search: this.search,
            page: this.pagination.current_page
          }
        });
        this.products = response.data.results;
        this.pagination.total_pages = response.data.total_pages; // Updated to reflect the total pages
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async nextPage() {
      if (this.pagination.current_page < this.pagination.total_pages) {
        this.pagination.current_page++;
        await this.fetchProducts();
      }
    },
    async prevPage() {
      if (this.pagination.current_page > 1) {
        this.pagination.current_page--;
        await this.fetchProducts();
      }
    },
    async firstPage() {
      if (this.pagination.current_page > 1) {
        this.pagination.current_page = 1;
        await this.fetchProducts();
      }
    },
    async lastPage() {
      if (this.pagination.current_page < this.pagination.total_pages) {
        this.pagination.current_page = this.pagination.total_pages;
        await this.fetchProducts();
      }
    },
    goToDetail(setId) {
      this.$router.push({ path: `/products/${setId}` });
    }
  },
  created() {
    // Debounce the fetchProducts method to limit the rate of API calls
    this.debouncedFetchProducts = _.debounce(this.fetchProducts, 300);
    this.fetchProducts();
  }
};
</script>

<style scoped>
.product-list {
  font-family: 'Arial', sans-serif;
  padding: 20px;
}

.search-bar {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.search-input {
  flex: 1;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-button {
  padding: 8px 16px;
  font-size: 14px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #0056b3;
}

.product-items {
  list-style-type: none;
  padding: 0;
}

.product-item {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.product-item h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 18px;
}

.product-item .inactive-ingredient {
  margin-bottom: 0;
  color: #666;
}

.pagination {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.pagination-button {
  padding: 8px 16px;
  font-size: 14px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination-button:hover {
  background-color: #0056b3;
}

.pagination-current {
  font-weight: bold;
}
</style>
