<template>
  <SphSectionItem class="sph-rank">
    <JcRadioList
      v-model="activeTab"
      class="sph-rank-tab-list"
      @select="handleTabSelect"
    >
      <JcRadioItem
        class="sph-rank-tab-item"
        :value="i"
        v-for="({ icon, title }, i) in tabList"
        :key="i"
        ><a class="sph-rank-tab-item__wrap">
          <i
            class="sph-rank-tab-item__icon"
            :class="'sph-rank-tab-item__icon--' + icon"
          ></i>
          <p class="sph-rank-tab-item__title">{{ title }}</p></a
        >
      </JcRadioItem>
    </JcRadioList>

    <ul class="sph-rank-group">
      <li
        class="sph-rank-item"
        v-for="(
          { title, imgUrl, link, currency: currencyUnit, price }, i
        ) in rankItemList"
        :key="i"
      >
        <div class="sph-rank-item__img">
          <a :href="link">
            <img :src="imgUrl" />
          </a>
        </div>
        <div class="sph-rank-item__info">
          <div class="sph-rank-item__title">
            <a :href="link">{{ title }}</a>
          </div>
          <p class="sph-rank-item__price">
            定金：{{ price | currency(currencyUnit) }}
          </p>
        </div>
      </li>
    </ul>
  </SphSectionItem>
</template>

<script>
import { JcRadioList, JcRadioItem } from '@/components/common';
import { fetchRankList } from '@/api';

export default {
  name: 'TheRank',
  components: { JcRadioList, JcRadioItem },
  data() {
    return {
      // 视图构建
      tabList: [
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
      activeTab: 0,

      // rankItemList: [
      //   {
      //     title:
      //       '【官网价直降1100】Apple iPhone 8 Plus 256GB 银色 移动联通电信4G手机',
      //     pic: '/assets/images/home/1.jpg',
      //     link: '#',
      //     currency: '￥',
      //     price: 100,
      //   },
      //   {
      //     title:
      //       '【官网价直降1100】Apple iPhone 8 Plus 256GB 银色 移动联通电信4G手机',
      //     pic: '/assets/images/home/1.jpg',
      //     link: '#',
      //     currency: '￥',
      //     price: 100,
      //   },
      //   {
      //     title:
      //       '【官网价直降1100】Apple iPhone 8 Plus 256GB 银色 移动联通电信4G手机',
      //     pic: '/assets/images/home/1.jpg',
      //     link: '#',
      //     currency: '￥',
      //     price: 100,
      //   },
      //   {
      //     title:
      //       '【官网价直降1100】Apple iPhone 8 Plus 256GB 银色 移动联通电信4G手机',
      //     pic: '/assets/images/home/1.jpg',
      //     link: '#',
      //     currency: '￥',
      //     price: 100,
      //   },
      // ],
      rankItemList: [],
    };
  },
  methods: {
    handleTabSelect(value) {
      console.log('value', value);
    },
  },
  created() {
    fetchRankList().then((data) => (this.rankItemList = data));
  },
};
</script>
