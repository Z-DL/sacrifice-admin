<template>
    <div class="order-container">
        <el-button type="primary" @click="goList">返回订单列表</el-button>
        <div class="order-box">
            <div class="border-box">
                <h2 class="title">买家信息</h2>
                <p>祭祀者姓名：{{details.implement_name}}</p>
                <p>联系电话：{{details.phone_num}}</p>
            </div>
            <div class="border-box">
                <h2 class="title">订单信息</h2>
                <div class="form-box">
                    <p class="form-item">订单编号：{{details.order_id}}</p>
                    <p class="form-item">付款时间：{{details.pay_time}}</p>
                </div>
                <div class="form-box">
                    <p class="form-item">创建时间：{{details.creat_time}}</p>
                    <p class="form-item">成交时间：{{details.finish_time}}</p>
                </div>
            </div>
            <div class="buyer-message">
                <h2 class="title">买家留言</h2>
                <el-input disabled type="textarea" v-model="leaveMsg"></el-input>
            </div>
            <div class="table-box">
                <el-table
                    :data="details.commodity_list"
                    style="width: 100%">
                    <el-table-column
                        prop="commodity_name"
                        label="商品"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="discount_price"
                        label="商品属性"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="discount_price"
                        label="状态">
                    </el-table-column>
                    <el-table-column
                        prop="discount_price"
                        label="单价">
                    </el-table-column>
                    <el-table-column
                        prop="count"
                        label="数量">
                    </el-table-column>
                    <el-table-column
                        prop="price_spread"
                        label="优惠">
                    </el-table-column>
                    <el-table-column
                        prop="single_total_price"
                        label="商品总价">
                    </el-table-column>
                </el-table>
                <div class="money">实收款：<span>{{details.total_price}}</span>元</div>
            </div>
        </div>
    </div>
</template>
<script>
import {getOrderDetail} from '@/api/score'
export default {
    data() {
        return {
            details: '',
            leaveMsg: ''
        }
    },
    created() {
        this.getDetail()
    },
    methods: {
        getDetail() {
            let orderId = this.$route.query.id
            getOrderDetail(orderId).then((response)=>{
                console.log('******order detail*******')
                this.details = response.data
                this.leaveMsg = response.data.leave_message
            })
        },
        goList() {
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="scss" scoped>
.order-container {
    padding: 20px;
    font-size: 14px;
    .order-box{
        background: #fff;
        padding: 20px;
        border: 1px solid #247EC6;
        margin-top: 20px;
    }
    .border-box{
        padding-bottom: 10px;
        border-bottom: 1px solid #ccc;
    }
    .table-box{
        margin-top: 20px;
        .money{
            text-align: right;
            margin-top: 10px;
            font-size: 16px;
            span{
                color: #247EC6;
            }
        }
    }
    .title{
        font-size: 16px;
        font-weight: normal;
        line-height: 20px;
    }
    p{
        text-indent: 2em;
        margin: 0;
        line-height: 30px;
    }
    .form-box{
        display: flex;
    }
    .form-item{
        flex: 1;
    }
}
</style>

