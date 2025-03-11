import { createRouter, createWebHistory } from 'vue-router';
import ViewUser from "../pages/ViewUser.vue"
import AddUser from "../pages/AddUser.vue"
import UpdateUser from "../pages/UpdateUser.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: ViewUser
    },
    {
      path: "/add",
      name: "add",
      component: AddUser
    },
    {
      path: "/update/:id",
      name: "update",
      component: UpdateUser
    }
  ]
});

export default router;