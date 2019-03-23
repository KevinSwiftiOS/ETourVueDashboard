<template>
  <el-row :gutter="20" class="month-search">
    <!-- 月份 -->
    <el-col class="item" :xs="12" :sm="8" :md="8">
      <el-date-picker
        v-model="week"
        type="week"
        format="yyyy 年 WW 周"
        placeholder="选择周"
        style="width:100%"
        :picker-options="dateOption"
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
  name: "week-select-simple",
  props: {
    date: {
      type: Date,
      default: new Date()
    }
  },
  data() {
    const that = this;

    return {
      dateOption: {
        disabledDate(time) {
          return (
            time.getTime() > new Date(that.end + "01") ||
            time.getTime() < new Date(that.start + "-01")
          );
        }
      },
      week: this.date
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init: function() {},
    getWeek(date) {
      // yyyy-ww
      const year = date.getFullYear();
      let week = moment(date).week();
      if (week < 10) {
        week = "0" + week;
      } else {
        week = week.toString();
      }
      return year + "-" + week;
    },

    search() {
      this.$emit("search", {
        date: this.getWeek(this.week)
      });
    }
  },
  watch: {
    end(value) {
      //  console.log(this.end);
      //console.log(value);
      this.week = this.end;
      this.search();
    },
    week: function(val) {}
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
