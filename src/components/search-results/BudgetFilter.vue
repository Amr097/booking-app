<script setup>
import { ref } from 'vue'
import useFilterationStore from '../../store/HotelsFilteration.js'

const props = defineProps(['isLoading', 'errMessage', 'hotelsDataSnap'])

const filterRanges = [
  { name: '0-200', min: 0, max: 200 },
  { name: '200-500', min: 200, max: 500 },
  { name: '500-1000', min: 500, max: 1000 },
  { name: '1000-2000', min: 1000, max: 2000 },
  { name: '2000-3000', min: 2000, max: 3000 }
]

const { handleBudgetFilteration, clearBudget, handleToggleBudget } = useFilterationStore()

const toggleBudget = ref({ state: false })

const customBudget = ref({ min_budget: '', max_budget: '' })

const customBudgetErr = ref({
  max_display: 'none',
  min_display: 'none'
})
</script>

<template>
  <div class="filter__budget">
    <h3 class="filter__title">
      Your budget per day
      <span
        class="un-filter"
        @click.prevent="
          clearBudget(
            props.isLoading,
            props.errMessage,
            props.hotelsDataSnap,
            customBudgetErr,
            toggleBudget,
            customBudget
          )
        "
      >
        <span
          class="text-red-500 text-xl inline-block transform -translate-y-[0.5px] px-[0.05rem] mr-1 border-solid border-b-[1px] border-red-500 hover:border-red-600 transition-all duration-150"
          >x</span
        >
        Reset</span
      >
    </h3>

    <div class="filter__ranges">
      <!--budget checkboxes -->
      <ul class="ranges__list">
        <li class="ranges__item" v-for="(item, index) in filterRanges" :key="index">
          <input
            class="ranges__check"
            type="radio"
            :id="item.name"
            name="budget"
            :disabled="toggleBudget.state"
            @change="
              handleBudgetFilteration(
                { min_budget: item.min, max_budget: item.max },
                props.hotelsDataSnap,
                props.isLoading,
                props.errMessage,
                customBudgetErr
              )
            "
          />
          <label class="ranges__label" :for="item.name">$ {{ item.min }} - $ {{ item.max }}</label>
        </li>
      </ul>
      <!--set your own budget -->
      <div class="filter__set">
        <div class="flex items-center justify-between">
          <h4 class="text-[1.4rem] text-gray-600">Set your own budget</h4>
          <label class="switch">
            <input
              type="checkbox"
              id="budget-switch"
              @change="handleToggleBudget(toggleBudget, customBudget, customBudgetErr)"
            />
            <span class="slider"></span>
          </label>
        </div>
        <!--custom budget -->
        <div
          class="budget__handler"
          @keyup.enter="
            handleBudgetFilteration(
              customBudget,
              props.hotelsDataSnap,
              props.isLoading,
              props.errMessage,
              customBudgetErr
            )
          "
        >
          <input
            type="text"
            placeholder="Min budget"
            class="budget__input"
            :disabled="!toggleBudget.state"
            v-model="customBudget.min_budget"
          />
          <span class="text-red-500 text-3xl mr-1" :style="{ display: customBudgetErr.min_display }"
            >*</span
          >
          <input
            type="text"
            placeholder="Max budget"
            class="budget__input ml-1"
            :disabled="!toggleBudget.state"
            v-model="customBudget.max_budget"
          />
          <span class="text-red-500 text-3xl" :style="{ display: customBudgetErr.max_display }"
            >*</span
          >

          <p class="budget__handler--text">Press Enter to filter</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter__budget {
  @apply shadow-md;
  border-radius: 6px;
  border: 1px solid var(--Gray-5, #e0e0e0);
  background: #fff;
  padding-bottom: 1rem;

  @media screen and (width< 53.75em) {
    grid-row: 3 / span 1;
    grid-column: 1 / span 1;
  }
}

.filter__set {
  @apply flex flex-col gap-3 justify-between px-4 shadow-sm;
}

.budget__handler {
  display: grid;
  grid-template-columns: repeat(4, max-content);
  grid-row-gap: 0.8rem;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  padding: 0.7rem 1rem;
  padding-bottom: 0.3rem;
}

.budget__handler--text {
  @apply text-[1.2rem] text-[#4f4f4f];
  grid-column: 1/-1;
}

.budget__input {
  @apply w-[10rem] h-[3.9rem] text-center rounded-md outline-none bg-white text-[1.2rem] mt-1 mr-1;

  border: 1px solid var(--Gray-5, #e0e0e0);
}

.budget__input::placeholder {
  color: #333;
}

.ranges__label {
  @apply text-gray-600 text-[1.4rem] tracking-wide;
}

.ranges__list {
  @apply px-4 py-3 flex flex-col gap-3 mb-3 mt-2;
}

.ranges__item {
  @apply flex items-center gap-2;
}
</style>
