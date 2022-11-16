<template>
  <SphSectionGroup>
    <SphSectionItem class="sph-add-cart-result">
      <h3 class="sph-add-cart-result__header">
        <i class="sui-icon icon-pc-right"></i>商品已成功加入购物车！
      </h3>

      <div class="sph-add-cart-result__body">
        <div class="sph-add-cart-result__content">
          <div class="sph-add-cart-result__img">
            <img :src="productInfo.imgUrl" />
          </div>
          <div class="sph-add-cart-result__info">
            <p class="sph-add-cart-result__title">
              {{ productInfo.title }}
            </p>
            <p class="sph-add-cart-result__attr">
              <span
                v-for="({ title, value }, i) in productInfo.selectedAttrList"
                :key="i"
                >{{ title }}：{{ value }}&nbsp;</span
              >
              数量：{{ skuNum }}
            </p>
          </div>
        </div>

        <div class="sph-add-cart-result__action">
          <!-- <router-link class="sph-btn sph-btn--detail" :to="`/detail/${skuId}`"
            >查看商品详情</router-link
          > -->
          <!-- <router-link class="sph-btn sph-btn--cart" to="/cart"
            >去购物车结算 &gt;
          </router-link> -->
          <a class="sph-btn sph-btn--detail" @click="handleToDetail"
            >查看商品详情</a
          >
          <a class="sph-btn sph-btn--cart" @click="handleToCart"
            >去购物车结算 &gt;</a
          >
        </div>
      </div>
    </SphSectionItem>
  </SphSectionGroup>
</template>

<script>
import '@/styles/modules/add-cart-result/index.scss';
import { mapState } from 'vuex';

export default {
  name: 'AddCartResult',
  data() {
    return {
      returnToDetail: false,
      isLeaving: false,
    };
  },
  computed: {
    productInfo() {
      return JSON.parse(sessionStorage.getItem('productInfo'));
    },
    skuId() {
      return this.productInfo.skuId;
    },
    skuNum() {
      return this.$route.params.skuNum;
    },
    ...mapState('history', ['currentStateKey', 'isPopStateBack']),
  },
  // 导航守卫中使用 replace 无法替换记录
  // beforeRouteLeave(to, from, 42) {
  //   if (from.name === 'AddCartResult' && to.name !== 'AddCartResult') {
  //     next();
  //     // 可以返回，但无法删除，有些时候虽然路由变了，但内容没有刷新
  //     this.$router.replace({ path: to.path });
  //   } else {
  //     next();
  //   }
  // },
  // 只能侦听路由进入时，无法侦听离开
  // watch: {
  //   $route: {
  //     immediate: true,
  //     handler(to) {
  //       console.log('to', to);
  //       // 离开当前路由时替换路由记录，进入时不需要
  //       // if (to.name !== 'AddCartResult') {
  //       //   this.$router.replace({ path: to.path });
  //       // }
  //     },
  //   },
  // },
  beforeRouteLeave(to, from, next) {
    console.log('beforeRouteLeave triggered');
    let currentStateKey = this.currentStateKey;
    const commit = this.$store.commit;
    commit('addCartRouteStatus/SET_TO_ROUTE_NAME', to.name);
    commit('addCartRouteStatus/SET_TO_ROUTE_PATH', to.path);
    let isToDetailByInput = false; // 是否通过地址栏进入特定页，而非 back
    // 记录离开过渡页时的方向，因为此时可能是通过点击链接或按钮离开的
    if (to.name !== 'Detail') {
      commit('history/SET_POP_STATE', false);
      currentStateKey -= 1;
    } else {
      // commit('history/SET_POP_STATE', true); // 由于需要将去往特定页的所有导航都限制为 back，因此统一在 popstate 事件中进行判定，此处不需要再单独判定
      isToDetailByInput = !this.isPopStateBack;
      currentStateKey += 1;
    }
    console.log('this.isPopStateBack', this.isPopStateBack);
    console.log('isToDetailByInput', isToDetailByInput);
    commit('history/SET_CURRENT_STATE_KEY', currentStateKey);
    commit('history/SET_RESULT_VIEW_STATE_KEY', currentStateKey);

    // to.name !== 'Detail'
    //   ? next({ path: to.path, replace: true })
    //   : isToDetailByInput
    //   ? this.$router.go(-2)
    //   : next();
    // next({ ...to, replace: true });
    next();
    // to.name !== 'Detail'
    //   ? next({ path: to.path, replace: true })
    //   : this.$router.back();
  },
  methods: {
    handleToDetail() {
      this.$router.go(-1);
      // this.$router.replace({ name: 'Detail', params: { skuId: this.skuId } });
    },
    handleToCart() {
      this.$router.replace({ name: 'Cart' });
    },
  },
  created() {
    // this.isLeaving = false;
    // this.returnToDetail = false;
  },
};
</script>
