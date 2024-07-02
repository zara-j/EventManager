
<template>
 <header>
  <nav class="navbar">
    <router-link class="allRoutes" to="/">
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
