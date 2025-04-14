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
        <v-text-field
          v-model="email"
          color="primary"
          label="Email"
          placeholder="Entrer votre Email"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="password"
          color="primary"
          label="Password"
          placeholder="Entrer votre mot de passe"
          variant="underlined"
        ></v-text-field>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions class="text-center">
        <v-spacer></v-spacer>

        <v-btn
          color="var(--color-3)"
          style="color: white"
          size="large"
          type="submit"
          variant="elevated"
          block
        >
          Se connecter
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-responsive>
</template>

<script></script>
