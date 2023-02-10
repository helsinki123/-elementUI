<template>
    <div id="app">
      <p>{{ "Fri Feb 10 2023 12:30:17 GMT+0800 (中国标准时间)" | formatDate }}</p>
      <Table :table-columns="columns" :table-data="tableData" :pages="{ query, total }" v-loading=loading
        @handlecurrentChange="handlecurrentChange">
        <template slot="extraHandleButtons">
          <div @click="handleClick">详情</div>
        </template>
      </Table>
  
      <div class="dialog-test">
        <el-button type="primary" @click="showDialog">弹窗</el-button>
  
        <base-dialog :isShow.sync="isShow" title="测试" width="703px" @handleSave="handleSave">
          <div>{{ testName }}</div>
        </base-dialog>
        <div class="testMap">
          <baidu-map class="zy-map-content" :scroll-wheel-zoom='true'
            :mapClick="false">
            <bm-geolocation :showAddressBar="true" :autoLocation="true" />
            <!-- <bml-marker-clusterer :averageCenter="true">
                  <bm-label
                      v-for="(item,index) in markers"
                      :key="index"
                      :content="formatterContent(item)"
                      @mouseover="mouseover(index)"
                      @mouseout="mouseout(index)"
                      @click="details(item, index)"
                      :position="{ lng: item.longitude, lat: item.latitude }"
                      :label-style="labelStyle[index]"
                  >
                  </bm-label>
              </bml-marker-clusterer> -->
          </baidu-map>
        </div>
      </div>
      <testChart ref="testChart"></testChart>
  
      <el-button @click="handleDebounce">测试lodash的防抖函数</el-button>
  
    </div>
  </template>
  
  <script>
  // import HelloWorld from './components/HelloWorld.vue'
  import Table from '@/components/my-table/index.vue'
  import { mapGetters } from 'vuex'
  import testChart from "@/views/fengzhuangchart/module"
  import { debounce } from "lodash";
  
  
  export default {
    name: 'testView',
    components: {
      // HelloWorld,
      Table,
      BaseDialog: () => import('@/components/base-dialog'), // 引入弹窗
      testChart
    },
    data() {
      return {
        columns: [
          {
            label: "状态", prop: "status", width: 100, formatter: (row) => {
              return ['签到', '提交', '完成'][row.status]
            }
          },
          { label: "设备注册代码", prop: "sbzcdm", minWidth: 'auto' },
          { label: "使用单位", prop: "sydwmc", minWidth: 'auto' },
          { label: "维保单位", prop: "wbdwmc", minWidth: 'auto' },
          { label: "设备使用地点", prop: "sbsydd", minWidth: 'auto' },
          { label: "单位内部编号", prop: "dwnbbh", minWidth: 'auto' },
          { label: "项目名称", prop: "projectName", width: 100 }
        ],
        tableData: [
          {
            status: 2,
            sbzcdm: '2016-05-03',
            sydwmc: '王小虎',
  
          },
          {
            status: 2,
            sbzcdm: '2016-05-03',
            sydwmc: '王小虎',
  
          },
          {
            status: 2,
            sbzcdm: '2016-05-03',
            sydwmc: '王小虎',
  
          },
          {
            status: 2,
            sbzcdm: '2016-05-03',
            sydwmc: '王小虎',
  
          },
          {
            status: 2,
            sbzcdm: '2016-05-03',
            sydwmc: '王小虎',
  
          },
          {
            status: 2,
            sbzcdm: '2016-05-03',
            sydwmc: '王小虎',
  
          },
          {
            status: 2,
            sbzcdm: '2016-05-03',
            sydwmc: '王小虎',
  
          },
        ],
        query: {
          pageNo: 1
        },
        total: 100,
        loading: false,
        isShow: false,
  
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
      ...mapGetters(['testName','formatDate'])
    },
    methods: {
      //lodash debounce写法 使用全局的this.$_无效
      handleDebounce: debounce(function () {
        console.log("111111");
      }, 2000),
      initcharts() {
        this.$refs['testChart'].initChart()
      },
      showDialog() {
        this.isShow = true
      },
  
      handleSave() {//点击保存按钮
        this.isShow = false
      },
  
      handleClick() {
        console.log("aaa");
      },
      async handlecurrentChange(val) {
        console.log("获取数据", val);
        try {
          this.loading = true;
          // const res = await this.$api[methods](this.query);
          // this.dataList = res[prop] || res;
          // this.total = res.total || this.dataList.length;
          await setTimeout(() => {
            this.loading = false;
          }, 2000)
        } catch (e) {
          console.log(e);
          //  if (!methods) console.error('Methods is empty！')
        } finally {
          //不会等待异步
          // this.loading = false;
        }
      },
    },
    mounted() {
      this.initcharts();
    },
    created() {
      // this.handleDebounce = this.$_.debounce(this.handleDebounce, 2000)
    }
  }
  </script>
  
  <style lang="scss" scoped>
   @import "@/assets/scss/default";
  // #app {
  //   font-family: Avenir, Helvetica, Arial, sans-serif;
  //   -webkit-font-smoothing: antialiased;
  //   -moz-osx-font-smoothing: grayscale;
  //   text-align: center;
  //   color: #2c3e50;
  //   margin-top: 60px;
  // }
  
  .zy-map-content {
    widows: 100%;
    height: 300px;
  }
  </style>
  