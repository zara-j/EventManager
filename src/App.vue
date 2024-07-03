
<template>
 <header>
  <nav class="navbar">
    <router-link @click="checkToken" class="allRoutes" to="/">
      Home
    </router-link>
    <router-link class="allRoutes" to="/login">
      Login
    </router-link>
    <router-link class="allRoutes" to="/signup">
      sign Up
    </router-link>
  </nav>
  <router-view />
 </header>
</template>



<script setup>
import { useRouter } from "vue-router";
import * as jose from 'jose'

const router = useRouter();

function checkToken() {
  const token = localStorage.getItem("token");
  const decodedToken = jose.decodeJwt(token);
  console.log(decodedToken)
  if (decodedToken.exp * 1000 < new Date().getTime()) {
    console.log("Token has expired");
    router.push("/login");
  } else {
    console.log("Token is still valid");
    router.push("/");
  }
  console.log(token)
}

</script>

<style scoped>
.navbar {
  width: 100%;
  padding: 2px 0;
  background-color: lightgray; /* Example background color */
  display: flex;
  flex-direction: row; /* Stack the links vertically */
}

.allRoutes {
  color: rgb(59, 59, 59);
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  padding: 10px;
  width: 100%;
  display: block;
  text-align: center;
}

.allRoutes:hover {
  background-color: rgb(53, 52, 52);
  color: white; 
}
</style>
