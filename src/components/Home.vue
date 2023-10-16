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
          <v-row justify="center">
            <v-col cols="12" md="6" lg="4" v-for="product in products" :key="product.id">
              <router-link :to="'/Product/' + product.id">
                <v-card class="product-card" elevation="3">
                  <v-img :src="product.image" alt="Product Image"></v-img>
                  <v-card-title class="product-title">{{ product.name }}</v-card-title>
                  <!-- <v-card-subtitle class="product-price">£{{ product.price }}</v-card-subtitle> -->
                </v-card>
              </router-link>
            </v-col>
          </v-row>
        </section>
      </v-container>

      <!-- Footer section -->
      <v-footer app>
        <v-container v-if="isLoggedIn">
          <v-row>
            <v-col cols="12" md="6">
              <h3> Check out our free workouts </h3>
              <v-btn><router-link :to="'/Workouts'">Here</router-link></v-btn>
            </v-col>
            <v-col cols="12" md="6">
              <!-- Add any additional footer content here -->
            </v-col>
          </v-row>
        </v-container>
      </v-footer>
      <v-footer app>
        <v-container v-if="!isLoggedIn">
          <v-row>
            <v-col cols="12" md="6">
              <h3> To shop with us and gain access to Free Workouts</h3>
              <v-btn><router-link :to="'/Login'">Sign Up Now</router-link></v-btn>
            </v-col>
            <v-col cols="12" md="6">
              <!-- Add any additional footer content here -->
            </v-col>
          </v-row>
        </v-container>
      </v-footer>
      <div class="cookie-banner" v-if="!acceptedCookies">
        <p class="cookie-text">
          This website uses cookies to ensure you get the best experience.
          <v-btn @click="acceptCookies">Accept</v-btn>
          <v-btn @click="rejectCookies">Reject</v-btn>
        </p>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { decodeCredential } from 'vue3-google-login';
export default {
  name: 'HomeVue',
  data: () => ({
    isLoggedIn: false,
    userName: '',
    userEmail: '',
    admin: false,
    acceptedCookies: false,
    products: [
      {
        id: '652663ccf856f0929ce2217e',
        name: 'Performance Leggings',
        price: 11.99,
        image: 'https://as1.ftcdn.net/v2/jpg/06/36/70/96/1000_F_636709613_u1xYgieAdfmz4x8mG7GNlosO0URUjkyQ.jpg',
      },
      {
        id: "65266420f856f0929ce22184",
        name: 'Compression Shorts',
        price: 8.99,
        image: 'https://as2.ftcdn.net/v2/jpg/04/89/27/23/1000_F_489272337_vZbpyJDYdxSCdRzQvuN6MsgKPMM8lhRK.jpg',
      },
      // {
      //   id: '65266439f856f0929ce22187',
      //   name: 'Racerback Sports Bras',
      //   price: 14.99,
      //   image: 'https://as1.ftcdn.net/v2/jpg/06/30/40/72/1000_F_630407279_Lnn720EjN3ukEaqJGWlO0GNupfKWNoxs.jpg',
      // },
      {
        id: '6526640af856f0929ce22181',
        name: 'Muscle Tank Top',
        price: 15.99,
        image: 'https://as2.ftcdn.net/v2/jpg/04/20/60/69/1000_F_420606930_z7y2HpkIAEx9ryTC7HDgJ3aNEZ7mDwC2.jpg',
      },
    ],
    accepted: false,
  }),
  methods: {
    acceptCookies() {
      this.accepted = true;
      this.acceptedCookies = true
      this.$cookies.set('acceptedCookies', true);
    },
    rejectCookies() {
      this.accepted = true;
      this.acceptedCookies = true
      this.$cookies.set('acceptedCookies', true);
    }
  },
  mounted() {
    if (this.$cookies.isKey('user_session')) {
      this.isLoggedIn = true;
      const userData = decodeCredential(this.$cookies.get('user_session'));
      this.userName = userData.given_name;
      this.userEmail = userData.email
      this.admin = false
      if (this.userEmail === 'elliotrnlewis@gmail.com') {
        this.admin = true
      }
    }
    const acceptedCookies = this.$cookies.isKey('acceptedCookies')
    if (acceptedCookies) {
      this.acceptedCookies = true
    }

  }
}
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #333;
  color: #fff;
  text-align: center;
  padding: 10px;
  z-index: 1000;
  display: flex;
  justify-content: center;
}

.cookie-text {
  margin: 0;
  color: #fff;
}

button {
  background: #007bff;
  color: #000000;
  border: none;
  margin: 0 5px;
  cursor: pointer;
}

.product-card {
  max-width: 100%;
  text-align: center;
  transition: transform 0.2s;
  cursor: pointer;
}

router-link {
  color: black;
}

.product-card:hover {
  transform: scale(1.05);
}

.product-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.product-price {
  font-size: 1rem;
  color: #007bff;
}

p {
  display: flex;
  justify-content: center;
}

a {
  color: #000000;

}
v-footer,
s {
  background-color: #ffffff;
  color: #060606;
  text-align: center;
  padding: 40px 0;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}</style>
