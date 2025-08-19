<template>
  <div class="pa-3">
    <h2 class="text-h5 mb-4">Liste des utilisateurs</h2>

    <v-table class="rounded-lg border">
      <thead class="bg-gray-100">
        <tr>
          <th class="">Nom</th>
          <th class="">E-mail</th>
          <th class="">Role</th>
          <th class="">Action</th>
        </tr>
      </thead>

      <tbody class="font-2">
        <tr
          v-for="(item, index) in userStore.user"
          :key="index"
          class="hover-row"
          style="font-size: smaller"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.role }}</td>
          <td>
            <v-btn
              variant="outlined"
              color="pink-darken-1"
              text="Supprimer"
              class="ml-2"
              style="align-self: start"
              @click="deleteUser(item._id)"
              ><span class="mdi mdi-delete" style="font-size: x-large"> </span
            ></v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import AxiosInstance from "../../Service/Axios";
import { useUserStore } from "../../Store/UserStore";

const userStore = useUserStore();

const getUser = async () => {
  const token = userStore.accessToken;
  try {
    const user = await AxiosInstance.get("/hotels/user/", {
      headers: { Authorization: `Bearer ${token}` },
    });
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
  background-color: #ebf3f5c2;
  transition: 0.2s ease;
}
</style>
