<template>
    <h1>Product</h1>
    <ul>
        <img class="product-image" :src="Product.image" alt="Product Image">
        <p>{{ Product.name }}</p>
        <p>Description: {{ Product.description }}</p>
        <p>Price: £ {{ price }}</p>
    </ul>
    <div class="collection"><router-link :to="'/Collection'">
            <button>Back to collection</button>
        </router-link></div>

    <div v-if="admin" class="adminOnly"><button @click="deleteProduct">Delete</button>
        <router-link :to="'/EditProduct/' + Product._id">
            <button @click="editProduct">Edit Product</button>
        </router-link>
    </div>
    <router-link :to="'/Login'"><button v-if="!isLoggedIn">
            Login to add to basket</button>
    </router-link>

    <div v-if="isLoggedIn">
        <button @click="addToBasket">Add to Basket</button>
    </div>
    <div v-if="displayRemoveBtn">
        <button @click="removeProduct">Remove from basket</button>
    </div>
</template>
<script>
import { useRoute } from 'vue-router'
import { decodeCredential } from 'vue3-google-login';
export default {
    name: 'ProductVue',
    data: () => ({
        error: '',
        Product: {},
        id: '',
        isLoggedIn: false,
        userName: '',
        userEmail: '',
        price: '',
        itemArray: [],
        displayRemoveBtn: false,
        item: null
    }),
    methods: {
        deleteProduct: function () {
            fetch(`http://localhost:4000/Product/${this.id}`, {
                method: "DELETE"
            })
                .then(() => {
                    this.$router.replace({ path: '/Collection' })
                }
                )
        },
        addToBasket: function () {
            fetch(`http://localhost:4000/AddToBasket`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: this.id,
                    email: this.userEmail,
                })
            })
        },
        removeProduct: function () {
            fetch(`http://localhost:4000/Product`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: this.id,
                    email: this.userEmail,
                })

            })
        },
        itemExists: function (productId) {
            return this.itemArray.some(item => item._id === productId);
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
        const route = useRoute()
        fetch(`http://localhost:4000/Product/user/${this.userEmail}`)
            .then((response) => response.json())
            .then((result) => {
                this.itemArray = result.items
                this.item = result
                this.displayRemoveBtn = this.itemExists(route.params.id);
                console.log(this.itemExists(route.params.id));
            })


        fetch(`http://localhost:4000/Product/${route.params.id}`)
            .then((response) => response.json())
            .then((result) => {
                this.Product = result
                this.id = route.params.id
                this.price = parseFloat(result.price.$numberDecimal)



            })
            .catch((error) => {
                this.error = 'Error fetching data: ' + error;
            })
    }
}

</script>
<style>
body {
    background-color: #838383;
}
</style>