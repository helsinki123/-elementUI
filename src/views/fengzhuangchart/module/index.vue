<template>
    <div class="item">
        <div ref="chart" :style="{ width: '100%', height: 'calc(100% - 50px)' }"></div>
    </div>
</template>

<script>
export default {
    name: "zy-gz-b",
    data() {
        return {
            chart: null,
            dataList: [],
        }
    },

    computed: {
    },

    methods: {
        initChart() {
            if (this.chart !== null && this.chart !== "" && this.chart !== undefined) {
                this.chart.dispose();
            }

            this.chart = this.$echarts.init(this.$refs.chart);

            let legendData = [];
            let axxisData = [];
            let series = [];

            if(this.dataList.length > 0){
                this.dataList.map((item) => {
                    legendData.push(item.projectName);

                    let seriesData = [];
                    item.beanList.map((child) => {
                        axxisData.push(child.brandName1)
                        seriesData.push(child)
                        axxisData = [...new Set(axxisData)]
                    })

                    let newData = [];
                    axxisData.forEach((axis, aIndex) => {
                        for(let i of seriesData){
                            if(axis === i.brandName1){
                                //a.push(i.sumCount)
                                newData[aIndex] = i.sumCount
                            }else {
                                //a[aIndex] = 0
                            }
                        }
                    })

                    let obj = {
                        name: item.projectName,
                        type: 'bar',
                        barWidth: 20,
                        data: newData
                    }
                    series.push(obj)
                })
            }
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                color: [
                    '#C65C49',
                    '#04FEB8',
                    '#85D0EF',
                    '#ED8500',
                    '#238789',
                    '#516387',
                    '#D4A51A',
                    '#1271EC',
                    '#87E0AE'
                ],
                grid: {
                    left: 60,
                    right: 20,
                    bottom: 65,
                    top: 40
                },


                legend: {
                    data: legendData,
                    type: 'scroll',
                    icon: "circle",
                    top: 0,
                    itemGap: 15,
                    itemWidth: 8,
                    textStyle: {
                        color: "#fff",
                        left: 100
                    },
                    pageIconColor: '#ff781f',
                    pageTextStyle:{
                        color: '#999',
                    },
                    pageIconSize: 10,
                },
                xAxis: [
                    {
                        type: 'category',
                        axisLine: {
                            lineStyle: {
                                width: 0
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel:{
                            textStyle: {
                                color: "#fff"
                            }
                        },
                        data: axxisData
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel:{
                            textStyle:{
                                color: "#fff"
                            },
                            formatter: function (val) {
                                if(val < 1000){
                                    return `${val} (次)`
                                }else if(val >= 1000 && val <= 9999){
                                    return `${val / 1000} (千次)`
                                }else {
                                    return `${val / 10000} (万次)`
                                }
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                type: 'dashed',
                                color: '#28395b'
                            },
                            show: true
                        }
                    }
                ],
                dataZoom: [{
                    show: true,
                    height: 12,
                    xAxisIndex: [
                        0
                    ],
                    bottom:'6%',
                    start: 10,
                    end: 90,
                    handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                    handleSize: '110%',
                    handleStyle:{
                        color:"#d3dee5",

                    },
                    textStyle:{
                        color:"#000"},
                    borderColor:"#90979c"
                }, {
                    type: 'inside',
                    start: 0,
                    end: 100
                }],
                series: series
            };
            this.chart.setOption(option);
            window.addEventListener("resize", () => {
                this.chart.resize();
            });
        }
    }
}
</script>

<style scoped lang="scss">
.item {
    margin-top: 10px;
    height: 300px;
    background: linear-gradient(270deg, #14264e, #0b1c47);
    padding: 10px 15px;
}
</style>
