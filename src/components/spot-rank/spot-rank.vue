<template>
  <div v-bind:class="{ spotNum: isNum, spotScore: !isNum }">
    <el-select v-model="title" style="width: 300px;">
      <el-option
        v-for="(spot, index) in spotlist"
        :key="spot.name"
        :label="spot.name"
        :value="spot.name"
        :disabled="true"
      >
        <div v-bind:class="{ qdhstyle: spot.name == '杭州市千岛湖风景名胜区' }">
          <span style="color: black">{{ index + 1 }}.</span>
          <span style="color: black">{{ spot.name }}</span>
          <span style="float: right; color: black; font-size: 13px">{{
            isNum ? spot.commentNumber : spot.commentScore.toFixed(2)
          }}</span>
        </div>
      </el-option>
    </el-select>
  </div>
</template>

<script>
import spot_infos from "../../base/spotInf";
import qdh_spot_infos from "../../base/qdhSpotInfo";
//列表数组排名
export default {
  name: "spot-rank",
  props: {
    data: {
      type: Array
    },
    isNum: {
      type: Boolean,
      default: true
    },
    isHome: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: "ccc"
    }
  },
  data() {
    return {
      showRank: false,
      //局部spotlist
      spotlist: []
    };
  },
  created() {
    //  this.init();
  },
  methods: {
    init: function() {
      alert(this.isHome);
    },
    compare: function(val1, val2) {
      if (val1.commentScore - val2.commentScore < 0) return 1;
      else return -1;
    },
    init_spot_list: function(val) {
      var infos = [];
      if (this.isHome) infos = spot_infos;
      else infos = qdh_spot_infos;

      var temp = [];
      for (var i = 0; i < val.length; i++) {
        if (val[i]._id != null && val[i]._id != undefined) {
          var dic = {
            commentScore: val[i].commentScore,
            commentNumber: val[i].commentNumber,
            name: infos[val[i]._id].name
          };
          temp.push(dic);
        }
      }
      if (this.isNum == true) {
        return temp;
      } else {
        return temp.sort(this.compare);
      }
    }
  },

  watch: {
    data: function(val) {
      var temp = [];
      Object.keys(val).map(function(key) {
        temp.push(val[key]);
      });
      this.spotlist = this.init_spot_list(temp);
    },
    ttt: function(val) {
      this.title = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.spotNum {
  position: absolute;
  top: 80px;
  left: 40px;
}
.spotScore {
  position: absolute;
  top: 150px;
  left: 40px;
}
.qdhstyle {
  background-color: #449fdb;
}
</style>
