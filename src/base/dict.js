// 字典数据
// 平台
const websites = [
  "全部平台",
  "携程",
  "马蜂窝",
  "驴妈妈",
  "大众点评",
  "飞猪",
  "去哪儿",
  "途牛"
];
const total_websites = [
  "携程",
  "马蜂窝",
  "驴妈妈",
  "大众点评",
  "飞猪",
  "去哪儿",
  "途牛",
  "艺龙"
];

// 商圈
const businessCirle = [
  "全部",
  "千岛湖绿城度假村公寓",
  "千岛湖十字街",
  "千岛湖广场",
  "明珠花园",
  "开发区",
  "千岛湖风景区",
  "阳光路",
  "鱼街",
  "江滨公园",
  "湖滨公园",
  "千岛湖森林氧吧",
  "千岛湖大排档"
];

//全部商圈
const total_businessCirle = [
  "全部",
  "千岛湖绿城度假村公寓",
  "千岛湖十字街",
  "千岛湖广场",
  "明珠花园",
  "开发区",
  "千岛湖风景区",
  "阳光路",
  "鱼街",
  "江滨公园",
  "湖滨公园",
  "千岛湖森林氧吧"
];
// 菜系
const cuisine = [""];
// 景区
const spots = [
  "西湖",
  "西溪",
  "溪口",
  "乌镇",
  "西塘",
  "横店",
  "江郎山",
  "雁荡山",
  "普陀山",
  "南浔",
  "神仙居",
  "天台山",
  "根宫",
  "鲁迅",
  "南湖",
  "黄山",
  "三清山"
];

// 爬虫所有景区
const total_spots = [
  "千岛湖",
  "西湖",
  "西溪",
  "溪口",
  "神仙居",
  "西塘",
  "横店",
  "江郎山",
  "雁荡山",
  "普陀山",
  "南浔",
  "天台山",
  "根宫",
  "乌镇",
  "鲁迅",
  "南湖",
  "黄山",
  "三清山"
];
const total_areas = [
  "千岛湖西南湖区",
  "千岛湖东南湖区",
  "千岛湖西北湖区",
  "千岛湖东北湖区",
  "千岛湖天池岛"
];

const site_list = [
  "全部",
  "千岛湖十字街",
  "千岛湖大排档",
  "千岛湖广场",
  "千岛湖森林氧吧",
  "千岛湖绿城度假公寓",
  "千岛湖风景区",
  "开发区",
  "明珠花园",
  "江滨公园",
  "湖滨公园",
  "阳光路",
  "鱼街"
];

const shop_cook_styles = [
  "全部",
  "东北菜",
  "东南亚菜",
  "云贵菜",
  "其他美食",
  "农家菜",
  "创意菜",
  "北京菜",
  "家常菜",
  "小吃快餐",
  "小龙虾",
  "川菜",
  "日本菜",
  "本帮江浙菜",
  "水果生鲜",
  "江河湖海鲜",
  "湘菜",
  "火锅",
  "烧烤",
  "私房菜",
  "粤菜",
  "自助餐",
  "茶馆",
  "西北菜",
  "西餐",
  "酒吧",
  "面包甜点",
  "面馆",
  "韩国料理",
  "食品保健",
  "饮品店"
];
// var total_spots_dic = [
//   // 所有景区键值对
//   {
//     key: "千岛湖",
//     value: "杭州市千岛湖风景名胜区"
//   },
//   {
//     key: "西湖",
//     value: "杭州市西湖风景名胜区"
//   },
//   {
//     key: "西溪",
//     value: "杭州西溪湿地旅游区"
//   },
//   {
//     key: "溪口",
//     value: "宁波市奉化溪口-滕头旅游景区"
//   },
//   {
//     key: "乌镇",
//     value: "嘉兴市桐乡乌镇古镇旅游区"
//   },
//   {
//     key: "西塘",
//     value: "嘉兴市西塘古镇旅游景区"
//   },
//   {
//     key: "横店",
//     value: "金华市东阳横店影视城景区"
//   },
//   {
//     key: "江郎山",
//     value: "衢州市江郎山·廿八都景区"
//   },
//   {
//     key: "雁荡山",
//     value: "温州市雁荡山风景名胜区"
//   },
//   {
//     key: "普陀山",
//     value: "舟山市普陀山风景名胜区"
//   },
//   {
//     key: "南浔",
//     value: "湖州市南浔古镇景区"
//   },
//   {
//     key: "神仙居",
//     value: "台州市神仙居景区"
//   },
//   {
//     key: "天台山",
//     value: "台州市天台山景区"
//   },
//   {
//     key: "根宫",
//     value: "衢州市开化根宫佛国文化旅游景区"
//   },
//   {
//     key: "鲁迅",
//     value: "绍兴市鲁迅故里沈园景区"
//   },
//   {
//     key: "南湖",
//     value: "嘉兴市南湖旅游区"
//   },
//   {
//     key: "黄山",
//     value: "黄山旅游风景区"
//   },
//   {
//     key: "三清山",
//     value: "三清山旅游风景区"
//   }
// ];
var total_qdh_spots_dic = [
  // 所有景区键值对
  {
    key: "中心湖区",
    value: "中心湖"
  },
  {
    key: "梅峰揽胜",
    value: "梅峰"
  },
  {
    key: "龙山岛",
    value: "龙山岛"
  },
  {
    key: "月光岛",
    value: "月光岛"
  },
  {
    key: "渔乐岛",
    value: "渔乐岛"
  },
  {
    key: "东南湖区",
    value: "东南湖"
  },
  {
    key: "黄山尖",
    value: "黄山尖"
  },
  {
    key: "天池岛",
    value: "天池岛"
  },
  {
    key: "桂花岛",
    value: "桂花岛"
  },
  {
    key: "蜜山岛",
    value: "蜜山岛"
  },
  {
    key: "文渊狮城",
    value: "文渊狮城"
  },
  {
    key: "石林",
    value: "石林"
  },
  {
    key: "九咆界",
    value: "九咆界"
  },
  {
    key: "下姜村",
    value: "下姜"
  },
  {
    key: "森林氧吧",
    value: "森林氧吧"
  },
  {
    key: "龙川湾",
    value: "龙川"
  },
  {
    key: "芹川古村",
    value: "芹川"
  },
  {
    key: "千岛秘境",
    value: "秘境"
  },
  {
    key: "仙人谷",
    value: "仙人谷"
  },
  {
    key: "钓鱼岛",
    value: "钓鱼岛"
  },
  {
    key: "白云溪",
    value: "白云溪"
  }
];

const sources = ["景点", "酒店"];

export {
  websites,
  spots,
  total_spots,
  total_areas,
  businessCirle,
  cuisine,
  total_businessCirle,
  sources,
  total_websites,
  total_qdh_spots_dic,
  shop_cook_styles,
  site_list
};
