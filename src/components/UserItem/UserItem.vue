<script>
import { reactive } from "vue";

export default {
  name: "UserItem",
  props: {
    user: Object,
    removeUser: Function,
    selectUser: Function,
  },
  setup(props) {
    const { email, avatar, id, name } = reactive(props.user);

    const clickOnUser = () => {
      props.selectUser(id);
    };

    return {
      email,
      id,
      name,
      deleteUser: () => props.removeUser(id),
      clickOnUser,
      avatar,
    };
  },
};
</script>

<template>
  <div class="user-item">
    <div class="user-images">
      <img :src="avatar" alt="" class="user-image" />
    </div>
    <div class="user-data">
      <h1
        class="user-name"
        @click="clickOnUser(id)"
        title="Click for full info"
      >
        {{ name }}
      </h1>
      <p class="user-email">{{ email }}</p>
    </div>
    <button class="user-remove" @click="deleteUser(id)">Delete</button>
  </div>
</template>

<style scoped>
.user-item {
  max-height: 140px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px 20px;
  border: 2px solid #646cff;
  border-radius: 20px;
  transition: all 0.7s ease;
  gap: 50px;
  margin-top: 15px;
}

.user-data {
  min-width: 300px;
}

.user-name {
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
  cursor: pointer;
  transition: all 0.7s ease;
  color: #646cff;

  &:hover {
    text-decoration: underline;
  }
}

.user-email {
  margin: 0;
  color: gainsboro;
}

.user-images {
  display: flex;
  align-items: center;
}

.user-image {
  height: 128px;
  width: 128px;
  object-fit: cover;
  position: relative;
  border-radius: 50%;
  transition: all 0.9s ease;
}

.user-remove {
  padding: 10px 20px;
  border: 2px solid transparent;
  border-radius: 5px;
  font-size: 18px;
  min-width: fit-content;
  color: white;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.5s ease;
  border-color: rgba(211, 47, 47, 0.5);

  &:hover {
    border-color: red;
    transition: all 0.5s ease;
  }
}
</style>
