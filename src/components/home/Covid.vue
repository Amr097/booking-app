<template>
  <section class="covid-alert" role="alert" aria-label="Check COVID-19 restrictions">
    <svg fill="none" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" class="alert-icon">
      <path
        d="m16 12v6.6667"
        stroke="#292D32"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      />
      <path
        d="m16 28.547h-8.08c-4.6267 0-6.56-3.3067-4.32-7.3467l4.16-7.4933 3.92-7.04c2.3733-4.28 6.2666-4.28 8.64 0l3.92 7.0533 4.16 7.4934c2.24 4.04 0.2933 7.3466-4.32 7.3466h-8.08v-0.0133z"
        stroke="#292D32"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      />
      <path
        d="m15.993 22.667h0.012"
        stroke="#292D32"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
    </svg>

    <p class="covid-text">
      Check the latest COVID-19 restrictions before you travel.
      <a href="" class="text-blue-600">Learn more</a>
    </p>
  </section>
</template>

<script>
export default {
  name: 'HomeCovid'
}
</script>

<style scoped>
.covid-alert {
  @apply flex mt-40 rounded-lg items-center px-8 py-6 gap-6;

  background-color: #fcefca;
}

.covid-text {
  @apply text-gray-700 text-xl font-normal leading-relaxed tracking-wide;
}

.alert-icon {
  width: 2.4rem;
  height: 2.4rem;
}
</style>
