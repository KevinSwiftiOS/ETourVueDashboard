<!-- 百度地图 -->
<template>
  <div id="map"></div>
</template>
<script>
import MapStyle from "./style.js";
import Citys from "./area.js";
//所有景区列表
import spot_infos from "../base/spotInf";
//千岛湖景区景点列表
import qdh_spot_infos from "../base/qdhSpotInfo";
import { set_cookies } from "../base/cookies";
import { get_color, get_radius } from "../base/getColor";
import { get_score_rank } from "../base/getRank";
import { set_session_storage } from "../base/sessionStorage";

export default {
  name: "home-map",
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    data: {
      type: Array,
      default: () => []
    },
    city: {
      // 默认中心城市
      type: String,
      default: "千岛湖"
    },
    zoom: {
      type: Number,
      default: 9
    },
    border: {
      type: Boolean,
      default: true
    },
    isHome: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      mapLabelStyle: {
        border: "none"
      },
      blueImgUrl: require("../assets/icons/blueIcon.png"),
      redImgUrl: require("../assets/icons/redIcon.png"),
      map: null
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    infoHTML(obj) {
      const that = this;
      //   const path = obj._id === "千岛湖" ? "scenic" : "scenicother"; // 1 千岛湖
      const origin = window.location.origin;
      const name = encodeURIComponent(obj.name);
      let link = `
      <a  style="cursor: pointer" class="detail-link"><span id = "detail">详情</span><i class="icon-navigate_next"></i></a>`;
      // 景点弹出窗口 移除详情链接

      const html = `
      <div class="map-label">
        <div class="header">
            <span class="title">${obj.name}</span>

            <span class="comment">
              <span class="score"><i>${obj.commentScore.toFixed(
                2
              )}</i>/5.0</span>
              <span class="number">${obj.commentNumber}条点评</span>
            </span>
        </div>
        <div class="mid">
          <div class="address"><i class="icon-edit_location"></i> ${
            obj.address
          }</div>
          ${link}
        </div>
      </div>
      `;
      return html;
    },

    // 继承API的BMap.Overlay
    initMap: async function() {
      //初始化MAP
      this.map = new BMap.Map("map", { minZoom: 8, maxZoom: 15 });
      this.map.enableScrollWheelZoom(true);
      this.map.setMapStyle({ styleJson: MapStyle });
      this.map.centerAndZoom(this.city, this.zoom);
      if (this.border) this.getBoundary(); // 边界绘制
    },
    // 加载点
    loadmarkers() {
      const map = this.map;
      let list = [];
     // 清除之前的marker
      const overlays = map.getOverlays();
      list = overlays.filter(i => i.point);
      for (let i = 0; i < list.length; i++) {
        map.removeOverlay(list[i]);
      }
     // 筛选marker
      let data = [];
      if (this.value === "") {
        data = this.data;
      } else {
        data = this.data.filter(i => i.id === this.value);
      }

      //判断加载千岛湖景区景点还是所有景区
      var infos = [];
      if (this.isHome) infos = spot_infos;
      else infos = qdh_spot_infos;
      // 添加marker到地图
      var minCommentNumber = data[data.length - 1].commentNumber;

      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (item._id != null) {
          var point = new BMap.Point(infos[item._id].lng, infos[item._id].lat);
          item.name = infos[item._id].name;
          item.address = infos[item._id].address;
          item.lng = infos[item._id].lng;
          item.lat = infos[item._id].lat;
          // 定义自定义覆盖物的构造函数
          var that = this;
          var SquareOverlay = function(center, length, color, title) {
            this._center = center;
            this._length = length;
            this._color = color;
            this._title = title;
          };
          SquareOverlay.prototype = new BMap.Overlay();
          SquareOverlay.prototype.initialize = function(map) {
            // 保存map对象实例
            this._map = map;
            // 创建div元素，作为自定义覆盖物的容器
            var div = document.createElement("div");
            var p = document.createElement("p");

            var text = document.createTextNode(this._title);
            div.style.position = "absolute";
            // 可以根据参数设置元素外观
            div.style.width = this._length + "px";
            div.style.height = this._length + "px";

            div.style.fontSize = "0.8em";
            div.style.fontFamily = "Microsoft YaHei";
            div.style.borderRadius = "50%";
            div.style.textAlign = "center";
            div.style.lineHeight = this._length + "px";
            div.style.backgroundColor = this._color;

            div.appendChild(p.appendChild(text));

            // 将div添加到覆盖物容器中
            map.getPanes().markerPane.appendChild(div);
            // 保存div实例
            this._div = div;
            // 需要将div元素作为方法的返回值，当调用该覆盖物的show、
            // hide方法，或者对覆盖物进行移除时，API都将操作此元素。
            return div;
          };

          // 实现绘制方法
          SquareOverlay.prototype.draw = function() {
            // 根据地理坐标转换为像素坐标，并设置给容器
            var position = this._map.pointToOverlayPixel(this._center);
            this._div.style.left = position.x - this._length / 5 + "px";
            this._div.style.top = position.y - this._length / 5 + "px";
          };

          var width = 55 + get_radius(item.commentNumber, this.isHome);

          var title;
          if (this.isHome) title = item._id;
          else title = item.name;
          var mySquare = new SquareOverlay(
            point,
            width,
            get_color(item.commentScore, this.isHome),
            title
          );
          map.addOverlay(mySquare);

          this.addSquareListener(item, mySquare);
        }
      }
    },
    addSquareListener(data, square) {
      const that = this;
      square._div.addEventListener("mouseover", function(e) {
        that.openInfo(data, e, that);
      });
    },
    // 添加监听
    addClickHandler(data, marker) {
      const that = this;
      //鼠标在上面时显示
      marker.addEventListener("mouseover", function(e) {
        that.openInfo(data, e, that);
      });
    },
    // 信息窗口
    openInfo(data, e, that) {
      var that = this;

      var point = new BMap.Point(data.lng, data.lat);
      var infoWindow = new BMap.InfoWindow(this.infoHTML(data));

      if (this.isHome) {
        infoWindow.addEventListener("open", function(e) {
          document
            .getElementById("detail")
            .addEventListener("click", function() {


              // that.$router.push({path: '/ScenicInfo?scenicName=' + data._id});
            });
        });
      } else {
        infoWindow.addEventListener("open", function(e) {
          document
            .getElementById("detail")
            .addEventListener("click", function() {
              set_session_storage("qdh_curr_spot", data._id);
              that.$router.push({ name: "QdhScenicInfo" });
            });
        });
      }
      this.map.openInfoWindow(infoWindow, point);
    },
    // 边界
    getBoundary() {
      const map = this.map;
      Citys.forEach(el => {
        var bdary = new BMap.Boundary();
        bdary.get(el.name, function(rs) {
          var count = rs.boundaries.length;
          if (count === 0) {
            return;
          }
          var pointArray = [];
          for (var i = 0; i < count; i++) {
            var ply = new BMap.Polygon(rs.boundaries[i], {
              strokeWeight: 2,
              strokeColor: "orange",
              fillColor: "rgba(225,225,225,0)"
            }); //建立多边形覆盖物
            map.addOverlay(ply); //添加覆盖物
            pointArray = pointArray.concat(ply.getPath());
          }
        });
      });
    }
  },
  watch: {
    data(val) {
      this.loadmarkers();
    },
    value(newVal) {
      this.loadmarkers();
    }
  }
};
</script>
<style lang="scss">
#map {
  width: 100%;
  height: 100%;
  position: relative;
}

.map-label {
  font-family: Roboto, "Avenir", Helvetica, Arial, sans-serif;
  background: #fff;
  position: relative;
  padding: 20px 0 0;
  width: 380px;
  z-index: 1;
  &:after {
    position: absolute;
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-width: 10px 10px 10px 0;
    border-style: solid;
    border-color: transparent #fff transparent transparent;
    position: absolute;
    top: 25px;
    left: -10px;
  }
  .header {
    margin-bottom: 10px;
    overflow: hidden;
    .title {
      display: block;
      float: left;
      font-size: 16px;
      color: #000;
      word-break: break-all;
      white-space: normal;
    }
    .comment {
      font-size: 16px;
      float: right;
      text-align: right;
      i {
        color: orange;
        font-style: normal;
      }
      > span {
        display: block;
      }
      .score {
        font-size: 16px;
        margin-bottom: 5px;
      }
      .number {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.7);
      }
    }
  }
  .mid {
    padding: 10px 0;
    .address {
      color: #333;
      font-size: 14px;
    }
  }
  .detail-link {
    float: right;
    text-decoration: none;
    color: #409eff;
    font-size: 14px;
  }
}
</style>
