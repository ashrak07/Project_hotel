import { defineStore } from "pinia";

export const useRoomStore = defineStore("room", {
  state: () => ({
    rooms: "",
    selectedRoom: "",
    selectedId: null,
  }),

  actions: {
    addRoom(payload = null) {
      this.rooms = payload;
    },
    addSelectedRoom(payload = null) {
      this.selectedRoom = payload;
    },
    addSelectedId(payload = null) {
      this.selectedId = payload;
    },
    clearRoom() {
      this.rooms = "";
    },
    getRoom() {
      console.log("Room from store ===>", this.rooms);
    },
  },
});
