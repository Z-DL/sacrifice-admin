<template>
  <div class="publish-wrapper">

    <el-form ref="form" :model="form" label-width="80px">
      <el-row>
        <el-col :span="16">
          <el-form-item label="公司名称" prop="company_name">
            <el-input v-model="form.company_name" placeholder="请输入公司名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="联系电话" prop="contact_number">
            <el-input v-model="form.contact_number" placeholder="请输入联系电话"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :sm="16" :xs="24">
          <el-form-item label="公司网址" prop="website">
            <el-input placeholder="请输入公司网址" v-model="form.website"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :sm="16" :xs="24">
          <el-form-item label="公司地址" prop="company_address">
            <el-input v-model="form.company_address" placeholder="请填写公司地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :sm="16" :xs="24">
          <el-form-item label="公司邮箱" prop="e_mail">
            <el-input v-model="form.e_mail" placeholder="请填写公司邮箱"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即修改</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import {getConnection} from '@/api/web'

  export default {
    data() {
      return {
        form: {
          company_name: '',
          contact_number: 0,
          website: '',
          company_address: '',
          e_mail: '',
        },
        rules: {
          company_name: [
            {required: true, message: '请输入公司名称', trigger: 'blur'},
          ],
          contact_number: [
            {required: true, message: '请填写联系电话', trigger: 'blur'}
          ],
          website: [
            {required: true, message: '请填写公司网址', trigger: 'blur'}
          ],
          company_address: [
            {required: true, message: '请填写公司地址', trigger: 'blur'}
          ],
          e_mail: [
            {required: true, message: '请填写公司邮箱', trigger: 'blur'}
          ],
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.fetchData()
      })
    },
    methods: {
      fetchData () {
        getConnection({type: 'read'}).then(res => {
          console.log(res, 'res')
          if (res.code ===200) {
            this.form = res.data
          }
        })
      },
      onSubmit() {
        let bool = true
        for (let key of Object.keys(this.form)) {
          if (!this.form[key]) {
            bool = false
            break
          }
        }
        if (!bool) {
          return this.$message({
            message: '相关内容未填写，请填写完整',
            type: 'warning'
          });
        }
        getConnection({type: 'save', ...this.form}).then(res => {
          if (res.code == 200) {
            this.$message({
              message: '联系方式成功',
              type: 'success'
            });
            this.fetchData()
          }
        })
      },
      cancel() {
        this.fetchData()
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
