<template>
  <SphSectionGroup>
    <SphSectionItem class="sph-payment-success-main">
      <div class="sph-payment-success-main__wrap">
        <div class="sph-payment-success-main__header">
          <img src="@/assets/images/right.png" />
          恭喜您，支付成功啦！
        </div>
        <div class="sph-payment-success-main__content">
          <p class="sph-payment-success-main__btn-group">
            <a
              class="sph-payment-success-main__btn sph-payment-success-main__btn-to-order"
              @click="handleLeave('MyOrder')"
              >查看订单</a
            >
            <a
              class="sph-payment-success-main__btn sph-payment-success-main__btn-to-shop"
              @click="handleLeave('Home')"
              >继续购物</a
            >
            <!-- <router-link :to="{ name: 'Order' }" replace class="btn-look"
            >查看订单</router-link
          >
          <router-link :to="'./home'" replace class="btn-go-shop"
            >继续购物</router-link
          > -->
          </p>
        </div>
      </div>
    </SphSectionItem>
  </SphSectionGroup>
</template>

<script>
import '@/styles/modules/payment-success/index.scss';

export default {
  name: 'PaymentSuccess',
  methods: {
    handleLeave(routerName) {
      this.$router.replace({ name: routerName });
    },
  },
};
</script>
