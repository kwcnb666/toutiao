<template>
  <div>
    <div class="adiv">
      <van-icon name="arrow-left" class="icon" @click="$router.back()" />
      <h1>忘记密码</h1>
    </div>
     <van-form @submit="onSubmit1" >
      <van-field
        v-model="password"
        type="password"
        name="旧密码"
        label="旧密码"
        placeholder="旧密码"
      />

      <van-field
        v-model="password1"
        type="password"
        name="新密码"
        label="新密码"
        placeholder="新密码"
      />
    
      
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
    name:"modify",
    data() {
        return {
           password: "",
      password1: "",
    mydata: JSON.parse(sessionStorage.getItem("mydata"))
        }
    },
    methods: {
       
    onSubmit1(values) {
      let params = new FormData();
      params.append("oldPassword", this.password);
      params.append("newPassword", this.password1);
      params.append("uid", this.mydata.uid);

      axios
        .post(
          "   https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http/user/updatePwd",
          params,
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        .then((res) => {
          console.log("res: ", res);
          if(res.data.msg=='修改成功'){
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

