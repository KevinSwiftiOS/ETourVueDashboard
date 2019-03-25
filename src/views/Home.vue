<template>
  <div>
    <!-- home -->
    <div class="home" v-if="$route.name === 'Home'">
      <home-map :data="spotlist" v-model="searchId"></home-map>
      <div class="map-loading" v-if="spotlist.length === 0">
        <span></span> 景区加载中
      </div>

      <!-- home-children -->

      <div style="position: absolute;top: 100px">
        <spot-rank
          :data="spotlist"
          :title="'本年度景区评论数量排名'"
          v-bind:isNum="true"
        ></spot-rank>
        <spot-rank
          :data="spotlist"
          :title="'本年度景区评分排名'"
          v-bind:isNum="false"
        ></spot-rank>
      </div>
    </div>
    <router-view v-else />
  </div>
</template>
<script>
import HomeMap from "../components/map";
import mapSearch from "../components/map-search";
import http from "../request/index.js";
import SpotRank from "../components/spot-rank/spot-rank";

export default {
  name: "Home",
  components: {
    HomeMap,
    mapSearch,
    SpotRank
  },
  data() {
    return {
      spotlist: [],
      spotNums: [],
      spotScores: [],
      searchId: ""
    };
  },
  created() {
    this.getspotlist();
  },
  methods: {
    getspotlist: async function() {
      const res = await http.getspotlist();
      if (res.code === 0 && res.data && res.data.list) {
        this.spotlist = res.data.list;
      }
    },
    renderSpot(data) {
      this.searchId = data.id;
    }
  },

  watch: {
    "$route.name": function(val) {
      if (val === "Home") {
        this.spotlist = [];
        this.getspotlist();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
