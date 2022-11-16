<template>
  <div class="swiper-container" :class="className">
    <div class="swiper-wrapper">
      <!-- 动态绑定时无法解析本地静态路径，因此先用静态路径代替 -->
      <div
        class="swiper-slide"
        v-for="({ imgUrl }, i) in imgList"
        :key="i"
        :class="{ active: activeId === i }"
      >
        <img :src="imgUrl" />
        <!-- 这种方式绑定的事件对于循环模式复制出来的元素无效 -->
        <!-- <img :src="imgUrl" @click="handleSlideClick(imgUrl, i)" /> -->
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div v-if="hasPagination" class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <template v-if="hasPrevNext">
      <div class="swiper-button-prev"><slot name="prev"></slot></div>
      <div class="swiper-button-next"><slot name="next"></slot></div>
    </template>
  </div>
</template>

<script>
import './swiper.min.css';
import './swiper.min.js';
import { nextTick } from 'vue';
import Swiper from 'swiper';

export default {
  name: 'Swiper',
  props: {
    imgList: Array,
    className: String,
    hasPagination: Boolean,
    hasPrevNext: Boolean,
    offDefaultStyle: Boolean,
    centeredSlides: Boolean,
    loop: Boolean,
    slidesPerView: {
      type: [String, Number],
      default: 1,
      validator(value) {
        return typeof value === 'number' || ['auto'].includes(value);
      },
    },
    slidesPerGroup: Number,
  },
  data() {
    return {
      activeId: 0,
    };
  },
  watch: {
    imgList: {
      immediate: true,
      handler(newList) {
        nextTick(() => {
          if (newList?.length > 0) {
            this.createSwiper(this.className);
          }
        });
      },
    },
  },
  methods: {
    createSwiper(swiperName) {
      let handleSlideClick = this.handleSlideClick;
      let options = {
        pagination: this.hasPagination
          ? { el: '.swiper-pagination', clickable: true }
          : {},
        navigation: this.hasPrevNext
          ? {
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }
          : {},
        // 这些属性无效，官网又写得垃圾
        slidesPerView: this.slidesPerView || 1,
        slidesPerGroup: this.slidesPerGroup || 1,
        // 原生 swiper 无法绑定 click 事件，需要通过 Swiper 实例绑定
        on: {
          click: function () {
            // handleSlideClick(this.clickedIndex, this.activeIndex);
            handleSlideClick(this.clickedIndex);
          },
        },
      };
      if (this.loop) options.loop = true;
      if (this.centeredSlides) {
        options = Object.assign(options, {
          centeredSlides: true,
          // loopAdditionalSlides: 100,
        });
      }
      // console.log('options', options);
      const swiper = new Swiper('.swiper-container', options);
    },
    handleSlideClick(clickedIndex) {
      if (clickedIndex) {
        this.$emit('slideClick', clickedIndex);
      }
      this.activeId = clickedIndex;
      // console.log('clickedIndex', clickedIndex);
      // this.$emit('slideClick', clickedIndex, activeIndex);
    },
  },
  created() {
    if (!this.offDefaultStyle) {
      // import('./swiper.min.css');
    }
  },
};
</script>
