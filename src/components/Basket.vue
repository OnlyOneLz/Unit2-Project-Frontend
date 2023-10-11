<template>
  <div class="basket">
    <h1>Your Basket</h1>

    <div v-if="items.length === 0">
      <p>Your basket is empty.</p>
      <router-link to="/Collection">Browse Our Collection</router-link>
    </div>

    <div v-else>
      <div v-for="item in items" :key="item._id" class="basket-item">
        <router-link :to="'/Product/' + item._id">
          <div class="item-details">
            <img class="product-image" :src="item.image" alt="Product Image">
            <p class="item-name">{{ item.name }}</p>
          </div>
        </router-link>
        <p class="item-price">Price: £{{ item.price.$numberDecimal }}</p>
        <button @click="removeItem(item._id)">Remove item</button>
      </div>

      <div class="total">
        <p>Your Basket Total: £{{ sum.toFixed(2) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { decodeCredential } from 'vue3-google-login';

export default {
  name: 'BasketVue',
  data: () => ({
    userName: '',
    userEmail: '',
    items: [],
    sum: 0,
  }),
  mounted() {
    if (this.$cookies.isKey('user_session')) {
      const userData = decodeCredential(this.$cookies.get('user_session'));
      this.userName = userData.given_name;
      this.userEmail = userData.email;
    }

    fetch(`http://localhost:4000/Basket/${this.userEmail}`)
      .then((response) => response.json())
      .then((result) => {
        this.items = result.items;

        // Calculate the total sum of items in the basket
        this.sum = this.items.reduce((total, item) => total + parseFloat(item.price.$numberDecimal), 0);
      })
      .catch((error) => {
        console.error('Error fetching data: ' + error);
      });
  },
  methods: {
    methods: {
  removeItem(itemId) {
    fetch(`http://localhost:4000/user/Basket`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.userEmail,
        id: itemId
      })
    })
      .then(() => {
         // Reload the page or update the basket items without a reload
          this.items = this.items.filter((item) => item._id !== itemId);
          // Recalculate the total sum
          this.sum = this.items.reduce((total, item) => total + parseFloat(item.price.$numberDecimal), 0);
        window.location.reload();
      });
  },
},

    removeItem(itemId) {
      fetch(`http://localhost:4000/user/Basket`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.userEmail,
          id: itemId
        })
      })
        .then(() => {
          // Reload the page or update the basket items without a reload
          this.items = this.items.filter((item) => item._id !== itemId);
          // Recalculate the total sum
          this.sum = this.items.reduce((total, item) => total + parseFloat(item.price.$numberDecimal), 0);
        });
    },
  },
};
</script>

<style scoped>
.basket {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2.5rem;
  color: #333;
}

.basket-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
}

.product-image {
  max-width: 100px;
  height: auto;
  margin-right: 20px;
}

.item-name {
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.item-price {
  font-size: 1.2rem;
  color: #555;
}

button {
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #c0392b;
}

.total {
  text-align: right;
  margin-top: 20px;
  font-size: 1.6rem;
  font-weight: bold;
}
</style>


  