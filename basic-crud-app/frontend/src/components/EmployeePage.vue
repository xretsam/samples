<script setup>
import {ref, defineProps, onMounted} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";

const baseUrl = "http://localhost:8080";


const props = defineProps(['id']);
const router = useRouter();

const employee = ref({
  firstname: "",
  lastname: "",
  email: "",
  position: "",
  salary: 0,
});

const fetchEmployeeDetails = async () => {
  await axios.get(`${baseUrl}/api/employees/${props.id}`)
      .then((response) => {
        employee.value = response.data;
      })
      .catch((reason) => console.error("Error fetching employee details", reason));
};

const deleteEmployee = async () => {
  if (confirm('Are you sure you want to delete this employee?')) {
    await axios.delete(`${baseUrl}/api/employees/${props.id}`)
        .then(() => {
          router.push('/');
        })
        .catch((reason) => console.error("Error deleting employee", reason));
  }
};

onMounted(fetchEmployeeDetails);
</script>

<template>
  <div>
    <h1>Employee Details</h1>
    <div class="employee-details">
      <p><strong>First Name:</strong> {{ employee.firstname }}</p>
      <p><strong>Last Name:</strong> {{ employee.lastname }}</p>
      <p><strong>Email:</strong> {{ employee.email }}</p>
      <p><strong>Position:</strong> {{ employee.position }}</p>
      <p><strong>Salary:</strong> ${{ employee.salary }}</p>
    </div>

    <div class="action-buttons">
      <router-link :to="{name: 'editEmployee', params: {id: employee.id}}">
        <button class="edit-btn">Edit</button>
      </router-link>
      <button @click="deleteEmployee" class="delete-btn">Delete</button>
      <router-link :to="{ name: 'employeeList' }">
        <button>Back to List</button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.employee-details {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.employee-details p {
  font-size: 18px;
  margin: 10px 0;
}

.action-buttons {
  display: flex;
  gap: 10px;
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
</style>
