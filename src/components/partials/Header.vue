<template>
  <header class="header">
    <figure class="logo">
      <svg
        class="logo__image"
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="20"
        viewBox="0 0 19 20"
      >
        <path
          d="M1.414 10.7782C0.5 11.0002 0 12.1922 0 12.1922C0 12.1922 3.398 12.6262 4.949 14.3132C6.5 16.0002 7.071 19.2632 7.071 19.2632C7.071 19.2632 8.47 19.6982 8.485 17.8492C8.5 16.0002 7.778 14.3132 7.778 14.3132L11.091 11.0002L14.701 18.7042C14.701 18.7042 16.08 19.2302 16.04 17.3652C16 15.5002 14.85 7.24219 14.85 7.24219L17.678 4.41319C17.869 4.22869 18.0214 4.008 18.1262 3.76399C18.231 3.51999 18.2862 3.25755 18.2885 2.99199C18.2908 2.72643 18.2402 2.46307 18.1396 2.21728C18.0391 1.97149 17.8906 1.74818 17.7028 1.5604C17.515 1.37261 17.2917 1.2241 17.0459 1.12354C16.8001 1.02298 16.5368 0.972377 16.2712 0.974685C16.0056 0.976993 15.7432 1.03217 15.4992 1.13698C15.2552 1.2418 15.0345 1.39417 14.85 1.58519L11.947 4.48819C11.947 4.48819 4.148 3.09419 1.824 3.29719C-0.5 3.50018 0.559 4.56319 0.559 4.56319L8.203 8.23319L4.95 11.4862C4.95 11.4862 2.328 10.5562 1.414 10.7782Z"
          :fill="logoColor"
        />
      </svg>
      <figcaption :style="{ color: logoColor }" class="logo__caption">My Dream Place</figcaption>
    </figure>

    <nav class="nav">
      <ul class="nav__list">
        <li
          class="nav__list--item"
          v-for="(item, index) in navItems"
          :key="index"
          :style="{ color: textColor }"
        >
          <a href=""> {{ item }}</a>
        </li>
      </ul>
    </nav>
    <div class="auth" v-if="!isLogged">
      <router-link
        class="auth__btn"
        :to="`/auth/${item.toLowerCase()}`"
        v-for="(item, index) in authBtns"
        :key="index"
        >{{ item }}</router-link
      >
    </div>
    <div class="user" v-if="isLogged">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="user__bell">
        <path
          d="m19.34 14.49-1-1.66c-0.21-0.37-0.4-1.07-0.4-1.48v-2.53c-0.0012-1.116-0.3183-2.2088-0.9147-3.152s-1.4476-1.6984-2.4553-2.178c-0.2571-0.45666-0.6323-0.83586-1.0861-1.098-0.4539-0.26211-0.9698-0.3975-1.4939-0.39203-1.09 0-2.07 0.59-2.59 1.52-1.95 0.97-3.3 2.98-3.3 5.3v2.53c0 0.41-0.19 1.11-0.4 1.47l-1.01 1.67c-0.4 0.67-0.49 1.41-0.24 2.09 0.24 0.67 0.81 1.19 1.55 1.44 1.94 0.66 3.98 0.98 6.02 0.98 2.04 0 4.08-0.32 6.02-0.97 0.7-0.23 1.24-0.76 1.5-1.45s0.19-1.45-0.2-2.09z"
          :fill="textColor"
        />
        <path
          d="m14.83 20.01c-0.2103 0.5822-0.5947 1.0854-1.101 1.4415-0.5063 0.356-1.11 0.5475-1.729 0.5485-0.79 0-1.57-0.32-2.12-0.89-0.32-0.3-0.56-0.7-0.7-1.11 0.13 0.02 0.26 0.03 0.4 0.05 0.23 0.03 0.46997 0.06 0.70997 0.08 0.57 0.05 1.15 0.08 1.73 0.08 0.57 0 1.14-0.03 1.7-0.08 0.21-0.02 0.42-0.03 0.62-0.06l0.49-0.06z"
          :fill="texColor"
        />
        <circle cx="17" cy="6" r="5" fill="#EB5757" stroke="logoColor" stroke-width="2" />
      </svg>
      <div class="relative">
        <img src="/public/images/user.webp" alt="User image" class="user__img" tabindex="0" />
        <ul class="user__list">
          <li class="user__item" v-for="(item, index) in userListItems" :key="index">{{ item }}</li>
          <li class="user__item" @click="signOut">Sign out</li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import { onMounted, ref } from 'vue'
export default {
  name: 'AppHeader',
  props: { logoColor: String, textColor: String },
  setup() {
    const navItems = ['Home', 'Discover', 'Activities', 'About', 'Contact']
    const authBtns = ['Register', 'Login']
    const userListItems = ['Manage account', 'My trips', 'Reward and wallet']

    const isLogged = ref(false)

    const signOut = () => {
      sessionStorage.removeItem('authToken')
      location.reload()
    }

    onMounted(() => {
      sessionStorage.getItem('authToken') ? (isLogged.value = true) : null
    })

    return { navItems, authBtns, isLogged, userListItems, signOut }
  }
}
</script>

<style scoped>
.header {
  @apply flex py-6 justify-between;

  margin: 0 auto;
}
.logo {
  @apply flex items-center gap-2;
}

.logo__image {
  @apply w-9 h-9;
}

.logo__caption {
  @apply text-gray-900 text-3xl font-medium tracking-wide;
}

.nav {
  display: flex;
}

.nav__list {
  @apply flex items-center gap-x-28;
}

.nav__list--item {
  @apply text-2xl font-normal tracking-tighter;
}

.auth {
  @apply flex items-center gap-6;
}

.auth__btn {
  @apply w-32 h-16 rounded-md bg-blue-500 text-white text-2xl 
  font-medium leading-8 tracking-tight flex justify-center items-center hover:bg-blue-600;
}

.user {
  @apply flex gap-10 items-center;
}

.user__bell {
  width: 2.4rem;
  height: 2.4rem;
  cursor: pointer;
}

.user__img {
  width: 4.4rem;
  height: 4.4rem;
  object-fit: cover;
  border-radius: 4.4rem;
  cursor: pointer;
}

.user__list:hover {
  display: block;
}

.user__img:focus ~ .user__list {
  display: block;
}

.user__list {
  @apply absolute bg-white w-max mt-2 rounded-md shadow-md hidden;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
}

.user__item {
  @apply text-xl bg-white rounded-md cursor-pointer;
  padding: 1rem 1rem 1rem 1.4rem;
  color: #4f4f4f;
  border-bottom: 0.3px solid #d6d6d6;
  box-shadow: 0px 0.5px 0px 0px #d6d6d6;
}
</style>
