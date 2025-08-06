import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../components/View/HomeView.vue";
import LoginView from "../components/View/LoginView.vue";
import RegisterView from "../components/View/RegisterView.vue";
import AdminView from "../components/View/AdminView.vue";
import RoomList from "../components/AdminComponents/RoomList.vue";
import CreateRoom from "../components/AdminComponents/CreateRoom.vue";
import BookingList from "../components/AdminComponents/BookingList.vue";
import Dashboard from "../components/AdminComponents/Dashboard.vue";
import UserList from "../components/AdminComponents/UserList.vue";
import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs";
import UpdateRoom from "../components/AdminComponents/UpdateRoom.vue";
import BookingStepper from "../components/BookingComponent/BookingStepper.vue";
import UserView from "../components/View/UserView.vue";
import BookingListUser from "../components/UserComponents/BookingListUser.vue";

const routes = [
  {
    name: "home",
    path: "/",
    component: HomeView,
  },
  { name: "register", path: "/register", component: RegisterView },
  {
    name: "login",
    path: "/login",
    component: LoginView,
  },
  {
    name: "admin",
    path: "/admin",
    component: AdminView,
    children: [
      { name: "admin-room", path: "/admin/room", component: RoomList },
      { name: "admin-booking", path: "/admin/booking", component: BookingList },
      { name: "admin-user", path: "/admin/user", component: UserList },
      {
        name: "create-room",
        path: "/admin/room/create",
        component: CreateRoom,
      },
      {
        name: "admin-dashboard",
        path: "/admin/dashboard",
        component: Dashboard,
      },
      {
        name: "update",
        path: "/admin/room/update",
        component: UpdateRoom,
      },
    ],
  },
  {
    name: "user",
    path: "/user",
    component: UserView,
    children: [
      {
        name: "user-reservation",
        path: "/user/reservation",
        component: BookingListUser,
      },
    ],
  },
  {
    name: "stepper",
    component: BookingStepper,
    path: "/book/step",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
