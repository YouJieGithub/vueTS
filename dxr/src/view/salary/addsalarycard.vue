<template>
  <HeadBack :title="'添加银行卡'"></HeadBack>
  <Form>
    <CellGroup>
    <Field
        v-model="username"
        label="持卡人："
        name="持卡人"
        readonly
    />
    <Field
        v-model.trim.number="card"
        input-align="right"
        label="卡号："
        name="卡号"
        placeholder="请输入银行卡号"
    />
    <Field
        v-model="cardsite"
        input-align="right"
        label="支行地址："
        name="支行地址"
        placeholder="请输入支行地址"
    />
    </CellGroup>
    <cell :border="false" style="background-color: #f7f7ff;">
      <p><svg aria-hidden="true" class="icon">
        <use xlink:href="#icon-a-tishi_huaban1fuben51"></use>
      </svg><span>请绑定本人银行卡</span></p>
    </cell>
    <div class="add-salary-card">
      <Button class="bigButton" native-type="submit" type="primary"><span class="button-text">确认</span></Button>
    </div>
  </Form>
</template>

<script lang="ts" setup></script>



<style lang="scss" scoped>
p{
  font-size: 24px;
  line-height: 48px;
  text-align: left;
  color: #ee7e2b;
  svg{
    width: 20px;
    height: 20px;
  }
  span{
    margin-left: 10px;
  }
}
.add-salary-card{
  margin-top: 148px;
  .button-text{
    font-size: 28px;
    letter-spacing: 14px;
    color: #ffffff;
  }
}

</style>