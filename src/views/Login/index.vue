<template>
  <SphSectionGroup class="sph-login-main">
    <SphSectionItem class="sph-login-main__container">
      <div class="sph-login-main__bg-wrap"></div>
      <div class="sph-login-card">
        <div class="sph-login-card__wrap">
          <!-- 登录方式 -->
          <JcTab blockClass="sph-login-tabs" v-model="activeTab">
            <template v-slot:nav="{ label }">
              <a class="sph-login-tabs__nav-item-inner">{{ label }}</a>
            </template>
            <JcTabPane
              name="扫码登录"
              class="sph-login-tabs__qrcode"
            ></JcTabPane>
            <JcTabPane name="账户登录" class="sph-login-tabs__account">
              <!-- form -->
              <JcForm
                ref="loginForm"
                class="sph-login-form"
                :model="model"
                :rules="rules"
              >
                <JcFormItem
                  class="sph-form-item sph-form-item--input"
                  prop="phone"
                >
                  <i class="icon icon-account"></i>
                  <JcInput
                    class="sph-login-form__input"
                    placeholder="请输入手机号"
                    v-model="model.phone"
                  ></JcInput>
                </JcFormItem>
                <JcFormItem
                  class="sph-form-item sph-form-item--input"
                  prop="password"
                >
                  <i class="icon icon-account"></i>
                  <JcInput
                    class="sph-login-form__input"
                    placeholder="请输入密码"
                    v-model="model.password"
                  ></JcInput>
                </JcFormItem>
                <JcFormItem class="sph-form-item">
                  <span class="sph-login-form__setting">
                    <JcCheckbox class="sph-login-form__auto-login">
                      自动登录</JcCheckbox
                    >
                    <a href="javascript:void(0);" class="sph-login-form__forget"
                      >忘记密码？</a
                    ></span
                  >
                </JcFormItem>
                <JcFormItem class="sph-form-item sph-login-form_submit">
                  <button
                    type="button"
                    class="sph-login-main__btn-login"
                    @click="handleLogin('loginForm')"
                  >
                    登&nbsp;&nbsp;录
                  </button>
                </JcFormItem>
              </JcForm>

              <!-- login-links & register -->
              <div class="sph-login-card__foot">
                <ul class="sph-login-related-link-group">
                  <li
                    class="sph-login-related-link-item"
                    v-for="(imrUrl, i) in loginTypeImgList"
                    :key="i"
                  >
                    <a href="javascript:void(0);"
                      ><img :src="imrUrl" alt=""
                    /></a>
                  </li>
                </ul>
                <router-link to="/register" class="sph-login-main__btn-register"
                  >立即注册</router-link
                >
              </div>
            </JcTabPane>
          </JcTab>
        </div>
      </div>
    </SphSectionItem>
  </SphSectionGroup>
</template>

<script>
import '@/styles/modules/login/index.scss';
import {
  JcTab,
  JcTabPane,
  JcForm,
  JcFormItem,
  JcInput,
  JcCheckbox,
} from '@/components/common';
import user from '@/storage/user';

export default {
  name: 'Login',

  components: {
    JcTab,
    JcTabPane,
    JcForm,
    JcFormItem,
    JcInput,
    JcCheckbox,
  },

  props: ['redirect', 'params', 'query'],

  data() {
    return {
      // 视图构建
      tabList: ['扫描登录', '账户登录'],
      activeTab: '账户登录',
      // 转为雪碧图或者转为 base64
      loginTypeImgList: [
        require('@/assets/images/login/qq.png'),
        require('@/assets/images/login/sina.png'),
        require('@/assets/images/login/ali.png'),
        require('@/assets/images/login/weixin.png'),
      ],
      // 数据模型
      autoLogin: false,
      model: {
        phone: '', // 13777368660
        password: '', // 123456
      },
      rules: {
        phone: {
          required: true,
          message: '请输入账号',
          trigger: 'blur',
        },
        password: {
          required: true,
          message: '请输入密码',
          trigger: 'blur',
        },
      },
    };
  },

  methods: {
    handleLogin(loginForm) {
      this.$refs[loginForm]
        .validateAll()
        .then(() => {
          const { phone, password } = this.model;
          this.$router.replace(
            this.redirect
              ? { path: this.redirect, params: this.params, query: this.query }
              : { name: 'Home' }
          );
          this.$store.dispatch('user/LOGIN', { phone, password });
        })
        .catch((err) => {
          console.log('登录失败：', err);
        });
    },
  },

  mounted() {
    if (user && user?.userAccount) this.phone = user.userAccount; // 注册后转到登录页时自动填入账号
  },
};
</script>
