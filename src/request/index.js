import { GET, POST, DIRECT } from "../base/http";
import { async } from "q";

const http = {};
// 登录
http.login = async function(body) {
  return await DIRECT("/api/login", "post", body);
};
// /api/实现接口
http.myshowTest = async function(body) {
    return await POST("/api/myshow",body);
};//
// 个人信息接口
http.getuser = async function() {
  return await POST("/api/getuser", {});
};

// 主页景区
http.getspotlist = async function() {
  return await POST("/api/spotlist", {});
};
//景区详情
http.spotstate = async function(body) {
  return await POST("/api/spotstate", body);
};
// 景区图表详情
http.spotdetail = async function(body) {
  return await POST("/api/spotdetail", body);
};

// 景区数据统计 (千岛湖)
http.getscenicstate = async function() {
  return await POST("/api/qdhstate", {});
};
// 景区的景点列表 (千岛湖)
http.getJDList = async function() {
  return await POST("/api/qdhspotlist", {});
};
// 同时段不同景区评论数对比
http.spotcompared = async function(body) {
  return await POST("/api/spotcompared", body);
};

// 景区详情内部的景区之间比较(POST)
http.spotdetailcompared = async function(body) {
  return await POST("/api/spotdetailcompared", body);
};
// 餐饮位置
http.shoplocation = async function() {
  return await GET("/api/shoplocation");
};
//爬虫详情
http.spider = async function(body) {
  return await POST("/api/spider", body);
};
//爬虫详情
http.qdhspotstate = async function(body) {
  return await POST("/api/qdhspotstate", body);
};
//爬虫详情
http.qdhspotdetail = async function(body) {
  return await POST("/api/qdhspotdetail", body);
};
//爬虫详情
http.qdhspotdetailcompared = async function(body) {
  return await POST("/api/qdhspotdetailcompard", body);
};

//饭店统计
http.restaurantstatistic = async () => {
    return await GET("/api/restaurant/statistic");
};
// 同时段餐饮评论数对比
http.restaurantAreaComment = async params => {
    return await GET("/api/shoparea/comment", params);
};
// 饭店列表
http.restaurantList = async params => {
    return await GET("/api/restaurants", params);
};
// 同时段餐饮评分对比
http.restaurantAreaScore = async params => {
    return await GET("/api/shoparea/score", params);
};

http.keywordComments = async params =>{
    return await POST("/api/shoparea/comment/keywords",params);
};
/*酒店部分*/
// 千岛湖酒店统计页面
http.getHotelList = async function(body) {
    return await POST("/api/qdhhotellist", body);
};
// 获取酒店评分数量排名
http.getHotelComment_NumSort = async function(body) {
    return await POST("/api/qdhhotelcommentnumsort", body);
};
// 获取酒店评分数量排名
http.getHotelGradeSort = async function(body) {
    return await POST("/api/qdhhotelgradesort", body);
};
// 返回相同等级酒店的数量
http.getHotelRankNumShow = async function(body) {
    return await POST("/api/qdhhotelranknum", body);
};
// 获取酒店的详细信息，并包含分页功能
http.getHotelSummary = async function(body) {
    return await POST("/api/qdhhotelsummary",body);
}
// 获取当前酒店 本月的评分数量以及评分
http.getCurrHotelSortType = async function(body) {
    return await POST("/api/qdhcurrhotelsorttype", body);
}
// 获取当前酒店所属等级详细评分的平均数  雷达图展示
http.getHotelGradeDetailAvg = async function(body) {
    return await POST("/api/qdhhotelgradedetailavg",body);
}
// 获取当前酒店详细评分       // 雷达图展示
http.getHotelGradeDetail = async function(body) {
    return await POST("/api/qdhhotelgradedetail",body);
}
// 获取该酒店所有评论在不同平台的分布
http.getHotelTMapComNum = async function(body) {
    return await POST("/api/qdhhoteltmapnumshow",body);
}
// 获取当前最近几周的评分以及评论数量显示
http.hotelCurrTimeNum = async function(body) {
    return await POST("/api/qdhhotelnumlastest",body);
}
// 获取当前最近几周的评分
http.hotelCurrTimeScore = async function(body) {
    return await POST("/api/qdhhotelscorelastest",body);
}
// 获取当前最近几周的评分以及评论数量显示

http.hotelWebsiteNumCompared = async function(body) {
    return await POST("/api/qdhhotelwebcompared",body);
}
// 获取 出现出现较多
http.hotelComFeatureWord = async function(body) {
    return await POST("/api/qdhhotelcomfeatureword",body);
}
// 获取 出现出现较多
http.hotelComTagSum = async function(body) {
    return await POST("/api/qdhhotelcomtagsum",body);
}

http.hotelComTagClassSum = async function(body) {
    return await POST("/api/count",body);
}



//首页 所有景区与千岛湖景点top10排行
http.spotRank = async function () {
  return await POST('/api/homepage/spotrank'); 
}
//首页 千岛湖景区同环比数量比较
http.qdhSpotCommentTotal = async function () {
  return await POST('/api/homepage/qdhspotcommenttotal');
}
//首页 千岛湖酒店0-3，4-5评分
http.qdhHotelComScorePie = async function () {
  return await POST('/api/homepage/qdhhotelcomscorepie');
}
//首页 千岛湖酒店排名top10
http.qdHhotelScoreLimit = async function () {
  return await POST('/api/homepage/qdhhotelscorelimit');
}
// 首页 千岛湖酒店折线图
http.qdhspotComnumChange = async function () {
  return await POST('/api/homepage/qdhspotcomnumchange');
}
// 首页 千岛湖餐饮排行
http.restaurantRank = async function () {
    return await POST('/api/homepage/restaurantStatistical/rank');
}
// 首页 千岛湖餐饮饼图
http.restaurantPieChart = async function () {
  return await POST('/api/homepage/restaurantStatistical/piechart');
}
// 首页 千岛湖餐饮柱状图（差评图）
http.restaurantBadColum = async function () {
  return await POST('/api/homepage/restaurantStatistical/badColum');
}
http.hotelComScorePie = async function(body) { // homepage 酒店 饼图 评分分布图
    return await POST("/api/homepage/qdhhotelcomscorepie",body);
}

http.hotelSpotComNumChange = async function(body) { //homepage 千岛湖景点年度评论数量变化折线图
    return await POST("/api/homepage/qdhspotcomnumchange",body);
}
// /api/homepage/qdhhotelscorelimit

http.hotelSocreLimitTen = async function(body) {    // 千岛湖酒店 评分前十名
    return await POST("/api/homepage/qdhhotelscorelimit",body);
}

