<template>
  <div>
    <div class="adiv">
      <van-icon name="arrow-left" class="icon" @click="$router.push('/')" />
      <h1>登录/注册</h1>
    </div>
    
    <van-form @submit="onSubmit" v-if="tf">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
      />

      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
      />

      <van-button
        block
        type="info"
        native-type="submit"
        :color="myColor"
        class="btn"
        >提交</van-button
      >
      <p>还没有账号吗，点我去注册呀！<span @click="tf = !tf">注册</span></p>
    </van-form>

    <van-form @submit="onSubmit1" v-else>
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
      <p>注册好账号了吗，点我去登录呀！<span @click="tf = !tf">登录</span></p>
    </van-form>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      tf: true,
      username: "",
      password: "",
      username1: "",
      password1: "",
      yzm: "",
      gerenxinxi: [],
    };
  },
  methods: {
    yzmfn() {
      let params = new FormData();
      params.append("mobile", this.username1);
      params.append("type", "register");
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
          " https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http/user/reg",
          params,
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        .then((res) => {
          console.log("res: ", res.data.msg);
          this.$toast(res.data.msg);
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    },
    onSubmit(values) {
      let params = new FormData();
      params.append("username", this.username);
      params.append("password", this.password);
      axios
        .post(
          "https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http/user/login",
          params,
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        .then((res) => {
          console.log("res: ", res);
          this.gerenxinxi = res.data;
          this.$toast(res.data.msg);
          if (res.data.msg == "登录成功") {
            //  this.$router.push({path:'/',query:{data:res.data}})
            // bus.$emit("myprops",res.data)
            // bus.$emit("mydata",res.data)
            this.$router.push("/");

            // sessionStorage.setItem("uid",res.data.uid)
            // sessionStorage.setItem("username",res.data.username)

            sessionStorage.setItem("mydata", JSON.stringify(res.data));
          }
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    },
  },
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
  margin-bottom: 50px;
}
h1 {
  margin: 0 auto;
  font-size: 16px;
}
.icon {
  font-size: 32px;
}
.btn {
  width: 80vw;
  font-size: 16px;
  margin: 0 auto;
  margin-top: 50px;
}
p {
  width: 100vw;
  text-align: center;
  color: #aeaeae;
  margin-top: 20px;
  font-size: 16px;
}
p span {
  color: $mycolor;
}
.yzm {
  float: right;
  margin: 20px;
}
</style>

