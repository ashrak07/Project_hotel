import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: "",
    userName: localStorage.getItem("userName") || null,
    userEmail: localStorage.getItem("userEmail") || null,
    accessToken: localStorage.getItem("accessToken") || null,
    userId: localStorage.getItem("userId") || null,
  }),

  actions: {
    addUser(payload = null) {
      this.user = payload;
    },
    addUserName(payload = null) {
      this.userName = payload;
      localStorage.setItem("userName", this.userName);
    },
    addUserId(payload = null) {
      this.userId = payload;
      localStorage.setItem("userId", this.userId);
    },
    addUserEmail(payload = null) {
      this.userEmail = payload;
      localStorage.setItem("userEmail", this.userEmail);
    },
    addToken(payload = null) {
      this.accessToken = payload;
      localStorage.setItem("accessToken", this.accessToken);
    },
    clearToken() {
      this.accessToken = null;
      this.userName = null;
      this.userEmail = null;
      this.userId = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userId");
    },
  },
});
