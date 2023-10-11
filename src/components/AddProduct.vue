<template>
  <div class="add-book-container">
      <h1>Add a Product</h1>
      <p><input v-model="product.image" type="text" placeholder="Image URL"><br></p>
    <img :src="product.image" alt="Product Image">
      <p><input v-model="product.name" type="text" placeholder="Name"></p>
      <p><textarea v-model="product.description" type="text" placeholder="Description"></textarea></p>
      <p><input v-model="product.price" type="number" placeholder="Price"></p>
      <p><button @click="AddProduct">Add New Product</button></p>
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
      fetch('http://localhost:4000/AddProduct', {
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
<style>
body{
    background-color: #838383;
}
</style>