<template>
    <div class="">
        <el-row :gutter="20" type="flex" justify="space-between" class="top-1">
            <el-col class="inneritem" :span="24" >
               <h1>千岛湖全部酒店</h1>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="top-8">
           <el-col :span="4" v-for="obj in rankList" style="text-align: center;">
               <el-button plain @click="changeHotelRank(obj.name, obj.latterAttr)">
                    <div class="item">
                        <div class="title">{{obj.name}}</div>
                        <div class="amount">{{obj.latterAttr}}</div>
                    </div>
                </el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { set_session_storage, get_session_storage } from "../../base/sessionStorage";

    export default {
        name: "RankShow",
        props: {
            data: {
                type: Array,
                default: () => []
            }
        },
        data(){
            return{
                rankList:[],
            }
        },
        methods: {
            changeHotelRank: function(hotelrate){
                var hotel_rank = get_session_storage('curr_hotel_rank') // 存储的酒店等级，避免多次点击
                if(hotel_rank != hotelrate){
                    set_session_storage('curr_hotel_rank', hotelrate);
                    this.$emit('changeFunc');
                }
            }
        },
        watch: {
            data: function () {
                this.rankList = this.data;
            }
        }
    }


</script>

<style lang="scss" scoped>
    .top-1 {
        font-weight: 500;
        font-size: 15px;
        line-height: 1;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        margin: 0px auto 10px;
        .inneritem {
            padding: 5px;
            border-radius: 6px;
            margin: 10px 0;
            color: white;
            text-align: center;
        }
    }
    .top-8 {
        .item {
            width: 120px;
            padding: 5px;
            background: #fff;
            border-radius: 6px;
            margin: 10px 0;
            .title {
                font-size: 16px;
                margin-bottom: 10px;
                font-family: 华文行楷;
            }
            .amount {
                font-size: 32px;
                margin-bottom: 10px;
                color: #f44336;
            }
        }
    }

</style>