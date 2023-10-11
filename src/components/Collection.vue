<template>
    <div>
      <h1>Gym Attire</h1>
      <div class="product-container">
        <router-link
          v-for="Product in Products"
          :key="Product._id"
          :to="'/Product/' + Product._id"
          class="product"
        >
          <img class="product-image" :src="Product.image" alt="Product Image">
          <p class="product-name">{{ Product.name }}</p>
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
    methods: {},
  };
  </script>
  
  <style >
  /* Specialized CSS for the Collection page */
  
  /* Style the page title */
  h1 {
    font-size: 2.5rem;
    /* Larger font size for the title */
    margin-bottom: 20px;
    color: #333;
    /* Dark text color */
  }

  body {    
    background-color: #838383;
  }
  
  /* Style the product container */
  .product-container {
    display: flex;
    flex-wrap: wrap; /* Allow products to wrap to the next row when there's not enough space */
    justify-content: center; /* Center products horizontally */
  }
  
  /* Style the individual product items */
  .product {
    border: 1px solid #ddd;
    /* Add a border around each product item */
    padding: 20px;
    margin: 20px;
    text-align: center;
    background-color: #fff;
    /* White background */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    /* Add a subtle shadow to each product */
    max-width: 300px; /* Set a maximum width for each product */
    flex: 1; /* Allow products to evenly distribute space in a row */
  }
  
  .product-image {
    max-width: 100%;
    /* Ensure images don't exceed their container */
    height: auto;
    /* Maintain image aspect ratio */
    margin-bottom: 10px;
  }
  
  /* Style the product name */
  .product-name {
    font-weight: bold;
    color: #007bff;
    /* Bright blue color */
    text-decoration: none;
    transition: color 0.3s;
    /* Add a smooth color transition on hover */
  }
  
  .product-name:hover {
    color: #0056b3;
    /* Change the text color when hovered */
  }
  </style>
  