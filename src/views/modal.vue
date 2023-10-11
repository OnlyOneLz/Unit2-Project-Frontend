<template>
    <!-- <div>  
    <p><a href="#" @click="modalToggle">now</a></p> -->
    <div>
        <button type="button" class="btn btn-primary" @click="modalToggle">Checkout</button>
        <div ref="modal" class="modal fade" :class="{ show: active, 'd-block': active }" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Checkout</h5>
                        <router-link :to="'/'"><button type="button" class="close" data-dismiss="modal" aria-label="Close"
                                @click="modalToggle">
                                <span aria-hidden="true">&times;</span>
                            </button></router-link>
                    </div>
                    <div class="modal-body">
                        <p>Thank you for Shopping with Fitness Fien</p>
                        <p>Your Basket Total was:</p>
                        <p>Your recipt will be sent to: {{ userEmail }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="active" class="modal-backdrop fade show"></div>
    </div>
    <!-- </div> -->
</template>
<script>
import { decodeCredential } from 'vue3-google-login';
export default {
    name: "modalVue",
    data: () => ({
        active: false
    }),
    mounted() {
        if (this.$cookies.isKey('user_session')) {
            this.isLoggedIn = true;
            const userData = decodeCredential(this.$cookies.get('user_session'));
            this.userName = userData.given_name;
            this.userEmail = userData.email
        }
        // fetch(`http://localhost:4000/Checkout/${this.userEmail}`)
        //     .then((response) => response.json())
        //     .then((result) => {
        //         this.items = result.items
                
            },

                methods: {
                modalToggle() {
                    const body = document.querySelector("body")
                    this.active = !this.active
                    this.active ? body.classList.add("modal-open") : body.classList.remove("modal-open")
                },
            },
}
</script>
<style></style>
