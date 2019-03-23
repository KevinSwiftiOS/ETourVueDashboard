//补足0
function PrefixInteger(num, length) {
  return (Array(length).join("0") + num).slice(-length);
}
//季度对应第一天和最后一天
var seasons = {
  1: {
    start: { month: 1, day: 1 },
    end: { month: 3, day: 31 }
  },
  2: {
    start: { month: 4, day: 1 },
    end: { month: 6, day: 30 }
  },
  3: {
    start: { month: 7, day: 1 },
    end: { month: 9, day: 31 }
  },
  4: {
    start: { month: 10, day: 1 },
    end: { month: 12, day: 31 }
  }
};

//判断平闰年
function is_leap_year(year) {
  if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) return 1;
  return 0;
}
//通过平闰年返回当月的最后一天
function get_month_day(year, month) {
  var days = [
    [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  ];
  //返回最后一天
  return days[is_leap_year(year)][month - 1];
}
function get_date(old_time, old_date, is_start) {
  //根据不同颗粒度调整对应的时间 开始表示对应最开始的日期 结束表示对应结束的日期
  switch (old_time) {
    case "年":
      if (is_start) {
        //表明从1月1号开始
        return new Date(old_date, 0, 1);
      } else {
        //表明到最后一天 12.31
        return new Date(old_date, 11, 31);
      }

    case "季度":
      //返回季度对应的第一天 和 季度对应的最后一天
      var year = old_date.split("-")[0];
      var season = parseInt(old_date.split("-")[1]);
      var month_day;
      if (is_start)
        //季度对应表格
        month_day = seasons[season]["start"];
      else month_day = seasons[season]["end"];
      return new Date(year, month_day["month"] - 1, month_day["day"]);

    case "月":
      //返回当月对应的第一天和最后一天
      var year = old_date.split("-")[0];
      var month = parseInt(old_date.split("-")[1]);
      if (is_start) {
        //返回当月的第一天
        return new Date(year, month - 1, 1);
      } else {
        //获取当前月份对应的最后一天 通过平闰年返回当月的最后一天
        return new Date(year, month - 1, get_month_day(year, month));
      }

    case "周":
      //周传进来时是date形式的
      if (is_start) {
        //返回当周的第一天
        var nowDayOfWeek = old_date.getDay();
        var nowDay = old_date.getDate();
        return new Date(
          old_date.getFullYear(),
          old_date.getMonth(),
          nowDay - nowDayOfWeek + 1
        );
      } else {
        //返回当周的最后一天
        var nowDayOfWeek = old_date.getDay();
        var nowDay = old_date.getDate();
        return new Date(
          old_date.getFullYear(),
          old_date.getMonth(),
          nowDay + (7 - nowDayOfWeek)
        );
      }

    default:
      break;
  }
}

//转换到新的时间颗粒度

function convert_to_new(new_time, date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  switch (new_time) {
    case "年":
      return year.toString();
    case "季度":
      var season = ["01", "02", "03", "04"];
      if (month % 3 == 0) return year + "-" + season[month / 3 - 1];
      else return year + "-" + season[Math.floor(month / 3)];
    //要补0
    case "月":
      //要补0

      return year.toString() + "-" + PrefixInteger(month, 2).toString();
    case "周":
      return date;
    //要补0
    default:
      break;
  }
}

//转换时间 从老的时间颗粒度转换到新的时间颗粒度
function convert_time(old_time, new_time, old_date, is_start) {
  //表明是从大致的往详细的方向转变
  //获取当前时间 返回是new Date()
  var curr_day = get_date(old_time, old_date, is_start);

  //新的时间颗粒度对应的时间 根据不同颗粒度返回 年2018 季度2018-01 月2018-03 周为new Date()
  var new_time_day = convert_to_new(new_time, curr_day);
  return new_time_day;
}
export { convert_time };
