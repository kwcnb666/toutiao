<template>
  <div class="index">
    <div class="top">
      <div class="header">
        <div class="search" @click="$router.push('/search')">
          <van-swipe
            class="myheight"
            vertical
            :show-indicators="false"
            :autoplay="2000"
          >
            <van-swipe-item v-for="item in fenlei" :key="item.id">{{
              item.name
            }}</van-swipe-item>
          </van-swipe>
        </div>
      </div>

      <van-tabs color="mycolor" v-model="active" border>
        <van-tab :title="item.name" v-for="item in fenlei" :key="item.id">
        </van-tab>
      </van-tabs>
    </div>
    <div class="mylist">
      <div class="list" v-for="item in list" :key="item.id">
        <router-link
          :to="{ path: '/xiangqing', query: { item_id:item._id,cate_id:item.cate_id} }"
          custom
          v-slot="{ navigate }"
        >
          <span @click="navigate" @keypress.enter="navigate" role="link">
            <li v-if="item.imageSrc.length == 0" class="zero">
              <h6>{{ item.title }}</h6>
              <p>
                <span>作者：{{ item.author }}</span
                ><span>{{ item.comment }}条评论</span
                ><span
                  >发布时间{{
                    new Date(parseInt(item.time))
                      .toLocaleString()
                      .replace(/:\d{1,2}$/, "")
                  }}</span
                >
              </p>
            </li>
            <li v-if="item.imageSrc.length == 1" class="one">
              <div class="f">
                <div class="zuo">
                  <h6>{{ item.title }}</h6>
                </div>
                <div class="myimg you">
                  <img :src="item.imageSrc" @error="myerror" alt="" />
                </div>
              </div>
              <p>
                <span>作者：{{ item.author }}</span
                ><span>{{ item.comment }}条评论</span
                ><span
                  >发布时间{{
                    new Date(parseInt(item.time))
                      .toLocaleString()
                      .replace(/:\d{1,2}$/, "")
                  }}</span
                >
              </p>
            </li>
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "index",
  components: {},

  data() {
    return {
      active: 0,
      list: [],
      fenlei: [],
      loading: false,
      finished: false,
      limit: 10,
      mydata: JSON.parse(sessionStorage.getItem("mydata")),
    };
  },
  computed: {
    cate_id() {
      // return    this.fenlei[this.active] && this.fenlei[this.active]._id
      return this.fenlei[this.active]?._id;
    },
  },
  watch: {
    cate_id() {
      // this.onLoad();
      this.getlist();
    },
  },
  created() {
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
  },
  methods: {
    myerror(e) {
      e.target.src = require("../assets/error.png");
    },
    getlist() {
      axios
        .post(
          " https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http/api/get_article_list",
          {
            cate_id: this.cate_id, //分类ID
            skip: 0,
            limit: 10,
          }
        )
        .then((result) => {
          console.log("get", result);
          this.list = result.data.data;
        })
        .catch((err) => {
          console.log("get", err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.index {
  .header {
    width: 100vw;
    height: 50px;
    background-color: $mycolor;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .search {
    width: 80vw;
    height: 30px;
    border-radius: 50px;
    background-color: rgba(244, 242, 242, 0.5);
    text-align: center;
    line-height: 30px;
    color: white;
  }
  .myheight {
    height: 30px;
    font-size: 16px;
  }
  .top {
    width: 100vw;
    position: fixed;
    right: 0px;
    top: 0px;
  }
  .mylist {
    width: 100vw;
    margin-top: 100px;
    .list {
      padding: 10px;
    }
    h6 {
      font-size: 16px;
      word-wrap: break-word;
    }
    h6,
    p {
      padding: 10px;
    }
    p {
      font-size: 12px;
      color: #aeaeae;
      margin: 0px 0px 0px 0px;
    }
    .zero {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      h6 {
        width: 330px;
      }
    }
    .one {
      .f {
        display: flex;
      }
      h6 {
        width: 200px;
      }
      .zuo {
        flex: 2;
      }
      .you {
        flex: 1;
        img {
          width: 123px;
          height: 72px;
        }
      }
    }
  }
}
</style>

