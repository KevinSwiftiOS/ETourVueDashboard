<template>
  <el-row :gutter="20" class="month-search">
    <el-col :xs="24" :sm="24" :md="2" class="item">
      <el-select v-model="searchData.time" style="width:100%">
        <el-option
          v-for="item in times"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </el-col>

    <!-- 年 -->
    <el-col
      :xs="24"
      :sm="24"
      :md="10"
      class="item"
      v-if="searchData.time === '年'"
    >
      <el-date-picker
        v-model="year1"
        type="year"
        value-format="yyyy"
        placeholder="选择年份"
        style="width:50%"
        :picker-options="dateOption"
      >
      </el-date-picker>
      <el-date-picker
        v-model="year2"
        type="year"
        value-format="yyyy"
        placeholder="选择年份"
        style="width:50%"
        :picker-options="dateOption"
      >
      </el-date-picker>
    </el-col>

    <!-- 月份 -->
    <el-col
      :xs="24"
      :sm="24"
      :md="10"
      class="item"
      v-if="searchData.time === '月'"
    >
      <el-date-picker
        v-model="month1"
        type="month"
        value-format="yyyy-MM"
        placeholder="选择年月"
        style="width:50%"
        :picker-options="dateOption"
      >
      </el-date-picker>
      <el-date-picker
        v-model="month2"
        type="month"
        value-format="yyyy-MM"
        placeholder="选择年月"
        style="width:50%"
        :picker-options="dateOption"
      >
      </el-date-picker>
    </el-col>

    <!-- 周 -->
    <el-col
      :xs="24"
      :sm="24"
      :md="10"
      class="item"
      v-if="searchData.time === '周'"
    >
      <el-date-picker
        v-model="week1"
        type="week"
        format="yyyy 年 WW 周"
        placeholder="选择周"
        style="width:50%"
        :picker-options="dateOption"
      >
      </el-date-picker>
      <el-date-picker
        v-model="week2"
        type="week"
        format="yyyy 年 WW 周"
        placeholder="选择周"
        style="width:50%"
        :picker-options="dateOption"
      >
      </el-date-picker>
    </el-col>

    <!-- 季度 -->
    <el-col
      :xs="24"
      :sm="24"
      :md="10"
      class="item"
      v-if="searchData.time === '季度'"
    >
      <el-date-picker
        v-model="year3"
        type="year"
        value-format="yyyy"
        placeholder="选择年份"
        style="width:25%"
        :picker-options="dateOption"
      >
      </el-date-picker>
      <el-select v-model="quarter1" style="width:25%">
        <el-option
          v-for="item in quarters"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-date-picker
        v-model="year4"
        type="year"
        value-format="yyyy"
        placeholder="选择年份"
        style="width:25%"
        :picker-options="dateOption"
      >
      </el-date-picker>
      <el-select v-model="quarter2" style="width:25%">
        <el-option
          v-for="item in quarters"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-col>

    <!-- 平台 -->
    <el-col :xs="24" :sm="24" :md="4" class="item">
      <el-select v-model="website" style="width:100%">
        <el-option
          v-for="item in websites"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </el-col>

    <el-col :xs="24" :sm="24" :md="6" class="item">
      <!-- 景区 -->
      <el-select v-model="searchData.spots" multiple style="width:100%">
        <el-option
          v-for="item in spots"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </el-col>

    <el-col :xs="24" :sm="24" :md="2" class="item button-box">
      <el-button type="primary" style="float:right" @click="search()"
        >确定</el-button
      >
    </el-col>
  </el-row>
</template>
<script>
import months from "./data.js";
import { websites, spots } from "../../../base/dict";
import { convert_time } from "../../../base/getNewDay";

const moment = require("moment");
const quarters = [
  { label: "第一季度", value: "01" },
  { label: "第二季度", value: "02" },
  { label: "第三季度", value: "03" },
  { label: "第四季度", value: "04" }
];
export default {
  name: "month-select",

  props: {},
  data() {
    const today = new Date(); // 当前
    const year = today.getFullYear().toString(); // 年前年
    let month = moment(today).month() + 1;
    month < 10 ? (month = "0" + month) : month; // 当前月

    const today2year = today.getFullYear() - 2 + "-" + month;

    const week = moment(today).week(); // 当前周

    return {
      dateOption: {
        disabledDate(time) {
          return (
            time.getTime() > Date.now() ||
            time.getTime() < new Date("2014-01-01").getTime()
          );
        }
      },
      websites, // 平台
      spots, // 景区
      months, // 月份
      quarters,
      times: ["年", "季度", "月", "周"],
      //最多4年
      year1: year - 4,
      year2: year,

      month1: today2year,
      month2: year + "-" + month,

      week1: new Date(today.getTime() - 7 * 86400000 * 16),
      week2: today,

      year3: (year - 1).toString(),
      year4: year,
      quarter1: "01",
      quarter2: "01",

      website: "全部平台",
      searchData: {
        startTime: "",
        endTime: "",
        time: "季度", //年 月 周
        type: "1",
        websites: "全部平台",
        spots: ["西湖"]
      },
      old_time: "季度"
    };
  },
  created() {
    this.search();
  },
  methods: {
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
      if (this.searchData.time === "年") {
        this.searchData.startTime = this.year1;
        this.searchData.endTime = this.year2;

        // 校验
        if (this.year1 - this.year2 >= 0) {
          this.$message.warning("结束时间需大于起始时间");
          return;
        }
      }

      if (this.searchData.time === "季度") {
        this.searchData.startTime = this.year3 + "-" + this.quarter1;
        this.searchData.endTime = this.year4 + "-" + this.quarter2;

        //校验
        if (this.year3 + this.quarter1 - (this.year4 + this.quarter2) >= 0) {
          this.$message.warning("结束时间需大于起始时间");
          return;
        }
      }

      if (this.searchData.time === "月") {
        this.searchData.startTime = this.month1;
        this.searchData.endTime = this.month2;
        if (
          moment(this.month1)._d.getTime() >= moment(this.month2)._d.getTime()
        ) {
          this.$message.warning("结束时间需大于起始时间");
          return;
        }
      }
      if (this.searchData.time === "周") {
        //定死周最大的跨度为1年
        if (this.week2.getTime() - this.week1.getTime() > 31449600000) {
          this.$message.warning("时间区间长度不能大于一年");
          return;
        }

        this.searchData.startTime = this.getWeek(this.week1);
        this.searchData.endTime = this.getWeek(this.week2);

        if (this.week1.getTime() >= this.week2.getTime()) {
          this.$message.warning("结束时间需大于起始时间");
          return;
        } else {
        }
      }

      this.searchData.websites = this.website;
      this.$emit("search", { ...this.searchData });
    }
  },
  watch: {
    searchData: {
      handler: function(val) {
        if (val.time != this.old_time) {
          //开始和结束时间获取到
          var old_start_time, old_end_time;
          switch (this.old_time) {
            case "年":
              old_start_time = this.year1;
              old_end_time = this.year2;
              break;
            case "季度":
              old_start_time = this.year3 + "-" + this.quarter1;
              old_end_time = this.year4 + "-" + this.quarter2;
              break;
            case "月":
              old_start_time = this.month1;
              old_end_time = this.month2;
              break;
            case "周":
              old_start_time = this.week1;
              old_end_time = this.week2;
              break;
            default:
              break;
          }
          var new_start_time_day = convert_time(
            this.old_time,
            val.time,
            old_start_time,
            true
          );
          var new_end_time_day = convert_time(
            this.old_time,
            val.time,
            old_end_time,
            false
          );
          //更新
          switch (val.time) {
            case "年":
              this.year1 = new_start_time_day;
              this.year2 = new_end_time_day;
              break;
            case "季度":
              this.year3 = new_start_time_day.split("-")[0];
              this.quarter1 = new_start_time_day.split("-")[1];
              this.year4 = new_end_time_day.split("-")[0];
              this.quarter2 = new_end_time_day.split("-")[1];
              break;
            case "月":
              this.month1 = new_start_time_day;
              this.month2 = new_end_time_day;
              break;
            case "周":
              this.week1 = new_start_time_day;
              this.week2 = new_end_time_day;
              break;
            default:
              break;
          }
          this.old_time = val.time;
        }
      },
      deep: true
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
