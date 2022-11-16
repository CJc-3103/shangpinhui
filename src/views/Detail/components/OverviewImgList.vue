<template>
  <Swiper
    className="picture_overview"
    :imgList="imgList"
    hasPrevNext
    offDefaultStyle
    :slidesPerView="4"
    :slidesPerGroup="4"
    ref="overviewSwiper"
    @slideClick="handleSelect"
  >
    <template #prev>&lt;</template>
    <template #next>&gt;</template>
  </Swiper>
</template>

<script>
import { Swiper } from '@/components/common';

export default {
  name: 'OverviewImgList',
  components: { Swiper },
  props: {
    imgList: Array,
  },
  methods: {
    handleSelect(clickedIndex, activeIndex) {
      this.$emit('select', clickedIndex, activeIndex);
    },
  },
};
</script>
