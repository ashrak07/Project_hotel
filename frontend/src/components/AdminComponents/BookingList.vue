<template>
  <v-container>
    <h2 class="text-h5 mb-4">Liste des Réservations</h2>
    <v-responsive class="overflow-x-auto">
      <v-table class="elevation-1 rounded">
        <thead class="bg-blue-darken-2">
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>E-mail</th>
            <th>Téléphone</th>
            <th>Date d'arrivée</th>
            <th>Date de départ</th>
            <th>Chambre</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in bookingStore.booking"
            :key="index"
            class="hover-row"
            style="font-size: smaller"
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
                variant="outlined"
                color="pink-darken-1"
                class="ml-2"
                style="align-self: start"
                @click="openDialog(item._id)"
              >
                <span
                  class="mdi mdi-delete-circle"
                  style="font-size: x-large"
                ></span>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-responsive>

    <!-- DIALOG DE CONFIRMATION GÉNÉRAL -->
    <v-dialog v-model="confirmDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Confirmer la suppression</v-card-title>
        <v-card-text
          >Êtes-vous sûr de vouloir supprimer cette réservation ?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="confirmDialog = false">Annuler</v-btn>
          <v-btn color="red" text @click="confirmDelete">Supprimer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import AxiosInstance from "../../Service/Axios";
import { useBookingStore } from "../../Store/BookingStore";
import { useUserStore } from "../../Store/UserStore";
import { formatDate } from "../../Utils/utils";

const bookingStore = useBookingStore();
const userStore = useUserStore();

const confirmDialog = ref(false);
const selectedId = ref(null); // <-- Stocke l'ID de la réservation à supprimer

const getReservation = async () => {
  const token = userStore.accessToken;
  try {
    const reservation = await AxiosInstance.get("/hotels/booking/all", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (reservation) {
      bookingStore.addBooking(reservation.data.data);
    }
  } catch (error) {
    console.error(error);
  }
};

const openDialog = (id) => {
  selectedId.value = id;
  confirmDialog.value = true;
};

const confirmDelete = async () => {
  confirmDialog.value = false;
  try {
    const response = await AxiosInstance.delete(
      `/hotels/booking/${selectedId.value}`
    );
    if (response?.data) {
      // Rafraîchir les réservations après suppression
      await getReservation();
    }
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
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
