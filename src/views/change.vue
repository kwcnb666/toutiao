    <template>
  <div>
    <div class="adiv">
      <van-icon name="arrow-left" class="myicon" @click="$router.back()" />
      <h1>修改个人信息</h1>
    </div>

    <van-cell-group title="修改个人详细信息">
      <van-field v-model="nickname" label="昵称" placeholder="请输入昵称" />
      <van-field v-model="birthday" label="生日" placeholder="请输入生日" />
      <van-field v-model="sex" label="性别" placeholder="请输入性别" />

      <van-button
        type="button"
        size="large"
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        @click="change"
        >大号按钮</van-button
      >
    </van-cell-group>

    <div>
      <input
        class="file"
        name="file"
        type="file"
        accept="image/png,image/gif,image/jpeg"
        @change="update"
      />

      <button @click="huoqu">获取</button>

      <button @click="sc">上传</button>
    </div>
    
  </div>
</template>

    <script>
import axios from "axios";
import {nanoid} from "nanoid"

export default {
  name: "",
  data() {
    return {
      nickname: "",
      birthday: "",
      sex: "",
      token: "",
      nanoid:nanoid(),
      mydata: JSON.parse(sessionStorage.getItem("mydata")),
    };
  },
  methods: {
    update(e) {
      let file = e.target.files[0];
      console.log("e", file.name);
      
      let param = new FormData();
      param.append("token", this.token); 
      param.append("file", file); 
      param.append("key", this.nanoid+file.name);
      axios
        .post(
          "https://upload-z1.qiniup.com",
          param,{'Content-Type':'multipart/form-data'}
        )
        .then((result) => {
            console.log('result: ', result);
            console.log('first', 'http://toutiao.longxiaokj.com/'+result.data.key)

        })
        .catch((err) => {
            console.log('err: ', err);
            
        });
    },

    change() {
      // alert(1)
     
      axios
        .post(
          "https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http/user/editUserInfo",
          {
            uid: this.mydata.uid,
            avatar:
              "https://upfile.asqql.com/2009pasdfasdfic2009s305985-ts/2019-2/201922220514325302.gif", //头像
            nickname:this.nickname,
            birthday: this.birthday,
            sex: this.sex,
          }
        )
        .then((result) => {
          console.log("result: ", result);
        })
        .catch((err) => {
          console.log("err: ", err);
        });
    },
    // info() {
    //   axios
    //     .post(
    //       "https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http/user/getuserInfo",
    //       {
    //         token: this.mydata.token,
    //       }
    //     )
    //     .then((result) => {
    //       console.log("result: ", result);
    //     })
    //     .catch((err) => {
    //       console.log("err: ", err);
    //     });
    // },
    huoqu() {
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
    sc() {
      axios
        .post(
          "https://upload-z1.qiniup.com"
        )
        .then((result) => {
          console.log("huoqu: ", result);
        
        })
        .catch((err) => {
          console.log("huoqu: ", err);
        });
    },
  },
  created() {
    // this.info();
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
}
h1 {
  margin: 0 auto;
  font-size: 16px;
}
.myicon {
  font-size: 32px;
}
</style>

