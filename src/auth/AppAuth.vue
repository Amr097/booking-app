<script setup>
import AuthLogin from '../components/auth/AuthLogin.vue'
import AuthRegister from '../components/auth/AuthRegister.vue'

import TestAccount from '../components/partials/TestAccount.vue'

import { useRoute } from 'vue-router'
import { ref } from 'vue'

const login = 'login'
const register = 'register'
const pathRef = ref(null)
const route = useRoute()
const path = route.params.path

pathRef.value = path

function updatePathRef(value) {
  pathRef.value = value
}
</script>

<template>
  <div class="auth">
    <!-- Auth Header -->
    <nav class="auth__header">
      <router-link to="/">
        <figure class="logo">
          <svg
            class="logo__image"
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="20"
            viewBox="0 0 19 20"
            fill="none"
          >
            <path
              d="M1.414 10.7782C0.5 11.0002 0 12.1922 0 12.1922C0 12.1922 3.398 12.6262 4.949 14.3132C6.5 16.0002 7.071 19.2632 7.071 19.2632C7.071 19.2632 8.47 19.6982 8.485 17.8492C8.5 16.0002 7.778 14.3132 7.778 14.3132L11.091 11.0002L14.701 18.7042C14.701 18.7042 16.08 19.2302 16.04 17.3652C16 15.5002 14.85 7.24219 14.85 7.24219L17.678 4.41319C17.869 4.22869 18.0214 4.008 18.1262 3.76399C18.231 3.51999 18.2862 3.25755 18.2885 2.99199C18.2908 2.72643 18.2402 2.46307 18.1396 2.21728C18.0391 1.97149 17.8906 1.74818 17.7028 1.5604C17.515 1.37261 17.2917 1.2241 17.0459 1.12354C16.8001 1.02298 16.5368 0.972377 16.2712 0.974685C16.0056 0.976993 15.7432 1.03217 15.4992 1.13698C15.2552 1.2418 15.0345 1.39417 14.85 1.58519L11.947 4.48819C11.947 4.48819 4.148 3.09419 1.824 3.29719C-0.5 3.50018 0.559 4.56319 0.559 4.56319L8.203 8.23319L4.95 11.4862C4.95 11.4862 2.328 10.5562 1.414 10.7782Z"
              fill="#2F80ED"
            />
          </svg>
          <figcaption class="logo__caption text-[#2F80ED]">
            <span class="v">V</span>oyage en <span class="v">v</span>ue
          </figcaption>
        </figure></router-link
      >
    </nav>
    <TestAccount />
    <!-- Auth Login -->
    <AuthLogin v-if="pathRef === login" @updatePathRef="updatePathRef" />
    <!-- Auth Register -->
    <AuthRegister v-if="pathRef === register" @updatePathRef="updatePathRef" />
  </div>
</template>

<style scoped lang="postcss">
.auth {
  @apply py-8;

  width: 90%;
  margin: 0 auto;
}

.logo {
  @apply flex items-center gap-2;
}

.logo__image {
  @apply w-9 h-9;
}
</style>
