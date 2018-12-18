<template>
    <div class="complaints-container">
        <el-tabs v-model="complaintsType" @tab-click="tabHandle">
            <el-tab-pane label="全部投诉" name="all"></el-tab-pane>
            <el-tab-pane label="已处理" name="complete_solve"></el-tab-pane>
            <el-tab-pane label="未处理" name="waiting_solve"></el-tab-pane>
        </el-tabs>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="投诉内容：">
                                    <span>{{props.row.complaints_content}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="回复投诉：">
                                    <el-input type="textarea" :disabled="props.row.type == 1" :rows="2" :autosize="{ minRows: 2, maxRows: 2 }" placeholder="请输入内容" v-model="props.row.solve_result"></el-input>
                                </el-form-item>  
                            </el-col>
                        </el-row>
                    </el-form>
                    <div class="btn-box">
                        <el-button type="primary" v-if="props.row.type == 0" @click="saveContent(props.row.complaints_id,props.row.solve_result)">保存</el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="real_name" label="用户昵称"></el-table-column>
            <el-table-column prop="phone_num" label="联系方式"></el-table-column>
            <el-table-column prop="creat_time" label="投诉时间"></el-table-column>
            <el-table-column prop="complaints_type" label="处理状态"></el-table-column>
        </el-table>
        <div class="pagin-box">
            <el-pagination
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
import {getComplaints, saveReply} from '@/api/manage'
export default {
    data() {
        return {
            tableData: [],
            complaintsType: 'all',
            currentPage: 1,
            totalCount: 0
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            getComplaints(this.complaintsType, this.currentPage).then( res => {
                if(res.code === 200) {
                    this.tableData = res.data
                    this.totalCount = Number(res.count.complaints_count)
                }
            })
        },
        currentChange(val) {
            this.currentPage = val 
            this.getData()
        },
        tabHandle(tab) {
            this.complaintsType = tab.name 
            this.getData()
        },
        saveContent(id, content) {
            console.log(content)
            saveReply(id, content).then( res => {
                if(res.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '保存成功!'
                    });
                }
            })
        }
    }
}
</script>
<style lang="scss">
.complaints-container{
    padding: 20px;
    .btn-box{
        text-align: right;
    }
    .pagin-box{
        margin-top: 20px;
    }
}
</style>


