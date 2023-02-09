<template>
    <div class="table">
        <div class="table-main">
            <el-table ref="table"
        :data="tableData"
        v-loading="loading"
        >
            <!-- 表格项 -->
            <template v-for="(item,index) in tableColumns">
                <el-table-column 
                v-bind="item"
                :key="index"
                >
                    <template slot-scope="scope">
                        <slot>
                            <template v-if="item.formatter">
                                <span v-html="item.formatter(scope.row)" />
                            </template>
                            <template v-else>
                               <span>{{scope.row[item.prop]}}</span> 
                            </template>
                        </slot>
                    </template>
                </el-table-column>
            </template>
            <!-- 操作 -->
            <template>
                <el-table-column>
                    <div>
                        <slot
                        name="extraHandleButtons"
                        ></slot>
                    </div>
                </el-table-column>
            </template>

        </el-table>
        </div>

        <div class="table-pagination">
        <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="currentChange"
      :page-sizes="[10, 15, 20, 30, 50]"
                :page-size="pages.query.pageSize"
                :current-page="pages.query.pageNo"
                :total="pages.total">
         </el-pagination>
    </div>
    </div>

    
</template>

<script>
export default {
    components: {},
    name: '',
    props: {
        tableColumns: {
            type: Array,
            default() {
                return []
            }
        },
        tableData: {
            type: Array,
            default() {
                return []
            }
        },
        pages: Object,

        
      loading: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
        };
    },
    watch: {},
    computed: {},
    methods: {
        currentChange(val){
            this.pages.query.pageNo = val;//设置分页器的current-page属性
            this.$emit('handlecurrentChange', val)
        },
        handleSizeChange(val){
            this.pages.query.pageSize = val;//设置分页器的page-size属性
            this.$emit('handlecurrentChange', val)
        }
    },
    created() { },
    mounted() { }
};
</script>
<style lang="scss" scoped>
@import "./index";
</style>