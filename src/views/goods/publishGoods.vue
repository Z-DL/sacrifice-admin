<template>
  <div class="publish-wrapper">

    <el-form ref="form" :model="form" label-width="80px">
      <el-row>
        <el-col :span="24">
          <div class="publish-title">
            1、商品基本信息
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="商品标题" prop="commodity_name">
            <el-input v-model="form.commodity_name" placeholder="最多输入30字"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="商品描述" prop="commodity_describe">
            <el-input type="textarea" v-model="form.commodity_describe" placeholder="最多输入150字"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :sm="8" :xs="24">
          <el-form-item label="商品价格" prop="basis_price">
            <el-input placeholder="请输入内容" v-model="form.basis_price">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="8" :xs="24">
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
        <el-col :sm="8" :xs="24">
          <el-form-item label="宝贝类目" prop="category_id">
            <el-select v-model="form.category_id" placeholder="请选择宝贝类目">
              <el-option v-for="item in category"
                         :label="item.category_name"

                         :key="item.id"
                         :value="item.category_id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="4" :xs="12">
          <el-form-item label="是否折扣">
            <el-switch v-model="form.delivery"></el-switch>

          </el-form-item>
        </el-col>
        <el-col :sm="4" :xs="12" v-if="form.delivery">
          <el-input placeholder="请输入折扣"
                    prop="discount"
                    v-model="form.discount">
            <template slot="append">折</template>
          </el-input>
        </el-col>
      </el-row>
      <!--</el-form>-->

      <!--<form id="imgform" enctype="multipart/form-data"></form>-->
      <el-row>
        <el-col :span="16">
          <!--<input type="file" name="">-->
          <el-form-item label="商品图片">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="http://jisi.poolbear.cn/Agents/UploadFiles/upload_items_img"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :auto-upload="false"
              list-type="picture">
              <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5M</div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-form ref="form1" :model="form" label-width="80px">-->
      <el-row>
        <el-col :span="24">
          <div class="publish-title">
            2、其他信息
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
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
        <el-col :span="16">
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
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即发布</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <!--<form enctype="multipart/form-data">
      <input ref="imgUpload" type="file" name="file" :value="fileList">
      <input type="button" @click="submitUpload">dianji</input>
    </form>-->
  </div>
</template>
<script>
  import {getGoodType, uploadImg, publishGood, upGoods} from '@/api/goods'

  export default {
    data() {
      return {
        category: [],
        fileList: [],
        form: {
          commodity_name: '',
          commodity_img_url: '',
          base: 0,
          type: 2,
          commodity_num: 1,
          basis_price: '',
          discount: 10,
          delivery: false,
          category_id: '',
          commodity_describe: ''
        },
        rules: {
          commodity_describe: [
            {required: true, message: '请输入商品描述', trigger: 'blur'},
            {min: 4, max: 150, message: '长度在 4 到 150 个字符', trigger: 'blur'}
          ],
          commodity_name: [
            {required: true, message: '请填写商品名称', trigger: 'blur'},
            {min: 4, max: 30, message: '长度在 4 到 30 个字符', trigger: 'blur'}
          ],
          commodity_num: [
            {required: true, message: '请填写商品数量', trigger: 'blur'}
          ],
          basis_price: [
            {required: true, message: '请填写商品价格', trigger: 'blur'}
          ],
          discount: [
            {required: true, message: '请填写商品折扣', trigger: 'blur'}
          ],
          category_id: [
            {required: true, message: '请选择商品类目', trigger: 'change'}
          ],
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getCategory()
//        vm.fetchData()
      })
    },
    watch: {
      fileList (val) {
        console.log(val)
      }
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
            this.form.commodity_img_url = res.data[0].img_url
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
      getCategory() {
        let self = this
        getGoodType().then(res => {
          if (res.code == 200) {
            console.log(res.data)
            self.category = res.data
          }
        })
      },
      onSubmit() {
        if (!this.form.commodity_img_url) {
          return this.$message({
            message: '图片为空，请先选择图片并且上传服务器再进行内容发布',
            type: 'warning'
          });
        }
        publishGood(this.form).then(res => {
          if (res.code == 200) {
            this.$message({
              message: '恭喜你，商品发布成功',
              type: 'success'
            });
            this.form = {
              commodity_name: '',
              commodity_img_url: '',
              base: 0,
              type: 2,
              commodity_num: 1,
              basis_price: '',
              discount: 10,
              delivery: false,
              category_id: '',
              commodity_describe: ''
            }
            this.fileList = []
          }
        })
      },
      handleChange() {
      }
    }
  }
</script>

<style lang="scss" scoped>
  .publish-wrapper {
    padding: 20px;
    .publish-title {
      line-height: 40px;
    }
    .start-time {
      font-style: normal;
      font-size: 12px;
      color: #666;
    }
    .kucun-icon-question {
      display: inline-block;

      width: 16px;
      height: 16px;
      border-radius: 50%;
      font-size: 12px;
      background: #999;
      color: white;
      font-weight: 600;
      font-style: normal;
      text-align: center;
      line-height: 16px;
    }
  }

</style>
