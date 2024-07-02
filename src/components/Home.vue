<template>
  <q-layout>
    <q-page-container class="bg-grey-2">
      <q-page class="q-pa-md">
        <div class="title-container">
          <h1 class="text-h3 q-my-xs">Event Manager</h1>
          <h2 class="text-h6">Add & Edit Your Events</h2>
        </div>
        <div class="content-container">
          <div id="formContainer" class="q-mb-md text-left">
            <q-input
              v-model="formData.name"
              label="Name"
              dense
              outlined
              filled
              class="q-mb-md"
            />
            <q-input
              v-model="formData.startDate"
              type="date"
              label="Start Date"
              dense
              outlined
              filled
              class="q-mb-md"
            />
            <q-input
              v-model="formData.endDate"
              type="date"
              label="End Date"
              dense
              outlined
              filled
              class="q-mb-md"
            />
            <q-input
              v-model="formData.description"
              type="textarea"
              icon="edit"
              label="Description"
              dense
              outlined
              filled
              class="q-mb-md"
            />
            <q-btn color="primary" @click="addData" class="q-mt-md">Add</q-btn>
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

const formData = ref({
  name: "",
  startDate: "",
  endDate: "",
  description: "",
});

const users = ref([]);

function addData() {
  if (formData.value.name && formData.value.startDate) {
    users.value.push({ ...formData.value });
    clearInputs();
  } else {
    alert("Please fill in all fields.");
  }
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

.table-container {
  flex-grow: 1;
}

.table-responsive {
  overflow-x: auto;
}

.q-input {
  width: 100%;
}

.q-btn {
  margin: 10px;
  padding: 8px 16px;
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
