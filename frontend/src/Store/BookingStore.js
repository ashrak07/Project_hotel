import { defineStore } from "pinia";

export const useBookingStore = defineStore("booking", {
  state: () => ({
    booking: "",
  }),

  actions: {
    addBooking(payload = null) {
      this.booking = payload;
    },
  },
});
