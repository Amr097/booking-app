<script setup>
import { ref } from 'vue'
import useFilterationStore from '../../store/HotelsFilteration.js'

const { sortResults } = useFilterationStore()

const props = defineProps(['isLoading', 'errMessage', 'hotelsDataSnap'])

const sortOptions = [
  { id: 'price_low_high', title: 'Price: Low to High' },
  { id: 'price_high_low', title: 'Price: High to Low' },
  { id: 'rating_low_high', title: 'Rating: Low to High' },
  { id: 'rating_high_low', title: 'Rating: High to Low' }
]

const selectedSortOption = ref('')
</script>

<template>
  <div class="ml-auto relative">
    <select
      class="results__view--sort"
      v-model="selectedSortOption"
      @change="
        sortResults(selectedSortOption, props.isLoading, props.errMessage, props.hotelsDataSnap)
      "
    >
      <option value="">Recommended</option>
      <option v-for="(item, index) in sortOptions" :key="index" :value="item.id">
        {{ item.title }}
      </option>
    </select>
    <span>Sort by</span>
  </div>
</template>

<style scoped>
.results__view--sort {
  @apply text-[1.4rem] rounded-lg bg-white px-6 pb-2 pt-9 outline-none;

  border: 1px solid #bdbdbd;
}

.results__view--sort option {
  @apply flex flex-col text-2xl;
}
.results__view--head span {
  @apply absolute text-[1.2rem] text-[#828282] left-[2rem] top-[0.4rem];
}
</style>
