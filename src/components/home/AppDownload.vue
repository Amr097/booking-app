<template>
  <section class="download">
    <img class="download__image" src="/images/phone.webp" alt="phone" />
    <div class="download__ad">
      <h1 class="download__title">
        Download the mobile application for bonus coupons and travel codes
      </h1>
      <a href="" class="download__link">Download mobile app</a>
    </div>
  </section>
</template>

<script setup></script>

<style scoped lang="postcss">
.download {
  @apply rounded-md relative bg-cover flex items-center justify-end sm:justify-normal shadow-md;

  background:
    linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%),
    url(/images/download.webp) lightgray 0px -72.075px / 100% 165.959% no-repeat;
  height: 28rem;
  z-index: -8;
}

.download__image {
  @apply absolute -top-32 right-[18rem] transform -rotate-12 object-contain sm:right-0;
  width: 71rem;
  height: 50rem;
  z-index: -2;
}

.download__ad {
  @apply flex flex-col gap-9 items-start justify-center ml-20;
  width: 40%;
}

.download__title {
  @apply text-4xl text-white font-semibold leading-relaxed;
}

.download__link {
  @apply rounded-md flex justify-center items-center px-8 py-5 text-xl text-white font-medium hover:bg-blue-600 transition-colors ease-in-out;
  background-color: #2f80ed;
}
</style>
