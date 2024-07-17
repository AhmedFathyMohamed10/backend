<template>
  <div class="product-list">
    <h1>Product List</h1>
    <router-link to="/check-interactions" class="interaction-button">Check Drug Interactions</router-link>
    <!-- Search bar -->
    <div class="search-bar">
      <input type="text" v-model="search" @input="debouncedFetchProducts" placeholder="Search products" class="search-input">
    </div>

    <!-- Filter dropdowns/buttons -->
    <div class="filter-bar">
      <select v-model="filters.generic_name" @change="fetchProducts" class="filter-dropdown">
        <option value="">All Generic Names</option>
        <option v-for="genericName in genericNames" :key="genericName" :value="genericName">{{ genericName }}</option>
      </select>

      <!-- Brand Name Dropdown -->
      <select v-model="filters.brand_name" @change="fetchProducts" class="filter-dropdown">
        <option value="">All Brand Names</option>
        <option v-for="brandName in brandNames" :key="brandName" :value="brandName">{{ brandName }}</option>
      </select>

      <!-- Manufacturer Dropdown -->
      <select v-model="filters.manufacturer_name" @change="fetchProducts" class="filter-dropdown">
        <option value="">All Manufacturers</option>
        <option v-for="manufacturer in manufacturers" :key="manufacturer" :value="manufacturer">{{ manufacturer }}</option>
      </select>
      
      <!-- Application Number Dropdown -->
      <select v-model="filters.application_number" @change="fetchProducts" class="filter-dropdown">
        <option value="">All Application Numbers</option>
        <option v-for="applicationNumber in applicationNumbers" :key="applicationNumber" :value="applicationNumber">{{ applicationNumber }}</option>
      </select>

      <!-- Version Dropdown -->
      <select v-model="filters.version_number" @change="fetchProducts" class="filter-dropdown">
        <option value="">All Versions</option>
        <option v-for="version in versionsNumbers" :key="version" :value="version">{{ version }}</option>
      </select>
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
      filters: {
        generic_name: '',
        brand_name: '',
        manufacturer_name: '',
        application_number: '',
        version_number: '',
      },
      genericNames: [],
      brandNames: [],
      manufacturers: [], 
      applicationNumbers: [],
      versionsNumbers: [],
      pagination: {
        current_page: 1,
        total_pages: 1
      }
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const filterParams = Object.keys(this.filters)
          .filter(key => this.filters[key])
          .map(key => `${key}:${this.filters[key]}`)
          .join(',');

        const response = await axios.get('http://localhost:8000/api/products/', {
          params: {
            search: this.search,
            page: this.pagination.current_page,
            filters: filterParams
          }
        });
        this.products = response.data.results;
        this.pagination.total_pages = response.data.total_pages; // Updated to reflect the total pages
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async fetchDistinctValues() {
      try {
        const response = await axios.get('http://localhost:8000/api/distinct-values/');
        this.genericNames = response.data.generic_names;
        this.brandNames = response.data.brand_names;
        this.manufacturers = response.data.manufacturers;
        this.applicationNumbers = response.data.application_numbers;
        this.versionsNumbers = response.data.versions;
        // console.log(response.data.versions)
        
      } catch (error) {
        console.error('Error fetching distinct values:', error);
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
        await this.fetchDistinctValues();
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
    this.fetchDistinctValues();
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
  align-content: center;
}

.search-input {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
  box-sizing: border-box;
}

.search-input:hover{
  border-color: #007bff;
}

.filter-bar {
  display: inline;
  gap: 10px;  
}

.filter-dropdown {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  margin-right: 10px;
  max-width: 180px;
  align-items: center;

}

.filter-dropdown:hover {
  border-color: #007bff;
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
  margin: 0;
  font-size: 18px;
  cursor: pointer;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination-button {
  padding: 8px 16px;
  font-size: 14px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}

.pagination-button:hover {
  background-color: #0056b3;
}

.pagination-current {
  margin: 0 10px;
  font-weight: bold;
}

.interaction-button {
  display: inline-block;
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 8px 16px;
  font-size: 14px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
}

.interaction-button:hover {
  background-color: #0e451b;
}
</style>