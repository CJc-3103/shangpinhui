<template>
  <!--订单内容-->
  <div class="sph-order">
    <!-- 标题 -->
    <div class="sph-order__header">
      <h3 class="sph-order__title">我的订单</h3>
    </div>

    <table class="sph-order-table">
      <!-- 表头 -->
      <thead class="sph-order-table__header">
        <tr class="sph-order-table-row">
          <th class="sph-order-table-col sph-order-table-col--product">
            <span
              class="sph-order-table-col__inner sph-order-table-col__inner--product-info"
              >商品</span
            ><span
              class="sph-order-table-col__inner sph-order-table-col__inner--order-info"
              >订单详情</span
            >
          </th>
          <th class="sph-order-table-col sph-order-table-col--consignee">
            收货人
          </th>
          <th class="sph-order-table-col sph-order-table-col--price">金额</th>
          <th class="sph-order-table-col sph-order-table-col--status">状态</th>
          <th class="sph-order-table-col sph-order-table-col--action">操作</th>
        </tr>
        <tr class="sph-order-table-row sph-order-table-row--separate">
          <td colspan="5"></td>
        </tr>
      </thead>
      <!-- 订单列表 -->
      <tbody class="sph-order-table__body">
        <template
          v-for="(
            {
              time,
              orderId,
              consignee,
              totalPrice,
              paymentMethod,
              status,
              productList,
            },
            i
          ) in orderList"
        >
          <tr class="sph-order-table-row sph-order-item__header" :key="i">
            <!-- 订单表头 -->
            <td colspan="5" class="sph-order-table-col">
              <span class="sph-order-item__header-wrap">
                <span class="sph-order-item__header-info"
                  >{{ time }}　订单编号：{{ orderId }}</span
                >
                <span class="sph-order-item__delete"
                  ><img src="@/assets/images/customer_center/delete.png"
                /></span>
              </span>
            </td>
          </tr>
          <!-- 订单详情列表 -->
          <template v-for="({ imgUrl, title, amount }, j) in productList">
            <tr
              class="sph-order-table-row sph-order-item__content"
              :key="i + '' + j"
            >
              <td
                class="sph-order-table-col sph-order-table-col--product sph-product-info"
              >
                <span class="sph-product-info__wrap">
                  <img :src="imgUrl" />
                  <a class="sph-product-info__inner sph-product-info__title">{{
                    title
                  }}</a>
                  <span class="sph-product-info__inner sph-product-info__amount"
                    >x{{ amount }}</span
                  >
                  <a class="sph-product-info__inner sph-product-info__service"
                    >售后申请</a
                  >
                </span>
              </td>
              <!-- 订单信息；仅第一行需要渲染，与其他剩余产品共用 -->
              <template v-if="j === 0">
                <td
                  class="sph-order-table-col sph-order-table-col--consignee sph-order-table-col--center"
                  :rowspan="productList.length"
                >
                  {{ consignee }}
                </td>
                <td
                  class="sph-order-table-col sph-order-table-col--price sph-order-table-col--center"
                  :rowspan="productList.length"
                >
                  <div>总金额{{ totalPrice | currency }}</div>
                  <div>{{ paymentMethod }}</div>
                </td>
                <td
                  class="sph-order-table-col sph-order-table-col--status sph-order-table-col--center"
                  :rowspan="productList.length"
                >
                  {{ status }}
                </td>
                <td
                  class="sph-order-table-col sph-order-table-col--action sph-order-table-col--center"
                  :rowspan="productList.length"
                >
                  <ul class="unstyled">
                    <li>
                      <a href="javascript(0);">评价</a>|<a href="javascript(0);"
                        >晒单</a
                      >
                    </li>
                  </ul>
                </td>
              </template>
            </tr>
            <tr
              v-if="j === productList.length - 1"
              class="sph-order-table-row sph-order-table-row--separate"
              :key="i + '' + j + 'separate'"
            >
              <td colspan="5"></td>
            </tr>
          </template>
        </template>
      </tbody>
      <!-- 表尾 -->
      <tfoot class="sph-order-table__foot">
        <tr>
          <td colspan="5">
            <!-- 分页器 -->
            <JcPagination
              hasPrev
              hasNext
              hasTotalPages
              class="sph-order-pagination"
              :total="searchResult.total"
              :currentPage="searchResult.pageNo"
              :pagerCount="pagerCount"
              :pageSize="searchResult.pageSize"
              :totalPages="searchResult.totalPages"
              @updateCurrentPage="handleUpdateCurrentPage"
              :innerPadding="{ top: 4, right: 9 }"
              paginationAlign="flex-start"
              color="#666"
              backgroundColor="#fafafa"
              borderColor="#e0e9ee"
              pageBackgroundColor="#fff"
              pageBorderColor="#28a3ef"
              activeColor="#fff"
              activeBackgroundColor="#28a3ef"
            />
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import { fetchOrderList, fetchPager } from '@/api';
import { JcPagination } from '@/components/common';

export default {
  name: 'MyOrder',
  components: {
    JcPagination,
  },

  data() {
    return {
      // 请求结果
      searchResult: {},
      // 视图构建
      pagerCount: 5,
      orderList: [
        {
          time: '2017-02-11 11:59',
          orderId: '7867473872181848',
          consignee: '小丽',
          totalPrice: 138,
          status: 'completed',
          productList: [
            {
              imgUrl: './images/customer_center/goods.png',
              title:
                '包邮 正品玛姬儿压缩面膜无纺布纸膜100粒 送泡瓶面膜刷喷瓶 新款',
              amount: 1,
            },
            {
              imgUrl: './images/customer_center/goods.png',
              title:
                '包邮 正品玛姬儿压缩面膜无纺布纸膜100粒 送泡瓶面膜刷喷瓶 新款',
              amount: 1,
            },
          ],
        },
        {
          time: '2017-02-11 11:59',
          orderId: '7867473872181848',
          consignee: '小丽',
          totalPrice: 138,
          status: 'completed',
          productList: [
            {
              imgUrl: './images/customer_center/goods.png',
              title:
                '包邮 正品玛姬儿压缩面膜无纺布纸膜100粒 送泡瓶面膜刷喷瓶 新款',
              amount: 1,
            },
            {
              imgUrl: './images/customer_center/goods.png',
              title:
                '包邮 正品玛姬儿压缩面膜无纺布纸膜100粒 送泡瓶面膜刷喷瓶 新款',
              amount: 1,
            },
          ],
        },
      ],
      //   orderList: [],
    };
  },
  computed: {},
  methods: {
    handleUpdateCurrentPage(newPage) {
      this.$set(this.searchResult, 'pageNo', newPage);
      // this.handleUpdateSearchRoute({ queryChanges: { pageNo: newPage } });
    },
  },
  created() {
    fetchPager().then((data) => {
      this.searchResult = data;
    });
  },
};
</script>
