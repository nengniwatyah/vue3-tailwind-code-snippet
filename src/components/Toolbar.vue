<template>
  <div class="toolbar-container">
    <div class="left-section">
      <!-- Menu -->
      <div class="menu-section">
        <button 
          class="menu-button" 
          @click="$emit('toggle-sidebar')"
        >
          <img src="/src/assets/icons/menu.svg" class="menu-icon" alt="Menu" />
        </button>
        <span class="demo-text">Demo</span>
      </div>
    </div>
    <div class="right-section">
      <!-- Profile -->
      <div class="profile-section">
        <button class="profile-button">
          <img src="/src/assets/icons/user.svg" class="user-icon" alt="User" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Define the event that this component can emit
defineEmits(['toggle-sidebar']);
</script>

<style lang="postcss" scoped>
.toolbar-container {
  @apply flex items-center justify-between px-4 sm:px-6 h-12 w-full;
}

.left-section, .right-section {
  @apply flex items-center space-x-4;
}

.menu-section {
  @apply flex items-center space-x-2;
}

.menu-button {
  @apply p-2 rounded-lg flex justify-end;
}

.menu-icon {
  @apply w-5 h-5 text-gray-500;
}

.demo-text {
  @apply text-sm text-gray-500;
}

.profile-section {
  @apply relative;
}

.profile-button {
  @apply flex justify-end;
}

.user-icon {
  @apply w-5 h-5 text-gray-500 ml-auto;
}
</style>
