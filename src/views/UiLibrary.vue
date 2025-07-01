<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useSidebarStore } from '@/stores/sidebar'
import { storeToRefs } from 'pinia'
import CardAgentWallet from '../components/CardAgentWallet.vue'
import StatusTag from '../components/StatusTag.vue'
import ScanButton from '../components/ScanButton.vue'
import MobileField from '../components/MobileField.vue'
import DropDown from '../components/DropDown.vue'
import CardReview from '../components/CardReview.vue'

const router = useRouter()
const sidebarStore = useSidebarStore()
const { isCollapsed } = storeToRefs(sidebarStore)

// State for Dropdown component
const selectedValue = ref('all')
const dropdownOptions = ref([
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
])
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
          <div class="flex flex-col items-center p-8 pb-8">
            <h1 class="text-2xl font-bold mb-6">UI Library</h1>
            <div class="w-full max-w-4xl space-y-8 min-h-0">
              <!-- Add your UI components here -->
              <div class="bg-white p-6 rounded-lg shadow">
                <h2 class="text-xl font-semibold mb-4">Buttons</h2>
                <div class="space-x-4">
                  <el-button type="primary">Primary</el-button>
                  <el-button type="success">Success</el-button>
                  <el-button type="warning">Warning</el-button>
                  <el-button type="danger">Danger</el-button>
                  <el-button type="info">Info</el-button>
                </div>
                <div class="mt-4">
                  <ScanButton />
                </div>
              </div>
              
              <div class="bg-white p-6 rounded-lg shadow">
                <h2 class="text-xl font-semibold mb-4">Cards</h2>
                <CardAgentWallet />
              </div>

              <div class="bg-white p-6 rounded-lg shadow">
                <h2 class="text-xl font-semibold mb-4">Dropdown</h2>
                <div class="w-full">
                  <DropDown v-model="selectedValue" :options="dropdownOptions" />
                </div>
              </div>

              <div class="bg-white p-6 rounded-lg shadow">
                <h2 class="text-xl font-semibold mb-6">Input Field</h2>
                <div class="w-full">
                  <MobileField placeholderText="Enter mobile number" />
                </div>
              </div>

              <div class="bg-white p-6 rounded-lg shadow">
                <h2 class="text-xl font-semibold mb-4">Status Tag</h2>
                <div class="flex gap-4">
                  <StatusTag status="active" />
                  <StatusTag status="inactive" />
                  <StatusTag status="pending" />
                  <StatusTag status="error" />
                </div>
              </div>

              <div class="bg-white p-6 rounded-lg shadow">
                <h2 class="text-xl font-semibold mb-4">Card Review</h2>
                <CardReview />
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

.box-card {
  width: 100%;
  margin-bottom: 16px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
