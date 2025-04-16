<script setup>
import axios from "axios";
import { getImageUrl } from "../../Utils/utils";
import AxiosInstance from "../../Service/Axios";
import { onMounted, ref, watch } from "vue";
import { useRoomStore } from "../../Store/RoomStore";

const roomStore = useRoomStore();

const sary = ref([
  "../../../public/001.jpg",
  "../../../public/002.jpg",
  "../../../public/003.jpg",
]);

const show = ref(false);
const expanded = ref([]);
const rating = ref(3);

const getRoom = () => {
  AxiosInstance.get("/hotels/room/all")
    .then((response) => {
      const roomData = response.data.data;
      console.log("response ==>", roomData);

      roomStore.addRoom(roomData);
      console.log("room data from store ==>", roomStore.rooms);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des chambres:", error);
    });
};

watch(
  () => roomStore.rooms,
  (newRooms) => {
    if (Array.isArray(newRooms)) {
      expanded.value = newRooms.map(() => false);
    } else {
      expanded.value = [];
    }
  },
  { immediate: true }
);

const toggleExpand = (index) => {
  expanded.value = expanded.value.map((isOpen, i) =>
    i === index ? !isOpen : false
  );
};

onMounted(() => {
  console.log("Home view mounted");
  getRoom();
});
</script>

<template>
  <div class="nav text-center">
    <v-carousel cycle interval="6000" hide-delimiters>
      <v-carousel-item
        v-for="(image, i) in sary"
        :key="i"
        :src="image"
        cover
      ></v-carousel-item>
    </v-carousel>

    <div class="search-bar">
      <v-row dense>
        <v-col cols="12" md="6">
          <v-date-input
            label="Select a date"
            prepend-icon=""
            append-inner-icon="$calendar"
            variant="solo"
            class="mr-5 pt-5"
          ></v-date-input>
        </v-col>

        <v-col cols="12" md="6">
          <v-date-input
            label="Select a date"
            prepend-icon=""
            append-inner-icon="$calendar"
            variant="solo"
            class="mr-5 pt-5"
          ></v-date-input>
        </v-col>
      </v-row>

      <v-btn
        append-inner-icon="mdi mdi-magnify"
        color="var(--color-2)"
        style="color: white"
      >
        Rechercher
        <span class="mdi mdi-magnify ml-2" style="font-size: x-large"></span>
      </v-btn>
    </div>
  </div>

  <!-- A propos  -->

  <v-container>
    <div
      class="font-weight-bold text-blue-grey-darken-2"
      style="font-size: large"
    >
      Présentation
    </div>
    <p class="my-3 text-blue-grey-darken-2">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
      architecto, rerum a animi illo sunt eveniet asperiores pariatur, cumque
      laborum nisi sint saepe? Ab doloribus inventore illum enim beatae
      molestiae blanditiis ratione explicabo, accusantium aliquid sit ex alias
      et eligendi quasi a! Architecto voluptates deleniti sint quam quisquam,
      eius error?
    </p>
    <v-divider></v-divider>
    <div
      class="font-weight-bold mt-6 text-blue-grey-darken-2"
      style="font-size: large"
    >
      A propos de cet hébergement
    </div>

    <div class="my-6">
      <v-row>
        <v-col cols="6" class="pl-12">
          <v-row class="d-flex">
            <span
              class="mdi mdi-parking mr-2 text-blue-grey-darken-2"
              style="font-size: large"
            >
            </span>
            <div class="pt-1 text-blue-grey-darken-2">Parking sécurisé</div>
          </v-row>
          <v-row>
            <span
              class="mdi mdi-glass-wine mr-2 text-blue-grey-darken-2"
              style="font-size: large"
            ></span>
            <div class="pt-1 text-blue-grey-darken-2">Bar</div>
          </v-row>
          <v-row>
            <span
              class="mdi mdi-wifi mr-2 text-blue-grey-darken-2"
              style="font-size: large"
            ></span>
            <div class="pt-1 text-blue-grey-darken-2">WIFI gratuit</div>
          </v-row>
          <v-row>
            <span
              class="mdi mdi-spa mr-2 text-blue-grey-darken-2"
              style="font-size: large"
            >
            </span>
            <div class="pt-1 text-blue-grey-darken-2">
              Centre de bien être et spa
            </div>
          </v-row>
        </v-col>
        <v-col cols="6" class="">
          <v-row>
            <span
              class="mdi mdi-coffee mr-2 text-blue-grey-darken-2"
              style="font-size: large"
            ></span>
            <div class="pt-1 text-blue-grey-darken-2">Machine à café</div>
          </v-row>
          <v-row>
            <span
              class="mdi mdi-pool mr-2 text-blue-grey-darken-2"
              style="font-size: large"
            ></span>
            <div class="pt-1 text-blue-grey-darken-2">Piscine exterieur</div>
          </v-row>
          <v-row>
            <span
              class="mdi mdi-silverware-fork-knife mr-2 text-blue-grey-darken-2"
              style="font-size: large"
            ></span>
            <div class="pt-1 text-blue-grey-darken-2">Restaurant</div>
          </v-row>
          <v-row>
            <span
              class="mdi mdi-weight-lifter mr-2 text-blue-grey-darken-2"
              style="font-size: large"
            ></span>
            <div class="pt-1 text-blue-grey-darken-2">Salle de sport</div>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <v-divider></v-divider>
    <v-btn class="my-6" color="var(--color-2)" variant="outlined"
      >Voir toutes les chambres</v-btn
    >

    <!-- List of romms -->

    <!-- card -->
    <div>
      <v-row>
        <v-col
          v-for="(room, index) in roomStore.rooms"
          :key="index"
          cols="12"
          sm="4"
          class="mb-6"
        >
          <v-card class="" max-width="344">
            <v-carousel
              height="200"
              show-arrows="hover"
              hide-delimiter-background
            >
              <v-carousel-item
                v-for="(img, i) in room.images"
                :key="i"
                :src="getImageUrl(img)"
                cover
              >
              </v-carousel-item>
            </v-carousel>
            <div class="flex" cols="6">
              <v-card-title class="font-weight-bold text-blue-grey-darken-1">
                {{ room.name }}
              </v-card-title>
              <v-spacer></v-spacer>
              <v-rating
                class="pt-2 pr-3 ml-4"
                hover
                :length="5"
                :size="16"
                v-model="rating"
                color="pink-lighten-1"
                active-color="pink-lighten-1"
              ></v-rating>
            </div>
            <v-card-subtitle class="mb-1 text-blue-grey-darken-1">
              {{ room.type }}
            </v-card-subtitle>

            <v-card-actions>
              <v-btn
                color="var(--color-2)"
                text="Voir plus"
                style="font-size: smaller"
              ></v-btn>

              <v-spacer></v-spacer>

              <v-btn
                :icon="expanded[index] ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="toggleExpand(index)"
              ></v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="expanded[index]" class="">
                <v-divider></v-divider>
                <div class="my-1">
                  <v-container>
                    <v-row
                      v-if="room.service.includes('Petit déjeuner')"
                      class="px-3 py-1"
                    >
                      <span
                        class="mdi mdi-coffee mr-2 text-blue-grey-darken-2"
                      ></span>
                      <div class="text-blue-grey-darken-2">
                        Petit déjeuner inclus
                      </div>
                    </v-row>
                    <v-row
                      v-if="room.service.includes('Wifi')"
                      class="px-3 py-1"
                    >
                      <span
                        class="mdi mdi-wifi mr-2 text-blue-grey-darken-2"
                      ></span>
                      <div class="text-blue-grey-darken-2">Wifi gratuit</div>
                    </v-row>
                    <v-row
                      v-if="room.service.includes('Télévision')"
                      class="px-3 py-1"
                    >
                      <span
                        class="mdi mdi-television mr-2 text-blue-grey-darken-2"
                      ></span>
                      <div class="text-blue-grey-darken-2">Télévision</div>
                    </v-row>
                    <v-row
                      v-if="room.service.includes('Bar')"
                      class="px-3 py-1"
                    >
                      <span
                        class="mdi mdi-glass-cocktail mr-2 text-blue-grey-darken-2"
                      ></span>
                      <div class="text-blue-grey-darken-2">Mini bar</div>
                    </v-row>
                    <v-row
                      v-if="room.service.includes('Climatisation')"
                      class="px-3 py-1"
                    >
                      <span
                        class="mdi mdi-air-conditioner mr-2 text-blue-grey-darken-2"
                      ></span>
                      <div class="text-blue-grey-darken-2">Climatisation</div>
                    </v-row>
                    <v-row
                      v-if="room.service.includes('Jacuzzi')"
                      class="px-3 py-1"
                    >
                      <span
                        class="mdi mdi mdi-spa mr-2 text-blue-grey-darken-2"
                      ></span>
                      <div class="text-blue-grey-darken-2">Jacuzzi</div>
                    </v-row>
                    <v-row
                      v-if="room.service.includes('Balcon')"
                      class="px-3 py-1"
                    >
                      <span
                        class="mdi mdi-balcony mr-2 text-blue-grey-darken-2"
                      ></span>
                      <div class="text-blue-grey-darken-2">
                        Balcon / Terasse
                      </div>
                    </v-row>

                    <v-row class="px-3 py-1">
                      <span class="mdi mdi-bed mr-2 text-blue-grey-darken-2">
                      </span>
                      <div class="text-blue-grey-darken-2">
                        {{ room.bed }} lit(s)
                      </div>
                    </v-row>
                    <v-row class="px-3 py-1">
                      <span
                        class="mdi mdi-account-supervisor mr-2 text-blue-grey-darken-2"
                      >
                      </span>
                      <div class="text-blue-grey-darken-2">
                        {{ room.person }} personne(s)
                      </div>
                    </v-row>
                    <v-row
                      v-if="room.service.includes('Cuisine')"
                      class="px-3 py-1"
                    >
                      <span
                        class="mdi mdi-silverware-fork-knife mr-2 text-blue-grey-darken-2"
                      ></span>
                      <div class="text-blue-grey-darken-2">Cuisine équipé</div>
                    </v-row>
                  </v-container>
                </div>
                <v-divider></v-divider>
                <div class="flex justify-end my-3 mx-3" cols="6">
                  <div
                    style="font-size: medium; font-weight: 300"
                    class="flex text-blue-grey-darken-2"
                  >
                    600
                    <div class="ml-1" style="font-weight: 600">MGA</div>
                  </div>
                </div>
                <v-divider></v-divider>
                <div class="my-3 text-center" cols="6">
                  <v-btn class="" color="pink-lighten-1" style="color: white">
                    Réserver
                  </v-btn>
                </div>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- card end  -->
  </v-container>
</template>

<style scoped>
.search-bar {
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, 40%);
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  width: 60%;
}

.nav {
  position: relative;
}

.v-card-title {
  padding: 8px 16px;
  font-size: medium;
}
</style>
