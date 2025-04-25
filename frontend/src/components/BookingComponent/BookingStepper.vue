<template>
  <v-alert
    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!"
    title="Alert title"
    type="success"
  ></v-alert
  >;
  <v-container>
    <!-- Barre de progression du stepper -->
    <v-stepper v-model="step" class="elevation-0">
      <!-- Barre de progression -->
      <v-stepper-header class="elevation-0 my-stepper-header">
        <v-stepper-item
          title="Votre sélection"
          class=""
          :value="1"
          :color="step === 1 ? 'green' : 'grey'"
          complete
        />
        <v-divider />
        <v-stepper-item
          title="Vos informations"
          :value="2"
          :color="step === 2 ? 'green' : 'grey'"
        />
        <v-divider />
        <v-stepper-item
          title="Finaliser la réservation"
          :value="3"
          :color="step === 3 ? 'primary' : 'grey'"
        />
      </v-stepper-header>

      <!-- Contenu des étapes en ligne -->
      <v-stepper-window class="">
        <v-row class="">
          <v-col class="" cols="4">
            <v-card flat class="card" title="">
              <v-card-text
                class="pb-2 font-1 font-weight-bold text-blue-grey-darken-3"
              >
                Hotel Restaurant Hotel-ko
              </v-card-text>
              <v-card-text
                class="py-0 text-blue-grey-darken-3 font-2"
                style="font-size: small"
              >
                18 Rue Paul Dusac, Antananarivo - 101
              </v-card-text>
              <v-card-text
                class="mb-3 py-0 text-blue-grey-darken-3 font-2"
                style="font-size: small"
              >
                Connexion wifi gratuite, Parking, Restaurant
              </v-card-text>
            </v-card>
            <v-card flat class="card my-3 pb-4" title="">
              <v-card-text
                class="pb-2 font-1 font-weight-bold text-blue-grey-darken-3"
              >
                Les détails de votre réservation
              </v-card-text>
              <v-row class="py-3 mx-4">
                <v-col class="pa-0 text-blue-grey-darken-3 font-2">
                  <div class="mb-2">Arrivée</div>
                  <div class="font-weight-bold font-2">
                    {{ formaterDate(reservation.checkInDate) }}
                  </div>
                  <div style="font-size: smaller">A partir de 14h</div>
                </v-col>
                <v-col class="left pl-5 pa-0 text-blue-grey-darken-3 font-2">
                  <div class="mb-2">Départ</div>
                  <div class="font-weight-bold font-2">
                    {{ formaterDate(reservation.checkOutDate) }}
                  </div>
                  <div style="font-size: smaller">Jusqu'à 12h</div>
                </v-col>
              </v-row>
              <v-card-text
                class="pb-2 font-1 font-weight-bold text-blue-grey-darken-3"
              >
                Durée totale du séjour
              </v-card-text>
              <v-card-text class="pa-0 px-4 text-blue-grey-darken-3 font-2"
                >1 Nuit</v-card-text
              >
              <v-divider class="mx-4 my-4"></v-divider>
              <v-card-text
                class="font-1 font-weight-bold text-blue-grey-darken-3 pa-0 pb-2 mx-4"
              >
                Vous avez séléctionné
              </v-card-text>
              <v-card-text class="pa-0 px-4 text-blue-grey-darken-3 font-2"
                >{{ roomSelected.bed }} chambre pour
                {{ roomSelected.person }} adultes</v-card-text
              >
            </v-card>
          </v-col>
          <v-col class="" cols="8">
            <v-card v-if="step === 2" flat class="card pa-0">
              <v-card-text
                class="font-1 font-weight-bold text-blue-grey-darken-3"
              >
                Saisissez vos coordonnées
              </v-card-text>
              <v-row class="">
                <v-col>
                  <v-card-text
                    class="py-2 text-blue-grey-darken-3 font-2"
                    style="font-size: smaller"
                    >Nom</v-card-text
                  >
                  <v-text-field
                    v-model="lastName"
                    clearable
                    variant="outlined"
                    density="compact"
                    class="pb-0 px-4"
                  ></v-text-field>
                  <v-card-text
                    class="py-2 text-blue-grey-darken-3 font-2"
                    style="font-size: smaller"
                    >Adresse E-mail</v-card-text
                  >

                  <v-text-field
                    v-model="mail"
                    clearable
                    variant="outlined"
                    density="compact"
                    class="px-4"
                  ></v-text-field>
                  <v-card-text
                    class="py-2 text-blue-grey-darken-3 font-2"
                    style="font-size: smaller"
                    >Numéro téléphone</v-card-text
                  >
                  <v-text-field
                    v-model="phone"
                    clearable
                    variant="outlined"
                    density="compact"
                    class="px-4"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-card-text
                    class="py-2 text-blue-grey-darken-3 font-2"
                    style="font-size: smaller"
                    >Prénom</v-card-text
                  >

                  <v-text-field
                    v-model="firstName"
                    clearable
                    variant="outlined"
                    density="compact"
                    class="pb-0 px-4"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card>
            <v-card v-if="step === 3" flat class="card pb-4" title="">
              <v-card-text
                class="pb-2 font-1 font-weight-bold text-blue-grey-darken-3"
              >
                Aucune information de paiement requise
              </v-card-text>
              <v-card-text class="pa-0 px-4 text-blue-grey-darken-3 font-2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptate molestiae ea quis, non nostrum ex quam ullam quidem
                saepe magni natus voluptatibus nulla odio adipisci, explicabo
                nobis error reiciendis! Et modi exercitationem vero mollitia
                sed, dolorum minus doloremque rerum neque! Ducimus, hic
                laboriosam. Sed deleniti eveniet omnis quis repudiandae numquam!
              </v-card-text>
            </v-card>
            <v-row class="my-3 pa-4" justify="end" align="center">
              <v-btn v-if="step === 3" class="mx-3" color="primary">
                Vérifier les informations
              </v-btn>
              <v-btn color="primary" @click="handleNext">
                {{
                  step < 3
                    ? "Prochaine étape : dérnière informations"
                    : "Finaliser"
                }}
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-stepper-window>
    </v-stepper>
  </v-container>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRoomStore } from "../../Store/RoomStore";
import { formaterDate } from "../../Utils/utils";
import { formatDate } from "../../Utils/utils";
import AxiosInstance from "../../Service/Axios";

const roomStore = useRoomStore();
const step = ref(2);

const firstName = ref("");
const lastName = ref("");
const mail = ref("");
const phone = ref("");

const reservation = ref({});
const room = ref("");
const roomSelected = ref("");

const handleNext = () => {
  if (step.value < 3) {
    submitInput();
    step.value++;
  } else {
    // Action finale ici
    book();
    console.log("Réservation finalisée !");
  }
};
const submitInput = () => {
  roomStore.addReservationCustomer({
    customerName: firstName.value,
    customerEmail: mail.value,
    customerPhone: phone.value,
  });
  console.log("reservation successful", roomStore.reservationCustomer);
};
const book = async () => {
  try {
    const reservationData = {
      roomId: roomStore.clickedIdRoom,
      customerName: roomStore.reservationCustomer.customerName,
      customerEmail: roomStore.reservationCustomer.customerEmail,
      checkInDate: roomStore.reservation.checkInDate,
      checkOutDate: roomStore.reservation.checkOutDate,
    };
    console.log("reservation data:", reservation);

    await AxiosInstance.post("/hotels/booking", reservationData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("successfull");
  } catch (error) {
    console.error(error);
  }
};

const getRoomSelected = () => {
  reservation.value = roomStore.reservation;
  const id = roomStore.clickedIdRoom;
  roomSelected.value = roomStore.rooms.find((r) => r._id === id);
  console.log("reservation after reload ==>", reservation.value);
  console.log("room after reload ==>", room.value);
  console.log("room selected:", roomSelected.value);
};

onMounted(() => {
  getRoomSelected();
});
</script>

<style scoped>
.card {
  border: solid 1px rgb(235, 235, 235);
}
.left {
  border-left: solid 1px rgb(235, 235, 235);
}
.my-stepper-header {
  color: rgb(46, 46, 167);
}
</style>
