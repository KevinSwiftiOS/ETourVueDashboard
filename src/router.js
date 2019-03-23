import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index"; // index
import Login from "./views/Login"; // 登陆

import Home from "./views/Home"; // 首页
import ScenicInfo from "./views/ScenicInfo"; //景区详情
import QdhScenic from "./views/QdhScenic"; //千岛湖动态
// import ShopCompare from "./views/ShopCompare"; //千岛湖美食比拼
import ShopList from "./views/ShopList";
import ShopCompare from "./views/ShopCompare"; //千岛湖美食比拼
import ShopLocation from "./views/ShopLocation"; // 千岛湖美食地图
import Spider from "./views/Spider"; //爬虫信息列表
import QdhScenicInfo from "./views/QdhScenic/QdhScenicInfo"; //千岛湖景点详情
import QdhDynamic from "./views/QdhScenic/QdhDynamic"; //千岛湖景区比较
import SpiderDetail from "./views/Spider/SpiderDetail"; //爬虫详情页面
import MyShow from "./views/myShow";
import HotelSummary from "./views/HotelSummary";
import QdhHotelMultiSummary from './views/QdhHotelSummaryDetail/QdhHotelMultiSummary';
import QdhHotelSingleShow from './views/QdhHotelSummaryDetail/QdhHotelSingleShow';  // 每家酒店详情展示

Vue.use(Router);

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/login", //登录页面
            name: "Login",
            component: Login
        },
        {
            path: "/",
            name: "Index",
            component: Index, //首页4个导航栏
            redirect: "/home",
            children: [
                {
                    path: "/home", //主页面 18个景区
                    name: "Home",
                    component: Home
                },
                {
                    path: "/scenicinfo", //景区详情页面
                    name: "ScenicInfo",
                    component: ScenicInfo
                },
                {
                    path: "/qdhscenic",
                    name: "QdhScenic", //千岛湖动态
                    component: QdhScenic,
                    children: [
                        {
                            path: "info",
                            name: "QdhScenicInfo", //千岛湖景点页面
                            component: QdhScenicInfo
                        },

                        {
                            path: "dynamic",
                            name: "QdhDynamic", //千岛湖与其余景区比较
                            component: QdhDynamic
                        }
                    ]
                },
                {
                    path: "/shop_location",
                    name: "ShopLocation", //千岛湖美食地图概况
                    component: ShopLocation,
                    children: []
                },
                {
                    path: "/shopList",
                    name: "ShopList", //千岛湖美食比拼
                    component: ShopList,
                    children: []
                },
                {
                    path: "/shopCompare",
                    name: "ShopCompare",
                    component: ShopCompare,
                    children:[]
                },
                {
                    path: "/hotelsummary",  //酒店详情
                    name: "HotelSummary",
                    component: HotelSummary,
                },
                {
                    path: "hotelmultishow",  //酒店概括
                    name: "QdhHotelMultiSummary",
                    component: QdhHotelMultiSummary
                },
                {
                    path: "hotelsingleshow",  //具体酒店信息展示
                    name: "QdhHotelSingleShow",
                    component: QdhHotelSingleShow
                },
                {
                    path: "/spiders", //爬虫列表页面
                    name: "Spider",
                    component: Spider,
                    children: [
                        {
                            path: "detail", //爬虫详情页面
                            name: "SpiderDetail",
                            component: SpiderDetail
                        }
                    ]
                },
                {
                    path: "/myshow",  //我的展示界面
                    name: "MyShow",
                    component: MyShow
                }
            ]
        },
        {path: "*", redirect: {name: "home"}} // 重定向
    ]
});

router.beforeEach((to, from, next) => {
    const tk = localStorage.getItem("token");
    if (!tk && to.path !== "/login") {
        next("/login");
    } else {
        next();
    }
});

export default router;
