<template>
    <div class="order-list-container">
        <el-button type="primary">订单管理</el-button>
        <div class="form-box">
            <el-form ref="searchForm" :model="searchForm" label-width="100px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="商品名称：">
                            <el-input v-model="searchForm.productName" placeholder="请输入商品名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="订单编号：">
                            <el-input v-model="searchForm.orderCode" placeholder="请输入订单编号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item>
                    <el-button type="primary" @click="searchHandle">搜索订单</el-button>
                    <el-button @click="clearHandle">清空</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="order-list-box">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部" name="all"></el-tab-pane>
                <el-tab-pane label="等待买家付款" name="waiting_for_payment"></el-tab-pane>
                <el-tab-pane label="未祭祀完成" name="payment_completed"></el-tab-pane>
                <el-tab-pane label="已完成祭祀" name="finished"></el-tab-pane>
                <el-tab-pane label="买家已评价" name="assess"></el-tab-pane>
                <el-tab-pane label="已关闭的订单" name="cancel"></el-tab-pane>
            </el-tabs>
            <div class="tabs-container">
                <ul class="table-header flex-box">
                    <li style="flex:2;">商品名称</li>
                    <li>单价</li>
                    <li>数量</li>
                    <li>祭祀者</li>
                    <li>交易状态</li>
                    <li>实收款</li>
                    <li>操作</li>
                </ul>
                <div class="table-body-container">
                    <div class="table-content-box" v-for="(list,index) in orderList" :key="index">
                        <ul class="flex-box table-body-header">
                            <li>订单号：{{list.order_id}}</li>
                            <li>成交时间：{{list.implement_time}}</li>
                        </ul>
                        <ul class="flex-box table-body-content" v-for="(item,index) in list.commodity_list" :key="index">
                            <li class="pro-item">
                                <ul>
                                    <li>
                                        <div class="pro-box">
                                            <img style="width:100%;" :src="item.commodity_img_url" alt="产品图">
                                        </div>
                                    </li>
                                    <li>{{item.commodity_name}}</li>
                                </ul>
                            </li>
                            <li>{{item.discount_price}}</li>
                            <li>{{item.count}}</li>
                            <li class="ver-border" v-if="index==0">{{list.implement_name}}</li>
                            <li class="ver-border" v-else></li>
                            <li class="ver-border" v-if="index==0">{{list.type}}</li>
                            <li class="ver-border" v-else></li>
                            <li class="ver-border" v-if="index==0">{{list.total_price}}</li>
                            <li class="ver-border" v-else></li>
                            <li class="ver-border look" v-if="index==0" @click="goDetails(list.order_id)">查看详情</li>
                            <li class="ver-border look" v-else></li>
                        </ul>    
                    </div>
                </div>
                <div class="pagination-container">
                    <el-pagination
                        background
                        @current-change="currentChange"
                        :current-page="currentPage"
                        layout="prev, pager, next"
                        :total="totalCount">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {orderList} from '@/api/score'
export default {
    data() {
        return {
            searchForm: {
                productName: '',
                orderCode: ''
            },
            activeName: 'all',
            orderList: [],
            state: 'all',
            currentPage: 1,
            totalCount: 0,
            checkObj: {},
        }
    },
    created() {
        this.searchOrder()
    },
    methods: {
        searchOrder() {
            this.orderList = []
            orderList(this.searchForm.productName, this.searchForm.orderCode, this.state, this.currentPage).then((res)=>{
                if (res.code == 200) {
                    this.orderList = res.data
                    this.totalCount = Number(res.count.order_count)
                }
            })
        },
        searchHandle() {
            this.state = 'all'
            this.activeName = 'all'
            this.searchOrder()
        },
        clearHandle() {
            this.state = 'all'
            this.activeName = 'all'
            this.searchForm.productName = ''
            this.searchForm.orderCode = ''
            this.searchOrder()
        },
        handleClick(tab, event) {
            this.state = tab.name
            this.searchOrder()
        },
        goDetails(id) {
            this.$router.push({
                path: '/orderDetail',
                query: {
                    id: id
                }
            })
        },
        currentChange(val) {
            this.currentPage = val 
            this.searchOrder()
        }
    }
}
</script>
<style lang="scss" scoped>
.order-list-container{
    padding: 20px;
    font-size: 14px;
    .form-box{
        padding: 10px 10px 4px;
        background-color: #fff;
        margin-top: 10px;
    }
    .flex-box{
        display: flex;
        width: 100%;
        padding: 10px 0;
        margin: 0;
        li{
            flex: 1;
            list-style: none;
            text-align: center;
        }
        .ver-border{
            border-left: 1px solid #ccc;
        }
    }
    .table-body-content{
        padding: 0;
        align-items: center;
        li{
            padding: 10px 0;
        }
        .pro-item{
            flex: 2;
            padding: 0 4px;
            ul{
                padding: 8px 0 8px 8px;
                display: flex;
                align-items: center;
                li:first-child{
                    flex: 1;
                }
                li:last-child{
                    flex: 2;
                    text-align: left;
                }
            }
        }
        .look{
            color: #0D70C1;
            cursor: pointer;
        }
        .pro-box{
            width: 50px;
            height: 50px;
            border: 1px solid #ccc;
        }
    }
    .table-header{
        background-color: #F2F2F2;
        border: 1px solid #ccc;
    }
    .table-content-box{
        margin-top: 10px;
        background-color: #F2F2F2;
        border: 1px solid #ccc;
        .table-body-header{
            background-color: #D7ECFD;
            li{
                text-align: left;
                padding: 0 10px;
            }
        }
    }
    .pagination-container{
        padding: 6px;
        border: 1px solid #ccc;
        margin-top: 10px;
    }
}
</style>

