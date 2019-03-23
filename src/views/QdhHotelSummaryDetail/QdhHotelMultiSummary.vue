<!-- 景区动态 目前默认为千岛湖 -->
<template>
    <div v-loading="loading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <div>
            <div class="common-breadcrumb">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item><span style="cursor: pointer" @click="back()">
                       <i class="el-icon-arrow-left"> </i>千岛湖动态</span></el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="main-box">
                <!-- 基本信息 -->
                <get-rank-show :data="qdhhotelranklist" @changeFunc="getHotelInfo"></get-rank-show>
            </div>
        </div>
        <div class="shop-info-show">
            <div class="inner-box">
                <table-show :datalist="qdhhotellist" :hotelrate="paramList.hotelrate"
                            @jumpDetailShow="getHotelDetailShow" @sortFunc="sortWay"></table-show>
            </div>
            <div class="divide_page">  <!--分页-->
                <page-change
                        ref="pageChangeRef"
                        :showTitle = "showTitle"
                        @changeFunc="pageChange"
                        :currentPage="paramList.currpage"
                        :pageSize="paramList.pagesize"
                        :total="count">
                </page-change>
            </div>
        </div>
    </div>
</template>
<script>
    import getRankShow from "../../components/QdhHotelShow/getRankShow"
    import http from "../../request/index.js";
    import MoPaging from '../../components/divide-page/MoPaging'
    import PageChange from '../../components/divide-page/PageChange'
    import TableShow from '../../components/table-show/tableShow'
    import { get_session_storage,set_session_storage ,remove_session_storage} from "../../base/sessionStorage";

    export default {
        components: {
            PageChange,
            getRankShow,
            MoPaging,
            TableShow
        },
        data() {
            return {
                loading: true,
                qdhHotelFlagLoading: false,
                qdhhotelranklist: [],
                qdhhotellist: [],
                hotelcollist: ['酒店名称', '酒店排名', '评分数量', '酒店评分', '服务评分', '卫生评分', '位置评分', '设施评分', '酒店位置'],
                count : 0, //总记录数
                showTitle: '',
                pageSizeObj :{
                    '星级酒店': 15,
                    '豪华型': 15,
                    '高档型': 15,
                    '舒适型': 15,
                    '经济型': 20,
                    '客栈民宿': 20
                },
                paramList: {
                    currpage: 1,
                    hotelrate: get_session_storage('curr_hotel_rank'),
                    pagesize: 15,
                    sortway: 'commentNumber'
                },
                hotelrank: [
                    { name: '星级酒店', latterAttr: 0},
                    { name: '豪华型', latterAttr: 0},
                    { name: '高档型', latterAttr: 0},
                    { name: '舒适型', latterAttr: 0},
                    { name: '经济型', latterAttr: 0},
                    { name: '客栈民宿', latterAttr: 0}
                ]
            };
        },
        mounted() {
            this.getHotelRankList();

        },
        methods: {
            getHotelDetailShow: function(hotelname, hotelrate) {
                set_session_storage("setCurrPageIndex", this.paramList.currpage);
                //console.log(hotelname, hotelrate, '输出酒店的名称等级');
                this.$router.push({path: '/hotelsingleshow?hotelname=' + hotelname + '&hotelrate=' + hotelrate +
                        '&currpage='+this.paramList.currpage+''});
            },
            getHotelRankList: async function () {
                this.loading = true;
                const res = await http.getHotelRankNumShow();
                if (res.code === 0 && res.data && res.data.list) {
                    var qdhHotelInfoList = res.data.list;
                    for (var i = 0; i < 8; i++) {
                        for (var j = 1; j < 6; j++) {
                            if (this.hotelrank[j].name == qdhHotelInfoList[i].name) {
                                this.hotelrank[j].latterAttr = qdhHotelInfoList[i].latterAttr;
                            }
                        }
                        if(qdhHotelInfoList[i].name == '五星级' || qdhHotelInfoList[i].name == '四星级' || qdhHotelInfoList[i].name == '三星级'){
                            this.hotelrank[0].latterAttr += qdhHotelInfoList[i].latterAttr;
                        }
                    }
                    this.qdhhotelranklist = this.hotelrank;
                    this.getHotelInfo();
                }
            },
            back:function() {
                this.$router.back();
            },
            getHotelInfo: async function () {
                this.loading = true;
                this.paramList.currpage = get_session_storage("setCurrPageIndex");
                this.paramList.hotelrate = get_session_storage('curr_hotel_rank');
                if(!this.paramList.currpage) {
                    this.paramList.currpage = 1;
                }
                if (!this.paramList.hotelrate || this.paramList.hotelrate == '全部酒店') {
                    this.paramList.hotelrate = '豪华型';
                }
                this.paramList.pagesize = this.pageSizeObj[this.paramList.hotelrate];  // 不同等级数量的酒店具有不同的 页面展示展示个数
                const res = await http.getHotelSummary(this.paramList);
                if (res.code === 0 && res.data && res.data.list) {
                    this.qdhhotellist = res.data.list;
                    for (var i = 0; i < this.qdhhotelranklist.length; i++) {
                        if (this.paramList.hotelrate == this.qdhhotelranklist[i].name) {
                            this.count = this.qdhhotelranklist[i].latterAttr;
                        }
                    }
                }
                this.$refs.pageChangeRef.currPageShow = parseInt(this.paramList.currpage)
                remove_session_storage("setCurrPageIndex");
                this.loading = false;
            },
            //从page组件传递过来的当前page
            pageChange : async function(showTitle, page) {  // 这里的showTitle 没有用
                this.loading = true;
                this.qdhhotellist = [];
                this.paramList.currpage = page;
                const res = await http.getHotelSummary(this.paramList);
                if (res.code === 0 && res.data && res.data.list) {
                    this.qdhhotellist = res.data.list;
                }
                this.loading = false;
            },
            sortWay(val){
                this.$refs.pageChangeRef.currPageShow = 1;
                this.paramList.sortway = val;
                this.getHotelInfo()
            }
        },
        watch: {
        }
    };
</script>
<style lang="scss" scoped>
    .main-box {
        color: #000;
        margin-bottom: 5px;
        background: url(../../assets/icons/qdhc_bg.jpg) no-repeat center;
        background-size:cover;
        //   opacity: 0.5; 图片透明度
        // background-repeat: no-repeat;
        border-radius: 10px;
        overflow: hidden;
        h1 {
            font-size: 28px;
            margin: 0 0 5px;
        }
    }
    .shop-info-show {
        margin: 0 auto 10px;
        background: #f5f5f5;
        color: #000;
        padding: 10px 30px;
        overflow: hidden;
        .divide_page {
            min-height: 50px;
            min-width: 200px;
            text-align: center;
            margin: 0 auto;
        }
    }
</style>

