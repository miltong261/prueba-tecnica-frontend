import { createRouter, createWebHistory } from "vue-router";
import TypeVehicleView from "../views/TypeVehicleView.vue";
import TransactionView from "../views/TransactionView.vue";
import EmployeeView from "../views/EmployeeView.vue";

const routes = [
  {
    path: "/type_vehicles",
    component: TypeVehicleView,
  },
  {
    path: "/transactions",
    component: TransactionView,
  },
  {
    path: "/employees",
    component: EmployeeView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
