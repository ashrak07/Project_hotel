import { defineStore } from "pinia";

export const useRoomStore = defineStore("room", {
  state: () => ({
    rooms: "",
  }),

  actions: {
    addRoom(payload = null) {
      this.rooms = payload;
    },
    clearRoom() {
      this.rooms = "";
    },
    getRoom() {
      console.log("Room from store ===>", this.rooms);
    },
  },
});
