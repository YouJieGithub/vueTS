<template>
  <div class="register">
    <img alt="注册" src="src/assets/image/register.png" />
    <p>店小二注册</p>
  </div>
  <div class="form-page">
  <Form ref="registerfrom" :show-error-message="false" class="register-from" @failed="onFailedFrom" @submit="onSubmitFrom">
    <div>
      <Field v-model="fromData.site" :rules="[{ required: true, message: '请选择部门' }]" input-align="right" label="部门"  name="site" placeholder="请选择部门" readonly size="large" @click="showCascader = true"/>
      <Field v-model="fromData.name" :maxlength="50" :rules="[{ required: true, message: '请输入姓名' }]" input-align="right" label="姓名" name="name" placeholder="请输入姓名" size="large"></Field>
      <Field v-model="fromData.IDcard" :maxlength="18" :rules="[{ required: true,validator:(val)=>{IDcardReg.isIDCard(val)},message: '请输入身份证号' }]" input-align="right" label="身份证号" name="IDcard" placeholder="请输入身份证号" size="large"></Field>
      <Field v-model="fromData.Bankcard" :maxlength="19" :rules="[{ required: true,validator:valiBankReg,message: '请输入银行卡号' }]" input-align="right" label="银行卡号" name="Bankcard" placeholder="请输入银行卡号" size="large" type="number"></Field>
      <Field v-show="isAccountbank" v-model="fromData.Bankaccount" input-align="right" label="开户行" name="accountbank"  readonly size="large"></Field>
      <Field v-model="fromData.Bankaddress" :maxlength="50" :rules="[{ required: true, message: '请输入支行地址' }]" input-align="right" label="支行地址" name="Bankaddress" placeholder="请输入支行地址，如：长庆路支行" size="large"></Field>
    </div>
    <div>
      <Field v-model="fromData.information" :rules="[{ required: true, message: '请选择信息来源' }]" input-align="right" is-link label="信息来源" name="information" placeholder="请选择信息来源" readonly size="large" @click="showPicker = true"/>
      <Field v-model="fromData.referrer" input-align="right" label="推荐人" name="referrer" placeholder="请输入推荐人" size="large"/>
      <Field v-model="fromData.telphone" :rules="[{ required: true,message: '请输入手机号码' }]" input-align="right" label="手机号码" name="telphone" placeholder="请输入手机号码" size="large" type="number"></Field>
      <Field v-model="fromData.smsCode" :rules="[{ required: true, message: '请输入验证码' }]" center clearable input-align="right" label="验证码" name="smsCode" placeholder="请输入验证码" size="large" type="number">
        <template #button>
          <Button :disabled="smsCodeDisabled" plain size="small" type="primary" @click="getSmsCode">{{smsText}}</Button>
        </template>
      </Field>
    </div>
  <div>
    <Field  :rules="[{ required: true, message: '请勾选入职协议' }]" class="checkbox" name="checkbox">
      <template #input>
        <Checkbox v-model="fromData.checked" icon-size="16"
          >本人以详细阅读并同意签署<span style="color: #0089ff"
            >入职协议</span
          ></Checkbox
        >
      </template>
    </Field>
  </div>
  <Button class="bigButton" native-type="submit" type="primary" >注册</Button>
  </Form>
  </div>
  <Popup v-model:show="showCascader" position="bottom" round>
    <Cascader
        :field-names="{ text: 'depName',value:'id',children:'children'}"
        :options="options"
      active-color="#0089ff"
      placeholder="请选择部门"
      @close="showCascader = false"
        @finish="onFinish"
    />
  </Popup>
  <Popup v-model:show="showPicker" position="bottom" round>
    <Picker
        :columns="columns"
        :columns-field-names="{
          text:'value'
        }"
        @cancel="showPicker=false"
        @confirm="onConfirm"/>
  </Popup>
</template>

<script lang="ts" setup>
import {onBeforeMount, reactive, ref} from "vue";
import {Notify} from "vant";
/**
 * register 注册
 * smsCode 发送验证码
 */
import {register, smsCode} from '@/API/login';

/** EmptyReg 非空 非null 非undefined 验证
 * IDcardReg 身份证号验证
 * PhoneReg  手机号验证
 * BankReg   银行卡正则验证
 */
import {PhoneReg} from '@/utils/RegIndex/isPhone';
import {BankReg} from '@/utils/RegIndex/isBank';

/**
 * departmentList  查询所有未禁用的部门列表
 * systemInform    查询所有信息来源列表
 */
import {departmentList} from '@/API/department';
import {systemInform} from '@/API/infosource';


interface registerFrom {
  site: string;
  siteID:number;
  name: string;
  IDcard: string;
  Bankcard: number|null;
  Bankprovince?:string;
  Bankaddress: string;
  Bankaccount:string;
  information: number|null;
  referrer:string;
  telphone: number|null;
  smsCode: string;
  checked:boolean;
}
//级联选择器的value
const options = ref<Array<object>>();
const showCascader = ref<boolean>(false);


const columns=ref<Array<object>>([]);
const showPicker=ref<boolean>(false);

const checked = ref<boolean>(false);

//from表单
const registerfrom = ref<string>("");
const fromData = reactive<registerFrom>({
  site: "",
  name: "",
  IDcard:"",
  Bankcard:null,
  accountbank:'',
  Bankaddress:'',
  information:null,
  referrer:'',
  telphone:null,
  smsCode:'',
  checked:false
});
const siteID=ref<number|null>(null);    //部门ID
const Bankprovince=ref<string>('');     //银行卡所属省份
const information=ref<number|null>(null); //信息来源ID


const isAccountbank=ref<boolean>(false);    //isShow 开户行
const valiBankReg=(val:number)=>{
  if(BankReg.isBank(String(val))){
    let data={
      bankCardNumber:val
    }
    isAccountbank.value=true;
    fromData.Bankaccount='工商银行';
    Bankprovince.value='陕西省';
    // bankInfo(data).then(res=>{
    //   isAccountbank.value=true;
    // })
  }else {
    isAccountbank.value=false;
  }
}

//发送验证码
const smsCodeDisabled=ref<boolean>(false);
const smsText=ref<string>('获取验证码');
const getSmsCode=()=>{
  if(PhoneReg.isPhone(fromData.telphone)&&!smsCodeDisabled.value){
    smsCode(fromData.telphone).then(res=>{
      Notify({ type: 'primary', message: '已发送' });
      smsCountdown(60)
    })
  }
};
const smsCountdown=(time:number)=>{
  setTimeout(()=>{
    if(time>0){
      smsText.value=`倒计时${time--}S`
      smsCodeDisabled.value=true;
      smsCountdown(time)
    }else {
      smsText.value=`发送验证码`
      smsCodeDisabled.value=false;
    }
  },1000)
}

/**
 * getDepartmentList 请求后台部门数据
 * onFinish 获取全部选项数据
 */
const getDepartmentList=()=>{
  departmentList().then((res:any)=>{
    options.value=res.rows;
  })
};
const onFinish = (value:any) => {
  fromData.site = value.selectedOptions[value.tabIndex].depName;
  siteID.value=value.value;
  showCascader.value = false;
};

/**
 *  getSystemInform 来源信息后台数据
 *  onConfirm 选择来源信息
 */
const getSystemInform=(data)=>{
  systemInform(data).then((res:any)=>{
    columns.value=res.rows;
  })
};
const onConfirm=(value)=>{
  fromData.information=value.value;
  information.value=value.id;
  showPicker.value=false;
}

/**
 * onSubmitFrom 提交表单
 */
const onSubmitFrom = (values) => {
  console.log(values)
  let data={
    staffName:values.name,
    departmentId:siteID.value,
    identityNumber:values.IDcard,
    bankCardNumber:values.Bankcard,
    bankAccount:values.accountbank,
    bankProvince:Bankprovince.value,
    bankAddress:values.Bankaddress,
    referrer:values.referrer,
    informId:information.value,
    telephone:values.telphone,
    checkCode:values.smsCode
  };
  register(data).then(res=>{

  })

};
const onFailedFrom=(errorInfo)=>{
  Notify({ type: "danger", message: errorInfo.errors[0].message });
};

onBeforeMount(()=>{
  getDepartmentList();
  getSystemInform('inform');
})
</script>

<style lang="scss" scoped>
.form-page{
  background: #f7f7ff;
  padding-bottom: 94px;
}
.register {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 750px;
  height: 250px;
  background-color: #f7f7ff;

  img {
    width: 154px;
    height: 79px;
  }

  p {
    margin-top: 20px;
    font-size: 28px;
    line-height: 28px;
  }
}

.register-from {
  > div {
    margin-bottom: 20px;
    font-size: 24px;
  }
}

.checkbox {
  font-size: 20px;
  background-color: #f7f7ff;
  color: #999999;
}
</style>
