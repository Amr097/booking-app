<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import useUserStore from '/src/store/User.js'

onMounted(async () => {
  const { setUserStatus } = useUserStore()

  setUserStatus()
})
</script>

<style scoped lang="postcss"></style>
