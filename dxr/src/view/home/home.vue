<template>
  <div style="height:100%;background-color: #ffffff;">
  <div class="page">
    <div class="page-user-info">
      <div class="page-user-info-img"><img alt="头像" src="https://img.yzcdn.cn/vant/cat.jpeg"></div>
      <div class="page-user-info-title"><p>Hi，张三</p>
        <div class="page-user-info-flag"><svg aria-hidden="true" class="icon">
          <use v-if="flag==='总账户'" :xlink:href="icon"></use>
        </svg><p>{{flag}}</p></div></div>
    </div>
    <div><Icon name="arrow" size="20"/></div>
  </div>
  <div class="card">
    <div v-for="(item,index) in card" :key="index" :style="'background-color:'+item.BGcolor">
      <div><svg aria-hidden="true" class="icon">
        <use :xlink:href="item.icon"></use>
      </svg></div>
      <div>
        <p class="card-title">{{item.title}}</p>
        <p class="card-tip">{{item.tip}}</p>
      </div>
    </div>
  </div>
  </div>
</template>

<script lang="ts" setup>
import {onBeforeMount, reactive, toRefs} from "vue";
import {successApi} from "../../API/login";
// const flag=ref<string>('骑手')
const state=reactive<object>({
  flag:'总账户',
  icon:'#icon-a-zongzhanghao_huaban1fuben13',
  card:[
    {
      icon:'#icon-a-yinhangka_huaban1fuben17',
      title:'银行卡',
      tip:'工资入账',
      status:1,
      BGcolor:'#fff3f4',
      url:''
    },
    {
      icon:'#icon-a-wuliao_huaban1fuben20',
      title:'物料',
      tip:'公司通知实时速递',
      status:1,
      BGcolor:'#fdf7ff',
      url:''
    },
    {
      icon:'#icon-a-renyuanguanli_huaban1fuben18',
      title:'人员管理',
      tip:'人员状态快速查看',
      status:1,
      BGcolor:'#fffaf2',
      url:''
    },
    {
      icon:'#icon-a-danliangfenxi_huaban1fuben16',
      title:'单量分析',
      tip:'各地区单量数据',
      status:1,
      BGcolor:'#f0f8fe',
      url:''
    },
    {
      icon:'#icon-a-tongzhi_huaban1fuben19',
      title:'通知',
      tip:'公司通知实时速递',
      status:1,
      BGcolor:'#f1fff5',
      url:''
    },
    {
      icon:'#icon-a-yijianfankui_huaban1fuben21',
      title:'意见反馈',
      tip:'疑问解答',
      status:1,
      BGcolor:'#eefffe',
      url:''
    }
  ]
})
const {flag,icon,card}=toRefs(state)
onBeforeMount(() => {
  successApi().then((res) => {
    console.log(res);
  });
});
</script>

<style lang="scss" scoped>
.page {
  padding-left: 24px;
  padding-right: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 220px;
  background: url("src/assets/image/homeBG.png") no-repeat center;
  background-size: 100%;
  color: #ffffff;
  .page-user-info{
    display: flex;
    font-size: 32px;
    font-weight: bolder;
    .page-user-info-img{
      width: 85px;
      height: 85px;
      border-radius: 50%;
      border: 1px solid #ffffff;
      img{
       width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .page-user-info-title{
      margin-left: 25px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .page-user-info-flag{
        padding: 2px 10px 2px 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 24px;
        color: #ffffff;
        background-color: #feb942;
        border-radius: 12px;
        svg{
          width: 48px;
          height: 32px;
        }
        p{
          flex-wrap: nowrap;
          font-size: 12px;
          transform: scale(0.9);
        }
      }
    }
  }
}
.card{
  margin: 30px 24px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  >div{
    margin-bottom: 15px;
    padding: 30px 20px;
    display: flex;
    align-items: center;
    width: 43%;
    height: 100px;
    text-align: left;
    border-radius: 10px;
    >div:first-child{
      margin-right: 30px;
      width: 60px;
      height: 60px;
      svg{
        width: 100%;
        height: 100%;
      }
    }

    .card-title{
      font-size: 24px;
      color: #333333;
    }
    .card-tip{
      font-size: 20px;
      color: #999999;
    }

  }
}
</style>
