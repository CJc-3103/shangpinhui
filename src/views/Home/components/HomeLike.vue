<template>
  <SphSectionItem class="sph-like">
    <div class="sph-like__header">
      <h3 class="sph-like__title">猜你喜欢</h3>
      <a href="javascript:;" class="sph-like__refresh">换一换</a>
    </div>
    <SphProductGroup class="sph-like-group" @click="handleClick">
      <SphProductItem
        blockClass="sph-like-item"
        v-for="({ title, imgUrl, price }, i) in likeList"
        :key="i"
        :title="title"
        :imgUrl="imgUrl"
        :price="price"
        :params="{ productId: i }"
      ></SphProductItem>
    </SphProductGroup>
  </SphSectionItem>
</template>

<script>
import { SphProductGroup, SphProductItem } from '@/components/globals';
import { fetchLikeList } from '@/api';

export default {
  name: 'TheLike',

  components: {
    SphProductGroup,
    SphProductItem,
  },

  data() {
    return {
      // 视图构建
      likeList: [
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

  methods: {
    handleClick(params) {
      console.log('params.productId', params.productId);
    },
  },
  created() {
    fetchLikeList().then((data) => (this.likeList = data));
  },
};
</script>
