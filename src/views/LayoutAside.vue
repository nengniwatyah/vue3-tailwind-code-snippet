<script setup>
import AsideBar from '../components/AsideBar.vue'
import Toolbar from '../components/Toolbar.vue'
import { useRouter } from 'vue-router'
import { useSidebarStore } from '@/stores/sidebar'
import { storeToRefs } from 'pinia'

const router = useRouter()
const sidebarStore = useSidebarStore()
const { isCollapsed } = storeToRefs(sidebarStore)
</script>

<template>
  <div class="common-layout">
    <el-container class="h-full">
      <el-aside :width="isCollapsed ? '64px' : '216px'" class="transition-all duration-300 ease-in-out">
        <AsideBar :is-collapsed="isCollapsed" />
      </el-aside>
      <el-container class="h-full">
        <el-header>
          <Toolbar />
        </el-header>
        <el-main class="h-full">
          <div class="flex justify-center items-center h-full">
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
  background-color: #32b667;
  padding: 20px;
  height: 100%;
  overflow-y: auto;
}
</style>
