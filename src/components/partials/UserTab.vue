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

const uncheckRadio = (type) => {
  if (type === 'bell') {
    const bellInput = document.querySelector('#toggle-bell')
    bellInput.checked = false
  } else {
    const userInput = document.querySelector('#user-toggle')

    userInput.checked = false

    console.log(userInput.checked)
  }
}
</script>

<template>
  <div class="relative">
    <label for="toggle-bell" class="relative">
      <slot name="bell-icon"></slot>
    </label>
    <input type="radio" name="toggle" id="toggle-bell" class="toggle-bell" />
    <div class="bell-mask" @click="uncheckRadio('bell')"></div>
    <ul class="notif__list">
      <li class="notif__item">
        <img
          class="w-[3.5rem] h-[3.5rem] rounded-full"
          src="/images/details-1.webp"
          alt="property"
        />
        <p>user 22143 has reserver property no.3232r3</p>
      </li>
      <li class="notif__item">
        <img
          class="w-[3.5rem] h-[3.5rem] rounded-full"
          src="/images/details-1.webp"
          alt="property"
        />
        <p>user 22143 has reserver property no.3232r3</p>
      </li>
      <li class="notif__item">
        <img
          class="w-[3.5rem] h-[3.5rem] rounded-full"
          src="/images/details-1.webp"
          alt="property"
        />
        <p>user 22143 has reserver property no.3232r3</p>
      </li>
      <li class="notif__item">
        <img
          class="w-[3.5rem] h-[3.5rem] rounded-full"
          src="/images/details-1.webp"
          alt="property"
        />
        <p>user 22143 has reserver property no.3232r3</p>
      </li>
    </ul>
  </div>
  <label for="user-toggle" class="relative">
    <img src="/images/user.webp" alt="User image" class="user__img" />
    <input type="radio" name="toggle" id="user-toggle" class="toggle-user" />
    <div class="user-mask" @click.prevent="uncheckRadio('user')"></div>
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

<style scoped lang="postcss">
.toggle-bell {
  @apply absolute top-[0.5rem] right-[0.5rem] invisible pointer-events-none -z-30;
}

.bell-mask {
  @apply w-[3.5rem] h-full top-0 absolute -z-40 cursor-pointer;
}
.toggle-bell:checked ~ .notif__list {
  @apply visible z-30 pointer-events-auto;
  transform: translateX(-50%) scaleY(1);
}

.toggle-bell:checked ~ .bell-mask {
  @apply z-40;
}

.notif__list,
.user__list {
  @apply absolute  bg-white w-max mt-2 rounded-md shadow-lg border border-solid border-gray-200  
  pointer-events-none -z-20 transition-all duration-150 origin-top;
  left: 50%;
  transform: translateX(-50%) scaleY(0);
}

.notif__list {
  @apply top-[3.5rem];
}

.user__list {
  @apply top-[4.5rem];
}

.notif__item {
  @apply text-xl bg-white rounded-md cursor-pointer flex gap-3 items-center max-w-md;

  padding: 1rem 1rem 1rem 1.4rem;
  color: #4f4f4f;
  border-bottom: 0.3px solid #d6d6d6;
  box-shadow: 0px 0.5px 0px 0px #d6d6d6;
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

.toggle-user {
  @apply absolute top-[1.5rem] left-[1.5rem] pointer-events-none invisible -z-30;
}

.user-mask {
  @apply w-[3.5rem] h-full top-0 absolute -z-40 cursor-pointer;
}
.toggle-user:checked ~ .user-mask {
  @apply z-40;
}

.toggle-user:checked ~ .user__list {
  @apply visible z-20 pointer-events-auto;
  transform: translateX(-50%) scaleY(1);
}

.user__item {
  @apply text-xl bg-white rounded-md cursor-pointer;
  padding: 1rem 1rem 1rem 1.4rem;
  color: #4f4f4f;
  border-bottom: 0.3px solid #d6d6d6;
  box-shadow: 0px 0.5px 0px 0px #d6d6d6;
}
</style>
