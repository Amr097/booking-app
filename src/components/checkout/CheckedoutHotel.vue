<template>
  <figure class="card">
    <img src="/images/details-3.webp" alt="" class="card__img" />
    <div class="p-6">
      <figcaption class="card__title">Lakeside Motel Warefront</figcaption>
      <div class="card__rating">
        <div class="rating--stars">
          <img class="icon-2" src="/images/star-s-fill 5.svg" alt="star icon" />
          <img class="icon-2" src="/images/star-s-fill 5.svg" alt="star icon" />
          <img class="icon-2" src="/images/star-s-fill 5.svg" alt="star icon" />
          <img class="icon-2" src="/images/star-s-fill 5.svg" alt="star icon" />
          <img class="icon-2" src="/images/star-s-fill 5.svg" alt="star icon" />
        </div>
        <p class="review">4.5 (1200 Reviews)</p>
      </div>
      <p class="card__text text-[#EB5757]">Non refundable</p>
      <p class="card__text text-[ #4F4F4F]">Check in: Sunday, March 18, 2022</p>
      <p class="card__text text-[ #4F4F4F]">Check out: Tuesday, March 20, 2022</p>
      <p class="card__text text-[ #4F4F4F]">2 night stay</p>
    </div>
  </figure>
</template>

<script setup></script>

<style scoped>
.card {
  @apply bg-white rounded-md;
}

.card__img {
  @apply w-full h-[18rem] object-cover;

  border-radius: 0.375rem 0.375rem 0 0;
}
.card__title {
  @apply text-[1.8rem] font-medium tracking-wide mb-1;

  color: #181818;
}
.card__rating {
  @apply mb-7 flex gap-2;
}

.rating--stars {
  @apply flex items-end;
}

.review {
  @apply text-lg leading-8 tracking-wide;
  color: var(--Gray-2, #4f4f4f);
}

.card__text {
  @apply text-xl leading-8 tracking-wide mb-2;
}
</style>
