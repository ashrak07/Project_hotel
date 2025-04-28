import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: "",
    userName: localStorage.getItem("userName") || null,
    userEmail: localStorage.getItem("userEmail") || null,

    accessToken: localStorage.getItem("accesToken") || null,
  }),

  actions: {
    addUser(payload = null) {
      this.user = payload;
    },
    addUserName(payload = null) {
      this.userName = payload;
      localStorage.setItem("userName", this.userName);
    },
    addUserEmail(payload = null) {
      this.userEmail = payload;
      localStorage.setItem("userEmail", this.userEmail);
    },
    addToken(payload = null) {
      this.accessToken = payload;
      localStorage.setItem("accessToken", this.accessToken);
    },
  },
});
