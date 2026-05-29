<template>
  <nav class="top-nav">
    <div class="nav-left">
      <span class="nav-logo"><span class="dot"></span>Nanobot</span>
    </div>
    <div class="nav-center">
      <span
        class="nav-tab"
        :class="{ active: activeTab === 'lesson-plan' }"
        @click="$router.push('/teacher/lesson-plan')"
      >教案与活动</span>
      <span
        class="nav-tab"
        :class="{ active: activeTab === 'homework' }"
        @click="$router.push('/teacher/exam')"
      >作业批改</span>
      <span
        class="nav-tab"
        :class="{ active: activeTab === 'analytics' }"
        @click="$router.push('/teacher/analytics')"
      >学情分析</span>
    </div>
    <div class="nav-right">
      <slot name="nav-extra" />
      <button class="nav-icon" @click="toggleTheme" title="切换主题">
        <svg v-if="!isDark" viewBox="0 0 20 20"><path d="M10 2a8 8 0 1 0 0 16 7 7 0 0 1 0-14"/></svg>
        <svg v-else viewBox="0 0 20 20"><circle cx="10" cy="10" r="4"/><path d="M10 2v2m0 12v2M2 10h2m12 0h2M4.5 4.5l1.5 1.5m8 8l1.5 1.5M4.5 15.5l1.5-1.5m8-8l1.5-1.5"/></svg>
      </button>
      <button class="nav-icon" @click="handleLogout" title="退出登录">
        <svg viewBox="0 0 20 20"><path d="M7 17H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h3M13 14l4-4-4-4M17 10H7"/></svg>
      </button>
      <div class="nav-avatar" :title="user?.userId || ''">{{ user?.userId?.[0] || '?' }}</div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth.js'

defineProps({
  activeTab: { type: String, default: 'lesson-plan' },
})

const emit = defineEmits(['logout'])

const { user, logout } = useAuth()
const isDark = ref(false)

function toggleTheme() {
  isDark.value = !isDark.value
  document.body.classList.toggle('dark', isDark.value)
}

function handleLogout() {
  logout()
  emit('logout')
}
</script>

<style scoped>
/* Styles are inherited from the page-level CSS */
/* The nav styles will be included in each page's <style> block */
</style>
