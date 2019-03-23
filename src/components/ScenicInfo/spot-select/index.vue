<template>
  <div class="spot-select">
    <el-select v-model="selectspot" placeholder="请选择">
      <el-option v-for="spot in spots" :key="spot" :label="spot" :value="spot">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { total_spots } from "../../../base/dict";
import {
  set_session_storage,
  get_session_storage
} from "../../../base/sessionStorage";

export default {
  name: "spot-select",
  data() {
    return {
      spots: total_spots,
      selectspot: get_session_storage("curr_spot")
    };
  },
  methods: {},
  watch: {
    selectspot: function(val) {
      var curr_spot = get_session_storage("curr_spot");
      //若不相同进行切换 跳转
      if (curr_spot != val) {
        set_session_storage("curr_spot", val);
        //触发动作
        this.$emit("initrender");
      }
    }
  }
};
</script>

<style scoped>
.spot-select {
  right: 20px;
  position: fixed;
  z-index: 99;
  top: 80px;
}
</style>
