<template>
  <div class="mb-6" style="font-size: x-large">Ajout d'une chambre</div>
  <div class="mb-4 d-flex text-center">
    <img src="../../assets/29.jpg" />
  </div>
  <div>
    <v-row>
      <v-col cols="6" class="">
        <v-card-text
          class="pa-0 py-2 text-blue-grey-darken-3 font-2"
          style="font-size: smaller"
          >Entrer jusqu'à 5 images</v-card-text
        >
        <v-file-input
          prepend-icon=""
          v-model="roomImages"
          append-inner-icon="mdi-camera"
          variant="outlined"
          density="compact"
          multiple
          clearable
        ></v-file-input>
        <v-card-text
          class="pa-0 py-2 text-blue-grey-darken-3 font-2"
          style="font-size: smaller"
          >Type de la chambre</v-card-text
        >

        <v-text-field
          v-model="roomType"
          variant="outlined"
          density="compact"
          clearable
        ></v-text-field>
        <v-card-text
          class="pa-0 py-2 text-blue-grey-darken-3 font-2"
          style="font-size: smaller"
          >Nombre du lit</v-card-text
        >

        <v-number-input
          v-model="roomBed"
          control-variant="stacked"
          variant="outlined"
          density="compact"
          clearable
        ></v-number-input>
      </v-col>
      <v-col cols="6" class="">
        <v-card-text
          class="pa-0 py-2 text-blue-grey-darken-3 font-2"
          style="font-size: smaller"
          density="compact"
          >Nom de la chambre</v-card-text
        >

        <v-text-field
          v-model="roomName"
          variant="outlined"
          clearable
          density="compact"
        ></v-text-field>
        <v-card-text
          class="pa-0 py-2 text-blue-grey-darken-3 font-2"
          style="font-size: smaller"
          >Prix</v-card-text
        >

        <v-text-field
          v-model="roomPrice"
          variant="outlined"
          clearable
          density="compact"
        ></v-text-field>
        <v-card-text
          class="pa-0 py-2 text-blue-grey-darken-3 font-2"
          style="font-size: smaller"
          >Nombre de personne</v-card-text
        >

        <v-number-input
          v-model="roomPerson"
          control-variant="stacked"
          variant="outlined"
          clearable
          density="compact"
        ></v-number-input>
      </v-col>
    </v-row>
    <div class="text-blue-grey-darken-1 my-2" style="font-size: medium">
      Services inclus
    </div>

    <v-checkbox
      v-for="service in [
        'Télévision',
        'Wifi',
        'Climatisation',
        'Balcon',
        'Bar',
        'Jacuzzi',
        'Cuisine',
        'Petit déjeuner',
      ]"
      :key="service"
      v-model="selectedServices"
      :label="service"
      :value="service"
      color="primary"
      class="d-flex flex-row ma-0 pa-0"
      density="compact"
    />
  </div>
  <div class="d-flex text-center">
    <div style="width: 30%">
      <v-btn
        block
        color="var(--color-3)"
        style="color: white"
        rounded="xl"
        @click="createRoom"
      >
        <template v-if="loader">
          <v-progress-circular
            color="white"
            width="2"
            size="30"
          ></v-progress-circular>
        </template>
        <template v-else>
          Créer
          <span
            class="mdi mdi-check-circle ml-2"
            style="font-size: large"
          ></span>
        </template>
      </v-btn>
    </div>
  </div>
  <v-snackbar v-model="successSnackbar" color="green-lighten-1" timeout="3000">
    Chambre créer avec success !
  </v-snackbar>
</template>

<script setup>
import { onMounted, ref, watchEffect } from "vue";
import AxiosInstance from "../../Service/Axios";

const loader = ref(false);
const successSnackbar = ref(false);

const roomName = ref("");
const roomType = ref("");
const roomPrice = ref("");
const roomBed = ref();
const roomPerson = ref();
const roomArea = ref("");
const roomImages = ref([]);
const selectedServices = ref([]);

const createRoom = async () => {
  console.log("create room clicked");
  const roomData = new FormData();

  roomData.append("name", roomName.value);
  roomData.append("type", roomType.value);
  roomData.append("price", Number(roomPrice.value));
  roomData.append("bed", roomBed.value);
  roomData.append("person", roomPerson.value);

  roomImages.value.forEach((image) => {
    roomData.append("images", image);
  });

  selectedServices.value.forEach((s) => {
    roomData.append("service", s);
  });

  try {
    loader.value = true;
    const response = await AxiosInstance.post("/hotels/room/", roomData);
    if (response) {
      console.log("Room created successfuly:", response.data);
    }
    successSnackbar.value = true;
  } catch (error) {
    console.error("Erreur lors de la création :", error);
  } finally {
    loader.value = false;
  }
};

onMounted(() => {
  watchEffect(() => {
    console.log(
      "reto ny input ==>",
      roomName.value,
      roomType.value,
      roomPrice.value,
      roomBed.value,
      roomPerson.value,
      roomImages.value,
      selectedServices.value
    );
  });
});
</script>

<style scoped>
img {
  width: 75%;
}
</style>
