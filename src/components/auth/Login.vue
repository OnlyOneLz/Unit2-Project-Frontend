<template>
  <div class="login-container">
    <h1 class="page-title">Create an account | Login</h1>
    <div v-if="isLoggedIn" class="user-info">
      <h2>Hello {{ userName }}</h2>
      <button class="btn btn-primary" @click="handleLogOut">Log Out</button>
    </div>
    <div v-else class="login-form">
      <GoogleLogin :callback="callback" />
    </div>
  </div>
</template>
<script>
import { decodeCredential, googleLogout } from 'vue3-google-login';
export default {
  name: "LoginForm",
  data: () => ({
    isInit: false,
    isLoggedIn: false,
    userName: ''
  }),
  mounted() {
    if (this.$cookies.isKey('user_session')) {
      this.isLoggedIn = true;
      const userData = decodeCredential(this.$cookies.get('user_session'));
      this.userName = userData.given_name;
    }
  },
  methods: {
    callback: function (response) {
      this.isLoggedIn = true;
      const userData = decodeCredential(response.credential);
      console.log(userData);
      this.userName = userData.given_name;
      this.$cookies.set('user_session', response.credential);
      location.reload()
      fetch(`${process.env.VUE_APP_BACKEND_API}/user/login`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: userData.email
        })
      })
        .then(() => {
          console.log('session saved');
        });
    },
    handleLogOut: function () {
      googleLogout();
      this.$cookies.remove('user_session');
      this.isLoggedIn = false;
      location.reload()
    }
  }
};
</script>
<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

.page-title {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.login-form {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.user-info {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  font-size: 1.2rem;
  color: #333;
  margin: 10px 0;
}

.btn {
  background: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background: #0056b3;
}
</style>

  