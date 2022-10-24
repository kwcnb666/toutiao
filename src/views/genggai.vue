<template>
  <div>
 <div class="adiv">
      <van-icon name="arrow-left" class="myicon" @click="$router.back()" />
      <h1>修改个人信息</h1>
    </div>
     <div class="mytouxiang">
  <van-image class="touxiang" round :src="avatar"/>
 

      </div>
        <van-uploader  :after-read="afterRead"  multiple @click-upload="dian">
  <van-button icon="plus">更改头像</van-button>
</van-uploader>
    <van-field name="sex" label="修改性别">
  <template #input>
    <van-radio-group v-model="sex" direction="horizontal">
      <van-radio name="男">男</van-radio>
      <van-radio name="女">女</van-radio>
    </van-radio-group>
  </template>
</van-field>
<van-cell-group>
  <van-field v-model="nickname" label="修改名字" placeholder="请输入名字" />
  <van-field v-model="birthday" label="修改生日" placeholder="请输入生日" />

  
</van-cell-group>

<van-cell value="" is-link @click="change">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <van-tag type="danger" >确认修改</van-tag>
        </template>
      </van-cell>
  </div>
</template>

<script>
import axios from "axios"
export default {
    name:"genggai",
    data() {
        return {
            token:"",
          nickname: this.$route.params.nickname,
      birthday: this.$route.params.birthday,
      sex: this.$route.params.sex,
      avatar:this.$route.params.avatar,
      mydata: JSON.parse(sessionStorage.getItem("mydata"))
        }
    },
    methods: {
        dian(){
            axios
        .get(
          "https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http/upload/token"
        )
        .then((result) => {
          console.log("huoqu: ", result);
          this.token = result.data.token;
        })
        .catch((err) => {
          console.log("huoqu: ", err);
        });
      },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
   
      let param = new FormData();
      param.append("token", this.token); 
      param.append("file", file.file); 
      param.append("key", this.nanoid+file.file.name);
      axios
        .post(
          "https://upload-z1.qiniup.com",
          param,{'Content-Type':'multipart/form-data'}
        )
        .then((result) => {
            console.log('result: ', result);
            this.avatar='http://toutiao.longxiaokj.com/'+result.data.key
            console.log('first', 'http://toutiao.longxiaokj.com/'+result.data.key)

        })
        .catch((err) => {
            console.log('err: ', err);
            
        });
   
      // console.log(file.file.name);
    }, 
    change() {
      // alert(1)
     
      axios
        .post(
          "https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http/user/editUserInfo",
          {
            uid: this.mydata.uid,
            avatar:
              this.avatar, //头像
            nickname:this.nickname,
            birthday: this.birthday,
            sex: this.sex,
          }
        )
        .then((result) => {
          console.log("result: ", result);
          this.$toast(result.data.msg)
          if(result.data.msg){
              this.$router.push("/home")  
          }
        })
        .catch((err) => {
          console.log("err: ", err);
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
}
h1 {
  margin: 0 auto;
  font-size: 16px;
}
.myicon {
  font-size: 32px;
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

