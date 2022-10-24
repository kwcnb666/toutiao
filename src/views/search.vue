    <template>
    <div>
        <div class="adiv">
        <van-icon name="arrow-left" class="myicon" @click="$router.push('/')" />
        <h1>搜索</h1>
        </div>
        <form action="/">
        <van-search
            v-model="value"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
            @input="oninput"

        />
        </form>
        <div class="datalist">
            <div v-for="item in list"   :key="item.id">
                <van-icon name="search"></van-icon>
                <span> {{ item.title }}</span>
            </div>
        </div>
        
    </div>
    </template>

    <script>
        import axios from "axios"
    export default {
    name: "",
    data() {
        return { value: "",
            list:[]
        };
    },
    methods: {
        oninput(){
                    this.onSearch()
        },
        onSearch(val) {
            axios
        .post(
        " https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http/api/search",
        {
            skip: 0, //起始条数
            limit: 10, //一次返回的条数
            key_word: this.value, //关键字
        }
        )
        .then((res) => {
            console.log('res: ', res);
            this.list=res.data.data
        });
 
        },
        onCancel() {
        this.$toast("取消");
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
    }
    h1 {
    margin: auto;
    font-size: 16px;
    }
    .myicon {
    font-size: 32px;
    }
    .datalist {
    margin: 8px 0px;
    padding: 0 15px 0 20px;
    font-size: 14px;
    background-color: #fff;
    line-height: 2em;
    
    &>div {
        padding: 8px 0;
        border-bottom: 1px dotted #ccc;
    }
    span{
        width: 80vw;
        display: inline-block;
                    line-height: 1.5em;
            word-break: normal;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
    }

}
    </style>

