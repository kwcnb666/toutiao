<template>
  <div>
   <div class="adiv">
      <van-icon name="arrow-left" class="myicon" @click="$router.back()" />
      <h1>我的历史浏览</h1>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
    name:"",
    data() {
        return {
            mydata: JSON.parse(sessionStorage.getItem("mydata")),
        historylist:[]

        }
    },
    methods: {
        
    },
    created() {
axios
    .post(
        `https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http/api/get_history_list?uid=${this.mydata.uid}&skip&limit`
    )
    .then((result) => {
        console.log("result: ", result);
        this.historylist = result.data.data;
      })
      .catch((err) => {
        console.log("err: ", err);
      });
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
</style>

