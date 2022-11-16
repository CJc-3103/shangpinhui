<template>
  <header class="sph-header">
    <!-- 头部的第一行 -->
    <SphSectionGroup class="sph-header-section-group--top">
      <SphSectionItem class="sph-header-section">
        <div class="sph-header-account">
          <span class="sph-header-account__welcome">尚品汇欢迎您！</span>
          <template v-if="userName"
            ><a href="javascript(0);" class="sph-header-account__inner">{{
              userName
            }}</a
            ><a class="sph-header-account__inner" @click="handleLogout"
              >退出登录</a
            ></template
          >
          <template v-else
            >请<router-link
              :to="{
                name: 'Login',
                query: { redirect: routePath },
              }"
              ><span
                class="sph-header-account__inner sph-header-account__inner--right"
                >登录</span
              ></router-link
            >
            <router-link to="/register"
              ><span
                class="sph-header-account__inner sph-header-account__inner--right"
                >免费注册</span
              ></router-link
            ></template
          >
        </div>
        <!-- 头部右侧导航 -->
        <ul class="sph-header-nav-group">
          <li
            class="sph-header-nav-item"
            v-for="({ title, router }, i) in headerNavList"
            :key="i"
          >
            <router-link :to="router">{{ title }}</router-link>
          </li>
        </ul>
      </SphSectionItem>
    </SphSectionGroup>
    <!--头部第二行 搜索区域-->
    <SphSectionGroup>
      <SphSectionItem class="sph-header-section sph-header-section--bottom">
        <!-- .logo 元素下面多出 5px 的空白，原因未知；暂时使用负的 margin-bottom 抵消 -->
        <div class="sph-logo">
          <router-link to="/home" title="尚品汇">
            <img
              class="sph-logo__pic"
              src="@/assets/images/logo.png"
              alt="尚品汇Logo"
            />
          </router-link>
        </div>
        <div class="sph-search">
          <input
            type="text"
            id="autocomplete"
            class="input input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="btn sui-btn btn-xlarge btn-danger"
            type="button"
            @click="handleSearch(keyword)"
          >
            搜索
          </button>
        </div>
      </SphSectionItem>
    </SphSectionGroup>
  </header>
</template>

<script>
import '@/styles/modules/header/index.scss';
import whiteList from '@/router/whiteList';
import routePaths from '@/router/routePaths';
import searchParamsMixins from '@/mixins/common/searchParams';
import updateSearchRoute from '@/mixins/modules/updateSearchRoute';

export default {
  name: 'TheHeader',

  mixins: [searchParamsMixins, updateSearchRoute],
  // mixins: [searchParamsMixins(), updateSearchRoute], // 若 mixins 导出为函数，需要调用

  data() {
    return {
      // 视图构建
      headerNavList: [
        {
          title: '我的订单',
          router: { name: 'MyOrder' },
        },
        {
          title: '我的购物车',
          router: { name: 'Cart' },
        },
        {
          title: '我的尚品汇',
          router: { name: 'CustomerCenter' },
        },
        {
          title: '尚品汇会员',
          router: '',
        },
        {
          title: '企业采购',
          router: '',
        },
        {
          title: '关注尚品汇',
          router: '',
        },
        {
          title: '合作招商',
          router: '',
        },
        {
          title: '商家后台',
          router: '',
        },
      ],
      // 数据模型
      keyword: '',
    };
  },
  computed: {
    userName() {
      return this.$store.state.user.userName;
    },
    routePath() {
      return this.$route.path;
    },
    routeName() {
      return this.$route.name;
    },
  },
  methods: {
    handleSearch(keyword) {
      this.handleUpdateSearchRoute({
        queryChanges: 'allReserve',
        paramsChanges: { keyword: keyword },
      });
    },
    handleLogoutRedirect() {
      let location = {};
      if (
        !whiteList.includes(this.routePath) &&
        !whiteList.includes(routePaths[this.routeName])
      ) {
        location = { name: 'Login', query: { redirect: this.routePath } }; // 注意这里，需要手动带上当前路径，否则重新登录后只能到首页
        this.$router.push(location);
      }
      // 当前路由在白名单之内的，不需要跳转，留在当前路由即可
    },
    handleLogout() {
      this.$store
        .dispatch('user/LOGOUT')
        .then(() => {
          this.handleLogoutRedirect();
        })
        .catch((err) => err);
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(newRoute) {
        this.keyword = newRoute.params.keyword ?? '';
      },
    },
  },
};
</script>
