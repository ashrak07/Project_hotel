<template>
  <v-container>
    <h2 class="text-h5 mb-4">Liste des utilisateurs</h2>

    <v-table class="elevation-1 rounded">
      <thead class="bg-blue-grey-lighten-5">
        <tr>
          <th class="text-left font-weight-bold">Nom</th>
          <th class="text-left font-weight-bold">E-mail</th>
          <th class="text-left font-weight-bold">Role</th>
          <th class="text-left font-weight-bold">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(item, index) in userStore.user"
          :key="index"
          class="hover-row"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.role }}</td>
          <td>
            <v-btn
              color="pink-lighten-1"
              text="Supprimer"
              class="ml-2"
              style="align-self: start"
              @click="deleteUser(item._id)"
              ><span class="mdi mdi-delete-circle" style="font-size: x-large">
              </span
            ></v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import AxiosInstance from "../../Service/Axios";
import { useUserStore } from "../../Store/UserStore";

const userStore = useUserStore();

const getUser = async () => {
  try {
    const user = await AxiosInstance.get("/hotels/user/");
    if (user) {
      console.log("reo ny user anlah ==>", user.data);
      userStore.addUser(user.data.data);
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (id) => {
  try {
    console.log("id user", id);
    const response = await AxiosInstance.delete(`/hotels/user/${id}`);
    if (response) {
      console.log("reo nihena ray ny user ==>", response.data);
      userStore.addUser(response.data.data);
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getUser();
});
</script>

<style scoped>
.hover-row:hover {
  background-color: #f0f4f8;
  transition: 0.2s ease;
}

th {
  background-color: #e0e0e0;
}
</style>
