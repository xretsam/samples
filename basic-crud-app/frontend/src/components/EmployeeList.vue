<script setup>
import axios from 'axios';
import {onMounted, ref} from "vue";
const baseUrl = "http://localhost:8080";

const employees = ref([]);
onMounted(() => {
  fetchEmployees();
});
const fetchEmployees = () => {
  axios.get(`${baseUrl}/api/employees`)
      .then(response => {
        employees.value = response.data;
      });
}

const deleteEmployee = (id) => {
  if (confirm('Are you sure you want to delete this employee?')) {
    axios.delete(`${baseUrl}/api/employees/${id}`)
        .then(() => {
          fetchEmployees();
        });
  }
}
</script>

<template>
  <div class="container">
    <h1 class="title">Employee List</h1>
    <table class="styled-table">
      <thead>
      <tr>
        <th>Employee</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="employee in employees" :key="employee.id">
        <td>
          <router-link :to="{name: 'employeePage', params: {id: employee.id}}">
            {{ employee.firstname + " " + employee.lastname }}
          </router-link>
        </td>
        <td>
          <router-link :to="{ name: 'editEmployee', params: { id: employee.id }}">
            <button class="edit-btn">Edit</button>
          </router-link>
          <button @click="deleteEmployee(employee.id)" class="delete-btn">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
    <router-link :to="{ name: 'addEmployee' }">
      <button class="add-btn">Add Employee</button>
    </router-link>
  </div>
</template>

<style scoped>

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--bg-color);
  border-radius: 10px;
}

.title {
  text-align: center;
  color: var(--text-color);
  margin-bottom: 20px;
  font-size: 2rem;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  font-size: 1.1rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.styled-table th, .styled-table td {
  padding: 12px 15px;
  text-align: left;
}

.styled-table thead tr {
  background-color: var(--primary-color);
  color: #ffffff;
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid var(--primary-color);
}

button {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-btn {
  background-color: var(--primary-color);
  color: #fff;
  margin-right: 5px;
}

.edit-btn:hover {
  background-color: #2980b9;
}

.delete-btn {
  background-color: var(--danger-color);
  color: #fff;
}

.delete-btn:hover {
  background-color: #c0392b;
}

.add-btn {
  background-color: var(--success-color);
  color: #fff;
}

.add-btn:hover {
  background-color: #27ae60;
}

a {
  text-decoration: none;
}
</style>