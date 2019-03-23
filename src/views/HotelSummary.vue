<template>
    <div>
        <div
                class="sl-loading"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
        >
            <div class="main-box">
                    <!--@changeFunc="getQDHHotel"-->
                    <get-rank-hotel-show :data="qdhhotelranklist" @changeFunc="getQDHHotel"></get-rank-hotel-show>

            </div>
            <div class="floatDiv">
                <el-row>
                    <el-col :span="9"><el-button @click="changeShowGrade">本月评论数目排名</el-button></el-col>
                    <el-col :span="9"><el-button @click="changeShowScore">本月评论评分排名</el-button></el-col>
                </el-row>
                <div class="showrank" v-show="numShow">
                    <hotel-rank-com-nu :comnumlist="qdhhotelcomnumlist"></hotel-rank-com-nu>
                </div>
                <div class="showrank" v-show="gradeShow">
                    <hotel-rank-com-score :comscorelist="qdhhotelgradelist"></hotel-rank-com-score>
                </div>
            </div>
            <el-button style="position: absolute; top: 80px; right: 40px; z-index: 50;" @click="goToCompared()">
                千岛湖酒店详情
                <i class="el-icon-arrow-right"> </i>
            </el-button>
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
<!--
        <router-view></router-view>
-->

    </div>
</template>

<script>
    //import HomeMapHotel from "../components/map_hotel";
    import HotelRankComNu from "../components/QdhHotelShow/hotel_rank_comment_num";
    import HotelRankComScore from "../components/QdhHotelShow/hotel_rank_comment_score";
    import http from "../request/index.js";
    import getRankHotelShow from "../components/QdhHotelShow/getRankHotelSummary"
    import MapStyle from "../components/style.js";
    import { set_session_storage, get_session_storage, remove_session_storage } from "../base/sessionStorage";

    export default {
        name: "",
        components: {
            HotelRankComNu,
            getRankHotelShow,
            HotelRankComScore
        },
        data() {

            this.chartSettings = {
                key: "orNnnqiVUSu2WabCPvrubZZbncg2Au4a",
                bmap: {
                    center: [119.042172,29.605304],
                    zoom: 13,
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
                numShow: true,
                gradeShow: false,
                qdhhotellist: [],   // 酒店信息列表
                qdhhotelcomnumlist: [],  // 评论数目排序列表
                qdhhotelgradelist: [],  // 酒店评分排序列表
                qdhhotelranklist: [],
                qdhhotelcount: 0,
                state: {}, // 右侧3个指标
                hotelrank: [
                    {name: '全部酒店', latterAttr: 0},
                    {name: '星级酒店', latterAttr: 0},
                    {name: '豪华型', latterAttr: 0},
                    {name: '高档型', latterAttr: 0},
                    {name: '舒适型', latterAttr: 0},
                    {name: '经济型', latterAttr: 0},
                    {name: '客栈民宿', latterAttr: 0}
                ],
                hotelReq: {
                    'hotelrate': ''
                },
                chartSeries: [
                    {
                        name: "数据",
                        type: "scatter",
                        coordinateSystem: "bmap",
                        data: [],
                        symbolSize: function (val) {
                            if(val[2] >= 0 && val[2] <= 5)
                                return 10;
                            else if(val[2] > 5 && val[2] <= 10)
                                return 11;
                            else if(val[2] > 10 && val[2] <= 15)
                                return 12;
                            else if(val[2] > 15 && val[2] <= 20)
                                return 13;
                            else if(val[2] > 25 && val[2] <= 30)
                                return 14;
                            else if(val[2] > 35 && val[2] <= 40)
                                return 15;
                            else if(val[2] > 40 && val[2] <= 60)
                                return 16;
                            else if(val[2] > 60 && val[2] <= 80)
                                return 17;
                            else if(val[2] > 80 && val[2] <= 100)
                                return 18;
                            else if(val[2] > 100 && val[2] <= 150)
                                return 19;
                            else if(val[2] > 150 && val[2] <= 200)
                                return 20;
                            else if(val[2] > 200 && val[2] <= 300)
                                return 21;
                            else if(val[2] > 300 && val[2] <= 1000)
                                return 22;
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
            this.getQDHHotel();
            this.getHotelComment_NumSort();
            this.getHotelGradeSort()
            this.getHotelRankList()
        },
        methods: {

            goToCompared: function () {
                sessionStorage.removeItem('getCurrentPage');
                this.$router.push({path:'/hotelmultishow'});
            },
             changeShowGrade: function() {
               this.numShow = true;
               this.gradeShow = false;
             },
            changeShowScore: function() {
                this.gradeShow = true;
                this.numShow = false;
            },

           /* getQDHHotel: async function (item) {
                this.qdhhotellist = [];
                this.hotelReq.hotelrate = item;
                console.log(this.hotelReq)
                const res = await http.getHotelList(this.hotelReq);
                if (res.code === 0 && res.data && res.data.list) {
                    this.qdhhotellist = res.data.list;
                }
            },*/
            getHotelComment_NumSort: async function () {
                const res = await http.getHotelComment_NumSort();
                if (res.code === 0 && res.data && res.data.list) {
                    this.qdhhotelcomnumlist = res.data.list;
                }
            },
            getHotelGradeSort: async function () {
                const res = await http.getHotelGradeSort();
                if (res.code === 0 && res.data && res.data.list) {
                    this.qdhhotelgradelist = res.data.list;
                }
            },
            getHotelRankList: async function () {
                this.loading = true;
                const res = await http.getHotelRankNumShow();
                if (res.code === 0 && res.data && res.data.list) {
                    var qdhHotelInfoList = res.data.list;
                    for (var i = 0; i < 8; i++) {
                        this.qdhhotelcount += qdhHotelInfoList[i].latterAttr;
                        for (var j = 2; j < 7; j++) {
                            if (this.hotelrank[j].name == qdhHotelInfoList[i].name) {
                                this.hotelrank[j].latterAttr = qdhHotelInfoList[i].latterAttr;
                            }
                        }
                        if(qdhHotelInfoList[i].name == '五星级' || qdhHotelInfoList[i].name == '四星级' || qdhHotelInfoList[i].name == '三星级'){
                            this.hotelrank[1].latterAttr += qdhHotelInfoList[i].latterAttr;
                        }
                    }
                    this.hotelrank[0].latterAttr = this.qdhhotelcount;
                    this.qdhhotelranklist = this.hotelrank;
                }
                this.loading = false;
            },

            initMapStyle: async function () {
                this.bmap = new BMap.Map("map", { minZoom: 8, maxZoom: 15 });
                this.bmap.setMapStyle({styleJson: MapStyle});

                // this.map = new BMap.Map("map", { minZoom: 8, maxZoom: 15 });
              /*  this.map.enableScrollWheelZoom(true);
                this.map.setMapStyle({ styleJson: MapStyle });*/
            },
            getQDHHotel: async function () {                // return;
                this.loading = true;
                remove_session_storage("setCurrPageIndex");
                var curr_hotel_rank = get_session_storage('curr_hotel_rank')  // 存储的酒店等级，避免多次点击
                if(!curr_hotel_rank){
                    curr_hotel_rank = '全部酒店';
                    set_session_storage('curr_hotel_rank', curr_hotel_rank);
                }
                this.hotelReq.hotelrate = curr_hotel_rank;
                const result = await http.getHotelList(this.hotelReq);
                const res = result.data.list;
                const mapFunc = ({lng, lat, address, name, rate, commentNumber, commentScore}) => {
                    return {name, value: [lng, lat, commentNumber, commentScore], address, rate};
                };
                this.fullData[0] = res
                    .filter(({commentNumber}) => commentNumber != null && commentNumber < 1000)
                    .map(mapFunc);
                this.chartSeries[0].data = this.fullData[0];
                this.fullData[1] = res.filter(({commentNumber}) => commentNumber > 1000).map(mapFunc);
                this.chartSeries[1].data = this.fullData[1];
                this.loading = false;
            }
        },

        watch: {
            "$route.name": function (val) {
                if (val === "HotelSummary") {
                    this.qdhhotellist = [];
                    this.getQDHHotel();
                }
            }
        },
        destroyed() {

        }
    };
</script>

<style lang="scss" scoped>
    .main-box {
        padding: 0;
        margin: 0;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 50;
    }
    .floatDiv {
        width: 25%;
        top: 120px;
        left: 50px;
        position: absolute;
        z-index: 1;
        .showrank {
            width: 100%;
        }
    }
    .home-map {
        position: absolute;
        top: 50px;
        left: 0;
        bottom: 0;
        right: 0;
    }

    .right-card-box {
        position: absolute;
        right: 50px;
        top: 50px;
        width: 360px;
        background: #fff;
        color: #333;
        z-index: 100;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 -1px 0px rgba(0, 0, 0, 0.02);
        border-radius: 4px;

        .card-header {
            position: relative;
            height: 100px;
            background: #409eff;
            color: #fff;
            padding: 20px;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;

            h1 {
                font-size: 26px;
                font-weight: normal;
                margin-bottom: 10px;
            }

            p {
                color: rgba(255, 255, 255, 0.85);
            }

            .arrow {
                width: 50px;
                height: 50px;
                position: absolute;
                right: -25px;
                bottom: 25px;
                border-radius: 25px;
                box-shadow: 0 3px 10px rgba(0, 0, 0, 0.23), 0 3px 10px rgba(0, 0, 0, 0.16);
                transition: all 0.2s ease;
                background: #fff;
                color: #333;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                font-size: 24px;

                &:hover {
                    width: 56px;
                    height: 56px;
                    border-radius: 28px;
                    right: -28px;
                    bottom: 22px;
                    background: #448aff;
                    color: #fff;
                }
            }
        }

        .card-list {
            padding: 20px;

            .item {
                background: #03a9f4;
                padding: 20px;
                color: #fff;
                margin-bottom: 20px;
                border-radius: 4px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

                &:last-child {
                    margin-bottom: 0;
                }

                > p {
                    &:first-child {
                        margin-bottom: 10px;
                    }

                    &:last-child {
                        font-size: 32px;
                        font-weight: bold;
                        color: #f5f5f5;
                    }
                }
            }
        }
    }

    .slide-enter-active {
        transition: right 0.35s ease;
    }

    .slide-enter {
        right: -400px;
    }

    .sl-container {
        height: 100%;
    }

    .sl-map {
        width: 100% !important;
        height: 100% !important;
    }
    /*.fade-enter {
        opacity: 1;
    }
    .fade-leave{
         opacity: 0;
    }*/




</style>
