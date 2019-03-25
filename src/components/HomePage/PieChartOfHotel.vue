<template>
    <div id="piecharthotel" :style="{margin:'40px', width:'90%', height:'500px'}"></div>
</template>

<script>
    import http from '../../request/index';
    import echarts from "echarts";
    export default {
        name: "PieChartOfHotel",
        data(){
            return{
                pieChartOfHotel: null, // 获取酒店div
                pieOptionOfHotel: {
                    // 酒店饼图 option
                    title: {
                        text: "千岛湖酒店评分统计图",
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
                res:{},
            }
        },
        methods:{
            getInit:async function(){
                const res = await http.qdhHotelComScorePie();
                this.res = res;
                if(res.code === 0 && res.data) {
                    this.setPieChartsOfHotel();
                }
            },
            setPieChartsOfHotel: async function() {
                // 酒店评分分布，由饼图实现
                this.pieChartOfHotel = echarts.init(
                    document.getElementById("piecharthotel")
                );


                    var returnData = this.res.data.hotelScoreCount;
                    var data = [
                        {
                            value: 0,
                            name: "较好" + "（4.5-5分）"
                        },
                        {
                            value: 0,
                            name: "好" + " （4-4.5分）"
                        },
                        {
                            value: 0,
                            name: "良" + " （3-4分）"
                        },
                        {
                            value: 0,
                            name: "差" + " （0-3分）"
                        }
                    ];
                    for (var i = 0; i < returnData.length; i++) {
                        switch (returnData[i].comment_type) {
                            case "较好":
                                data[0].value = returnData[i].hotel_count;
                                break;
                            case "好":
                                data[1].value = returnData[i].hotel_count;
                                break;
                            case "良":
                                data[2].value = returnData[i].hotel_count;
                                break;
                            case "差":
                                data[3].value = returnData[i].hotel_count;
                                break;
                        }
                    }
                    this.pieOptionOfHotel.series.push({
                        name: "酒店评分区间",
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "60%"],
                        data: data
                    });
                    this.pieChartOfHotel.setOption(this.pieOptionOfHotel);

            },
        },
        created(){
          this.getInit();
        }
    }
</script>

<style scoped>

</style>