<template>
  <q-layout>
    <q-page-container class="bg-grey-2">
      <q-page class="q-pa-md">
       
        <div class="content-container">
          <div class="form-elements">
            <div id="formContainer" class="text-left">
              <div class="q-pa-sm" style="max-width: 300px">
                <q-input v-model="formData.name" label="Name" outlined filled />
              </div>
              <div class="q-pa-sm" style="max-width: 300px">
                <q-input label="Start time" filled v-model="formData.startDate">
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="formData.startDate" mask="YYYY-MM-DD HH:mm">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>

                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time v-model="formData.startDate" mask="YYYY-MM-DD HH:mm" format24h>
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="q-pa-sm" style="max-width: 300px">
                <q-input label="End time" filled v-model="formData.endDate">
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="formData.endDate" mask="YYYY-MM-DD HH:mm">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>

                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time v-model="formData.endDate" mask="YYYY-MM-DD HH:mm" format24h>
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="q-pa-sm" style="max-width: 300px">
                <q-input
                  v-model="formData.description"
                  type="textarea"
                  icon="edit"
                  label="Description"
                  dense
                  outlined
                  filled
                />
              </div>
              <q-btn   
                dense
                outlined
                filled
                class=" full-width"
                style="background-color: #343634; color: #fff"
                @click="addEvent"
                >Add</q-btn
              >
            </div>
          </div>
          <div class="table-container">
            <div class="table-responsive">
              <table class="q-table q-mb-md">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, index) in users" :key="index">
                    <td>{{ user.name }}</td>
                    <td>{{ user.startDate }}</td>
                    <td>{{ user.endDate }}</td>
                    <td>{{ user.description }}</td>
                    <td>
                      <q-btn flat icon="edit" @click="editData(index)" />
                      <q-btn flat icon="delete" @click="deleteData(index)" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import * as jose from "jose";
import { useRouter } from "vue-router";

const router = useRouter();

const formData = ref({
  name: "",
  startDate: null,
  endDate: "",
  description: "",
});

window.addEventListener("load", checkToken);

function checkToken() {
  const token = localStorage.getItem("token");
  const decodedToken = jose.decodeJwt(token);
  console.log(decodedToken);
  if (decodedToken.exp * 1000 < new Date().getTime()) {
    console.log("Token has expired");
    router.push("/login");
  } else {
    console.log("Token is still valid");
    router.push("/");
  }
  console.log(token);
}

const users = ref([]);

function addEvent() {
  const token = localStorage.getItem("token");

  // Convert startDate and endDate to Unix timestamps
  const startTimestamp = Math.floor(new Date(formData.value.startDate).getTime() / 1000);
  const endTimestamp = Math.floor(new Date(formData.value.endDate).getTime() / 1000);

  const data = {
    EventSummery: formData.value.name,
    StartTime: startTimestamp,
    EndTime: endTimestamp,
    Description: formData.value.description,
  };

  axios
    .post("https://event.shirpala.ir/api/event/create/", data, {
      headers: {
        "Content-Type": "application/json", // Use application/json for JSON data
        Authorization: "Bearer " + token,
      },
    })
    .then(function (response) {
      if (response.status === 200) {
        console.log(response);
        alert(response.data.message);
      }
    })
    .catch(function (error) {
      console.log(error.response.data);
      alert(error.response.data.message); // Access the error message from response.data
    });
}

function editData(index) {
  if (index >= 0 && index < users.value.length) {
    const user = users.value[index];

    const name = prompt("Enter the updated name:", user.name);
    const startDate = prompt("Enter the updated start date:", user.startDate);
    const endDate = prompt("Enter the updated end date:", user.endDate);
    const description = prompt(
      "Enter the updated description:",
      user.description
    );

    if (name && startDate) {
      users.value[index] = { name, startDate, endDate, description };
    } else {
      alert("Please fill in all fields.");
    }
  } else {
    alert("User not found.");
  }
}

function deleteData(index) {
  if (index >= 0 && index < users.value.length) {
    users.value.splice(index, 1);
  } else {
    alert("User not found.");
  }
}

function clearInputs() {
  formData.value.name = "";
  formData.value.startDate = "";
  formData.value.endDate = "";
  formData.value.description = "";
}
</script>

<style scoped>
.q-page {
  max-width: auto;
  margin: auto;
}

.title-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.content-container {
  display: flex;
  flex-direction: row;
}

#formContainer {
  max-width: 400px;
  margin-right: 20px;
}

.form-elements {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center items horizontally */
}

.q-input {
  width: 100%;
  
}

/* .q-btn {
  margin: 10px;
  padding: 5px 50px;
} */

.table-container {
  flex-grow: 1;
}

.table-responsive {
  overflow-x: auto;
}

.q-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  word-wrap: break-word;
}

th {
  background-color: #343634;
  color: #fff;
  text-align: center;
}

@media (max-width: 600px) {
  .content-container {
    flex-direction: column;
  }

  #formContainer {
    margin: 0 auto 20px;
  }

  .table-container {
    overflow-x: auto;
  }
}
</style>