<template>
  <div>
    <div
      class="sl-loading"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <div class="common-breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>餐饮地图</el-breadcrumb-item>
          <el-breadcrumb-item>数据概况</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="sl-menu-container">
        <!-- <div class="sl-menu-single">
          <span>排行榜：</span>
        </div> -->
        <!-- <div class="sl-divided" /> -->
        <div class="sl-menu-single">
          <span style="flex-shrink: 0">热门商圈：</span>
          <el-radio-group
            v-on:change="onSiteIndexChange"
            v-model="siteIndex"
            class="sl-menu-item-container"
          >
            <el-radio
              v-for="site in sites"
              v-bind:key="site"
              :label="site"
            >{{
              site
              }}</el-radio>
          </el-radio-group>
        </div>
        <div class="sl-divided" />
        <div class="sl-menu-single">
          <span style="flex-shrink: 0">菜系分类：</span>
          <el-radio-group
            v-on:change="onCookStyleIndexChange"
            v-model="cookStyleIndex"
            class="sl-menu-item-container"
          >
            <el-radio
              v-for="cookStyle in cookStyles"
              v-bind:key="cookStyle"
              :label="cookStyle"
            >{{cookStyle}}</el-radio>
          </el-radio-group>
        </div>
      </div>

      <el-container class="sl-container">
        <!-- <ve-heatmap
          height='100%'
          v-if="!loading"
          class="sl-map"
          :data="chartData"
          :settings="chartSettings"
        />-->
        <ve-bmap
          class="sl-map"
          height="100%"
          :settings="chartSettings"
          :series="chartSeries"
          :tooltip="chartTooltip"
          :visual-map="visualMap"
        ></ve-bmap>
      </el-container>
    </div>
  </div>
</template>

<script>
import http from "../request/index.js";
import MapStyle from "../components/style.js";

export default {
  name: "",
  data() {
    this.chartSettings = {
      key: "orNnnqiVUSu2WabCPvrubZZbncg2Au4a",
      bmap: {
        center: [119.0515047947, 29.6101814477],
        zoom: 15,
        roam: true
      }
    };

    //这下面这段呢？
    //https://echarts.baidu.com/option.html#visualMap 看一下文档定义吧

    this.visualMap = [{
      type: 'continuous',
      min: 0,
      max: 5,
      show: true,
      splitNumber: 1,
      //散点的颜色
      color: ["#811313", "#f3f17b", "blue"],
      textStyle: {
        color: "#fff"
      }
    }];
    this.chartTooltip = {
      trigger: "item",
      formatter: params => {
        return `${params.name}: ${params.value[2]}`;
      }
    };
    return {
      loading: true,
      chartSeries: [
        {
          name: "数据",
          type: "scatter",
          coordinateSystem: "bmap",
          // data是一个数组,然后数组的格式是这样的，在下面shoplocation里定义的，[{name:xxx,value:[lng, lat, value]}],
          // symbolSize这个函数在data的每一项都会进行一次调用，计算当前项的圈的大小，传入value值，也就是【lng,lat,value],
          //所以要取value[2]来表示圈的大小,也可以返回一个固定值，比如10，这样圈的大小都是一致的
          data: [],
          // 下面这段表示什么？ sy 圈的大小
          // 是一个函数？
          // 返回值表示圈的大小
          // 之所以这样处理，因为数据分布差异太大，很对小的 数据是0 ，大部分都是0， 少数几个最大有8000的，
          //所以除一下，让他们分布不那么极端，不然你可以尝试直接返回val[2],这样圈不忍直视
          // val表示什么？  value: [lng, lat, value]
          symbolSize: function (val) {
            if(val[2] <= 10){
              return (val[2] / 1000 + 1) * 5
            }
            if (val[2] <= 100 && val[2] > 10) {
              return (val[2] / 1000 + 1) * 6;
            }
            if (val[2] > 100 && val[2] <= 500) {
              return (val[2] / 1000 + 1) * 7;
            }
            if (val[2] > 500 && val[2] <= 1000) {
              return (val[2] / 1000 + 1) * 8;
            }

            // 可以改颜色么 在这个函数里面，如果差异特别大的，5000以上直接把颜色改成红色
            // 参照这个： https://echarts.baidu.com/examples/editor.html?c=effectScatter-bmap 新建一个层，
          },
          label: {
            normal: {
              show: false,
              formatter: "{b}"
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
            //   color: "blue"
            }
          }
        },
        {
          name: "big",
          type: "effectScatter",
          coordinateSystem: "bmap",
          data: [],
          symbolSize: function (val) {
            if (val[2] > 1000 && val[2] < 3000) {
              return (val[2] / 1000 + 1) * 4;
            } else {
              return 20 + val[2] / 2500;
            }
          },
          showEffectOn: "render",
          rippleEffect: {
            brushType: "stroke"
          },
          hoverAnimation: true,
          label: {
            normal: {
              formatter: "{b}",
              position: "right",
              show: false
            }
          },
          itemStyle: {
            normal: {
            //   color: "red",
              shadowBlur: 10,
              shadowColor: "#333"
            }
          },
          zlevel: 1
        }
      ],
      cookStyles: ["全部"],
      sites: ["全部"],
      siteIndex: "全部",
      cookStyleIndex: "全部"
    };
  },
  mounted() {
    this.fullData = [];
    this.shoplocation();
    //初始化地图风格
    this.initMapStyle();
  },
  methods: {
    //加载地图风格
    initMapStyle: async function() {
      this.bmap.setMapStyle({styleJson:MapStyle});
    },
    dataFilter({ site, cookStyle }) {
      if (this.cookStyleIndex == "全部") {
        if (this.siteIndex == "全部") {
          return true;
        } else {
          return site == this.siteIndex;
        }
      } else {
        if (this.siteIndex == "全部") {
          return cookStyle == this.cookStyleIndex;
        } else {
          return cookStyle == this.cookStyleIndex && site == this.siteIndex;
        }
      }
    },
    onSiteIndexChange(index) {
      const data_0 = this.fullData[0].filter(this.dataFilter.bind(this));
      const data_1 = this.fullData[1].filter(this.dataFilter.bind(this));
      if (data_0.length == 0 && data_1.length == 0) {
        this.$notify.error({
          title: "出错啦",
          message: "当前选择无匹配饭店"
        });
      }
      this.chartSeries[0].data = data_0;
      this.chartSeries[1].data = data_1;
    },
    onCookStyleIndexChange(index) {
      const data_0 = this.fullData[0].filter(this.dataFilter.bind(this));
      const data_1 = this.fullData[1].filter(this.dataFilter.bind(this));
      if (data_0.length == 0 && data_1.length == 0) {
        this.$notify.error({
          title: "出错啦",
          message: "当前选择无匹配饭店"
        });
      }
      this.chartSeries[0].data = data_0;
      this.chartSeries[1].data = data_1;
    },
    shoplocation: async function () {
      // return;
      try {
        const result = await http.shoplocation();
        const res = result.data;
        const mapFunc = ({ lng, lat, value, name, cookStyle, site, score }) => {
          return { name, value: [lng, lat, value, score], cookStyle, site };
        };
        // this.fullData[0] = res.filter(({ score}))
        this.fullData[0] = res
          .filter(({ value }) => value != null && value <= 1000)
          .map(mapFunc);

        this.chartSeries[0].data = this.fullData[0];

        this.fullData[1] = res.filter(({ value }) => value > 1000).map(mapFunc);
        this.chartSeries[1].data = this.fullData[1];

        let cookStyleMap = {};
        let siteMap = {};
        res.forEach(({ site, cookStyle }, index) => {
          if (cookStyle != null) {
            cookStyle = cookStyle.split(" ")[0];
            cookStyleMap[cookStyle] = index;
          }
          if (site != null) {
            site = site.split(" ")[0];
            siteMap[site] = index;
          }
        });
        this.cookStyles = Object.keys(cookStyleMap);
        this.sites = Object.keys(siteMap);
        this.cookStyles.unshift("全部");
        this.sites.unshift("全部");

        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.$notify.error({
          title: "错误",
          message: JSON.stringify(error)
        });
        console.log("- - - - - - rhjlog error", error);
      }
    }
  }
};
</script>

<style>
.sl-loading {
  width: 100% !important;
  height: 100% !important;
}
.sl-container {
  height: 100%;
}
.sl-map {
  width: 100% !important;
  height: 100% !important;
}
.sl-menu-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
  color: "#303133";
}
.sl-menu-single {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.sl-menu-item-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  overflow-y: hidden;
}
.sl-divided {
  width: 100%;
  background-color: #dcdfe6;
  /* background-color: #f3f17b; */
  margin-top: 10px;
  margin-bottom: 10px;
  height: 1px;
}
</style>
