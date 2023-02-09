<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Table :table-columns="columns" 
    :table-data="tableData" 
    :pages="{ query, total }" 
    v-loading=loading
    @handlecurrentChange="handlecurrentChange"
    >
      <template slot="extraHandleButtons">
        <div @click="handleClick">详情</div>
      </template>
    </Table>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Table from './components/my-table/index.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    Table
  },
  data() {
    return {
      columns: [
        { label: "状态", prop: "status", width: 100,formatter: (row) => {
            return ['签到', '提交', '完成'][row.status]
          } },
        { label: "设备注册代码", prop: "sbzcdm", minWidth: 'auto' },
        { label: "使用单位", prop: "sydwmc", minWidth: 'auto' },
        { label: "维保单位", prop: "wbdwmc", minWidth: 'auto' },
        { label: "设备使用地点", prop: "sbsydd", minWidth: 'auto' },
        { label: "单位内部编号", prop: "dwnbbh", minWidth: 'auto' },
        { label: "项目名称", prop: "projectName", width: 100 }
      ],
      tableData: [
        {
          status:2,
          sbzcdm: '2016-05-03',
          sydwmc: '王小虎',
          
        },
        {
          status:2,
          sbzcdm: '2016-05-03',
          sydwmc: '王小虎',
          
        },
        {
          status:2,
          sbzcdm: '2016-05-03',
          sydwmc: '王小虎',
          
        },
        {
          status:2,
          sbzcdm: '2016-05-03',
          sydwmc: '王小虎',
          
        },
        {
          status:2,
          sbzcdm: '2016-05-03',
          sydwmc: '王小虎',
          
        },
        {
          status:2,
          sbzcdm: '2016-05-03',
          sydwmc: '王小虎',
          
        },
        {
          status:2,
          sbzcdm: '2016-05-03',
          sydwmc: '王小虎',
          
        },
      ],
      query:{
        pageNo:1
      },
      total:100,
      loading:false,

    }

  },
  methods:{
    handleClick(){
      console.log("aaa");
    },
    async handlecurrentChange(val){
      console.log("获取数据",val);
      try {
                this.loading = true;
                // const res = await this.$api[methods](this.query);
                // this.dataList = res[prop] || res;
                // this.total = res.total || this.dataList.length;
                await setTimeout(()=>{
                  this.loading = false;
                },2000)
            }catch (e) {
              console.log(e);
              //  if (!methods) console.error('Methods is empty！')
            }finally {
              //不会等待异步
                // this.loading = false;
            }
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
