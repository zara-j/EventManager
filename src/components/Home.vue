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
                        <q-date
                          v-model="formData.startDate"
                          mask="YYYY-MM-DD HH:mm"
                        >
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
                        <q-time
                          v-model="formData.startDate"
                          mask="YYYY-MM-DD HH:mm"
                          format24h
                        >
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
                        <q-date
                          v-model="formData.endDate"
                          mask="YYYY-MM-DD HH:mm"
                        >
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
                        <q-time
                          v-model="formData.endDate"
                          mask="YYYY-MM-DD HH:mm"
                          format24h
                        >
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
                id="addButton"
                dense
                outlined
                filled
                class="full-width"
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
                    <th>Id</th>
                    <th>Title</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, index) in users" :key="index">
                    <td>{{ user.front_id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.startDate }}</td>
                    <td>{{ user.endDate }}</td>
                    <td>{{ user.description }}</td>
                    <td>
                      <q-btn flat icon="edit" @click="openEditModal(index)" />
                      <q-btn flat icon="delete" @click="deleteData(index)" />
                    </td>
                  </tr>
                </tbody>
              </table>
              <q-spinner v-if="loading" size="30px" color="primary" />
            </div>
          </div>
        </div>

        <!-- Modal for Editing Data -->
        <q-dialog v-model="isEditModalOpen">
          <q-card>
            <q-card-section>
              <div class="text-h6">Edit Event</div>
            </q-card-section>

            <q-card-section>
              <q-input
                v-model="editFormData.name"
                label="Name"
                outlined
                filled
              />
              <q-input
                label="Start time"
                filled
                v-model="editFormData.startDate"
              >
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="editFormData.startDate"
                        mask="YYYY-MM-DD HH:mm"
                      >
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
                      <q-time
                        v-model="editFormData.startDate"
                        mask="YYYY-MM-DD HH:mm"
                        format24h
                      >
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
              <q-input label="End time" filled v-model="editFormData.endDate">
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="editFormData.endDate"
                        mask="YYYY-MM-DD HH:mm"
                      >
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
                      <q-time
                        v-model="editFormData.endDate"
                        mask="YYYY-MM-DD HH:mm"
                        format24h
                      >
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
              <q-input
                v-model="editFormData.description"
                type="textarea"
                icon="edit"
                label="Description"
                dense
                outlined
                filled
              />
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="primary" v-close-popup />
              <q-btn flat label="Save" color="primary" @click="saveEditData" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import * as jose from "jose";
import { useRouter } from "vue-router";

const router = useRouter();
const loading = ref(true); // Initially loading

const formData = ref({
  name: "",
  startDate: null,
  endDate: "",
  description: "",
});

const editFormData = ref({
  id: "",
  name: "",
  startDate: null,
  endDate: "",
  description: "",
});

const isEditModalOpen = ref(false);
const users = ref([]);

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
    return true;
  }
  console.log(token);
}

function fetchEvents() {
  loading.value = true;
  const token = localStorage.getItem("token");

  axios
    .get("https://event.shirpala.ir/api/event/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      users.value = response.data.map((event, index) => {
        return {
          front_id: index + 1,
          id: event.id,
          name: event.title_event,
          startDate: new Date(event.start_time).toLocaleString(),
          endDate: event.end_time
            ? new Date(event.end_time).toLocaleString()
            : "",
          description: event.summery_event || "",
        };
      });
      console.log(response.data);

      loading.value = false;
    })
    .catch((error) => {
      console.log(error);
      alert("Failed to fetch events.");
      loading.value = false;
    });
}

function addEvent() {
  const token = localStorage.getItem("token");
  const startTimestampnumber = Math.floor(
    new Date(formData.value.startDate).getTime() / 1000
  );
  const endTimestampnumber = Math.floor(
    new Date(formData.value.endDate).getTime() / 1000
  );

  // Validate start timestamp
  if (!startTimestampnumber) {
    alert("Please fill in the start date.");
    return;
  }
  if (!formData.value.name) {
    alert("Please fill in the title.");
    return;
  }
  
  const startTimestamp = startTimestampnumber.toString();
  const endTimestamp = endTimestampnumber ? endTimestampnumber.toString() : "";
  const description = formData.value.description ? formData.value.description.trim() : ""

  const data = {
    EventTitle: formData.value.name,
    EventSummery: description,
    StartTime: startTimestamp,
    EndTime: endTimestamp,
  };

  loading.value = true;
  axios
    .post("https://event.shirpala.ir/api/event/create/", data, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "text/plain",
      },
    })
    .then(function (response) {
      if (response.status === 200) {
        console.log(response);
        alert(response.data.message);
        fetchEvents(); // Refresh events after adding
      }
    })
    .catch(function (error) {
      console.log(error.response.data);
      alert(error.response.data.message);
    })
    .finally(() => {
      loading.value = false;
    });
}


function openEditModal(index) {
  if (index >= 0 && index < users.value.length) {
    const user = users.value[index];
    editFormData.value = { ...user };
    isEditModalOpen.value = true;
  } else {
    alert("User not found.");
  }
}

function saveEditData() {
  const token = localStorage.getItem("token");

  const startTimestampnumber = Math.floor(
    new Date(editFormData.value.startDate).getTime() / 1000
  );
  const endTimestampnumber = Math.floor(
    new Date(editFormData.value.endDate).getTime() / 1000
  );

  const startTimestamp = startTimestampnumber.toString();
  const endTimestamp = endTimestampnumber ? endTimestampnumber.toString() : "";


  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://event.shirpala.ir/api/event/edit/",
    headers: {
      Authorization: "Bearer " + token,
      TempEventTitle: editFormData.value.name,
      TempStartTime: startTimestamp,
      TempEndTime: endTimestamp,
      TempEventSummery: editFormData.value.description || "",
      taskId: editFormData.value.id,
    },
  };

  loading.value = true;
  axios
    .request(config)
    .then((response) => {
      if (response.status === 200) {
        alert(response.data.message);
        console.log('Editing Event Data:', editFormData.value);
        console.log("Server response:", response.data); 
        fetchEvents(); // Refresh events after editing
        isEditModalOpen.value = false; // Close modal
      }
    })
    .catch((error) => {
      console.log(error.response.data);
      alert(error.response.data.message);
    })
    .finally(() => {
      loading.value = false;
    });
}

function deleteData(index) {
  if (index >= 0 && index < users.value.length) {
    const token = localStorage.getItem("token");
    const userId = users.value[index].id;

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://event.shirpala.ir/api/event/delete/",
      headers: {
        Authorization: `Bearer ${token}`,
        taskId: userId,
      },
    };

    axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          users.value.splice(index, 1);
          alert("Event deleted successfully.");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to delete the event.");
      });
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

onMounted(() => {
  fetchEvents(); // Fetch events when the component is mounted
});
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
  align-items: center;
}

.q-input {
  width: 100%;
}

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

td:first-child {
  justify-content: center;
  text-align: center;
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
