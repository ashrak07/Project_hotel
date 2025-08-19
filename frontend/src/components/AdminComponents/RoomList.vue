<template>
  <div class="pa-3">
    <div class="">
      <v-row cols="6" class="d-flex justify-space-between align-center">
        <v-col class="">
          <div class="" style="font-size: x-large">Liste des chambres</div>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-btn
            color="var(--color-3)"
            style="color: white"
            text="Créer une chambre"
            @click="createRoom"
          ></v-btn>
        </v-col>
      </v-row>
    </div>
    <v-card
      v-for="(room, index) in roomStore.rooms"
      :key="index"
      class="my-6 border d-flex overflow-hidden"
      max-width="900"
      elevation="0"
    >
      <div class="d-flex">
        <!-- Image à gauche -->
        <v-img
          :src="getImageUrl(room.images[0])"
          width="200"
          height="150"
          cover
        ></v-img>
        <!-- Contenu à droite -->
      </div>
      <div
        class="d-flex flex-column justify-space-between py-3 px-4"
        style="flex: 1; overflow: hidden"
      >
        <div>
          <div class="text-h6">{{ room.name }}</div>
          <div class="text-subtitle-2 mb-2">Vue sur mer</div>
          <div
            class="text-body-2 text-truncate"
            style="max-height: 60px; overflow: hidden"
          >
            Une chambre spacieuse avec un grand lit, balcon et salle de bain
            privée. Cette chambre est parfaite pour les séjours détente en
            couple ou en solo.
          </div>
        </div>
        <div class="mt-2 d-flex flex-row justify-start">
          <v-btn
            color="blue-lighten-1"
            variant="flat"
            density="comfortable"
            text="Modifier"
            class=""
            style="align-self: start"
            @click="updateRoom(room._id)"
            ><span
              class="mdi mdi-plus"
              style="font-size: x-large; color: white"
            >
            </span>
          </v-btn>
          <v-btn
            color="pink-lighten-1"
            variant="flat"
            density="comfortable"
            text="Supprimer"
            class="ml-2"
            style="align-self: start"
            @click="deleteCardClick(room._id)"
            ><span class="mdi mdi-minus" style="font-size: x-large"> </span
          ></v-btn>
        </div>
      </div>
    </v-card>
    <v-snackbar v-model="successSnackbar" color="pink-darken-1" timeout="3000">
      Chambre supprimer avec success !
    </v-snackbar>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getImageUrl } from "../../Utils/utils";
import AxiosInstance from "../../Service/Axios";
import { useRoomStore } from "../../Store/RoomStore";
import { useRouter } from "vue-router";
import { useUserStore } from "../../Store/UserStore";

const roomStore = useRoomStore();
const userStore = useUserStore();
const router = useRouter();
const successSnackbar = ref(false);

const createRoom = () => {
  router.push({ name: "create-room" });
};

const getListRoom = async () => {
  const token = userStore.accessToken;
  try {
    const response = await AxiosInstance.get("/hotels/room/all", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response) {
      console.log("list ====>", response.data);
      roomStore.addRoom(response.data.data);
      console.log("room list from store ===>", roomStore.rooms);
    }
  } catch (error) {
    console.error("Error lors de la recuperation des chambres");
  }
};

const deleteCardClick = async (id) => {
  console.log("id room index", id);
  try {
    const response = await AxiosInstance.post(`/hotels/room/${id}`);
    if (response) {
      console.log("new list ===>", response.data);
      roomStore.addRoom(response.data.data);
      console.log("new room list from store", roomStore.rooms);
    }
    successSnackbar.value = true;
  } catch (error) {
    console.error("Error lors de la recuperation des nouveaux chambres");
  }
};

const updateRoom = async (id) => {
  console.log("id selected", id);
  try {
    const response = await AxiosInstance.get(`/hotels/room/${id}`);
    if (response) {
      console.log("room updated  ====>", response.data);
      roomStore.addSelectedRoom(response.data.data);
      console.log("room selected from store ===>", roomStore.selectedRoom);
    }
    router.push({ name: "update" });
  } catch (error) {
    console.error("Error lors de la recuperation des chambres");
  }
};

onMounted(() => {
  getListRoom();
});
</script>
