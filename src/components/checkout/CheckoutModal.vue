<template>
  <div class="modal">
    <div class="modal__card">
      <div class="modal__frame">
        <img class="frame" src="/images/26a298da1dad51e79d8acb1dba146a7f.webp" alt="Boy image" />
      </div>
      <div class="modal__content">
        <h1 class="modal__title">Booking Successful</h1>
        <p class="modal__desc">
          Congratulations your reservation has been made. You will be notified 2 days prior the
          date.
        </p>
      </div>
      <router-link :to="{ name: trips }" @click="toggleModal" class="modal__btn"
        >View Trip</router-link
      >
    </div>
  </div>
</template>

<script>
import useUserStore from '../../store/User.js'
import { computed } from 'vue'

export default {
  name: 'AppModal',

  setup() {
    const { firstLogin } = useUserStore()
    const toggleModal = () => {
      firstLogin.modal = false
    }

    const token = computed(() => sessionStorage.getItem('authToken'))

    return { toggleModal, token }
  }
}
</script>

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
  @apply rounded-2xl w-[75%] p-10;

  background: rgba(111, 207, 151, 0.2);
}

.frame-1 {
  @apply object-cover;
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
