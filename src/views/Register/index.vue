<template>
  <SphSectionGroup>
    <SphSectionItem class="sph-register">
      <h3 class="sph-register__head">
        <span class="title">注册新用户</span>
        <span class="sph-register__login"
          >我有账号，去
          <router-link to="/login" class="sph-register__login-text"
            >登陆</router-link
          >
        </span>
      </h3>

      <div class="sph-register__form-wrap">
        <JcForm
          ref="registerForm"
          class="sph-register-form"
          labelPosition="right"
          labelSuffix="："
          labelWidth="80px"
          :model="model"
          :rules="rules"
        >
          <JcFormItem
            label="手机号"
            prop="phone"
            class="sph-register-form-item"
          >
            <JcInput
              class="sph-register-form__input"
              type="text"
              lazy
              placeholder="请输入你的手机号"
              v-model="model.phone"
            />
          </JcFormItem>
          <JcFormItem
            label="验证码"
            prop="code"
            class="sph-register-form-item sph-register-verification"
          >
            <span class="sph-register-verification__wrap">
              <JcInput
                class="sph-register-form__input sph-register-verification__input"
                type="text"
                lazy
                placeholder="请输入验证码"
                v-model="model.code"
            /></span>
            <a
              class="sph-register-verification__btn"
              @click="handleGetCode(model.code)"
              >获取验证码
            </a>
          </JcFormItem>
          <JcFormItem
            label="登录密码"
            prop="password1"
            class="sph-register-form-item"
          >
            <JcInput
              class="sph-register-form__input"
              type="text"
              lazy
              placeholder="请输入你的登录密码"
              v-model="model.password1"
            />
          </JcFormItem>
          <JcFormItem
            label="确认密码"
            prop="password2"
            class="sph-register-form-item"
          >
            <JcInput
              class="sph-register-form__input"
              type="text"
              lazy
              placeholder="请再次输入密码"
              v-model="model.password2"
            />
          </JcFormItem>
          <JcFormItem
            prop="protocol"
            class="sph-register-form-item sph-register-form__protocol"
          >
            <JcCheckbox v-model="model.protocol"
              >同意协议并注册<a
                class="sph-register-protocol__show-protocol"
                @click.stop="handleShowProtocol"
                >《尚品汇用户协议》</a
              ></JcCheckbox
            >
          </JcFormItem>

          <JcFormItem class="sph-register-form-item" :isFormInput="false"
            ><button
              type="button"
              class="button btn-register"
              @click="handleRegister('registerForm')"
            >
              完成注册
            </button>
          </JcFormItem>
        </JcForm>
      </div>
      <div class="sph-protocol" v-if="!isHideProtocol" v-show="isShodProtocol">
        <h4 class="sph-protocol__header">尚品汇用户注册协议和隐私政策</h4>
        <div class="sph-protocol__content">
          <p>
            欢迎注册成为尚品汇用户！在您注册过程中，您需要完成我们的注册流程并通过点击同意的形式在线签署以下协议，请您务必仔细阅读、充分理解协议中的条款内容后再点击同意（尤其是以粗体或下划线标识的条款，因为这些条款可能会明确您应履行的义务或对您的权利有所限制）。
          </p>
          <p>
            【请您注意】如果您不同意以下协议全部或任何条款约定，请您停止注册。您停止注册后将仅可以浏览我们的商品信息但无法享受我们的产品或服务。如您按照注册流程提示填写信息，阅读并点击同意上述协议且完成全部注册流程后，即表示您已充分阅读、理解并接受协议的全部内容，并表明您同意我们可以依据协议内容来处理您的个人信息，并同意我们将您的订单信息共享给为完成此订单所必须的第三方合作方（详情查看<a>《订单共享与安全》</a>）。如您对以下协议内容有任何疑问，您可随时通过《京东隐私政策》中的联系方式联系我们。
          </p>
          <p>
            如您在使用我们的产品或服务中与其他用户发生争议的，依您与其他用户达成的协议处理。
          </p>
          <p></p>
        </div>
        <div class="sph-protocol__footer">
          <span class="sph-protocol__btn-wrap"
            ><button
              class="sph-protocol__btn-confirm"
              @click="handleConfirmProtocol"
            >
              确定
            </button></span
          >
        </div>
      </div>
      <div
        class="sph-mask"
        v-if="!isHideProtocol"
        v-show="isShodProtocol"
      ></div>
    </SphSectionItem>
  </SphSectionGroup>
</template>

<script>
import '@/styles/modules/register/index.scss';
import { getCode, register } from '@/api';
import user from '@/storage/user';
import { JcForm, JcFormItem, JcInput, JcCheckbox } from '@/components/common';
import emitter from '@/components/mixins/emitter';

export default {
  name: 'Register',
  components: {
    JcForm,
    JcFormItem,
    JcInput,
    JcCheckbox,
  },
  mixins: [emitter],

  data() {
    return {
      realCode: '', // 后端返回的验证码
      model: {
        // phone: '', // 当前注册使用的手机号 13777368660
        phone: '13777368660',
        code: '1', // 用户输入的验证码
        password1: '1', // 123456
        password2: '1',
        protocol: false,
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern:
              /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/,
            message: '请输入正确的手机号',
            trigger: 'blur',
          },
        ],
        code: [
          { require: true, message: '请输入验证码', trigger: 'blur' },
          {
            validator: async (rule, value, callback) => {
              if (value === this.realCode) callback();
              else callback('请输入正确的验证码');
            },
            trigger: 'blur',
          },
        ],
        password1: { require: true, message: '请输入密码', trigger: 'blur' },
        password2: [
          { require: true, message: '请输入正确的密码', trigger: 'blur' },
          {
            validator: async (rule, value, callback) => {
              if (value === this.model.password1) callback();
              else callback('请输入正确的密码');
            },
            trigger: 'blur',
          },
        ],
        protocol: [
          {
            require: true,
            type: 'boolean',
            message: '请阅读并同意协议，然后注册',
            trigger: 'blur',
          },
        ],
      },
      isHideProtocol: true,
      isShodProtocol: false,
    };
  },
  methods: {
    handleGetCode(phone) {
      getCode(phone).then((data) => {
        this.realCode = data;
        console.log('data', data);
      });
    },
    handleShowProtocol() {
      this.isHideProtocol = false;
      this.isShodProtocol = true;
    },
    handleConfirmProtocol() {
      this.isShodProtocol = false;
    },
    validateForm() {
      let result = false;
      result =
        this.phone &&
        this.code &&
        this.code === this.realCode &&
        this.password1 &&
        this.password1 === this.password2 &&
        this.agree;
      return result;
    },
    handleRegister(registerForm) {
      this.$refs[registerForm]
        .validateAll()
        .then((result) => {
          console.log('result', result);
          // register({
          //   phone: this.phone,
          //   code: this.code,
          //   password: this.password1,
          // }).then(() => {
          //   this.$router.push({ name: 'Login' });
          //   UserAccount = this.phone;
          // });
          // this.$router.push({ name: 'Login' });
          console.log('验证通过');
        })
        .catch((invalidFields) => {
          console.log('invalidFields', invalidFields);
          console.log('验证失败');
        });
    },
  },
};
</script>
