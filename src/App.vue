
<template>
  <header>
    <nav class="navbar">
      <router-link @click="checkToken" class="allRoutes" to="/">
        Home
      </router-link>
      <q-dialog v-model="dialogShow">
        <q-card>
          <q-card-section>
            <div class="text-h6"></div>
            <div>{{ message }}</div>
          </q-card-section>

          <q-card-actions>
            <q-btn
              class="full-width"
              label="OK"
              @click="dialogShow = false"
              color="primary"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <router-link class="allRoutes" to="/login"> Login </router-link>
    </nav>
    <router-view />
  </header>
</template>



<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import * as jose from "jose";

const dialogShow = ref(false);
const message = ref("");

const router = useRouter();

window.addEventListener("load", checkToken);
function checkToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found");
    dialogShow.value = true;
    message.value = "Please Login First";
    router.push("/login");
    return;
  }

  try {
    const decodedToken = jose.decodeJwt(token);
    console.log(decodedToken);

    if (decodedToken.exp * 1000 < new Date().getTime()) {
      console.log("Token has expired");
      dialogShow.value = true;
      message.value = "Please Login First";
      router.push("/login");
    } else {
      console.log("Token is still valid");
      router.push("/");
    }
  }
   catch (error) {
    console.log("Error decoding token: ", error.message);
    dialogShow.value = true;
    message.value = "Please Login Again";
    router.push("/login");
  }

  console.log(token);
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

.text-h6 {
  color: rgb(65, 65, 65);
  font-size: 0.7rem;
  line-height: 0.7rem;
  text-align: center;
}
.q-card {
  min-width: 350px; /* Adjust the width to your preference */
  max-width: 100%;
  max-height: 300px; /* Adjust the height to your preference */
  min-height: fit-content;
  text-align: center;
}
</style>
