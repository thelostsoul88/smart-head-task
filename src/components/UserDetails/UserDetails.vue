<script>
import { reactive } from "vue";
export default {
  name: "UserDetails",
  emits: ["closeModal"],
  props: {
    user: Object,
  },
  setup(props, { emit }) {
    const handleCloseModal = () => {
      emit("closeModal", null);
    };

    const { id, avatar, city, country, description, email, name, phone } =
      reactive(props.user);

    return {
      id,
      city,
      country,
      description,
      email,
      name,
      phone,
      avatar,
      handleCloseModal,
    };
  },
};
</script>

<template>
  <section class="details-container">
    <div class="details-title-container">
      <h1 class="details-title">User details</h1>
      <button class="details-close-btn" type="button" @click="handleCloseModal">
        X
      </button>
    </div>
    <div class="user-details">
      <img :src="avatar" alt="User photo" class="details-avatar" />
      <div class="details-info">
        <div class="details-name">{{ name }}</div>
        <div class="details-description" v-show="description">
          <span class="details-about">About:</span> {{ description }}
        </div>
      </div>
    </div>
    <div class="details-contacts">
      <div class="details-address" v-show="country || city">
        Location: {{ country }}, {{ city }}
      </div>
      <div class="details-phone" v-show="phone">
        Tel:
        {{ phone }}
      </div>
      <div class="details-email" v-show="email">
        Email:
        {{ email }}
      </div>
    </div>
  </section>
</template>

<style scoped>
.details-container {
  width: 600px;
  background-color: transparent;
  border: 3px solid #646cff;
  border-radius: 10px;
  padding: 20px;
  position: relative;
}

.details-title-container {
  display: flex;
  justify-content: center;
}

.details-close-btn {
  position: absolute;
  right: 20px;
  width: 30px;
  height: 30px;
  color: white;
  background-color: transparent;
  border-color: #646cff;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    border-color: crimson;
    transition: all 0.5s ease;
  }
}

.details-title {
  color: whitesmoke;
  font-size: 32px;
  font-weight: bold;
  margin: 0 0 15px;
  padding-bottom: 20px;
}

.user-details {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding-bottom: 15px;
  margin-bottom: 15px;
}

.details-avatar {
  border: 2px solid beige;
  border-radius: 25%;
  height: 150px;
  width: 150px;
  object-fit: cover;
}

.details-info {
  width: 60%;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 18px;
  color: whitesmoke;
}

.details-name {
  font-size: 22px;
  font-weight: bold;
  text-transform: uppercase;
  color: whitesmoke;
}

.details-description {
  font-size: 16px;
  color: gainsboro;
}

.details-about {
  font-size: 20px;
  font-weight: bold;
}

.details-contacts {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 12px;
  color: gainsboro;
}
</style>
