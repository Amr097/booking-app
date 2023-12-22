<script setup>
import useFilterationStore from '../../store/HotelsFilteration.js'

const startRanges = [1, 2, 3, 4, 5]
const props = defineProps(['isLoading', 'errMessage', 'hotelsDataSnap'])

const { handleRatingFilteration } = useFilterationStore()
</script>

<template>
  <div class="rating">
    <h3 class="filter__title">Rating</h3>

    <div class="rating__main">
      <p class="w-fit text-[1.4rem] text-gray-600">Show only ratings more than</p>
      <ul class="rating__list">
        <li
          class="rating__item"
          v-for="(item, index) in startRanges"
          :key="index"
          @click="
            handleRatingFilteration(item, props.isLoading, props.errMessage, props.hotelsDataSnap)
          "
        >
          <p class="mx-1">{{ item }}</p>
          <img class="icon-input-2" src="/images/star-s-fill 5.svg" alt="star icon-input" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.rating {
  border-radius: 6px;
  border: 1px solid var(--Gray-5, #e0e0e0);
  background: #fff;
  @media screen and (width< 53.75em) {
    grid-row: 3 / span 1;
    grid-column: 3 / span 1;
    height: min-content;
  }
}

.rating__main {
  @apply flex flex-col gap-4 p-5;
}

.rating__list {
  @apply flex w-fit items-start;
  border-radius: 0px 5px 5px 0px;
  border: 1px solid var(--Gray-5, #e0e0e0);
  background: #fff;
}

.rating__item {
  @apply flex items-end p-2 text-[1.6rem] cursor-pointer hover:bg-gray-100 transition-all duration-75;
  border-right: 1px solid #e0e0e0;
}
</style>
