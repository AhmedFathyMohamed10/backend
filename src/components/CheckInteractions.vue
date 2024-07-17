<template>
    <div class="checking">
      <h2 class="page-title">Check Drug Interactions</h2>
      <form @submit.prevent="checkInteractions" class="interaction-form">
        <label for="drug1" class="form-label">Drug 1:</label>
        <input type="text" id="drug1" v-model="drug1" class="form-input">
        <br>
        <label for="drug2" class="form-label">Drug 2:</label>
        <input type="text" id="drug2" v-model="drug2" class="form-input">
        <br>
        <button type="submit" class="form-button">Check Interactions</button>
        <button type="button" @click="clearFields" class="form-button">Clear</button>
      </form>
      <div v-if="interactionResult !== null" class="interaction-result">
        <p v-if="interactionResult.interactions" class="interaction-found">
          Interactions Found! Interaction Count: {{ interactionResult.interaction_count }}
        </p>
        <p v-else class="no-interaction">
          No Interactions Found.
        </p>
      </div>
      <button @click="goBack" class="back-button">Back to List</button>
    </div>
</template>
  
<script>
export default {
  data() {
    return {
      drug1: '',
      drug2: '',
      interactionResult: null
    };
  },
  methods: {
    async checkInteractions() {
      try {
        const response = await fetch('http://localhost:8000/api/check-drug-interactions/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            drug1: this.drug1,
            drug2: this.drug2
          })
        });
        const responseData = await response.json();
        this.interactionResult = responseData;
      } catch (error) {
        console.error('Error checking drug interactions:', error);
      }
    },
    goBack() {
      this.$router.push('/');
    },
    clearFields() {
      this.drug1 = '';
      this.drug2 = '';
      this.interactionResult = null;
    }
  }
};
</script>

  
<style scoped>
  .checking{
    margin: 0 auto;
    width: 50%;
    padding: 10px;

  }
  .page-title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .interaction-form {
    margin-bottom: 20px;
  }
  
  .form-label {
    font-weight: bold;
  }
  
  .form-input {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  
  .form-button {
    padding: 8px 16px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 15px;
  }
  
  .form-button:hover {
    background-color: #0056b3;
  }
  
  .interaction-result {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .interaction-found {
    color: green;
  }
  
  .no-interaction {
    color: red;
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
  