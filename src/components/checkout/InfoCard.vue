<script setup></script>

<template>
  <div class="info">
    <div class="info__container">
      <p class="info__title mt-1">Important information about your booking</p>
    </div>

    <ol class="info__list">
      <li class="info__item">
        This rate is non-refundable. If you change or cancel your booking you will not get a refund
        or credit to use for a future stay. Stay extensions will require a new reservation. Front
        desk staff will greet guests on arrival No refunds will be issued for late check-in or early
        check-out.
      </li>
      <li class="info__item">Stay extensions will require a new reservation.</li>
      <li class="info__item">Front desk staff will greet guests on arrival</li>
      <li class="info__item">No refunds will be issued for late check-in or early check-out.</li>
    </ol>
    <p class="px-8 text-gray-700 text-xl leading-7 tracking-wide mb-10">
      By clicking the button below, I acknowledge that I have reviewed the
      <span class="text-blue-600 cursor-pointer">Privacy Statement</span> and have reviewd and
      accept the <span class="text-blue-600 cursor-pointer">Rules and Restrictions</span> and
      <span class="text-blue-600 cursor-pointer">Terms of Use</span> .
    </p>

    <slot name="info-btn"></slot>

    <div class="info__ps">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 7.75C10.11 7.75 9.75 8.54 9.75 10V10.62H14.25V10C14.25 8.54 13.89 7.75 12 7.75Z"
          fill="#219653"
        />
        <path
          d="M11.998 15.0979C12.2897 15.0979 12.5695 14.9821 12.7758 14.7758C12.9821 14.5695 13.098 14.2897 13.098 13.9979C13.098 13.7062 12.9821 13.4264 12.7758 13.2201C12.5695 13.0138 12.2897 12.8979 11.998 12.8979C11.7063 12.8979 11.4265 13.0138 11.2202 13.2201C11.0139 13.4264 10.898 13.7062 10.898 13.9979C10.898 14.2897 11.0139 14.5695 11.2202 14.7758C11.4265 14.9821 11.7063 15.0979 11.998 15.0979Z"
          fill="#219653"
        />
        <path
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17.38 14.5C17.38 16.7 16.7 17.38 14.5 17.38H9.5C7.3 17.38 6.62 16.7 6.62 14.5V13.5C6.62 11.79 7.03 11 8.25 10.73V10C8.25 9.07 8.25 6.25 12 6.25C15.75 6.25 15.75 9.07 15.75 10V10.73C16.97 11 17.38 11.79 17.38 13.5V14.5Z"
          fill="#219653"
        />
      </svg>

      <p>We use secure transmission and encrypted storage to protect your personal information</p>
    </div>
  </div>
</template>

<style scoped>
.info {
  @apply rounded-lg bg-white;
  width: 100%;
}

.info__container {
  @apply py-4 px-5;
  border-radius: 6px 6px 0px 0px;
  background: #f2c94c;
}

.info__title {
  @apply text-black text-2xl leading-9 tracking-wide font-medium;
}

.info__list {
  @apply my-10 px-14 list-decimal;
}
.info__item {
  @apply p-1 text-2xl font-medium leading-9;

  colr: #333;
}

.info__ps {
  @apply flex items-center py-8 pl-4 gap-2;
}

.info__ps p {
  @apply text-xl leading-8 tracking-wide;
  color: #4f4f4f;
}
</style>
