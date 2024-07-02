// FILE: main.js

import { createApp } from 'vue'
import { Quasar } from 'quasar'
import { createRouter, createWebHistory } from 'vue-router'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'
import Login from './components/Login.vue'
import signUp from './components/signUp.vue'
import Home from './components/Home.vue'

const myApp = createApp(App)

const router = new createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', name:'Home' ,component: Home},
    {path: '/signup', name:'signup', component: signUp},
    {path: '/login', name:'login' , component: Login},
  ]
})




// router.beforeEach(async (to, from, next) => {
//   const token = localStorage.getItem('token');
//   if (to.path !== '/login' && token) {
//     const isValid = await verifyToken(token);
//     if (!isValid) {
//       localStorage.removeItem('token');
//       next('/login');
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });


// router.beforeEach(async (to, from) => {
//   if (
//     // make sure the user is authenticated
//     !isAuthenticated &&
//     // ❗️ Avoid an infinite redirect
//     to.name !== 'Login'
//   ) {
//     // redirect the user to the login page
//     return { name: 'Login' }
//   }
// })



myApp.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
})
.use(router)

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app')


