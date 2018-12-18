<template>
  <div class="dashboard-container">
    <div v-show="role === temporary" class="temporary-container">
      <div v-html="details.title"></div>
    </div>
    <div v-show="role === agents">
    <el-card class="box-card" style="margin-bottom: 20px">
      <div slot="header" class="clearfix">
        <span>应用摘要</span>
        <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
      </div>
      <div class="digest">
        <div class="item">
          <div class="item-in item1">
            <div class="title">
              出售中的商品
            </div>
            <div class="content">
              {{details.count1.saling_commodity}}
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item-in item2">
            <div class="title">
              成交订单总量
            </div>
            <div class="content">
              {{details.count1.finished_order}}
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item-in item3">
            <div class="title">
              支付金额
            </div>
            <div class="content">
              {{details.count1.total_price}}
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item-in item4">
            <div class="title">
              已得到的评价
            </div>
            <div class="content">
              {{details.count1.assess_count}}
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="box-card"  style="margin-bottom: 20px">
      <div slot="header" class="clearfix">
        <span>本周走势</span>
        <el-button style="float: right; padding: 3px 0" type="text">
          <el-date-picker
            v-model="startTime"
            size="mini"
            type="datetime"
            placeholder="选择开始日期时间">
          </el-date-picker> -
          <el-date-picker
            v-model="endTime"
            size="mini"
            type="datetime"
            placeholder="选择结束日期时间">
          </el-date-picker>
        </el-button>
      </div>
      <div class="trend">
        <el-form ref="form" :model="form" labelPosition="left" label-width="80px">
          <el-form-item label="" label-width="0">
            <el-radio-group v-model="form.role" size="small">
              <el-radio-button label="新增用户"></el-radio-button>
              <el-radio-button label="新增用户1" ></el-radio-button>
              <el-radio-button label="新增用户2"></el-radio-button>
              <el-radio-button label="新增用户3"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="指标">
            <el-radio-group v-model="form.index">
              <el-radio label="全部"></el-radio>
              <el-radio label="企业"></el-radio>
              <el-radio label="个人"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <line-chart :chart-data="lineChartData"></line-chart>
      </div>
    </el-card>
    <el-card class="box-card"  style="margin-bottom: 20px">
      <div slot="header" class="clearfix">
        <span>代办事项</span>
        <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
      </div>
      <div class="event">
        <div class="list">
          <div class="item">
            <div class="item-in item1">
              <div class="title">
                待上架商品
              </div>
              <div class="content">
                {{details.count2.warehouse_commodity}}
              </div>
            </div>
          </div>
          <div class="item">
            <div class="item-in item2">
              <div class="title">
                待付款金额
              </div>
              <div class="content">
                {{details.count2.waiting_for_payment_price}}
              </div>
            </div>
          </div>
          <div class="item">
            <div class="item-in item3">
              <div class="title">
                待处理差评
              </div>
              <div class="content">
                {{details.count2.pool_assess}}
              </div>
            </div>
          </div>
          <div class="item">
            <div class="item-in item4">
              <div class="title">
                待祭祀订单
              </div>
              <div class="content">
                {{details.count2.no_finished_order}}
              </div>
            </div>
          </div>
          <div class="item">
            <div class="item-in item4">
              <div class="title">
                待结款订单
              </div>
              <div class="content">
                {{details.count2.waiting_pay_money}}
              </div>
            </div>
          </div>
        </div>
        <!--<div class="list">
          <div class="item">
            <div class="item-in item1">
              <div class="title">
                待上架商品
              </div>
              <div class="content">
                1000
              </div>
            </div>
          </div>
          <div class="item">
            <div class="item-in item2">
              <div class="title">
                待付款金额
              </div>
              <div class="content">
                1000
              </div>
            </div>
          </div>
          <div class="item">
            <div class="item-in item3">
              <div class="title">
                待处理差评
              </div>
              <div class="content">
                1000
              </div>
            </div>
          </div>
          <div class="item">
            <div class="item-in item4">
              <div class="title">
                待祭祀订单
              </div>
              <div class="content">
                1000
              </div>
            </div>
          </div>
          <div class="item">
            <div class="item-in item4">
              <div class="title">
                待结款订单
              </div>
              <div class="content">
                1000
              </div>
            </div>
          </div>
        </div>-->
      </div>
    </el-card>
    </div>
    <div v-show="role === terminal">
    <el-card class="box-card" style="margin-bottom: 20px">
      <div class="digest">
        <div class="item">
          <div class="item-in item1">
            <div class="title">
              总用户数
            </div>
            <div class="content">
              {{details.count1.saling_commodity}}
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item-in item2">
            <div class="title">
              总交易额
            </div>
            <div class="content">
              {{details.count1.finished_order}}
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item-in item3">
            <div class="title">
              代理商数量
            </div>
            <div class="content">
              {{details.count1.total_price}}人
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item-in item4">
            <div class="title">
              总投诉数
            </div>
            <div class="content">
              {{details.count1.assess_count}}次
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="box-card"  style="margin-bottom: 20px">
      <div slot="header" class="clearfix">
        <span>本周走势</span>
        <el-button style="float: right; padding: 3px 0" type="text">
          <el-date-picker
            v-model="startTime"
            size="mini"
            type="datetime"
            placeholder="选择开始日期时间">
          </el-date-picker> -
          <el-date-picker
            v-model="endTime"
            size="mini"
            type="datetime"
            placeholder="选择结束日期时间">
          </el-date-picker>
        </el-button>
      </div>
      <div class="trend">
        <el-form ref="form" :model="form" labelPosition="left" label-width="80px">
          <el-form-item label="" label-width="0">
            <el-radio-group v-model="form.role" size="small">
              <el-radio-button label="新增用户"></el-radio-button>
              <el-radio-button label="新增用户1" ></el-radio-button>
              <el-radio-button label="新增用户2"></el-radio-button>
              <el-radio-button label="新增用户3"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="指标">
            <el-radio-group v-model="form.index">
              <el-radio label="全部"></el-radio>
              <el-radio label="企业"></el-radio>
              <el-radio label="个人"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <line-chart :chart-data="lineChartData"></line-chart>
      </div>
    </el-card>
    <el-card class="box-card"  style="margin-bottom: 20px">
      <div slot="header" class="clearfix">
        <span>其他信息</span>
        <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
      </div>
      <div class="event">
        <div class="list">
          <div class="item">
            <div class="item-in item1">
              <div class="title">
                客服人数
              </div>
              <div class="content">
                {{details.count2.warehouse_commodity}}
              </div>
            </div>
          </div>
          <div class="item">
            <div class="item-in item2">
              <div class="title">
                未结算金额
              </div>
              <div class="content">
                {{details.count2.waiting_for_payment_price}}
              </div>
            </div>
          </div>
          <div class="item">
            <div class="item-in item3">
              <div class="title">
                新闻数量
              </div>
              <div class="content">
                {{details.count2.pool_assess}}
              </div>
            </div>
          </div>
        </div>
        <!--<div class="list">
          <div class="item">
            <div class="item-in item1">
              <div class="title">
                待上架商品
              </div>
              <div class="content">
                1000
              </div>
            </div>
          </div>
          <div class="item">
            <div class="item-in item2">
              <div class="title">
                待付款金额
              </div>
              <div class="content">
                1000
              </div>
            </div>
          </div>
          <div class="item">
            <div class="item-in item3">
              <div class="title">
                待处理差评
              </div>
              <div class="content">
                1000
              </div>
            </div>
          </div>
          <div class="item">
            <div class="item-in item4">
              <div class="title">
                待祭祀订单
              </div>
              <div class="content">
                1000
              </div>
            </div>
          </div>
          <div class="item">
            <div class="item-in item4">
              <div class="title">
                待结款订单
              </div>
              <div class="content">
                1000
              </div>
            </div>
          </div>
        </div>-->
      </div>
    </el-card>
    </div>
  </div>
</template>

<script>
  import LineChart from '../../components/Charts/lineChart'
  import {getHomeTemporary, getHomeAgents} from '@/api/index'
  import {temporary, agents, terminal} from '@/utils/const'
  import {getRoles} from '@/utils/auth'
  import {mapGetters} from 'vuex'

  export default {
    name: 'dashboard',
    data () {
      return {
        startTime: '',
        endTime: '',
        form: {
          role: '',
          index: '',
        },
        temporary: temporary,
        agents: agents,
        terminal: terminal,
        details: {
          title: '',
          count1: {
            assess_count: "1", // 已得到的评价
            finished_order: "3", // 成交订单总量
            saling_commodity: "7", // 出售中的商品
            total_price: "2832.00", // 支付金额
          },
          count2: {
            warehouse_commodity: '', // 待上架的商品
            waiting_for_payment_price: '', // 待付款金额
            pool_assess: '', // 待处理差评
            no_finished_order: '', // 待祭祀订单
            waiting_pay_money: '', // 待结款订单
          }
        },
        lineChartData: {
          expectedData: [100, 120, 161, 134, 105, 160, 165],
          actualData: [120, 82, 91, 154, 162, 140, 145]
        }
      }
    },
    components: {
      LineChart
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if (vm.role === vm.temporary) {
          vm.getHomeTemporary()
        }
        if (vm.role === vm.agents) {
          vm.getHomeAgents()
        }
      })
    },
    methods: {
      getHomeTemporary () {
        getHomeTemporary().then(res => {
          if (res.code === 200) {
            this.details.title = res.data
          }
        }).catch(err => {
          this.$message({
            message: err,
            type: 'error'
          });
        })
      },
      getHomeAgents () {
        getHomeAgents().then(res => {
          if (res.code === 200) {
            this.details.count1 = res.data[0]
            this.details.count2 = res.data[1]
          }
        }).catch(err => {
          this.$message({
            message: err,
            type: 'error'
          });
        })
      },
    },
    computed: {
      ...mapGetters([
        'name',
        'roles'
      ]),
      role: function () {
        let roles = JSON.parse(getRoles())
        return roles[0]
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-container {
    padding: 20px;
    .digest {
      display: flex;
      height: 100px;
      .item {
        flex: 1;
        padding: 20px;
        padding-top: 0;
        height: 150px;
        box-sizing: border-box;
        .item-in {

          height: 80%;
          width: 80%;
          margin: auto auto;
          border-radius: 5px;
          padding: 15px;
          box-sizing: border-box;
          text-align: center;
          color: white;
          .title {
            border-bottom: 1px dashed white;
            line-height: 30px;
          }
          .content {
            line-height: 40px;
            font-size: 20px;
          }

        }
        .item1 {
          background: #59abeb;
        }
        .item2 {
          background: #56cf88;
        }
        .item3 {
          background: #59d4e7;
        }
        .item4 {
          background: #fe7c7c;
        }
      }
    }
    .event {
      .list {
        display: flex;
        height: 130px;
      }
      .item {
        flex: 1;
        padding: 20px;
        padding-top: 0;
        height: 130px;
        box-sizing: border-box;
        .item-in {
          height: 80%;
          width: 80%;
          margin: auto auto;
          border-radius: 5px;
          box-sizing: border-box;
          text-align: center;
          color: white;
          .title {
            border-bottom: 1px solid white;
            border-radius: 5px 5px 0 0;
            line-height: 40px;
            background: #019bf3;
          }
          .content {
            line-height: 40px;
            font-size: 20px;
            color: #1f2d3d;
            border: 1px solid #019bf3;
            border-top: none;
            border-radius: 0 0 5px 5px ;
          }

        }
      }
    }
    .temporary-container{
      text-align: center;
      line-height: 30px;
      padding-top: 50px;
    }
  }
</style>
