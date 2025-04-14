<template>
  <v-responsive class="mx-auto" max-width="344">
    <v-card class="mx-auto" max-width="344" title="">
      <div
        class="mt-4 text-center text-blue-grey-darken-2 font-weight-black"
        style="font-size: x-large"
      >
        S'inscrire
      </div>
      <div class="text-center text-blue-grey-darken-2" style="font-size: small">
        Vous avez déja un compte? Se connecter
      </div>
      <div class="my-6">
        <v-text-field
          v-model="first"
          color="primary"
          label="First name"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="last"
          color="primary"
          label="Last name"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="email"
          color="primary"
          label="Email"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="password"
          color="primary"
          label="Password"
          placeholder="Enter your password"
          variant="underlined"
        ></v-text-field>
      </div>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="var(--color-3)"
          style="color: white"
          size="large"
          type="submit"
          variant="elevated"
          block
        >
          S'inscrire
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-responsive>
</template>

<style scoped lang=""></style>
