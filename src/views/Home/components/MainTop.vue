<template>
  <SphSectionItem class="sph-main-top">
    <div class="sph-banner-container">
      <!--banner轮播-->
      <!-- 用 swiper@5.4.5 版本，vue 插件版本需要额外安装依赖，但找不到依赖包名列表 -->
      <Swiper
        className="sph-banner-swiper"
        :imgList="bannerList"
        hasPagination
        hasPrevNext
        loop
        ref="bannerSwiper"
      />
      <!-- :slides-per-view="3" -->
      <!-- <Swiper @swiper="onSwiper" @slideChange="onSlideChange">
          <Swiper-Slide v-for="({ imgUrl }, i) in bannerList" :key="i"
            ><img :src="imgUrl"
          /></Swiper-Slide>
        </Swiper> -->
    </div>

    <div class="sph-right-panel">
      <div class="sph-news-container">
        <h4 class="sph-news-header">
          <em class="sph-news-header__title">尚品汇快报</em>
          <a href="javascript(0);"
            ><span class="sph-news-header__more">更多 ></span></a
          >
        </h4>
        <ul class="sph-news-list unstyled">
          <li
            class="sph-news-item"
            v-for="({ newsType, newsTitle }, i) in newsList"
            :key="i"
          >
            <span class="sph-news-item__inner">[{{ newsType }}]</span
            >{{ newsTitle }}
          </li>
        </ul>
      </div>
      <ul class="sph-life-service-group">
        <li
          class="sph-life-service-item"
          v-for="({ name, title }, i) in lifeServiceList"
          :key="i"
        >
          <i
            class="sph-life-service-item__icon"
            :class="`sph-life-service-item__icon--${name}`"
          ></i>
          <span class="sph-life-service-item__title">{{ title }}</span>
        </li>
      </ul>
      <div class="sph-small-ad">
        <a :href="topSmallAd.url"> <img :src="topSmallAd.imgUrl" /></a>
      </div>
    </div>
  </SphSectionItem>
</template>

<script>
import { mapState } from 'vuex';
import { Swiper } from '@/components/common';

export default {
  name: 'MainTop',
  components: {
    Swiper,
  },
  data() {
    return {
      lifeServiceList: [
        {
          name: 'phone-bill',
          title: '话费',
        },
        {
          name: 'passenger-ticket',
          title: '机票',
        },
        {
          name: 'movie-ticket',
          title: '电影票',
        },
        {
          name: 'game',
          title: '游戏',
        },
        {
          name: 'lottery-ticket',
          title: '彩票',
        },
        {
          name: 'filling-station',
          title: '加油站',
        },
        {
          name: 'hotel',
          title: '酒店',
        },
        {
          name: 'railway-ticket',
          title: '火车票',
        },
        {
          name: 'crowd-funding',
          title: '众筹',
        },
        {
          name: 'financial-investment',
          title: '理财',
        },
        {
          name: 'git-card',
          title: '礼品卡',
        },
        {
          name: 'iou',
          title: '白条',
        },
      ],
      newsList: [
        {
          newsType: '特惠',
          newsTitle: '备战开学季 全民半价购数码',
        },
        {
          newsType: '公告',
          newsTitle: '备战开学季 全民半价购数码',
        },
        {
          newsType: '特惠',
          newsTitle: '备战开学季 全民半价购数码',
        },
        {
          newsType: '公告',
          newsTitle: '备战开学季 全民半价购数码',
        },
        {
          newsType: '特惠',
          newsTitle: '备战开学季 全民半价购数码',
        },
      ],
    };
  },
  computed: {
    ...mapState({
      bannerList: (state) => state.home.bannerList,
      topSmallAd: (state) => state.home.topSmallAd,
    }),
  },
  methods: {
    onSwiper() {},
    onSlideChange() {},
  },
  created() {
    this.$store.dispatch('home/FETCH_TOP_AD');
  },
  updated() {},
};
</script>
