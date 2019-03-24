<template>
  <div id="homepage">
  <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <h2>景区评论数:{{qdhSpotCommentTotalData.nowMonthCommentNumber}}</h2>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content bg-purple" style="text-align:center">同比:</div>
            </el-col>
            <el-col :span="8">
               {{qdhSpotCommentTotalData.huanChangeNumberPercent}}
                <i
                  v-if="qdhSpotCommentTotalData.isHuanNumberRise == '1'"
                  class="el-icon-thirdzhang"
                ></i>
                <i v-if="qdhSpotCommentTotalData.isHuanNumberRise == '0'" class="el-icon-thirddown"></i>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
               
               变化数:{{qdhSpotCommentTotalData.huanChangeNumber}}
              </div>

            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content bg-purple" style="text-align:center">环比:</div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
 {{qdhSpotCommentTotalData.tongChangeNumberPercent}}
                <i
                  v-if="qdhSpotCommentTotalData.isTongNumberRise == '1'"
                  class="el-icon-thirdzhang"
                ></i>
                <i v-if="qdhSpotCommentTotalData.isTongNumberRise == '0'" class="el-icon-thirddown"></i>

              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
               
              变化数:{{qdhSpotCommentTotalData.tongChangeNumber}}
              </div>

            </el-col>
          </el-row>
          <h2>景区评分{{qdhSpotCommentTotalData.nowMonthCommentScore}}</h2>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content bg-purple" style="text-align:center">同比</div>
            </el-col>
            <el-col :span="8">
              <i v-if="qdhSpotCommentTotalData.isHuanScoreRise == '1'" class="el-icon-thirdzhang"></i>
                <i v-if="qdhSpotCommentTotalData.isHuanScoreRise == '0'" class="el-icon-thirddown"></i>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
               
            <div class="grid-content bg-purple">{{qdhSpotCommentTotalData.huanChangeScore}}</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content bg-purple" style="text-align:center">环比</div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                 <i v-if="qdhSpotCommentTotalData.isTongScoreRise == '1'" class="el-icon-thirdzhang"></i>
                <i v-if="qdhSpotCommentTotalData.isTongScoreRise == '0'" class="el-icon-thirddown"></i>
               </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                {{qdhSpotCommentTotalData.tongChangeScore}}
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <h2>景点排行</h2>
          <el-table :data="qdhSpotListData" style="width: 100%">
            <el-table-column prop="_id" label="景点" width="180"></el-table-column>
            <el-table-column prop="commentScore" label="评分" width="180"></el-table-column>
            <el-table-column prop="commentNumber" label="评论数"></el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <h2>景区排行</h2>
          <el-table :data="spotlistData" style="width: 100%">
            <el-table-column prop="_id" label="景区" width="180"></el-table-column>
            <el-table-column prop="commentScore" label="评分" width="180">
            </el-table-column>
            <el-table-column prop="commentNumber" label="评论数"></el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
             <div id="columnchart" :style="{margin:'40px', width:'90%', height:'500px'}"></div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <h2>餐厅排行</h2>
          <el-table :data="restaurantStatisticalRankData" style="width: 100%">
            <el-table-column prop="_id" label="店名" width="180"></el-table-column>
              <el-table-column prop="totalScore" label="评分" width="180"></el-table-column>
            <el-table-column prop="totalNumber" label="评论数" width="180"></el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <div id="badColum" :style="{margin:'40px', width:'90%', height:'500px'}"></div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <div id="piecharthotel" :style="{margin:'40px', width:'90%', height:'500px'}"></div>
          <div id="piechartrestaurant" :style="{margin:'40px', width:'90%', height:'500px'}"></div>
        </div>
      </el-col>
        <el-col :span="8">
        <div class="grid-content bg-purple">
          <h2>酒店排行</h2>
          <el-table :data="qdhHotelScoreLimitData" style="width: 100%">
            <el-table-column prop="hotelname" label="店名" width="180"></el-table-column>
             <el-table-column prop="comment_weighted_grade" label="评分" width="180"></el-table-column>
            <el-table-column prop="comment_num" label="评论数" width="180"></el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import http from "../request/index.js";
import echarts from "echarts";

export default {
  name: "badColum",
  data() {
    return {
      badColum: null,
      qdhSpotCommentTotalData: {},
      restaurantBadColum: [],
      restaurantBadColumXAxis: [],
      spotlistData: [],
      qdhSpotListData: [],
      restaurantStatisticalRankData: [],
      qdhHotelScoreLimitData:[],
      loading: false,
      pieChartOfHotel: null, // 获取酒店div
      pieChartsOfRestaurant: null, // 获取餐饮div
      columnChartOfSpot: null, // 获取景点div
      pieOptionOfHotel: {
        // 酒店饼图 option
        title: {
          text: "千岛湖酒店评分统计图",
          x: "left"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "right",
          y: "bottom"
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            magicType: {
              show: true,
              type: ["pie", "funnel"],
              option: {
                funnel: {
                  x: "25%",
                  width: "50%",
                  funnelAlign: "center"
                }
              }
            }
          }
        },
        calculable: true,
        series: []
      },
      pieOptionOfRestaurant: {
        // 餐饮饼图 option
        title: {
          text: "千岛湖餐饮评分统计图",
          x: "left"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "right",
          y: "bottom"
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            magicType: {
              show: true,
              type: ["pie", "funnel"],
              option: {
                funnel: {
                  x: "25%",
                  width: "50%",
                  funnelAlign: "center"
                }
              }
            }
          }
        },
        calculable: true,
        series: []
      },
      spotYearChangeChart1: {
        title: {
          text: "千岛湖景点评分数量变化图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["评论数量"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "评论数量",
            type: "line",
            areaStyle: {},
            smooth: true,
            data: []
          }
        ]
      },
      hotelComSocreLimitList: []
    };
  },
  created() {
    // 首页初始化数据
    // 拿到所有图表的后台数据
    this.getInit();
  },
  mounted() {
    this.setPieChartsOfHotel(); // 饼图 绘制 酒店
    this.setPieChartsOfRestaurant(); // 景点
    this.setColumnChartsSpot(); // 景点 折线图 绘制
    this.setComScoreSortHotel(); // 酒店前十名
  },
  methods: {
    getInit: async function() {
      //千岛湖同环比分析
      const qdhSpotCommentTotalRes = await http.qdhSpotCommentTotal();
      if (qdhSpotCommentTotalRes.code === 0 && qdhSpotCommentTotalRes.data) {
        this.qdhSpotCommentTotalData = qdhSpotCommentTotalRes.data;
      }
      //千岛湖景区景点排行
      const spotRankRes = await http.spotRank();
      if (spotRankRes.code === 0 && spotRankRes.data) {
        this.spotlistData = spotRankRes.data.spotlist;
        this.qdhSpotListData = spotRankRes.data.qdhspotlist;
      }

      const restaurantBadColumRes = await http.restaurantBadColum();
      if (restaurantBadColumRes.code === 0 && restaurantBadColumRes.data) {
        this.restaurantBadColum = restaurantBadColumRes.data;
        this.restaurantBadColumXAxis = restaurantBadColumRes.Xtime;
        this.drawBadColum();
      }
      // 餐饮饼图
      const restaurantPieChartRes = await http.restaurantPieChart();
      if (restaurantPieChartRes.code === 0 && restaurantPieChartRes.data) {
      }
      // 餐饮排行
      const restaurantRankRes = await http.restaurantRank();
      if (restaurantRankRes.code === 0 && restaurantRankRes.data) {
        this.restaurantStatisticalRankData = restaurantRankRes.data;
      }
    },

    drawBadColum: function() {
      this.badColum = echarts.init(document.getElementById("badColum"));
  
      var arr = [];
      for (var i = 0; i < 13; i++) {
        arr.push(this.restaurantBadColum[i].totalNumber);
      }
      this.badColum.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        xAxis: [
          {
            type: "category",
            data: this.restaurantBadColumXAxis,
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "差评个数",
            min: 1000,
            max: 3700,
            interval: 300,
            axisLabel: {
              formatter: "{value} 个"
            }
          }
        ],
        series: [
          {
            name: "差评个数",
            type: "bar",
            data: arr
          }
        ]
      });
    },
    setColumnChartsSpot: async function() {
      // 景点折线图 年度评论数
      this.loading = true;
      this.columnChartOfSpot = echarts.init(
        document.getElementById("columnchart")
      );
      const res = await http.qdhspotComnumChange();
      if (res.code === 0 && res.data) {
        var month_cnt = [];
        var comment_month = [];
        var returnData = res.data.numAxis;
        for (var i = 0; i < returnData.length; i++) {
          comment_month.push(returnData[i]["comment_month"]);
          month_cnt.push(returnData[i]["month_cnt"]);
        }
        this.spotYearChangeChart1.xAxis[0].data = comment_month;
        this.spotYearChangeChart1.series[0].data = month_cnt;
        this.columnChartOfSpot.setOption(this.spotYearChangeChart1);
      }
      this.loading = false;
    },
    setPieChartsOfRestaurant: async function() {
      // 餐饮评分分布，由饼图实现
      this.loading = true;
      this.pieChartsOfRestaurant = echarts.init(
        document.getElementById("piechartrestaurant")
      );
      const res = await http.restaurantPieChart();
      if (res.code === 0 && res.data) {
        var returnData = res.data;
      
        var data = [
          {
            value: 0,
            name: "较好" + "（4.5-5分）"
          },
          {
            value: 0,
            name: "好" + "（4-4.5分）"
          },
          {
            value: 0,
            name: "良" + "（3-4分）"
          },
          {
            value: 0,
            name: "差" + "（0-4分）"
          }
        ];
        for (var i = 0; i < returnData.length; i++) {
          switch (returnData[i].name) {
            case "perfect":
              data[0].value = returnData[i].count;
              break;
            case "good":
              data[1].value = returnData[i].count;
              break;
            case "middle":
              data[2].value = returnData[i].count;
              break;
            case "bad":
              data[3].value = returnData[i].count;
              break;
          }
        }
        this.pieOptionOfRestaurant.series.push({
          name: "餐饮评分区间",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: data
        });
        this.pieChartsOfRestaurant.setOption(this.pieOptionOfRestaurant);
      }
      this.loading = false;
    },
    // restaurantComScorePie
    setPieChartsOfHotel: async function() {
      // 酒店评分分布，由饼图实现
      this.pieChartOfHotel = echarts.init(
        document.getElementById("piecharthotel")
      );
      const res = await http.qdhHotelComScorePie();
      if (res.code === 0 && res.data && res.data.hotelScoreCount) {
        var returnData = res.data.hotelScoreCount;
        var data = [
          {
            value: 0,
            name: "较好" + "（4.5-5分）"
          },
          {
            value: 0,
            name: "好" + " （4-4.5分）"
          },
          {
            value: 0,
            name: "良" + " （3-4分）"
          },
          {
            value: 0,
            name: "差" + " （0-3分）"
          }
        ];
        for (var i = 0; i < returnData.length; i++) {
          switch (returnData[i].comment_type) {
            case "较好":
              data[0].value = returnData[i].hotel_count;
              break;
            case "好":
              data[1].value = returnData[i].hotel_count;
              break;
            case "良":
              data[2].value = returnData[i].hotel_count;
              break;
            case "差":
              data[3].value = returnData[i].hotel_count;
              break;
          }
        }
        this.pieOptionOfHotel.series.push({
          name: "酒店评分区间",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: data
        });
        this.pieChartOfHotel.setOption(this.pieOptionOfHotel);
      }
    },

    setComScoreSortHotel: async function() {
      // 获取酒店评分靠前的十佳酒店
      this.loading = true;
      const res = await http.qdHhotelScoreLimit();
      if (res.code === 0 && res.data) {
        this.qdhHotelScoreLimitData = res.data.hotellist;
      }
      this.loading = false;
    },
    hotelNameMouseEnter: function(event) {
      // 鼠标 mouseenter
      var el = event.currentTarget;
      el.innerHTML = el.id;
    },
    hotelNameMouseLeave: function(event) {
      // 鼠标 mouseleave
      var el = event.currentTarget;
      setTimeout(function() {
        el.innerHTML = el.id.substring(0, 10);
      }, 1000);
    }
  },
  filters: {
    hiddenHotelName: function(val) {
      // 为了让过长的酒店名称进行隐藏
      if (val.length > 10) {
        val = val.substring(0, 10);
      }
      return val;
    }
  }
};
</script>


<style lang="scss">
#homepage {
  background: url(../assets/icons/homepageBackground.jpg) no-repeat center;
  background-size: cover;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>



