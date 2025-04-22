import { defineStore } from "pinia";

export const useRoomStore = defineStore("room", {
  state: () => ({
    rooms: "",
    selectedRoom: "",
    selectedId: null,
    clickedIdRoom: null,
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
    addClickedIdRoom(payload = null) {
      this.clickedIdRoom = payload;
    },
    clearRoom() {
      this.rooms = "";
    },
    getRoom() {
      console.log("Room from store ===>", this.rooms);
    },
  },
});
