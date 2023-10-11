<template>
  <div>
    <v-btn type="button" class="btn btn-primary" @click="modalToggle">Checkout</v-btn>
    <div ref="modal" class="modal" :class="{ show: active }">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Checkout</h5>
            <router-link :to="'/'">
              <button type="button" class="close" @click="modalToggle">
                <span aria-hidden="true">&times;</span>
              </button>
            </router-link>
          </div>
          <div class="modal-body">
            <p>Thank you for Shopping with Fitness Fien</p>
            <p>Your Basket Total was: £{{ sum }}</p>
            <p>Your receipt will be sent to: {{ userEmail }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="active" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import { decodeCredential } from 'vue3-google-login';

export default {
  name: 'ModalVue',
  data: () => ({
    active: false,
  }),
  mounted() {
    if (this.$cookies.isKey('user_session')) {
      this.isLoggedIn = true;
      const userData = decodeCredential(this.$cookies.get('user_session'));
      this.userName = userData.given_name;
      this.userEmail = userData.email;
    }
    fetch(`http://localhost:4000/Basket/${this.userEmail}`)
      .then((response) => response.json())
      .then((result) => {
        this.items = result.items;

        let sum = 0
        console.log(this.items[0].price.$numberDecimal)
        for (let i = 0;i <= this.items.length; i++){
        sum = sum + parseFloat(this.items[i].price.$numberDecimal)  
        this.sum = sum
        console.log(sum)
        
      }
    })
    
      .catch((error) => {
        console.error('Error fetching data: ' + error);
      });
},
  methods: {
    modalToggle() {
        const body = document.querySelector('body');
        this.active = !this.active;
        this.active ? body.classList.add('modal-open') : body.classList.remove('modal-open');
        fetch(`http://localhost:4000/Basket/User`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.userEmail,
          
        })
      })
  }
   
    
}
}
</script>

<style scoped>
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  justify-content: center;
  align-items: center;
}

.modal.show {
  display: flex;
}

.modal-dialog {
  max-width: 600px;
  width: 90%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.modal-title {
  font-size: 1.8rem;
  margin: 0;
  padding: 15px;
  border-bottom: 1px solid #ccc;
  background-color: #f0f0f0;
}

.modal-content {
  padding: 15px;
}

.modal-body p {
  font-size: 1.2rem;
  margin-bottom: 10px;
  text-align: left;
}

.modal-backdrop {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 900;
}

.modal-backdrop.show {
  display: block;
}
</style>

