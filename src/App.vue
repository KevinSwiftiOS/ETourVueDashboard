<template>
  <div id="app"><router-view /></div>
</template>
<script>
import http from "./request/index.js";

export default {
  data() {
    return {
      user: {}
    };
  },
  created() {
    this.getuser();
  },
  methods: {

    getuser: async function() {
      if(this.$route.query.token != undefined) {
        localStorage.setItem("token", this.$route.query.token);
      }
      const token = localStorage.getItem("token");
      console.log(token)
      if (token) {
        const res = await http.getuser();
        if (res.code === 0) {
          this.user = res.data;
        }
      }
    }
  }
};
</script>

<style lang="scss">
#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
}
</style>
