<script setup>
import {ref, defineProps, onMounted} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
const baseUrl = "http://localhost:8080";


const router = useRouter();

const props = defineProps(['id']);

const employee = ref({
  firstname: "",
  lastname: "",
  email: "",
  position: "",
  salary: "",
});

const errors = ref({
  firstname: "",
  lastname: "",
  email: "",
  position: "",
  salary: "",
  emailExists: false,
});

const checkEmailUnique = async () => {
  if (employee.value.email.trim()) {
    console.log("checkEmailUnique");
    try {
      const response = await axios.get(`${baseUrl}/api/employees/check-email?email=${employee.value.email}`);
      errors.value.emailExists = response.data;
      if (errors.value.emailExists) {
        errors.value.email = "This email is already taken";
      } else {
        errors.value.email = "";
      }
    } catch (error) {
      console.error("Error checking email uniqueness", error);
    }
  }
};

const validateForm = () => {
  let valid = true;

  if (!employee.value.firstname.trim()) {
    errors.value.firstname = "First name is required";
    valid = false;
  } else {
    errors.value.firstname = "";
  }

  if (!employee.value.lastname.trim()) {
    errors.value.lastname = "Last name is required";
    valid = false;
  } else {
    errors.value.lastname = "";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!employee.value.email.trim()) {
    errors.value.email = "Email is required";
    valid = false;
  } else if (!emailPattern.test(employee.value.email)) {
    errors.value.email = "Invalid email format";
    valid = false;
  } else {
    errors.value.email = "";
  }

  if (!employee.value.position.trim()) {
    errors.value.position = "Position is required";
    valid = false;
  } else {
    errors.value.position = "";
  }

  if (isNaN(employee.value.salary) || Number(employee.value.salary) <= 0) {
    errors.value.salary = "Salary must be a positive number";
    valid = false;
  } else {
    errors.value.salary = "";
  }

  return valid;
};

const editEmployee = async () => {
  if (validateForm()) {
    await axios.put(`${baseUrl}/api/employees/` + props.id, employee.value).then((response) => {
      console.log("ok", response.data);
      router.push("/");
    }).catch((reason) => showErrors(reason));
  }
};

const fetchEmployee = async () => {
  await axios.get(`${baseUrl}/api/employees/` + props.id).then((response) => {
    employee.value = response.data;
  });
};

const showErrors = (reason) => {
  console.log(reason);
};

onMounted(fetchEmployee);
</script>

<template>
  <div class="form-container">
    <h1>Edit Employee</h1>
    <input type="text" placeholder="Firstname" v-model="employee.firstname">
    <span v-if="errors.firstname" class="error">{{ errors.firstname }}</span>
    <input type="text" placeholder="Lastname" v-model="employee.lastname">
    <span v-if="errors.lastname" class="error">{{ errors.lastname }}</span>
    <input type="email" placeholder="Email" v-model="employee.email">
    <span v-if="errors.email" class="error" @blur="checkEmailUnique()">{{ errors.email }}</span>
    <input type="text" placeholder="Position" v-model="employee.position">
    <span v-if="errors.position" class="error">{{ errors.position }}</span>
    <input type="number" step="0.01" placeholder="Salary" v-model="employee.salary">
    <span v-if="errors.salary" class="error">{{ errors.salary }}</span>
    <button class="submit-btn" @click="editEmployee">Save Changes</button>
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--bg-color);
  border-radius: 10px;
}

input {
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.error {
  color: red;
  font-size: 0.85rem;
  margin-bottom: 15px;
}

.submit-btn {
  background-color: var(--primary-color);
  color: #fff;
  padding: 10px;
  font-size: 1.1rem;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #2980b9;
}
</style>
