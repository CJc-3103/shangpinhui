<template>
  <SphSectionGroup class="sph-customer-center">
    <SphSectionItem>
      <div class="sph-customer-center__body">
        <!--左侧菜单-->
        <aside class="sph-aside-menu">
          <JcRadioList
            v-model="currentMenu"
            class="sph-aside-menu-group"
            listType="definition"
            direction="column"
            titleClass="sph-aside-menu-group__title"
            @select="(value) => handleMenuSelect(value, i)"
            v-for="({ title, menuItemList }, i) in asideMenuList"
            :key="i"
          >
            <template #title
              ><i class="sph-aside-menu-group__title-pre-fix">· </i
              >{{ title }}</template
            >

            <JcRadioItem
              class="sph-aside-menu-item"
              :value="router.name"
              :params="{ name: router.name }"
              v-for="({ title, router }, j) in menuItemList"
              :key="j"
              >{{ title }}</JcRadioItem
            >
          </JcRadioList>
        </aside>
        <!-- 右侧主体 -->
        <main class="sph-customer-center__main">
          <router-view></router-view>
          <!--猜你喜欢-->
          <TheLike :productCount="4" />
        </main>
      </div>
    </SphSectionItem>
  </SphSectionGroup>
</template>

<script>
import '@/styles/modules/customer-center/index.scss';
import { JcRadioList, JcRadioItem } from '@/components/common';
import { TheLike } from '@/components/globals';

export default {
  name: 'CustomerCenter',
  components: {
    JcRadioList,
    JcRadioItem,
    TheLike,
  },

  data() {
    return {
      currentMenu: 'MyOrder',
      asideMenuList: [
        {
          title: '订单中心',
          menuItemList: [
            {
              title: '我的订单',
              router: { name: 'MyOrder' },
            },
            {
              title: '团购订单',
              router: { name: 'GroupBuyOrder' },
            },
            {
              title: '本地生活订单',
              router: { name: 'LifeOrder' },
            },
            {
              title: '我的预售',
              router: { name: 'MyPreSale' },
            },
            {
              title: '评价晒单',
              router: { name: 'Feedback' },
            },
            {
              title: '取消订单记录',
              router: { name: 'OrderCancellation' },
            },
          ],
        },
        {
          title: '关注中心',
          menuItemList: [
            {
              title: '关注的商品',
              router: { name: 'FavoriteGoods' },
            },
            {
              title: '关注的店铺',
              router: { name: 'FavoriteShop' },
            },
            {
              title: '关注的专辑',
              router: { name: 'FavoriteAlbum' },
            },
            {
              title: '关注的品牌',
              router: { name: 'FavoriteBrand' },
            },
            {
              title: '关注的活动',
              router: { name: 'FavoriteActivity' },
            },
            {
              title: '浏览历史',
              router: { name: 'VisitHistory' },
            },
          ],
        },
        {
          title: '特色业务',
          menuItemList: [
            {
              title: '我的营业厅',
              router: { name: 'MyBusinessHall' },
            },
            {
              title: '京东通信',
              router: { name: 'Communication' },
            },
            {
              title: '定期送',
              router: { name: 'RegularDelivery' },
            },
            {
              title: '京东代下单',
              router: { name: 'OrderOnBehalf' },
            },
            {
              title: '我的回收单',
              router: { name: 'MyRecycleOrder' },
            },
            {
              title: '节能补贴',
              router: { name: 'EnergySubsidies' },
            },
            {
              title: '医药服务',
              router: { name: 'MedicalAndMedicineService' },
            },
            {
              title: '流量加油站',
              router: { name: 'FlowFillingStation' },
            },
            {
              title: '黄金托管',
              router: { name: 'GoldCollocation' },
            },
          ],
        },
        {
          title: '客户服务',
          menuItemList: [
            {
              title: '返修退换货',
              router: { name: 'ReturnAndReplace' },
            },
            {
              title: '价格保护',
              router: { name: 'PriceProtection' },
            },
            {
              title: '意见建议',
              router: { name: 'OpinionAndAdvice' },
            },
            {
              title: '购买咨询',
              router: { name: 'PurchaseConsultant' },
            },
            {
              title: '交易纠纷',
              router: { name: 'TradeDisputes' },
            },
            {
              title: '我的发票',
              router: { name: 'MyInvoice' },
            },
          ],
        },
        {
          title: '设置',
          menuItemList: [
            {
              title: '个人信息',
              router: { name: 'PersonalInformation' },
            },
            {
              title: '收货地址',
              router: { name: 'Consignee' },
            },
          ],
        },
      ],
    };
  },

  methods: {
    handleMenuSelect(value, id) {},
  },
};
</script>
