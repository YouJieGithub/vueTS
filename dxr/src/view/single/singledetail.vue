<template>
  <HeadBack :title="'单量分析'">
    <div @click="showPicker=true">
      <span>{{dateVal}}</span>
      <Icon class="bottom-arrow" name="arrow"></Icon>
    </div>
  </HeadBack>
  <Popup v-model:show="showPicker" position="bottom" round @click="showPicker=false">
  <DatetimePicker v-model="currentDate" :max-date="new Date()" :min-date="minDate" title="选择年月" type="year-month"  @confirm="onConfirmDate"></DatetimePicker>
  </Popup>
  <div class="singledetail">
    <div v-for="item in list" :key="item.id" class="singledetail-content">
      <div class="singledetail-content-title">{{item.name}}</div>
      <div class="singledetail-content-number">
        <div>
          <h2>{{item.count}}</h2>
          <p>月累计单量</p>
        </div>
        <div>
          <Button type="primary" @click="onSingleDetail(item.id,item.flag,dateVal)">查看</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {onBeforeMount, ref} from "vue";
import {useRouter} from "vue-router";
import dayjs from "dayjs";

/**
 * orderanalysis 单量分析
 */
import {orderanalysis} from '@/API/single'

//路由
const router=useRouter();

const showPicker = ref<boolean>(false);
const currentDate=ref<unknown>(new Date());
const dateVal=ref<unknown>(dayjs().format('YYYY-MM'));
const minDate=ref<unknown>(new Date(dayjs().get('year') - 2,dayjs().get('month'),dayjs().get('date')));
/**
 * 单量分析列表
 */
const list=ref<Array<object>>([]);
//切换月份
const onConfirmDate=(value:string)=>{
  dateVal.value=dayjs(value).format('YYYY-MM');
  const time={
    month:dateVal.value
  }
  getOrderanalysis(time)
}

const getOrderanalysis=(time:string)=>{
  orderanalysis(time).then(res=>{
    list.value=res.data;
  })
}

//查看详情
const onSingleDetail=(id:number,flag:number,moth:string)=>{
  router.push({path:'/singleanalyze',query:{id,flag,moth}})
};

onBeforeMount(()=>{
  const time={
    month:dayjs().format('YYYY-MM')
  }
  getOrderanalysis(time)
})
</script>

<style lang="scss" scoped>
.bottom-arrow{
  margin-left: 10px;
  font-size: 12px;
}
.bottom-arrow::before{
  transform: rotate(90deg) rotateZ(0);
}
.singledetail{
  padding: 20px 24px;
  background-color: #f7f7ff;
  .singledetail-content{
    margin: 20px 0;
    padding: 30px;
    height: 220px;
    background-color: #ffffff;
    border-radius: 20px;
    text-align: left;
    .singledetail-content-title{
      position: relative;
      padding-left: 28px;
      font-size: 28px;
      font-weight: bolder;
    }
    .singledetail-content-title:before{
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      content: '';
      width: 4px;
      height: 24px;
      background-color: #0089ff;
      border-radius: 2px;
    }
    .singledetail-content-number{
      margin-top: 51px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h2{
        font-size: 48px;
        font-weight: bolder;
        color: #0089ff;
      }
      p{
        font-size: 24px;
      }
      Button{
        width: 140px;
        height: 50px;
        border-radius: 25px;
        font-size: 24px;
        letter-spacing: 2px;
      }
    }
  }
}
</style>