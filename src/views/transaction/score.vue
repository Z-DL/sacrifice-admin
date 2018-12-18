<template>
  <div class="score-box">
    <h1>评价管理</h1>
    <div class="score-total">
      <div class="good-total flex-box">
        <div style="width: 50%; text-align: left">
          <span class="title">卖家累计好评：</span>
          <span class="value">{{total.good_assess}}</span>
        </div>
        <div style="width: 50%; text-align: right">
          <span class="title">好评率：</span>
          <span class="value">{{total.good_assess_rate}}</span>
        </div>
      </div>
      <table class="score-table">
        <tr>
          <th></th>
          <th>最近1周</th>
          <th>最近1个月</th>
          <th>最近6个月</th>
          <th>总计</th>
        </tr>
        <tr>
          <td><i class="iconfont icon-haoping1"></i> 好评</td>
          <td>{{total.good_assess_week}}</td>
          <td>{{total.good_assess_month}}</td>
          <td>{{total.good_assess_year}}</td>
          <td>{{total.good_assess_total}}</td>
        </tr>
        <tr>
          <td><i class="iconfont icon-chaping"></i> 中评</td>
          <td>{{total.general_assess_week}}</td>
          <td>{{total.general_assess_month}}</td>
          <td>{{total.general_assess_year}}</td>
          <td>{{total.general_assess_total}}</td>
        </tr>
        <tr>
          <td><i class="iconfont icon-chaping"></i> 差评</td>
          <td>{{total.poor_assess_week}}</td>
          <td>{{total.poor_assess_month}}</td>
          <td>{{total.poor_assess_year}}</td>
          <td>{{total.poor_assess_total}}</td>
        </tr>
        <tr>
          <td>总计</td>
          <td>{{total.assess_total_week}}</td>
          <td>{{total.assess_total_month}}</td>
          <td>{{total.assess_total_year}}</td>
          <td>{{total.assess_total}}</td>
        </tr>
      </table>
    </div>
    <div class="score-info">
      <h1>来自买家的评价</h1>
      <el-table
        :data="scoreData"
        style="width: 100%" element-loading-text="拼命加载中" v-loading.body="listLoading">
        <el-table-column
          prop="assess_content">
        </el-table-column>
        <el-table-column
          prop="nick_name"
          label="评价人"
          width="180">
        </el-table-column>
        <el-table-column
          prop="order_id"
          label="订单编号"
          width="200">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { getScore } from '@/api/score'
export default{
  data () {
    return {
      scoreData: [],
      listLoading: true,
      total: {}
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getScore().then(response => {
        console.log(response)
        this.scoreData = response.data.assess_list
        this.total.assess_total = response.data.assess_total
        this.total.good_assess_rate = response.data.good_assess_rate
        this.total.general_assess_month = response.data.general_assess_month
        this.total.general_assess_total = response.data.general_assess_total
        this.total.general_assess_week = response.data.general_assess_week
        this.total.general_assess_year = response.data.general_assess_year
        this.total.good_assess_month = response.data.good_assess_month
        this.total.good_assess_total = response.data.good_assess_total
        this.total.good_assess_week = response.data.good_assess_week
        this.total.good_assess_year = response.data.good_assess_year
        this.total.poor_assess_month = response.data.poor_assess_month
        this.total.poor_assess_total = response.data.poor_assess_total
        this.total.poor_assess_week = response.data.poor_assess_week
        this.total.poor_assess_year = response.data.poor_assess_year
        this.total.assess_total_week = response.data.assess_total_week
        this.total.assess_total_year = response.data.assess_total_year
        this.total.assess_total_month = response.data.assess_total_month
        this.total.good_assess = response.data.good_assess
        this.listLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  $font-color: #066dbf;
  .score-box{
    font-size: 14px;
    padding: 15px 30px 25px 15px;
    h1{
      font-size: 14px;
      background-color: #066dbf;
      width: 120px;
      font-weight: 100;
      border-radius: 4px;
      padding: 5px 0px;
      text-align: center;
      color: white;
    }
    .score-total{
      margin-top: 5px;
      width: 70%;
      .good-total{
        width: 100%;
        .value{
          color: $font-color;
        }
      }
    }
    .score-table{
      width: 100%;
      border-collapse:collapse;
      margin-top: 10px;
      margin-bottom: 16px;
      background-color: white;
      td, th{
        border: 1px solid #999999;
        text-align: center;
        padding: 8px 0;
      }
      td{
        color: $font-color;
      }
      tr td:first-child{
        color: black;
      }
    }
  }
</style>
