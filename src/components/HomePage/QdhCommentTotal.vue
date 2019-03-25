<template>
 <div>
     <h2>景区评论数:{{qdhSpotCommentTotalData.nowMonthCommentNumber}}</h2>
     <el-row :gutter="20">
         <el-col :span="8">
             <div class="grid-content bg-purple" style="text-align:center">同比:</div>
         </el-col>
         <el-col :span="8">
             {{qdhSpotCommentTotalData.huanChangeNumberPercent}}
             <i
                     v-if="qdhSpotCommentTotalData.isHuanNumberRise == '1'"
                     class="el-icon-thirdzhang"
             ></i>
             <i v-if="qdhSpotCommentTotalData.isHuanNumberRise == '0'" class="el-icon-thirddown"></i>
         </el-col>
         <el-col :span="8">
             <div class="grid-content bg-purple">

                 变化数:{{qdhSpotCommentTotalData.huanChangeNumber}}
             </div>

         </el-col>
     </el-row>
     <el-row :gutter="20">
         <el-col :span="8">
             <div class="grid-content bg-purple" style="text-align:center">环比:</div>
         </el-col>
         <el-col :span="8">
             <div class="grid-content bg-purple">
                 {{qdhSpotCommentTotalData.tongChangeNumberPercent}}
                 <i
                         v-if="qdhSpotCommentTotalData.isTongNumberRise == '1'"
                         class="el-icon-thirdzhang"
                 ></i>
                 <i v-if="qdhSpotCommentTotalData.isTongNumberRise == '0'" class="el-icon-thirddown"></i>

             </div>
         </el-col>
         <el-col :span="8">
             <div class="grid-content bg-purple">

                 变化数:{{qdhSpotCommentTotalData.tongChangeNumber}}
             </div>

         </el-col>
     </el-row>
     <h2>景区评分{{qdhSpotCommentTotalData.nowMonthCommentScore}}</h2>
     <el-row :gutter="20">
         <el-col :span="8">
             <div class="grid-content bg-purple" style="text-align:center">同比</div>
         </el-col>
         <el-col :span="8">
             {{qdhSpotCommentTotalData.huanChangeScorePercent}}
             <i v-if="qdhSpotCommentTotalData.isHuanScoreRise == '1'" class="el-icon-thirdzhang"></i>
             <i v-if="qdhSpotCommentTotalData.isHuanScoreRise == '0'" class="el-icon-thirddown"></i>
         </el-col>
         <el-col :span="8">
             <div class="grid-content bg-purple">

                 <div class="grid-content bg-purple">
                     变化分数:{{qdhSpotCommentTotalData.huanChangeScore}}</div>
             </div>
         </el-col>
     </el-row>
     <el-row :gutter="20">
         <el-col :span="8">
             <div class="grid-content bg-purple" style="text-align:center">环比</div>
         </el-col>
         <el-col :span="8">
             <div class="grid-content bg-purple">
                 {{qdhSpotCommentTotalData.tongChangeScorePercent}}
                 <i v-if="qdhSpotCommentTotalData.isTongScoreRise == '1'" class="el-icon-thirdzhang"></i>
                 <i v-if="qdhSpotCommentTotalData.isTongScoreRise == '0'" class="el-icon-thirddown"></i>
             </div>
         </el-col>
         <el-col :span="8">
             <div class="grid-content bg-purple">
                 变化分数:{{qdhSpotCommentTotalData.tongChangeScore}}
             </div>
         </el-col>
     </el-row>

 </div>
</template>

<script>
    import http from '../../request/index';
    import echarts from "echarts";
    export default {
        name: "QdhCommentTotal",
        data() {
            return {
                qdhSpotCommentTotalData: {}
            }
        },
        created() {
this.getQdhSpotCommentTotalData();

        },
        methods: {
            getQdhSpotCommentTotalData: async function () {

                const qdhSpotCommentTotalRes = await http.qdhSpotCommentTotal();
                if (qdhSpotCommentTotalRes.code === 0 && qdhSpotCommentTotalRes.data) {
                    this.qdhSpotCommentTotalData = qdhSpotCommentTotalRes.data;


                }
            }
        }
    }
</script>

<style scoped>

</style>