<template>
  <div class="salarycard">
    <HeadBack :title="'银行卡'"></HeadBack>
    <div class="salary-card-content">
      <div class="salary-card-content-icon"><img alt="银行卡" src="src/assets/image/card.png"></div>
      <div class="salary-card-content-info">
        <p>中国建设银行</p>
        <p>{{cardNum}}</p>
      </div>
    </div>
    <div class="salary-card-content-but">
      <Button plain type="primary">修改银行卡</Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Desensitization} from '../../utils/RegIndex/desensitization'

const val="4201011962062875"

const cardNum=Desensitization.cardProcess(val)
console.log(cardNum)
</script>

<style lang="scss" scoped>
.salarycard{
  padding: 40px 24px;
  height: 100%;
  background-color: #ffffff;
}
.salary-card-content{
  padding: 40px 30px;
  display: flex;
  height: 240px - 40px - 40px;
  background: url("src/assets/image/cardBG.png") no-repeat center;
  background-size: 100%;
  border-radius: 12px;
  .salary-card-content-icon{
    width: 60px;
    height: 60px;
    line-height: 60px;
    background-color: #ffffff;
    border-radius: 50%;
    img{
      width: 31px;
      height: 23px;
    }
  }
  .salary-card-content-info{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 30px;
    color: #ffffff;
    text-align: left;
    p:first-child{
      line-height: 60px;
      font-size: 28px;
    }
    p:last-child{
      font-size: 40px;
    }
  }
}
.salary-card-content-but{
  margin-top: 50px;

  ::v-deep(button){
    width: 100%;
    height: 80px;
    font-size: 28px;
    letter-spacing: 6px;
    color: #0089ff;
    border-radius: 12px !important;
  }
}

</style>