<template>
    <div id="badColum" :style="{margin:'40px', width:'90%', height:'500px'}"></div>
</template>

<script>
    import http from '../../request/index';
    import echarts from "echarts";
    export default {
        data(){
            return{
                badColum: null,
                restaurantBadColum: [],
                restaurantBadColumXAxis: [],
            }
    },
        created(){
     this.getInit();
        },
        name: "BadColum",
        methods:{
            getInit:async function(){
                const restaurantBadColumRes = await http.restaurantBadColum();
                if (restaurantBadColumRes.code === 0 && restaurantBadColumRes.data) {
                    this.restaurantBadColum = restaurantBadColumRes.data;
                    this.restaurantBadColumXAxis = restaurantBadColumRes.Xtime;
                    this.drawBadColum();
                }
            },
            drawBadColum: function() {
                this.badColum = echarts.init(document.getElementById("badColum"));

                var arr = [];
                for (var i = 0; i < 13; i++) {
                    arr.push(this.restaurantBadColum[i].totalNumber);
                }
                this.badColum.setOption({
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "cross",
                            crossStyle: {
                                color: "#999"
                            }
                        }
                    },
                    xAxis: [
                        {
                            type: "category",
                            data: this.restaurantBadColumXAxis,
                            axisPointer: {
                                type: "shadow"
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: "value",
                            name: "差评个数",
                            min: 1000,
                            max: 3700,
                            interval: 300,
                            axisLabel: {
                                formatter: "{value} 个"
                            }
                        }
                    ],
                    series: [
                        {
                            name: "差评个数",
                            type: "bar",
                            data: arr
                        }
                    ]
                });
            },
        }
    }
</script>

<style scoped>

</style>