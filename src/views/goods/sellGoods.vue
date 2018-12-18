<template>
  <div class="sell-wrapper">
    <div class="sell-header">
      <el-form :inline="true" class="demo-form-inline">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="8">
            <el-form-item label="宝贝名称">
              <el-input v-model="formInline.commodity_name" placeholder="请输入宝贝名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8">
            <el-form-item label="宝贝类目">
              <el-select v-model="formInline.category_id" placeholder="请选择宝贝类目">
                <el-option label="所有" value="all"></el-option>
                <el-option v-for="item in category"
                           :label="item.category_name"
                           :key="item.category_id"
                           :value="item.category_id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8">
            <el-form-item>
              <el-button @click="onSubmit('clear')">清空</el-button>
              <el-button type="primary" @click="onSubmit('select')">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </div>
    <div class="sell-content">
      <div class="sell-content-header">
        共有出售中的商品{{totalCount}}条记录
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="img"
          label="宝贝展示">
          <template scope="scope">
            <div class="show-baby">
              <img :src="scope.row.commodity_img_url" alt="">
            </div>

          </template>
        </el-table-column>
        <el-table-column
          prop="commodity_name"
          width="300"
          label="宝贝名称">
        </el-table-column>
        <el-table-column
          sortable
          label="价格"
          show-overflow-tooltip>
          <template scope="scope">
            {{scope.row.basis_price}}元
          </template>
        </el-table-column>
        <el-table-column
          prop="num"
          sortable
          label="库存"
        >
        </el-table-column>
        <el-table-column
          label="总销量"
        >
          <template scope="scope">{{ scope.row.sales_volume }}{{ scope.row.style }}</template>
        </el-table-column>
        <el-table-column
          label="发布日期"
          sortable
          width="120">
          <template scope="scope">{{ scope.row.release_time }}</template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template scope="scope">
            <el-button type="primary" @click="editBaby(scope.row)" size="small">编辑宝贝</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="编辑宝贝" :fullscreen="true" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="商品标题">
                <el-input v-model="form.commodity_name" placeholder="最多输入30字"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="商品描述">
                <el-input type="textarea" v-model="form.commodity_describe" placeholder="最多输入150字"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :sm="12" :xs="24">
              <el-form-item label="商品价格">
                <el-input placeholder="请输入内容" v-model="form.basis_price">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="商品数量">
                <el-input-number v-model="form.commodity_num"
                                 @change="handleChange"
                                 :min="1"
                                 :max="10"
                                 label="描述文字"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :sm="12" :xs="12">
              <el-form-item label="是否折扣">
                <el-switch v-model="form.delivery"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="12" v-if="form.delivery">
              <el-input placeholder="请输入折扣" v-model="form.discount">
                <template slot="append">折</template>
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="商品图片">
                <div style="text-align: center; width: 100px; height: 100px; overflow: hidden">
                  <img style="width: 100%" :src="form.commodity_img_url" alt="">
                </div>

              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="">
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  action="http://jisi.poolbear.cn/Agents/UploadFiles/upload_items_img"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  :auto-upload="false"
                  list-type="picture">
                  <el-button slot="trigger" size="small" type="primary">更换图片</el-button>
                  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5M</div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="库存基数">
                <el-radio-group v-model="form.base">
                  <el-radio :label="0">
                    拍下减库存
                    <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                      <i class="kucun-icon-question">?</i>
                    </el-tooltip>
                  </el-radio>

                  <br>
                  <el-radio :label="1">
                    付款减库存
                    <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                      <i class="kucun-icon-question">?</i>
                    </el-tooltip>
                  </el-radio>

                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="开始时间">
                <el-radio-group v-model="form.type">
                  <el-radio :label="2">
                    立刻
                    <i class="start-time">设置立刻开拍，商品即进入开拍状态，将无法对商品进行编辑，请谨慎操作</i>
                  </el-radio>
                  <br>
                  <el-radio :label="1">
                    放入仓库
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelEdit">取 消</el-button>
          <el-button type="primary" @click="editGood">确 定</el-button>
        </div>
      </el-dialog>
      <!--  <div style="margin-top: 20px">
          <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
          <el-button @click="toggleSelection()">取消选择</el-button>
        </div>-->
      <div class="sell-content-footer">
        <div class="footer-doing">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="10">
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="">
                  <el-checkbox v-model="choiceAll">全选</el-checkbox>
                </el-form-item>
                <el-button type="danger" size="small" @click="onSubmit('delete')">删除</el-button>
                <el-button type="success" size="small" @click="onSubmit('down')">下架</el-button>
              </el-form>
            </el-col>
            <el-col :xs="24" :sm="24" :md="14">
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
  import {getGoodType, fetchSellList, deleteGoods,uploadImg, downGoods, editGood} from '@/api/goods'

  export default {
    data() {
      return {
        formInline: {
          category_id: '',
          commodity_name: ''
        },
        category: [],
        fileList: [],
        dialogFormVisible: false,
        choiceAll: false,
        totalCount: 0,
        currentPage: 1,
        commodity_img_url: '',
        form: {
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
        },
        tableData: [],
        multipleSelection: []
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        console.log(from, 'from')
        vm.fetchData()
      })
    },
    methods: {
      submitUpload() {
        console.log(this.$refs.upload.uploadFiles)
        if (!this.$refs.upload.uploadFiles.length) {
          return this.$message({
            message: '图片为空，请先选择图片并且上传服务器再进行内容发布',
            type: 'warning'
          });
        }
        uploadImg(this.$refs.upload.uploadFiles[0].raw).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.commodity_img_url = res.data[0].img_url
            this.$message({
              message: '图片上传成功',
              type: 'success'
            });
          }
        }).catch(err => {
          this.$message({
            message: res,
            type: 'warning'
          });
        })
//        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      fetchData() {
        let self = this
        getGoodType().then(res => {
          if (res.code == 200) {
            console.log(res.data)
            self.category = res.data
            self.fetchData1()
          }
        })
      },
      fetchData1(id, name) {
        fetchSellList(id, name, this.currentPage, this.$store.getters.token).then(res => {
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
      currentChange(val) {
        this.currentPage = val
        this.fetchData1()
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
      editGood() {
        editGood(this.form).then(res => {
          if (res.code == 200) {
            this.$message({
              message: '恭喜你，商品编辑成功',
              type: 'success'
            });
            this.cancelEdit()
            this.fetchData1(this.formInline.category_id, this.formInline.commodity_name)
          }
        })
      },
      onSubmit(state) {
        if (!this.multipleSelection.length && (state === 'up' || state === 'down')) {
          return alert('请至少选择一项商品')
        }
        if (state === 'down') {
          this.$confirm('此操作将下架您选中的商品, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let commodity_id = this.multipleSelection.map(v => v.commodity_id)
            downGoods(commodity_id, this.$store.getters.token).then(res => {
              console.log(res)
              if (res.code == 200) {
                this.fetchData1(this.formInline.category_id, this.formInline.commodity_name)
                this.$message({
                  type: 'success',
                  message: '下架成功!'
                });
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消下架'
            });
          });
        }
        if (state === 'delete') {
          this.$confirm('此操作将删除您选中的商品, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let commodity_id = this.multipleSelection.map(v => v.commodity_id)
            deleteGoods(commodity_id, this.$store.getters.token).then(res => {
              console.log(res)
              if (res.code == 200) {
                this.fetchData1(this.formInline.category_id, this.formInline.commodity_name)
                this.$message({
                  type: 'success',
                  message: '所选商品删除成功!'
                });
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
        if (state === 'clear') {
          this.formInline = {
            category_id: '',
            commodity_name: ''
          }
        }
        if (state === 'select') {
          this.fetchData1(this.formInline.category_id, this.formInline.commodity_name)
        }
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleChange() {
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;

      },
      editBaby(row) {
        this.form = {
          resource: '',
          type: row.type || 2,
          commodity_num: 1,
          delivery: Number(row.discount) == 10 ? false : true,
          commodity_id: row.commodity_id,
          commodity_describe: row.commodity_describe || '宝贝很好',
          commodity_name: row.commodity_name,
          commodity_img_url: this.commodity_img_url?this.commodity_img_url:row.commodity_img_url,
          basis_price: row.basis_price,
          base: row.base ? row.base : 0,
          discount: Number(row.discount) || 10,
        }
        this.dialogFormVisible = true
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
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
