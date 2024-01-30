<script>
import { computed, onMounted, ref } from "vue";
import { deleteUser, getUsers } from "../../api/users-api";
import UsersList from "../UsersList/UsersList.vue";
import Search from "../Search/Search.vue";
import Modal from "../Modal/Modal.vue";
import UserDetails from "../UserDetails/UserDetails.vue";
import NewUser from "../NewUser/NewUser.vue";

export default {
  name: "Users",
  components: {
    NewUser,
    UserDetails,
    Modal,
    Search,
    UsersList,
  },
  setup() {
    const fetchedUsers = ref([]);
    const searchText = ref("");
    const selectedUser = ref(null);
    const newFormIsOpened = ref(false);

    const getUsersFromServer = async () => {
      const { data } = await getUsers();
      fetchedUsers.value = data;
    };

    const filteredUsers = computed(() => {
      return fetchedUsers.value.filter((user) => {
        const userData = [user.name.toLowerCase(), user.email.toLowerCase()];
        return userData.some((data) =>
          data.includes(searchText.value.toLowerCase())
        );
      });
    });

    onMounted(() => {
      try {
        getUsersFromServer();
      } catch (err) {
        console.log("Error download users:", err);
      }
    });

    const removeUser = async (userId) => {
      try {
        await deleteUser(userId);
        await getUsersFromServer();
      } catch (err) {
        console.log("Error download users:", err);
      }
    };

    const clearSearch = () => {
      searchText.value = "";
    };

    const selectUser = (userId) => {
      const pickedUser = fetchedUsers.value.find((user) => {
        return user.id === userId;
      });
      selectedUser.value = pickedUser;
    };

    const handleClose = () => {
      selectedUser.value = null;
      newFormIsOpened.value = false;
    };

    const openNewFrom = () => {
      newFormIsOpened.value = true;
    };

    return {
      fetchedUsers,
      removeUser,
      searchText,
      clearSearch,
      filteredUsers,
      selectedUser,
      selectUser,
      handleClose,
      openNewFrom,
      newFormIsOpened,
      getUsersFromServer,
    };
  },
};
</script>

<template>
  <Modal v-if="selectedUser" @closeModal="handleClose">
    <UserDetails :user="selectedUser" @closeModal="handleClose" @click.stop />
  </Modal>
  <Modal v-else-if="newFormIsOpened" @closeModal="handleClose">
    <NewUser
      @closeForm="handleClose"
      @reloadUsers="getUsersFromServer"
      @click.stop
    />
  </Modal>
  <div>
    <div class="app">
      <Search v-model="searchText" @clearSearch="clearSearch" />
      <button class="add-user-button" @click="openNewFrom">ADD USER</button>
    </div>
    <UsersList
      :users="filteredUsers"
      :removeUser="removeUser"
      :selectUser="selectUser"
    />
  </div>
</template>

<style>
.app {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 10px;
  margin-bottom: 20px;
}

.add-user-button {
  padding: 10px 20px;
  border: 2px solid transparent;
  border-radius: 5px;
  font-size: 18px;
  min-width: fit-content;
  color: white;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.5s ease;
  border-color: #646cff;

  &:hover {
    background-color: white;
    transition: all 0.5s ease;
    opacity: 85%;
    color: black;
  }
}

#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 505px;
}
</style>
