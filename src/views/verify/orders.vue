<template>
  <div class="orders-box">
    <el-row style="margin-bottom: 15px">
      <el-col :span="2">
        <span style="display: block; width: 100%; text-align: right; padding-right: 5px; margin-top: 10px">订单编号</span>
      </el-col>
      <el-col :span="8"><el-input v-model="orderNo" placeholder="请输入订单编号" style="width: 98%"></el-input></el-col>
      <el-col :span="14"><el-button type="primary" @click="search">搜索</el-button></el-col>
    </el-row>
    <el-tabs v-model="activeTab" @tab-click="handleClick">
      <el-tab-pane label="全部订单" name="all">
        <el-table
          :data="orders"
          style="width: 100%">
          <el-table-column
            prop="order_id"
            label="订单编号"
            width="200">
          </el-table-column>
          <el-table-column
            prop="store_id"
            label="商户名称">
          </el-table-column>
          <el-table-column
            prop="total_price"
            label="订单总成交额">
          </el-table-column>
          <el-table-column
            prop="finish_time"
            label="订单完成时间"
            >
          </el-table-column>
          <el-table-column
            prop="actual_name"
            label="商户联系人姓名"
            >
          </el-table-column>
          <el-table-column
            prop="contact_number"
            label="联系电话"
            >
          </el-table-column>
          <el-table-column
            label="操作"
            >
            <template scope="scope">
              <el-button
                type="text"
                @click="seeDesc(scope.row)"
                size="small">查看详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top: 10px; text-align: center"
          background
          layout="prev, pager, next"
          :total="totalPage"
          @current-change="currentChange"
        >
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="已结款" name="have_money">
        <el-table
          :data="orders"
          style="width: 100%"
          >
          <el-table-column
            prop="order_id"
            label="订单编号"
            width="200">
          </el-table-column>
          <el-table-column
            prop="store_id"
            label="商户名称"
          >
          </el-table-column>
          <el-table-column
            prop="total_price"
            label="订单总成交额"
            >
          </el-table-column>
          <el-table-column
            prop="finish_time"
            label="订单完成时间"
            >
          </el-table-column>
          <el-table-column
            prop="actual_name"
            label="商户联系人姓名"
            >
          </el-table-column>
          <el-table-column
            prop="contact_number"
            label="联系电话"
            >
          </el-table-column>
          <el-table-column
            label="操作"
            >
            <template scope="scope">
              <el-button
                type="text"
                @click="seeDesc(scope.row)"
                size="small">查看详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top: 10px; text-align: center"
          background
          layout="prev, pager, next"
          :total="totalPage"
          @current-change="currentChange"
        >
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="未结款" name="not_money">
        <el-table
          :data="orders"
          style="width: 100%"
          >
          <el-table-column
            prop="order_id"  label="订单编号" width="200">
          </el-table-column>
          <el-table-column
            prop="store_id"
            label="商户名称"
            >
          </el-table-column>
          <el-table-column
            prop="total_price"
            label="订单总成交额"
            >
          </el-table-column>
          <el-table-column
            prop="finish_time"
            label="订单完成时间"
            >
          </el-table-column>
          <el-table-column
            prop="actual_name"
            label="商户联系人姓名"
            >
          </el-table-column>
          <el-table-column
            prop="contact_number"
            label="联系电话"
            >
          </el-table-column>
          <el-table-column
            label="操作"
            >
            <template scope="scope">
              <el-button
                type="text"
                @click="seeDesc(scope.row)"
                size="small">查看详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top: 10px; text-align: center"
          background
          layout="prev, pager, next"
          :total="totalPage"
          @current-change="currentChange"
        >
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="结款详情" :visible.sync="displayDesc" width="1000">
      <div class="payment-desc">
        <div class="title">
          <span class="status">结款状态：
            <span v-if="paymentDesc.pay_money_type == 0">未结款</span>
            <span v-if="paymentDesc.pay_money_type == 1">已结款</span>
          </span>
          <span class="time" v-if="paymentDesc.pay_money_time">结款时间：{{paymentDesc.pay_money_time}}</span>
        </div>
        <div class="payment-img flex-box" v-if="paymentDesc.pay_money_type == 1">
          <div style="padding-top: 5px;">打款凭证</div>
          <img :src="paymentDesc.pay_money_img_url"/>
        </div>
        <div class="btn" v-if="paymentDesc.pay_money_type == 0">
          <el-row>
            <el-col :span="3">
              <el-upload
              action="http://jisi.poolbear.cn/Agents/UploadFiles/upload_pay_money"
              :headers="headers"
              :data="uploadParams"
              :on-success="handleUploadSuccess"
              :on-error="handleUploadFailed"
              :before-upload="checkFileUpload">
              <el-button size="small" type="primary">上传凭证</el-button>
            </el-upload>
            </el-col>
            <el-col :span="21">
              <el-button type="success" size="small" @click="submitOrder">成交订单</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-dialog>

  </div>
</template>
<script type="text/ecmascript-6">
  import { getOrders, submitOrder } from '@/api/verify'
  import { getToken} from '@/utils/auth'
  export default{
    data () {
      return {
        activeTab: 'all',
        orderNo: '',
        orders: [],
        totalPage: 0,
        currPage: 1,
        displayDesc: false,
        paymentDesc: {
          pay_money_type: '',
          pay_money_time: '',
          pay_money_img_url: ''
        },
        uploadParams: {
          store_id: ''
        },
        headers: {
          'Access-Token': getToken()
        }
      }
    },
    created () {
      this.getOrders()
    },
    methods: {
      submitOrder () {
        if (!this.paymentDesc.pay_money_img_url) {
          this.$message({
            type: 'warning',
            message: '请上传打款凭证'
          })
          return
        }
        let params = {}
        params.order_id = this.paymentDesc.order_id
        params.pay_money_img_url = this.paymentDesc.pay_money_img_url
        submitOrder(params).then(res => {
          this.$message({
            type: 'success',
            message: '订单成交'
          })
          this.displayDesc = false
          this.getOrders()
        })
      },
      checkFileUpload (file) {
        console.log('before upload')
        console.log(file)
        if (!this.checkFileSize(file.size)) {
          this.$message({
            message: '文件大小不能超过5M',
            type: 'warning'
          });
        }
        let types = ['jpg', 'jpeg', 'bmp', 'png', 'gif']
        if (!this.checkFileType(file.name, types)) {
          this.$message({
            message: '文件格式不正确',
            type: 'warning'
          });
        }
        return this.checkFileSize(file.size) && this.checkFileType(file.name, types)
      },
      checkFileSize (size) {
        size = (size / 1000 / 1000).toFixed(2)
        if (size > 5) {
          return false
        }
        return true
      },
      checkFileType (name, types) {
        let fileName = name.split('.')
        let type = fileName[fileName.length - 1]
        if (types.indexOf(type) < 0) {
          return false
        }
        return true
      },
      handleUploadSuccess (res, file, fileList) {
        if (res.data.file.img_url)
          this.paymentDesc.pay_money_img_url = res.data.file.img_url
      },
      handleUploadFailed () {
        this.$message({
          type: 'error',
          message: '上传失败'
        })
      },
      handleClick (tab) {
        this.activeTab = tab.name
        this.getOrders()
      },
      seeDesc (row) {
        this.displayDesc = true
        this.paymentDesc = row
        this.uploadParams.store_id = row.store_id
      },
      search () {
        this.getOrders()
        this.activeTab = 'all'
      },
      currentChange (page) {
        this.currPage = page
        this.getOrders()
      },
      getOrders () {
        let params = this.getAllParams()
        getOrders(params).then(res => {
            this.orders = res.data
          this.totalPage = res.count.page_count
        })
      },
      getAllParams () {
        let params = {}
        if (!this.orderNo && this.orderNo !== 0) {
          params.order_id = 'none'
        } else {
          params.order_id = this.orderNo
        }
        params.page = this.currPage
        params.state = this.activeTab
        return params
      },
    }
  }
</script>
<style scoped lang="scss">
  $border: 1px solid #999999;
  .orders-box{
    padding: 15px;
    .payment-desc{
      .title{
        border-bottom: $border;
        padding-bottom: 5px;
        margin-bottom: 8px;
        .status{
          margin-right: 20px;
        }
      }
      .payment-img{
        width: 430px;
        height: 250px;
        margin-bottom: 8px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
