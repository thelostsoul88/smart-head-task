<script>
import { v4 as uuidv4 } from "uuid";
import { reactive } from "vue";
import { data } from "../../utils/data";
import { createUser } from "../../api/users-api";

export default {
  name: "NewUser",
  emits: ["closeForm", "reloadUsers"],
  setup(props, { emit }) {
    const newUserArr = reactive({
      name: "",
      email: "",
      gender: "",
      phone: "",
      country: "",
      city: "",
      avatar: "",
      description: "",
    });

    const handleClose = () => {
      emit("closeForm", null);
    };

    const handleSubmit = (newUserArr, e) => {
      e.preventDefault();
      const id = uuidv4();
      const createdAt = data();
      const user = { ...newUserArr, id, createdAt };
      createUser(user)
        .then(() => {
          emit("reloadUsers");
          close();
        })
        .catch((err) => console.error("Error creating user:", err));
    };

    return {
      newUserArr,
      handleClose,
      handleSubmit,
    };
  },
};
</script>

<template>
  <form class="form-container" @submit="handleSubmit(newUserArr, $event)">
    <h1 class="form-title">Add new user</h1>

    <section class="form-section">
      <label class="form-label" for="name"> Name </label>
      <input
        type="text"
        class="form-input"
        required
        id="name"
        name="name"
        placeholder="Add first and last name"
        v-model.trim="newUserArr.name"
      />
    </section>

    <section class="form-section">
      <label class="form-label" for="email"> E-mail </label>
      <input
        type="email"
        class="form-input"
        required
        id="email"
        name="email"
        placeholder="Add user`s email"
        v-model.trim="newUserArr.email"
      />
    </section>

    <section class="form-section">
      <label class="form-label" for="phone"> Phone </label>
      <input
        type="tel"
        class="form-input"
        id="phone"
        name="phone"
        placeholder="Add user`s phone"
        v-model.trim="newUserArr.phone"
      />
    </section>

    <section class="form-section">
      <label class="form-label" for="country"> Country </label>
      <input
        type="text"
        class="form-input"
        id="country"
        name="country"
        placeholder="Add user`s country"
        v-model.trim="newUserArr.country"
      />
    </section>

    <section class="form-section">
      <label class="form-label" for="city"> City </label>
      <input
        type="text"
        class="form-input"
        id="city"
        name="city"
        placeholder="Add user`s city"
        v-model.trim="newUserArr.city"
      />
    </section>

    <section class="form-section">
      <label class="form-label" for="avatar"> Avatar </label>
      <input
        type="text"
        class="form-input"
        id="avatar"
        name="avatar"
        placeholder="Add URL to add avatar"
        v-model.trim="newUserArr.avatar"
      />
    </section>

    <section class="form-section">
      <label class="form-label" for="description"> Description </label>
      <textarea
        class="form-input"
        id="description"
        name="description"
        placeholder="Add description about user"
        v-model.trim="newUserArr.description"
      />
    </section>

    <section class="form-section">
      <div class="form-buttons">
        <button
          class="form-button form-button--cancel"
          type="button"
          @click="handleClose"
        >
          Cancel
        </button>
        <button class="form-button form-button--save" type="submit">
          Save
        </button>
      </div>
    </section>
  </form>
</template>

<style scoped>
.form-container {
  width: 600px;
  background-color: transparent;
  border: 3px solid #646cff;
  border-radius: 10px;
  padding: 20px;
}

.form-title {
  font-size: 32px;
  font-weight: bold;
  margin: 0 0 15px;
  padding-bottom: 20px;
  color: whitesmoke;
}

.form-section {
  display: flex;
  justify-content: center;
  gap: 8px;
  align-items: baseline;
  text-align: left;
  margin: 0 10px 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.form-label {
  color: whitesmoke;
}

.form-input {
  flex-grow: 1;
  padding: 0 10px;
  border-radius: 5px;
  outline: none;
  border: 1px solid transparent;
  color: white;
  background-color: #646cff;
  height: 30px;

  &::placeholder {
    color: #283149;
  }
}

.form-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 4px;
}

.form-button {
  width: fit-content;
  min-width: 100px;
  border: 2px solid transparent;
  border-radius: 5px;
  padding: 5px 10px;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

.form-button--cancel {
  background-color: transparent;
  border-color: #646cff;

  &:hover {
    background-color: crimson;
    transition: all 0.5s ease;
    opacity: 85%;
  }
}

.form-button--save {
  background-color: transparent;
  border-color: #646cff;

  &:hover {
    background-color: #369a36;
    transition: all 0.5s ease;
    opacity: 85%;
  }
}

textarea.form-input {
  padding: 10px;
  height: 90px;
  resize: none;
  font-family: Arial;
}
</style>
