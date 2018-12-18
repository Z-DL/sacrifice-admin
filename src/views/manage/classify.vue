<template>
  <div class="sell-wrapper">
    <div class="sell-header">
      <el-form :inline="true" class="demo-form-inline">
        <el-row :gutter="20">
          <el-col :xs="24" :md="10" style="text-align: left;">
            <el-form-item label="">
              <el-checkbox v-model="choiceAll" @change="changeChoiceAll">全选</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="14" style="text-align: right;">
            <el-form-item>
              <el-button type="danger" @click="deleteCategoryM">批量删除</el-button>
              <el-button type="primary" @click="addCategory">增加商品分类</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="sell-content">
      <el-table
        ref="categoryTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="ctual_name"
          label="分类名称">
          <template scope="scope">
            {{scope.row.category_name}}
          </template>
        </el-table-column>
        <el-table-column
          prop="creat_time"
          label="创建时间">
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template scope="scope">
            <el-button
              type="primary"
              @click="stopAgent(scope.row)"
              size="small">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import {commodityCategoryList, addCommodityCategory, deleteCommodityCategory} from '@/api/manage'

  export default {
    data() {
      return {
        tableData: [],
        category_id: [],
        choiceAll: false,
        multipleSelection: [],
        model: {
          category_name: ''
        },
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.fetchData()
      })
    },
    methods: {
      fetchData(id, name) {
        commodityCategoryList().then(res => {
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
      addCategory() {
        this.$prompt('请输入分类名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w\W]+/,
          inputErrorMessage: '格式不正确'
        }).then(({value}) => {
          addCommodityCategory({category_name: value}).then(res => {
            if (res.code == 200) {
              this.fetchData()
              this.$message({
                type: 'success',
                message: '商户分类添加成功!'
              });
            } else {
              this.$message({
                type: 'error',
                message: '分类添加失败!'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      stopAgent(row) {
        this.$confirm('此操作将删除您选中的商品分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteCommodityCategory({category_id: [row.category_id]}).then(res => {
            if (res.code == 200) {
              this.fetchData()
              this.$message({
                type: 'success',
                message: '商品分类删除成功!'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      deleteCategoryM () {
        let arr = this.$refs.categoryTable.selection
        if (arr.length) {
          let list = arr.map((value) => {
            return value.category_id
          })
//          console.log(list)
          this.stopAgent(list)
        } else {
          this.$message({
            type: 'info',
            message: '请选择至少一项分类'
          });
        }
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.categoryTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.categoryTable.clearSelection();
        }
      },
      changeChoiceAll (val) {
        let bool = val.target.checked
        if (bool) {
          this.multipleSelection = this.tableData
          this.toggleSelection(this.tableData)
        } else {
          this.multipleSelection = []
          this.toggleSelection()
        }
      }
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
