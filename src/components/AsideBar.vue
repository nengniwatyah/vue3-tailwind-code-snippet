<template>
  <!-- Sidebar container with dynamic width based on collapsed state
     - Width: 64px when collapsed, 216px when expanded
     - Full height with gradient background and subtle shadow -->
  <aside :class="[Collapsed ? 'w-16' : 'w-[216px]',
   'h-screen bg-gradient-to-b from-[#0E70A3] to-[#084B6D] shadow-[0px_2px_24px_-3px_rgba(0,0,0,0.1)] flex flex-col transition-all duration-300 ease-in-out']">
    
    <!-- Navigation -->
    <nav class="flex-1 h-[calc(100vh-56px)] overflow-y-auto">
      <ul class="text-[#BFCBD9] font-[Helvetica Neue] text-[14px] leading-[56px] font-normal flex flex-col">
        <!-- Dashboard -->
        <li class="mb-2">
          <a href="#" class="flex items-center px-6 py-3 hover:bg-gray-50 rounded-lg">
            <img src="/src/assets/icons/dashboard.svg" class="w-5 h-5 text-gray-500" alt="Dashboard" />
            <span 
              class="ml-3 text-[#BFCBD9] transition-all duration-300 ease-in-out"
              :class="{ 
                'invisible opacity-0': isCollapsed, 
                'visible opacity-100': !isCollapsed 
              }"
            >Dashboard</span>
          </a>
        </li>

        <!-- Wallet -->
        <li class="mb-2">
          <a href="#" class="flex items-center px-6 py-3 hover:bg-gray-50 rounded-lg">
            <img src="/src/assets/icons/wallet-topup.svg" class="w-5 h-5 text-gray-500" alt="Top Up Wallet" />
            <span 
              class="ml-3 text-[#BFCBD9] transition-all duration-300 ease-in-out"
              :class="{ 
                'invisible opacity-0': isCollapsed, 
                'visible opacity-100': !isCollapsed 
              }"
            >Top Up Wallet</span>
          </a>
        </li>

        <!-- Transaction History -->
        <li class="mb-2">
          <a href="#" class="flex items-center px-6 py-3 hover:bg-gray-50 rounded-lg">
            <img src="/src/assets/icons/list.svg" class="w-5 h-5 text-gray-500" alt="Transaction History" />
            <span 
              class="ml-3 text-[#BFCBD9] transition-all duration-300 ease-in-out"
              :class="{ 
                'invisible opacity-0': isCollapsed, 
                'visible opacity-100': !isCollapsed 
              }"
            >Transaction History</span>
          </a>
        </li>

        <!-- Scan Card Received -->
        <li class="mb-2">
          <a href="#" class="flex items-center px-6 py-3 hover:bg-gray-50 rounded-lg">
            <img src="/src/assets/icons/opencard.svg" class="w-5 h-5 text-gray-500" alt="Scan Card Received" />
            <span 
              class="ml-3 text-[#BFCBD9] transition-all duration-300 ease-in-out"
              :class="{ 
                'invisible opacity-0': isCollapsed, 
                'visible opacity-100': !isCollapsed 
              }"
            >Scan Card Received</span>
          </a>
        </li>

        <!-- Card Received List -->
        <li class="mb-2">
          <a href="#" class="flex items-center px-6 py-3 hover:bg-gray-50 rounded-lg">
            <img src="/src/assets/icons/list.svg" class="w-5 h-5 text-gray-500" alt="Card Received List" />
            <span 
              class="ml-3 text-[#BFCBD9] transition-all duration-300 ease-in-out"
              :class="{ 
                'invisible opacity-0': isCollapsed, 
                'visible opacity-100': !isCollapsed 
              }"
            >Card Received List</span>
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
defineProps({
  isCollapsed: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
nav ul li a:hover {
  background-color: #00537D;
  border-radius: 0;
}

nav ul li a {
  border-radius: 0;
  height: 56px;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: all 0.3s ease-in-out;
}

nav ul {
  gap: 0;
}

nav ul li {
  margin: 0;
  padding: 0;
}

/* Add smooth transition for menu text */
.menu-text {
  transition: opacity 0.3s ease-in-out;
}
</style>
