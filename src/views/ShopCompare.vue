<template>
  <div>
    <div
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <div class="common-breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>千岛湖美食</el-breadcrumb-item>
          <el-breadcrumb-item>饭店比拼</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-container>
        <el-main>
          <div class="first-block">
            <!-- <img src="../assets/icons/qdhc_bg.jpg" style="width:100%; height:100%"> -->
            <el-row>
              <el-col :span="24">
                <h1 style="color:white">千岛湖餐饮统计</h1>
              </el-col>
            </el-row>

            <el-row :gutter="24">
              <el-col :span="4" :offset="2">
                <div class="item">
                  <div class="title">本月评论总数</div>
                  <div class="number">{{ statistic.commentsCount }}</div>
                </div>
              </el-col>

              <el-col :span="4" :offset="1">
                <div class="item">
                  <div class="title">本月平均评分</div>
                  <div class="number">{{ statistic.commentsScoreAvg }}</div>
                </div>
              </el-col>
              <el-col :span="4" :offset="1">
                <div class="item">
                  <div class="title">餐饮总数</div>
                  <div class="number">{{ statistic.restaurantCount }}</div>
                </div>
              </el-col>
              <el-col :span="4" :offset="1">
                <div class="item">
                  <div class="title">本月差评个数</div>
                  <div class="number">{{ statistic.batCommentMonthly }}</div>
                </div>
              </el-col>
            </el-row>
          </div>

          <el-row :gutter="20" class="second-block">
            <el-col :sm="24" :md="12">
              <block-box title="同时段不同餐饮评论数对比" icon="icon-comment">
                <month-select isMulti @search="searchchart1"></month-select>
                <ve-line :data="chatData1" :settings="chartSettings1"></ve-line>
              </block-box>
            </el-col>
            <!-- </el-row> -->

            <!-- <el-row class="third-block"> -->
            <el-col :sm="24" :md="12">
              <block-box title="同时段不同餐饮评分对比" icon="icon-looks_5">
                <month-select isMulti @search="searchchart2"></month-select>
                <ve-line :data="chatData2" :settings="chartSettings2"></ve-line>
              </block-box>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="24" :md="24">
              <block-box title="词云分析，评论统计" icon="icon-looks_6">
                <el-row :sm="24" :md="24">
                  <el-col :sm="2" :md="2">
                    <template v-for="item in feature">
                      <el-badge
                        :type="item.type"
                        :value="item.count"
                        :key="item.name"
                        class="item1"
                      >
                        <el-button
                          class="btn"
                          :type="item.type"
                          size="small"
                          @click="showComments(item.key)"
                          plain
                        >{{item.name}}</el-button>
                      </el-badge>
                    </template>
                  </el-col>
                  <el-col :sm="22" :md="22">
                    <div class="block">
                      <template v-for="item in button">
                        <el-badge
                          :type="item.type"
                          :value="item.count"
                          :key="item.name"
                          class="item2"
                        >
                          <el-button
                            class="btn2"
                            :type="item.type"
                            size="small"
                            @click="clickButton(item.key)"
                            plain
                          >{{item.name}}</el-button>
                        </el-badge>
                      </template>
                      <el-carousel
                        class="card"
                        indicator-position="none"
                        trigger="click"
                        height="500px"
                        :autoplay="autoplay"
                        :interval="interval"
                        v-on:change="changeFun"
                        arrow="hover"
                      >
                        <el-carousel-item class="card-content" v-for="page in page" :key="page">
                          <el-table
                            class="table"
                            :data="currentTableData"
                            style="width: 100%"
                            tooltip-effect="dark"
                            max-height="490"
                            :show-header="showHeader"
                          >
                            <el-table-column class="text" align="left" width="1320">
                              <template slot-scope="scope" class="content">
                                <span v-html="showDate(scope.row.content)"></span>
                              </template>
                            </el-table-column>
                          </el-table>
                        </el-carousel-item>
                      </el-carousel>
                    </div>
                  </el-col>
                </el-row>
              </block-box>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import monthSelect from "../components/ShopCompare/month-select/index";
import blockBox from "../components/block-box/index";
//import randomNumber from "../components/QdhScenic/random-number/index";
import http from "../request/index.js";

export default {
  components: {
    monthSelect,
    blockBox
  },

  data() {
    return {
      loading: true,
      page: 1,
      tag: "",
      autoplay: false,
      showHeader: false,
      interval: 9000,
      currentTableData: [],
      goodComments: [],
      badComments: [],
      keywordComments: [],
      // goodNum:0,
      // badNum:0,
      feature: [
        { name: "口味", count: 12, type: "primary", key: "taste" },
        { name: "环境", count: 0, type: "warning", key: "evn" },
        { name: "服务", count: 6, type: "info", key: "server" },
        { name: "性价比", count: 2, type: "danger", key: "price" }
      ],
      featureWordArray: {
        // 特征词
        server: ["服务", "态度"],
        taste: [
          "好吃",
          "新鲜",
          "份量大",
          "鲜美",
          "口感棒",
          "口味",
          "难吃",
          "味道"
        ],
        evn: [
          "干净",
          "整洁",
          "方便",
          "卫生",
          "乱",
          "脏",
          "差",
          "精致",
          "热闹",
          "恶心",
          "不可能",
          "装修",
          "人气"
        ],
        price: [
          "实惠",
          "推荐",
          "满意",
          "排名",
          "口碑",
          "性价比",
          "强推",
          "差评",
          "失望",
          "不够吃",
          "贵",
          "不会去"
        ]
      },
      button: [
        { name: "好评", count: 0, type: "danger", key: "good" },
        { name: "差评", count: 0, type: "info", key: "bad" }
      ],
      statistic: {
        commentsCount: 0,
        commentsScoreAvg: 0,
        restaurantCount: 0,
        batCommentMonthly: 0
      },
      chatData1: {
        columns: ["全部"],
        rows: []
      },
      chatData2: {
        columns: ["全部"],
        rows: []
      },
      chartSettings1: {
        dimension: ["日期"],
        metrics: ["全部"]
      },
      chartSettings2: {
        dimension: ["日期"],
        metrics: ["全部"]
      }
    };
  },

  created() {
    this.loadData();
    this.showComments("taste");
  },
  methods: {
    async loadData() {
      try {
        const result = await http.restaurantstatistic();
        if (result.data != null) {
          this.statistic = result.data;
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.$notify.error({
          title: "出错啦",
          message: JSON.stringify(error)
        });
      }
    },
    showComments: async function(featureWord) {
      const result = await http.keywordComments({ featureWord });
      const obj = result.data;
      const number = result.resultNum;
      this.tag = featureWord;
      this.feature[0].count = number[0];
      this.feature[1].count = number[2];
      this.feature[2].count = number[1];
      this.feature[3].count = number[3];

      this.button[0].count = 0;
      this.button[1].count = 0;
      // 好评差评
      for (let i = 0; i < obj.length; i++) {
        if (obj[i][featureWord] == "1") {
          this.button[0].count++;
          this.goodComments.push(obj[i]);
        } else {
          this.button[1].count++;
          this.badComments.push(obj[i]);
        }
      }
      this.currentTableData = obj;
      this.clickButton("good");
    },

    showDate: function(val) {
      var arr = this.featureWordArray[this.tag];
      var temp = val.split(/[,，。\s\.\t!……:;~]/);
      var newStr = [];
      var Str = "";
      for (var i = 0; i < temp.length; i++) {
        // 一句话的数组
        for (var j = 0; j < arr.length; j++) {
          if (temp[i].indexOf(arr[j]) != -1) {
            temp[i] = temp[i].replace(
              temp[i],
              '<font color="#409EFF">' + temp[i] + "</font>"
            );
            break;
          }
        }
      }
      for (var i = 0; i < temp.length; i++) {
        Str += temp[i] + ",";
      }
      return Str;
    },

    clickButton: function(key) {
      if (key == "good") {
        this.keywordComments = this.goodComments;
        this.page = Math.ceil(this.button[0].count / 5);
      } else {
        this.keywordComments = this.badComments;
        this.page = Math.ceil(this.button[1].count / 5);
      }
      this.changeFun(0, -1);
    },

    pushCurrArr: function(first, last) {
      var arr = this.keywordComments;
      let tables = [];
      let sentence = "";
      if (last < arr.length) {
        for (let i = first; i <= last; i++) {
          tables.push(arr[i]);
        }
        this.currentTableData = tables;
      } else {
        for (let i = first; i < arr.length; i++) {
          tables.push(arr[i]);
        }
        this.currentTableData = tables;
      }
    },

    changeFun: function(currIndex, prevIndex) {
      let first = 0;
      let last = 0;
      if (prevIndex < 0 && this.page != 1) {
        first = currIndex;
        last = (currIndex + 1) * 5 - 1;
        this.pushCurrArr(first, last);
      } else if (prevIndex < currIndex && prevIndex > -1 && this.page != 1) {
        first = (prevIndex + 1) * 5;
        last = (currIndex + 1) * 5 - 1;
        this.pushCurrArr(first, last);
      } else {
        first = 0;
        last = 4;
        this.pushCurrArr(first, last);
      }
    },

    searchchart1: async function({
      startTime,
      endTime,
      time,
      selectBusinessCirle
    }) {
      this.loading = true;
      const result = await http.restaurantAreaComment({
        startTime,
        endTime,
        time,
        selectBusinessCirle: selectBusinessCirle.reduce((a, b) => `${a},${b}`)
      });
      let rowsMap = {};
      let keys = [];
      result.data.forEach(({ key, data }) => {
        keys.push(key);
        data.forEach(({ time, count }) => {
          if (rowsMap[time] == undefined) {
            rowsMap[time] = {};
          }
          rowsMap[time][key] = count;
        });
      });
      this.chatData1.rows = Object.keys(rowsMap).map(key => {
        let item = rowsMap[key];
        item["日期"] = key;
        return item;
      });
      this.chartSettings1.metrics = keys;
      this.loading = false;
    },

    searchchart2: async function({
      startTime,
      endTime,
      time,
      selectBusinessCirle
    }) {
      this.loading = true;
      const result = await http.restaurantAreaScore({
        startTime,
        endTime,
        time,
        selectBusinessCirle: selectBusinessCirle.reduce((a, b) => `${a},${b}`)
      });
      let rowsMap = {};
      let keys = [];
      result.data.forEach(({ key, data }) => {
        keys.push(key);
        data.forEach(({ time, count }) => {
          if (rowsMap[time] == undefined) {
            rowsMap[time] = {};
          }
          rowsMap[time][key] = count;
        });
      });
      this.chatData2.rows = Object.keys(rowsMap).map(key => {
        let item = rowsMap[key];
        item["日期"] = key;
        return item;
      });
      this.chartSettings2.metrics = keys;
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  padding: 30px;
  font-weight: 400;
  color: black;
}

.first-block {
  // rgb(231, 232, 233)
  background: url(../assets/icons/qdhc_bg.jpg) no-repeat center;
  background-size: cover;
  //   opacity: 0.5; 图片透明度
  // background-repeat: no-repeat;
  border-radius: 10px;
}

.item {
  padding-bottom: 50px;
  padding-top: 15px;
  font-size: 19px;
  text-align: center;
}

.title {
  color: rgb(90, 16, 16);
  padding-top: 25px;
  font-size: 18px;
  font-weight: 500px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}

.number {
  padding-top: 15px;
  padding-bottom: 25px;
  color: red;
  font-size: 17px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.title,
.number {
  background: rgba(255, 255, 255, 0.8);
}

.second-block {
  padding-top: 20px;
}

.keyword {
  padding: 10px;
  background: rgb(213, 213, 214);
  border-radius: 10px;
}

.block-box {
  margin-bottom: 20px;

  .body {
    .chart {
      width: 100%;
      height: 300px;
    }
  }
}

.button-style {
  background-color: rgb(238, 237, 237); /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  position: relative;
  z-index: 99;
  float: right;
  cursor: pointer;
}

.item1 {
  margin-top: 70px;
  margin-left: 10px;
}

.item2 {
  margin-left: 200px;
}

.pagenations {
  text-align: center;
  margin-top: 10px;
}

.el-carousel__item h3 {
  color: #99a9bf;
  font-size: 14px;
  opacity: 0.75;
  // line-height: 200px;
  margin: 0;
}

// .el-carousel__item:nth-child(2n) {
//   background-color: #99a9bf;
// }

.el-carousel__item {
  background-color: #d3dce6;
}

.btn2 {
  margin-left: 100px;
  background-color: rgb(245, 225, 187);
}

.btn {
  margin-left: 20px;
  margin-top: 10px;
  font-weight: bolder;
  font-size: 14px;
}

.content {
  border: 200px;
  padding: 20px;
}

.table {
  padding-top: 0px;
  padding-left: 40px;
  margin-bottom: 10px;
  border-radius: 10px;
}

.card {
  padding-left: 20px;
  padding-top: 10px;
}

.card-content {
  padding: 10px;
  border-radius: 20px;
}
</style>
