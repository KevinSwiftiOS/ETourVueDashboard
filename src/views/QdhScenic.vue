<!-- 千岛湖景区详情 MAP -->
<template>
  <div>
    <div v-if="$route.name === 'QdhScenic'">
      <div class="home-map">
        <home-map
          :data="qdhspotlist"
          :zoom="12"
          city="淳安县"
          :border="false"
          :isHome="false"
        ></home-map>
        <div class="map-loading" v-if="qdhspotlist.length === 0">
          <span></span> 景点加载中
        </div>
      </div>

      <spot-rank
        :data="qdhspotlist"
        :title="'千岛湖景点本年度评论数量排名'"
        v-bind:isNum="true"
        v-bind:isHome="false"
      ></spot-rank>
      <spot-rank
        :data="qdhspotlist"
        :title="'千岛湖景点本年度评分排名'"
        v-bind:isNum="false"
        v-bind:isHome="false"
      ></spot-rank>
      <el-button
        style="position: absolute;
        top: 80px;
        right: 40px;"
        @click="goToCompared()"
        >与其余5A级景区比较 <i class="el-icon-arrow-right"> </i>
      </el-button>
    </div>
    <router-view v-else></router-view>
  </div>
</template>
<script>
import HomeMap from "../components/map";
import mapSearch from "../components/map-search";
import SpotRank from "../components/spot-rank/spot-rank";
import http from "../request/index.js";

export default {
  components: {
    HomeMap,
    mapSearch,
    SpotRank
  },
  data() {
    return {
      qdhspotlist: [],
      state: {} // 右侧3个指标
    };
  },
  created() {
    // 景区数据统计
    // 景区景点list
    this.getJDList();
  },
  methods: {
    goToCompared: function() {
      //与其余5A级景区的比较
      this.$router.push({ name: "QdhDynamic" });
    },
    getJDList: async function() {
      const res = await http.getJDList();
      if (res.code === 0 && res.data && res.data.list) {
        this.qdhspotlist = res.data.list;
      }
    }
  },
  watch: {
    "$route.name": function(val) {
      if (val === "QdhScenic") {
        this.qdhspotlist = [];
        this.getJDList();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.scenic {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
}

.home-map {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.right-card-box {
  position: absolute;
  right: 50px;
  top: 50px;
  width: 360px;
  background: #fff;
  color: #333;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 -1px 0px rgba(0, 0, 0, 0.02);
  border-radius: 4px;
  .card-header {
    position: relative;
    height: 100px;
    background: #409eff;
    color: #fff;
    padding: 20px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    h1 {
      font-size: 26px;
      font-weight: normal;
      margin-bottom: 10px;
    }
    p {
      color: rgba(255, 255, 255, 0.85);
    }
    .arrow {
      width: 50px;
      height: 50px;
      position: absolute;
      right: -25px;
      bottom: 25px;
      border-radius: 25px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.23), 0 3px 10px rgba(0, 0, 0, 0.16);
      transition: all 0.2s ease;
      background: #fff;
      color: #333;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-size: 24px;
      &:hover {
        width: 56px;
        height: 56px;
        border-radius: 28px;
        right: -28px;
        bottom: 22px;
        background: #448aff;
        color: #fff;
      }
    }
  }
  .card-list {
    padding: 20px;
    .item {
      background: #03a9f4;
      padding: 20px;
      color: #fff;
      margin-bottom: 20px;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      &:last-child {
        margin-bottom: 0;
      }
      > p {
        &:first-child {
          margin-bottom: 10px;
        }
        &:last-child {
          font-size: 32px;
          font-weight: bold;
          color: #f5f5f5;
        }
      }
    }
  }
}

.slide-enter-active {
  transition: right 0.35s ease;
}

.slide-enter {
  right: -400px;
}
</style>
