<template>
  <h1 class="text-[20px] font-bold mb-2 text-[#131414] leading-[22px] text-left w-full">Card Counter Wallet Demo</h1>
  <el-card 
    class="custom-card" 
    :body-style="{ padding: '24px' }"
    shadow="never"
  >
    <div class="top-section">
      <div class="columns-container">
        <!-- First Column -->
        <div class="column">
          <div class="counter-name">{{ counterName }}</div>
          <div class="label">Credit Limit</div>
          <div class="amount">{{ formatAmount }} THB</div>
        </div>
        
        <!-- Second Column -->
        <div class="column">
          <div class="label">Total Top-Up</div>
          <div class="amount">{{ formatTopUp }} THB</div>
        </div>
      </div>
      
      <!-- Status Badge -->
      <div class="status-badge">
        <StatusTag :status="status.toLowerCase()" />
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { computed } from 'vue'
import { ElCard } from 'element-plus'
import StatusTag from './StatusTag.vue'

const props = defineProps({
  counterName: {
    type: String,
    default: 'Counter Patong'
  },
  status: {
    type: String,
    default: 'active'
  },
  amount: {
    type: Number,
    default: 100000000
  },
  maxAmount: {
    type: Number,
    default: 100000000
  },
  totalTopUp: {
    type: Number,
    default: 100000000
  }
})

// Format amount with comma and 2 decimal places
const formatAmount = computed(() => {
  return props.amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
})

const formatTopUp = computed(() => {
  return props.totalTopUp.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
})
</script>

<style>
/* Import Helvetica Neue font */
@import url('https://fonts.googleapis.com/css2?family=Helvetica+Neue:wght@300;400;500;600;700&display=swap');

.custom-card {
  background-color: #FFFFFF;
  border-radius: 8px;
  border: 0px solid #EBEEF5;
  box-shadow: 0 2px 24px -3px rgba(0, 0, 0, 0.1);
}

.top-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.columns-container {
  display: flex;
  gap: 16px;
  flex: 1;
}

.column {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.column:last-child {
  justify-content: flex-end;
}

.counter-name {
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #131414;
  line-height: 22px;
}

.label {
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #909399;
  line-height: 22px;
}

.amount {
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #131414;
  line-height: 22px;
  margin-top: 4px;
}

.status-badge {
  display: flex;
  align-items: flex-start;
}
</style>