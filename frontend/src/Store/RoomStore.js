import { defineStore } from "pinia";

export const useRoomStore = defineStore("room", {
  state: () => ({
    rooms: "",
    selectedRoom: JSON.parse(localStorage.getItem("selectedRoom")) || null,
    selectedId: null,
    clickedIdRoom: null,
    reservation: JSON.parse(localStorage.getItem("reservation")) || null,
    reservationCustomer: {},
  }),

  actions: {
    addRoom(payload = null) {
      this.rooms = payload;
    },
    addSelectedRoom(payload = null) {
      this.selectedRoom = payload;
      localStorage.setItem("selectedRoom", JSON.stringify(this.selectedRoom));
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
    addReservationDate(payload = null) {
      this.reservation = payload;
      localStorage.setItem("reservation", JSON.stringify(this.reservation));
    },
    addReservationCustomer(payload) {
      this.reservationCustomer = payload;
    },
    getRoom() {
      console.log("Room from store ===>", this.rooms);
    },
  },
});
