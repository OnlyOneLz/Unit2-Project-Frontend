<template>
  <div>
    <h1>Gym Attire</h1>
    <div class="product-container">
      <router-link v-for="Product in Products" :key="Product._id" :to="'/Product/' + Product._id" class="product">
        <div class="product-card">
          <img class="product-image" :src="Product.image" alt="Product Image">
          <p class="product-name">{{ Product.name }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollectionVue',
  data: () => ({
    error: '',
    Products: [],
  }),

  mounted() {
    fetch('http://localhost:4000/Collection')
      .then((response) => response.json())
      .then((result) => {
        this.Products = result;
      })
      .catch((error) => {
        this.error = 'Error fetching data: ' + error;
      });
  },
  methods: {}
}
</script>

<style scoped>
.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.product {
  text-decoration: none;
  color: #333;
}

.product-card {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  transition: transform 0.2s;
}

.product-card:hover {
  transform: scale(1.05);
}

.product-image {
  max-width: 100%;
  height: auto;
}

.product-name {
  font-size: 1.2rem;
  margin-top: 10px;
}
</style>

  