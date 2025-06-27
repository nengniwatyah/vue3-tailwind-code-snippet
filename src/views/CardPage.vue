<script setup>
import CardAgentWallet from '../components/CardAgentWallet.vue'
import { useRouter } from 'vue-router'
import { useSidebarStore } from '@/stores/sidebar'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// Sidebar state
const router = useRouter()
const sidebarStore = useSidebarStore()
const { isCollapsed } = storeToRefs(sidebarStore)

// Tab state
const activeTab = ref('preview')
const copied = ref('')

// Extract code sections
const templateCode = ref(`
<template>
  <h1 class="text-[20px] font-bold mb-2 text-[#131414] leading-[22px] text-left w-full">Total Agent Wallet</h1>
  <el-card 
    class="custom-card"
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
`)

const scriptCode = ref(`
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

  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes
}

const percentageText = computed(() => {
  return percentage.value + '%'
})

// Convert string amount to number
const currentAmount = computed(() => {
  return parseFloat(props.totalWallet.replace(/[^\\d.-]+/g, ''))
})

// Convert used amount to number
const usedAmountNum = computed(() => {
  return parseFloat(props.usedAmount.replace(/[^\\d.-]+/g, ''))
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
<\/script>
`)

const styleCode = ref(`
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
  padding: 16px;
  padding-inline: 16px;
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
`)

// Copy code function
const copyCode = (type) => {
  let text = ''
  if (type === 'vue') text = templateCode.value
  else if (type === 'script') text = scriptCode.value
  else if (type === 'style') text = styleCode.value
  
  navigator.clipboard.writeText(text.trim())
  copied.value = type
  ElMessage.success('Copied to clipboard!')
  
  setTimeout(() => {
    copied.value = ''
  }, 2000)
}
</script>

<template>
  <div class="common-layout">
    <el-container class="h-full">
      <el-aside :width="isCollapsed ? '64px' : '216px'" class="transition-all duration-300 ease-in-out">
        <!-- Sidebar container with dynamic width based on collapsed state -->
        <aside :class="[isCollapsed ? 'w-16' : 'w-[216px]',
          'h-screen bg-gradient-to-b from-[#0E70A3] to-[#084B6D] shadow-[0px_2px_24px_-3px_rgba(0,0,0,0.1)] flex flex-col']">
          
          <!-- Navigation -->
          <nav class="h-screen overflow-y-auto">
            <ul class="text-[#BFCBD9] font-[Helvetica Neue] text-[14px] leading-[56px] font-normal flex flex-col">
              <!-- Home -->
              <li class="home">
                <a href="#" class="flex items-center px-6 hover:bg-gray-50 rounded-lg" @click.prevent="router.push('/ui-library')">
                  <span 
                    class="transition-all duration-300 ease-in-out font-medium"
                    :class="{ 
                      'text-white': router.currentRoute.value.path === '/ui-library',
                      'text-[#BFCBD9]': router.currentRoute.value.path !== '/ui-library',
                      'invisible opacity-0': isCollapsed, 
                      'visible opacity-100': !isCollapsed,
                      'ml-3': !isCollapsed
                    }"
                  >Home</span>
                </a>
              </li>

              <!-- Card -->
              <li class="card">
                <a href="#" class="flex items-center px-6 hover:bg-gray-50 rounded-lg" @click.prevent="router.push('/card')">
                  <span 
                    class="transition-all duration-300 ease-in-out"
                    :class="{ 
                      'text-white': router.currentRoute.value.path === '/card',
                      'text-[#BFCBD9]': router.currentRoute.value.path !== '/card',
                      'invisible opacity-0': isCollapsed, 
                      'visible opacity-100': !isCollapsed,
                      'ml-3': !isCollapsed
                    }"
                  >Card Agent</span>
                </a>
              </li>

              <!-- Card Counter -->
              <li class="card-counter">
                <a href="#" class="flex items-center px-6 hover:bg-gray-50 rounded-lg" @click.prevent="router.push('/card-counter')">
                  <span 
                    class="text-white transition-all duration-300 ease-in-out"
                    :class="{ 
                      'invisible opacity-0': isCollapsed, 
                      'visible opacity-100': !isCollapsed,
                      'ml-3': !isCollapsed
                    }"
                  >Card Counter</span>
                </a>
              </li>

              <!-- Status Tag -->
              <li class="status-tag">
                <a href="#" class="flex items-center px-6 hover:bg-gray-50 rounded-lg" @click.prevent="router.push('/status-tag')">
                  <span 
                    class="text-[#BFCBD9] transition-all duration-300 ease-in-out"
                    :class="{ 
                      'invisible opacity-0': isCollapsed, 
                      'visible opacity-100': !isCollapsed,
                      'ml-3': !isCollapsed
                    }"
                  >Status Tag</span>
                </a>
              </li>

              <!-- Aside Bar -->
              <li class="aside-bar">
                <a href="#" class="flex items-center px-6 hover:bg-gray-50 rounded-lg" @click.prevent="router.push('/aside-bar')">
                  <span 
                    class="text-[#BFCBD9] transition-all duration-300 ease-in-out"
                    :class="{ 
                      'invisible opacity-0': isCollapsed, 
                      'visible opacity-100': !isCollapsed,
                      'ml-3': !isCollapsed
                    }"
                  >Aside Bar</span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>
      </el-aside>
      <el-container class="min-h-screen">
        <el-main class="p-0">
          <div class="container mx-auto min-h-screen flex flex-col py-10 px-4 sm:px-6">
            <div class="flex flex-col gap-6">
              <!-- First Card -->
              <div class="bg-white rounded-lg shadow-lg p-6">
                <!-- Title -->
                <h2 class="text-xl font-semibold mb-4 text-gray-800">Card Agent</h2>
                
                <!-- Tabs -->
                <div class="border-b border-gray-200 mb-4">
                  <ul class="flex space-x-2">
                    <li>
                      <button 
                        class="inline-block py-2 px-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                        :class="{ 'border-b-2 border-blue-500 text-blue-600': activeTab === 'preview' }"
                        @click="activeTab = 'preview'"
                      >Live Preview</button>
                    </li>
                    <li>
                      <button 
                        class="inline-block py-2 px-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                        :class="{ 'border-b-2 border-blue-500 text-blue-600': activeTab === 'vue' }"
                        @click="activeTab = 'vue'"
                      >Vue3</button>
                    </li>
                    <li>
                      <button 
                        class="inline-block py-2 px-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                        :class="{ 'border-b-2 border-blue-500 text-blue-600': activeTab === 'style' }"
                        @click="activeTab = 'style'"
                      >Style</button>
                    </li>
                    <li>
                      <button 
                        class="inline-block py-2 px-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                        :class="{ 'border-b-2 border-blue-500 text-blue-600': activeTab === 'script' }"
                        @click="activeTab = 'script'"
                      >Script</button>
                    </li>
                  </ul>
                </div>

                <!-- Tab Content -->
                <div class="space-y-6">
                  <!-- Preview Tab -->
                  <div v-if="activeTab === 'preview'" class="bg-gray-50 p-4 rounded-lg">
                    <CardAgentWallet />
                  </div>

                  <!-- Vue3 Tab -->
                  <div v-if="activeTab === 'vue'" class="bg-black p-4 rounded-lg relative group">
                    <button 
                      @click="copyCode('vue')" 
                      class="absolute right-4 top-4 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center" 
                      :title="copied === 'vue' ? 'Copied!' : 'Copy to clipboard'"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      {{ copied === 'vue' ? 'Copied!' : 'Copy' }}
                    </button>
                    <pre class="text-green-400 text-sm overflow-x-auto"><code>{{ templateCode.trim() }}</code></pre>
                  </div>

                  <!-- Style Tab -->
                  <div v-if="activeTab === 'style'" class="bg-black p-4 rounded-lg relative group">
                    <button 
                      @click="copyCode('style')" 
                      class="absolute right-4 top-4 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center" 
                      :title="copied === 'style' ? 'Copied!' : 'Copy to clipboard'"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      {{ copied === 'style' ? 'Copied!' : 'Copy' }}
                    </button>
                    <pre class="text-green-400 text-sm overflow-x-auto"><code>{{ styleCode.trim() }}</code></pre>
                  </div>

                  <!-- Script Tab -->
                  <div v-if="activeTab === 'script'" class="bg-black p-4 rounded-lg relative group">
                    <button 
                      @click="copyCode('script')" 
                      class="absolute right-4 top-4 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center" 
                      :title="copied === 'script' ? 'Copied!' : 'Copy to clipboard'"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      {{ copied === 'script' ? 'Copied!' : 'Copy' }}
                    </button>
                    <pre class="text-green-400 text-sm overflow-x-auto"><code>{{ scriptCode.trim() }}</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.el-container {
  height: 100%;
}

.el-aside {
  background-color: #ffffff;
  height: 100%;
  overflow: hidden;
  transition: width 0.3s ease-in-out;
}

nav ul li a:hover {
  background-color: #00537D;
  border-radius: 0;
}

.el-main {
  background-color: #f5f7fa;
  padding: 20px;
  height: 100%;
  overflow-y: auto;
}

/* Tabs */
.tabs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.tab-button {
  padding: 8px 16px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  margin-right: 10px;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.tab-button.active {
  color: #00537D;
  border-bottom-color: #00537D;
}

.tab-content {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  background: white;
  min-height: 300px;
}

/* Code blocks */
.code-block {
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-all;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Sidebar and header styles */
.el-aside {
  background-color: #ffffff;
  height: 100%;
  overflow: hidden;
  transition: width 0.3s ease-in-out;
  box-shadow: 0px 2px 24px -3px rgba(0,0,0,0.1);
}

.el-header {
  padding: 0;
  height: 48px;
  background-color: #ffffff;
  box-shadow: 0px 2px 24px -3px rgba(0,0,0,0.1);
  z-index: 10;
}

.el-main {
  padding: 0;
  height: calc(100vh - 48px);
  overflow-y: auto;
}
</style>
