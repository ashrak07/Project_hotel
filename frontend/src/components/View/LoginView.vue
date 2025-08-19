<template>
  <v-responsive class="mx-auto mt-16" max-width="344">
    <v-card class="mx-auto" max-width="344" title="">
      <div class="mb-5">
        <div class="text-center font-weight-black text-h4">Se connecter</div>
        <div class="text-center text-subtitle-2" style="font-size: medium">
          Vous avez déja un compte?
          <span @click="goToRegister" class="login">s'inscrire ici</span>
        </div>
      </div>
      <v-card-text class="px-0" style="font-size: smaller"
        >Entrer votre e-mail</v-card-text
      >

      <v-text-field
        v-model="mail"
        variant="outlined"
        density="compact"
        clearable
      ></v-text-field>
      <v-card-text class="px-0" style="font-size: smaller"
        >Entrer votre mot de passe</v-card-text
      >
      <v-text-field
        v-model="password"
        type="password"
        clearable
        variant="outlined"
        density="compact"
        class=""
      ></v-text-field>

      <div
        v-if="errorMessage"
        class="mb-5 text-red-darken-2 flex text-center text-subtitle-2"
      >
        Entrer un email ou un mot de passe valide
      </div>

      <v-btn
        color="primary"
        style="color: white"
        size="large"
        type="submit"
        variant="elevated"
        @click="login"
        block
      >
        Se connecter
      </v-btn>
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

const goToRegister = () => {
  console.log("clicked");
  router.push({ name: "register" });
};

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
      userStore.addUserEmail(response.data.mail);
      userStore.addUserId(response.data.id);
      userStore.addUserName(response.data.name);
      router.push({ name: "home" });
    }
  } catch (error) {
    errorMessage.value = true;
    console.error(error);
  }
};
</script>

<style scoped lang="scss">
.login {
  &:hover {
    color: rgb(86, 173, 255);
    cursor: pointer;
    transition: 0.2s ease;
  }
}
</style>
