<template>
  <el-row :gutter="20" class="month-search">
    <!-- 月份 -->
    <el-col class="item" :xs="12" :sm="8" :md="8">
      <el-date-picker
        v-model="month"
        type="month"
        value-format="yyyy-MM"
        placeholder="选择月份"
        :picker-options="dateOption"
        style="width:100%"
      >
      </el-date-picker>
    </el-col>

    <el-col class="item button-box" :xs="12" :sm="16" :md="16">
      <el-button type="primary" style="float:right" @click="search()"
        >确定</el-button
      >
    </el-col>
  </el-row>
</template>
<script>
const moment = require("moment");
export default {
  name: "month-select-simple",
  props: {
    start: {
      type: String,
      default: ""
    },
    end: {
      type: String,
      default: ""
    }
  },
  data() {
    const that = this;
    return {
      dateOption: {
        disabledDate(time) {
          return (
            time.getTime() > new Date(that.end) ||
            time.getTime() < new Date(that.start)
          );
        }
      },
      month: ""
    };
  },
  created() {},
  methods: {
    search() {
      this.$emit("search", {
        date: this.month
      });
    }
  },
  watch: {
    end(value) {
      this.month = this.end;
      this.search();
    }
  }
};
</script>

<style lang="scss">
.month-search {
  .item {
    margin-bottom: 10px;
  }
}
</style>
