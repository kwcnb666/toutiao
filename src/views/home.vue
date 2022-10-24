<template>
  <div>
    <div class="adiv">
      <van-icon name="arrow-left" class="myicon" @click="$router.push('/')" />
      <h1>我的</h1>
    </div>

    <div
      class="dl"
      style="margin: 16px"
      @click="$router.push('/login')"
      v-if="mydata == null"
    >
      <!-- <van-button block type="info" native-type="submit" :color="myColor"
        >点击登录</van-button
      > -->
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-denglu"></use>
      </svg>
    </div>
    <div v-else>
      <!-- <van-panel
        class="info"
        :title="this.mydata.username"
        :desc="this.mydata.uid"
        :status="this.mydata.msg"
      >
        <template #default>
          <div class="a">
            登录时间：{{
              new Date(parseInt(mydata.userInfo.last_login_date))
                .toLocaleString()
                .replace(/:\d{1,2}$/, "")
            }}
          </div>
        </template>
        <template #footer>
          <van-button size="small" type="danger" class="juzhong" @click="tuichu"
            >退出登录</van-button
          >
        </template>
      </van-panel> -->
      <div class="mytouxiang">
  <van-image class="touxiang" round :src="this.mydata1.userInfo.avatar"/>
 

      </div>
       
      <van-cell-group title="个人信息">
        <van-cell title="用户名" :value="this.mydata1.userInfo.nickname" />
        <van-cell title="用户ID" :value="this.mydata.username" />
        <van-cell title="登录状态" :value="this.mydata.msg" />
        <van-cell
          title="登录时间"
          :value="
            new Date(parseInt(mydata1.userInfo.last_login_date))
              .toLocaleString()
              .replace(/:\d{1,2}$/, '')
          "
        />
   
        <van-cell title="性别" :value="this.mydata1.userInfo.sex" />
        <van-cell title="生日" :value="this.mydata1.userInfo.birthday" />



      </van-cell-group>
      <van-cell value="" is-link @click="tuichu">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <van-tag type="danger">退出登录</van-tag>
        </template>
      </van-cell>
    </div>
    <van-grid>
  <van-grid-item icon="photo-o" text="我的发布" @click="$router.push('/mysend')" />
  <van-grid-item icon="photo-o" text="历史浏览" @click="$router.push('/history')" />
  <van-grid-item icon="photo-o" text="修改详细信息" @click="genggai"/>
  <van-grid-item icon="photo-o" text="忘记密码"  @click="$router.push('/forget')"/>
  <van-grid-item icon="photo-o" text="修改密码"  @click="$router.push('/modify')"/>

</van-grid>
    <!-- <van-grid square>
      <van-grid-item
        v-for="(value, index) in this.shuju"
        :key="index"
        :icon="value.icon"
        :text="value.name"
      />
    </van-grid> -->
  </div>
</template>

<script>
import axios from 'axios';
import bus from "../eventBus/index";
export default {
  name: "home",
  data() {
    return {
      
      mydata: JSON.parse(sessionStorage.getItem("mydata")),
      mydata1:[]
     
    };
  },
  methods: {
    genggai(){
        this.$router.push({name:'genggai',params:{
          sex:this.mydata1.userInfo.sex,
          birthday:this.mydata1.userInfo.birthday,
          nickname:this.mydata1.userInfo.nickname,
          avatar:this.mydata1.userInfo.avatar

          
          }})
    },
    tuichu() {
      // alert(1)
      sessionStorage.removeItem("mydata");
      this.$toast("退出登录");
      this.mydata = null;
    },
  },
  created(){
    axios.post("https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http/user/getuserInfo",
    {token:this.mydata.token}).then((result) => {
      console.log('result: ', result);
      this.mydata1=result.data
    }).catch((err) => {
      
    });
  }
};
</script>

<style lang="scss" scoped>

.adiv {
  width: 100vw;
  height: 50px;
  background-color: $mycolor;
  display: flex;
  align-items: center;

  color: aliceblue;
  font-size: 14px;
}
h1 {
  margin: 0 auto;
  font-size: 16px;
}
.myicon {
  font-size: 32px;
}
.info {
  font-size: 12px;
  color: #eaeaea;
}
.a {
  margin: 20px;
}
.juzhong {
  margin-left: 45vw;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  font-size: 100px;
}
.dl {
  text-align: center;
}
.mytouxiang{
  width: 100vw;
  text-align: center;
  margin-top: 20px;
.touxiang{
width: 60px;height: 60px;
}
}
</style>

