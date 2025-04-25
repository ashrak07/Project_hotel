import { defineStore } from "pinia";

export const useRoomStore = defineStore("room", {
  state: () => ({
    rooms: "",
    selectedRoom: "",
    selectedId: null,
    clickedIdRoom: null,
    reservation: {},
    reservationCustomer: {},
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
    addReservationDate(payload) {
      this.reservation = payload;
    },
    addReservationCustomer(payload) {
      this.reservationCustomer = payload;
    },
    getRoom() {
      console.log("Room from store ===>", this.rooms);
    },
  },
});
