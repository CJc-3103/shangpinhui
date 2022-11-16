<template>
  <SphSectionGroup>
    <SphSectionItem class="sph-pay-main">
      <!-- 顶部提示 -->
      <div class="sph-pay-main__tips">
        <div class="sph-order-tips">
          <i class="sph-order-tips__icon"></i>
          <span class="sph-order-tips__title"
            >订单提交成功，请您及时付款，以便尽快为您发货~~</span
          >
        </div>
        <div class="sph-payment-tips">
          <span
            >请您在提交订单<em class="sph-payment-tips__time-limit sph-em"
              >4小时</em
            >之内完成支付，超时订单会自动取消。订单号：<em>{{
              tradeNo
            }}</em></span
          >
          <!-- totalPrice | currency('$',3) 传参示例 -->
          <span class="sph-payment-tips__total-price"
            >应付金额：<em class="sph-payment-tips__price">{{
              totalPrice | currency
            }}</em></span
          >
        </div>
      </div>
      <!-- 重要信息 -->
      <div class="sph-pay-main__info-container">
        <div class="sph-important-info">
          <h4 class="sph-important-info__title">重要说明：</h4>
          <ol class="sph-important-info__list sph-platform-info">
            <li>
              尚品汇商城支付平台目前支持<span
                class="sph-pay-main__support-payment"
                >支付宝</span
              >支付方式。
            </li>
            <li>其它支付渠道正在调试中，敬请期待。</li>
            <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
          </ol>
        </div>
        <div class="sph-important-info">
          <h4 class="sph-important-info__title">
            支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）
          </h4>
          <ul class="sph-important-info__list sph-account-info">
            <li>支付帐号：11111111</li>
            <li>密码：111111</li>
            <li>支付密码：111111</li>
          </ul>
        </div>
      </div>
      <!-- 支付方式 -->
      <div class="sph-pay-main__payment-detail">
        <JcCard
          blockClass="sph-payment-way"
          class="sph-online-payment-platform underlined"
        >
          <template #header>
            <h5 class="sph-payment-way__title">支付平台</h5>
          </template>

          <JcRadioList v-model="selectedPaymentL" class="sph-payment-way__list">
            <JcRadioItem
              class="sph-payment-way__item"
              :value="type"
              v-for="({ title, type, img }, i) in paymentOnlinePlatformList"
              :key="i"
            >
              <a class="sph-payment-way__item-wrap" href="javascript:void(0);">
                <img :src="img" :alt="title || ''"
              /></a>
            </JcRadioItem>
          </JcRadioList>
        </JcCard>

        <JcCard
          blockClass="sph-payment-way"
          class="sph-online-payment-bank underlined"
        >
          <template #header>
            <h5 class="sph-payment-way__title">支付网银</h5>
          </template>

          <JcRadioList v-model="selectedPaymentL" class="sph-payment-way__list">
            <JcRadioItem
              class="sph-payment-way__item"
              :value="type"
              v-for="({ title, type, img }, i) in paymentOnlineBankList"
              :key="i"
            >
              <a class="sph-payment-way__item-wrap" href="javascript:void(0);">
                <img :src="img" :alt="title || ''"
              /></a>
            </JcRadioItem>
          </JcRadioList>
        </JcCard>

        <div class="sph-pay-main__submit-wrap">
          <a class="sph-pay-main__btn-submit" @click="handlePay">立即支付</a>
        </div>

        <JcCard blockClass="sph-payment-way" class="other-payment-way">
          <template #header>
            <h5 class="sph-payment-way__title">其他支付方式</h5>
          </template>
          <ul class="sph-payment-way__list">
            <li
              class="sph-payment-way__item"
              v-for="(title, i) in otherPaymentList"
              :key="i"
            >
              <a
                class="sph-payment-way__item-wrap"
                href="javascript:void(0);"
                >{{ title }}</a
              >
            </li>
          </ul>
        </JcCard>
      </div>
    </SphSectionItem>
  </SphSectionGroup>
</template>

<script>
import '@/styles/modules/pay/index.scss';
import { JcRadioList, JcRadioItem, JcCard } from '@/components/common';
import { fetchPayInfo, fetchPaymentStatus } from '@/api';
import QRCode from 'qrcode';
import apiCode from '@/api/apiCode';

export default {
  name: 'Pay',
  components: {
    JcCard,
    JcRadioList,
    JcRadioItem,
  },
  data() {
    return {
      paymentOnlinePlatformList: [
        {
          title: '支付宝',
          type: 'zfb',
          img: require('@/assets/images/pay/pay2.jpg'),
        },
        {
          title: '微信支付',
          type: 'weixin',
          img: require('@/assets/images/pay/pay3.jpg'),
        },
      ],
      paymentOnlineBankList: [
        {
          title: '招商银行',
          type: 'zhaoshangBank',
          img: require('@/assets/images/pay/pay10.jpg'),
        },
        {
          title: '邮储银行',
          type: 'youchuBank',
          img: require('@/assets/images/pay/pay11.jpg'),
        },
        {
          title: '交通银行',
          type: 'jiaotongBank',
          img: require('@/assets/images/pay/pay12.jpg'),
        },
        {
          title: '农业银行',
          type: 'nongyeBank',
          img: require('@/assets/images/pay/pay13.jpg'),
        },
        {
          title: '广发银行',
          type: 'guangfaBank',
          img: require('@/assets/images/pay/pay14.jpg'),
        },
        {
          title: '兴业银行',
          type: 'xingyeBank',
          img: require('@/assets/images/pay/pay15.jpg'),
        },
        {
          title: '光大银行',
          type: 'guangdaBank',
          img: require('@/assets/images/pay/pay16.jpg'),
        },
        {
          title: '中信银行',
          type: 'zhongxinBank',
          img: require('@/assets/images/pay/pay17.jpg'),
        },
        {
          title: '浦发银行',
          type: 'pufaBank',
          img: require('@/assets/images/pay/pay18.jpg'),
        },
        {
          title: '平安银行',
          type: 'pinganBank',
          img: require('@/assets/images/pay/pay19.jpg'),
        },
        {
          title: '民生银行',
          type: 'minshengBank',
          img: require('@/assets/images/pay/pay20.jpg'),
        },
        {
          title: '北京银行',
          type: 'beijingBank',
          img: require('@/assets/images/pay/pay21.jpg'),
        },
        {
          title: '北京农商行',
          type: 'beijingnongshangBank',
          img: require('@/assets/images/pay/pay22.jpg'),
        },
      ],
      otherPaymentList: ['微信支付', '中国银联'],
      totalPrice: '',
      payUrl: '',
      // 已选的支付方式
      selectedPaymentL: '',
      // selectedPaymentPlatform: '',
      // selectedPaymentBank: '',
      // 支付状态查询 timer
      timer: null,
      result: '', // 支付成功的结果
    };
  },
  computed: {
    tradeNo() {
      return this.$route.query.tradeNo;
    },
  },
  methods: {
    // handleSelectPayment(paymentType) {
    //   switch (paymentType) {
    //     case 'platform':
    //       this.selectedPaymentBank = '';
    //       break;
    //     case 'bank':
    //       this.selectedPaymentPlatform = '';
    //       break;
    //     default:
    //       break;
    //   }
    // },

    // 这里的逻辑还可以继续优化
    //   result 一开始是空字符串，而轮询是 1 秒一次，若还未到一秒就关闭会显示支付尚未完成，
    //   虽然在 1 秒内完成支付确实不太可能，但从逻辑上来看还是留了一个漏洞，最好能配合后端的完整状态码，并将其中某个状态作为初始状态
    handlePay() {
      let qrcode = null;
      QRCode.toDataURL(this.payUrl).then((result) => {
        qrcode = result;

        const options = {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          center: true,
          showCancelButton: true,
          cancelButtonText: '支付遇见问题',
          confirmButtonText: '支付已完成',
          showClose: false,
        };
        this.$alert(`<img src=${qrcode} />`, '请', {
          ...options,
          callback: (action) => {
            let type = '',
              message = '';
            if (action === 'confirm') {
              console.log('this.result', this.result);
              console.log('this.result', typeof this.result);
              console.log('apiCode.pending', apiCode.pending);
              if (this.result === apiCode.pending) {
                type = 'info';
                message = '支付处理中，请稍后';
              } else if (this.result !== apiCode.success) {
                type = 'error';
                message = '支付尚未完成，请重试';
              }
            } else if (action === 'cancel') {
              type = 'info';
              message = '支付遇到问题，已取消支付';
            }
            this.$message({
              type,
              message,
            });
          },
        });

        // 长轮询支付状态
        if (!this.timer) {
          this.timer = setInterval(() => {
            fetchPaymentStatus(this.tradeNo).then((data) => {
              clearInterval(this.timer);
              this.timer = null;
              this.result = data.code;
              if (this.result === apiCode.success) {
                this.$msgbox.close();
                this.$message({
                  type: 'success',
                  message: '支付已完成，将在 3 秒内跳转',
                });
                setTimeout(() => {
                  this.$router.replace({ name: 'PaymentSuccess' });
                }, 3000);
              }
            });
          }, 1000);
        }
      });
    },
  },
  created() {
    fetchPayInfo(this.tradeNo).then((data) => {
      this.totalPrice = data.totalPrice;
      this.payUrl = data.payUrl;
    });
  },
};
</script>
