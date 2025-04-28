<template>
  <v-responsive class="mx-auto mt-16" max-width="344">
    <v-card class="mx-auto" max-width="344" title="">
      <div
        class="text-center text-blue-grey-darken-2 font-weight-black"
        style="font-size: x-large"
      >
        Se connecter
      </div>
      <v-container>
        <v-card-text
          class="px-0 text-blue-grey-darken-3 font-2"
          style="font-size: smaller"
          >Entrer votre e-mail</v-card-text
        >

        <v-text-field
          v-model="mail"
          clearable
          variant="outlined"
          density="compact"
          class=""
        ></v-text-field>
        <v-card-text
          class="px-0 text-blue-grey-darken-3 font-2"
          style="font-size: smaller"
          >Entrer votre mot de passe</v-card-text
        >
        <v-text-field
          v-model="password"
          clearable
          variant="outlined"
          density="compact"
          class=""
        ></v-text-field>
      </v-container>

      <v-divider></v-divider>

      <template v-if="errorMessage">
        <v-alert
          text="Entrer un email ou un mot de passe valide"
          title=""
          type="error"
        ></v-alert>
      </template>

      <v-card-actions class="text-center">
        <v-spacer></v-spacer>

        <v-btn
          color="var(--color-3)"
          style="color: white"
          size="large"
          type="submit"
          variant="elevated"
          @click="login"
          block
        >
          Se connecter
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-responsive>
</template>

<script setup>
import { ref } from "vue";
import AxiosInstance from "../../Service/Axios";
import { useUserStore } from "../../Store/UserStore";
import { useRouter } from "vue-router";

const mail = ref("");
const password = ref("");

const errorMessage = ref(false);
const router = useRouter();
const userStore = useUserStore();

const login = async () => {
  const user = {
    email: mail.value,
    password: password.value,
  };
  try {
    const response = await AxiosInstance.post("/hotels/user/login", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response) {
      console.log("response ==>", response.data);
      userStore.addToken(response.data.accessToken);
      userStore.addUserName(response.data.name);
      userStore.addUserEmail(response.data.mail);
      router.push({ name: "home" });
    }
  } catch (error) {
    errorMessage.value = true;
    console.error(error);
  }
};
</script>
