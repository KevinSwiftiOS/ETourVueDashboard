<template>
  <div class="qdh-spot-select">
    <el-select v-model="selectspot" placeholder="请选择">
      <el-option
        v-for="spot in spots"
        :key="spot.key"
        :label="spot.key"
        :value="spot.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { total_qdh_spots_dic } from "../../../base/dict";
import {
  set_session_storage,
  get_session_storage
} from "../../../base/sessionStorage";

export default {
  name: "qdh-spot-select",
  data() {
    return {
      spots: total_qdh_spots_dic,
      selectspot: get_session_storage("qdh_curr_spot")
    };
  },
  methods: {},
  watch: {
    selectspot: function(val) {
      var qdh_curr_spot = get_session_storage("qdh_curr_spot");
      //若不相同进行切换 跳转
      if (qdh_curr_spot != val) {
        set_session_storage("qdh_curr_spot", val);
        //触发动作
        this.$emit("initrender");
      }
    }
  }
};
</script>

<style scoped>
.qdh-spot-select {
  right: 20px;
  position: fixed;
  z-index: 99;
  top: 80px;
}
</style>
