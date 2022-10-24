<template>
  <div class="home">
    <div class="adiv">
      <van-icon name="arrow-left" class="icon" @click="$router.push('/')" />
      <h1>发布</h1>
    </div>
    <div class="kongbai"></div>
    <van-cell-group>
      <van-field placeholder="请输入标题" v-model="tit" />
    </van-cell-group>
    <div class="kongbai"></div>
    <van-field
      rows="2"
      v-model="msg"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入内容"
      show-word-limit
    />

    <div class="kongbai"></div>
    <van-field
      readonly
      clickable
      name="picker"
      :value="value"
      label="选择分类名字"
      placeholder="点击选择分类名字"
      @click="showPicker = true"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
    <van-uploader :after-read="afterRead" v-model="fileList" multiple @click-upload="dian" />
    <div class="yes" @click="btn">确定</div>
  </div>
</template>

<script>
import axios from "axios";
import {nanoid} from "nanoid"


export default {
  name: "fabu",
  data() {
    return {
      value: "",
      tit: "",
      msg: "",
      index:0,
      fenlei:[],
       nanoid:nanoid(),
       token:"",
       fileList:[],
       url:"",
      columns: [
        
        "婚恋交友",
        "招聘求职",
        "装修装饰",
        "明日头条",
        "今日头条",
        "劳力市场",
      ],
      showPicker: false,
      //   uid:sessionStorage.getItem("uid"),
      // username:sessionStorage.getItem("username"),
      mydata:JSON.parse(sessionStorage.getItem('mydata'))
    };
  },
  //   created(){
  //   bus.$on("mydata",(data)=>{
  //     console.log('data ', data);
  //     // this.mydata=data

  //   })
  // },
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
            this.url='http://toutiao.longxiaokj.com/'+result.data.key
            console.log('first', 'http://toutiao.longxiaokj.com/'+result.data.key)

        })
        .catch((err) => {
            console.log('err: ', err);
            
        });
   
      // console.log(file.file.name);
    },
    onConfirm(value,index) {
      this.value = value+index;
      this.index = index;

      this.showPicker = false;
    },
    btn() {
      axios
        .post(
          "https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http/api/add_article",
          {
            title: this.tit,
            content: this.msg,
            cate_id: this.fenlei[this.index]._id,
            cate_name:this.value,
            author: "阿巴阿巴",
            author_id:this.mydata.uid,
            imageSrc: [
            this.url
            ],
          }
        )
        .then((res) => {
          console.log("post", res);
          this.$notify(res.data.msg);
        })
        .catch((err) => {
          console.log("post", err);
        });
    },
  },
  created () {
   
      axios
      .get(
        " https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http/api/get_cate_list"
      )
      .then((result) => {
        console.log("get", result);
        this.fenlei = result.data.data;
      })
      .catch((err) => {
        console.log("get", err);
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

.kongbai {
  width: 100%;
  height: 20px;
  background-color: #f5f7f9;
}

.yes {
  width: 80%;
  height: 50px;
  background-color: $mycolor;
  display: flex;
  align-items: center;
  justify-content: center;
  color: aliceblue;
  font-size: 14px;
  margin: 0 auto;
}
h1 {
  margin: 0 auto;
  font-size: 16px;
}
.icon {
  font-size: 32px;
}
</style>

