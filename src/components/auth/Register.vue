<script>
import showPassword from '../../helper/showPassword.js'
import { validateEmail, validatePassword } from '../../helper/RegValidation.js'
import { Form as veeForm, Field, ErrorMessage } from 'vee-validate'
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import { auth, createUserWithEmailAndPassword } from '/src/services/firebase.js'

export default {
  name: 'AuthRegister',
  components: {
    veeForm,
    Field,
    ErrorMessage
  },

  setup(props, context) {
    // Update route state for toggle forms
    function updatePathRef() {
      context.emit('updatePathRef', 'login')
    }

    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')

    function validateConfirmPassword(value) {
      // if the field is empty
      if (!value) {
        return 'This field is required'
      }
      // if password does not match
      if (password.value !== confirmPassword.value) {
        return 'Password does not match'
      }

      // All is good
      return true
    }

    //handling submission

    const isSubmitting = ref(false)
    const router = useRouter()

    const message = reactive({
      value: '',
      type: ''
    })

    function onSubmit() {
      isSubmitting.value = true
      createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(() => {
          // Signed up
          isSubmitting.value = false
          message.type = 'success'
          message.value = 'Successfully registered, redirecting to login page. '
          setTimeout(() => {
            context.emit('updatePathRef', 'login')
            router.push('/auth/login')
          }, 1500)
          // ...
        })
        .catch((error) => {
          message.value = error.message
          message.type = 'error'
          isSubmitting.value = false
          // ..
        })
    }

    return {
      updatePathRef,
      validateEmail,
      validatePassword,
      password,
      confirmPassword,
      validateConfirmPassword,
      showPassword,
      onSubmit,
      isSubmitting,
      email,
      message
    }
  }
}
</script>

<template>
  <section class="auth__modal">
    <h1 class="auth__title">Register</h1>
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
      <div class="mb-3 relative w-min">
        <label class="auth__label">Password</label>
        <Field
          v-model="password"
          name="Password"
          type="password"
          class="auth__input"
          id="registerPassword"
          :rules="validatePassword"
        ></Field>
        <ErrorMessage name="Password" class="auth__err" />
        <svg
          @click="showPassword('registerPassword')"
          class="show-icon"
          fill="none"
          viewBox="0 0 20 21"
          xmlns="http://www.w3.org/2000/svg"
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
      <!-- Confirm Password -->
      <div class="mb-3 relative w-min">
        <label class="auth__label">Confirm Password</label>
        <Field
          id="confirmPassword"
          v-model="confirmPassword"
          name="ConfirmPassword"
          type="password"
          class="auth__input"
          :rules="validateConfirmPassword"
        />
        <svg
          class="show-icon"
          fill="none"
          viewBox="0 0 20 21"
          xmlns="http://www.w3.org/2000/svg"
          @click="showPassword('confirmPassword')"
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
        <ErrorMessage name="ConfirmPassword" class="auth__err" />
      </div>
      <!-- Submit Button -->
      <button type="submit" class="submit__btn" :disabled="isSubmitting">Submit</button>
    </veeForm>

    <!-- Toggle Form -->
    <p class="auth__toggle">
      Already have an account?
      <router-link class="text-blue-500 hover:text-blue-600" to="/auth/login" @click="updatePathRef"
        >Login</router-link
      >
    </p>
    <div
      class="flex gap-4 items-center justify-center mt-12"
      v-if="message.value && message.type === 'error'"
    >
      <img class="w-[2.4rem] h-[2.4rem]" src="/public/images/error.webp" alt="error icon" />
      <p class="text-red-500 text-3xl text-center font-semibold">{{ message.value }}.</p>
    </div>

    <div
      class="flex gap-4 items-end justify-center mt-12"
      v-if="message.value && message.type === 'success'"
    >
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p class="text-green-600 text-3xl text-center font-semibold">{{ message.value }} .</p>
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
