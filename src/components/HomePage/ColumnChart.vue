<template>
    <div id="columnchart" :style="{margin:'40px', width:'90%', height:'500px'}"></div>
</template>

<script>
    import http from '../../request/index';
    import echarts from "echarts";
    export default {
        name: "ColumnChart",
        data() {
            return {
                columnChartOfSpot: null, // 获取景点div
                spotYearChangeChart1: {
                    title: {
                        text: "千岛湖景点评分数量变化图"
                    },
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "cross",
                            label: {
                                backgroundColor: "#6a7985"
                            }
                        }
                    },
                    legend: {
                        data: ["评论数量"]
                    },
                    grid: {
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: "category",
                            boundaryGap: false
                        }
                    ],
                    yAxis: [
                        {
                            type: "value"
                        }
                    ],
                    series: [
                        {
                            name: "评论数量",
                            type: "line",
                            areaStyle: {},
                            smooth: true,
                            data: []
                        }
                    ]
                },
                res:{},
            }

        },
        methods:{
            getInit:async  function(){
                const res = await http.qdhspotComnumChange();

                this.res = res;
                if (res.code === 0 && res.data) {
                    this.setColumnChartsSpot();
                }
            },
            setColumnChartsSpot: async function() {
                // 景点折线图 年度评论数

                this.columnChartOfSpot = echarts.init(
                    document.getElementById("columnchart")
                );

           if(this.res.code == 0 && this.res.data)
                    var month_cnt = [];
                    var comment_month = [];
                    var returnData = this.res.data.numAxis;
                    for (var i = 0; i < returnData.length; i++) {
                        comment_month.push(returnData[i]["comment_month"]);
                        month_cnt.push(returnData[i]["month_cnt"]);
                    }
                    this.spotYearChangeChart1.xAxis[0].data = comment_month;
                    this.spotYearChangeChart1.series[0].data = month_cnt;
                    this.columnChartOfSpot.setOption(this.spotYearChangeChart1);
                }
            },
        created(){
this.getInit();
        }
    }
</script>

<style scoped>

</style>