<script>
import { onMounted, onUnmounted } from "vue";

export default {
  name: "Modal",
  emits: ["closeModal"],
  setup(props, { emit }) {
    const handleClose = (e) => {
      e.stopPropagation();
      emit("closeModal", null);
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        emit("closeModal", null);
      }
    };

    onMounted(() => {
      document.addEventListener("keydown", handleKeyDown);
    });

    onUnmounted(() => {
      document.removeEventListener("keydown", handleKeyDown);
    });

    return {
      handleClose,
    };
  },
};
</script>

<template>
  <div class="modal" @click="handleClose($e)" @keyup.esc="handleClose($e)">
    <slot></slot>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
</style>
