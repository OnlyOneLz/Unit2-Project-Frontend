<template>
    <h1>Edit a product</h1>
    <div class="container">
    <p class="img"><input v-model="product.image" type="text" placeholder="Image URL"><br></p>
    <img :src="product.image" alt="Product Image">
    <p><input v-model="product.name" type="text" placeholder="Product name"><br></p>
    <p><input v-model="product.description" type="text" name="Product description" placeholder="book date"></p>
    <p><input v-model="price" type="text" placeholder="Product price £"><br></p>
    <router-link :to="'/Product/' + product._id">
        <button >Go Back</button>
      </router-link>
    <p><v-btn v-on:click="editProduct">Update Product</v-btn></p>
</div>
</template>
<script>
import { useRoute } from 'vue-router'
import { decodeCredential } from 'vue3-google-login';
export default {
    name: 'BookAddNew',
    data: () => ({
        error: '',
        product: '',
        id: '',
        userEmail: '',
    }),
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
        const route = useRoute()
        fetch(`${process.env.VUE_APP_BACKEND_API}/Product/${route.params.id}`)
            .then((response) => response.json())
            .then((result) => {
                this.product = result  
                console.log(result);
                this.price = result.price.$numberDecimal
                this.id = route.params.id
            })
            .catch((error) => {
                this.error = 'Error fetching data: ' + error;
            });
    },
    methods: {
        editProduct: function () {
            fetch(`${process.env.VUE_APP_BACKEND_API}/EditProduct/${this.id}`, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                   name: this.product.name,
                   description: this.product.description,
                   price: this.price,
                   image: this.product.image,
                   email: this.userEmail,
                   id: this.id
                })
            })
                .then(() => {
                    this.$router.replace({ path: `/Product/${this.id}` })
                })
                .catch((error) => {
                    console.error("Error editing Product:", error);
                });
        }
    }
}
</script>
<style scoped>
body{
    background-color: #838383;
}
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
