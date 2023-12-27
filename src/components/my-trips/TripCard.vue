<script setup></script>

<template>
  <div class="results__card">
    <slot name="image"></slot>

    <div class="results__card--info">
      <slot name="title"></slot>

      <div class="results__card--stars">
        <slot name="rating"></slot>
      </div>
      <ul class="results__card--list">
        <li class="results__card--item text-[#EB5757]">Non refundable</li>
        <slot name="date"></slot>
      </ul>
    </div>

    <div class="results__card--prices">
      <div class="price">
        <slot name="price"></slot>

        <slot name="btn"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.results__card {
  @apply grid p-6 gap-x-6 mt-[2rem] rounded-md bg-white;

  grid-template-columns: max-content 1fr 1fr;
  border: 1px solid #e0e0e0;
  @media screen and (width<=28.5em) {
    @apply grid-cols-2;
  }
}

.results__card--info {
  @apply grid h-full;
  grid-template-rows: repeat(2, max-content) 1fr;
}

.results__card--stars {
  @apply flex items-center mt-2;
}

.results__card--list {
  @apply self-end flex flex-col gap-3;
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
  @apply grid;
  grid-template-columns: 1fr max-content;
  margin-left: auto;
}
</style>
