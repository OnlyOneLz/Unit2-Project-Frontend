<template>
  <v-app>
    <v-main>
      <v-container>
        <section class="hero">
          <h1>Welcome to Fitness Fien</h1>
          <p>Your journey to a healthier you starts here.</p>
        </section>

        <section class="featured-products">
          <h2>Featured Products</h2>
          <div class="product-container">
            <div class="product-card">
              <img src="product1.jpg" alt="Fien Gym Top">
              <h3>Fien Gym Top</h3>
              <h4>£22.99</h4>
              <p>High-quality gym top for your workouts.</p>
              <v-btn color="primary">Buy Now</v-btn>
            </div>
            <div class="product-card">
              <img src="product2.jpg" alt="Product 2">
              <h3>Product 2</h3>
              <p>Description of Product 2.</p>
              <v-btn color="primary">Buy Now</v-btn>
            </div>
            <div class="product-card">
              <img src="product2.jpg" alt="Product 2">
              <h3>Product 2</h3>
              <p>Description of Product 2.</p>
              <v-btn color="primary">Buy Now</v-btn>
            </div>
            <div class="product-card">
              <img src="product2.jpg" alt="Product 2">
              <h3>Product 2</h3>ß
              <p>Description of Product 2.</p>
              <v-btn color="primary">Buy Now</v-btn>
            </div>
         
            <!-- Add more product cards as needed -->
          </div>
        </section>

        <section class="call-to-action" v-if="!isLoggedIn">
          <h2>Join Us Today</h2>
          <p>Start your fitness journey with Fitness Fien. Get access to top-quality products and expert guidance.</p>
          <router-link to="/Login">Sign Up Now</router-link>
        </section>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { decodeCredential } from 'vue3-google-login';

export default {
  name: 'HomeVue',
  data: () => ({
    // Your data here
    isLoggedIn: false,
    userName: '',
    userEmail: '',
    admin: false,
  }),
  mounted() {
    // Your authentication logic here
    if (this.$cookies.isKey('user_session')) {
      this.isLoggedIn = true;

      const userData = decodeCredential(this.$cookies.get('user_session'));
      this.userName = userData.given_name;
      this.userEmail = userData.email;
      this.admin = this.userEmail === 'elliotrnlewis@gmail.com';
    }
  },
};
</script>
<style scoped>
/* Add your styles here */
.hero {
  background-image: url('');
  object-fit: contain;
  background-size: cover;
  background-position: center;
  text-align: center;
  color: #000000;
  padding: 100px 0;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

.hero p {
  font-size: 1.5rem;
  margin-bottom: 40px;
}

.featured-products {
  background-color: #ffffff;
  padding: 40px 0;
}

.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}

.product-card {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  margin: 20px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 300px;
}

.product-card img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.product-card h3 {
  font-size: 1.5rem;
}

.product-card p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.product-card h4 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.call-to-action {
  background-color: #007bff;
  color: #fff;
  text-align: center;
  padding: 60px 0;
}

.call-to-action h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.call-to-action p {
  font-size: 1.5rem;
  margin-bottom: 40px;
}

.call-to-action a {
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
}

</style>