<template>
  <div>
    <div class="adiv">
      <van-icon name="arrow-left" class="myicon" @click="$router.back()" />
      <h1>我的发布</h1>
    </div>

    <van-panel
      v-for="(item, index) in mysendlist"
      :key="index"
      :title="`第${index + 1}条发布`"
      :desc="
        new Date(parseInt(item.time)).toLocaleString().replace(/:\d{1,2}$/, '')
      "
    >
      <div class="con">我的发布标题《{{ item.title }}》</div>
      <template #footer>
        <van-button size="small" type="danger" @click="del(index)"
          >按钮</van-button
        >
      </template>
    </van-panel>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "mysend",
  data() {
    return {
      mysendlist: [],
      mydata: JSON.parse(sessionStorage.getItem("mydata")),
    };
  },
  methods: {
    del(index) {
      // alert(this.mysendlist[index]._id)
      axios
      .post(
        `https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http/api/del_user_article`,
        {
          _id:this.mysendlist[index]._id,
          uid:this.mydata.uid

        }
      )
      .then((result) => {
        console.log("result: ", result);
       this.$toast(result.data.msg)
      })
      .catch((err) => {
        console.log("err: ", err);
      });
    },
  },
  created() {
    axios
      .get(
        `https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http/api/get_user_article_list?uid=${this.mydata.uid}&skip&limit`
      )
      .then((result) => {
        console.log("result: ", result);
        this.mysendlist = result.data.data;
      })
      .catch((err) => {
        console.log("err: ", err);
      });
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
.con {
  font-size: 16px;
  text-indent: 19px;
}
</style>

