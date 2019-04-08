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
          <el-breadcrumb-item>景区详情</el-breadcrumb-item>
          <el-breadcrumb-item>{{ name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="main-box">
        <!-- 基本信息 -->
        <block-box title="关键指标" icon="icon-dashboard">
          <el-row :gutter="20" class="top-4">
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <div class="item">
                <div class="title">本月评论数</div>
                <div class="number">{{ num_data.commentNumber || 0 }}</div>
              </div>
            </el-col>

            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <div class="item">
                <div class="title">景区排名</div>
                <div class="number">{{ num_data.rank || 0 }}</div>
              </div>
            </el-col>

            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <div class="item">
                <div class="title">本月评分数</div>
                <div class="number">{{ score_data.commentScore || 0 }}</div>
              </div>
            </el-col>

            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <div class="item">
                <div class="title">景区排名</div>
                <div class="number">{{ score_data.rank || "0" }}</div>
              </div>
            </el-col>
          </el-row>
        </block-box>

        <el-row :gutter="20">
          <el-col :sm="24" :md="12">
            <block-box title="评论数量变化图" icon="icon-comment">
              <button
                class="button-style"
                v-show="!loading && curr_spot != '千岛湖'"
                @click="chart1qdhisCompared"
              >
                {{ chart1_qdh_is_compared ? "不与千岛湖比较" : "与千岛湖比较" }}
              </button>
              <div class="chart" id="chart1"></div>
            </block-box>
          </el-col>

          <el-col :sm="24" :md="12">
            <block-box title="评论变化折线图" icon="icon-looks_5">
              <button
                class="button-style"
                v-show="!loading && curr_spot != '千岛湖'"
                v-on:click="chart2qdhisCompared()"
              >
                {{ chart2_qdh_is_compared ? "不与千岛湖比较" : "与千岛湖比较" }}
              </button>
              <div class="chart" id="chart2"></div>
            </block-box>
          </el-col>

          <el-col :sm="24" :md="12">
            <block-box title="不同平台评论数" icon="icon-comment">
              <month-select-simple
                v-show="time == '月'"
                @search="getchart3"
                :start="startTime"
                :end="endTime"
              ></month-select-simple>
              <week-select-simple
                v-show="time == '周'"
                v-bind:date="week"
                @search="getchart3"
              ></week-select-simple>

              <button
                class="button-style"
                v-show="!loading && curr_spot != '千岛湖'"
                v-on:click="chart3qdhisCompared()"
              >
                {{ chart3_qdh_is_compared ? "不与千岛湖比较" : "与千岛湖比较" }}
              </button>
              <div class="chart" id="chart3"></div>
            </block-box>
          </el-col>

          <el-col :sm="24" :md="12">
            <block-box title="不同平台评分数" icon="icon-looks_5">
              <month-select-simple
                v-show="time == '月'"
                @search="getchart4"
                :start="startTime"
                :end="endTime"
              ></month-select-simple>
              <week-select-simple
                v-show="time == '周'"
                v-bind:date="week"
                @search="getchart4"
              ></week-select-simple>
              <button
                class="button-style"
                v-show="!loading && curr_spot != '千岛湖'"
                v-on:click="chart4qdhisCompared()"
              >
                {{ chart4_qdh_is_compared ? "不与千岛湖比较" : "与千岛湖比较" }}
              </button>
              <div class="chart" id="chart4"></div>
            </block-box>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import monthSelect from "../components/QdhScenic/month-select/index";
import randomNumber from "../components/QdhScenic/random-number/index";
import blockBox from "../components/block-box/index";
import monthSelectSimple from "../components/ScenicInfo/month-select-simple/index";
import weekSelectSimple from "../components/ScenicInfo/week-select-simple/index";
import spotSelect from "../components/ScenicInfo/spot-select/index";
import http from "../request/index.js";
import spot_infos from "../base/spotInf";

import { get_session_storage } from "../base/sessionStorage";
import { get_num_rank, get_score_rank } from "../base/getRank";

export default {
  components: {
    monthSelect,
    randomNumber,
    blockBox,
    monthSelectSimple,
    weekSelectSimple
  },
  data() {
    return {
      loading: true,
      //当前景区
      curr_spot: this.$route.query.scenicName,
      //当前景区的名字
      name: spot_infos[this.$route.query.scenicName].name,
      week: new Date(),
      //展示的数据 景区评论数信息和评分数信息
      score_data: {},
      num_data: {},
      //各张图表动态添加是否比较千岛湖
      chart1_qdh_series: {},
      chart1_qdh_is_compared: true,
      chart2_qdh_series: {},
      chart2_qdh_is_compared: true,
      chart3_qdh_series: {},
      chart3_qdh_is_compared: true,
      chart4_qdh_series: {},
      chart4_qdh_is_compared: true,
      chart1: {
        title: {
          show: true
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          right: 10
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: []
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: []
      },
      chart2: {
        title: {
          show: true
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          right: 10
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: []
          }
        ],
        yAxis: [
          {
            type: "value",
            min: 4,
            max: 5
          }
        ],
        series: []
      },
      chart3: {
        title: {
          show: true
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          right: 10
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: []
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: []
      },
      chart4: {
        title: {
          show: true
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          right: 10
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: []
          }
        ],
        yAxis: [
          {
            type: "value",

            max: 5
          }
        ],
        series: []
      },

      chartList: [],
      myChart1: null,
      myChart2: null,
      myChart3: null,
      myChart4: null,

      // chart3 chart4 的 搜索条件控制
      startTime: "",
      endTime: "",
      time: ""
    };
  },
  created() {},
  mounted() {
    this.initchart();
    //景区详情
    this.spotstate();
    //景区图表详情
    this.spotdetail();
  },
  methods: {
    initrender: function() {
      localStorage.setItem("token",this.$route.query.token);
      this.curr_spot = this.$route.query.scenicName;
      this.loading = true;

      this.initchart();
      this.week = new Date();
      this.spotstate();
      this.spotdetail();
      //重新渲染
      var num_param = {
        date: this.endTime,
        type: "1",
        time: this.time
      };
      this.getchart3(num_param);
      var score_param = {
        date: this.endTime,
        type: "2",
        time: this.time
      };
      this.getchart4(score_param);
    },
    // top 4 chart 2
    spotstate: async function() {
      this.loading = true;
      const res = await http.spotstate({});
      if (res.code === 0) {
        this.num_data = get_num_rank(
          res.data.list,
                this.$route.query.scenicName,
          true
        );
        this.score_data = get_score_rank(
          res.data.list,
                this.$route.query.scenicName,
          true
        );
      }
    },
    spotdetail: async function() {
      const res = await http.spotdetail({
        cur_spot:  this.$route.query.scenicName
      });

      this.name = spot_infos[this.$route.query.scenicName].name;

      this.loading = false;
      if (res.code === 0) {
        this.startTime = res.data.startTime;
        this.endTime = res.data.endTime;
        this.time = res.data.time;
        this.chart1.title.text =
          this.startTime +
          this.time +
          "-" +
          this.endTime +
          this.time +
          "评论数量变化图";
        this.chart2.title.text =
          this.startTime +
          this.time +
          "-" +
          this.endTime +
          this.time +
          "评分变化图";
        // x轴
        this.chart1.xAxis[0].data = res.data.xAxis;
        this.chart2.xAxis[0].data = res.data.xAxis;
        // 评论
        const numAxis = res.data.numAxis;
        this.chart1.series = [];
        for (const item of numAxis) {
          this.chart1.series.push({
            name: item.name,
            type: "line",
            data: item.data,
            areaStyle: {},
            smooth: true
          });
        }
        // 评分
        const scoreAxis = res.data.scoreAxis;
        this.chart2.series = [];
        for (const item of scoreAxis) {
          this.chart2.series.push({
            name: item.name,
            type: "line",
            data: item.data,
            smooth: true
          });
        }
        this.myChart1.setOption(this.chart1, true);
        this.myChart2.setOption(this.chart2, true);
      }
    },
    // chart3 评论数
    getchart3: async function(e) {
      this.loading = true;
      const res = await http.spotdetailcompared({
        cur_spot: this.$route.query.scenicName,
        compared_time: e.date,
        type: "1",
        time: this.time
      });
      this.loading = false;
      if (res.code === 0) {
        this.chart3.xAxis[0].data = res.data.xAxis;
        this.chart3.title.text = e.date + this.time + "评论数量对比";
        this.chart3.series = [];

        for (const item of res.data.yAxis) {
          this.chart3.series.push({
            name: item.name,
            type: "bar",
            data: item.data,
            barGap: 0,
            barWidth: 15
          });
        }
        this.myChart3.setOption(this.chart3, true);
      }
    },

    // chart4 评分数
    getchart4: async function(e) {
      this.loading = true;
      const res = await http.spotdetailcompared({
        cur_spot: this.$route.query.scenicName,
        compared_time: e.date,
        type: "2",
        time: this.time
      });
      this.loading = false;
      if (res.code === 0) {
        this.chart4.xAxis[0].data = res.data.xAxis;
        this.chart4.title.text = e.date + this.time + "评分对比";
        this.chart4.series = [];
        for (const item of res.data.yAxis) {
          this.chart4.series.push({
            name: item.name,
            type: "bar",
            data: item.data,
            barGap: 0,
            barWidth: 15
          });
        }
        this.myChart4.setOption(this.chart4, true);
      }
    },
    initchart: async function() {
      const that = this;
      this.myChart1 = echarts.init(document.getElementById("chart1"));
      this.myChart2 = echarts.init(document.getElementById("chart2"));
      this.myChart3 = echarts.init(document.getElementById("chart3"));
      this.myChart4 = echarts.init(document.getElementById("chart4"));

      window.addEventListener("resize", function() {
        that.myChart1.resize();
        that.myChart2.resize();
        that.myChart3.resize();
        that.myChart4.resize();
      });
    },
    chart1qdhisCompared: function() {
      if (this.chart1_qdh_is_compared) {
        //如果当前千岛湖是做比较了 把他拿掉并且赋值
        for (var i = 0; i < this.chart1.series.length; i++) {
          if (this.chart1.series[i].name == "千岛湖") {
            this.chart1_qdh_series = this.chart1.series[i];
            this.chart1.series.splice(i, 1);
            break;
          }
        }
      } else {
        this.chart1.series.push(this.chart1_qdh_series);
      }
      this.chart1_qdh_is_compared = !this.chart1_qdh_is_compared;
      this.myChart1.setOption(this.chart1, true);
    },
    chart2qdhisCompared: function() {
      if (this.chart2_qdh_is_compared) {
        //如果当前千岛湖是做比较了 把他拿掉并且赋值
        for (var i = 0; i < this.chart2.series.length; i++) {
          if (this.chart2.series[i].name == "千岛湖") {
            this.chart2_qdh_series = this.chart2.series[i];
            this.chart2.series.splice(i, 1);
            break;
          }
        }
      } else {
        this.chart2.series.push(this.chart2_qdh_series);
      }
      this.chart2_qdh_is_compared = !this.chart2_qdh_is_compared;
      this.myChart2.setOption(this.chart2, true);
    },
    chart3qdhisCompared: function() {
      if (this.chart3_qdh_is_compared) {
        //如果当前千岛湖是做比较了 把他拿掉并且赋值
        for (var i = 0; i < this.chart3.series.length; i++) {
          if (this.chart3.series[i].name == "千岛湖") {
            this.chart3_qdh_series = this.chart3.series[i];
            this.chart3.series.splice(i, 1);
            break;
          }
        }
      } else {
        this.chart3.series.push(this.chart3_qdh_series);
      }
      this.chart3_qdh_is_compared = !this.chart3_qdh_is_compared;
      this.myChart3.setOption(this.chart3, true);
    },
    chart4qdhisCompared: function() {
      if (this.chart4_qdh_is_compared) {
        //如果当前千岛湖是做比较了 把他拿掉并且赋值
        for (var i = 0; i < this.chart4.series.length; i++) {
          if (this.chart4.series[i].name == "千岛湖") {
            this.chart4_qdh_series = this.chart4.series[i];
            this.chart4.series.splice(i, 1);
            break;
          }
        }
      } else {
        this.chart4.series.push(this.chart4_qdh_series);
      }
      this.chart4_qdh_is_compared = !this.chart4_qdh_is_compared;
      this.myChart4.setOption(this.chart4, true);
    }
  },
  destroyed() {
    window.removeEventListener("resize", () => {});
  },
  watch: {
    curr_spot: function(val) {},
    week: function(val) {
      this.week = val;
    }
  }
};
</script>
<style lang="scss" scoped>
.top-4 {
  .item {
    padding: 20px;
    background: #fff;
    border-radius: 4px;
    margin: 10px 0;
    .title {
      font-size: 16px;
      margin-bottom: 10px;
    }
    .number {
      font-size: 32px;
      margin-bottom: 10px;
      color: #f44336;
    }
    .compare {
      color: #717171;
    }
  }
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
  background-color: #449fdb; /* Green */
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
</style>
