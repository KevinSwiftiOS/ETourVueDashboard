<template>
  <span>{{ num }}</span>
</template>
<script>
export default {
  name: "random-number",
  props: {
    data: {
      default: 0,
      type: Number
    }
  },
  data() {
    return {
      num: 0,
      option: {}
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.data < 100) {
        this.num = this.data;
        return;
      } else {
        let i = 1;
        const t = setInterval(() => {
          this.num =
            parseInt(this.data / 10) * i + parseInt(Math.random() * 10);
          i++;
          if (i === 10) {
            clearInterval(t);
            this.num = this.data;
          }
        }, 100);
      }
    }
  },
  watch: {
    data() {
      this.init();
    }
  }
};
</script>
