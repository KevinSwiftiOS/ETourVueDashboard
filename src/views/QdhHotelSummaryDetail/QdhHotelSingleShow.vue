<template>
    <div v-loading="loading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)"
         class="domBoss"
    >
        <div class="common-breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item><span style="cursor: pointer" @click="back()">
                       <i class="el-icon-arrow-left"> </i>千岛湖总览</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-box">
            <block-box :title="hotelReq.hotelrate+'\t酒店\t'+currHotelName+'\t关键指标'" icon="icon-dashboard">
                <el-row :gutter="20" class="top-4">
                    <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                        <div class="item">
                            <div class="title">本月评论数量</div>
                            <div class="number">{{currMonthGrade}}</div>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                        <div class="item">
                            <div class="title">评论排名</div>
                            <div class="number">{{currMonthGradeSort}}</div>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                        <div class="item">
                            <div class="title">本月评分</div>
                            <div class="number">
                                <el-rate
                                        v-model="currMonthScore"
                                        disabled
                                        show-score
                                        text-color="#f44336"
                                        score-template="{value}">
                                </el-rate>
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                        <div class="item">
                            <div class="title">评分排名</div>
                            <div class="number">{{currMonthScoreSort}}</div>
                        </div>
                    </el-col>

                </el-row>
            </block-box>
            <el-row :gutter="20" type="flex" justify="end" style="margin-bottom: 20px;">
                <el-col :sm="24" :md="3">
                    <el-select @change="selectChangeMyShow" v-model="otherchoice" placeholder="比较其他酒店">
                        <el-option
                                v-for="item in optionSameRank"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <!-- 基本信息 -->
            <el-row :gutter="20">
                <el-col :sm="24" :md="12">
                    <block-box :title="hotelReq.hotelrate+'\t酒店详细评分'" icon="icon-comment">
                        <get-select-compared @changeFunc="addComparedRankRadar" :options="optionRadarRank"
                                             :title="'比较其他等级'" :currHotelRankCompared="hotelReq.hotelrate"
                                             :currHotelNameCompared="currHotelName"></get-select-compared>
                        <get-radar-hotel :hotelname="currHotelName" :hotelrate="hotelReq.hotelrate"
                                         :radarChartValAvg="radarChartValAvgPara"
                                         :radarChartVal="radarChartValPara"></get-radar-hotel>
                    </block-box>
                </el-col>
                <el-col :sm="24" :md="12">
                    <block-box title="酒店全部评分数量" icon="icon-comment">
                        <get-tree-map-hotel :hotelname="currHotelName" :treedata="treeMapData"></get-tree-map-hotel>
                    </block-box>
                </el-col>
            </el-row>
            <!---->
            <el-row :gutter="20" type="flex" justify="end" style="margin-bottom: 20px;">
                <el-col :sm="24" :md="3">
                    <el-select @change="getHotelInfoByDifferTime" v-model="hotelReq.gettimetype"
                               placeholder="选择时间查询方式">
                        <el-option
                                v-for="item in selectTimeType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <!--插入 一个季度选择表-->
            <!--评论数量折线图-->
            <el-row :gutter="20">
                <el-col :sm="24" :md="12">
                    <block-box title="评论数量变化图" icon="icon-comment">
                        <button class="button-style" v-show="chart_qdh_is_show_button"
                                @click="chart1otherisCompared">{{chart1_qdh_is_compared ? "不与其他酒店比较":"与其他酒店比较"}}
                        </button>
                        <div class="chart" id="chart1"></div>
                    </block-box>
                </el-col>
                <el-col :sm="24" :md="12">
                    <block-box title="评论变化折线图" icon="icon-looks_5">
                        <button class="button-style" v-show="chart_qdh_is_show_button"
                                @click="chart2otherisCompared">{{chart2_qdh_is_compared ? "不与其他酒店比较":"与其他酒店比较"}}
                        </button>
                        <div class="chart" id="chart2"></div>
                    </block-box>
                </el-col>
            </el-row>
            <!--条形图-->
            <el-row :gutter="20">
                <el-col :sm="24" :md="12">
                    <block-box title="不同平台评论数" icon="icon-comment">
                        <season-select-simple ref="webcomnuseason" v-show="time == '季'" @search="getchart3"
                                              :start="startTime" :end="endTime"></season-select-simple>
                        <month-select-simple ref="webcomnumonth" v-show="time == '月'" @search="getchart3"
                                             :start="startTime" :end="endTime"></month-select-simple>
                        <week-select-simple ref="webcomnuweek" v-show="time == '周'" v-bind:date="week"
                                            @search="getchart3"></week-select-simple>
                        <button class="button-style" v-show="chart_qdh_is_show_button"
                                @click="chart3otherisCompared">{{chart3_qdh_is_compared ? "不与其他酒店比较":"与其他酒店比较"}}
                        </button>
                        <div class="chart" id="chart3"></div>
                    </block-box>
                </el-col>
                <el-col :sm="24" :md="12">
                    <block-box title="不同平台评分" icon="icon-looks_5">
                        <season-select-simple ref="webcomscoreseason" v-show="time == '季'" @search="getchart4"
                                              :start="startTime" :end="endTime"></season-select-simple>
                        <month-select-simple ref="webcomscoremonth" v-show="time == '月'" @search="getchart4"
                                             :start="startTime" :end="endTime"></month-select-simple>
                        <week-select-simple ref="webcomscoreweek" v-show="time == '周'" v-bind:date="week"
                                            @search="getchart4"></week-select-simple>
                        <button class="button-style" v-show="chart_qdh_is_show_button"
                                @click="chart4otherisCompared">{{chart4_qdh_is_compared ? "不与其他酒店比较":"与其他酒店比较"}}
                        </button>
                        <div class="chart" id="chart4"></div>
                    </block-box>
                </el-col>
            </el-row>
            <hotel-comment-sentiment class="commentAnalyze"></hotel-comment-sentiment>
            <div class="content-container-top">
                <go-top-page></go-top-page>
            </div>
            <div class="">
                <prompt-info></prompt-info>
            </div>
        </div>
    </div>
</template>
<script>
    import monthSelect from "../../components/QdhScenic/month-select/index";
    import randomNumber from "../../components/QdhScenic/random-number/index";
    import blockBox from "../../components/block-box/index";
    import monthSelectSimple from "../../components/ScenicInfo/month-select-simple/index";
    import seasonSelectSimple from "../../components/ScenicInfo/season-select-simple/index";
    import weekSelectSimple from "../../components/ScenicInfo/week-select-simple/index";
    import http from "../../request/index.js";
    import getRadarHotel from '../../components/QdhHotelShow/radarHotelShow'
    import getTreeMapHotel from '../../components/QdhHotelShow/treeMapHotelShow'
    import {get_num_rank_forHotel} from "../../base/getRank";
    import getSelectCompared from '../../components/QdhHotelShow/selectOtherHotel'

    let echarts = require('echarts/lib/echarts')
    import {get_session_storage, set_session_storage} from "../../base/sessionStorage";
    import {get_num_hotel_rank, get_score_hotel_rank} from "../../base/getRankForHotel";
    import hotelCommentSentiment from "../../components/QdhHotelShow/hotelCommentSentiment"
    import goTopPage from "../../components/divide-page/goTopPage"
    import promptInfo from "../../components/divide-page/promptInfo"

    export default {
        components: {
            monthSelect,
            randomNumber,
            blockBox,
            seasonSelectSimple,
            monthSelectSimple,
            weekSelectSimple,
            getRadarHotel,
            getTreeMapHotel,
            getSelectCompared,
            hotelCommentSentiment,
            goTopPage,
            promptInfo
        },
        data() {
            return {
                loading: false,
                radarChartValAvgPara: [],
                radarChartValPara: [],
                treeMapData: [],
                qdhhotelranklist: [], //  等级列表
                currHotelName: '',  // 当前 酒店m
                currPageIndex: 1, // 从 QdhHotelMultiSummary 页面进行跳转时的页面下标
                otherchoice: '', // 其他酒店
                currMonthGrade: 0,  // 本月评论数量
                currMonthGradeSort: '', //本月评论数量的排名
                currMonthGradeTempSort: 0, // 中间变量
                currMonthScoreSort: '', // 本月评分的排名
                currMonthScoreTempSort: 0, // 中间变量
                currMonthScore: 0.0, // 本月评分
                optionSameRank: [], // 相同等级的酒店
                optionRadarRank: [
                    {
                        value: '五星级',
                        label: '五星级'
                    },
                    {
                        value: '四星级',
                        label: '四星级'
                    },
                    {
                        value: '豪华型',
                        label: '豪华型'
                    },
                    {
                        value: '三星级',
                        label: '三星级'
                    },
                    {
                        value: '高档型',
                        label: '高档型'
                    },
                    {
                        value: '舒适型',
                        label: '舒适型'
                    },
                    {
                        value: '经济型',
                        label: '经济型'
                    },
                    {
                        value: '客栈民宿',
                        label: '客栈民宿'
                    }
                ],
                selectTimeType: [
                    {
                        value: '按季查询',
                        label: '按季查询'
                    },
                    {
                        value: '按月查询',
                        label: '按月查询'
                    },
                    {
                        value: '按周查询',
                        label: '按周查询'
                    }
                ],
                selectModel: '', // 用于显示当前选中的 查询方式
                hotelReq: {
                    hotelname: [],      // 表示要比较的所有酒店
                    hotelrate: '',
                    comparedrate: '',       // 表示所要比较的酒店等级
                    gettimetype: '按季查询'
                },
                week: new Date(),

                chart_qdh_is_show_button: false, // 包含所有的button

                chart1_qdh_series: {},
                chart1_qdh_is_compared: true,
                chart1_other_series: {}, // 用于暂时存在 chart1 其他酒店的信息

                chart2_qdh_series: {},
                chart2_qdh_is_compared: true,
                chart2_other_series: {}, // 用于暂时存在 chart1 其他酒店的信息

                chart3_qdh_series: {},
                chart3_qdh_is_compared: true,
                chart3_other_series: {}, // 用于暂时存在 chart1 其他酒店的信息

                chart4_qdh_series: {},
                chart4_qdh_is_compared: true,
                chart4_other_series: {}, // 用于暂时存在 chart1 其他酒店的信息

                myChart1: null,
                myChart2: null,
                myChart3: null,
                myChart4: null,
                chart1: {
                    title: {
                        show: true,
                    },
                    tooltip: {
                        trigger: "axis"
                    },
                    legend: {
                        right: 10
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
                    series: []
                },
                chart2: {
                    title: {
                        show: true
                    },
                    tooltip: {
                        trigger: "axis"
                    },
                    legend: {
                        right: 10
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
                            min: 4,
                            max: 5
                        }
                    ],
                    series: []
                },
                chart3: {
                    title: {
                        show: true
                    },
                    tooltip: {
                        trigger: "axis"
                    },
                    legend: {
                        right: 10
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
                    series: []
                },
                chart4: {
                    title: {
                        show: true
                    },
                    tooltip: {
                        trigger: "axis"
                    },
                    legend: {
                        right: 10
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
                            max: 5
                        }
                    ],
                    series: []
                },
                startTime: "",
                endTime: "",
                time: "",
                hotelrank: [
                    {name: '五星级', latterAttr: 0},
                    {name: '四星级', latterAttr: 0},
                    {name: '豪华型', latterAttr: 0},
                    {name: '三星级', latterAttr: 0},
                    {name: '高档型', latterAttr: 0},
                    {name: '舒适型', latterAttr: 0},
                    {name: '经济型', latterAttr: 0},
                    {name: '客栈民宿', latterAttr: 0}
                ]
            }

        },
        mounted() {
            this.get_curr_hotel_info();
            this.initchart();               // 初始化 所有 charts
            this.getSameRankHotelInfo();    // 获取与当前酒店相同等级列表
            this.getCurrHotelSortComNum();        //  当前酒店本月评分数量以及评分 排名
            this.addCurrHotelName();        // 添加 当前酒店， 这是和其他酒店作比较
            this.hotelGradeDetail();        // 酒店等级 雷达图 详细评分
            this.hotelGradeDetailAvg();     // 当前酒店所属等级 平均 评分
            this.getTreeMapCommentNum()     //  treemap 不同平台的评论数量
            this.getchartNumLastest();      // 不同平台最近评分数量
            this.getchartScoreLastest();    // 不同平台最近评分
        },

        methods: {
            back: function () {
                set_session_storage('setCurrPageIndex', this.currPageIndex);
                this.$router.back();
            },
            get_curr_hotel_info: function () {  // 这是获取传来的参数， 包括就点名以及 酒店等级
                this.currHotelName = this.$route.query.hotelname;
                this.hotelReq.hotelrate = this.$route.query.hotelrate;
                this.currPageIndex = this.$route.query.currpage;
            },
            is_compared_change() {  // 改变 是否要比较按钮的状态
                this.chart1_qdh_is_compared = false;
                this.chart2_qdh_is_compared = false;
                this.chart3_qdh_is_compared = false;
                this.chart4_qdh_is_compared = false;
            },
            clear_other_charts_series() {   // 清空 暂存在chart1_other_series 中 其他酒店的 评论数量或者评分
                this.chart1_other_series = [];
                this.chart2_other_series = [];
                this.chart3_other_series = [];
                this.chart4_other_series = [];
            },
            pop_top_charts_series() {       // 如果 图表中的series 中的 数据长度 ！- 1，说明有两家酒店的信息， 清除top 中的数据
                if (this.chart1.series.length != 1) {
                    this.chart1.series.pop()
                }
                if (this.chart2.series.length != 1) {
                    this.chart2.series.pop()
                }
                if (this.chart3.series.length != 1) {
                    this.chart3.series.pop()
                }
                if (this.chart4.series.length != 1) {
                    this.chart4.series.pop()
                }
            },
            renew_charts_shows() {  // 重新加载图表
                this.myChart1.setOption(this.chart1, true);
                this.myChart2.setOption(this.chart2, true);
                this.myChart3.setOption(this.chart3, true);
                this.myChart4.setOption(this.chart4, true);
            },
            selectChangeMyShow(value) {  // 添加其他酒店 // 当选择其他酒店时， 可选择是否要同其他酒店比较
                console.log(value, 'value');
                console.log(value == this.currHotelName);
                console.log(this.hotelReq.hotelname);
                if (value == this.currHotelName) {
                    if (this.hotelReq.hotelname.length != 1) {
                        this.hotelReq.hotelname.pop()  // 提出后来插入的酒店
                        this.is_compared_change();
                        this.clear_other_charts_series();
                        this.pop_top_charts_series();
                        this.renew_charts_shows();
                    }
                } else {
                    if (this.hotelReq.hotelname.length != 1) {
                        this.hotelReq.hotelname.pop()
                    }
                    this.hotelReq.hotelname.push(value);
                    this.initchart();
                    this.getchartNumLastest();
                    this.getchartScoreLastest();
                    if (this.time == '周') {
                        this.$refs.webcomnuweek.search();
                        this.$refs.webcomscoreweek.search();
                    } else if (this.time == '月') {
                        this.$refs.webcomnumonth.search();
                        this.$refs.webcomscoremonth.search();
                    } else if (this.time == '季') {
                        this.$refs.webcomnuseason.search();
                        this.$refs.webcomscoreseason.search();
                    }
                }
                if (this.hotelReq.hotelname.length != 1) {
                    this.chart_qdh_is_show_button = true;
                } else {
                    this.chart_qdh_is_show_button = false;
                }
            },

            getHotelRankList: async function () {
                this.loading = true;
                const res = await http.getHotelRankNumShow();
                if (res.code === 0 && res.data && res.data.list) {
                    this.qdhhotelranklist = res.data.list;
                    for (var i = 0; i < 8; i++) {
                        for (var j = 0; j < 8; j++) {
                            if (this.hotelrank[j].name == this.qdhhotelranklist[i].name) {
                                this.hotelrank[j].latterAttr = this.qdhhotelranklist[i].latterAttr;
                            }
                        }
                    }
                    this.qdhhotelranklist = this.hotelrank;
                }
                this.loading = false;
            },

            getHotelInfoByDifferTime: function (value) {
                this.hotelReq.gettimetype = value; // 获取当前查询时间方式
                this.getchartScoreLastest();  // 获取最近评分数量
                this.getchartNumLastest();
                this.chart1_other_series = [];
                this.chart2_other_series = [];
                this.chart3_other_series = [];
                this.chart4_other_series = [];
                //this.getchartNumLastest();
            },
            getCurrHotelSortComNum: async function () {  //获取当前酒店本月的评论数量 网页 展示评分数量排名
                this.loading = true;
                var currPara = {}
                var sortType = 0; //
                currPara['hotelname'] = this.currHotelName;
                currPara['hotelrate'] = this.hotelReq.hotelrate;
                currPara['sorttypes'] = ['commentNum', 'commentScore'];
                this.qdhhotelranklist = get_session_storage('qdhhotelranklist')
                if (!this.qdhhotelranklist) {
                    this.getHotelRankList()
                }
                const res = await http.getCurrHotelSortType(currPara);
                if (res.code === 0 && res.data && res.data.commentsort) {
                    var returnHotelArr = res.data.commentsort;
                    if (!returnHotelArr[0][0]['comment_num']) {
                        sortType += 1;
                    }
                    var comment_score_index = (sortType + 1) % 2;
                    for (var j = 0; j < returnHotelArr[comment_score_index].length; j++) {
                        if (returnHotelArr[comment_score_index][j]['hotelname'] == this.currHotelName) {
                            this.currMonthScore = returnHotelArr[comment_score_index][j]['comment_score'];
                            this.currMonthScoreTempSort = j + 1;
                            break;
                        }
                    }
                    var comment_num_index = (sortType) % 2;
                    for (var i = 0; i < returnHotelArr[comment_num_index].length; i++) {
                        if (returnHotelArr[comment_num_index][i]['hotelname'] == this.currHotelName) {
                            this.currMonthGrade = returnHotelArr[comment_num_index][i]['comment_num'];
                            this.currMonthGradeTempSort = i + 1;
                            break;
                        }
                    }
                    this.currMonthGradeSort = get_num_hotel_rank(this.hotelReq.hotelrate, this.currMonthGradeTempSort, this.qdhhotelranklist);
                    this.currMonthScoreSort = get_score_hotel_rank(this.hotelReq.hotelrate, this.currMonthScoreTempSort, this.qdhhotelranklist);
                }
                this.loading = false;
            },

            addCurrHotelName() { // 选择其他酒店 开始比较
                if (this.hotelReq.hotelname.indexOf(this.currHotelName) == -1) {
                    this.hotelReq.hotelname.push(this.currHotelName)
                }
            },

            getSameRankHotelInfo: async function () { // 获取 酒店列表
                this.loading = true;
                var paramList = {};
                paramList['currpage'] = 1;
                paramList['hotelrate'] = this.hotelReq.hotelrate;
                paramList['pagesize'] = 10;
                paramList['sortway'] = 'commentNumber';
                const res = await http.getHotelSummary(paramList);
                if (res.code === 0 && res.data && res.data.list) {
                    var hotel_shop_list = res.data.list;
                    for (var i = 0; i < hotel_shop_list.length; i++) {
                        this.optionSameRank.push({
                            value: hotel_shop_list[i].name,
                            label: hotel_shop_list[i].name
                        })
                    }
                    var isExistFlag = false;
                    for (var i = 0; i < this.optionSameRank.length; i++) {
                        if (this.optionSameRank[i].value == this.currHotelName) {
                            isExistFlag = true;
                            break;
                        }
                    }
                    if (!isExistFlag) {
                        this.optionSameRank.push({
                            value: this.currHotelName,
                            label: this.currHotelName
                        })
                    }
                }
                this.loading = false;
            },

            addComparedRankRadar(value) {
                if (value == this.hotelReq.hotelrate) {
                    if (this.radarChartValAvgPara.length != 1) {
                        this.radarChartValAvgPara.pop();
                    }
                } else {
                    this.hotelReq.comparedrate = value;
                    this.hotelGradeDetailAvg();

                }
            },

            hotelGradeDetail: async function () {  // 绘制 雷达图
                const res = await http.getHotelGradeDetail(this.hotelReq);
                if (res.code === 0 && res.data && res.data.list) {
                    for (var item in res.data.list[0]) {
                        this.radarChartValPara.push(res.data.list[0][item]);
                    }
                }
            },

            hotelGradeDetailAvg: async function () {  // 绘制 雷达图
                const res = await http.getHotelGradeDetailAvg(this.hotelReq);
                this.radarChartValAvgPara.splice(0, this.radarChartValAvgPara.length);
                if (res.code === 0 && res.data && res.data.numAxis) {
                    var returnDate = res.data.numAxis;
                    if (returnDate[0].hotelrate == this.hotelReq.hotelrate) {
                        this.radarChartValAvgPara = returnDate;
                    } else {
                        this.radarChartValAvgPara.push(returnDate[1]);
                        this.radarChartValAvgPara.push(returnDate[0]);
                    }
                }
            },
            initchart: async function () {
                const that = this;
                this.myChart1 = echarts.init(document.getElementById("chart1"));
                this.myChart2 = echarts.init(document.getElementById("chart2"));
                this.myChart3 = echarts.init(document.getElementById("chart3"));
                this.myChart4 = echarts.init(document.getElementById("chart4"));
                window.addEventListener("resize", function () {
                    that.myChart1.resize();
                    that.myChart2.resize();
                    that.myChart3.resize();
                    that.myChart4.resize();
                });
            },
            getTreeMapCommentNum: async function () {  //获取当前酒店所有评论数量在不同平台的分布
                this.loading = true;
                const res = await http.getHotelTMapComNum(this.hotelReq);
                this.loading = false;
                var websiteList = ['大众点评', '去哪儿', '携程', '艺龙'];
                if (res.code == 0 && res.length != 0) {
                    var list = []
                    this.treeMapData = res.data.list;
                    for (var webIndex = 0; webIndex < websiteList.length; webIndex++) { //
                        var count = 0;
                        for (var i = 0; i < res.data.list.length; i++) {
                            if (websiteList[webIndex] != res.data.list[i]['data_website']) {
                                count++;
                            }
                        }
                        if (count == res.data.list.length) {
                            var dataWeb = {
                                'comment_num': 0,
                                'data_website': websiteList[webIndex]
                            };
                            this.treeMapData.push(dataWeb);
                        }
                    }
                }
            },

            chart1otherisCompared: function () { // 选择是否 与其他酒店比较 图表 1
                if (this.chart1_qdh_is_compared) {
                    this.chart1_other_series = [];
                    this.chart1_other_series.push(this.chart1.series[1]);
                    this.chart1.series.splice(1, 1);
                } else {
                    this.chart1.series.push(this.chart1_other_series[0]);
                }
                this.chart1_qdh_is_compared = !this.chart1_qdh_is_compared;
                this.myChart1.setOption(this.chart1, true);
            },

            getchartNumLastest: async function () {  //获取当前酒店近几周或几月的评论数量 chart1
                this.loading = true;
                const res = await http.hotelCurrTimeNum(this.hotelReq);
                if (res.code === 0) {
                    this.startTime = res.data.startTime;
                    this.endTime = res.data.endTime;
                    this.time = res.data.time;
                    this.chart1.title.text = this.startTime + this.time + '-' + this.endTime + this.time + "评论数量变化图";
                    // x轴
                    this.chart1.xAxis[0].data = res.data.xAxis;
                    // 评论
                    const numAxis = res.data.numAxis;
                    this.chart1.series = [];
                    if (numAxis[0].name == this.currHotelName) {
                        for (var i = 0; i < numAxis.length; i++) {
                            this.chart1.series.push({
                                name: numAxis[i].name,
                                type: "line",
                                data: numAxis[i].data,
                                areaStyle: {},
                                smooth: true
                            });
                        }
                    } else {
                        this.chart1.series.push({
                            name: numAxis[1].name,
                            type: "line",
                            data: numAxis[1].data,
                            areaStyle: {},
                            smooth: true
                        });
                        this.chart1.series.push({
                            name: numAxis[0].name,
                            type: "line",
                            data: numAxis[0].data,
                            areaStyle: {},
                            smooth: true
                        });
                    }
                    this.chart1_qdh_is_compared = true;
                    this.myChart1.setOption(this.chart1, true);
                }
                this.loading = false;
            },

            chart2otherisCompared: function () { // 选择是否 与其他酒店比较 图 表2
                if (this.chart2_qdh_is_compared) {
                    this.chart2_other_series = [];
                    this.chart2_other_series.push(this.chart2.series[1]);
                    this.chart2.series.splice(1, 1);
                } else {
                    this.chart2.series.push(this.chart2_other_series[0]);
                }
                this.chart2_qdh_is_compared = !this.chart2_qdh_is_compared;
                this.myChart2.setOption(this.chart2, true);
            },

            getchartScoreLastest: async function () {  //获取当前酒店近几周或几月的评分 chart2
                this.loading = true;
                const res = await http.hotelCurrTimeScore(this.hotelReq);
                if (res.code === 0) {
                    this.startTime = res.data.startTime;
                    this.endTime = res.data.endTime;
                    this.time = res.data.time;
                    this.chart2.title.text = this.startTime + this.time + '-' + this.endTime + this.time + "评分变化图";
                    // x轴
                    this.chart2.xAxis[0].data = res.data.xAxis;  // 评分
                    const scoreAxis = res.data.scoreAxis;
                    this.chart2.series = [];
                    if (scoreAxis[0].name == this.currHotelName) {
                        for (var i = 0; i < scoreAxis.length; i++) {
                            this.chart2.series.push({
                                name: scoreAxis[i].name,
                                type: "line",
                                data: scoreAxis[i].data,
                                areaStyle: {},
                                smooth: true
                            });
                        }
                    } else {
                        this.chart2.series.push({
                            name: scoreAxis[1].name,
                            type: "line",
                            data: scoreAxis[1].data,
                            areaStyle: {},
                            smooth: true
                        });
                        this.chart2.series.push({
                            name: scoreAxis[0].name,
                            type: "line",
                            data: scoreAxis[0].data,
                            areaStyle: {},
                            smooth: true
                        });
                    }
                    this.chart2_qdh_is_compared = true;
                    this.myChart2.setOption(this.chart2, true);
                }
                this.loading = false;
            },

            chart3otherisCompared: function () { // 选择是否 与其他酒店比较
                if (this.chart3_qdh_is_compared) {
                    this.chart3_other_series = [];
                    this.chart3_other_series.push(this.chart3.series[1]);
                    this.chart3.series.splice(1, 1);
                } else {
                    this.chart3.series.push(this.chart3_other_series[0]);
                }
                this.chart3_qdh_is_compared = !this.chart3_qdh_is_compared;
                this.myChart3.setOption(this.chart3, true);
            },

            getchart3: async function (e) { // 获取不同平台 的本周或本月评论数量
                this.loading = true;
                var hotelParas = {
                    hotelname: this.hotelReq.hotelname,
                    compared_time: e.date,
                    type: "1",
                    time: this.time
                };
                const res = await http.hotelWebsiteNumCompared(hotelParas);
                this.loading = false;
                if (res.code == 0) {
                    this.chart3.xAxis[0].data = res.data.xAxis;
                    this.chart3.title.text = e.date + this.time + "评论数量对比";
                    this.chart3.series = [];
                    /*for (const item of res.data.yAxis) {
                        this.chart3.series.push({
                            name: item.name,
                            type: "bar",
                            data: item.data,
                            barGap: 0,
                            barWidth: 15
                        });
                    }*/
                    var yAxis = res.data.yAxis; // 获取 评论数量的值
                    if (yAxis[0].name == this.currHotelName) {
                        for (var i = 0; i < yAxis.length; i++) {
                            this.chart3.series.push({
                                name: yAxis[i].name,
                                type: "bar",
                                data: yAxis[i].data,
                                barGap: 0,
                                barWidth: 15
                            });
                        }
                    } else {
                        this.chart3.series.push({
                            name: yAxis[1].name,
                            type: "bar",
                            data: yAxis[1].data,
                            barGap: 0,
                            barWidth: 15
                        });
                        this.chart3.series.push({
                            name: yAxis[0].name,
                            type: "bar",
                            data: yAxis[0].data,
                            barGap: 0,
                            barWidth: 15
                        });
                    }
                    this.chart3_qdh_is_compared = true;
                    this.myChart3.setOption(this.chart3, true);
                }
                this.loading = false;
            },

            chart4otherisCompared: function () { // 选择是否 与其他酒店比较
                if (this.chart4_qdh_is_compared) {
                    this.chart4_other_series = [];
                    this.chart4_other_series.push(this.chart4.series[1]);
                    this.chart4.series.splice(1, 1);
                } else {
                    this.chart4.series.push(this.chart4_other_series[0]);
                }
                this.chart4_qdh_is_compared = !this.chart4_qdh_is_compared;
                this.myChart4.setOption(this.chart4, true);
            },
            // chart4 评分数
            getchart4: async function (e) {
                this.loading = true;
                var hotelParas = {
                    hotelname: this.hotelReq.hotelname,
                    compared_time: e.date,
                    type: "2",
                    time: this.time
                };
                const res = await http.hotelWebsiteNumCompared(hotelParas);
                if (res.code === 0) {
                    this.chart4.xAxis[0].data = res.data.xAxis;
                    this.chart4.title.text = e.date + this.time + "评分对比";
                    this.chart4.series = [];
                    var yAxis = res.data.yAxis;
                    if (yAxis[0].name == this.currHotelName) {
                        for (var i = 0; i < yAxis.length; i++) {
                            this.chart4.series.push({
                                name: yAxis[i].name,
                                type: "bar",
                                data: yAxis[i].data,
                                barGap: 0,
                                barWidth: 15
                            });
                        }
                    } else {
                        this.chart4.series.push({
                            name: yAxis[1].name,
                            type: "bar",
                            data: yAxis[1].data,
                            barGap: 0,
                            barWidth: 15
                        });
                        this.chart4.series.push({
                            name: yAxis[0].name,
                            type: "bar",
                            data: yAxis[0].data,
                            barGap: 0,
                            barWidth: 15
                        });
                    }
                    /*
                    for (const item of res.data.yAxis) {
                        this.chart4.series.push({
                            name: item.name,
                            type: "bar",
                            data: item.data,
                            barGap: 0,
                            barWidth: 15
                        });
                    }*/
                    this.chart4_qdh_is_compared = true;
                    this.myChart4.setOption(this.chart4, true);
                }
                this.loading = false;
            }
        },
        destroyed() {
            window.removeEventListener("resize", () => {
            });
        },
        watch: {
            week: function (val) {
                this.week = val;
            }
        }
    };
</script>
<style lang="scss" scoped>
    .otherhotel {
        position: absolute;
        top: 50px;
        right: 50px;
        z-index: 40;
    }

    .top-4 {
        .item {
            padding: 20px;
            background: #fff;
            border-radius: 4px;
            min-height: 115px;
            margin: 10px 0px 0px;

            .title {
                font-size: 16px;
                margin-bottom: 10px;
            }

            .number {
                font-size: 32px;
                margin-bottom: 10px;
                color: #f44336;
            }

            .compare {
                color: #717171;
            }
        }
    }

    .block-box {
        margin-bottom: 20px;

        .body {
            .chart {
                width: 100%;
                height: 300px;
            }
        }
    }

    .button-style {
        background-color: #449fdb; /* Green */
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 12px;
        position: relative;
        z-index: 99;
        float: right;
        cursor: pointer;
    }

    #myBtn {
        display: none; /* 默认隐藏 */
        position: fixed;
        bottom: 20px;
        right: 30px;
        z-index: 99;
        border: none;
        outline: none;
        background-color: red; /* 设置背景颜色，你可以设置自己想要的颜色或图片 */
        color: white; /* 文本颜色 */
        cursor: pointer;
        padding: 15px;
        border-radius: 10px; /* 圆角 */
    }

    #myBtn:hover {
        background-color: #555;
    }
</style>

