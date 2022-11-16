<template>
  <div class="section">
    <div class="section_wrap trade">
      <h3 class="section_item title">填写并核对订单信息</h3>
      <!-- 订单信息 -->
      <div class="section_item order-info">
        <!-- 收件人 -->
        <JcCard class="addressee order-info-item underlined">
          <template #title>
            <h5 class="title">收件人信息</h5>
          </template>

          <template>
            <JcRadioList
              v-if="hasAddressee"
              v-model="activeAddressee"
              direction="column"
              class="addressee-list option-list"
            >
              <JcRadioItem
                class="addressee-item option-item"
                :value="i"
                v-for="(
                  { consignee, userAddress, phoneNum, isDefault }, i
                ) in addresseeList"
                :key="i"
              >
                <span class="option">{{ consignee }}</span>
                <p class="addressee-detail">
                  <span class="address-detail-info">
                    <span class="address">{{ userAddress }}</span>
                    <span class="phone">{{ phoneNum }}</span>
                  </span>
                  <span v-if="isDefault" class="default">默认地址</span>
                  <a
                    v-else
                    class="default btn-set-as-default"
                    @click.stop="handleSetDefaultAddressee(i)"
                    >设为默认地址</a
                  >
                </p>
              </JcRadioItem>
            </JcRadioList>
            <div v-else class="no-addressee">
              <a class="option" @click="handleAddAddressee">添加收件人</a>
            </div>
          </template>
        </JcCard>
        <!-- 支付 -->
        <JcCard class="payment order-info-item underlined">
          <template #title>
            <h5 class="title">支付方式</h5>
          </template>
          <template>
            <JcRadioList
              v-model="activePayment"
              class="payment-list option-list"
            >
              <JcRadioItem
                class="payment-item option-item"
                :value="type"
                v-for="({ type, title }, i) in paymentList"
                :key="i"
              >
                <span class="option">{{ title }}</span>
              </JcRadioItem></JcRadioList
            >
          </template>
        </JcCard>
        <!-- 送货清单 -->
        <JcCard class="delivery-list order-info-item">
          <template #title>
            <h5 class="title">送货清单</h5>
          </template>
          <template>
            <!-- 配送方式 -->
            <div class="delivery-way order-info-item">
              <h5 class="title small">配送方式</h5>
              <div class="order-info-item_content">
                <div class="delivery-way-item">
                  <span class="delivery-way-item_title">天天快递</span>
                  <span class="delivery-way-item_estimate-time"
                    >配送时间：预计8月10日（周三）09:00-15:00送达</span
                  >
                </div>
              </div>
            </div>
            <!-- 商品列表 -->
            <div class="product-detail order-info-item">
              <h5 class="title small">商品清单</h5>
              <ul class="product-list">
                <li
                  class="product-item"
                  v-for="(
                    { imgUrl, skuName, skuPrice, service, skuNum, hasStock }, i
                  ) in productList"
                  :key="i"
                >
                  <img class="img" :src="imgUrl" alt="" />
                  <div class="main">
                    <p class="title">{{ skuName }}</p>
                    <!-- service 字段没有提供值 -->
                    <span class="service">{{ service || '' }}</span>
                  </div>
                  <span class="price">{{ skuPrice | currency }}</span>
                  <span class="amount">X {{ skuNum }}</span>
                  <span class="stock-state">{{ hasStock }}</span>
                </li>
              </ul>
            </div>
          </template>
        </JcCard>
        <!-- 留言 -->
        <JcCard class="message order-info-item underlined">
          <template #title>
            <h5 class="title">买家留言：</h5>
          </template>
          <template>
            <textarea
              v-model="message"
              class="message_content"
              placeholder="建议留言前先与商家沟通确认"
            ></textarea>
          </template>
        </JcCard>
        <!-- 发票 -->
        <JcCard class="bill order-info-item">
          <template #title>
            <h5 class="title">发票信息：</h5>
          </template>
          <template>
            <div>普通发票（电子） 个人 明细</div>
          </template>
        </JcCard>
        <JcCard class="discount order-info-item">
          <template #title>
            <h5 class="title">使用优惠/抵用</h5>
          </template>
          <template>
            <div></div>
          </template>
        </JcCard>
      </div>
      <!-- 总计 -->
      <div class="section_item total-price-list">
        <div class="total-price-list_wrap">
          <div class="total-price-item">
            <span class="total-price-item_title"
              ><span class="total-product-amount">{{ totalProductAmount }}</span
              >件商品，总商品金额</span
            >
            <span class="total-price-item_total-amount">{{
              totalProductPrice | currency
            }}</span>
          </div>
          <div class="total-price-item">
            <span class="total-price-item_title">返现：</span>
            <span class="total-price-item_total-amount">{{
              cashback | currency
            }}</span>
          </div>
          <div class="total-price-item">
            <span class="total-price-item_title">运费：</span>
            <span class="total-price-item_total-amount">{{
              freight | currency
            }}</span>
          </div>
        </div>
      </div>
      <!-- 概要 -->
      <div class="section_item summary">
        <div class="total-payment">
          应付金额:　<span class="total-payment_price">{{
            totalPayment | currency
          }}</span>
        </div>
        <div class="delivery-addressee">
          寄送至:
          <span>{{ deliveryAddresseeAddress }}</span>
          收货人：<span>{{ deliveryAddresseeName }}</span>
          <span>{{ deliveryAddresseePhone }}</span>
        </div>
      </div>
      <!-- 提交 -->
      <div class="section_item action">
        <a class="btn-submit" @click="handlePlaceOrder">提交订单</a>
      </div>
    </div>
  </div>
</template>

<script>
import '@/styles/modules/trade/index.scss';
import { JcCard, JcRadioList, JcRadioItem } from '@/components/common';
import { fetchTradeInfo, submitOrder } from '@/api';
// import currency from '@/filters/currency';

export default {
  name: 'Trade',
  components: {
    JcCard,
    JcRadioList,
    JcRadioItem,
  },
  data() {
    return {
      tradeInfo: {},
      // addresseeList: [
      //   {
      //     name: '张三',
      //     address: '北京市昌平区宏福科技园综合楼6层',
      //     phone: '15010658793',
      //     isDefaultAddressee: true,
      //   },
      //   {
      //     name: '李四',
      //     address: '北京市昌平区宏福科技园综合楼6层',
      //     phone: '13590909098',
      //     isDefaultAddressee: false,
      //   },
      //   {
      //     name: '王五',
      //     address: '北京市昌平区宏福科技园综合楼6层',
      //     phone: '18012340987',
      //     isDefaultAddressee: false,
      //   },
      // ],
      activeAddressee: 0,
      paymentList: [
        {
          type: 'online',
          title: '在线支付',
        },
        {
          type: 'delivery',
          title: '货到付款',
        },
      ],
      activePayment: 'online',
      // productList: [
      //   {
      //     imgUrl: '/images/place_order/goods.png',
      //     title:
      //       'Apple iPhone 6s (A1700) 64G 玫瑰金色 移动联通电信4G手机硅胶透明防摔软壳 本色系列',
      //     service: '7天无理由退货',
      //     price: 5399,
      //     amount: 1,
      //     stockState: '有货',
      //   },
      //   {
      //     imgUrl: '/images/place_order/goods.png',
      //     title:
      //       'Apple iPhone 6s (A1700) 64G 玫瑰金色 移动联通电信4G手机硅胶透明防摔软壳 本色系列',
      //     service: '7天无理由退货',
      //     price: 5399,
      //     amount: 1,
      //     stockState: '有货',
      //   },
      // ],
      message: '',
      cashback: 0,
      freight: 0,
    };
  },
  computed: {
    //#region 结构请求结果 --
    addresseeList() {
      return this.tradeInfo?.userAddressList;
    },
    hasAddressee() {
      return this.addresseeList?.length > 0;
    },
    productList() {
      return this.tradeInfo.detailArrayList;
    },
    //#endregion --

    // 用户
    userName() {
      return this.$store.state.user.userName;
    },
    //#region 本地数据计算 --
    defaultAddresseeId() {
      let addresseeList = this.addresseeList;
      for (let i = 0; i < addresseeList?.length; i++) {
        const isDefault = addresseeList[i].isDefault;
        if (isDefault) return i;
      }
      return -1; // 未设置收件人
    },
    totalProductAmount() {
      let total = 0;
      this.productList?.forEach(({ skuNum }) => (total += skuNum));
      return total;
    },
    totalProductPrice() {
      let total = 0;
      this.productList?.forEach(
        ({ skuNum, orderPrice }) => (total += skuNum * orderPrice)
      );
      return total;
    },
    totalPayment() {
      return this.totalProductPrice - this.freight;
    },
    // 收件人
    deliveryAddresseeAddress() {
      return this.addresseeList?.[this.activeAddressee]?.userAddress || '';
    },
    deliveryAddresseeName() {
      return this.addresseeList?.[this.activeAddressee]?.consignee || '';
    },
    deliveryAddresseePhone() {
      return this.addresseeList?.[this.activeAddressee]?.phoneNum || '';
    },
    //#endregion --

    //#region 格式过滤 --
    // formattedProductPriceList() {
    //   return this.productList?.map(({ orderPrice }) => currency(orderPrice));
    // },
    // formattedTotalProductPrice() {
    //   return currency(this.totalProductPrice);
    // },
    // formattedCashback() {
    //   return currency(this.cashback);
    // },
    // formattedFreight() {
    //   return currency(this.freight);
    // },
    // formattedTotalPayment() {
    //   return currency(this.totalProductPrice - this.freight);
    // },
    //#endregion --
  },
  methods: {
    // 初始化
    init() {
      let addresseeList = this.addresseeList;
      for (let i = 0; i < addresseeList?.length; i++) {
        const isDefault = addresseeList[i].isDefault;
        if (isDefault) {
          this.activeAddressee = i;
          return;
        }
      }
    },
    // 事件处理器
    setIsDefaultAddressee(id, isDefault) {
      this.$set(this.addresseeList[id], 'isDefault', isDefault);
      // 没有提供 API
    },
    handleSetDefaultAddressee(id) {
      for (let i = 0; i < this.addresseeList.length; i++) {
        this.setIsDefaultAddressee(i, false);
      }
      this.setIsDefaultAddressee(id, true);
      // // 提交请求设置默认收件人
      // setDefaultAddressee({userId: this.userName,id: id}).then(()=> {
      //   // 请求成功后再修改本地的默认收件人
      //   for (let i = 0; i < this.addresseeList.length; i++) {
      //     this.setIsDefaultAddressee(i, false);
      //   }
      // this.setIsDefaultAddressee(id, true);
      // }).catch(err=> {
      //   console.log('设置默认收件人失败，err：',err);
      // })
    },
    handleAddAddressee() {
      console.log('添加收件人');
    },
    // 提交订单
    handlePlaceOrder() {
      const consignee = this.deliveryAddresseeName;
      // 收件人不能为空
      if (consignee) {
        const tradeInfo = this.tradeInfo;
        // console.log('tradeInfo', this.tradeInfo);
        const params = {
          consignee: consignee,
          consigneeTel: this.deliveryAddresseePhone,
          deliveryAddress: this.deliveryAddresseeAddress,
          paymentWay: this.activePayment,
          orderComment: this.message,
          orderDetailList: tradeInfo.detailArrayList,
        };
        // console.log('params', params);
        // submitOrder(tradeInfo.tradeNo, params);
        this.$router.replace({ name: 'Pay', query: { tradeNo: '145687' } });
      }
    },
  },
  created() {
    fetchTradeInfo()
      .then((data) => {
        this.tradeInfo = data;
        this.init(); // 应该在请求之后初始化
      })
      .catch((err) => {
        console.log('err', err);
      });
  },
};
</script>
