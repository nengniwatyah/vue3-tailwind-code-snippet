<template>
  <div 
    class="status-tag"
    :class="{
      'active': status === 'active',
      'inactive': status === 'inactive',
      'pending': status === 'pending',
      'error': status === 'error'
    }"
  >
    <span class="status-text">{{ statusText }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true,
    validator: (value) => {
      return ['active', 'inactive', 'pending', 'error'].includes(value)
    }
  }
})

const statusText = computed(() => {
  return props.status.charAt(0).toUpperCase() + props.status.slice(1)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Helvetica+Neue:wght@400;500;700&display=swap');

* {
  font-family: 'Helvetica Neue', Arial, sans-serif;
}
/* Base styles */
.status-tag {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  padding-inline: 8px;
  padding-block: 4px;
}

/* Active status styles */
.status-tag.active {
  background-color: #F0F9EB;
  color: #67c23a;
  border: 1px solid #E1F3D8;
  border-radius: 4px;
}

/* Inactive status styles */
.status-tag.inactive {
  background-color: #F4F4F5;
  color: #909399;
  border: 1px solid #DEDFE0;
  border-radius: 4px;
}

.status-tag.pending {
  background-color: #F8E3C5;
  color: #E6A23C;
  border: 1px solid #E6A23C;
  border-radius: 4px;
}

.status-tag.error {
  background-color: #FCD3D3;
  color: #F56C6C;
  border: 1px solid #FAB5B5;
  border-radius: 4px;
}

/* Text styles */
.status-text {
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}
</style>
