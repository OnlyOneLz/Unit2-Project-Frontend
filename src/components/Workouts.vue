<template>
    <div>
      <h1>Workouts for you!</h1>
      <p>Use this search bar to find different workouts depending on which muscle you want to work out.</p>
      <v-form class="v-form">
        <v-text-field v-model="muscle" label="Search by Muscle" outlined class="search-input"></v-text-field>
        <v-btn @click="fetchWorkouts" color="primary" class="search-button">Search</v-btn>
      </v-form>
      <v-divider class="divider"></v-divider>
      <v-list dense class="v-list-item-group">
        <v-list-item-group >
          <v-list-item
            v-for="workout in workouts"
            :key="workout._name"
            @click="workout.expanded = !workout.expanded"
            class="workout-item"
          >
            <v-list-item-content>
              <v-list-item-title class="workout-name">{{ workout.name }}</v-list-item-title>
              <v-list-item-subtitle class="workout-category">{{ workout.category }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>{{ workout.expanded ? 'mdi-menu-up' : 'mdi-menu-down' }}</v-icon>
            </v-list-item-action>
            <v-expand-transition>
              <v-list-item v-if="workout.expanded" class="workout-info">
                <v-row>
                  <v-col cols="6">
                    <v-list-item-title class="info-label">Equipment</v-list-item-title>
                    <v-list-item-title class="info-text">{{ workout.equipment }}</v-list-item-title>
                  </v-col>
                  <v-col cols="6">
                    <v-list-item-title class="info-label">Difficulty</v-list-item-title>
                    <v-list-item-title class="info-text">{{ workout.difficulty }}</v-list-item-title>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-list-item-title class="info-label">Instructions</v-list-item-title>
                    <v-list-item-title class="info-text workout-instructions-text">{{ workout.instructions }}</v-list-item-title>
                  </v-col>
                </v-row>
              </v-list-item>
            </v-expand-transition>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <p v-if="showInvalidMuscle" class="invalid-muscle">You think you're funny, huh? That isn't a real muscle. Try again.</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'workoutsVue',
    data() {
      return {
        muscle: '',
        workouts: [],
        showInvalidMuscle: false,
      };
    },
    methods: {
      async fetchWorkouts() {
        this.showInvalidMuscle = false; // Reset the message
        try {
          const response = await fetch(`https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?muscle=${this.muscle}`, {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': 'ef1594fdc0mshcf7f5a13f934140p1c5750jsn4d4ce4091c56',
              'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com',
            },
          });
          const data = await response.json();
          console.log(this.muscle);
          if (data.length === 0) {
            this.showInvalidMuscle = true;
          } else {
            // Initialize the 'expanded' property for each workout
            this.workouts = data;
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .invalid-muscle {
    font-family: 'Arial', sans-serif;
    font-size: 1.2rem;
    color: red;
    margin-top: 10px;
  }  
  .search-input {
    font-family: 'Arial', sans-serif;
    font-size: 1.5rem;
    color: #333;
    max-width: 40vmin;
  }
  
  p {
    text-align: center;
  }
  .search-button {
    font-family: 'Arial', sans-serif;
    font-size: 1.2rem;
    color: #fff;
    background-color: #007bff;
    border-radius: 4px;
  }
  .workout-item {
    border: 1px solid #ccc;
    border-radius: 8px;
    margin: 10px 0 ;
    cursor: pointer;
    text-align: center;
    padding: 40px;
  }
  
  .workout-name {
    font-family: 'Titillium Web', sans-serif;
    font-size: 1.8rem;
    font-weight: bold;
    color: #000000;
    font-family: 'Croissant One', serif;
  }
  
  .workout-category {
    font-family: 'Arial', sans-serif;
    font-size: 1.2rem;
    color: #666;
    margin-top: 5px;
    background-color: rgb(255, 255, 255);
  }
  
  .workout-info {
    background-color: rgb(255, 255, 255);
    border: 1px solid #ccc;
    border-radius: 8px;
    margin: 10px 0;
    padding: 10px;
  }
  
  .info-label {
    font-family: 'Arial', sans-serif;
    font-size: 1.2rem;
    color: #333;
    font-weight: bold;
    background-color: rgb(255, 255, 255);

  }
  
  .info-text {
    font-size: 1rem;
    color: #666;
    font-family: 'Bebas Neue', sans-serif;
  }
  
  .workout-instructions-text {
    font-family: 'Young Serif', serif;
    font-size: 1rem;
    color: #333;
    margin-top: 10px;
    max-height: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre-line;
  }

.v-form {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  }

.v-list-item-group {
    background-color: bisque;
  }
  </style>
  