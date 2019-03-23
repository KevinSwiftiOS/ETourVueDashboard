<template>
  <div>
    <div class="common-breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-left">
        <el-breadcrumb-item style="cursor:pointer">
          <span @click="back()" style="cursor: pointer">
            <i class="el-icon-back"> </i> 爬虫详情</span
          ></el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="main-box">
      <el-row :gutter="20">
        <el-col> 评论用户:{{ data.comment_user_name }} </el-col>
        <el-col> 评论平台：{{ data.data_website }} </el-col>
        <el-col> 评论景区：{{ data.data_region }} </el-col>
        <el-col> 评论店铺：{{ data.shop_name }} </el-col>
        <el-col> 评论日期：{{ data.comment_time }} </el-col>
        <el-col> 评论爬取时间：{{ data.crawl_time }} </el-col>
      </el-row>
      评论内容：{{ data.comment_content }}
      <el-row>
        <el-col :md="3"> 评论分数：{{ data.comment_score }}分 </el-col>
        <el-col :md="4">
          <el-rate
            v-model="data.comment_score"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
          >
          </el-rate>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { get_session_storage } from "../../base/sessionStorage";

export default {
  data() {
    return {
      data: {}
    };
  },
  created() {
    this.init();
  },
  methods: {
    init: function() {
      var temp = JSON.parse(get_session_storage("contentdetail"));
      this.data = temp;
    },
    back: function() {
      this.$router.push({ name: "Spider" });
    }
  }
};
</script>

<style scoped></style>
