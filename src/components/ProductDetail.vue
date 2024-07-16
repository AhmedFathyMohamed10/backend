<template>
  <div class="product-detail">
    <h1>Product Details</h1>
    <div v-if="product">
      <div v-if="product.openfda.generic_name" class="product-section">
        <h2>Generic Name</h2>
        <p v-for="(item, index) in product.openfda.generic_name" :key="'generic_name-' + index">{{ item }}</p>
      </div>
      <div v-if="product.openfda.brand_name" class="product-section">
        <h2>Brand Name</h2>
        <p v-for="(item, index) in product.openfda.brand_name" :key="'brand_name-' + index">{{ item }}</p>
      </div>
      <div v-if="product.description" class="product-section">
        <h2>Description</h2>
        <p v-for="(item, index) in product.description" :key="'description-' + index">{{ item }}</p>
      </div>
      <div v-if="product.precautions" class="product-section">
        <h2>Precautions</h2>
        <p v-for="(item, index) in product.precautions" :key="'precautions-' + index">{{ item }}</p>
      </div>
      <div v-if="product.general_precautions" class="product-section">
        <h2>General Precautions</h2>
        <p v-for="(item, index) in product.general_precautions" :key="'general_precautions-' + index">{{ item }}</p>
      </div>
      <div v-if="product.pharmacokinetics" class="product-section">
        <h2>Pharmacokinetics</h2>
        <p v-for="(item, index) in product.pharmacokinetics" :key="'pharmacokinetics-' + index">{{ item }}</p>
      </div>
      <div v-if="product.indications_and_usage" class="product-section">
        <h2>Indications and Usage</h2>
        <p v-for="(item, index) in product.indications_and_usage" :key="'indications_and_usage-' + index">{{ item }}</p>
      </div>
      <div v-if="product.pediatric_use" class="product-section">
        <h2>Pediatric Use</h2>
        <p v-for="(item, index) in product.pediatric_use" :key="'pediatric_use-' + index">{{ item }}</p>
      </div>
      <div v-if="product.contraindications" class="product-section">
        <h2>Contraindications</h2>
        <p v-for="(item, index) in product.contraindications" :key="'contraindications-' + index">{{ item }}</p>
      </div>
      <div v-if="product.pregnancy" class="product-section">
        <h2>Pregnancy</h2>
        <p v-for="(item, index) in product.pregnancy" :key="'pregnancy-' + index">{{ item }}</p>
      </div>
      
      <div v-if="product.nursing_mothers" class="product-section">
        <h2>Nursing Mothers</h2>
        <p v-for="(item, index) in product.nursing_mothers" :key="'nursing_mothers-' + index">{{ item }}</p>
      </div>
      <div v-if="product.dosage_and_administration" class="product-section">
        <h2>Dosage and Administration</h2>
        <p v-for="(item, index) in product.dosage_and_administration" :key="'dosage_and_administration-' + index">{{ item }}</p>
      </div>
      <div v-if="product.adverse_reactions" class="product-section">
        <h2>Adverse Reactions</h2>
        <p v-for="(item, index) in product.adverse_reactions" :key="'adverse_reactions-' + index">{{ item }}</p>
      </div>
      <!-- Add other sections as needed based on the product data -->
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
    <button @click="goBack" class="back-button">Back to List</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      product: null,
    };
  },
  methods: {
    async fetchProduct() {
      const setId = this.$route.params.set_id;
      console.log(`Fetching product with set_id: ${setId}`);
      try {
        const response = await axios.get(`http://localhost:8000/api/products/${setId}/`);
        console.log('Product fetched:', response.data);
        this.product = response.data;
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    },
    goBack() {
      this.$router.push('/');
    },
  },
  mounted() {
    this.fetchProduct();
  },
};
</script>


<style scoped>
.product-detail {
  font-family: 'Arial', sans-serif;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}

.product-section {
  margin-bottom: 20px;
}

.product-section h2 {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}

.product-section p {
  margin: 5px 0;
  font-size: 14px;
  color: #666;
}

.back-button {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 14px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #0056b3;
}
</style>


