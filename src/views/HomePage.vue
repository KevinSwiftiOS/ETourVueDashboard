<template>
  <div id="homepage">
  <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
    <qdh-comment-total></qdh-comment-total>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <qdh-home-map></qdh-home-map>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <h2>景区排行</h2>
<spot-rank :list="spotlist"></spot-rank>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <h2>景点排行</h2>
          <spot-rank :list="qdhspotlist"></spot-rank>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
            <column-chart></column-chart>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <h2>餐厅排行</h2>
          <spot-rank :list="restaurantranklist"></spot-rank>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
<bad-colum></bad-colum>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
<pie-chart-of-hotel></pie-chart-of-hotel>
         <pie-chart-of-restaurant></pie-chart-of-restaurant>
        </div>
      </el-col>
        <el-col :span="8">
        <div class="grid-content bg-purple">
          <h2>酒店排行</h2>
          <spot-rank :list="hotelranklist"></spot-rank>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import http from "../request/index.js";
import echarts from "echarts";
import QdhCommentTotal from '../components/HomePage/QdhCommentTotal';
import SpotRank from '../components/HomePage/SpotRank';
import BadColum from '../components/HomePage/BadColum';
import ColumnChart from '../components/HomePage/ColumnChart';
import PieChartOfHotel from "../components/HomePage/PieChartOfHotel";
import PieChartOfRestaurant from "../components/HomePage/PieChartOfRestaurant";
import QdhHomeMap from "../components/HomePage/QdhHomeMap";
export default {
  name: "HomePage",
  components:{
      QdhCommentTotal,
    SpotRank,
    BadColum,
    ColumnChart,
    PieChartOfHotel,
    PieChartOfRestaurant,
    QdhHomeMap,
  },
  data() {
    return {
      spotlist:[],
      qdhspotlist:[],
     restaurantranklist:[],
      hotelranklist:[]

    };
  },
  created() {
    // 首页初始化数据
    // 拿到所有图表的后台数据
this.getInit();
  },

  methods: {
    getInit: async function () {
      //千岛湖景区景点排行
      const spotRankRes = await http.spotRank();
      if (spotRankRes.code === 0 && spotRankRes.data) {
        this.spotlist = spotRankRes.data.spotlist;
        this.qdhspotlist = spotRankRes.data.qdhspotlist;
      }
      // 餐饮排行
      const restaurantRankRes = await http.restaurantRank();
      if (restaurantRankRes.code === 0 && restaurantRankRes.data) {
        this.restaurantranklist = restaurantRankRes.data.restaurantRankList;
      }
      const hotelRankRes = await http.qdHhotelScoreLimit();
      if (hotelRankRes.code === 0 && hotelRankRes.data) {
        this.hotelranklist = hotelRankRes.data.hotellist;
      }
    },


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



