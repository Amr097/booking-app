<script setup>
import { signOut, auth } from '/src/services/firebase.js'

const userListItems = ['Manage account', 'Reward and wallet']

const signUserOut = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      location.reload()
    })
    .catch(() => {
      // An error happened.
      alert(
        'Failed to sign user out, if the problem presists please report the problem to the app developer.'
      )
    })
}
</script>

<template>
  <label for="user-tab" class="relative">
    <img src="/images/user.webp" alt="User image" class="user__img" tabindex="0" />
    <input
      type="checkbox"
      name="user-toggle"
      id="user-tab"
      class="absolute top-[1.5rem] left-[1.5rem] pointer-events-none invisible"
    />
    <ul class="user__list">
      <li class="user__item">
        <slot name="trips-link"></slot>
      </li>
      <li class="user__item" disabled="true" v-for="(item, index) in userListItems" :key="index">
        {{ item }}
      </li>
      <li class="user__item" @click="signUserOut">Sign out</li>
    </ul>
  </label>
</template>

<style scoped>
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

#user-tab:checked ~ .user__list {
  @apply visible z-20 pointer-events-auto;
  transform: translateX(-50%) scaleY(1);
}

.user__list {
  @apply absolute bg-white w-max mt-2 rounded-md shadow-md pointer-events-none -z-20 transition-all duration-150 origin-top;
  left: 50%;
  transform: translateX(-50%) scaleY(0);
}

.user__item {
  @apply text-xl bg-white rounded-md cursor-pointer;
  padding: 1rem 1rem 1rem 1.4rem;
  color: #4f4f4f;
  border-bottom: 0.3px solid #d6d6d6;
  box-shadow: 0px 0.5px 0px 0px #d6d6d6;
}
</style>
