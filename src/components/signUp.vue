<template>
  <q-layout view="hHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-3">
        <q-card class="my_card q-pa-md" bordered shadow-3>
          <q-form action="">
            <q-card-section
              class="text-center text-grey-9 text-h5 text-weight-bold"
            >
              Sign up
            </q-card-section>
            <q-card-section>
              <q-input
                v-model="firstName"
                type="text"
                label="First Name"
                dense
                outlined
                @blur="firstNameRequirement"
              />
              <div v-if="firstNameError" class="error-message">
                {{ firstNameError }}
              </div>
              <q-input
                class="q-mt-md"
                v-model="lastName"
                type="text"
                label="Last Name"
                dense
                outlined
                @blur="lastNameRequirement"
              />
              <div v-if="lastNameError" class="error-message">
                {{ lastNameError }}
              </div>
              <q-input
                class="q-mt-md"
                v-model="password"
                type="password"
                label="password"
                dense
                outlined
                @blur="passwordHandleBlur"
              />
              <div v-if="passwordError" class="error-message">
                {{ passwordError }}
              </div>
              <q-input
                class="q-mt-md"
                v-model="repeatPassword"
                icon="lock"
                type="password"
                label="repeat password"
                dense
                outlined
              />
              <div v-if="passwordMismatch" style="color: red">
                Password do not match
              </div>

              <q-input
                class="q-mt-md"
                v-model="email"
                icon="lock"
                type="email"
                label="Email"
                dense
                outlined
                @blur="handleInput"
              />
              <div v-if="emailTouched && !validateEmail" class="error-message">
                " Please enter a valid email address"
              </div>
            </q-card-section>
            <q-card-section>
              <q-btn
                @click="postUsers"
                class="full-width"
                style="border-radius: 8px"
                color="dark"
                label="submit"
              ></q-btn>
            </q-card-section>
            <q-card-section class="text-center q-pt-none">
              <div class="text-grey-8">
                Do you have an account?
                <router-link
                  class="text-dark text-weight-bold"
                  style="text-decoration: none"
                  to="/login"
                  >Login</router-link
                >
                <router-view />
              </div>
            </q-card-section>
          </q-form>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import qs from "qs";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const firstName = ref("");
const lastName = ref("");
const password = ref("");
const email = ref("");

const router = useRouter();

function postUsers() {
  const data = qs.stringify({
    //data is body HTTP request
    first_name: firstName.value,
    last_name: lastName.value,
    password: password.value,
    email: email.value,
  });
  console.log(data);
  axios
    .post("https://event.shirpala.ir/api/auth/users/", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })

    .then(function (response) {
      if (response.status === 200 || response.status === 201) {
        console.log("Response received:", response);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Submitted Successfully",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          setTimeout(() => {
            console.log("Alert closed, redirecting to login...");
            router.push("/login");
          }, 2000); // Delay matches the Swal timer
        });
      }
    })

    .catch(function (error) {
      if (error.response && error.response.data.password) {
        // alert(error.response.data.password);
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.response.data.password,
          showConfirmButton: false,
          timer: 2500,
        });
        console.log(error.response.data);
      } else if (error.response && error.response.data.email) {
        //alert(error.response.data.email);
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.response.data.email,
          showConfirmButton: false,
          timer: 2500,
        });
        console.log(error.response.data);
      }
    });
}

const firstNameError = ref("");
const lastNameError = ref("");
const repeatPassword = ref("");
const emailTouched = ref(false);
const passwordError = ref("");
const passwordMismatch = computed(
  () => password.value !== repeatPassword.value
);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validateEmail = computed(() => emailPattern.test(email.value));
const handleInput = () => {
  emailTouched.value = true;
};

function firstNameRequirement() {
  if (firstName.value.length < 3) {
    firstNameError.value = "This field may not be blank";
  } else {
    firstNameError.value = "";
  }
}

function lastNameRequirement() {
  if (lastName.value.length < 3) {
    lastNameError.value = "This field may not be blank";
  } else {
    lastNameError.value = "";
  }
}

function validatePassword() {
  if (password.value.length < 8) {
    passwordError.value = "Password must be at least 8 characters long";
  } else {
    passwordError.value = "";
  }
}

function passwordInput() {
  if (password.value.length < 8) {
    password.value = "This field may not be blank";
  } else {
    passwordError.value = "";
  }
}

const passwordPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRequirements = computed(() =>
  passwordPattern.test(password.value)
);

const passwordHandleBlur = () => {
  validatePassword();
  passwordInput();
  passwordRequirements;
};
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

  height: auto;
  padding: 1rem;
  box-sizing: border-box;
}
</style>