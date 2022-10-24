<template>
<div>
 <van-tabbar v-model="active" active-color="#4fc08d" route>
  <van-tabbar-item icon="home-o" replace to="/">首页</van-tabbar-item>
  <van-tabbar-item icon="add-o" replace to="/add">发布</van-tabbar-item>
  <van-tabbar-item icon="manager-o" replace to="/daa">我的</van-tabbar-item>

</van-tabbar>
</div>
</template>

<script>
export default {
    name:"tabs",
  data() {
    return {
      active: 1,
    };
  },
};
</script>
<style lang="scss">


</style>