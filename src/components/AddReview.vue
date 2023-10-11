<template>
  <div>
    <div class="star-rating">
      <span v-for="star in 5" :key="star" @click="setRating(star)" :class="{ 'filled': star <= review.rating }">&#9733;</span>
    </div>
    <p><textarea v-model="text" type="text" placeholder="Leave a review" class="input-field"></textarea></p>
    <v-btn @click="addReview">Upload Review</v-btn>
  </div>
</template>

<script>
import { decodeCredential } from 'vue3-google-login';
import { useRoute } from 'vue-router'; // Import useRouter

export default {
  name: "AddReview",
  data() {
    return {
      date: '', // Update data properties
      text: '',
      review: {
        userEmail: '',
        rating: 0,
        text: '',
        id: ''
      },
    };
  },
  mounted() {
       const route = useRoute();
       this.review.id = route.params.id
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
  },
  methods: {
    addReview() {
      console.log(`${this.date} ${this.review.rating} ${this.text}`);
      fetch(`http://localhost:4000/Product/${this.review.id}/AddReview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.userEmail,
          rating: this.review.rating,
          text: this.text,
        }),
      })
        .then(res => {
          console.log(res.status);
          this.review.rating = 0;
          this.text = '';
        })
        .catch(error => {
          console.error('An error occurred:', error);
        });
    },
    setRating(star) {
      this.review.rating = star;
    },
  },
};
</script>

<style>
.star-rating {
  font-size: 24px;
}
.star-rating span {
  cursor: pointer;
}
.star-rating span.filled {
  color: gold;
}
</style>
