<template>
    <div id="piechartrestaurant" :style="{margin:'40px', width:'90%', height:'500px'}"></div>
</template>

<script>
    import http from '../../request/index';
    import echarts from "echarts";
    export default {
        name: "PieChartOfRestaurant",
        data(){
          return{
              pieChartsOfRestaurant: null, // 获取餐饮div
              pieOptionOfRestaurant: {
                  // 餐饮饼图 option
                  title: {
                      text: "千岛湖餐饮评分统计图",
                      x: "left"
                  },
                  tooltip: {
                      trigger: "item",
                      formatter: "{a} <br/>{b} : {c} ({d}%)"
                  },
                  legend: {
                      orient: "vertical",
                      x: "right",
                      y: "bottom"
                  },
                  toolbox: {
                      show: true,
                      feature: {
                          mark: { show: true },
                          magicType: {
                              show: true,
                              type: ["pie", "funnel"],
                              option: {
                                  funnel: {
                                      x: "25%",
                                      width: "50%",
                                      funnelAlign: "center"
                                  }
                              }
                          }
                      }
                  },
                  calculable: true,
                  series: []
              },
              res:{}
          }
        },
        methods:{
            getInit:async function(){
                const res = await http.restaurantPieChart();
                this.res = res;
                if(res.code === 0 && res.data) {
                    this.setPieChartsOfRestaurant();
                }
            },
            setPieChartsOfRestaurant: async function() {
                // 餐饮评分分布，由饼图实现
                this.loading = true;
                this.pieChartsOfRestaurant = echarts.init(
                    document.getElementById("piechartrestaurant")
                );

                if (this.res.code === 0 && this.res.data) {
                    var returnData = this.res.data;

                    var data = [
                        {
                            value: 0,
                            name: "较好" + "（4.5-5分）"
                        },
                        {
                            value: 0,
                            name: "好" + "（4-4.5分）"
                        },
                        {
                            value: 0,
                            name: "良" + "（3-4分）"
                        },
                        {
                            value: 0,
                            name: "差" + "（0-4分）"
                        }
                    ];
                    for (var i = 0; i < returnData.length; i++) {
                        switch (returnData[i].name) {
                            case "perfect":
                                data[0].value = returnData[i].count;
                                break;
                            case "good":
                                data[1].value = returnData[i].count;
                                break;
                            case "middle":
                                data[2].value = returnData[i].count;
                                break;
                            case "bad":
                                data[3].value = returnData[i].count;
                                break;
                        }
                    }
                    this.pieOptionOfRestaurant.series.push({
                        name: "餐饮评分区间",
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "60%"],
                        data: data
                    });
                    this.pieChartsOfRestaurant.setOption(this.pieOptionOfRestaurant);
                }
                this.loading = false;
            },
        },
        created(){
            this.getInit();
        }
    }
</script>

<style scoped>

</style>