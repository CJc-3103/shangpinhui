<template>
  <div class="sph-like-container">
    <h4 class="sph-like-container__header">猜你喜欢</h4>

    <SphProductGroup class="sph-like-group" @click="handleClick">
      <SphProductItem
        blockClass="sph-like-item"
        v-for="({ title, imgUrl, price, feedback }, i) in likeList"
        :key="i"
        :title="title"
        :imgUrl="imgUrl"
        :price="price"
        :params="{ productId: i }"
      >
        <template #extra
          ><span class="sph-like-item__comment"
            >已有{{ feedback }}人评价</span
          ></template
        ></SphProductItem
      >
    </SphProductGroup>
  </div>
</template>

<script>
import '../theme-chalk/globals/the-like.scss';
import { SphProductGroup, SphProductItem } from './SphProduct';
import { fetchLikeRecommendList } from '@/api';

export default {
  name: 'TheLike',

  components: {
    SphProductGroup,
    SphProductItem,
  },

  props: {
    productCount: Number,
  },

  data() {
    return {
      likeList: [],
    };
  },

  methods: {
    handleClick(params) {
      console.log('params', params);
    },
  },

  created() {
    fetchLikeRecommendList(this.productCount).then(
      (data) => (this.likeList = data)
    );
  },
};
</script>
