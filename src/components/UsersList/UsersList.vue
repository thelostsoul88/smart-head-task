<script>
import UserItem from "../UserItem/UserItem.vue";

export default {
  name: "UsersList",
  components: { UserItem },
  props: {
    users: Object,
    removeUser: Function,
    selectUser: Function,
  },
};
</script>

<template>
  <div class="users-list">
    <h1 class="user-list-notice" v-if="!users.length">There is no users</h1>
    <TransitionGroup name="list" tag="section">
      <UserItem
        v-for="user in users"
        :key="user.id"
        :user="user"
        :removeUser="removeUser"
        :selectUser="selectUser"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.users-list {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 10px auto;
  max-width: 800px;
}

.user-list-notice {
  color: #646cff;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.7s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
