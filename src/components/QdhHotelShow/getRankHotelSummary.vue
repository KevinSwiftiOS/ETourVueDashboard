<template>
    <div class="top-8" >
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="3" v-for="obj in rankList">
                <el-button type="success" plain @click="changeHotelRank(obj.name)">
                        {{obj.name}}:&nbsp&nbsp&nbsp{{obj.latterAttr}}
                </el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import { set_session_storage, get_session_storage } from "../../base/sessionStorage";

    export default {
        name: "getRankHotelSummary",
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
                var hotel_rank = get_session_storage('curr_hotel_rank')  // 存储的酒店等级，避免多次点击

                if(!hotel_rank || hotel_rank != hotelrate){
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
    .top-8 {
        padding: 0;
        margin: 0;
    }
    .el-row {
        margin-bottom: 10px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .el-button {
        border-radius: 4px;
        min-height: 36px;
        text-align: center;
    }
    .row-bg {
        padding: 2px 0;
        background-color: #f9fafc;
    }

</style>