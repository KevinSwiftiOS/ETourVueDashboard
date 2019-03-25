<template>
    <div>
    <el-table :data="list" style="width: 100%">
        <el-table-column prop="_id" label="景点" width="180"></el-table-column>
        <el-table-column prop="commentScore" label="评分" width="180"></el-table-column>
        <el-table-column prop="commentNumber" label="评论数"></el-table-column>
    </el-table>
    </div>
</template>

<script>
    export default {
        name: "SpotRank",
        props: {
            list: {
                type: Array
            },
        },
        data() {
            return {

            }
        },
        created(){


        },

        watch: {
            list: function(val) {

               this.spotlist = val;

            },

        }


    }
</script>

<style scoped>

</style>