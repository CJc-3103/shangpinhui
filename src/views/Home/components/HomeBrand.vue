<template>
  <SphSectionItem class="sph-hot-brand">
    <ul class="sph-hot-brand-list">
      <li
        class="sph-hot-brand-item"
        v-for="({ imgUrl, link }, i) in brandList"
        :key="i"
      >
        <a :href="link"
          ><img class="sph-hot-brand-item__img" :src="imgUrl"
        /></a>
      </li>
    </ul>
  </SphSectionItem>
</template>

<script>
import { fetchBrandList } from '@/api';

export default {
  name: 'TheBrands',
  data() {
    return {
      // 视图构建
      brandList: [
        {
          icon: 'hot',
          title: '热卖排行',
        },
        {
          icon: 'sale',
          title: '特价排行',
        },
        {
          icon: 'new',
          title: '新品排行',
        },
      ],
    };
  },
  created() {
    fetchBrandList().then((data) => (this.brandList = data));
  },
};
</script>
