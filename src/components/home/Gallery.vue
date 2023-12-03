<template>
  <section class="gallery">
    <h2 class="gallery__title">{{ title }}</h2>
    <p class="gallery__desc">{{ description }}</p>
    <div class="gallery__figures">
      <figure class="gallery__item" v-for="(item, index) in galleryData" :key="index">
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

<script>
export default {
  name: 'HomeGallery',
  props: {
    title: String,
    description: String,
    galleryData: Array
  }
}
</script>

<style scoped>
.gallery {
  @apply flex flex-col gap-5 mt-16 pb-16 bg-white;
  position: relative;
  z-index: -1;
}

.gallery__title {
  @apply text-3xl font-semibold;
  color: #181818;
}

.gallery__desc {
  @apply text-lg font-medium leading-relaxed tracking-wide w-1/3;
  color: #333;
}
.gallery__figures {
  @apply flex gap-7;
}

.gallery__item {
  @apply flex flex-col gap-4;
  width: 25%;
}

.gallery__image {
  @apply rounded-lg;
  object-fit: cover;
}

.gallery__caption {
  @apply text-2xl font-bold;
  color: #181818;
}

.gallery__property {
  @apply text-lg font-medium transform -translate-y-4;
}
</style>
