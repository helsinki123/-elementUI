<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
    }

  },
  watch: {
    isShow: {
      handler: function (val) {
        console.log("val", val);
      }
    }
  },
  computed: {
  },
  methods: {
  },
  mounted() {
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
 @import "@/assets/scss/default";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.zy-map-content {
  widows: 100%;
  height: 300px;
}
</style>
