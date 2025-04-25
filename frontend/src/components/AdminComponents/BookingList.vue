<template>
  <v-container>
    <h2 class="text-h5 mb-4">Liste des Réservations</h2>

    <v-table class="elevation-1 rounded">
      <thead class="bg-blue-grey-lighten-5">
        <tr>
          <th class="text-left font-weight-bold">Nom</th>
          <th class="text-left font-weight-bold">Prénom</th>
          <th class="text-left font-weight-bold">E-mail</th>
          <th class="text-left font-weight-bold">Téléphone</th>
          <th class="text-left font-weight-bold">Date d'arrivée</th>
          <th class="text-left font-weight-bold">Date de départ</th>
          <th class="text-left font-weight-bold">Chambre</th>
          <th class="text-left font-weight-bold">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(item, index) in bookingStore.booking"
          :key="index"
          class="hover-row"
        >
          <td>{{ item.customerName }}</td>
          <td>{{ item.firstName }}</td>
          <td>{{ item.customerEmail }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ formatDate(item.checkInDate) }}</td>
          <td>{{ formatDate(item.checkOutDate) }}</td>
          <td>{{ item.room.name }}</td>
          <td>
            <v-btn
              color="pink-lighten-1"
              text="Supprimer"
              class="ml-2"
              style="align-self: start"
              @click="deleteReservation(item._id)"
              ><span class="mdi mdi-delete-circle" style="font-size: x-large">
              </span
            ></v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import AxiosInstance from "../../Service/Axios";
import { formatDate } from "../../Utils/utils";
import { useBookingStore } from "../../Store/BookingStore";

const bookingStore = useBookingStore();

const getReservation = async () => {
  try {
    const reservation = await AxiosInstance.get("/hotels/booking/all", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (reservation) {
      console.log("reo nenlah ==>", reservation.data);
      bookingStore.addBooking(reservation.data.data);
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteReservation = async (id) => {
  try {
    console.log("id de la reservation", id);
    const response = await AxiosInstance.delete(`/hotels/booking/${id}`);
    if (response) {
      console.log("reo nihena ray ==>", response.data);
      bookingStore.addBooking(response.data.data);
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getReservation();
});
</script>

<style scoped>
.hover-row:hover {
  background-color: #f0f4f8;
  transition: 0.2s ease;
}

th {
  background-color: #e0e0e0;
}
</style>
