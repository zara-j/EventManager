<template>
  <q-layout view="Hh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-card-section class="text-center">
            <div class="text-grey-9 text-h5 text-weight-bold">Sign in</div>
            <div class="text-grey-8">Sign in below to access your account</div>
          </q-card-section>
          <q-card-section>
            <q-input
              dense
              outlined
              v-model="email"
              label="Email Address"
              @blur="validateEmail"
            ></q-input>
            <q-input
              dense
              outlined
              class="q-mt-md"
              v-model="password"
              type="password"
              @blur="validatePassword"
              label="Password"
            ></q-input>
            <div v-if="emailError" class="error-message">
              {{ emailError }}
            </div>
            <div v-if="passwordError" class="error-message">
              {{ passwordError }}
            </div>
          </q-card-section>
          <q-card-section>
            <q-btn
              style="border-radius: 8px"
              color="dark"
              rounded
              size="md"
              label="Sign in"
              no-caps
              class="full-width"
              @click="loginUsers"
            ></q-btn>
          </q-card-section>
          <q-card-section class="text-center q-pt-none">
            <div class="text-grey-8">
              Don't have an account yet?
              <router-link
                class="text-dark text-weight-bold"
                style="text-decoration: none"
                to="/signUp"
                >Sign up</router-link
              >
              <router-view />
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import qs from "qs";
import { useRouter } from "vue-router";
import * as jose from 'jose'


const email = ref("");
const emailError = ref("");
const password = ref("");
const passwordError = ref("");
const router = useRouter();
const token = "";

window.addEventListener("load", checkToken);

function checkToken() {
  const token = localStorage.getItem("token");
  const decodedToken = jose.decodeJwt("token");
  console.log(decodedToken)
  if (decodedToken.exp * 1000 < new Date().getTime()) {
    console.log("Token has expired");
  } else {
    console.log("Token is still valid");
    router.push("/");
  }
  console.log(token)
}

// check if token is available , just check token is valid or not otherwise if token  is not valid  // toDO

function loginUsers() {
  const data = qs.stringify({
    password: password.value,
    email: email.value,
  });
  axios
    .post("https://event.shirpala.ir/api/token/", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then(function (response) {
      //console.log(response)
      if (response.status === 200) {
        localStorage.setItem("token", response.data.access);
        router.push("/");
      }
    })
    .catch(function (error) {
      console.log(error.request.response);
    });
}

function validateEmail() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email.value)) {
    emailError.value = "Please enter a valid email address.";
  } else {
    emailError.value = "";
  }
}

function validatePassword() {
  if (password.value.length < 8) {
    passwordError.value = "Password must be at least 8 characters long.";
  } else {
    passwordError.value = "";
  }
}
</script>

<style scoped>
.my_card {
  width: 100%;
  max-width: 25rem;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}
.error-message {
  color: red;
  margin-top: 5px;
}
.q-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
  box-sizing: border-box;
}
</style>