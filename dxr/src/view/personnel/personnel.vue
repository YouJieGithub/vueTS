<template>
  <Sticky>
  <HeadBack :title="'人员管理'"></HeadBack>
  <Search v-model="value" background="#f7f7ff" placeholder="请输入姓名或手机号码搜索" />
  <Tabs v-model:active="active" background="#f7f7ff">
    <Tab v-for="(item,index) in tabs" :name="index" :title="item"></Tab>
  </Tabs>
  </Sticky>
    <List
        v-model:loading="loading"
        :finished="finished"
        class="personnel-page"
        finished-text="没有更多了"
        @load="onLoad"
    >
      <div v-for="item in 23" key="index" class="personnel">
        <div class="personnel-user">张超<Tag class="personnel-user-tag" color="#f0f8fe" text-color="#0089ff">龙首原站</Tag></div>
        <div class="personnel-info">
          <div>手机号码：<span>15891423589</span></div>
          <div>工号：<span>222036</span></div>
        </div>
        <div class="personnel-info">
          <div>美团ID：<span>220123</span></div>
          <div>入职日期：<span>2021-07-14</span></div>
        </div>
      </div>
    </List>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const tabs=ref<array>([  '试岗期','正式','离职中','已离职'])
const active=ref<number>(0)
</script>

<style lang="scss" scoped>
.personnel-page{
  padding: 20px 0;
  background-color: #f7f7ff;
}
.personnel{
  margin: 0px 24px 20px;
  padding: 30px;
  height: 190px;
  background-color: #ffffff;
  border-radius: 12px;
  .personnel-user{
    margin-bottom: 39px;
    font-size: 28px;
    color: #333333;
    text-align: left;
    .personnel-user-tag{
      margin-left: 33px;
      padding: 5px 12px;
      font-size: 16px;
      transform: scale(0.78);
      border-radius:4px;
    }
  }
  .personnel-info{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
    color: #999999;
    >div{
      flex: 1;
      line-height: 42px;
      text-align: left;
      span{
        font-weight: bolder;
      }
    }
  }
}
</style>