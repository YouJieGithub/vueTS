<template>
  <NavBar :border="false" class="nav" fixed left-arrow placeholder safe-area-inset-top @click-left="onClickLeft">
    <template #title>
      <span class="nav-title">{{title}}</span>
    </template>
    <template #right >
      <slot></slot>
    </template>
  </NavBar>
</template>

<script lang="ts" setup>
defineProps<{
  title:string
}>()
const onClickLeft = () => history.back();
</script>

<style lang="scss" scoped>
.nav{
  //::v-deep(.van-nav-bar__arrow){
  //  font-size: 36px;
  //}
}
.nav-title{
  font-size: 28px;
}

</style>