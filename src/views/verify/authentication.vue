<template>
  <div class="authentication">
    <h1>认证审核</h1>
    <el-select style="margin-bottom: 15px" filterable v-model="storeProvince" placeholder="请选择" @change="selectProvince">
      <el-option
        v-for="item in province"
        :key="item.province_id"
        :label="item.province_name"
        :value="item.province_id">
      </el-option>
    </el-select>
    <el-table
      :data="authenticationList"
      style="width: 100%">
      <el-table-column
        prop="actual_name"  label="认证企业">
      </el-table-column>
      <el-table-column
        prop="contact_number"
        label="联系人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="apply_time"
        label="申请时间"
        width="200">
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
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
    <el-dialog title="认证详情" :visible.sync="displayAuthDesc" width="1000">
      <el-form :model="form" label-width="124px" label-position="left">
        <el-form-item label="机构类型">
          <el-input value="企业->企业法人" style="width: 60%" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="申请公函">
            <div class="picture-box">
              <img class="img" :src="form.official_letter"/>
              <!--<img class="img" src="../../assets/img.jpg"/>-->
              <el-button size="small" type="primary" @click="downloadOffice(form.official_letter)">点击下载</el-button>
            </div>
        </el-form-item>
        <div class="group-title">企业资质信息</div>
        <el-form-item label="企业名称">
          <el-input v-model="form.enterprise_name" style="width: 60%" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="工商营业执照">
          <div class="picture-box">
            <img class="img" :src="form.business_license"/>
            <el-button size="small" type="primary" @click="downloadLicens(form.business_license)">点击下载</el-button>
          </div>
        </el-form-item>
        <el-form-item label="其他证明材料（选填）">
          <div class="picture-box">
            <img class="img" :src="form.business_license"/>
            <el-button size="small" type="primary">点击下载</el-button>
          </div>
        </el-form-item>
        <div class="group-title">对公账户信息</div>
        <el-form-item label="开户名称" prop="actual_name">
          <el-input v-model="form.enterprise_name" style="width: 60%" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="开户银行" prop="bank_of_deposit">
          <el-input v-model="form.bank_of_deposit" style="width: 60%" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="对公银行账号" prop="bank_account">
          <el-input v-model="form.bank_account" style="width: 60%" :disabled="true"></el-input>
        </el-form-item>
        <div class="group-title">认证联系人信息</div>
        <el-form-item label="联系人姓名" prop="actual_name">
          <el-input v-model="form.actual_name" style="width: 60%" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话" prop="contact_number">
          <el-input v-model="form.contact_number" style="width: 60%" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="联系人身份证号码" prop="ID_number">
          <el-input v-model="form.id_number" style="width: 60%" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="身份证上传">
          <div class="picture-box">
            <img class="img" :src="img" v-for="img in form.id_photo"/>
            <el-button size="small" type="primary" @click="downloadID(form.id_photo)">点击下载</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAuthResult('agreed')">通过认证</el-button>
          <el-button @click="submitAuthResult('refused')">拒绝认证</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import { getAuthentication, submitAuthStatus } from '@/api/verify'
  import { getProvince} from '@/api/sellers'
  import { getToken } from '@/utils/auth'
  export default{
      data () {
        return {
          authenticationList: [],
          listLoading: true,
          province: [],
          storeProvince: 'all',
          currPage: 1,
          totalPage: 0,
          displayAuthDesc: false,
          form: {
          }
        }
      },
    created () {
      let params = this.getAllParams()
      this.getAuthenticationList(params)
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.getProvince()
      })
    },
    methods: {
      currentChange (page) {
        this.currPage = page
        let params = this.getAllParams()
        this.getAuthenticationList(params)
      },
      downloadOffice (url) {
        if (url) {
//          let array = url.split('/')
          let http = `http://jisi.poolbear.cn/Agents/downloadFiles/download_agents_official_letter?f_name=${url}`
          this.downloadFile(http)
        }
      },
      downloadID (url) {
        if (url) {
          let http = `http://jisi.poolbear.cn/Agents/downloadFiles/download_ID_photo?f_name_1=${url[0]}&f_name_2=${url[1]}`
          this.downloadFile(http)
        }
      },
      downloadLicens (url) {
        if (url) {
          let http = `http://jisi.poolbear.cn/Agents/downloadFiles/download_business_license?f_name=${url}`
          this.downloadFile(http)
        }
      },
      downloadFile (url) {
        window.location.href = url +'&token='+ getToken()
      },
      submitAuthResult (result) {
        let obj = {}
        obj.store_id = this.form.store_id
        obj.state = result
        submitAuthStatus(obj).then(res => {
          this.$message({
            message: '提交成功',
            type: 'success'
          });
          this.displayAuthDesc = false
          let params = this.getAllParams()
          this.getAuthenticationList(params)
        })
      },
      getAuthenticationList (payload) {
        this.listLoading = true
        getAuthentication(payload).then(res => {
          this.authenticationList = res.data
          this.listLoading = false
          this.totalPage = res.count.page_count
        })
      },
      seeDesc (row) {
        this.displayAuthDesc = true
        this.form = row
      },
      getProvince () {
        getProvince().then(response => {
          this.province = response.data
          this.province.unshift({province_id: 'all', province_name: '全国'})
//          this.storeProvince = this.province[0]
        })
      },
      getAllParams () {
        let params = {}
        params.page = this.currPage
        params.province = this.storeProvince
        return params
      },
      selectProvince (value) {
        this.storeProvince = value
        this.currPage = 1
        let params = this.getAllParams()
        this.getAuthenticationList(params)
      }
    }
  }
</script>
<style lang="scss" scoped>
  $font-color: #48576a;
  .authentication{
    padding: 15px;
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
    .group-title{
      color: $font-color;
      font-size: 14px;
      border-bottom: 1px solid #bfcbd9;
      padding-bottom: 7px;
      margin-bottom: 14px;
    }
    .picture-box{
      .img{
        width: 55px;
        height: 62px;
        vertical-align: bottom;
        margin-bottom: 5px;
        margin-right: 7px;
      }
    }
  }
</style>
