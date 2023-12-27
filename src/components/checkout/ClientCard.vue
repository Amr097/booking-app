<template>
  <section class="client">
    <div class="checkout__heading--container">
      <img src="/images/security-user.svg" alt="icon" />
      <slot name="room"></slot>
    </div>
    <div class="client__data">
      <div class="w-[100%] lg:w-2/3 flex flex-col gap-8">
        <div class="client__name">
          <label for="firstName" class="card-label col-start-1 col-span-1"
            >First name <span class="text-red-500">*</span></label
          >
          <slot name="firstName"></slot>
          <label for="lastName" class="card-label col-start-2 col-span-1 row-start-1"
            >Last name <span class="text-red-500">*</span></label
          >
          <slot name="lastName"></slot>
        </div>
        <div class="client__number">
          <label for="firstName" class="card-label col-start-1 col-span-1">Mobile number</label>
          <slot name="number"></slot>
        </div>
        <div class="client__alert">
          <slot name="alert"></slot>
          <label for="checkbox" class="text-lg tracking-wide text-gray-900 mt-1"
            >Receive text alerts about this trip.</label
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.client {
  @apply rounded-lg shadow-sm;
  width: 100%;
}

.checkout__heading--container img {
  width: 2.8rem;
  height: 2.8rem;
  object-fit: cover;
}

.client__data {
  @apply bg-white w-full px-8 py-12 rounded-lg;
}

.client__name {
  @apply grid grid-cols-2 gap-x-8 gap-y-2;

  grid-template-rows: max-content 1fr;
}

.client__number {
  @apply flex flex-col gap-2;
}

.client__alert {
  @apply flex  gap-2;
}
</style>
