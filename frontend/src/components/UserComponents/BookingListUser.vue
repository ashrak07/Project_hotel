<template>
  <v-container class="">
    <h2 class="text-h5 mb-4">Liste des Réservations</h2>
    <v-responsive v-if="!hasError" class="overflow-x-auto">
      <v-table class="elevation-1 rounded">
        <thead class="bg-blue-darken-2">
          <tr>
            <th class="">Nom</th>
            <th class="">Prénom</th>
            <th class="">E-mail</th>
            <th class="">Téléphone</th>
            <th class="">Date d'arrivée</th>
            <th class="px-0">Date de départ</th>
            <th class="">Chambre</th>
          </tr>
        </thead>

        <tbody class="font-2">
          <tr
            v-for="(item, index) in bookingStore.booking"
            :key="index"
            class="hover-row"
            style="font-size: smaller"
          >
            <td class="">{{ item.customerName }}</td>
            <td>{{ item.firstName }}</td>
            <td>{{ item.customerEmail }}</td>
            <td>{{ item.phone }}</td>
            <td class="pa-0">{{ formatDate(item.checkInDate) }}</td>
            <td class="pa-0">{{ formatDate(item.checkOutDate) }}</td>
            <td class="pa-0">{{ item.room.name }}</td>
            <!-- 
            <td>
              <v-btn
                variant="outlined"
                color="pink-darken-1"
                text="Supprimer"
                class="ml-2"
                style="align-self: start"
                @click="deleteReservation(item._id)"
                ><span class="mdi mdi-delete-circle" style="font-size: x-large">
                </span
              ></v-btn>
            </td> -->
          </tr>
        </tbody>
      </v-table>
    </v-responsive>
    <div v-if="existingReservation">Aucune réservation</div>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import AxiosInstance from "../../Service/Axios";
import { formatDate } from "../../Utils/utils";
import { useBookingStore } from "../../Store/BookingStore";
import { useUserStore } from "../../Store/UserStore";

const bookingStore = useBookingStore();
const userStore = useUserStore();

const existingReservation = ref(false);
const hasError = ref(false);

const getReservation = async () => {
  const token = userStore.accessToken;
  try {
    const userId = userStore.userId;
    const reservation = await AxiosInstance.get(`/hotels/booking/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (reservation.data.data.length > 0) {
      console.log("reo nenlah ==>", reservation.data);
      bookingStore.addBooking(reservation.data.data);
    }
  } catch (error) {
    console.error(error);
    hasError.value = true;
    existingReservation.value = true;
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
</style>
