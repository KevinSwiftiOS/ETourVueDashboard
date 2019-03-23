<template>
  <el-container class="bg-common">
    <!-- <el-header class="vertical top left">
    </el-header> -->
    <el-main>
      <el-card>
        <div class="horizontal left top padding10 text-main">
          <span
            class="noshrink"
            style="margin-top:4px"
          >商圈:</span>
          <choose-list
            class="margin-left-10"
            :values="businessCirle"
            :select="selectBusiness" 
            v-on:on-select-change="onSelectChange"
          />
          <!-- select表示当前列表所选，values表示列表里所有的值 -->
          <!-- v-on 事件监听，监听 on-select-change 事件，该事件由choose-list组件发出，当一个值被选中时发出，比如说 选择 商圈 千岛湖十字街  -->
        </div>

        <div class="horizontal left top padding10 text-main">
          <span
            class="noshrink"
            style="margin-top:4px"
          >菜系:</span>
          <choose-list
            class="margin-left-10"
            :values="shopCookStyles"
            :select="selectCookStyle"
            v-on:on-select-change="onCookStyleChange"
          />
        </div>
      </el-card>
      <div
        class="sl-list"
      >
        <!-- v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)" -->
        <!-- 店铺组件 -->
        <shop-row
          v-for="item in shopList"
          :key="item"
          :item="item"
        />

<!-- http://element-cn.eleme.io/#/zh-CN/component/pagination -->
        <el-pagination
          background
          :current-page.sync="page.page"
          :page-size="page.pageSize"
          :total="page.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total,prev, pager, next"
        >
        </el-pagination>

      </div>
    </el-main>
  </el-container>
</template>
<style lang="less" scoped>
.sl-list {
  margin-top: 20px;
}
</style>
<script>
import { site_list, shop_cook_styles } from '../base/dict.js'
import chooseList from '../components/chooseList'
import shopRow from '../components/shop/shop-row'
import http from '../request/index.js'

export default {
  data() { //data里定义的值在模版里可以直接通过名字来访问, 模版里用到的必须在这里定义
    return {
      loading: true,
      businessCirle: site_list,
      shopCookStyles: shop_cook_styles,
      selectBusiness: '全部',
      selectCookStyle: '全部',
      shopList: [],
      page: {
        page: 0,
        pageSize: 20,
        total: 0,
        next: 1
      }
    }
  },
  mounted() {
    this.loadData(this.page.page, this.selectCookStyle, this.selectBusiness)
  },
  methods: {

    loadData: async function (page, type, site) { 
      const asyncPromise = new Promise((resolve) => {
        setTimeout(() => {
          resolve(1);
        // reject('出错了');
        }, 1000);
      });

      asyncPromise
      .then(value => {
        console.log(value);

      })
      .catch(error => {
        console.log(error);
      })

      this.loading = true;
      this.shopList = []; // 设置为空数组来清空数据，因为所选的条件变更了

      try {
        const params = { page, type, site }; // page,type,site作为参数传递到params里
        const result = await http.restaurantList(params); 
        // const { page: pageData, data } = result
        const pageData = result.page;
        const data = result.data;
        this.shopList = data
        this.page = pageData  // 表示当前数据是多少页的，总共有多少页
        this.loading = false;
        console.log('- - - - - - rhjlog result', result)
      } catch (error) {
        console.log('- - - - - - rhjlog error', error)
        this.loading = false;
      }
    },
    onSelectChange(value) {
      this.selectBusiness = value
      this.page = {
        page: 0,
        pageSize: 20,
        total: 0,
        next: 1
      }
      this.loadData(0, this.selectCookStyle, this.selectBusiness) //更新数据
    },
    onCookStyleChange(value) {
      this.selectCookStyle = value
      this.page = {
        page: 0,
        pageSize: 20,
        total: 0,
        next: 1
      }
      this.loadData(0, this.selectCookStyle, this.selectBusiness)
    },
    handleSizeChange(value) {
      console.log('- - - - - - rhjlog handleSizeChange', value)
    },
    handleCurrentChange(value) {
      console.log('- - - - - - rhjlog handleCurrentChange', value, this.page)
      this.loadData(value, this.selectCookStyle, this.selectBusiness)
    }
  },
  components: { // 用到的组件需要在这里进行定义
    'choose-list': chooseList,
    'shop-row': shopRow
  }
}
</script>


