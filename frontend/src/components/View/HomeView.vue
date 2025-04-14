<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { Calendar, Search } from "@element-plus/icons-vue";
import { useRoomStore } from "../../Store/RoomStore";

const roomStore = useRoomStore();

const images = ref([
  "../../../public/001.jpg",
  "../../../public/002.jpg",
  "../../../public/003.jpg",
]);

const show = ref(false);
const rating = ref(3);

let config = {
  method: "get",
  url: "http://localhost:3002/hotels/room/all",
  Headers: {},
};

const getRoom = () => {
  axios
    .request(config)
    .then((response) => {
      const roomData = response.data.data;
      console.log("response ==>", roomData);

      roomStore.addRoom(roomData);
      console.log("room data from store");
      roomStore.getRoom();
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des chambres:", error);
    });
};

const getImageUrl = (path) => {
  return path?.startsWith("http") ? path : `http://localhost:3002/${path}`;
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
        v-for="(image, i) in images"
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
                v-for="(image, i) in room.images"
                :key="i"
                :src="getImageUrl(image)"
                cover
              >
              </v-carousel-item>
            </v-carousel>

            <v-card-title class="font-weight-bold text-blue-grey-darken-1">
              Home sweet home
            </v-card-title>
            <v-rating
              class="ml-4"
              hover
              :length="5"
              :size="16"
              v-model="rating"
              color="pink-lighten-1"
              active-color="pink-lighten-1"
            ></v-rating>

            <v-card-actions>
              <v-btn
                color="var(--color-2)"
                text="Voir plus"
                style="font-size: smaller"
              ></v-btn>

              <v-spacer></v-spacer>

              <v-btn
                :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="show = !show"
              ></v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show" class="">
                <v-divider></v-divider>
                <div class="my-5 pb-3">
                  <v-row class="ml-4 mt-4">
                    <span
                      class="mdi mdi-coffee mr-2 text-blue-grey-darken-2"
                    ></span>
                    <div class="text-blue-grey-darken-2">
                      Petit déjeuner inclus
                    </div>
                  </v-row>
                  <v-row class="ml-4 mt-4">
                    <span class="mdi mdi-bed mr-2 text-blue-grey-darken-2">
                    </span>
                    <div class="text-blue-grey-darken-2">
                      1 lit double ou 2 lits 1 place
                    </div>
                  </v-row>
                  <v-row class="ml-4 mt-4">
                    <span
                      class="mdi mdi-account-supervisor mr-2 text-blue-grey-darken-2"
                    >
                    </span>
                    <div class="text-blue-grey-darken-2">2 personnes</div>
                  </v-row>
                  <v-row class="ml-4 mt-4">
                    <span
                      class="mdi mdi-silverware-fork-knife mr-2 text-blue-grey-darken-2"
                    ></span>
                    <div class="text-blue-grey-darken-2">Cuisine équipé</div>
                  </v-row>
                </div>

                <!-- 
                <v-card-text>
                  I'm a thing. But, like most politicians, he promised more than
                  he could deliver. You won't have time for sleeping, soldier,
                  not with all the bed making you'll be doing. Then we'll go
                  with that data file! Hey, you add a one and two zeros to that
                  or we walk! You're going to do his laundry? I've got to find a
                  way to escape.
                </v-card-text> -->
                <v-divider></v-divider>
                <div class="flex justify-end my-3 mx-3" cols="6">
                  <div
                    style="font-size: medium; font-weight: 600"
                    class="text-blue-grey-darken-2"
                  >
                    600 MGA
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
