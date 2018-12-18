<template>
  <div class="news-container">
        <div class="news-list-container">
            <el-table border tooltip-effect="dark" style="width: 100%" :data="tableData">
                <el-table-column prop="news_title" label="新闻标题"></el-table-column>
                <el-table-column prop="creat_time" label="发布时间"></el-table-column>
                <el-table-column label="操作" width="120">
                    <template scope="scope">
                        <el-button type="primary" @click="setTop(scope.row.news_id)" size="small" v-if="scope.row.type=='0'">置顶</el-button>
                        <el-button type="text" v-if="scope.row.type=='1'">已置顶</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="pagination"
                background
                @current-change="currentChange"
                :current-page="currentPage"
                layout="prev, pager, next"
                :total="totalCount">
            </el-pagination>
        </div>
  </div>
</template>
<script>
import {getNewsList, setNewsTop} from '@/api/manage'
export default {
    data() {
        return {
            tableData: [],
            currentPage: 1,
            totalCount: 1
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            getNewsList(this.currentPage).then( res => {
                if(res.code === 200) {
                    this.tableData = res.data
                    this.totalCount = Number(res.count.news_count)
                }
            })
        },
        currentChange(val) {
            this.currentPage = val 
            this.getData()
        },
        // 置顶
        setTop(id) {
            setNewsTop(id).then(res => {
                if(res.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '新闻置顶成功!'
                    });
                    this.getData()
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.news-container{
    padding: 20px;
    font-size: 14px;
    .news-list-container{
        margin-top: 20px;
        .pagination{
            margin-top: 20px;
        }
    }
}
</style>
