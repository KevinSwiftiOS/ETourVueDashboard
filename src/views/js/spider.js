import spiderSelect from "../../components/spider-select/index";
import blockBox from "../../components/block-box/index";
import http from "../../request/index.js";
import { set_cookies } from "../../base/cookies";

export default {
  components: {
    spiderSelect,
    blockBox
  },
  data() {
    return {
      list: [],
      loading: true,
      new_comment_time: ""
    };
  },
  //初始化的时候
  mounted() {
    this.spiderdetail();
  },
  methods: {
    spiderdetail: async function() {
      const res = await http.spider({
        comment_time: "",
        spot: "千岛湖",
        source: "景点",
        website: "携程"
      });
      this.loading = false;
      if (res.code === 0) {
        this.list = res.data.list;
        this.new_comment_time = res.comment_time;
      }
    },
    searchSpider: async function(e) {
      this.loading = true;
      const res = await http.spider({ ...e });
      this.loading = false;

      if (res.code === 0) this.list = res.data.list;
    },
    handle(row, column, cell, event) {},

    content_detail: function(index, row) {
      set_cookies("contentdetail", JSON.stringify(row));
      this.$router.push({ name: "spiderdetail" });
    }
  }
};
