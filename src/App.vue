<template>
  <v-app v-if="dataReady">
    <v-app-bar app>
      <v-img class="mr-2" src="./assets/img/Free_Sample_By_Wix.jpg" max-height="100" max-width="200" contain></v-img>
      <v-btn to="/">Home</v-btn>
      <v-btn to="/Collection">Collection</v-btn>
      <v-btn to="/AboutUs">About Us</v-btn>
      <div class="navLinks">
        <div class="left-links">
          <v-btn v-if="isLoggedIn" to="/Workouts">Workouts</v-btn>
          <v-btn v-if="isLoggedIn" to="/Basket">Basket
            <span v-if="isLoggedIn" to="/Basket" class="basketLength">{{ length }}</span></v-btn>
        </div>
        <div class="right-links">
          <v-btn v-if="isLoggedIn && admin" to="/AddProduct">Admin</v-btn>
          <v-btn v-if="!isLoggedIn" to="/Login">Login</v-btn>
          <v-btn v-if="isLoggedIn" to="/Login">Profile</v-btn>
          <v-img v-if="isLoggedIn" class="user-image" :src="image"></v-img>
        </div>
      </div>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main> 
  </v-app>
</template>

<script>
import { decodeCredential } from 'vue3-google-login';
export default {
  name: 'App',
  data: () => ({
    isLoggedIn: false,
    userName: '',
    userEmail: '',
    admin: false,
    image: '',
    itemArray: [],
    items: '',
    length: '',
    dataReady: false
  }),
  mounted() {
    if (this.$cookies.isKey('user_session')) {
      this.isLoggedIn = true;

      const userData = decodeCredential(this.$cookies.get('user_session'));
      this.userName = userData.given_name;
      this.userEmail = userData.email;
      this.image = userData.picture;
      this.admin = this.userEmail === 'elliotrnlewis@gmail.com';
    }
    fetch(`${process.env.VUE_APP_BACKEND_API}/Basket/${this.userEmail}`)
      .then((response) => response.json())
      .then((result) => {
        this.items = result.items;
        this.dataReady = true
      })
      .catch((error) => {
        this.error = 'Error fetching data: ' + error;
      });
    
    fetch(`${process.env.VUE_APP_BACKEND_API}/Product/user/${this.userEmail}`)
      .then((response) => response.json())
      .then((result) => {
        this.itemArray = result.items;
        this.length = this.itemArray.length
        this.dataReady = true
      })
      .catch((error) => {
        this.error = 'Error fetching data: ' + error;
      });
  },
  methods: {
  }
}
</script>

<style scoped>
.user-image {
  border-radius: 50%;
  width: 48px;
  height: 48px;
}

.navLinks {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.left-links {
  display: flex;
  align-items: center;
}

.right-links {
  display: flex;
  align-items: center;
}

.basketLength {
  border-radius: 50%;
  background-color: rgb(0, 0, 0);
  color: white;
  margin-bottom: 10px;
}

.v-btn {
  margin-right: 10px;
}

.right-links .v-btn {
  color: #000000;
  margin-right: 20px;
  padding: 10px 20px;
  border-radius: 4px;
}

#pic-1 {
  max-height: fit-content;
  max-width: fit-content;
  border-radius: 75%;
}


@import './assets/css/basic.css';
@import 'bootstrap';
</style>
