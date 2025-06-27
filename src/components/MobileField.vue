<template>
  <div class="relative w-full" data-name="MobileContainer">
    <div class="box-border flex flex-col gap-2 items-start justify-start p-0 relative w-full">
      <label class="mobile-label">
        Mobile
      </label>
      <el-input
        v-model="inputValue"
        :placeholder="placeholderText"
        class="mobile-field"
        :class="{ 'is-empty': !inputValue }"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholderText: {
    type: String,
    default: 'Please Enter',
  },
});

const emit = defineEmits(['update:modelValue']);
const inputValue = ref(props.modelValue);

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue);
});

watch(() => props.modelValue, (newValue) => {
  if (newValue !== inputValue.value) {
    inputValue.value = newValue;
  }
});
</script>

<style scoped>
:deep(.el-input__wrapper) {
  box-shadow: none !important;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  height: 40px;
  padding: 0 15px;
  width: 100%;
}

:deep(.el-input__wrapper.is-focus) {
  border: 1px solid #e6a23c !important;
  box-shadow: 0 0 0 2px #f8e3c5 !important;
  outline: none;
}

.mobile-label {
  display: inline-flex;
  font-family: 'Helvetica Neue', sans-serif;
  font-style: normal;
  color: #000000;
  font-size: 10.8px;
  line-height: normal;
  padding: 2px 0; /* เพิ่ม padding เล็กน้อยเพื่อให้ข้อความไม่ชิดขอบ */
}

:deep(.el-input__inner) {
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 14px;
  color: #606266;
  height: 100%;
  line-height: 1;
  display: flex;
  align-items: center;
}

:deep(.el-input__inner::placeholder) {
  color: #c0c4cc;
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 14px;
  line-height: 1;
}

:deep(.el-input) {
  width: 100%;
}
</style>