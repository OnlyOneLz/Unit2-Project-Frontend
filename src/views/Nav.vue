<template>
  <header>
    <div class="nav-container">
      <!-- Logo section -->
      <div class="logo">
        <img src="../assets/img/Logo.png" alt="Logo">
        <div class="nav-links">
        <router-link :to="'/'">Home</router-link>
        <router-link :to="'/Collection'">Collection</router-link>
        <router-link :to="'/AboutUs'">About Us</router-link>
        <div v-if="isLoggedIn"> <router-link :to="'/Basket'">Basket</router-link></div>
        <div v-if="!isLoggedIn"><router-link :to="'/Login'">Login</router-link></div>
        <div v-if="isLoggedIn"><router-link :to="'/Login'">Hello {{ userName }}</router-link></div>
        <div v-if="admin"><router-link :to="'/AddProduct'">Add Product</router-link></div>
      </div>
      </div>
     
    </div>
  </header>
</template>

<script>
import { decodeCredential} from 'vue3-google-login';
export default {
  name: 'navVue',
  data: () => ({
  isLoggedIn: false,
        userName: '',
        userEmail: '',
  }
),
  mounted() {
        if (this.$cookies.isKey('user_session')) {
            this.isLoggedIn = true;
            const userData = decodeCredential(this.$cookies.get('user_session'));
            this.userName = userData.given_name;
            this.userEmail = userData.email
            this.admin = false 
            console.log(this.userEmail);
        if (this.userEmail === 'elliotrnlewis@gmail.com'){
          this.admin = true
        }
      }
    }
  }
</script>

<style scoped>
/* Style the header/navigation bar */
header {
  background-color: #333; /* Dark background color */
  color: #fff; /* Light text color */
  padding: 10px 0;
  display: flex;
  justify-content: space-between; /* Add space between logo and navigation links */
  align-items: center; /* Center vertically within the header */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); /* Add a subtle box shadow */
}

/* Style the container for router links */
.nav-container {
  max-width: 1200px;
  margin: 0 auto; /* Center the container horizontally */
  width: 90%; /* Adjust the width as needed */
}

/* Style the navigation links */
.nav-links {
  display: flex;
  justify-content: space-around;
}

/* Style the links */
router-link {
  color: #fff; /* White links */
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s; /* Add a smooth color transition on hover */
}

router-link:hover {
  color: #000000; /* Change the link color when hovered to a bright blue */
  text-decoration: underline;
}

/* Style the logo */
.logo img {
  max-width: 100px;
  max-height: 100px; /* Adjust the max height as needed */
  border-radius: 50%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3); /* Add a subtle shadow to the logo */
}

</style>
