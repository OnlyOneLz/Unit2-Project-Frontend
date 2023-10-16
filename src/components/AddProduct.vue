<template>
  <div class="add-product-page">
    <h1>Add a Product</h1>
    <div class="input-container">
      <p><input v-model="product.image" type="text" placeholder="Image URL" class="input-field"></p>
      <img :src="product.image" alt="Product Image" class="product-image-preview">
      <p><input v-model="product.name" type="text" placeholder="Name" class="input-field"></p>
      <p><textarea v-model="product.description" type="text" placeholder="Description" class="input-field"></textarea></p>
      <p><input v-model="product.price" type="number" placeholder="Price" class="input-field"></p>
    </div>
    <p><button @click="AddProduct" class="add-button">Add New Product</button></p>
  </div>
</template>
<script>
export default {
  name: 'AddProductVue',
  data: () => ({
    error: '',
    product: {
      name: '',
      description: '',
      price: '',
      image: ''
    }
  }),
  methods: {
    AddProduct: function () {
      console.log(`${this.product.name} ${this.product.description} ${this.product.price}`)
      fetch(`${process.env.VUE_APP_BACKEND_API}/AddProduct`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
           name: this.product.name,
           description: this.product.description,
           price: this.product.price,
           image: this.product.image
          })
        })
        .then(res => {
          console.log(res.status);
          this.product.name = '';
          this.product.description = '';
          this.product.price = '';
          this.product.image = '';
        })
      }
    }
  }

</script>

<style scoped>
.add-product-page {
  text-align: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.input-container {
  margin: 20px auto;
  max-width: 300px;
  text-align: left;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.product-image-preview {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.add-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}
</style>
