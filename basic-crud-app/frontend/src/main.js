import {createApp} from 'vue'
import {createRouter, createWebHistory} from 'vue-router';
import App from './App.vue'
import EmployeeList from "@/components/EmployeeList.vue";
import AddEmployeeForm from "@/components/AddEmployeeForm.vue";
import EditEmployeeForm from "@/components/EditEmployeeForm.vue";
import EmployeePage from "@/components/EmployeePage.vue";

const routes = [
    {path: '/', name: "employeeList", component: EmployeeList},
    {path: '/add', name: "addEmployee", component: AddEmployeeForm},
    {path: '/edit/:id', name: "editEmployee", component: EditEmployeeForm, props: true},
    {path: '/employee/:id', name: 'employeePage', component: EmployeePage, props: true},
    {path: '/:pathMatch(.*)*', redirect: '/'}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});
createApp(App).use(router).mount('#app')

