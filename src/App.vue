<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import useUserStore from '/src/store/User.js'
import {} from '/src/services/firebase.js'

onMounted(async () => {
  const { setUserStatus } = useUserStore()

  setUserStatus()
})
</script>

<style scoped></style>
