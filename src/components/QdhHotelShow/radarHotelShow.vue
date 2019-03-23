<template>
        <div class="chart" id="Radarhart"></div>
</template>
<script>
    let echarts = require('echarts/lib/echarts')
    export default {
        name: "radarHotelShow",
        props: {
            radarChartValAvg: {
                type: Array,
            },
            radarChartVal: {
                type: Array,
            },
            radarChangeFlag: {
                type: Boolean,
                default: true
            },
            radarAvgChangeFlag: {
                type: Boolean,
                default: true
            },
            hotelrate: {
                type: String,
                default: ''
            },
            hotelname: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                radarChart2: null,
                radarData: [],
                radarchart : {
                    title: {
                    },
                    tooltip: {},
                    legend: {
                    },
                    radar: {
                        name: {
                            textStyle: {
                                color: '#fff',
                                backgroundColor: '#999',
                                borderRadius: 3,
                                padding: [3, 5]
                            }
                        },
                        indicator: [
                            { name: '评分', max: 5, min: 0},
                            { name: '卫生', max: 5, min: 0},
                            { name: '服务', max: 5, min: 0},
                            { name: '设施', max: 5, min: 0},
                            { name: '位置', max: 5, min: 0},
                        ]
                    },
                    series : []
                }
            }
        },
        mounted() {

        },
        methods: {
            clearRadarDate() {
                this.radarData.splice(0,this.radarData.length);
            },
            drawLine() {
                this.radarChart2 = echarts.init(document.getElementById('Radarhart'));
                this.clearRadarDate()
                if(this.radarChartValAvg.length != 0 && this.radarChartVal.length != 0){
                    this.loading = true;
                    for(var i = 0; i < this.radarChartValAvg.length; i++){
                        this.radarData.push({
                            value: [this.radarChartValAvg[i].data.commentScore, this.radarChartValAvg[i].data.comment_health_grade,this.radarChartValAvg[i].data.comment_service_grade,this.radarChartValAvg[i].data.comment_facility_grade,this.radarChartValAvg[i].data.comment_location_grade],
                            name: this.radarChartValAvg[i].hotelrate+'平均评分'
                        })
                    }
                    this.radarData.push({
                        value: this.radarChartVal,
                        name: this.hotelname+'实际评分'
                    })
                    this.radarChart2.clear();
                    this.radarchart.series.push({
                        name: this.hotelname,
                        type: 'radar',
                        data: this.radarData
                    });
                    this.radarchart.title["text"] = this.hotelname + '详细评分';
                    this.radarchart.legend['orient'] = 'vertical';
                    this.radarchart.legend['x'] = 'right';
                    this.radarchart.legend['y'] = 'bottom';
                    this.radarChart2.setOption(this.radarchart, true);
                    this.loading = false;
                }
                // 绘制图表
            }
        },
        watch: {
            radarChartVal(val) {
                this.drawLine()
            },
            radarChartValAvg(val){
                this.drawLine()
            }
        }
    }
</script>
<style scoped>
</style>