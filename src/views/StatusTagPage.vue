<script setup>
import StatusTag from '../components/StatusTag.vue'
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
const copied = ref('') // To track which code block is copied

// --- Code Snippets ---
const templateCode = ref('Loading...')
const scriptCode = ref('Loading...')
const styleCode = ref('Loading...')

// --- Lifecycle Hooks ---
onMounted(async () => {
  try {
    const rawComponentCode = (await import('../components/StatusTag.vue?raw')).default
    
    // Parse the component code into template, script, and style sections
    templateCode.value = rawComponentCode.match(/<template>[\s\S]*<\/template>/)?.[0].trim() || 'Could not extract template.'
    scriptCode.value = rawComponentCode.match(/<script setup>[\s\S]*<\/script>/)?.[0].trim() || 'Could not extract script.'
    styleCode.value = rawComponentCode.match(/<style scoped>[\s\S]*<\/style>/)?.[0].trim() || 'Could not extract style.'

  } catch (e) {
    console.error("Failed to load component source code:", e)
    templateCode.value = 'Failed to load code.'
    scriptCode.value = 'Failed to load code.'
    styleCode.value = 'Failed to load code.'
  }
})

// --- Methods ---
const copyCode = (type) => {
  let codeToCopy = ''
  if (type === 'template') codeToCopy = templateCode.value
  else if (type === 'script') codeToCopy = scriptCode.value
  else if (type === 'style') codeToCopy = styleCode.value

  navigator.clipboard.writeText(codeToCopy)
  copied.value = type
  
  ElMessage({
    message: `${type.charAt(0).toUpperCase() + type.slice(1)} code copied to clipboard!`,
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
                    class="transition-all duration-300 ease-in-out"
                    :class="{ 
                      'text-white': router.currentRoute.value.path === '/status-tag',
                      'text-[#BFCBD9]': router.currentRoute.value.path !== '/status-tag',
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
                    class="transition-all duration-300 ease-in-out"
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
              <!-- Status Tag Component -->
              <div class="bg-white rounded-lg shadow-lg p-6">
                <!-- Title -->
                <h2 class="text-xl font-semibold mb-4 text-gray-800">Status Tag</h2>
                
                <!-- Tabs -->
                <el-tabs v-model="activeTab" class="mb-6">
                  <el-tab-pane label="Preview" name="preview" />
                  <el-tab-pane label="Vue" name="code" />
                </el-tabs>

                <!-- Tab Content -->
                <div class="space-y-6">
                  <!-- Preview Tab -->
                  <div v-if="activeTab === 'preview'" class="bg-gray-50 p-6 rounded-lg">
                    <h1 class="text-[20px] font-bold mb-6 text-[#131414] leading-[22px] text-left w-full">Status Tag Examples</h1>
                    <div class="space-y-4">
                      <div class="flex items-center gap-4">
                        <span class="w-32">Active:</span>
                        <StatusTag status="active" />
                      </div>
                      <div class="flex items-center gap-4">
                        <span class="w-32">Inactive:</span>
                        <StatusTag status="inactive" />
                      </div>
                      <div class="flex items-center gap-4">
                        <span class="w-32">Pending:</span>
                        <StatusTag status="pending" />
                      </div>
                      <div class="flex items-center gap-4">
                        <span class="w-32">Error:</span>
                        <StatusTag status="error" />
                      </div>
                    </div>
                  </div>

                  <!-- Code Tab -->
                  <div v-else class="space-y-6">
                    <!-- Template Tab -->
                    <div class="code-block">
                      <div class="flex justify-between items-center mb-2">
                        <h3 class="text-sm font-medium text-gray-700">Template</h3>
                        <el-button 
                          size="small" 
                          :type="copied === 'template' ? 'success' : 'primary'"
                          @click="copyCode('template')"
                          class="copy-button"
                        >
                          {{ copied === 'template' ? 'Copied!' : 'Copy' }}
                        </el-button>
                      </div>
                      <pre class="code-snippet"><code>{{ templateCode }}</code></pre>
                    </div>

                    <!-- Script Tab -->
                    <div class="code-block">
                      <div class="flex justify-between items-center mb-2">
                        <h3 class="text-sm font-medium text-gray-700">Script</h3>
                        <el-button 
                          size="small" 
                          :type="copied === 'script' ? 'success' : 'primary'"
                          @click="copyCode('script')"
                          class="copy-button"
                        >
                          {{ copied === 'script' ? 'Copied!' : 'Copy' }}
                        </el-button>
                      </div>
                      <pre class="code-snippet"><code>{{ scriptCode }}</code></pre>
                    </div>

                    <!-- Style Tab -->
                    <div class="code-block">
                      <div class="flex justify-between items-center mb-2">
                        <h3 class="text-sm font-medium text-gray-700">Style</h3>
                        <el-button 
                          size="small" 
                          :type="copied === 'style' ? 'success' : 'primary'"
                          @click="copyCode('style')"
                          class="copy-button"
                        >
                          {{ copied === 'style' ? 'Copied!' : 'Copy' }}
                        </el-button>
                      </div>
                      <pre class="code-snippet"><code>{{ styleCode }}</code></pre>
                    </div>
                  </div>
                </div>
                <!-- Documentation -->
                <div class="bg-gray-50 p-6 rounded-lg my-6">
                  <h3 class="text-lg font-semibold mb-4">Document Status Tag</h3>
                  <div class="space-y-4">
                    <div>
                      <h4 class="font-medium">คำอธิบาย</h4>
                      <p class="text-gray-600">
                        Status Tag เป็นคอมโพเนนต์ที่ใช้แสดงสถานะต่างๆ ในแอปพลิเคชัน โดยมีสถานะที่รองรับ 4 สถานะ:
                      </p>
                      <ul class="list-disc list-inside mt-2 text-gray-600">
                        <li>active - สถานะทำงานปกติ (สีเขียว)</li>
                        <li>inactive - สถานะไม่ทำงาน (สีเทา)</li>
                        <li>pending - สถานะกำลังดำเนินการ (สีส้ม)</li>
                        <li>error - สถานะมีข้อผิดพลาด (สีแดง)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 class="font-medium">วิธีการใช้งาน</h4>
                      <p class="text-gray-600">
                        ใช้ StatusTag component โดยส่ง props status ที่ระบุสถานะที่ต้องการ:
                      </p>
                      <pre class="bg-white p-4 rounded mt-2">
                        <code class="text-sm">
                          &lt;StatusTag status="active" /&gt;
                          &lt;StatusTag status="inactive" /&gt;
                          &lt;StatusTag status="pending" /&gt;
                          &lt;StatusTag status="error" /&gt;
                        </code>
                      </pre>
                    </div>
                    <div>
                      <h4 class="font-medium">คุณสมบัติ (Props)</h4>
                      <p class="text-gray-600">
                        <ul class="list-disc list-inside mt-2 text-gray-600">
                          <li>status (required): ระบุสถานะของแท็ก ('active', 'inactive', 'pending', 'error')</li>
                        </ul>
                      </p>
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
  padding: 0;
  height: calc(100vh - 48px);
  overflow-y: auto;
}

nav ul li a:hover {
  background-color: #00537D;
  border-radius: 0;
}
</style>