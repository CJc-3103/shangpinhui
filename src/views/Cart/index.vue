<template>
  <SphSectionGroup>
    <SphSectionItem class="sph-cart">
      <table class="sph-cart-table">
        <!-- 标题 -->
        <caption class="sph-cart__caption">
          <h4 class="sph-cart__title">全部商品</h4>
        </caption>
        <!-- 表头 -->
        <thead class="sph-cart__header">
          <tr class="sph-cart-row">
            <th class="sph-cart-col sph-cart-col--check">全部</th>
            <th class="sph-cart-col sph-cart-col--info">商品</th>
            <th class="sph-cart-col">单价（元）</th>
            <th class="sph-cart-col">数量</th>
            <th class="sph-cart-col">小计（元）</th>
            <th class="sph-cart-col">操作</th>
          </tr>
        </thead>
        <!-- 产品列表 -->
        <tbody class="sph-cart__content">
          <tr
            class="sph-cart-row"
            v-for="(
              { skuId, isChecked, imgUrl, title, skuName, skuNum, skuPrice }, i
            ) in cartList"
            :key="i"
          >
            <td class="sph-cart-col sph-cart-col--check">
              <input
                type="checkbox"
                :checked="isChecked"
                @change="handleProductChecked(skuId, i, $event.target.checked)"
              />
            </td>
            <td class="sph-cart-col sph-cart-col--info">
              <div class="sph-product-info">
                <div class="sph-product-info__main">
                  <img class="sph-product-info__img" :src="imgUrl" alt="主图" />
                  <p class="sph-product-info__title">{{ title || skuName }}</p>
                </div>
                <span class="sph-product-attr-list">
                  <span class="sph-product-attr">{{ skuName }}</span>
                </span>
              </div>
            </td>
            <td class="sph-cart-col sph-cart-col--center">
              {{ skuPrice | currency }}
            </td>
            <td class="sph-cart-col sph-cart-col--center">
              <a
                class="sph-action-item is-number is-btn is-btn-minus"
                @click="handleAmountMinus(skuId, i)"
                >-</a
              >
              <input
                class="sph-action-item is-number is-input"
                type="text"
                :value="skuNum"
                @change="handleAmountChange($event.target.value, skuId, i)"
              />
              <a
                class="sph-action-item is-number is-btn is-btn-plus"
                @click="handleAmountPlus(skuId, i)"
                >+</a
              >
            </td>
            <td
              class="sph-cart-col sph-cart-col--center sph-cart-col--total-price"
            >
              {{ (skuPrice * skuNum) | currency }}
            </td>
            <td class="sph-cart-col">
              <!-- <td class="sph-cart-col sph-cart-col--center"> -->
              <span class="sph-action-group">
                <a
                  class="sph-action-item is-btn-delete"
                  @click="handleDeleteProduct(skuId)"
                  >删除</a
                >
                <a
                  class="sph-action-item is-btn-collection"
                  @click="handleAddToCollection(skuId)"
                  >移到收藏</a
                >
              </span>
            </td>
          </tr>
        </tbody>
        <!-- 底部功能区 -->
        <tfoot class="sph-cart__foot">
          <tr class="sph-cart-row">
            <td colspan="6" class="sph-cart-col">
              <span class="sph-half-container is-left">
                <span class="sph-half-container__wrap check-all"
                  ><input
                    type="checkbox"
                    :checked="isAllChecked"
                    @click="handleAllChecked($event.target.checked)"
                  />全选</span
                >
                <span class="sph-half-container__wrap">
                  <a
                    class="sph-action-item delete"
                    @click="handleDeleteCheckedProduct"
                    >删除选中的商品</a
                  >
                  <a
                    class="sph-action-item add-to-focus"
                    @click="handleAddToCollection"
                    >添加到我的关注</a
                  >
                  <a
                    class="sph-action-item remove-off-stock"
                    @click="handleRemoveOffStock"
                    >清除下柜产品</a
                  ></span
                ></span
              >
              <span class="sph-half-container is-right">
                <span class="sph-half-container__wrap">
                  <span class="sph-cart__total-info-item sph-cart__total-amount"
                    >已选择 {{ totalChecked }} 件商品</span
                  >
                  <span class="sph-cart__total-info-item sph-cart__total-price"
                    >总价（不含运费） ：{{ totalPrice | currency }} 元</span
                  >
                </span>
                <a class="sph-cart__submit" @click="handleCartSubmit">结算</a>
              </span>
            </td>
          </tr>
        </tfoot>
      </table>
    </SphSectionItem>
  </SphSectionGroup>
</template>

<script>
import '@/styles/modules/cart/index.scss';
import {
  fetchCartList,
  changeProductChecked,
  bulkChangeProductChecked,
  deleteProduct,
  bulkDeleteProduct,
  addToCollection,
  removeOffStock,
  addToCart,
} from '@/api';
import { mapState } from 'vuex';

export default {
  name: 'Cart',
  data() {
    return {
      cartList: [],
      minAmount: 1,
      maxAmount: 99,
    };
  },
  computed: {
    ...mapState('user', ['userName', 'uuidToken']),
    productCount() {
      return this.cartList?.length;
    },
    totalPrice() {
      let total = 0;
      this.cartList?.forEach(
        ({ skuNum, skuPrice }) => (total += skuNum * skuPrice)
      );
      return total;
    },
    totalChecked() {
      let total = 0;
      this.cartList?.forEach(({ isChecked }) => {
        if (isChecked) total += 1;
      }) || 0;
      return total;
    },
    isAllChecked: {
      get() {
        // every 对空数组会返回 true，这不合理，因此需要先判定是否为空数组
        return (
          (this.cartList?.length > 0 &&
            this.cartList.every(({ isChecked }) => isChecked)) ||
          false
        );
      },
      // 由于改变策略，所有需要将操作结果同步非服务器的任务，把本地结果的修改放在服务器返回成功响应之后，
      // 因此该计算属性不设置 set 访问器
      // set(value) {
      //   console.log(value);
      //   for (let i = 0; i < this.cartList.length; i++) {
      //     this.checkProduct(i,value);
      //   }
      // },
    },
    // 生成订单时，需要将选中的商品作为将要生成的订单的一部分，因此需要将商品 id 传给后端
    // 结算页从后端获取商品列表，而不是从本地直接拿商品 ID
    checkedIdList() {
      let checkedList = [];
      this.cartList?.forEach(({ isChecked, skuId }) => {
        if (isChecked) checkedList.push(skuId);
      });
      return checkedList;
    },
    allSkuList() {
      return this.cartList?.map(({ skuId }) => skuId);
    },
  },
  methods: {
    //#region 初始化 --
    fetchData() {
      fetchCartList()
        .then((data) => {
          if (data.length > 0) {
            // let cartList = data?.[0]?.cartInfoList;
            let cartList = data;
            if (cartList && cartList?.length > 0) {
              this.cartList = cartList;
            }
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
    },
    //#endregion --

    //#region 事件处理 --

    //#region 选择商品 ----
    checkProduct(id, isChecked) {
      this.$set(this.cartList[id], 'isChecked', isChecked);
    },
    handleProductChecked(skuId, id, isChecked) {
      changeProductChecked(skuId, isChecked)
        .then(() => this.checkProduct(id, isChecked))
        .catch();
    },
    handleAllChecked(isAllChecked) {
      bulkChangeProductChecked(this.allSkuList, isAllChecked)
        .then(() => {
          for (let id = 0; id < this.productCount; id++) {
            this.checkProduct(id, isAllChecked);
          }
        })
        .catch();
    },
    //#endregion ----

    // 删除
    handleDeleteProduct(skuId) {
      deleteProduct(skuId)
        .then(() => this.fetchData())
        .catch();
    },
    handleDeleteCheckedProduct() {
      bulkDeleteProduct(this.checkedIdList)
        .then(() => this.fetchData())
        .catch((err) => console.log(err));
    },
    // 添加到收藏
    handleAddToCollection(skuId) {
      // collectProduct(skuId).then().catch();
    },
    // 清除下柜产品
    handleRemoveOffStock(skuId) {
      // removeOffStock(skuId).then().catch();
    },
    // 结算
    handleCartSubmit() {
      this.$router.push({ name: 'Trade' }); // 没有真实订单号
      // 提交结算的 API 没有
      // placeOrder({userId: this.userName, productList: this.checkedIdList});
    },

    //#region 产品数量 --
    // 检查用户输入是否为整数
    isAmountValid(amount) {
      console.log(_.isInteger(amount));
      return (
        _.isInteger(amount) &&
        amount >= this.minAmount &&
        amount <= this.maxAmount
      );
    },
    // 限制用户输入必须为整数
    limitProductAmount(amount) {
      return Math.min(Math.max(amount, this.minAmount), this.maxAmount);
    },
    // 提供统一的数量修改方法
    handleSetAmount(id, amount) {
      this.$set(this.cartList[id], 'skuNum', amount);
    },
    // 数量+1
    handleAmountPlus(skuId, id) {
      let oldAmount = this.cartList[id].skuNum;
      let amount = this.limitProductAmount(oldAmount + 1);
      if (oldAmount !== amount) {
        addToCart(skuId, 1).then(() => this.handleSetAmount(id, amount));
      }
    },
    // 数量-1
    handleAmountMinus(skuId, id) {
      let oldAmount = this.cartList[id].skuNum;
      let amount = this.limitProductAmount(oldAmount - 1);
      if (oldAmount !== amount) {
        addToCart(skuId, -1).then(() => this.handleSetAmount(id, amount));
      }
    },
    // 手动输入数量
    handleAmountChange(amount, skuId, id) {
      amount = +amount;
      if (!this.isAmountValid(amount)) {
        this.handleSetAmount(id, 1); // 非法输入全部重置为 1
        return;
      } else {
        let oldAmount = this.cartList[id].skuNum;
        // 计算差值需要获取改变前的值，因此不能用 v-model ，否则每次获取到的都是新值
        if (oldAmount !== amount) {
          addToCart(skuId, amount - oldAmount).then(() =>
            this.handleSetAmount(id, amount)
          );
        }
      }
    },
    //#endregion --

    //#endregion --
  },
  created() {
    this.fetchData();
  },
};
</script>
