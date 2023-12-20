<template>
  <div :class="props.wrapper">
    <div class="lds-ring">
      <div
        :style="{
          border: 'solid 2px rgb(59 130 246)',
          borderColor: 'rgb(59 130 246) transparent transparent transparent'
        }"
      ></div>
      <div
        :style="{
          border: 'solid 2px rgb(59 130 246)',
          borderColor: 'rgb(59 130 246) transparent transparent transparent'
        }"
      ></div>
      <div
        :style="{
          border: 'solid 2px rgb(59 130 246)',
          borderColor: 'rgb(59 130 246) transparent transparent transparent'
        }"
      ></div>
      <div
        :style="{
          border: 'solid 2px  rgb(59 130 246)',
          borderColor: 'rgb(59 130 246) transparent transparent transparent'
        }"
      ></div>
    </div>
    <p :class="props.text">Loading search results</p>
    <div id="wave">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['wrapper', 'text'])
</script>

<style scoped>
div#wave {
  position: relative;
  text-align: center;
  display: flex;
  gap: 2px;
}

div#wave .dot {
  display: inline-block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgb(59 130 246);
  animation: wave 1.1s linear infinite;
}

div#wave .dot:nth-child(2) {
  animation-delay: -0.9s;
}

div#wave .dot:nth-child(3) {
  animation-delay: -0.7s;
}

@keyframes wave {
  0%,
  60%,
  100% {
    transform: initial;
  }

  30% {
    transform: translateY(-10px);
  }
}
</style>
