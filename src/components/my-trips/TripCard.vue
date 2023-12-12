<script setup></script>

<template>
  <div class="results__card">
    <img src="/public/images/v-greece.webp" alt="" class="result__card--img" />
    <div class="results__card--info">
      <h3 class="results__card--title">Lakeside Motel Warefront</h3>
      <div class="results__card--stars">
        <img class="icon-2" src="/public/images/star-s-fill 5.svg" alt="star icon" />
        <img class="icon-2" src="/public/images/star-s-fill 5.svg" alt="star icon" />
        <img class="icon-2" src="/public/images/star-s-fill 5.svg" alt="star icon" />
        <img class="icon-2" src="/public/images/star-s-fill 5.svg" alt="star icon" />
        <img class="icon-2" src="/public/images/star-s-fill 5.svg" alt="star icon" />
        <p class="results__card--review">480 (1200 reviews)</p>
      </div>
      <ul class="results__card--list">
        <li class="results__card--item text-[#EB5757]">Non refundable</li>
        <li class="results__card--item text-[#4F4F4F]">Check in: Sunday, March 18, 2022</li>
        <li class="results__card--item text-[#4F4F4F]">Check out: Tuesday, March 20, 2022</li>
        <li class="results__card--item text-[#4F4F4F]">2 night stay</li>
      </ul>
    </div>

    <div class="results__card--prices">
      <div class="price">
        <p class="price--red">1300 USD</p>
        <p class="price--black">900 USD</p>
        <p class="taxes">Includes taxes and fees</p>
        <router-link to="/" class="blue__btn mt-5 col-span-full">View trip details</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.results__card {
  @apply grid p-6 gap-x-6 mt-[2rem] rounded-md bg-white;

  grid-template-columns: max-content 1fr 1fr;
  border: 1px solid #e0e0e0;
}
.result__card--img {
  @apply rounded-md;
  width: 28.5rem;
  height: 20rem;
  object-fit: cover;
}
.results__card--info {
  @apply grid h-full;
  grid-template-rows: repeat(2, max-content) 1fr;
}
.results__card--title {
  @apply text-3xl font-medium tracking-wide;
  color: #1a1a1a;
}
.results__card--stars {
  @apply flex items-center mt-2;
}
.results__card--review {
  @apply text-lg leading-10;
  color: #4f4f4f;
}

.results__card--list {
  @apply self-end flex flex-col gap-3;
}

.results__card--item {
  @apply text-xl leading-9 tracking-wide;
}

.results__card--prices {
  @apply grid items-end justify-end;
}
.discount--ad {
  @apply self-start text-white w-fit rounded-md text-lg leading-7 tracking-wide py-1 px-2;
  margin-left: auto;
  background-color: #eb5757;
}
.discount--percent {
  @apply text-white text-lg font-medium leading-7 tracking-wide rounded-md w-fit py-1 px-2 text-right;
  margin-left: auto;
  background-color: #219653;
}
.price {
  @apply grid gap-x-3;
  grid-template-columns: 1fr max-content;
  margin-left: auto;
}

.price--red {
  @apply text-lg font-medium tracking-wide line-through text-right;
  color: #eb5757;
}
.price--black {
  @apply text-2xl font-medium tracking-wide text-right;
  color: #333;
}

.taxes {
  grid-column: 1/-1;
  justify-self: end;
  margin-top: 0.3rem;
}
</style>
