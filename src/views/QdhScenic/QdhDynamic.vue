<!-- 景区动态 目前默认为千岛湖 -->
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
          <el-breadcrumb-item
            ><span style="cursor: pointer" @click="back()">
              <i class="el-icon-arrow-left"> </i>千岛湖动态</span
            ></el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <div class="main-box">
        <!-- 基本信息 -->
        <div class="base-info">
          <h1>千岛湖景区</h1>

          <el-row :gutter="20" class="top-4">
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <div class="item">
                <div class="title">本月评论数</div>
                <div class="number">
                  <random-number :data="num_data.commentNumber"></random-number>
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <div class="item">
                <div class="title">景区排名</div>
                <div class="number">{{ num_data.rank || "-" }}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <div class="item">
                <div class="title">本月评分数</div>
                <div class="number">
                  <el-rate
                    v-model="score_data.commentScore"
                    disabled
                    show-score
                    :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                  >
                  </el-rate>
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <div class="item">
                <div class="title">景区排名</div>
                <div class="number">{{ score_data.rank || "0" }}</div>
              </div>
            </el-col>
          </el-row>
        </div>

        <block-box title="同时段不同景区评论数对比" icon="icon-comment">
          <month-select isMulti @search="searchchart1"></month-select>
          <button
            class="button-style"
            v-show="!loading"
            v-on:click="chart1otherisCompared()"
          >
            {{
              chart1_other_is_compared
                ? "不与其余景区作比较"
                : "与其余景区作比较"
            }}
          </button>
          <div class="chart" id="chart1"></div>
        </block-box>

        <block-box title="同时段不同景区评分对比" icon="icon-looks_5">
          <month-select @search="searchchart2"></month-select>
          <button
            class="button-style"
            v-show="!loading"
            v-on:click="chart2otherisCompared()"
          >
            {{
              chart2_other_is_compared
                ? "不与其余景区作比较"
                : "与其余景区作比较"
            }}
          </button>
          <div class="chart" id="chart2"></div>
        </block-box>
      </div>
    </div>
  </div>
</template>
<script>
import monthSelect from "../../components/QdhScenic/month-select/index";
import randomNumber from "../../components/QdhScenic/random-number/index";
import blockBox from "../../components/block-box/index";
import { chart1, chart2 } from "../chart-config/dynamics-chart.js";
import http from "../../request/index.js";
import { get_num_rank, get_score_rank } from "../../base/getRank";

export default {
  components: {
    monthSelect,
    randomNumber,
    blockBox
  },
  data() {
    return {
      num_data: {},
      score_data: {},
      loading: true,
      //各张图表动态添加是否比较千岛湖
      chart1_other_series: [],
      chart1_other_is_compared: true,
      chart2_other_series: [],
      chart2_other_is_compared: true,
      state: {},
      chart1: { ...chart1 },
      chart2: { ...chart2 },
      chartList: [],
      myChart1: null,
      myChart2: null,
      myChart3: null
    };
  },
  mounted() {
    this.initchart();
    this.getscenicstate();
  },
  created() {
    // 景区数据统计
  },
  methods: {
    initchart: async function() {
      // 初始化图表
      const that = this;
      this.myChart1 = echarts.init(document.getElementById("chart1"));
      this.myChart2 = echarts.init(document.getElementById("chart2"));
      window.addEventListener("resize", function() {
        that.myChart1.resize();
        that.myChart2.resize();
      });
    },
    back: function() {
      this.$router.back();
    },
    // 基本数据
    getscenicstate: async function() {
      const res = await http.spotstate({});
      this.loading = false;
      if (res.code === 0) {
        this.num_data = get_num_rank(res.data.list, "千岛湖", true);
        this.score_data = get_score_rank(res.data.list, "千岛湖", true);
      }
    },
    searchchart1: async function(e) {
      this.loading = true;
      const res = await http.spotcompared({ ...e, type: "1" });
      this.loading = false;
      if (res.code === 0) {
        const seriesList = res.data.yAxis;
        this.chart1.xAxis[0].data = res.data.xAxis;
        this.chart1.title.text =
          e.startTime + e.time + "-" + e.endTime + e.time + "评论数量变化";
        this.chart1.series = [];
        this.chart1.legend.data = [];
        var index = 0;
        var flag = true;
        seriesList.forEach(element => {
          index++;
          if (index >= 10) {
            if (flag) {
              this.chart1.legend.data.push("");
              flag = false;
            }
          }
          this.chart1.legend.data.push(element.name);

          this.chart1.series.push({
            name: element.name,
            type: "line",
            data: element.data,
            smooth: true
          });
        });

        this.myChart1.setOption(this.chart1, true);
      }
    },
    searchchart2: async function(e) {
      this.loading = true;
      const res = await http.spotcompared({ ...e, type: "0" });
      this.loading = false;
      if (res.code === 0) {
        const seriesList = res.data.yAxis;
        this.chart2.title.text =
          e.startTime + e.time + "-" + e.endTime + e.time + "评分变化";
        this.chart2.xAxis[0].data = res.data.xAxis;
        this.chart2.series = [];
        this.chart2.legend.data = [];
        var index = 0;
        var flag = true;
        seriesList.forEach(element => {
          index++;
          if (index >= 10) {
            if (flag) {
              this.chart2.legend.data.push("");
              flag = false;
            }
          }
          this.chart2.legend.data.push(element.name);

          this.chart2.series.push({
            name: element.name,
            type: "line",
            data: element.data,
            smooth: true
          });
        });
        this.myChart2.setOption(this.chart2, true);
      }
    },
    chart1otherisCompared: function() {
      if (this.chart1_other_is_compared) {
        this.chart1_other_series = [];
        //如果当前千岛湖是做比较了 把他拿掉并且赋值
        for (var i = 0; i < this.chart1.series.length; ) {
          if (this.chart1.series[i].name != "千岛湖") {
            this.chart1_other_series.push(this.chart1.series[i]);
            this.chart1.series.splice(i, 1);
          } else i++;
        }
      } else {
        for (var i = 0; i < this.chart1_other_series.length; i++)
          this.chart1.series.push(this.chart1_other_series[i]);
      }
      this.chart1_other_is_compared = !this.chart1_other_is_compared;
      this.myChart1.setOption(this.chart1, true);
    },
    chart2otherisCompared: function() {
      if (this.chart2_other_is_compared) {
        this.chart2_other_series = [];
        //如果当前千岛湖是做比较了 把他拿掉并且赋值
        for (var i = 0; i < this.chart2.series.length; ) {
          if (this.chart2.series[i].name != "千岛湖") {
            this.chart2_other_series.push(this.chart2.series[i]);
            this.chart2.series.splice(i, 1);
          } else i++;
        }
      } else {
        for (var i = 0; i < this.chart2_other_series.length; i++)
          this.chart2.series.push(this.chart2_other_series[i]);
      }
      this.chart2_other_is_compared = !this.chart2_other_is_compared;
      this.myChart2.setOption(this.chart2, true);
    }
  },
  created() {},
  destroyed() {
    window.removeEventListener("resize", () => {});
  }
};
</script>
<style lang="scss" scoped>
.base-info {
  background: url(../../assets/icons/qdhc_bg.jpg) no-repeat center;
  background-size:cover;
  //   opacity: 0.5; 图片透明度
  // background-repeat: no-repeat;
  border-radius: 10px;
  color: #000;
  padding: 20px;
  margin-bottom: 20px;
  overflow: hidden;
  h1 {
    font-size: 28px;
    margin: 0 0 10px;
  }
}
.top-4 {
  .item {
    padding: 20px;
    background: #fff;
    border-radius: 4px;
    min-height: 115px;
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
      height: 400px;
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
