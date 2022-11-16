<template>
  <footer class="sph-footer">
    <SphSectionGroup
      :class="{ 'is-register-view': $route.name === 'Register' }"
    >
      <div class="footer__wrap">
        <SphSectionItem
          class="sph-footer-section sph-important-link"
          v-if="$route.meta.hasImportantLink"
        >
          <div
            class="sph-important-link-group"
            v-for="({ header, children }, i) in footerItemList"
            :key="i"
          >
            <h4 class="sph-important-link-group__title">{{ header }}</h4>
            <ul>
              <li
                class="sph-important-link-item"
                v-for="(child, j) in children"
                :key="j"
              >
                {{ child }}
              </li>
            </ul>
          </div>

          <div class="sph-help-center">
            <h4>帮助中心</h4>
            <img src="@/assets/images/wx_cz.jpg" />
          </div>
        </SphSectionItem>

        <SphSectionItem class="sph-footer-section sph-copyright">
          <ul class="sph-help-link-group">
            <li
              class="sph-help-link-item"
              v-for="({ title, link }, i) in helpLinkList"
              :key="i"
            >
              <a :href="link">{{ title }}</a>
            </li>
          </ul>
          <p class="sph-copyright__info">
            地址：北京市昌平区宏福科技园综合楼6层
          </p>
          <p class="sph-copyright__info">京ICP备19006430号</p>
        </SphSectionItem>
      </div>
    </SphSectionGroup>
  </footer>
</template>

<script>
import '@/styles/modules/footer/index.scss';

export default {
  name: 'TheFooter',
  props: {
    hasImportantLink: Boolean, // 路由组件属性
  },
  data() {
    return {
      // 视图构建
      footerItemList: [
        {
          header: '购物指南',
          children: [
            '购物流程',
            '会员介绍',
            '生活旅行/团购',
            '常见问题',
            '购物指南',
          ],
        },
        {
          header: '配送方式',
          children: [
            '上门自提',
            '211限时达',
            '配送服务查询',
            '配送费收取标准',
            '海外配送',
          ],
        },
        {
          header: '支付方式',
          children: [
            '货到付款',
            '在线支付',
            '分期付款',
            '邮局汇款',
            '公司转账',
          ],
        },
        {
          header: '售后服务',
          children: [
            '售后政策',
            '价格保护',
            '退款说明',
            '返修/退换货',
            '取消订单',
          ],
        },
        {
          header: '特色服务',
          children: [
            '夺宝岛',
            'DIY装机',
            '延保服务',
            '尚品汇E卡',
            '尚品汇通信',
          ],
        },
      ],
      helpLinkList: [
        {
          title: '关于我们',
          link: '#',
        },
        {
          title: '联系我们',
          link: '#',
        },
        {
          title: '关于我们',
          link: '#',
        },
        {
          title: '商家入驻',
          link: '#',
        },
        {
          title: '营销中心',
          link: '#',
        },
        {
          title: '友情链接',
          link: '#',
        },
        {
          title: '关于我们',
          link: '#',
        },
        {
          title: '营销中心',
          link: '#',
        },
        {
          title: '友情链接',
          link: '#',
        },
      ],
    };
  },
};
</script>
