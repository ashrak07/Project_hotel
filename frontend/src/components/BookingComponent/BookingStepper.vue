<template>
  <v-container>
    <!-- Barre de progression du stepper -->
    <v-stepper v-model="step" class="elevation-0">
      <!-- Barre de progression -->
      <v-stepper-header class="elevation-0">
        <v-stepper-item title="Votre sélection" :value="1" />
        <v-divider />
        <v-stepper-item title="Vos informations" :value="2" />
        <v-divider />
        <v-stepper-item title="Finaliser la réservation" :value="3" />
      </v-stepper-header>

      <!-- Contenu des étapes en ligne -->
      <v-stepper-window>
        <v-row>
          <v-col cols="4" v-if="step >= 1">
            <v-card flat title="Votre réservation">
              <v-card-text> Contenu étape 1... </v-card-text>
            </v-card>
            <v-card flat title="Récapitulatif du montant">
              <v-card-text> Contenu étape 1... </v-card-text>
            </v-card>
            <v-card flat title="Votre sélection">
              <v-card-text> Contenu étape 1... </v-card-text>
            </v-card>
            <v-card flat title="Votre sélection">
              <v-card-text> Contenu étape 1... </v-card-text>
            </v-card>
            <v-card flat title="Votre sélection">
              <v-card-text> Contenu étape 1... </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="4" v-if="step >= 2">
            <v-card flat title="Saisissez vos coordonnées">
              <v-card-text> </v-card-text>
            </v-card>
            <v-card flat title="Vos informations">
              <v-card-text> Contenu étape 2... </v-card-text>
            </v-card>
            <v-card flat title="Vos informations">
              <v-card-text> Contenu étape 2... </v-card-text>
            </v-card>
            <v-card flat title="Vos informations">
              <v-card-text> Contenu étape 2... </v-card-text>
            </v-card>
            <v-card flat title="Vos informations">
              <v-card-text> Contenu étape 2... </v-card-text>
            </v-card>
            <v-card flat title="Vos informations">
              <v-card-text> Contenu étape 2... </v-card-text>
            </v-card>
            <v-card flat title="Vos informations">
              <v-card-text> Contenu étape 2... </v-card-text>
            </v-card>
            <v-card flat title="Vos informations">
              <v-card-text> Contenu étape 2... </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="4" v-if="step >= 3">
            <v-card flat title="Finaliser la réservation">
              <v-card-text> Contenu étape 3... </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="pa-4" justify="center" align="center">
          <v-btn
            :disabled="step === 1"
            @click="step--"
            color="secondary"
            class="me-4"
          >
            Précédent
          </v-btn>

          <v-btn color="primary" @click="handleNext">
            {{ step < 3 ? "Suivant" : "Finaliser" }}
          </v-btn>
        </v-row>
      </v-stepper-window>
    </v-stepper>
  </v-container>
</template>
<script setup>
import { ref } from "vue";
const step = ref(1);

const handleNext = () => {
  if (step.value < 3) {
    step.value++;
  } else {
    // Action finale ici
    console.log("Réservation finalisée !");
  }
};
</script>
