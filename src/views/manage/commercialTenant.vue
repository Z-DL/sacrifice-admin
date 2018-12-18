<template>
  <div class="sell-wrapper">
    <div class="sell-header">
      <el-form :inline="true" class="demo-form-inline">
        <el-row :gutter="20">
          <!--<el-col :xs="24" :sm="8">
            <div></div>
            &lt;!&ndash;<el-form-item label="宝贝名称">
              <el-input v-model="formInline.commodity_name" placeholder="请输入宝贝名称"></el-input>
            </el-form-item>&ndash;&gt;
          </el-col>-->
          <el-col :xs="24" :sm="20"  style="text-align: right;">
            <el-form-item label="商户所属省份">
              <el-select v-model="formInline.province_id" placeholder="请选择商户所属省份">
                <el-option label="所有" value="all"></el-option>
                <el-option v-for="item in category"
                           :label="item.province_name"
                           :key="item.province_id"
                           :value="item.province_id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="4" style="text-align: right;">
            <el-form-item>
              <el-button @click="onSubmit('clear')">清空</el-button>
              <el-button type="primary" @click="onSubmit('select')">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="sell-content">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column
          prop="ctual_name"
          label="商户名称">
          <template scope="scope">
            {{scope.row.store_name}}
          </template>
        </el-table-column>
        <el-table-column
          prop="enterprise_name"
          label="认证企业">
        </el-table-column>
        <el-table-column
          label="联系人"
          show-overflow-tooltip>
          <template scope="scope">
            {{scope.row.actual_name}}元
          </template>
        </el-table-column>
        <el-table-column
          prop="contact_number"
          label="联系电话"
        >
        </el-table-column>
        <el-table-column
          label="所在地"
        >
          <template scope="scope">{{ scope.row.store_province}}{{ scope.row.store_name}}</template>
        </el-table-column>
        <el-table-column
          label="订单成交数量"
          sortable
        >
          <template scope="scope">{{ scope.row.order_count }}</template>
        </el-table-column>
        <el-table-column
          label="差评数"
          sortable
        >
          <template scope="scope">{{ scope.row.poor_assess_total }}</template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template scope="scope">
            <el-button
              type="primary"
              v-if="scope.row.type == 2"
              @click="stopAgent(scope.row)"
              size="small">停用商户</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="sell-content-footer">
        <div class="footer-doing">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24">
              <div style="text-align: right">
                <el-pagination
                  background
                  @current-change="currentChange"
                  :current-page="currentPage"
                  layout="prev, pager, next"
                  :total="totalCount">
                </el-pagination>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {getCommercialTenant, getProvince, deleteP} from '@/api/manage'

  export default {
    data() {
      return {
        formInline: {
          province_id: 'all',
          commodity_name: ''
        },
        category: [],
        totalCount: 0,
        currentPage: 1,
        commodity_img_url: '',
        tableData: [],
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.fetchData()
      })
    },
    methods: {
      fetchData() {
        let self = this
        getProvince().then(res => {
          if (res.code == 200) {
            self.category = res.data
            self.fetchData1()
          }
        })
      },
      fetchData1(id, name) {
        getCommercialTenant({province:  this.formInline.province_id, page: this.currentPage}, ).then(res => {
          if (res.code == 200) {
            this.tableData = []
            for (let key of Object.keys(res.data)) {
              if (key !== 'total_count') {
                this.tableData.push(res.data[key])
              } else {
                this.totalCount = res.data['total_count']
              }
            }
          }
        })
      },
      cancelEdit() {
        this.form = {
          resource: '',
          commodity_name: '',
          commodity_img_url: '',
          base: 0,
          type: 2,
          commodity_num: 1,
          basis_price: '',
          discount: 10,
          delivery: false,
          commodity_id: '',
          commodity_describe: ''
        }
        this.dialogFormVisible = false
      },
      currentChange(val) {
        this.currentPage = val
        this.fetchData1()
      },
      stopAgent (row) {
        this.$confirm('此操作将停用您选中的商户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteP({store_id: row.store_id}).then(res => {
            if (res.code == 200) {
              this.fetchData1({province: this.formInline.province_id, page: this.currentPage})
              this.$message({
                type: 'success',
                message: '商户停用成功!'
              });
            } else {
              this.$message({
                type: 'error',
                message: '商户停用失败!'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消停用'
          });
        });
      },
      onSubmit(state) {
        if (state === 'clear') {
          this.formInline = {
            province_id: 'all',
            commodity_name: ''
          }
        }
        if (state === 'select') {
          this.fetchData1({province: this.formInline.province_id, page: this.currentPage})
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .sell-wrapper {
    padding: 20px;
    box-sizing: border-box;
    .sell-header {
      width: 100%;
      padding: 20px 20px 0;
      background: white;
      margin-bottom: 20px;
    }
    .demo-form-inline {
      text-align: right;
    }
    .sell-content {
      .sell-content-header {
        color: #99a9bf;
        font-size: 12px;
        line-height: 20px;
      }
      .show-baby {
        width: 80px;
        height: 80px;
        padding: 10px;
        overflow: hidden;
        box-sizing: border-box;
        img {
          height: 100%;
        }
      }
      .sell-content-footer {
        margin-top: 20px;
        padding: 20px 10px 0;
        background: white;
      }
    }
  }
</style>
