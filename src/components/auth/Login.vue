<script>
import showPassword from '../../helper/showPassword.js'
import { Form as veeForm, Field, ErrorMessage } from 'vee-validate'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import useUserStore from '../../store/User.js'
import { auth, signInWithEmailAndPassword } from '/src/services/firebase.js'

export default {
  name: 'AuthLogin',
  components: {
    veeForm,
    Field,
    ErrorMessage
  },

  setup(props, context) {
    const { values } = useForm()

    function updatePathRef() {
      context.emit('updatePathRef', 'register')
    }

    function validateEmail(value) {
      // if the field is empty
      if (!value) {
        return 'This field is required'
      }
      // if the field is not a valid email
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
      if (!regex.test(value)) {
        return 'This field must be a valid email'
      }
      // All is good
      return true
    }

    //handling submission
    const email = ref('')
    const password = ref('')
    const message = ref('')

    const isSubmitting = ref(false)
    const router = useRouter()
    const { userLogin } = useUserStore()

    function onSubmit() {
      isSubmitting.value = true

      signInWithEmailAndPassword(auth, email.value, password.value)
        .then(() => {
          // Signed in
          // ...
          isSubmitting.value = false
          userLogin()
          router.push('/')
        })
        .catch((error) => {
          message.value = error.message
          password.value = ''
          isSubmitting.value = false
        })
    }

    return {
      updatePathRef,
      onSubmit,
      values,
      validateEmail,
      showPassword,
      isSubmitting,
      message,
      email,
      password
    }
  }
}
</script>

<template>
  <section class="auth__modal">
    <h1 class="auth__title">Login</h1>
    <veeForm class="auth__form" @submit="onSubmit">
      <!-- Email -->
      <div class="mb-3">
        <label class="auth__label">Email address</label>
        <Field
          v-model="email"
          name="Email"
          type="email"
          class="auth__input"
          :rules="validateEmail"
        />
        <ErrorMessage name="Email" class="auth__err" />
      </div>
      <!-- Password -->
      <div class="mb-3 relative">
        <label class="auth__label">Password</label>
        <Field
          v-model="password"
          name="Password"
          type="password"
          class="auth__input"
          id="loginPassword"
        />
        <svg
          class="show-icon"
          fill="none"
          viewBox="0 0 20 21"
          xmlns="http://www.w3.org/2000/svg"
          @click="showPassword('loginPassword')"
        >
          <path
            d="m12.983 10.5c0 1.65-1.3333 2.9833-2.9833 2.9833-1.65 0-2.9833-1.3333-2.9833-2.9833s1.3333-2.9833 2.9833-2.9833c1.65 0 2.9833 1.3333 2.9833 2.9833z"
            stroke="#4F4F4F"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            d="m10 17.392c2.9417 0 5.6833-1.7334 7.5917-4.7334 0.75-1.175 0.75-3.15 0-4.325-1.9084-3-4.65-4.7333-7.5917-4.7333-2.9417 0-5.6833 1.7333-7.5917 4.7333-0.75 1.175-0.75 3.15 0 4.325 1.9083 3 4.65 4.7334 7.5917 4.7334z"
            stroke="#4F4F4F"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
        </svg>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="submit__btn" :disabled="isSubmitting">Submit</button>
    </veeForm>
    <!-- Toggle Form -->
    <p class="auth__toggle">
      Don't have an account?
      <router-link
        class="text-blue-500 hover:text-blue-600"
        to="/auth/register"
        @click="updatePathRef"
        >Register</router-link
      >
    </p>

    <div class="flex gap-4 items-center justify-center mt-12" v-if="message">
      <img class="w-[2.4rem] h-[2.4rem]" src="/public/images/error.webp" alt="error icon" />
      <p class="text-red-500 text-3xl text-center font-semibold">{{ message }}.</p>
    </div>
  </section>
</template>

<style scoped>
.auth__modal {
  @apply mt-36;
}

.auth__form {
  @apply flex flex-col gap-4;
  width: fit-content;
  margin: 0 auto;
}

.auth__title {
  @apply text-center text-4xl font-bold mb-16;
}

.auth__label {
  @apply text-lg font-semibold mb-1 inline-block;
}

.auth__input {
  @apply block bg-gray-100 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded;
  width: 40rem;
  padding: 1.1rem 1.2rem 1.2rem 1.2rem;
}

.submit__btn {
  @apply py-4 mt-3 rounded-md bg-blue-500 text-white text-2xl
    font-medium leading-8 tracking-tight flex justify-center items-center hover:bg-blue-600;
  width: 40rem;
}

.auth__toggle {
  @apply text-gray-950 text-xl w-fit;
  margin: 0 auto;
  margin-top: 2rem;
}

.show-icon {
  @apply absolute right-8 cursor-pointer;

  top: 2.9rem;

  width: 2rem;
  height: 2rem;
}
</style>
