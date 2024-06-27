<script setup>
const icons = ['/images/pay.webp', '/images/visa.webp', '/images/ae.webp', '/images/dis.webp']
</script>

<template>
  <div class="pay">
    <div class="checkout__heading--container">
      <img src="/images/card-tick.svg" alt="icon" />
      <p class="room__details mt-1">Payment options</p>
    </div>

    <div class="pay__method"><p>Debit/Credit Card</p></div>

    <div class="pay__form">
      <div class="pay__icons mb-4">
        <div
          class="bg-gray-100 px-3 py-2 w-fit rounded-md"
          v-for="(icon, index) in icons"
          :key="index"
        >
          <img class="w-[4.2rem] h-[2.4rem]" :src="icon" alt="icon" />
        </div>
      </div>

      <label for="nameCard" class="card-label mt-5"
        >Name on card <span class="text-red-500">*</span></label
      >
      <slot name="nameCard"></slot>

      <label for="cardNumber" class="card-label mt-8"
        >Debit/Credit card number <span class="text-red-500">*</span></label
      >
      <slot name="cardNumber"></slot>

      <div class="pay__expire mt-8">
        <label for="cardNumber" class="card-label col-span-full g-row"
          >Expiration Date <span class="text-red-500">*</span></label
        >
        <slot name="expireDate"></slot>
      </div>

      <div class="pay__code mt-8">
        <label for="secCode" class="card-label col-start-1 col-span-1 row-start-1"
          >Security Code <span class="text-red-500">*</span></label
        >
        <slot name="secCode"></slot>

        <label for="zipCode" class="card-label col-start-2 col-span-1 row-start-1"
          >Billing Zip code <span class="text-red-500">*</span></label
        >
        <slot name="zipCode"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.pay {
  @apply rounded-lg bg-white shadow-sm;
  width: 100%;
}

.pay__method {
  @apply px-12;
  box-shadow: 0px 1px 0px 0px #e0e0e0;
}

.pay__method p {
  @apply text-xl tracking-wide relative w-fit pb-5 pt-6;
  color: #333;
}

.pay__method p::before {
  @apply absolute bottom-0  bg-blue-600 h-1;
  transform: translateX(-5%);
  width: 110%;
  content: '';
}

.pay__form {
  @apply px-10 my-12 w-[100%] md:w-2/3 flex flex-col gap-2;
}

.pay__icons {
  @apply flex gap-4;
}

.pay__expire {
  @apply grid gap-y-2 gap-x-4;

  grid-template-columns: 1fr 1fr max-content;
}

.pay__code {
  @apply grid grid-cols-2 md:grid-cols-3  gap-x-4 gap-y-2;
  grid-template-rows: min-content max-content;
}
</style>
