<template>
    <div class="product-page">
        <ul>
            <img class="product-image" :src="Product.image" alt="Product Image">
            <p class="product-name">{{ Product.name }}</p>
            <p class="product-description">Description: {{ Product.description }}</p>
            <p class="product-price">Price: £ {{ price }}</p>
        </ul>
        <div class="collection">
            <router-link :to="'/Collection'">
                <v-btn class="back-button">Go back</v-btn>
            </router-link>
        </div>

        <div v-if="admin" class="admin-options">
            <v-btn @click="deleteProduct"   class="delete-button">Delete</v-btn>
            <router-link :to="'/EditProduct/' + Product._id">
                <v-btn @click="editProduct" density="compact" class="edit-button">Edit Product</v-btn>
            </router-link>
        </div>

        <router-link :to="'/Login'">
            <v-btn v-if="!isLoggedIn" class="login-button">Login to add to basket</v-btn>
        </router-link>

        <div v-if="isLoggedIn">
            <v-btn @click="addToBasket" density="compact" class="add-to-basket-button">Add to Basket</v-btn>
        </div>
        <div v-if="displayRemoveBtn">
            <v-btn @click="removeProduct" density="compact" class="remove-from-basket-button">Remove from basket</v-btn>
        </div>

    </div>

    <div class="reviews-container">
        <h2>Reviews</h2>
        <div v-for="review in reviews" :key="review._id" class="review-box">
            <div class="review-details">
                <div>
                    <p class="review-text">{{ review.text }}</p>
                </div>
                <div class="star-rating">
                    <span v-for="i in review.rating" :key="i" class="star">&#9733;</span>
                </div>
            </div>
            <div v-if="review.userEmail === userEmail" class="review-actions">
                <v-btn @click="deleteReview(review._id)" class="delete-review-button">Delete Review</v-btn>
            </div>
        </div>
        <AddReview />
    <MessageModal></MessageModal>
    </div>
</template>
  
<script>
import { decodeCredential } from 'vue3-google-login';
import { useRoute } from 'vue-router';
import AddReview from '../components/AddReview.vue'
import MessageModal from '../views/MessageModal.vue';

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
            message: ''
        };
    },
    components: {
        AddReview,
        MessageModal
    },
    methods: {
        deleteProduct: function () {
            fetch(`http://localhost:4000/Product/${this.id}`, {
                method: 'DELETE',
            })
                .then(() => {
                    this.$router.replace({ path: '/Collection' });
                });
        },
        addToBasket: function () {
            fetch(`http://localhost:4000/AddToBasket`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: this.id,
                    email: this.userEmail,
                }),
            })
        },
        removeProduct: function () {
            fetch(`http://localhost:4000/Product`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: this.id,
                    email: this.userEmail,
                }),
            })
        },
        itemExists: function (productId) {
            return this.itemArray.some((item) => item._id === productId);
        },
        deleteReview(reviewId) {
            fetch(`http://localhost:4000/Product/${reviewId}/Review`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .catch((error) => {
                    console.error('Error deleting review:', error);
                });
        },
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
        fetch(`http://localhost:4000/Product/user/${this.userEmail}`)
            .then((response) => response.json())
            .then((result) => {
                this.itemArray = result.items;
                this.item = result;
                this.displayRemoveBtn = this.itemExists(route.params.id);
                console.log(this.itemExists(route.params.id));
            });

        fetch(`http://localhost:4000/Product/${route.params.id}`)
            .then((response) => response.json())
            .then((result) => {
                this.Product = result;
                this.id = route.params.id;
                this.price = parseFloat(result.price.$numberDecimal);
            })
            .catch((error) => {
                this.error = 'Error fetching data: ' + error;
            });
        fetch(`http://localhost:4000/Product/${route.params.id}/Review`)
            .then((response) => response.json())
            .then((result) => {
                this.reviews = result
                this.reviewId = result._id
                this.id = route.params.id
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
.message {
  font-size: 1rem;
  color: #4caf50;
  margin-top: 10px;
  font-weight: bold;
}
.product-page {
    text-align: center;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.product-image {
    max-width: 50vmin;
    max-height: 50vmin;
    height: auto;
    margin-bottom: 20px;
}

.product-name {
    font-size: 2rem;
    color: #333;
    font-weight: bold;
}

.product-description {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 20px;
}

.product-price {
    font-size: 1.5rem;
    color: #007bff;
}

.back-button,
.login-button,
add-to-basket-button,
remove-from-basket-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    margin: 10px;
}

.delete-button,
edit-button,
delete-review-button,
edit-review-button {
    padding: 10px 20px;
    background-color: #ff0000;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    margin: 10px;
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
    background-color: #ff5722;
}

.reviews-container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    margin-top: 15px;
    max-height: 54vmin;
    /* Set a maximum height for the container */
    overflow-y: auto;
    /* Add a vertical scrollbar when content overflows */
    justify-content: center;
    justify-items: center;
    align-items: center;
    text-align: center;
}

.review-box {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 8px;
    margin: 10px 0;
    width: 40vmin;
    max-height: 30vmin;
    justify-content: center;
    flex-direction: row;

}

.review-details {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 5vmin;
    margin-bottom: 10px;
}

.star {
    color: gold;
}

.review-text {
    font-size: 1rem;
}

.review-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 10px;
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
  