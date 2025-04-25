import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: "",
  }),

  actions: {
    addUser(payload = null) {
      this.user = payload;
    },
  },
});
