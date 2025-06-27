<template>
  <div class="relative w-full" ref="dropdownRef">
    <div class="box-border flex flex-col gap-2 items-start justify-start p-0 relative w-full">
      <label class="mobile-label">Dropdown</label>
      <div 
        @click="toggle"
        class="el-input mobile-field"
        :class="{ 'is-empty': !selectedLabel }"
      >
        <div class="el-input__wrapper" :class="{ 'is-focus': isOpen }">
          <div class="el-input__inner flex items-center justify-between">
            <span class="text-sm text-[#606266]">{{ selectedLabel }}</span>
            <img
              :src="arrowIcon"
              alt="arrow"
              class="w-3 h-1.5 transition-transform duration-200"
              :class="{ 'rotate-180': isOpen }"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Dropdown Menu -->
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        class="absolute z-10 w-full mt-1 bg-white rounded shadow-[0px_4px_8px_-2px_rgba(0,0,0,0.06),0px_8px_16px_0px_rgba(0,0,0,0.04),0px_8px_32px_8px_rgba(0,0,0,0.02)]"
      >
        <!-- Arrow pointing up -->
        <div class="absolute right-4 -top-[6px] w-3 h-1.5">
            <div class="w-3 h-1.5 rotate-180">
                 <img :src="arrowIcon" alt="arrow up" class="w-full h-full" />
            </div>
        </div>
        <ul class="py-2">
          <li
            v-for="option in props.options"
            :key="option.value"
            @click="selectOption(option)"
            class="flex items-center justify-between px-5 h-8 text-sm cursor-pointer hover:bg-gray-100"
            :class="{ 'text-[#409eff]': props.modelValue === option.value, 'text-[#606266]': props.modelValue !== option.value }"
          >
            <span>{{ option.label }}</span>
            <img
              v-if="props.modelValue === option.value"
              :src="checkIcon"
              alt="check"
              class="w-3 h-3"
            />
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

// --- Assets from Figma export ---
const checkIcon = 'http://localhost:3845/assets/3f15c8f23b666e9b16ab48529ed8f3108e49eee1.svg';
const arrowIcon = 'http://localhost:3845/assets/615615d4c2b766b31300b685142ab0939c49a035.svg';

// --- Component Props and Emits ---
const props = defineProps({
  /**
   * The currently selected value of the dropdown.
   * Used with v-model.
   */
  modelValue: {
    type: [String, Number],
    required: true,
  },
  /**
   * An array of objects for the dropdown options.
   * Each object must have 'label' and 'value' keys.
   * @example [{ label: 'All', value: 'all' }]
   */
  options: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue']);

// --- Component State ---
const isOpen = ref(false);
const dropdownRef = ref(null);

// --- Computed Properties ---
const selectedLabel = computed(() => {
  const selected = props.options.find(opt => opt.value === props.modelValue);
  return selected ? selected.label : 'Select an option';
});

// --- Methods ---
const toggle = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  emit('update:modelValue', option.value);
  isOpen.value = false;
};

// --- Lifecycle Hooks ---
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
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
  padding: 2px 0;
}

:deep(.el-input__inner) {
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 14px;
  color: #606266;
  height: 100%;
  line-height: 1;
  display: flex;
  align-items: center;
  padding: 0;
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
