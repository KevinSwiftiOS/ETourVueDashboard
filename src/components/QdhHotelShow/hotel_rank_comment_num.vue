<template>
    <div class="hotelCommentNum">
        <el-row class="commentNum" v-for="(hotel,index) in hotelnumrank">
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
            comnumlist: {
                type: Array,
            }
        },
        data(){
            return{
                hotelnumrank:[],
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
            comnumlist: function () {
                this.hotelnumrank = this.comnumlist;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .hotelCommentNum {
        position: relative;
        margin-top: 2%;
        z-index: 50;
    }
    .commentNum {
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