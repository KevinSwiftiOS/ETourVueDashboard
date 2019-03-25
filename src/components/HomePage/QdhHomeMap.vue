<template>
    <div class="sl-loading"
         v-loading="loading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <el-container class="sl-container">
            <ve-bmap
                    class="sl-map"
                    height="100%"
                    :settings="chartSettings"
                    :series="chartSeries"
                    :tooltip="chartTooltip"
                    :visual-map="visualMap"
            ></ve-bmap>
        </el-container>
    </div>
</template>

<script>
    import http from "../../request/index.js";
    import MapStyle from "../../components/style.js";
    import qdh_spot_infos from "../../base/qdhSpotInfo";
    export default {
        name: "",
        data() {
            this.chartSettings = {
                key: "orNnnqiVUSu2WabCPvrubZZbncg2Au4a",
                bmap: {//  lng: 118.94942,
                    //lat: 29.561853,
                    center: [118.94942, 29.561853],
                    zoom: 12,
                    roam: true
                }
            };

            this.visualMap = [{
                type: 'continuous',
                min: 0,
                max: 5,
                show: true,
                splitNumber: 1,
                //散点的颜色
                color: ["#811313", "#f3f17b", "blue", "gray"],
                textStyle: {
                    color: "#fff"
                }
            }];
            this.chartTooltip = {
                trigger: "item",
                formatter: params => {
                    return `${params.name}: ${params.value[2]}`;
                }
            };
            return {
                loading: true,
                spotlist: [],
                chartSeries: [
                    {
                        name: "数据",
                        type: "scatter",
                        coordinateSystem: "bmap",
                        data: [],
                        symbolSize: function (val) {
                            if (val[2] >= 0 && val[2] <= 5)
                                return 32;
                            else if (val[2] > 5 && val[2] <= 10)
                                return 36;
                            else if (val[2] > 10 && val[2] <= 15)
                                return 40;
                            else if (val[2] > 15 && val[2] <= 20)
                                return 44;
                            else if (val[2] > 25 && val[2] <= 30)
                                return 46;
                            else if (val[2] > 35 && val[2] <= 40)
                                return 48;
                            else if (val[2] > 40 && val[2] <= 60)
                                return 50;
                            else if (val[2] > 60 && val[2] <= 80)
                                return 52;
                            else if (val[2] > 80 && val[2] <= 100)
                                return 54;
                            else if (val[2] > 100 && val[2] <= 150)
                                return 56;
                            else if (val[2] > 150 && val[2] <= 200)
                                return 57;
                            else if (val[2] > 200 && val[2] <= 300)
                                return 58;
                            else if (val[2] > 300 && val[2] <= 1000)
                                return 59;
                        },
                        label: {
                            normal: {
                                show: false,
                                formatter: "{b}"
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                //   color: "blue"
                            }
                        }
                    },
                    {
                        name: "big",
                        type: "effectScatter",
                        coordinateSystem: "bmap",
                        data: [],
                        symbolSize: function (val) {
                            if (val[2] > 1000 && val[2] <= 5000)
                                return 23;
                            else if (val[2] > 5000 && val[2] <= 10000)
                                return 24;
                            else if (val[2] > 10000)
                                return 25;
                        },
                        showEffectOn: "render",
                        rippleEffect: {
                            brushType: "stroke"
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: "{b}",
                                position: "right",
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                //   color: "red",
                                shadowBlur: 10,
                                shadowColor: "#333"
                            }
                        },
                        zlevel: 1
                    }
                ],
                cookStyles: ["全部"],
                sites: ["全部"],
                siteIndex: "全部",
                cookStyleIndex: "全部"
            };
        },
        mounted() {
            this.fullData = [];
            this.initMapStyle();
            this.getspotlist();
        },
        methods: {
            initMapStyle: async function () {
                this.bmap = new BMap.Map("map", { minZoom: 8, maxZoom: 15 });
                this.bmap.setMapStyle({styleJson: MapStyle});
            },
            getspotlist: async function () {
                this.loading = true;
                const result = await http.getJDList();
                if (result.code === 0 && result.data) {
                    this.spotlist = result.data.list;
                    for (var i = 0; i < this.spotlist.length; i++) {
                        switch (this.spotlist[i]._id) {
                            case "下姜":
                                this.spotlist[i]['lat'] = qdh_spot_infos.下姜['lat'];
                                this.spotlist[i]['lng'] = qdh_spot_infos.下姜['lng'];
                                break;
                            case "东南湖":
                                this.spotlist[i]['lat'] = qdh_spot_infos.东南湖['lat'];
                                this.spotlist[i]['lng'] = qdh_spot_infos.东南湖['lng'];
                                break;
                            case "中心湖":
                                this.spotlist[i]['lat'] = qdh_spot_infos.中心湖['lat'];
                                this.spotlist[i]['lng'] = qdh_spot_infos.中心湖['lng'];
                                break;
                            case "九咆界":
                                this.spotlist[i]['lat'] = qdh_spot_infos.九咆界['lat'];
                                this.spotlist[i]['lng'] = qdh_spot_infos.九咆界['lng'];
                                break;
                            case "仙人谷":
                                this.spotlist[i]['lat'] = qdh_spot_infos.仙人谷['lat'];
                                this.spotlist[i]['lng'] = qdh_spot_infos.仙人谷['lng'];
                                break;
                            case "天池岛":
                                this.spotlist[i]['lat'] = qdh_spot_infos.天池岛['lat'];
                                this.spotlist[i]['lng'] = qdh_spot_infos.天池岛['lng'];
                                break;
                            case "文渊狮城":
                                this.spotlist[i]['lat'] = qdh_spot_infos.文渊狮城['lat'];
                                this.spotlist[i]['lng'] = qdh_spot_infos.文渊狮城['lng'];
                                break;
                            case "月光岛":
                                this.spotlist[i]['lat'] = qdh_spot_infos.月光岛['lat'];
                                this.spotlist[i]['lng'] = qdh_spot_infos.月光岛['lng'];
                                break;
                            case "桂花岛":
                                this.spotlist[i]['lat'] = qdh_spot_infos.桂花岛['lat'];
                                this.spotlist[i]['lng'] = qdh_spot_infos.桂花岛['lng'];
                                break;
                            case "梅峰":
                                this.spotlist[i]['lat'] = qdh_spot_infos.梅峰['lat'];
                                this.spotlist[i]['lng'] = qdh_spot_infos.梅峰['lng'];
                                break;
                            case "森林氧吧":
                                this.spotlist[i]['lat'] = qdh_spot_infos.森林氧吧['lat'];
                                this.spotlist[i]['lng'] = qdh_spot_infos.森林氧吧['lng'];
                                break;
                            case "渔乐岛":
                                this.spotlist[i]['lat'] = qdh_spot_infos.渔乐岛['lat'];
                                this.spotlist[i]['lng'] = qdh_spot_infos.渔乐岛['lng'];
                                break;
                            case "白云溪":
                                this.spotlist[i]['lat'] = qdh_spot_infos.白云溪['lat'];
                                this.spotlist[i]['lng'] = qdh_spot_infos.白云溪['lng'];
                                break;
                            case "石林":
                                this.spotlist[i]['lat'] = qdh_spot_infos.石林['lat'];
                                this.spotlist[i]['lng'] = qdh_spot_infos.石林['lng'];
                                break;
                            case "秘境":
                                this.spotlist[i]['lat'] = qdh_spot_infos.秘境['lat'];
                                this.spotlist[i]['lng'] = qdh_spot_infos.秘境['lng'];
                                break;
                            case "芹川":
                                this.spotlist[i]['lat'] = qdh_spot_infos.芹川['lat'];
                                this.spotlist[i]['lng'] = qdh_spot_infos.芹川['lng'];
                                break;
                            case "蜜山岛":
                                this.spotlist[i]['lat'] = qdh_spot_infos.蜜山岛['lat'];
                                this.spotlist[i]['lng'] = qdh_spot_infos.蜜山岛['lng'];
                                break;
                            case "钓鱼岛":
                                this.spotlist[i]['lat'] = qdh_spot_infos.钓鱼岛['lat'];
                                this.spotlist[i]['lng'] = qdh_spot_infos.钓鱼岛['lng'];
                                break;
                            case "黄山尖":
                                this.spotlist[i]['lat'] = qdh_spot_infos.黄山尖['lat'];
                                this.spotlist[i]['lng'] = qdh_spot_infos.黄山尖['lng'];
                                break;
                            case "龙山岛":
                                this.spotlist[i]['lat'] = qdh_spot_infos.龙山岛['lat'];
                                this.spotlist[i]['lng'] = qdh_spot_infos.龙山岛['lng'];
                                break;
                        }
                    } // for 循环的停止
                    const mapFunc = ({lng, lat, _id, commentNumber, commentScore}) => {
                        var name = _id;
                        return {name, value: [lng, lat, commentNumber, commentScore]};
                    };
                    this.fullData[0] = this.spotlist
                        .filter(({commentNumber}) => commentNumber != null && commentNumber < 1000)
                        .map(mapFunc);
                    this.chartSeries[0].data = this.fullData[0];
                    this.fullData[1] = this.spotlist.filter(({commentNumber}) => commentNumber > 1000).map(mapFunc);
                    this.chartSeries[1].data = this.fullData[1];
                }
                this.loading = false;
            },

        }
    };
</script>

<style lang="scss" scoped>
.sl-loading .sl-container{
    padding: 0px;
    margin: 0px;
}
</style>
