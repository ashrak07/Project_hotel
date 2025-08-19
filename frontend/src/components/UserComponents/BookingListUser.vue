<template>
  <div class="pa-3">
    <div class="text-lg mb-4">Liste des Réservations</div>
    <v-responsive v-if="!hasError" class="overflow-x-auto">
      <v-table class="rounded-lg border">
        <thead class="bg-gray-100">
          <tr class="text-gray-500">
            <th class="text-left">Nom</th>
            <th class="text-left">Prénom</th>
            <th class="text-left">E-mail</th>
            <th class="text-left">Téléphone</th>
            <th class="text-left">Date d'arrivée</th>
            <th class="text-left">Date de départ</th>
            <th class="text-left">Chambre</th>
          </tr>
        </thead>

        <tbody class="">
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
            <td class="">{{ formatDate(item.checkInDate) }}</td>
            <td class="">{{ formatDate(item.checkOutDate) }}</td>
            <td class="">{{ item.room.name }}</td>
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
  </div>
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
  background-color: #f9fbfc;
  transition: 0.2s ease;
}
</style>
