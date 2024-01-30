<script>
export default {
  name: "Search",
  props: {
    modelValue: String,
  },
};
</script>

<template>
  <div class="search-section">
    <input
      type="text"
      class="search-input"
      placeholder="Enter smth to find user"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value.trimLeft())"
    />
  </div>
</template>

<style scoped>
.search-section {
  width: 100%;
  min-width: 220px;
  max-width: 40vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #646cff;
  padding: 8px;
  border-radius: 5px;
}

.search-input {
  flex: 1 0 fit-content;
  outline: none;
  border: none;
  font-size: 14px;
  color: white;
  background-color: #646cff;
  padding-left: 8px;
}
.search-input::placeholder {
  color: #283149;
}
</style>
