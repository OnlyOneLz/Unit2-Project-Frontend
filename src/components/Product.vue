<template>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>eCommerce Product Detail</title>
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet">
        <!-- Include your Bootstrap and JavaScript libraries here -->
    </head>

    <body>
        <div v-if="dataReady" class="container">
            <div class="card">
                <div class="container-fliud">
                    <div class="wrapper row">
                        <div class="preview col-md-6">
                            <div class="preview-pic tab-content">
                                <div class="collection">
                                    <router-link :to="'/Collection'">
                                        <v-btn density="compact" class="edit-button">Go back</v-btn>
                                    </router-link>
                                </div>
                                <div class="tab-pane active" id="pic-1"><img :src="Product.image" alt="Product Image" />
                                </div>
                                <div v-if="admin" class="admin-options">
                                    <v-btn @click="deleteProduct" density="compact" class="edit-Button">Delete</v-btn>
                                    <router-link :to="'/EditProduct/' + Product._id">
                                        <v-btn @click="editProduct" density="compact" class="edit-button">Edit
                                            Product</v-btn>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <div class="details col-md-6">
                            <h3 class="product-title">{{ Product.name }}</h3>
                            <div class="rating">
                                <div class="stars">
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                </div>
                            </div>
                            <p class="product-description">{{ Product.description }}</p>
                            <h4 class="price">current price: <span>{{ price }}</span></h4>
                            <h5 class="sizes">sizes:
                                <span class="size" data-toggle="tooltip" title="small">s</span>
                                <span class="size" data-toggle="tooltip" title="medium">m</span>
                                <span class="size" data-toggle="tooltip" title="large">l</span>
                                <span class="size" data-toggle="tooltip" title="xtra large">xl</span>
                            </h5>
                            <h5 class="colors">colors:
                                <span class="color orange not-available" data-toggle="tooltip" title="Not In store"></span>
                                <span class="color green"></span>
                                <span class="color blue"></span>
                            </h5>
                            <div class="action">
                                <router-link :to="'/Login'">
                                    <v-btn v-if="!isLoggedIn" class="login-button">Login to add to basket</v-btn>
                                </router-link>
                                <div v-if="isLoggedIn">
                                    <v-btn @click="addToBasket" density="compact" class="add-to-basket-button">Add to
                                        Basket</v-btn>
                                </div>
                                <div class="removeBtn" v-if="displayRemoveBtn">
                                    <v-btn @click="removeProduct" density="compact" class="remove-from-basket-button">Remove
                                        from basket</v-btn>
                                </div>
                            </div>
                            <div v-if="isLoggedIn" class="addReviews">
                                <AddReview />
                            </div>
                        </div>
                    </div>
                </div>
                <v-btn class="showReviews" density="short" @click="toggleReviews">
                    {{ showReviews ? 'Hide Reviews' : 'Show Reviews' }}
                </v-btn>
                <div class="product-reviews" v-if="showReviews"> <!-- Add v-if directive here -->
                    <div class="reviews-container">
                        <h2>Reviews</h2>
                        <div v-for="review in reviews" :key="review._id" class="review-box">
                            <div class="review-details">
                                <div class="user">
                                    <img :src="review.image" alt="">
                                    <p>Made By- {{ review.name }}</p>
                                </div>
                                <p>Date - {{ review.date }}</p>
                                <p>Stars - {{ review.rating }}/5</p>
                                <p>- {{ review.text }}</p>
                            </div>
                            <div class="review-actions">
                                <v-btn v-if="review.userEmail === userEmail || admin" @click="deleteReview(review._id)">Delete
                                    Review</v-btn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>


  
<script>
import { decodeCredential } from 'vue3-google-login';
import { useRoute } from 'vue-router';
import AddReview from '../components/AddReview.vue'
export default {
    name: 'ProductVue',
    data() {
        return {
            error: '',
            Product: {},
            id: '',
            isLoggedIn: false,
            userName: '',
            userEmail: '',
            price: '',
            itemArray: [],
            displayRemoveBtn: false,
            item: null,
            message: '',
            reviewEmail: '',
            showReviews: false,
            admin: '',
            dataReady: false
        }
    },
    emits: ['length'],
    components: {
        AddReview
    },
    methods: {
        toggleReviews() {
            this.showReviews = !this.showReviews;
        },
        deleteProduct: function () {
            fetch(`${process.env.VUE_APP_BACKEND_API}/Product/${this.id}`, {
                method: 'DELETE',
            })
                .then(() => {
                    this.$router.replace({ path: '/Collection' });
                });
        },
        addToBasket: function () {
            fetch(`${process.env.VUE_APP_BACKEND_API}/AddToBasket`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: this.id,
                    email: this.userEmail,
                })

            }).then(res => res.json())
                .then(data => {
                    this.itemArray = data.items
                    console.log(data.items)
                })
                this.displayRemoveBtn = true
                location.reload()
        },
        removeProduct: function () {
            fetch(`${process.env.VUE_APP_BACKEND_API}/Product`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: this.id,
                    email: this.userEmail,
                }),
            }).then(res => res.json())
                .then(data => {
                    this.itemArray = data.items
                })
            let sum = 0
            this.itemArray.forEach(item => {
                if (this.id === item._id) {
                    sum++
                }
            })
            if (sum === 1) {
                this.displayRemoveBtn = false
            }
            location.reload()

        },
        itemExists: function (productId) {
            return this.itemArray.some((item) => item._id === productId);
        },
        deleteReview(reviewId) {
            fetch(`${process.env.VUE_APP_BACKEND_API}/Product/${reviewId}/Review`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .catch((error) => {
                    console.error('Error deleting review:', error);
                });
        },
        reloadPage: function () {
      location.reload
    }
    },
    mounted() {
        if (this.$cookies.isKey('user_session')) {
            this.isLoggedIn = true;
            const userData = decodeCredential(this.$cookies.get('user_session'));
            this.userName = userData.given_name;
            this.userEmail = userData.email;
            this.admin = false;
            if (this.userEmail === 'elliotrnlewis@gmail.com') {
                this.admin = true;
            }
        }
        const route = useRoute();
        fetch(`${process.env.VUE_APP_BACKEND_API}/Product/user/${this.userEmail}`)
            .then((response) => response.json())
            .then((result) => {
                this.itemArray = result.items;
                this.item = result;
                if (this.isLoggedIn) {
                    this.displayRemoveBtn = this.itemExists(route.params.id);
                    console.log(this.itemExists(route.params.id));
                    this.dataReady = true
                }
            });

        fetch(`${process.env.VUE_APP_BACKEND_API}/Product/${route.params.id}`)
            .then((response) => response.json())
            .then((result) => {
                this.Product = result;
                this.id = route.params.id;
                this.price = parseFloat(result.price.$numberDecimal);
                this.dataReady = true
            })
            .catch((error) => {
                this.error = 'Error fetching data: ' + error;
            });
        fetch(`${process.env.VUE_APP_BACKEND_API}/Product/${route.params.id}/Review`)
            .then((response) => response.json())
            .then((result) => {
                this.reviews = result
                this.reviewId = result._id
                this.id = route.params.id
                this.reviewImage = result.image
                this.reviewName = result.name
                this.dataReady = true
            })
            .catch((error) => {
                this.error = 'Error fetching data: ' + error;
            })
    },
    computed: {
        formatDate: function (date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(date).toLocaleDateString(undefined, options);
        }
    }
}
</script>
  
<style scoped>
body {
    font-family: 'open sans';
    overflow-x: hidden;
}

img {
    max-width: 100%;
}

.preview {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
}

@media screen and (max-width: 996px) {
    .preview {
        margin-bottom: 20px;
    }
}

.preview-pic {
    -webkit-box-flex: 1;
    -webkit-flex-grow: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
}

.preview-thumbnail.nav-tabs {
    border: none;
    margin-top: 15px;
}

.preview-thumbnail.nav-tabs li {
    width: 18%;
    margin-right: 2.5%;
}

.preview-thumbnail.nav-tabs li img {
    max-width: 100%;
    display: block;
}

.preview-thumbnail.nav-tabs li a {
    padding: 0;
    margin: 0;
}

.preview-thumbnail.nav-tabs li:last-of-type {
    margin-right: 0;
}

.tab-content {
    overflow: hidden;
}

.tab-content img {
    width: 100%;
    -webkit-animation-name: opacity;
    animation-name: opacity;
    -webkit-animation-duration: .3s;
    animation-duration: .3s;
}

.card {
    margin-top: 50px;
    background: #eee;
    padding: 3em;
    line-height: 1.5em;
}

@media screen and (min-width: 997px) {
    .wrapper {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
    }
}

.details {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
}

.colors {
    -webkit-box-flex: 1;
    -webkit-flex-grow: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
}

.product-title,
.price,
.sizes,
.colors {
    text-transform: UPPERCASE;
    font-weight: bold;
}

.checked,
.price span {
    color: #ff9f1a;
}

.addReviews {
    margin-top: 5vmin;
}

.product-title,
.rating,
.product-description,
.price,
.vote,
.sizes {
    margin-bottom: 15px;
}

.product-title {
    margin-top: 0;
}

.size {
    margin-right: 10px;
}

.size:first-of-type {
    margin-left: 40px;
}

.color {
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    height: 2em;
    width: 2em;
    border-radius: 2px;
}

.color:first-of-type {
    margin-left: 20px;
}

.add-to-cart,
.like {
    background: #ff9f1a;
    padding: 1.2em 1.5em;
    border: none;
    text-transform: UPPERCASE;
    font-weight: bold;
    color: #fff;
    -webkit-transition: background .3s ease;
    transition: background .3s ease;
}

.addReview {
    background-color: grey;
}

.add-to-cart:hover,
.like:hover {
    background: #b36800;
    color: #fff;
}

.not-available {
    text-align: center;
    line-height: 2em;
}

.not-available:before {
    font-family: fontawesome;
    content: "\f00d";
    color: #fff;
}

.orange {
    background: #0c082a;
}

.green {
    background: #ad0000;
}

.blue {
    background: #000000;
}

.tooltip-inner {
    padding: 1.3em;
}

body {
    background-color: bisque;
}

@-webkit-keyframes opacity {
    0% {
        opacity: 0;
        -webkit-transform: scale(3);
        transform: scale(3);
    }

    100% {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
}

@keyframes opacity {
    0% {
        opacity: 0;
        -webkit-transform: scale(3);
        transform: scale(3);
    }

    100% {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
}


.back-button,
.login-button,
add-to-basket-button,
remove-from-basket-button,
.delete-button,
edit-button,
delete-review-button,
edit-review-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    margin: 10px;
}

.showReviews {
    margin-top: 5vmin;
}

.admin-options {
    margin: 20px 0;
}

.login-button {
    background-color: #007bff;
}

.add-to-basket-button {
    background-color: #4caf50;
}

.remove-from-basket-button {
    background-color: #ff0000;
}

.product-reviews {
    text-align: center;
    min-height: 600px;
}

.reviews-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  

}

.review-box {
    font-size: small;
    max-width: 700px;
    width: 100%;
    background-color: rgb(255, 255, 255);
    border: 2px solid #000000;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 15px;
    max-height: 30vmin;
}

.review-details {
    font-size: 18px;
    color: #555;
    margin-bottom: 8px;
}

.review-actions button {
    padding: 8px 16px;
    margin: 5px;
    font-size: 16px;
    background-color: #FF7B00;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.review-actions button:hover {
    background-color: #FF6A00;
}

.user {
    display: flex;
    justify-content: space-between;
}

.user img {
    height: 30px;
}

.addReview {
    border: #000000;
    background-color: white;
}

p {
    font-family: 'Bebas Neue', sans-serif;
}

.edit-review-button,
delete-review-button {
    padding: 5px 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    margin-right: 10px;
}
</style>
