<template>
  <div
    class="map-search"
    :class="{ active: activeInput }"
    v-click-outside="onClickOutside"
  >
    <!-- 搜索框 -->
    <input
      ref="search"
      type="text"
      v-model="searchTxt"
      :placeholder="placeholder"
      @input="doSearch()"
      @focus="onfocus()"
    />
    <!-- 清空按钮 -->
    <span class="del-icon" v-if="activeInput" @click="resetSearch()">
      <i class="icon-backspace"></i>
    </span>
    <span class="del-icon" v-else> <i class="icon-search"></i> </span>
    <!-- 搜索结果 -->
    <div class="search-results" v-show="activeInput">
      <div class="empty" v-if="result.length === 0">没有结果...</div>
      <div
        class="item"
        v-for="(item, index) in result"
        :key="index"
        @click="doSelect(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "map-search",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      result: [],
      searchTxt: "",
      activeInput: false
    };
  },
  methods: {
    // 获取焦点
    onfocus() {
      this.activeInput = true;
      if (this.searchTxt === "") {
        this.result = this.data;
      }
    },
    // 外部点击
    onClickOutside(e, el) {
      this.$refs.search.blur();
      this.activeInput = false;
      if (this.searchTxt === "") {
        this.result = [];
      }
    },
    // 选择
    doSelect(data) {
      this.searchTxt = data.name;
      this.doSearch();
      this.activeInput = false;
      this.$emit("select", data);
    },
    // 过滤
    doSearch() {
      if (this.searchTxt !== "") {
        this.result = this.data.filter(
          i => i.name.indexOf(this.searchTxt) > -1
        );
      } else {
        this.result = this.data;
      }
    },
    // 重置
    resetSearch() {
      this.searchTxt = "";
      this.$emit("select", { id: "" });
      this.$refs.search.focus();
    }
  }
};
</script>
<style lang="scss">
.map-search {
  position: absolute;
  top: 150px;
  left: 40px;
  background: rgba(255, 255, 255, 0.98);
  width: 280px;
  color: #ddd;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 -1px 0px rgba(0, 0, 0, 0.02);
  transition: left 0.3s, width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 4px;
  overflow: hidden;
  &.active {
    width: 360px;
    left: 10px;
  }
  input {
    outline: none;
    width: 100%;
    height: 48px;
    font-size: 16px;
    background: transparent;
    border: none;
    padding: 0 48px 0 20px;
  }
  .del-icon {
    position: absolute;
    right: 0;
    width: 48px;
    height: 48px;
    top: 0;
    font-size: 20px;
    text-align: center;
    line-height: 48px;
    cursor: pointer;
    &:hover {
      color: #333;
    }
  }
  .search-results {
    background: #fff;
    max-height: 320px;
    overflow-y: auto;
    .empty,
    .item {
      position: relative;
      color: #8c8c8c;
      font-size: 14px;
      min-height: 24px;
      line-height: 24px;
      padding: 7px 20px 8px 20px;
      border-top: 1px solid #e6e6e6;
      cursor: pointer;
      text-align: left;
      &:hover {
        background-color: rgba(0, 0, 0, 0.03);
      }
    }
  }
}
</style>
