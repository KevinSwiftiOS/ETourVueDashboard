<template>
    <div class="shop-info">
        <el-row  type="flex" justify="space-between" class="row-bg" :gutter="1">
            <el-col :span="4" class="tableTitle">
               酒店名称
            </el-col>
            <el-col :span="3" class="tableTitle" >
               评论数量
            </el-col>
            <el-col :span="4" class="tableTitle">
             评分
            </el-col>
            <el-col :span="10" class="tableTitle">
                酒店位置
            </el-col>
            <el-col :span="3" class="tableTitle">
                酒店详情
            </el-col>
        </el-row>
        <el-row type="flex" justify="end" style="margin-bottom: 3px;">
            <el-col style="text-align: right;" :span="6">
                <get-select-compared @changeFunc="sortWay" :options="optionChange" :title="'选择排序方式'"></get-select-compared>
            </el-col>
        </el-row>
        <div @mouseenter="enterBackChange" @mouseleave="leaveBackChange" class="row-bg" v-for="hotelEach in datalist">
                <el-row type="flex" justify="space-between">
                    <el-col :span="4" style="text-align: center;">{{hotelEach.name}}</el-col>
                    <el-col :span="3" style="text-align: center;">{{hotelEach.commentNumber}} 人评论</el-col>
                    <el-col :span="4" style="text-align: center;">
                        <el-rate
                                v-model="hotelEach.commentScore"
                                disabled
                                show-score
                                text-color="#ff9900"
                                score-template="评分 {value}">
                        </el-rate>
                    </el-col>
                    <el-col style="text-align: left;" :span="10"><i
                            class="el-icon-location-outline">{{hotelEach.address}}</i></el-col>
                    <el-col style="text-align: center; cursor: pointer;" :span="3" ><i @click="hotelDetailShow(hotelEach.name, hotelEach.shop_rate)" class="el-icon-zoom-in"></i></el-col>
                </el-row>
                <el-row class="hidden show" type="flex"  justify="space-around">
                    <el-col :span="5" :offset="4" class="detailGrade">
                        <el-rate
                                v-model="hotelEach.comment_health_grade"
                                disabled
                                show-score
                                text-color="#ff9900"
                                score-template="卫生评分  {value}">
                        </el-rate>
                    </el-col>
                    <el-col :span="5" class="detailGrade">
                        <el-rate
                                v-model="hotelEach.comment_service_grade"
                                disabled
                                show-score
                                text-color="#ff9900"
                                score-template="服务评分  {value}">
                        </el-rate>
                    </el-col>
                    <el-col :span="5" class="detailGrade">
                        <el-rate
                                v-model="hotelEach.comment_facility_grade"
                                disabled
                                show-score
                                text-color="#ff9900"
                                score-template="设施评分  {value}">
                        </el-rate>
                    </el-col>
                    <el-col :span="5" class="detailGrade">
                        <el-rate
                                v-model="hotelEach.comment_location_grade"
                                disabled
                                show-score
                                text-color="#CD0000"
                                score-template="位置评分  {value}">
                        </el-rate>
                    </el-col>
                </el-row>
        </div>
    </div>
</template>

<script>
    import getSelectCompared from '../../components/QdhHotelShow/selectOtherHotel'
    import GetHotelCommentScore from "../QdhHotelShow/hotel_rank_comment_score";
    export default {
        name: "tableShow",
        components: {
            GetHotelCommentScore,
            getSelectCompared
        },
        props: {
            datalist: {
                type: Array
            },
            hotelrate: {
                type: String
            },
        },
        data() {
            return {
                qdhhotellist: [],
                autoIncrementNum: 0,
                optionChange: [
                    {
                        label: '评分数量',
                        value: 'commentNumber'
                    },
                    {
                        label: '酒店评分',
                        value: 'commentScore'
                    },
                    {
                        label: '卫生评分',
                        value: 'comment_health_grade'
                    },
                    {
                        label: '服务评分',
                        value: 'comment_service_grade'
                    },
                    {
                        label: '设施评分',
                        value: 'comment_facility_grade'
                    },
                    {
                        label: '位置评分',
                        value: 'comment_location_grade'
                    },
                ]
            };
        },
        methods: {
            sortWay: function (sortway) {
                this.$emit('sortFunc', sortway);
            },                        // jumpDetailShow

            hotelDetailShow: function (hotelname, hotelrate) {
                this.$emit('jumpDetailShow', hotelname, hotelrate);
            },
            enterBackChange: function (event) { // `event` 是原生 DOM 事件
                var el = event.currentTarget;//复杂的click哈哈
                el.style.backgroundColor = '#F0F0F0';
                el.getElementsByClassName('hidden')[0].style.display = 'block';
            },
            leaveBackChange: function (event) { // `event` 是原生 DOM 事件
                var el = event.currentTarget;//复杂的click哈哈
                el.style.backgroundColor = 'white';
                el.getElementsByClassName('hidden')[0].style.display = 'none';
            }
        },
        watch: {
            datalist: function () {
                this.qdhhotellist = this.datalist;
            },
        }
    }
</script>
<style lang="scss" scoped>
    .shop-info {
        .row-bg {
            min-height: 60px;
            border: 2px solid transparent;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
            -webkit-box-shadow: 1px 1px 1px gray;
            -moz-box-shadow: 1px 1px 1px gray;
            box-shadow: 1px 1px 1px gray;
            margin-bottom: 3px;
            padding: 20px 20px 10px;
            &:first-child {
                background: #2196f3;
                color: white;
            }
            .tableTitle {
                border-right: 1px solid navajowhite;
                text-align: center;
                font-family: 华文行楷;
                font-size: 20px;
                // background-color: orange;
                margin: 0px 1px 0px 0px;
            }
        }
        .hidden {
            width: 100%;
            height: 50px;
            margin-top: 20px;
            border-top: 2px solid white;
            padding-top: 10px;
            display: none;
        }
        .detailGrade {
            text-align: center;
        }
    }
</style>