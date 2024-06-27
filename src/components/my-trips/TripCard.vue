<script setup>
import useUserStore from '../../store/User.js'

const { deleteTrip } = useUserStore()

const props = defineProps(['id', 'index'])
</script>

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
    <!-- /////DELETE TRIP////// -->
    <div class="delete-trip">
      <input type="checkbox" :id="`delete-${props.index}`" class="del-checkbox" />
      <label
        :for="`delete-${props.index}`"
        class="cursor-pointer text-2xl font-medium hover:text-red-500"
        >X</label
      >
      <div class="wrapper">
        <div class="msg__container">
          <p class="text-2xl font-bold">Cancel reservation?</p>
          <p class="inline-block text-xl pb-3">Are you sure you want to cancel this trip?</p>
          <label class="no" :for="`delete-${props.index}`">No</label>
          <label
            class="yes"
            :for="`delete-${props.index}`"
            @click="deleteTrip(props.id, props.index)"
            >Yes</label
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.results__card {
  @apply grid p-6 gap-x-6 mt-[2rem] rounded-md bg-white relative;

  grid-template-columns: max-content 1fr 1fr;
  border: 1px solid #e0e0e0;
  @media screen and (max-width: 28.5em) {
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

.delete-trip {
  @apply absolute right-7 top-0 flex items-end  flex-col;
}

.del-checkbox {
  @apply pointer-events-none opacity-0;
}

.wrapper {
  @apply bg-white  scale-y-0;
  transform-origin: top;

  visibility: hidden;
}

.del-checkbox:checked ~ .wrapper {
  @apply scale-y-100 transition-all duration-100 ease-in-out;
  visibility: visible;
}

.msg__container {
  @apply grid grid-cols-2 grid-rows-2 border shadow-md rounded-md mt-2 px-4 py-3;
}

.msg__container p {
  @apply col-span-full;
}

.msg__container label {
  @apply px-6 py-3 mt-2 cursor-pointer;
}
.msg__container .no {
  @apply justify-self-end mr-2 text-white bg-gray-400 rounded-md hover:bg-gray-500;
}

.msg__container .yes {
  @apply justify-self-start ml-2 bg-red-400 text-white rounded-md hover:bg-red-500;
}
</style>
