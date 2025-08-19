<script setup>
import axios from "axios";
import { getImageUrl } from "../../Utils/utils";
import AxiosInstance from "../../Service/Axios";
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import { useRoomStore } from "../../Store/RoomStore";
import { useRouter } from "vue-router";
import { useUserStore } from "../../Store/UserStore";

const roomStore = useRoomStore();
const userStore = useUserStore();
const router = useRouter();

const sary = ref([
  "../../../public/001.jpg",
  "../../../public/002.jpg",
  "../../../public/003.jpg",
]);

const loader = ref(false);
const alert = ref(false);
const displayRoom = ref([]);

const dialog = ref(false);
const expanded = ref([]);
const rating = ref(3);
const dateError = ref(false);

const dateIn = ref("");
const dateOut = ref("");

const close = () => {
  dialog.value = false;
  dateError.value = false;
};

const getRoom = async () => {
  await AxiosInstance.get("/hotels/room/all/rooms")
    .then((response) => {
      const roomData = response.data.data;
      console.log("Room data ==>", roomData);

      roomStore.addRoom(roomData);
      console.log("room data from store ==>", roomStore.rooms);
      displayRoom.value = roomStore.rooms.slice(0, 3);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des chambres:", error);
    });
};

const book = (id) => {
  if (!userStore.userId && !userStore.accessToken) {
    router.push({ name: "login" });
  } else {
    roomStore.addClickedIdRoom(id);
    console.log("selected id from store...", roomStore.clickedIdRoom);
  }
};

const isSlice = () => {
  displayRoom.value = roomStore.rooms;
  console.log("display room", displayRoom.value);
};

const checkReservation = async () => {
  const id = roomStore.clickedIdRoom;
  const selected = roomStore.rooms.find(
    (room) => roomStore.rooms._id === room.id
  );
  console.log("selected >>>", selected);
  roomStore.addSelectedRoom(selected);

  const reservationData = {
    room: id,
    checkInDate: dateIn.value,
    checkOutDate: dateOut.value,
  };
  console.log("request ==>", reservationData);
  try {
    console.log("reservation data:", reservationData);
    if (dateIn.value !== "" && dateOut.value !== "") {
      loader.value = true;
      const response = await AxiosInstance.post(
        "/hotels/booking/check",
        reservationData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        roomStore.addReservationDate({
          checkInDate: dateIn.value,
          checkOutDate: dateOut.value,
        });
        router.push({ name: "stepper" });
      }
    } else {
      console.log("les dates sont obligatoires");
      dateError.value = true;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        alert.value = true;
        console.log("io ary ==>", error.response.data.message);
      }
    }
  } finally {
    loader.value = false;
  }
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

watchEffect(() => {
  console.log("Date in ==>", dateIn.value);
  console.log("Date out ==>", dateOut.value);
});

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
            label="Date d'arrivée"
            prepend-icon=""
            append-inner-icon="$calendar"
            variant="outlined"
            class="mr-5 pt-5"
            clearable
          ></v-date-input>
        </v-col>

        <v-col cols="12" md="6">
          <v-date-input
            label="Date de départ"
            prepend-icon=""
            append-inner-icon="$calendar"
            variant="outlined"
            class="mr-5 pt-5"
            clearable
          ></v-date-input>
        </v-col>
      </v-row>

      <v-btn
        append-inner-icon="mdi mdi-magnify"
        color="var(--color-2)"
        style="color: white"
        class="b3"
      >
        Rechercher
        <span class="mdi mdi-magnify ml-2" style="font-size: x-large"></span>
      </v-btn>
    </div>
  </div>

  <!-- A propos  -->

  <v-container class="">
    <div class="font-weight-bold text-h5">Présentation</div>
    <div class="my-3 text-md">
      Bienvenue à l’Hôtel Hotel-ko, un véritable havre de paix situé au cœur de
      Nosy Be. Notre établissement allie élégance, confort et modernité pour
      vous offrir un séjour inoubliable, que vous voyagiez pour affaires ou pour
      le plaisir. Chaque chambre, spacieuse et soigneusement décorée, est
      équipée de tout le nécessaire pour garantir votre bien-être :
      climatisation, connexion Wi-Fi haut débit, télévision à écran plat,
      minibar, et salle de bains privative avec articles de toilette de qualité.
      Certaines suites disposent également de balcons avec vue panoramique.
      Profitez de notre restaurant sur place qui propose une cuisine raffinée
      mêlant saveurs locales et internationales, ainsi que d’un bar cosy pour
      vos moments de détente. Pour votre confort, l’hôtel met à votre
      disposition une piscine extérieure, une salle de sport, un spa ainsi que
      des espaces dédiés à l’organisation de réunions et événements.
    </div>
    <v-divider class="my-3"></v-divider>
    <div class="font-weight-bold text-h5">A propos de cet hébergement</div>

    <div class="my-6">
      <v-row>
        <v-col cols="6" class="pl-12">
          <v-row class="d-flex">
            <span class="mdi mdi-parking mr-2"> </span>
            <div class="pt-1 text-body-2">Parking sécurisé</div>
          </v-row>
          <v-row>
            <span
              class="mdi mdi-glass-wine mr-2"
              style="font-size: large"
            ></span>
            <div class="pt-1 text-body-2">Bar</div>
          </v-row>
          <v-row>
            <span class="mdi mdi-wifi mr-2" style="font-size: large"></span>
            <div class="pt-1 text-body-2">WIFI gratuit</div>
          </v-row>
          <v-row>
            <span class="mdi mdi-spa mr-2" style="font-size: large"> </span>
            <div class="pt-1 text-body-2">Centre de bien être et spa</div>
          </v-row>
        </v-col>
        <v-col cols="6" class="">
          <v-row>
            <span class="mdi mdi-coffee mr-2" style="font-size: large"></span>
            <div class="pt-1 text-body-2">Machine à café</div>
          </v-row>
          <v-row>
            <span class="mdi mdi-pool mr-2" style="font-size: large"></span>
            <div class="pt-1 text-body-2">Piscine exterieur</div>
          </v-row>
          <v-row>
            <span
              class="mdi mdi-silverware-fork-knife mr-2"
              style="font-size: large"
            ></span>
            <div class="pt-1 text-body-2">Restaurant</div>
          </v-row>
          <v-row>
            <span class="mdi mdi-weight-lifter mr-2"></span>
            <div class="pt-1 text-body-2">Salle de sport</div>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <v-divider></v-divider>
    <v-btn class="my-6" color="primary" @click="isSlice()"
      >Voir toutes les chambres</v-btn
    >

    <!-- List of romms -->

    <!-- card -->
    <div class="">
      <v-row>
        <v-col
          v-for="(room, index) in displayRoom"
          :key="index"
          cols="12"
          sm="4"
          class="mb-6"
        >
          <v-card class="rounded-lg border-md" elevation="0" max-width="344">
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
            <div class="pa-5">
              <div class="flex" cols="6">
                <v-row>
                  <v-col>
                    <v-card-title class="text-body-1 font-weight-bold">
                      {{ room.name }}
                    </v-card-title>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="">
                    <v-rating
                      class=""
                      hover
                      :length="5"
                      :size="15"
                      v-model="rating"
                      color="pink-lighten-1"
                      active-color="pink-lighten-1"
                    ></v-rating>
                  </v-col>
                </v-row>
                <v-spacer></v-spacer>
              </div>
              <v-card-subtitle class="">
                {{ room.type }}
              </v-card-subtitle>
              <v-card-actions class="py-0">
                <v-btn class="ma-0" color="" style="font-size: small"></v-btn>

                <v-spacer></v-spacer>

                <v-btn
                  :icon="
                    expanded[index] ? 'mdi-chevron-up' : 'mdi-chevron-down'
                  "
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
                        <span class="mdi mdi-coffee mr-2"></span>
                        <div class="pt-1 text-body-2">
                          Petit déjeuner inclus
                        </div>
                      </v-row>
                      <v-row
                        v-if="room.service.includes('Wifi')"
                        class="px-3 py-1"
                      >
                        <span class="mdi mdi-wifi mr-2"></span>
                        <div class="pt-1 text-body-2">Wifi gratuit</div>
                      </v-row>
                      <v-row
                        v-if="room.service.includes('Télévision')"
                        class="px-3 py-1"
                      >
                        <span class="mdi mdi-television mr-2"></span>
                        <div class="pt-1 text-body-2">Télévision</div>
                      </v-row>
                      <v-row
                        v-if="room.service.includes('Bar')"
                        class="px-3 py-1"
                      >
                        <span class="mdi mdi-glass-cocktail mr-2"></span>
                        <div class="pt-1 text-body-2">Mini bar</div>
                      </v-row>
                      <v-row
                        v-if="room.service.includes('Climatisation')"
                        class="px-3 py-1"
                      >
                        <span class="mdi mdi-air-conditioner mr-2"></span>
                        <div class="pt-1 text-body-2">Climatisation</div>
                      </v-row>
                      <v-row
                        v-if="room.service.includes('Jacuzzi')"
                        class="px-3 py-1"
                      >
                        <span class="mdi mdi mdi-spa mr-2"></span>
                        <div class="pt-1 text-body-2">Jacuzzi</div>
                      </v-row>
                      <v-row
                        v-if="room.service.includes('Balcon')"
                        class="px-3 py-1"
                      >
                        <span class="mdi mdi-balcony mr-2"></span>
                        <div class="pt-1 text-body-2">Balcon / Terasse</div>
                      </v-row>

                      <v-row class="px-3 py-1">
                        <span class="mdi mdi-bed mr-2"> </span>
                        <div class="pt-1 text-body-2">
                          {{ room.bed }} lit(s)
                        </div>
                      </v-row>
                      <v-row class="px-3 py-1">
                        <span class="mdi mdi-account-supervisor mr-2"> </span>
                        <div class="pt-1 text-body-2">
                          {{ room.person }} personne(s)
                        </div>
                      </v-row>
                      <v-row
                        v-if="room.service.includes('Cuisine')"
                        class="px-3 py-1"
                      >
                        <span class="mdi mdi-silverware-fork-knife mr-2"></span>
                        <div class="pt-1 text-body-2">Cuisine équipé</div>
                      </v-row>
                    </v-container>
                  </div>
                  <v-divider></v-divider>
                  <div class="d-flex flex-row justify-end my-3 mx-3" cols="6">
                    <div class="text-body-1 font-weight-bold">
                      {{ room.price }} MGA
                    </div>
                  </div>
                  <v-divider></v-divider>

                  <!-- modal -->
                  <div class="my-3 text-center" cols="6">
                    <v-dialog
                      transition="dialog-top-transition"
                      v-model="dialog"
                      persistent
                      max-width="600"
                    >
                      <template v-slot:activator="{ props: activatorProps }">
                        <v-btn
                          color="pink-lighten-1"
                          style="color: white"
                          v-bind="activatorProps"
                          @click="book(room._id)"
                          variant="flat"
                        >
                          Reserver
                        </v-btn>
                      </template>

                      <!-- Le v-card est limité en hauteur et scrollable -->
                      <v-card style="max-height: 90vh; overflow-y: auto">
                        <!-- En-tête -->
                        <v-row class="my-1 mx-5 align-center">
                          <v-card-title
                            class="text-h5 font-weight-bold text-center px-0"
                          >
                            Vérifier la disponibilité
                          </v-card-title>
                          <v-spacer></v-spacer>
                          <v-btn flat color="" class="px-0" @click="close()">
                            <v-icon
                              class="ml-1 mdi mdi-close-circle mb-1"
                            ></v-icon>
                          </v-btn>
                        </v-row>

                        <!-- <v-divider class="my-2 mx-5"></v-divider>+ -->

                        <!-- Date picker -->
                        <v-row class="mx-2">
                          <v-col cols="12" md="6">
                            <div class="text-subtitle-2">Date d'arrivée</div>
                            <v-date-input
                              v-model="dateIn"
                              prepend-icon=""
                              prepend-inner-icon="$calendar"
                              variant="outlined"
                              clearable
                            />
                          </v-col>

                          <v-col cols="12" md="6">
                            <div class="text-subtitle-2">Date de sortie</div>
                            <v-date-input
                              v-model="dateOut"
                              prepend-icon=""
                              prepend-inner-icon="$calendar"
                              variant="outlined"
                              clearable
                            />
                          </v-col>
                        </v-row>

                        <!-- Alerte de disponibilité -->
                        <v-alert
                          v-if="alert"
                          v-model="alert"
                          border="start"
                          close-label="Fermer l'alerte"
                          color="red-accent-2"
                          variant="tonal"
                          closable
                          class="mx-3 py-0 my-0"
                        >
                          Cette chambre n'est plus disponible pour cette
                          période.
                        </v-alert>
                        <div
                          v-if="dateError"
                          class="flex text-center text-subtitle-2 text-red-darken-1"
                        >
                          Veuillez entrer la date d'arrivée et la date de sortie
                        </div>

                        <!-- Bouton de vérification -->
                        <v-row class="my-5 justify-center">
                          <v-btn
                            color="pink-darken-1"
                            style="color: white"
                            @click="checkReservation"
                          >
                            <template v-if="loader">
                              <v-progress-circular
                                size="25"
                                width="2"
                                color="white"
                                indeterminate
                              />
                            </template>
                            <template v-else>
                              Vérifier
                              <v-icon
                                class="ml-1 mdi mdi-check-circle"
                              ></v-icon>
                            </template>
                          </v-btn>
                        </v-row>
                      </v-card>
                    </v-dialog>
                  </div>
                </div>
              </v-expand-transition>
            </div>
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
  padding: 6px 16px;
  font-size: medium;
}
</style>
