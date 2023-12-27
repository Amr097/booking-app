<script setup>
import useFilterationStore from '/src/store/HotelsFilteration.js'

const props = defineProps(['hotelsDataSnap', 'isLoading', 'errMessage'])

const { handleFilteration, clearSearch } = useFilterationStore()
</script>

<template>
  <div class="filter__property">
    <h3 class="filter__title">
      Search by property name
      <span
        class="un-filter border-solid border-[1px] border-gray-300 rounded-md hover:border-gray-500 transition-all duration-150"
        @click.prevent="clearSearch(props.isLoading, props.errMessage, props.hotelsDataSnap)"
      >
        X</span
      >
    </h3>
    <div class="filter__body">
      <div class="flex bg-white gap-1 p-2 rounded-md">
        <svg fill="none" viewBox="0 0 20 21" xmlns="http://www.w3.org/2000/svg" class="icon-input">
          <path
            d="m9.1667 16.333c3.6819 0 6.6666-2.9847 6.6666-6.6666 0-3.6819-2.9847-6.6667-6.6666-6.6667-3.6819 0-6.6667 2.9848-6.6667 6.6667 0 3.6819 2.9848 6.6666 6.6667 6.6666z"
            stroke="#4F4F4F"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            d="m17.5 18-3.625-3.625"
            stroke="#4F4F4F"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
        </svg>
        <!--property input -->
        <input
          id="property-search"
          class="filter__input"
          type="text"
          placeholder="eg. Beach westpalm"
          @input.prevent="
            handleFilteration($event, props.hotelsDataSnap, props.isLoading, props.errMessage)
          "
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter__property {
  @apply flex flex-col rounded-lg shadow-md;
  @media screen and (width< 53.75em) {
    grid-column: 1 / -1;
  }
}
</style>
