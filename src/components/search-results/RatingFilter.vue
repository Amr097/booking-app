<script setup>
import useFilterationStore from '../../store/HotelsFilteration.js'

const startRanges = [1, 2, 3, 4, 5]
const props = defineProps(['isLoading', 'errMessage', 'hotelsDataSnap'])

const { handleRatingFilteration, clearRating } = useFilterationStore()
</script>

<template>
  <div class="rating">
    <h3 class="filter__title">
      Rating
      <span
        class="un-filter"
        @click.prevent="clearRating(props.isLoading, props.errMessage, props.hotelsDataSnap)"
      >
        <span
          class="text-red-500 text-xl px-[0.05rem] inline-block transform -translate-y-[0.05px] mr-1 border-solid border-b-[1px] border-red-500 hover:border-red-600 transition-all duration-150"
          >x</span
        >
        Reset</span
      >
    </h3>

    <div class="rating__main">
      <p class="w-fit text-[1.4rem] text-gray-600">Show only ratings more than</p>
      <ul class="rating__list">
        <li class="" v-for="(item, index) in startRanges" :key="index">
          <input
            class="rating-radio"
            type="radio"
            name="rating"
            :id="'rating-' + item"
            @change="
              handleRatingFilteration(item, props.isLoading, props.errMessage, props.hotelsDataSnap)
            "
          />
          <label :for="'rating-' + item" class="rating__item"
            >{{ item }}
            <img class="icon-input-2" src="/images/star-s-fill 5.svg" alt="star icon-input"
          /></label>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.rating {
  @apply shadow-md;
  border-radius: 6px;
  border: 1px solid var(--Gray-5, #e0e0e0);
  background: #fff;
  @media screen and (max-width: 53.75em) {
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
  @apply flex items-end p-2 pl-3 gap-1 text-[1.6rem] cursor-pointer hover:bg-gray-100 transition-all duration-75 relative;
  border-right: 1px solid #e0e0e0;
}

.rating-radio {
  @apply absolute opacity-0;
}

.rating-radio:checked + .rating__item {
  @apply bg-gray-100 !important;
}
</style>
