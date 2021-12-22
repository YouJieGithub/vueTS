<template>
  <div class="login-page">
    <div class="login">
      <img alt="登录" class="login-loginBg" src="src/assets/image/login.png" />
      <Form :show-error-message="false" @failed="onFailedFrom" @submit="onSubmit">
        <div class="login-input">
          <Field
            v-model="username"
            :rules="[{ required: true, message: '请输入手机号' }]"
            maxlength="11"
            name="username"
            placeholder="请输入手机号"
            type="number"
          >
            <template #left-icon>
              <svg aria-hidden="true" class="icon">
                <use xlink:href="#icon-a-yonghuming_huaban1fuben31"></use>
              </svg>
            </template>
          </Field>
        </div>
        <div class="login-input">
          <Field
            v-model="password"
            :rules="[{ required: true, message: '请输入密码' }]"
            name="password"
            placeholder="请输入密码"
            type="password"
          >
            <template #left-icon>
              <svg aria-hidden="true" class="icon">
                <use xlink:href="#icon-a-mima_huaban1fuben32"></use>
              </svg>
            </template>
          </Field>
        </div>
        <div class="login-input-submit">
          <Button block native-type="submit" round type="primary">登录</Button>
        </div>
      </Form>
    </div>
    <div class="login-page-BG">
      <img alt="" src="src/assets/image/loginBG.png" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref, Ref} from "vue";
import {useRouter} from "vue-router";
import {Notify} from "vant";
import {useStore} from '@/store';
/**
 * login 登录
 */
import {login} from '@/API/login';

/** EmptyReg 非空 非null 非undefined 验证
 * PhoneReg  手机号验证
 */
import {PhoneReg} from "../../utils/RegIndex/isPhone";
import {EmptyReg} from "../../utils/RegIndex/isEmpty";

const router=useRouter();
const store = useStore();

console.log(store)

const user=computed<string>(()=>store.state.userinfo)


const username: Ref<number | null> = ref(null);
const password: Ref<string | number> = ref("");
const onFailedFrom=(errorInfo)=>{
  Notify({ type: "danger", message: errorInfo.errors[0].message });
};

const onSubmit = (values: any) => {
  let username = PhoneReg.isPhone(values.username);
  let password = EmptyReg.isEmpty(values.password, "密码");
  if (username && !password) {
    let data={
      telephone:values.username,
      password:values.password
    };
    login(data).then(res=>{
      window.sessionStorage.setItem('token',res.jwt);
      store.commit('userinfoModule/setState',res)
      router.replace({path:'/home'})
    })
  }
};
</script>

<style lang="scss" scoped>
.login-page {
  position: relative;
  height: 100%;
  background: #ffffff;
  .login {
    padding-top: 115px;
    margin: 0 135px;

    .login-loginBg {
      margin-bottom: 120px;
      width: 241px;
      height: 124px;
    }

    .login-input {
      margin-bottom: 48px;
      height: 80px;
      background-color: #ffffff;
      box-shadow: 0 8px 10px 0 #ebf1fa;
      border-radius: 80px;
      border: solid 2px #f1f1f1;
      .icon{
        margin-right: 29px;
        width: 17px*1.5;
        height: 20px*1.5;
      }
    }

    .login-input-submit {
      margin-top: 88px;
    }
  }
  .login-page-BG {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 116px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
