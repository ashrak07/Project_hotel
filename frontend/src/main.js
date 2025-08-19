import { VDateInput } from "vuetify/labs/VDateInput";
import { createVuetify } from "vuetify/lib/framework.mjs";
import { createPinia } from "pinia";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import ElementPlus from "element-plus";
import "@mdi/font/css/materialdesignicons.css";

import router from "./router";

import { createApp } from "vue";
import "vuetify/styles";
import "./style.css";
import App from "./App.vue";

const pinia = createPinia();

const vuetify = createVuetify({
  components: {
    ...components,
    VDateInput, // Ajout ici dans la liste des composants
  },
  directives,
  defaults: {
    global: {
      style: {
        fontFamily: "Poppins, sans-serif",
      },
    },
  },
});

createApp(App)
  .use(vuetify)
  .use(ElementPlus)
  .use(router)
  .use(pinia)
  .mount("#app");
