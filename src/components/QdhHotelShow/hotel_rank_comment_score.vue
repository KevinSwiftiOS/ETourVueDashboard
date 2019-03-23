<template>
    <div class="hotelCommentScore"  @mouseenter="mouseEnterComNu()"
         @mouseleave="mouseLeaveComNu()">
        <el-row class="CommentScore" v-for="(hotel,index) in hotelscorerank">
            <el-col>
                <span style="color: black">{{ index + 1 }}.</span>
                <span style="color: black">{{ hotel.name |  getHotelName}}</span>
                <span style="float: right; color: black; font-size: 13px">{{ hotel.latterAttr}}</span>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    //列表数组排名

    export default {
        name: "hotel_rank_comment_nu",
        props: {
            comscorelist: {
                type: Array,
            }
        },
        data(){
            return{
                hotelscorerank:[],
                title: '显示千岛湖酒店本年度评论数量排名'
            }
        },
        methods: {
        },
        filters: {
            getHotelName(val){
                if(val.length < 14){
                    return val;
                }else{
                    return val.substring(0, 14);
                }
            }
        },
        watch: {
            comscorelist: function () {
                this.hotelscorerank = this.comscorelist;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .hotelCommentScore {
        position: relative;
        margin-top: 2%;
        z-index: 50;
    }
    .CommentScore {
        line-height: 1;
        cursor: pointer;
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
        -webkit-appearance: none;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        -webkit-transition: .1s;
        transition: .1s;
        font-weight: 500;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
        &:first-child {
            background: #fff;
        }
    }
</style>