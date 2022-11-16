<template>
  <fragment>
    <SphSectionItem
      class="sph-floor"
      v-for="(
        {
          name,
          keywords,
          imgUrl,
          navList,
          carouselList,
          recommendList,
          bigImg,
        },
        i
      ) in floorList"
      :key="i"
    >
      <!-- 顶部 -->
      <div class="sph-floor__header">
        <h3 class="sph-floor__title">{{ name }}</h3>
        <JcRadioList
          v-model="activeTabs[i]"
          class="sph-floor-tab-menu"
          @select="handleTabClick"
        >
          <JcRadioItem
            class="sph-floor-tab-item"
            :value="nav"
            v-for="(nav, j) in navList"
            :key="j"
          >
            <a>{{ nav }}</a>
          </JcRadioItem>
        </JcRadioList>
      </div>
      <!-- 活动区域 -->
      <div class="sph-floor-activity-container">
        <div class="sph-floor-activity sph-floor-activity--hot">
          <ul class="sph-floor-activity-list">
            <li
              class="sph-floor-activity-item"
              v-for="(keyword, j) in keywords"
              :key="j"
            >
              {{ keyword }}
            </li>
          </ul>
          <img class="sph-floor-activity__img" :src="imgUrl" />
        </div>
        <!-- swiper -->
        <div class="sph-floor-activity sph-floor-activity--banner">
          <Swiper
            :className="`sph-floor-banner-${i}`"
            :imgList="carouselList"
            hasPagination
            hasPrevNext
            loop
            :ref="`floorBannerSwiper${i}`"
          />
        </div>
        <!-- two row -->
        <div class="sph-floor-activity__wrap">
          <div
            class="sph-floor-activity sph-floor-activity--half-size is-underlined"
            v-for="(recommend, j) in recommendList.slice(0, 2)"
            :key="j"
          >
            <img class="sph-floor-activity__img" :src="recommend" />
          </div>
        </div>
        <!-- one row -->
        <div class="sph-floor-activity is-bordered">
          <img class="sph-floor-activity__img" :src="bigImg" />
        </div>
        <!-- two row -->
        <div class="sph-floor-activity__wrap">
          <div
            class="sph-floor-activity sph-floor-activity--half-size is-underlined"
            v-for="(recommend, j) in recommendList.slice(2, 4)"
            :key="j"
          >
            <img class="sph-floor-activity__img" :src="recommend" />
          </div>
        </div>
      </div>
    </SphSectionItem>
  </fragment>
</template>

<script>
import { Swiper, JcRadioList, JcRadioItem } from '@/components/common';
import { fetchFloorList } from '@/api';

export default {
  name: 'TheFloor',
  components: {
    Swiper,
    JcRadioList,
    JcRadioItem,
  },
  data() {
    return {
      // 视图构建
      // 导航
      floorList: [],
      activeTabs: [0, 0],
    };
  },
  methods: {
    handleTabClick(value) {},
  },
  created() {
    fetchFloorList().then((data) => {
      this.floorList = data;
      this.activeTabs[0] = data[0].navList[0];
      this.activeTabs[1] = data[1].navList[0];
    });
  },
};
</script>
