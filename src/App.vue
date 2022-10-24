<template>
  <div id="app">
    <router-view />
    <!-- <div class="kwc">212131313</div> -->
    <van-tabbar v-model="active" :active-color="myColor" route v-show="mypage" class="myfooter">
      <van-tabbar-item icon="home-o" replace :to="item.url" v-for="item,index in tabbar" :key="index">
      {{item.name}}
        <template #icon>
          <!-- 1 -->
          <!-- <i class="iconfont icon-zhuye"></i> -->
          <!-- 2 -->
          <svg class="icon" aria-hidden="true" v-if="index==active">
            <use :xlink:href="item.icon1"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-else>
            <use :xlink:href="item.icon"></use>
          </svg>
        </template>
      </van-tabbar-item>
    
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      tabbar: [
        { name: "首页", icon: "#icon-zhuye2", icon1: "#icon-zhuye1",url: "/" },
        { name: "发布", icon: "#icon-tianjia1",icon1: "#icon-tianjia", url: "/fabu" },
        { name: "我的", icon: "#icon-wode3",icon1: "#icon-wode", url: "/home" },
      ],
    };
  },
  computed: {
    mypage() {
      return this.$route.meta.root;
    },
  },
};
</script>
<style lang="scss">
// 1
// @import url("//at.alicdn.com/t/c/font_3712582_utpmr0zst3c.css");

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.myfooter{
  position: fixed;
  bottom: 0;left: 0;
}
// .kwc{
//   color: $mycolor;
// }
</style>
