<script setup>
import AsideBar from '../components/AsideBar.vue'
import Toolbar from '../components/Toolbar.vue'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useSidebarStore } from '@/stores/sidebar'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

// --- Page State ---
const router = useRouter()
const sidebarStore = useSidebarStore()
const { isCollapsed } = storeToRefs(sidebarStore)
const activeTab = ref('preview')
const copied = ref('') // Stores the type of code copied, e.g., 'layout', 'asideBar'

// --- Code Snippets ---
// We use dynamic imports with `?raw` (a Vite feature) to load the actual source code.
// This is much more maintainable than hardcoding the code as strings.
const asideBarCode = ref('Loading...')
const toolbarCode = ref('Loading...')

onMounted(async () => {
  try {
    asideBarCode.value = (await import('../components/AsideBar.vue?raw')).default
    toolbarCode.value = (await import('../components/Toolbar.vue?raw')).default
  } catch (e) {
    console.error("Failed to load component source code:", e)
    asideBarCode.value = 'Failed to load code.'
    toolbarCode.value = 'Failed to load code.'
  }
})

// This layout code is specific to this documentation page, so we define it here.
const layoutCode = ref(`
<script setup>
import AsideBar from '../components/AsideBar.vue'
import Toolbar from '../components/Toolbar.vue'
import { useSidebarStore } from '@/stores/sidebar'
import { storeToRefs } from 'pinia'

const sidebarStore = useSidebarStore()
const { isCollapsed } = storeToRefs(sidebarStore)
<\/script>

<template>
  <div class="common-layout">
    <el-container class="h-full">
      <el-aside :width="isCollapsed ? '64px' : '216px'" class="transition-all duration-300 ease-in-out">
        <AsideBar :is-collapsed="isCollapsed" />
      </el-aside>
      <el-container class="h-full">
        <el-header>
          <Toolbar @toggle-sidebar="sidebarStore.toggle()" />
        </el-header>
        <el-main class="h-full">
          <div class="flex justify-center items-center h-full">
            <!-- Main content goes here -->
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

.el-header {
  padding: 0;
  height: 48px;
  background-color: #ffffff;
  box-shadow: 0px 2px 24px -3px rgba(0,0,0,0.1);
}

.el-aside {
  background-color: #ffffff;
  height: 100%;
  overflow: hidden;
  transition: width 0.3s ease-in-out;
}

.el-main {
  background-color: #F9FBFF;
  padding: 20px;
  height: 100%;
  overflow-y: auto;
}
</style>
`)

// --- Methods ---
const copyCode = (code, type) => {
  navigator.clipboard.writeText(code)
  copied.value = type
  
  ElMessage({
    message: `${type} code copied to clipboard!`,
    type: 'success',
    duration: 2000
  })
  
  setTimeout(() => {
    if (copied.value === type) {
      copied.value = ''
    }
  }, 2000)
}
</script>

<template>
  <div class="common-layout">
    <el-container class="h-full">
        <!-- Main Sidebar - Fixed width and not collapsible -->
        <el-aside width="216px" class="transition-all duration-300 ease-in-out">
        <aside class="w-[216px] h-screen bg-gradient-to-b from-[#0E70A3] to-[#084B6D] shadow-[0px_2px_24px_-3px_rgba(0,0,0,0.1)] flex flex-col">
          
          <!-- Navigation -->
          <nav class="h-screen overflow-y-auto">
            <ul class="text-[#BFCBD9] font-[Helvetica Neue] text-[14px] leading-[56px] font-normal flex flex-col">
              <!-- Home -->
              <li class="home">
                <a href="#" class="flex items-center px-6 hover:bg-gray-50 rounded-lg" @click.prevent="router.push('/ui-library')">
                  <span 
                    class="font-medium text-[#BFCBD9] ml-3"
                    :class="{ 
                      'text-white': router.currentRoute.value.path === '/ui-library'
                    }"
                  >Home</span>
                </a>
              </li>

              <!-- Card -->
              <li class="card">
                <a href="#" class="flex items-center px-6 hover:bg-gray-50 rounded-lg" @click.prevent="router.push('/card')">
                  <span 
                    class="text-[#BFCBD9] ml-3"
                    :class="{ 
                      'text-white': router.currentRoute.value.path === '/card'
                    }"
                  >Card Agent</span>
                </a>
              </li>

              <!-- Card Counter -->
              <li class="card-counter">
                <a href="#" class="flex items-center px-6 hover:bg-gray-50 rounded-lg" @click.prevent="router.push('/card-counter')">
                  <span class="text-white ml-3">Card Counter</span>
                </a>
              </li>

              <!-- Status Tag -->
              <li class="status-tag">
                <a href="#" class="flex items-center px-6 hover:bg-gray-50 rounded-lg" @click.prevent="router.push('/status-tag')">
                  <span class="text-[#BFCBD9] ml-3">Status Tag</span>
                </a>
              </li>

              <!-- Aside Bar -->
              <li class="aside-bar">
                <a href="#" class="flex items-center px-6 hover:bg-gray-50 rounded-lg" @click.prevent="router.push('/aside-bar')">
                  <span class="text-[#BFCBD9] ml-3">Aside Bar</span>
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
              <!-- Aside Bar Component -->
              <div class="bg-white rounded-lg shadow-lg p-6">
                <!-- Title -->
                <h2 class="text-xl font-semibold mb-4 text-gray-800">Aside Bar & Toolbar</h2>
                
                <!-- Tabs -->
                <el-tabs v-model="activeTab" class="mb-6">
                  <el-tab-pane label="Preview" name="preview" />
                  <el-tab-pane label="Vue" name="code" />
                </el-tabs>

                <!-- Tab Content -->
                <div class="space-y-6">
                  <!-- Preview Tab -->
                  <div v-if="activeTab === 'preview'" class="bg-gray-50 p-6 rounded-lg">
                    <h1 class="text-[20px] font-bold mb-6 text-[#131414] leading-[22px] text-left w-full">Layout Aside Examples</h1>
                    <div class="space-y-4">
                      <el-container>
                        <el-aside :width="isCollapsed ? '64px' : '216px'" class="transition-all duration-300 ease-in-out">
                          <AsideBar :is-collapsed="isCollapsed" />
                        </el-aside>
                        <el-container>
                          <el-header>
                            <Toolbar @toggle-sidebar="sidebarStore.toggle" />
                          </el-header>
                          <el-main class="h-full flex items-center justify-center">
                            <div class="text-center">
                              <h2 class="text-2xl font-semibold mb-2">Contents</h2>
                              <p class="text-gray-600">This area will display the main content of your application.</p>
                            </div>
                          </el-main>
                        </el-container>
                      </el-container>
                    </div>
                  </div>

                  <!-- Code Tab -->
                  <div v-else class="space-y-6">
                    <!-- Layout Code -->
                    <div class="code-block">
                      <div class="flex justify-between items-center mb-2">
                        <h3 class="text-sm font-medium text-gray-700">Layout Example</h3>
                        <el-button 
                          size="small" 
                          :type="copied === 'Layout' ? 'success' : 'primary'"
                          @click="copyCode(layoutCode, 'Layout')"
                          class="copy-button"
                        >
                          {{ copied === 'Layout' ? 'Copied!' : 'Copy' }}
                        </el-button>
                      </div>
                      <pre class="code-snippet"><code>{{ layoutCode }}</code></pre>
                    </div>

                    <!-- AsideBar.vue Code -->
                    <div class="code-block">
                      <div class="flex justify-between items-center mb-2">
                        <h3 class="text-sm font-medium text-gray-700">AsideBar.vue</h3>
                        <el-button 
                          size="small" 
                          :type="copied === 'AsideBar' ? 'success' : 'primary'"
                          @click="copyCode(asideBarCode, 'AsideBar')"
                          class="copy-button"
                        >
                          {{ copied === 'AsideBar' ? 'Copied!' : 'Copy' }}
                        </el-button>
                      </div>
                      <pre class="code-snippet"><code>{{ asideBarCode }}</code></pre>
                    </div>

                    <!-- Toolbar.vue Code -->
                    <div class="code-block">
                      <div class="flex justify-between items-center mb-2">
                        <h3 class="text-sm font-medium text-gray-700">Toolbar.vue</h3>
                        <el-button 
                          size="small" 
                          :type="copied === 'Toolbar' ? 'success' : 'primary'"
                          @click="copyCode(toolbarCode, 'Toolbar')"
                          class="copy-button"
                        >
                          {{ copied === 'Toolbar' ? 'Copied!' : 'Copy' }}
                        </el-button>
                      </div>
                      <pre class="code-snippet"><code>{{ toolbarCode }}</code></pre>
                    </div>
                  </div>
                </div>
                <!-- Documentation -->
                <div class="bg-gray-50 p-6 rounded-lg my-6">
                  <h3 class="text-lg font-semibold mb-6">Documents</h3>
                  
                  <!-- Aside Bar Documentation -->
                  <div class="space-y-6 mb-8">
                    <h4 class="text-md font-semibold text-gray-800 border-b pb-2">Aside Bar Component</h4>
                    <div class="space-y-4 pl-4">
                      <div>
                        <h5 class="font-medium text-gray-700">คำอธิบาย</h5>
                        <p class="text-gray-600 mt-1">
                          ใช้สำหรับแสดงเมนูนำทางด้านข้างของแอปพลิเคชัน สามารถพับเก็บได้ (Collapsible) พร้อมเอฟเฟกต์การเปลี่ยนแปลงที่ลื่นไหล
                        </p>
                      </div>
                      <div>
                        <h5 class="font-medium text-gray-700">คุณสมบัติ (Props)</h5>
                        <ul class="list-disc list-inside mt-2 text-gray-600 space-y-1">
                          <li><code>isCollapsed</code> (Boolean): กำหนดสถานะการแสดงผล (true = พับเก็บ, false = แสดงเต็มรูปแบบ)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 class="font-medium text-gray-700">วิธีการใช้งาน</h5>
                        <pre class="bg-white p-4 rounded mt-2 overflow-x-auto">
                          <code class="text-sm">
&lt;template&gt;
  &lt;AsideBar :isCollapsed="isCollapsed" /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue';
import AsideBar from './components/AsideBar.vue';

const isCollapsed = ref(false);
&lt;/script&gt;
                          </code>
                        </pre>
                      </div>
                    </div>
                  </div>


                  <!-- Toolbar Documentation -->
                  <div class="space-y-6">
                    <h4 class="text-md font-semibold text-gray-800 border-b pb-2">Toolbar Component</h4>
                    <div class="space-y-4 pl-4">
                      <div>
                        <h5 class="font-medium text-gray-700">คำอธิบาย</h5>
                        <p class="text-gray-600 mt-1">
                          แถบเครื่องมือด้านบนสุดของแอปพลิเคชัน ประกอบด้วยปุ่มเมนูและส่วนโปรไฟล์ผู้ใช้
                        </p>
                      </div>
                      <div>
                        <h5 class="font-medium text-gray-700">Events (Emits)</h5>
                        <ul class="list-disc list-inside mt-2 text-gray-600 space-y-1">
                          <li><code>toggle-sidebar</code>: ถูกส่งออกมาเมื่อผู้ใช้คลิกปุ่มเมนู</li>
                        </ul>
                      </div>
                      <div>
                        <h5 class="font-medium text-gray-700">วิธีการใช้งาน</h5>
                        <pre class="bg-white p-4 rounded mt-2 overflow-x-auto">
                          <code class="text-sm">
&lt;template&gt;
  &lt;Toolbar @toggle-sidebar="handleToggle" /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import Toolbar from './components/Toolbar.vue';

const handleToggle = () => {
  // Logic to toggle the sidebar's collapsed state
  // For example, by calling a Pinia store action:
  // sidebarStore.toggle();
};
&lt;/script&gt;
                          </code>
                        </pre>
                      </div>
                    </div>
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
  overflow: hidden;
}

.code-block {
  background: #f6f8fa;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 16px;
}

.code-snippet {
  margin: 0;
  padding: 12px;
  background: #1e1e1e;
  color: #4ADE80;
  border-radius: 4px;
  overflow-x: auto;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
}

.copy-button {
  padding: 4px 12px;
  font-size: 12px;
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
  background-color: #F9FBFF;
  padding: 0;
  height: calc(100vh - 48px);
  overflow-y: auto;
}

nav ul li a:hover {
  background-color: #00537D;
  border-radius: 0;
}
</style>