<template>
  <h1 class="text-[20px] font-bold mb-2 text-[#131414] leading-[22px] text-left w-full">Total Agent Wallet</h1>
  <el-card 
    class="custom-card"
    :body-style="{ padding: '24px' }"
    shadow="never">
    
    <div class="card-body w-full">
      <!-- Top Section -->
      <div class="flex flex-row gap-4">
        <!-- Amount Column -->
        <div class="flex-1">
          <div class="label">Total Balance</div>
          <div class="amount">{{ totalWallet }} THB</div>
        </div>
        <!-- Status Column -->
        <div class="flex items-start">
          <StatusTag :status="status.toLowerCase()" />
        </div>
      </div>

      <!-- Latest Update -->
      <div class="flex items-center">
          <span class="update-label">Latest Update</span>
          <span class="update-timestamp">{{ formatTimestamp() }}</span>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { computed } from 'vue'
import { ElCard } from 'element-plus'
import StatusTag from './StatusTag.vue'

const props = defineProps({
  totalWallet: {
    type: String,
    default: '100,000.00'
  },
  usedAmount: {
    type: String,
    default: '0.00'
  },
  agentId: {
    type: String,
    default: 'A-001'
  },

  status: {
    type: String,
    default: 'Active'
  },
  creditLimit: {
    type: String,
    default: '100,000.00'
  }
})

// Format timestamp for display
const formatTimestamp = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}`
}

const percentageText = computed(() => {
  return `${percentage.value}%`
})

// Convert string amount to number
const currentAmount = computed(() => {
  return parseFloat(props.totalWallet.replace(/[^\d.-]+/g, ''))
})

// Convert used amount to number
const usedAmountNum = computed(() => {
  return parseFloat(props.usedAmount.replace(/[^\d.-]+/g, ''))
})

// Calculate remaining amount
const remainingAmount = computed(() => {
  return currentAmount.value - usedAmountNum.value
})

// Calculate percentage
const percentage = computed(() => {
  if (currentAmount.value === 0) return 100
  return Math.round((remainingAmount.value / currentAmount.value) * 100)
})

const progressColor = computed(() => {
  if (percentage.value > 50) return '#67C23A'
  if (percentage.value > 10) return '#E6A23C'
  return '#F56C6C'
})

</script>

<style scoped>
/* Import Helvetica Neue font */
@import url('https://fonts.googleapis.com/css2?family=Helvetica+Neue:wght@300;400;500;600;700&display=swap');

/* Global styles */
.helvetica-neue {
  font-family: 'Helvetica Neue', sans-serif;
}

/* Card styles */
.custom-card {
  border-radius: 8px;
  border: 0px solid #EBEEF5;
  box-shadow: 0 2px 24px -3px rgba(0, 0, 0, 0.1);
  background-color: #FFFFFF;
}

/* Override Element Plus card styles */
:deep(.el-card__body) {
  padding: 0 !important;
}

/* Card body padding */
.card-body {
  padding: 16px 24px;
}

/* Title styles */
.card-title {
  font-size: 20px;
  font-weight: 700;
  color: #131414;
  line-height: 22px;
  margin-bottom: 2px;
  text-align: left;
  width: 100%;
}

/* Label styles */
.label {
  font-weight: 600;
  font-size: 12px;
  color: #131414;
  line-height: 22px;
  margin-bottom: 2px;
}

/* Amount styles */
.amount {
  color: #409EFF;
  font-weight: 700;
  font-size: 20px;
  line-height: 22px;
}



/* Update label styles */
.update-label {
  font-weight: 400;
  color: #131414;
  font-size: 12px;
  line-height: 22px;
}

/* Update timestamp styles */
.update-timestamp {
  margin-left: 4px;
  font-weight: 500;
  color: #909399;
  font-size: 12px;
  line-height: 22px;
}
</style>  