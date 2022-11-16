<template>
  <SphSectionGroup class="sph-home-main">
    <MainTop />
    <HomeRecommend />
    <HomeRank />
    <HomeLike />
    <HomeFloor />
    <HomeBrand />
  </SphSectionGroup>
</template>

<script>
import '@/styles/modules/home/index.scss';

import {
  MainTop,
  HomeRecommend,
  HomeRank,
  HomeLike,
  HomeFloor,
  HomeBrand,
} from './components';

export default {
  name: 'Home',
  components: {
    MainTop,
    HomeRecommend,
    HomeRank,
    HomeLike,
    HomeFloor,
    HomeBrand,
  },
};
</script>
