<template>
  <v-responsive class="mx-auto" max-width="344">
    <v-card class="mx-auto mt-6" max-width="344" title="">
      <div class="flex text-center font-weight-black text-h4">S'inscrire</div>
      <div class="">
        <v-card-text
          class="px-0 text-blue-grey-darken-3"
          style="font-size: smaller"
          >Nom</v-card-text
        >
        <v-text-field
          v-model="name"
          clearable
          variant="outlined"
          density="compact"
          class=""
        ></v-text-field>
        <v-card-text
          class="px-0 text-blue-grey-darken-3"
          style="font-size: smaller"
          >Email</v-card-text
        >
        <v-text-field
          v-model="mail"
          clearable
          variant="outlined"
          density="compact"
          class=""
        ></v-text-field>
        <v-card-text
          class="px-0 text-blue-grey-darken-3"
          style="font-size: smaller"
          >Mot de passe</v-card-text
        >
        <v-text-field
          v-model="password"
          type="password"
          clearable
          variant="outlined"
          density="compact"
          class=""
        ></v-text-field>
      </div>

      <v-btn
        color="primary"
        style="color: white"
        size="large"
        type="submit"
        variant="elevated"
        @click="registerUser"
        block
      >
        S'inscrire
      </v-btn>
    </v-card>
    <v-snackbar v-model="successSnackbar" color="green" timeout="3000">
      Authentification effectuée avec succès !
    </v-snackbar>
    <v-snackbar
      v-model="existingRegister"
      location="top"
      color="red"
      timeout="3000"
    >
      Un compte avec cet email existe déjà.
    </v-snackbar>
  </v-responsive>
</template>

<script setup>
import { ref } from "vue";
import AxiosInstance from "../../Service/Axios";
import { useUserStore } from "../../Store/UserStore";
import { useRouter } from "vue-router";

const name = ref("");
const mail = ref("");
const password = ref("");
const router = useRouter();
const successSnackbar = ref(false);

const existingRegister = ref(false);
const userStore = useUserStore();

const registerUser = async () => {
  const registerData = {
    name: name.value,
    email: mail.value,
    password: password.value,
  };
  try {
    const response = await AxiosInstance.post(
      "/hotels/user/register",
      registerData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response) {
      successSnackbar.value = true;
      router.push({ name: "login" });
    }
  } catch (error) {
    existingRegister.value = true;
    console.error(error);
  }
};
</script>

<style scoped lang=""></style>
