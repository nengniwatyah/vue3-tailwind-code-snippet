<script setup>
import CardCounter from '../components/CardCounter.vue'
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

// Code examples
const templateCode = ref(`
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
</template>`)

const scriptCode = ref(`
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
<\/script>`)

const styleCode = ref(`
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
</style>`)

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
              <!-- Card Counter -->
              <div class="bg-white rounded-lg shadow-lg p-6">
                <!-- Title -->
                <h2 class="text-xl font-semibold mb-4 text-gray-800">Card Counter</h2>
                
                <!-- Tabs -->
                <div class="border-b border-gray-200 mb-4">
                  <ul class="flex space-x-2">
                    <li>
                      <button 
                        @click="activeTab = 'preview'" 
                        :class="{
                          'inline-block py-2 px-4 text-sm font-medium': true,
                          'text-gray-500 hover:text-gray-700': activeTab !== 'preview',
                          'text-blue-600 border-b-2 border-blue-500': activeTab === 'preview'
                        }"
                      >
                        Live Preview
                      </button>
                    </li>
                    <li>
                      <button 
                        @click="activeTab = 'vue'"
                        :class="{
                          'inline-block py-2 px-4 text-sm font-medium': true,
                          'text-gray-500 hover:text-gray-700': activeTab !== 'vue',
                          'text-blue-600 border-b-2 border-blue-500': activeTab === 'vue'
                        }"
                      >
                        Vue3
                      </button>
                    </li>
                    <li>
                      <button 
                        @click="activeTab = 'style'"
                        :class="{
                          'inline-block py-2 px-4 text-sm font-medium': true,
                          'text-gray-500 hover:text-gray-700': activeTab !== 'style',
                          'text-blue-600 border-b-2 border-blue-500': activeTab === 'style'
                        }"
                      >
                        Style
                      </button>
                    </li>
                    <li>
                      <button 
                        @click="activeTab = 'script'"
                        :class="{
                          'inline-block py-2 px-4 text-sm font-medium': true,
                          'text-gray-500 hover:text-gray-700': activeTab !== 'script',
                          'text-blue-600 border-b-2 border-blue-500': activeTab === 'script'
                        }"
                      >
                        Script
                      </button>
                    </li>
                  </ul>
                </div>
                
                <!-- Tab Content -->
                <div class="space-y-6">
                  <!-- Preview Tab -->
                  <div v-if="activeTab === 'preview'" class="bg-gray-50 p-4 rounded-lg">
                    <CardCounter />
                  </div>
                  
                  <!-- Vue3 Tab -->
                  <div v-else-if="activeTab === 'vue'" class="bg-black p-4 rounded-lg relative group">
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
                  <div v-else-if="activeTab === 'style'" class="bg-black p-4 rounded-lg relative group">
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
                  <div v-else-if="activeTab === 'script'" class="bg-black p-4 rounded-lg relative group">
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
  flex: 1;
  padding: 10px;
  text-align: center;
  background: #f5f5f5;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.tab-button.active {
  background: #00537D;
  color: white;
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
</style>
