<template>
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Croissant+One&family=Titillium+Web:wght@200&family=Victor+Mono:wght@100&family=Young+Serif&display=swap" rel="stylesheet">
  </head>
  <v-app>
    <v-app-bar app>
      <!-- Logo -->
      <v-img
        class="mr-2"
        src="./assets/Logo.png"
        max-height="100"
        max-width="200"
        contain
      ></v-img>

      <!-- Always visible links -->
      <v-btn to="/">Home</v-btn>
      <v-btn to="/Collection">Collection</v-btn>
      <v-btn to="/AboutUs">About Us</v-btn>
      <!-- Conditional links based on user authentication -->
      <v-btn v-if="isLoggedIn" to="/Login">Profile</v-btn>
      <v-btn v-if="isLoggedIn" to="/Workouts">Workouts</v-btn>
      <v-btn v-if="isLoggedIn" to="/Basket">Basket</v-btn>
      <v-btn v-if="isLoggedIn && admin" to="/AddProduct">Admin</v-btn>
      <v-btn v-if="!isLoggedIn" to="/Login">Login</v-btn>
      <!-- Add more router links with conditionals -->
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
  }),
  mounted() {
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




<style>
@import './assets/css/basic.css';
@import 'bootstrap';
</style>
