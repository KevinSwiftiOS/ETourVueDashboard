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
          <el-breadcrumb-item to="/qdhscenic"
            ><span style="cursor: pointer">
              千岛湖动态</span
            ></el-breadcrumb-item
          >
          <el-breadcrumb-item>景点详情</el-breadcrumb-item>
          <el-breadcrumb-item>{{ name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <qdh-spot-select v-on:initrender="initrender"></qdh-spot-select>
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
                <div class="title">千岛湖景点排名</div>
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
                <div class="title">千岛湖景点排名</div>
                <div class="number">{{ score_data.rank || "0" }}</div>
              </div>
            </el-col>
          </el-row>
        </block-box>

        <el-row :gutter="20">
          <el-col :sm="24" :md="12">
            <block-box title="评论数量变化图" icon="icon-comment">
              <div class="chart" id="chart1"></div>
            </block-box>
          </el-col>

          <el-col :sm="24" :md="12">
            <block-box title="评论变化折线图" icon="icon-looks_5">
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

              <div class="chart" id="chart4"></div>
            </block-box>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import monthSelect from "../../components/QdhScenic/month-select/index";
import randomNumber from "../../components/QdhScenic/random-number/index";
import blockBox from "../../components/block-box/index";
import monthSelectSimple from "../../components/ScenicInfo/month-select-simple/index";
import weekSelectSimple from "../../components/ScenicInfo/week-select-simple/index";
import qdhSpotSelect from "../../components/QdhScenic/qdh-spot-select/qdh-spot-select";
import http from "../../request/index.js";
import qdh_spot_infos from "../../base/qdhSpotInfo";
import { get_session_storage } from "../../base/sessionStorage";
import { get_num_rank, get_score_rank } from "../../base/getRank";

export default {
  components: {
    monthSelect,
    randomNumber,
    blockBox,
    monthSelectSimple,
    weekSelectSimple,
    qdhSpotSelect
  },
  data() {
    return {
      loading: true,
      //当前景区
      qdh_curr_spot: get_session_storage("qdh_curr_spot"),
      //当前景区的名字
      name: qdh_spot_infos[get_session_storage("qdh_curr_spot")].name,
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
    this.qdhspotstate();
    //景区图表详情
    this.qdhspotdetail();
  },
  methods: {
    initrender: function() {
      this.qdh_curr_spot = get_session_storage("qdh_curr_spot");
      this.loading = true;

      this.initchart();
      this.week = new Date();
      this.qdhspotstate();
      this.qdhspotdetail();
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
    qdhspotstate: async function() {
      this.loading = true;
      const res = await http.qdhspotstate({});
      if (res.code === 0) {
        this.num_data = get_num_rank(
          res.data.list,
          get_session_storage("qdh_curr_spot"),
          false
        );
        this.score_data = get_score_rank(
          res.data.list,
          get_session_storage("qdh_curr_spot"),
          false
        );
      }
    },
    qdhspotdetail: async function() {
      const res = await http.qdhspotdetail({
        qdh_cur_spot: get_session_storage("qdh_curr_spot")
      });
      this.name = qdh_spot_infos[get_session_storage("qdh_curr_spot")].name;
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
      const res = await http.qdhspotdetailcompared({
        qdh_cur_spot: get_session_storage("qdh_curr_spot"),
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
      const res = await http.qdhspotdetailcompared({
        qdh_cur_spot: get_session_storage("qdh_curr_spot"),
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
    }
  },
  destroyed() {
    window.removeEventListener("resize", () => {});
  },
  watch: {
    qdh_curr_spot: function(val) {},
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
</style>
