<template>
  <div
    class="mb-6 font-weight-bold text-blue-grey-darken-2"
    style="font-size: large"
  >
    Ajout d'une chambre
  </div>
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
      class="mb- ma-0 pa-0"
      density="compact"
    />
  </div>
  <div class="flex text-center">
    <div style="width: 30%">
      <v-btn
        block
        color="var(--color-3)"
        style="color: white"
        text="Créer "
        rounded="xl"
        @click="createRoom"
      ></v-btn>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from "vue";
import AxiosInstance from "../../Service/Axios";

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
    const response = await AxiosInstance.post("/hotels/room/", roomData);
    if (response) {
      console.log("Room created successfuly:", response.data);
    }
  } catch (error) {
    console.error("Erreur lors de la création :", error);
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
