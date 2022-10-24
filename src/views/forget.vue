<template>
  <div>
    <div class="adiv">
      <van-icon name="arrow-left" class="icon" @click="$router.back()" />
      <h1>忘记密码</h1>
    </div>
     <van-form @submit="onSubmit1" >
      <van-field
        v-model="username1"
        name="用户名"
        label="用户名"
        placeholder="用户名"
      />

      <van-field
        v-model="password1"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
      />
      <van-field
        v-model="yzm"
        type="number"
        name="验证码"
        label="验证码"
        placeholder="验证码"
      />
      <van-tag type="primary" round :color="myColor" class="yzm" @click="yzmfn"
        >获取验证码</van-tag
      >
      <van-button
        block
        type="info"
        native-type="submit"
        :color="myColor"
        class="btn"
        >提交</van-button
      >
     
    </van-form>
  </div>
</template>

<script>
import axios from "axios"
export default {
    name:"forget",
    data() {
        return {
           username1: "",
      password1: "",
      yzm: "", 
        }
    },
    methods: {
         yzmfn() {
      let params = new FormData();
      params.append("mobile", this.username1);
      params.append("type", "login");
      axios
        .post(
          "https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http/user/sendSms",
          params,
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        .then((res) => {
          console.log("res: ", res.data.data);
          this.yzm = res.data.data;
          this.$toast("验证码是" + res.data.data);
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    },
    onSubmit1(values) {
      let params = new FormData();
      params.append("username", this.username1);
      params.append("password", this.password1);
      params.append("vercode", this.yzm);

      axios
        .post(
          "  https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http/user/forget",
          params,
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        .then((res) => {
          console.log("res: ", res.data.msg);
          if(res.data.msg=='密码重置成功'){
            sessionStorage.clear()
            this.$router.push('/login')

          }
          this.$toast(res.data.msg);
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    },
    },

}
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
  margin-bottom: 50px;
}
h1 {
  margin: 0 auto;
  font-size: 16px;
}
.icon {
  font-size: 32px;
}
.yzm {
  float: right;
  margin: 20px;
}
</style>

