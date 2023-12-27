<script setup>
import useUserStore from '../../store/User.js'

const { firstLogin } = useUserStore()
const toggleModal = () => {
  firstLogin.modal = false
}
</script>

<template>
  <div class="modal">
    <div class="modal__card">
      <div class="modal__frame">
        <img class="frame-2" src="/images/Frame-1.svg" alt="Boy image" />
        <img class="frame-1" src="/images/Frame.svg" alt="Boy image" />
      </div>
      <div class="modal__content">
        <h1 class="modal__title">Welcome to My Dream Place</h1>
        <p class="modal__desc">
          You can now enjoy your travel experience with easy access to resources and more
        </p>
      </div>
      <div class="modal__btn" @click="toggleModal">Get Started</div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  @apply fixed w-full z-10 flex justify-center items-center;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.2);
}

.modal__card {
  @apply bg-white flex items-center justify-between flex-col pt-20 pb-10 gap-12 px-11 rounded-md;
  width: 40rem;
}

.modal__frame {
  @apply flex justify-center rounded-full w-96 h-80 my-0 mx-auto;
  background: rgba(47, 128, 237, 0.3);
}

.frame-1 {
  @apply -translate-x-2;
}

.frame-2 {
  @apply translate-x-8;
}

.modal__content {
  @apply flex flex-col  items-center gap-6 px-12;
}

.modal__title {
  @apply text-3xl font-semibold;
}

.modal__desc {
  @apply text-center text-2xl font-medium leading-9 tracking-wide;
  color: #4f4f4f;
}

.modal__btn {
  @apply rounded-lg text-white text-2xl font-medium leading-8 tracking-wide inline-block w-full py-4 text-center hover:bg-blue-600 cursor-pointer;
  background-color: #2f80ed;
}
</style>
