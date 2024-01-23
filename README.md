# Fitness-fein

Description

My project is a E-Commerce website. The design is based around a gym brand called Fitness Fien, I made this for a client and plan to maintain this website food as long as my client needs. 


Deployment link

https://fitness-fien.netlify.app/ 


Timeframe & Working Team (Solo/Pair/Group)

I had 7 days to complete this project and I worked on it solo.


Technologies Used

- Vue.js for the front-end. 
- Node.js and Express.js for the back-end. 
- MongoDB for the database. 
- Vuetify for styling and components. 
- Various npm packages for additional functionalities.
- Trello
- Excalidraw


Brief

I completed this project to improve my skills using Vue.js and javascript. Originally it was designed for a friend who needed an e-commerce website made for his fitness brand. Later on I would go on to remake the project in react.


Planning

Using Excalidraw I created this page to set out all my components and what would be included in them. I also mapped out my database so I could visualise how everything would be connected. I added a list of must-have functionality so I knew what would have to be completed within the week and then set myself stretch goals as a bonus.


Build/Code Process

Initialization and User Authentication 
1. The `mounted` lifecycle hook is used to execute code after the component is mounted.
 2. In the `mounted` method: - It checks if a specific cookie, `user_session`, exists. If it does, it implies that the user is already authenticated. - If the `user_session` cookie exists: - `isLoggedIn` is set to `true` to mark the user as authenticated. - User data is extracted from the cookie using the `decodeCredential` function. - The user's first name is assigned to the `userName` property. 


In my next steps I added in an admin, which would give certain permissions on the page for whenever a user with that email address logged in.


This section describes the implementation of admin options within our application. Admin options provide additional functionality to users with administrative privileges, such as product management and editing capabilities.

#### Admin Options Component

- The code snippet defines an admin options component that appears when a user with admin privileges is logged in.

- The admin options component provides two action buttons: "Delete" and "Edit Product."

- Clicking the "Delete" button triggers a method for deleting a product, and clicking the "Edit Product" button navigates the user to a product editing page.

- The code utilises Vue Router to create a dynamic link for editing a specific product based on its unique identifier.

- These admin options enhance the functionality of the application, allowing administrators to manage products efficiently.

### Usage

The admin options component enhances the user experience by providing efficient product management features to administrators. Admins can delete products or edit their details directly from the product listing page..




#### Adding Products to Basket

- The code snippet includes a method called `addToBasket` responsible for adding products to the user's basket.

- A POST request is made to the 'AddToBasket' API endpoint (`http://localhost:4000/AddToBasket`) to add the product.

- The request body includes the product's unique identifier (`id`) and the user's email.

- Upon a successful response, the returned data is processed, and the `itemArray` variable is updated with the updated list of items in the basket.

- The `displayRemoveBtn` flag is set to `true` to indicate that the "Remove from basket" button should be displayed.

- The view is refreshed using `location.reload()` to reflect the updated basket content.

#### Removing Products from Basket

- The code snippet defines a method called `removeProduct` for removing products from the basket.

- A DELETE request is made to the 'Product' API endpoint (`http://localhost:4000/Product`) to remove the product.

- Similar to adding products, the request body includes the product's unique identifier (`id`) and the user's email.

- After a successful response, the item array is updated, and the code calculates the sum of the specific product in the basket. If the sum is 0 (indicating there's no products left), the `displayRemoveBtn` flag is set to `false`.

- Like the adding functionality, the view is refreshed using `location.reload()` to reflect the updated basket contents.

### Usage

The methods `addToBasket` and `removeProduct` play a significant role in managing basket items within our application. They allow users to add products to their baskets and remove them when needed.


Challenges

Project Management:
Solo Development: As this project was undertaken individually, managing and coordinating different aspects of development, from frontend to backend, posed its own set of challenges. Decision-making and maintaining a cohesive project structure were crucial aspects.
Problem Solving:
Leveraged project management tools like Trello to maintain a structured task list and progression overview.
Regularly revisited the project plan to adapt to changing requirements and timelines.
Utilised Git for version control to maintain a clear history of changes and facilitate collaboration if the project were to scale.

Technical Challenges:
Basket State Update: The primary technical challenge revolved around updating the basket state dynamically. Despite attempting various approaches, the state wasn't updating consistently when items were added. The challenge here was to ensure real-time synchronisation between the UI and the underlying data.
Problem Solving:
Implemented multiple debugging strategies, including console logging and inspecting network requests, to identify the root cause.
Utilised Vue.js reactivity principles and lifecycle hooks to trigger updates explicitly.
Researched community forums and documentation to understand potential pitfalls related to state management in Vue.js.


Wins

Interesting Problem Solving:
User Authentication Flow: Successfully implementing a seamless user authentication flow using Google Sign-In. Overcoming the complexities of managing user sessions and securing routes added a layer of robustness to the application.


Strong Sections of Code:
Admin Options Component: The creation of an admin options component showcased strong Vue.js and Vue Router integration. Enabling administrators to efficiently manage products through features like delete and edit demonstrated a deep understanding of frontend functionality.


Key Learnings/Takeaways

Throughout the development of this project, I had the opportunity to work with various technologies and tools. As a result, I've gained a deeper understanding and increased confidence in using the following technologies:

1. Vue.js
Vue.js is at the core of our project. Working on this application has improved my proficiency in Vue.js and its ecosystem. I now feel more comfortable with Vue components, routing, and state management using Vuex.

2. Third-party Libraries
I have successfully integrated several third-party libraries to enhance the project's functionality. These include vue3-google-login for user authentication, Vue Router for navigation, and more. I now have the experience and confidence to work with third-party libraries effectively.

3. RESTful APIs
The project involved extensive interaction with RESTful APIs, both for fetching data from external sources and sending data to the server. I have strengthened my ability to handle API requests, manage headers, and process data.
4. User Authentication
Implementing Google Sign-In and managing user sessions has increased my expertise in user authentication using Vue.js and the Vue Router. I can now design secure user authentication flows effectively.

5. CSS Styling
Styling and layout design are crucial for creating a user-friendly and visually appealing application. Working on this project, I've enhanced my CSS skills and become more comfortable with Vue's approach to styling components.

6. Data Management
From filtering products to managing items in the user's basket, I've gained valuable experience in handling and manipulating data in a Vue.js application.

7. GitHub and Version Control
I've extensively used Git and GitHub for version control and collaboration during this project. This experience has improved my version control and collaborative development skills.

Summary:
The skills and technologies I've become more comfortable with after completing this project have significantly expanded my capabilities as a developer. The knowledge gained from working with Vue.js, APIs, third-party libraries, and other technologies will be instrumental in tackling future projects and challenges in a more confident and efficient manner.


Bugs

I cannot get the basket state to update as the item is added to the basket even if I reload the page it isn't updating. Other than that everything is working as expected.


Future Improvements

Fix all bugs 
Finish with payment API and host on secure platform  
I wish to add an option for sizing on the single product page 




