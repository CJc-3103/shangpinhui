<template>
  <SphSectionItem class="sph-recommend">
    <ul class="sph-recommend-list">
      <li class="sph-recommend-item sph-recommend-item--head">
        <img src="@/assets/images/home/clock.png" />
        <h3 class="sph-recommend-item__title">今日推荐</h3>
      </li>
      <li
        class="sph-recommend-item"
        v-for="({ imgUrl }, i) in recommendList"
        :key="i"
      >
        <a href="javascript(0);"> <img :src="imgUrl" /></a>
      </li>
    </ul>
  </SphSectionItem>
</template>

<script>
import { fetchRecommendList } from '@/api';

export default {
  name: 'TheRecommend',
  data() {
    return {
      recommendList: [],
    };
  },
  created() {
    fetchRecommendList().then((data) => (this.recommendList = data));
  },
};
</script>
