// // 千岛湖评分/评论数情况
// const chart1 = {};

// 相邻时间评分/评论数情况
const chart1 = {
  title: {
    show: true,
    x: "left"
  },
  tooltip: {
    trigger: "axis"
  },

  legend: {
    data: []
  },

  calculable: true,
  xAxis: [
    {
      type: "category",
      data: []
    }
  ],
  yAxis: [
    {
      type: "value"
    }
  ],
  series: [
    // {
    //   name: "",
    //   type: "line",
    //   data: [] // data
    // }
  ]
};

// 同期评分/评论数变化
const chart2 = {
  title: {
    show: true,
    x: "left"
  },
  tooltip: {
    trigger: "axis"
  },
  legend: {
    data: []
  },
  calculable: true,
  xAxis: [
    {
      type: "category",
      data: []
    }
  ],
  yAxis: [
    {
      type: "value",
      min: 4
    }
  ],
  series: []
};

// 同时不同平台评分/评论数变化
const chart3 = {
  title: {
    show: false
  },
  tooltip: {
    trigger: "axis"
  },
  legend: {
    bottom: 10
  },
  calculable: true,
  xAxis: [
    {
      type: "category",
      data: []
    }
  ],
  yAxis: [
    {
      type: "value"
    },
    {
      type: "value",
      min: 0,
      max: 5
    }
  ],
  series: [
    {
      name: "评分",
      type: "line",
      data: [] // data
    },
    {
      name: "评论数",
      type: "line",
      data: [], // data
      yAxisIndex: 1
    }
  ]
};

export { chart1, chart2, chart3 };
