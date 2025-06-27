<template>
  <button
    class="scan-button"
    :style="{ backgroundColor: backgroundColor }"
    :disabled="disabled"
    @click="handleClick"
  >
    <div class="button-content">
      <span class="icon-container">
        <svg
          class="icon-scan"
          fill="none"
          viewBox="0 0 21 21"
        >
          <path
            d="M20.3086 17.8574C20.3085 18.5074 20.0494 19.1303 19.5898 19.5898C19.1303 20.0494 18.5074 20.3085 17.8574 20.3086L14.0059 20.3076V18.207H17.8574C17.9501 18.207 18.039 18.17 18.1045 18.1045C18.17 18.039 18.207 17.9501 18.207 17.8574V14.0059H20.3086V17.8574ZM2.10059 14.0059V17.8574C2.10068 17.9501 2.13773 18.0389 2.20312 18.1045C2.26881 18.1702 2.35828 18.2079 2.45117 18.208H6.30273V20.3076H2.45117C1.80125 20.3076 1.17833 20.0494 0.71875 19.5898C0.259192 19.1303 9.40385e-05 18.5073 0 17.8574V14.0059H2.10059ZM20.3076 11.3721H0V9.13867H20.3076V11.3721ZM6.30371 2.10156H2.45117C2.35853 2.10162 2.26961 2.13859 2.2041 2.2041C2.13859 2.26961 2.10162 2.35853 2.10156 2.45117V6.30371H0V2.45117C5.91748e-05 1.80122 0.259161 1.17834 0.71875 0.71875C1.17834 0.259161 1.80122 5.91748e-05 2.45117 0H6.30371V2.10156ZM17.8574 0C18.5074 5.8926e-05 19.1303 0.259162 19.5898 0.71875C20.0494 1.17834 20.3085 1.80122 20.3086 2.45117V6.30371H18.207V2.45117C18.207 2.35853 18.17 2.26961 18.1045 2.2041C18.039 2.13859 17.9501 2.10162 17.8574 2.10156H14.0059V0H17.8574Z"
            :fill="textColor"
          />
        </svg>
      </span>
      <span class="text" :style="{ color: textColor }">
        {{ text }}
      </span>
    </div>
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: 'Scan QR Code',
  },
  backgroundColor: {
    type: String,
    default: '#058bcc',
  },
  textColor: {
    type: String,
    default: '#FCF7EE',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click']);

const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event);
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Helvetica+Neue:wght@400;500;700&display=swap');

.scan-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 40px;
  border: none;
  border-radius: 20px;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: filter 0.3s ease;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  padding: 0;
}

.scan-button:hover:not(:disabled) {
  filter: brightness(1.1);
}

.scan-button:disabled {
  background-color: #cccccc !important;
  cursor: not-allowed;
  box-shadow: none;
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.icon-scan {
  width: 100%;
  height: 100%;
}

.text {
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  white-space: nowrap;
}
</style>
