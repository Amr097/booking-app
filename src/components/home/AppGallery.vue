<script setup>
const props = defineProps(['title', 'description', 'galleryData'])
</script>

<template>
  <section class="gallery">
    <h2 class="gallery__title">{{ props.title }}</h2>
    <p class="gallery__desc">{{ props.description }}</p>
    <div class="gallery__figures">
      <figure class="gallery__item" v-for="(item, index) in props.galleryData" :key="index">
        <img
          :src="item.image"
          alt="item.name"
          class="gallery__image"
          :style="{ height: item.height }"
        />
        <figcaption class="gallery__caption">
          {{ item.name }}
        </figcaption>
        <figcaption class="gallery__property">{{ item.properties }}</figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.gallery {
  @apply flex flex-col gap-5 mt-16 pb-16 bg-white;
  position: relative;
  z-index: -5;
}

.gallery__title {
  @apply text-3xl font-semibold;
  color: #181818;
}

.gallery__desc {
  @apply text-lg font-medium leading-relaxed tracking-wide w-9/12 sm:w-1/3;
  color: #333;
}
.gallery__figures {
  @apply flex gap-7 flex-wrap sm:flex-nowrap;
}

.gallery__item {
  @apply flex flex-col gap-4 w-[47.5%] sm:w-1/4;
}

.gallery__image {
  @apply rounded-lg shadow-md bg-cover cursor-pointer hover:scale-[1.02] hover:shadow-lg;
  transition: all 150ms ease-in-out;
}

.gallery__caption {
  @apply text-2xl font-bold;
  color: #181818;
}

.gallery__property {
  @apply text-lg font-medium transform -translate-y-4;
}
</style>
