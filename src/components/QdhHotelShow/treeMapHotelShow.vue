<template>
    <div class="chart" id="treemapchart"></div></template>
<script>
    let echarts = require('echarts/lib/echarts')

    export default {
        name: "treeMapHotelShow",
        props: {
            treedata: {
                type: Array,
            },
            hotelname: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                treemapChart: null,
                treemapOp: {
                    title: {
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    toolbox: {
                        show: false,
                    },
                    calculable: false,
                    series: [
                    ]
                }, // 占位符
            }
        },
        created() {

        },
        mounted() {
            this.initchart();
        },
        methods: {
            initchart() {
                const that = this;
                this.treemapChart = echarts.init(document.getElementById("treemapchart"));
                window.addEventListener("resize", function() {
                    that.treemapChart.resize();
                });
            },
            treeMapShow(){
                var series_data = [];
                for(var i = 0; i < this.treedata.length; i++) {
                    var dataWebsite = {}
                    dataWebsite['name'] = this.treedata[i]['data_website'];
                    dataWebsite['value'] = this.treedata[i]['comment_num'];
                    series_data.push(dataWebsite)
                }
                this.treemapOp.title['text'] = this.hotelname;
                this.treemapOp.series.push({
                    type: 'treemap',
                    data: series_data
                })
                this.treemapChart.setOption(this.treemapOp);
            }
        },
        watch: {
            treedata(val){
                this.treeMapShow();
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>