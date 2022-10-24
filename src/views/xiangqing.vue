<template>
  <div>
    <div class="adiv">
      <van-icon name="arrow-left" class="myicon" @click="$router.push('/')" />
      <h1>文章详情</h1>
    </div>
    <div class="guding">
      <div class="list">
        <h1>{{ list.title }}</h1>
        <div class="title">
          <div class="myimg">
            <img @error="myerror" :src="list.avatar" alt="" />
          </div>
          <div class="info">
            <h2>{{ list.nickname }}</h2>
            <p>
              <span>
                {{
                  new Date(parseInt(list.time))
                    .toLocaleString()
                    .replace(/:\d{1,2}$/, "")
                }}</span
              >
            </p>
          </div>

          <div class="guanzhu">关注</div>
        </div>
        <van-divider
          :style="{ color: myColor, borderColor: myColor, padding: '0 16px' }"
        >
          内容
        </van-divider>
        <div class="msg">
          <p>{{ list.content }}</p>

          <img :src="list.imageSrc" class="imgmy" alt="" />
        </div>
      </div>
      <div class="pinglun">
        <div class="tit">
          <h6>评论{{ list.comment }}</h6>
          <p>
            <span>{{ list.like }}赞</span>||<span>转发{{ list.fav }}</span>
          </p>
        </div>
        <div class="content" v-for="item in pllist" :key="item.id">
          <div class="tit">
            <div class="mytouxiang">
              <van-image class="touxiang" round :src="item.info.avatar" />
            </div>
            <h5>{{ item.info.nickname }}</h5>
            <p><van-icon name="thumb-circle-o" />{{ item.like_count }}</p>
          </div>
          <div class="con">
            <h3>{{ item.content }}</h3>
            <p>{{ new Date(parseInt(item.create_time)).toLocaleString() }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="fbottom">
      <input type="text" name="" id="" placeholder="写评论" v-model="pinglun" />
      <van-icon name="comment-o" :badge="list.comment" @click="send" />
      <van-icon name="like-o" @click="like" />

      <van-icon name="star-o" />
      <van-icon name="share-o" @click="showShare = true"/>
    </div>
  
<van-share-sheet
  v-model="showShare"
  title="立即分享给好友"
  :options="options"
  @select="onSelect"
/>
  </div>
</template>

<script>
import axios from "axios";
import { Col } from 'vant';
export default {
  name: "xiangqing",
  data() {
    return {
        showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
      ],
      item_id: this.$route.query.item_id,
      cate_id: this.$route.query.cate_id,
      list: [],
      islike: true,
      pllist: [],
      pinglun:"",
       mydata: JSON.parse(sessionStorage.getItem("mydata")),
    };
  },
  methods: {
    myerror(e) {
      e.target.src = require("../assets/moren.png");
    },
      onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
    getpinglun(){
          axios
      .post(
        "https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http/api/get_comment_list",
        {
          article_id: this.item_id,
          skip: 0,
          limit: 10,
          user_id: this.cate_id,
        }
      )
      .then((result) => {
        console.log("pllist: ", result);
        this.pllist = result.data.data;
      })
      .catch((err) => {
        console.log("err: ", err);
      });
    },
    shuju(){
        axios
      .post(
        "https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http/api/get_article_detail",
        {
          article_id: this.item_id,
          user_id: this.cate_id,
        }
      )
      .then((result) => {
        console.log("result: ", result);
        this.list = result.data.data;
      })
      .catch((err) => {
        console.log("err: ", err);
      });
      console.log('1', 1)
    },
    send() {
  
      axios
        .post(
          "https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http/api/add_comment",
          {
            user_id: this.mydata.uid,
            article_id: this.item_id,

            content:this.pinglun, 
            reply_comment_id: "", 
            comment_type: 0, 
          }
        )
        .then((result) => {
          console.log("pllist: ", result);
         this.$toast(result.data.msg);
          if(result.data.msg=="评论成功"){
          this.getpinglun()
          this.shuju()

            }
        })
        .catch((err) => {
          console.log("err: ", err);
        });
    },
    like() {
      // if (this.islike == true) {
        axios
          .post(
            " https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http/api/like",
            { user_id: this.cate_id, article_id: this.item_id }
          )
          .then((result) => {
            console.log("result: ", result);
            this.$toast(result.data.msg);
            this.islike = false;
            if(result.data.msg=="点赞成功"){
          this.shuju()
          

            }
          })
          .catch((err) => {
            console.log("err: ", err);
          });
      // } else {
      //   axios
      //     .post(
      //       " https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http/api/unlike",
      //       { user_id: this.cate_id, article_id: this.item_id }
      //     )
      //     .then((result) => {
      //       console.log("result: ", result);
      //       this.$toast(result.data.msg);
      //       this.islike = true;
      //     })
      //     .catch((err) => {
      //       console.log("err: ", err);
      //     });
      // }


    },
  },
  created() {
  this.shuju()
  this.getpinglun()
  
  },
};
</script>

<style lang="scss" scoped>
.guding {
  margin-bottom: 60px;
}
.adiv {
  width: 100vw;
  height: 50px;
  background-color: $mycolor;
  display: flex;
  align-items: center;
  color: aliceblue;
  font-size: 14px;
  position: fixed;
  top: 0;
  left: 0;
}
h1 {
  margin: auto;
  font-size: 16px;
  word-wrap: break-word;
}
.myicon {
  font-size: 32px;
}
.list {
  width: 100vw;
  margin-top: 60px;

  h1 {
    font-size: 30px;
    padding: 20px;
  }
  h2 {
    font-size: 24px;
  }
  .title {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100vw;
    height: 60px;

    .myimg {
      width: 50px;
      height: 50px;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50px;
      }
    }
    .info {
      display: flex;
      width: 200px;
      height: 60px;
      justify-content: space-between;
      flex-direction: column;
      p {
        font-size: 16px;
        color: #777171;
      }
    }
    .guanzhu {
      width: 70px;
      color: white;
      line-height: 30px;
      text-align: center;
      height: 30px;
      background: $mycolor;
      font-size: 16px;
    }
  }
  .msg {
    padding: 20px;
    line-height: 20px;
    text-indent: 20px;
    font-size: 16px;
    p {
      word-wrap: break-word;
    }
    .imgmy {
      max-width: 100%;
      display: block;
      border-radius: 10px;
      margin: 8px auto 8px;
    }
  }
}
.fbottom {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 15px;
  position: fixed;
  bottom: 10px;
  left: 0;

  input {
    border: 1px solid #ededed;
    border-radius: 15px;
    padding: 6px 8px;
    font-size: 14px;
    text-align: center;
  }

  .van-icon {
    padding: 5px;
    margin: 0 5px;
    font-size: 20px;
  }
}
.pinglun {
  width: 100vw;

  .tit {
    padding: 20px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h6 {
      font-size: 24px;
    }
    p {
      font-size: 16px;
      color: #777171;
    }
  }
}
.content {
  width: 100vw;
  .tit {
    display: flex;
    .mytouxiang {
      width: 50px;
      height: 50px;
      img {
        width: 100%;
        border-radius: 100px;
      }
    }
    h5 {
      width: 60vw;
      font-size: 18px;
    }
  }
  .con {
    width: 70vw;
    margin-left: 80px;
    padding: 5px;
  }
  h3 {
    font-size: 16px;
  }
  p {
    font-size: 12px;
    color: #777171;
    margin-top: 5px;
  }
}
</style>

