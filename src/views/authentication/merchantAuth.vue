<template>
  <div class="merchant-auth">
    <h1>商户认证</h1>
    <div class="content">
      <div class="title">
        一个身份只能认证一家商户，认证期间无法撤销；申请到正式开通预计需1~3个工作日。了解更多请查看《某某某某》
      </div>
      <el-steps :active="activeStep" finish-status="success" simple style="margin-top: 20px">
        <el-step title="申请开通账户" ></el-step>
        <el-step title="阅读认证须知" ></el-step>
        <el-step title="填写资料" ></el-step>
        <el-step title="设置客服" ></el-step>
        <el-step title="等待审核" ></el-step>
      </el-steps>
      <div class="steps-desc">
        <div class="step-one" v-show="activeStep === 1">
          <img src="../../assets/images/auth/user.png"/>
          <div class="one-title">开通商铺</div>
          <div class="one-desc">
            通过支付宝个人实名认证的商家创建
            个人实名认证商户
          </div>
          <div class="auth-btn">
            <button @click="getInstructions()">立即认证</button>
          </div>
        </div>
        <div class="step-two" v-show="activeStep === 2">
          <div class="tips">
            <div>特别提示:</div>
            {{instructions}}
          </div>
          <div class="agree">
            <el-checkbox v-model="agreement">我同意并遵守上述的《某某认证协议》</el-checkbox>
          </div>
          <div class="auth-btn">
            <button @click="agree">下一步</button>
          </div>
        </div>
        <div class="step-three" v-show="activeStep === 3">
          <el-form :rules="rules" ref="authForm" :model="form" label-width="124px" label-position="left">
            <el-form-item label="机构类型">
              <!--<el-select v-model="form.orgType" placeholder="请选择机构类型">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>-->
              <el-input v-model="form.name" style="width: 60%" :disabled="true"></el-input>
              <div class="desc">请按照营业执照、法人证书、组织机构代码证等证件上类型来返回</div>
            </el-form-item>
            <el-form-item label="申请公函">
              <el-upload
                action="http://jisi.poolbear.cn/Agents/UploadFiles/upload_official_letter"
                :headers="headers"
                :on-success="handleUploadLetterSuccess"
                :before-upload="checkFileUpload"
              >
                <el-button size="small" type="primary">上传</el-button>
                <div slot="tip" class="el-upload__tip">上传加盖公章的原件照片或扫描件，支持jpg，jpeg，bmp，png格式照片，
                  大小不超过５Ｍ。</div>
              </el-upload>
              <el-button size="small" type="text" @click="downloadApplyFile">点击下载申请公函</el-button>
            </el-form-item>
            <div class="group-title">企业资质信息</div>
            <el-form-item label="企业名称" prop="enterprise_name">
              <el-input v-model="form.enterprise_name" style="width: 60%" ></el-input>
              <div class="desc">
                <p>
                  主题名称需要严格按照证件返回，在注册确认后不可更改。避免付款后因主体原因
                  导致认证失败，请<a>详细查阅主体不可更改情况</a>
                </p>
                <p>企业最多注册50个账号。</p>
              </div>
            </el-form-item>
            <el-form-item label="工商营业执照">
              <el-upload
                action="http://jisi.poolbear.cn/Agents/UploadFiles/upload_business_license"
                :headers="headers"
                :on-success="handleUploadLicenseSuccess"
                :before-upload="checkFileUpload">
                <el-button size="small" type="text">请上传最新的营业执照</el-button>
                <div slot="tip" class="el-upload__tip">
                  格式要求：原件照片、扫描件或者加盖公章的复印件支持ｊｐｇ，ｊｐｅｇ，ｂｍｐ，ｐｎｇ格式照片，
                  大小不超过５Ｍ。
                </div>
              </el-upload>
            <!--  <el-button size="small" type="primary">重新上传</el-button>
              <div class="desc">
                企业工商营业执照
              </div>-->
            </el-form-item>
            <el-form-item label="其他证明材料（选填）">
              <el-upload
                ref="uploadOthers"
                action="http://jisi.poolbear.cn/Agents/UploadFiles/upload_other_files"
                :headers="headers"
                :on-success="handleUploadOthersSuccess"
                :before-upload="checkFileUpload"
                :on-change="fileLimit"
                multiple
                :limit="5">
                <el-button size="small" type="primary">上传文件</el-button>
                <div slot="tip" class="el-upload__tip">
                  特殊情况可上传最为佐证，如企业工商变更证明、官方红头文件、家港公章证明等。
                </div>
              </el-upload>
            </el-form-item>
            <div class="group-title">对公账户信息</div>
            <el-form-item label="开户名称">
              <el-input v-model="form.enterprise_name" style="width: 60%" :disabled="true"></el-input>
              <div class="desc">
                对公账户需跟猪蹄证件上的季候名称保持一直，对公账户填写指引
                若无对公账户，后续三项均可写”无“
              </div>
            </el-form-item>
            <el-form-item label="开户银行" prop="bank_of_deposit">
              <el-input v-model="form.bank_of_deposit" style="width: 60%"></el-input>
            </el-form-item>
            <el-form-item label="对公银行账号" prop="bank_account">
              <el-input v-model="form.bank_account" style="width: 60%"></el-input>
              <div class="desc">
                我们会给该账户汇入一笔非常小的金额和备注信息，后续审核人员会致电您确认。
              </div>
            </el-form-item>
            <div class="group-title">认证联系人信息</div>
            <el-form-item label="联系人姓名" prop="actual_name">
              <el-input v-model="form.actual_name" style="width: 60%"></el-input>
              <div class="desc">
                该人员须与申请公函的联系人一致
              </div>
            </el-form-item>
            <el-form-item label="联系人电话" prop="contact_number">
              <el-input v-model="form.contact_number" style="width: 60%"></el-input>
              <div class="desc">
                认证过程会指点该电话，认证期间保持电话畅通。
              </div>
            </el-form-item>
            <el-form-item label="短信验证码">
              <el-col :span="10">
                <el-input style="width: 98%"></el-input>
              </el-col>
              <el-col :span="14">
                <el-button type="primary" size="small">获取验证码</el-button>
              </el-col>
            </el-form-item>
            <el-form-item label="联系人身份证号码" prop="ID_number">
              <el-input v-model="form.ID_number" style="width: 60%"></el-input>
            </el-form-item>
            <el-form-item label="身份证上传">
              <el-upload
                ref="uploadCard"
                action="http://jisi.poolbear.cn/Agents/UploadFiles/upload_ID_photo"
                :headers="headers"
                :on-success="handleUploadCardSuccess"
                :before-upload="checkFileUpload"
                :auto-upload="false"
                multiple
                :limit="2">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUploadCard">上传到服务器</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="lastStep(2)">上一步</el-button>
              <el-button @click="submitAuth('authForm')">下一步</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="step-four" v-show="activeStep === 4">
          <div class="rules">
            <p>商铺认证账号命名规则</p>
            <p>保护注册商标原则：账号名不得侵犯注册商标专用权，否则审核将不被通过；</p>
            <p>认证命名唯怡原则：账号名不得与已认证账号重复，否则审核将不被通过；</p>
          </div>
          <el-form label-width="80px" :model="serviceForm" label-position="left">
            <el-form-item label="客服昵称">
              <el-input v-model="serviceForm.name" style="width: 60%"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="nextStep(3)">上一步</el-button>
              <el-button @click="setService">下一步</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="step-five" v-show="activeStep === 5">
          <div class="check-success-box flex-box">
            <div>
              <i class="el-icon-circle-check" style="font-size: 40px;color: #03e61d"></i>
            </div>
            <div class="check-content">
              <div class="check-title">
                <span v-if="verifyTitle">
                  {{verifyTitle}}
                </span>
                <span v-else>您的审核已提交!</span>
              </div>
              <div class="check-desc">
                <span v-if="verifyContent" v-html="verifyContent">
                </span>
                <span v-else>审批结果将在7个工作日内完成，请留意消息。</span>
              </div>
              <div class="check-title-two">
                官网审核-->完成
              </div>
              <div class="reset-auth" v-if="step === 'last' && role === 'agents'">
              <!--<div class="reset-auth">-->
                <el-button type="primary" @click="resetAuth">重新认证</el-button>
                <div class="note">如您需要进行重新认证，将清空您已提交过的所有材料，并恢复至'未认证'状态，再您重新认证成功之前，用户将不再看到您的商户</div>
              </div>
              <div class="check-desc">
                返回<router-link to="/index/dashboard">首页</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { getToken, getSteps, getRoles } from '@/utils/auth'
  import { saveAuth, getAuthInstruction, getVerifyProgress, resetAuth } from '@/api/sellers'
export default{
  data () {
    var checkIsNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          callback();
        }
      }, 500);
    };
    var checkCard = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      }
      setTimeout(() => {
        if (/^(\d|[a-zA-Z])+$/.test(value))
          callback();
        else
          return callback(new Error('身份证号格式不正确'));
      }, 500);
    };
    return {
      activeStep: 5,
      headers: {
        'Access-Token': getToken()
      },
      step: '',
      role: '',
      verifyTitle: '',
      verifyContent: '',
      instructions: '',
      form: {
        name: '企业->企业法人',
        enterprise_name: ''
      },
      official_letter: '',
      business_license: '',
      ID_photo: [],
      errMsg: '',
      serviceForm: {
          name: ''
      },
      agreement: true,
      otherFileList: [],
      rules: {
        actual_name: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' }
        ],
        enterprise_name: [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        bank_of_deposit: [
          {required: true, message: '请输入开户银行', trigger: 'blur'}
        ],
        ID_number: [
          { required: true, message: '请输入联系人身份证号码', trigger: 'blur' },
          { validator: checkCard, trigger: 'blur' }
        ],
        bank_account: [
          { required: true, message: '请输入对公银行账号', trigger: 'blur' },
          { validator: checkIsNumber, trigger: 'blur' }
        ],
        contact_number: [
          { required: true, message: '请输入联系人电话', trigger: 'blur' },
          { validator: checkIsNumber, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getVerifyProgress()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      let auth = getSteps()
      if (auth === 'first') {
        vm.activeStep = 1
      }
      vm.step = auth
      let role = JSON.parse(getRoles())
      vm.role = role[0]
    })
  },
  methods: {
    nextStep (step) {
      this.activeStep = step
    },
    lastStep (step) {
      this.nextStep(step)
    },
    setService () {
      this.nextStep(5)
    },
    submitUploadCard() {
      this.$refs.uploadCard.submit();
    },
    isUpload () {
      if (this.official_letter == '') {
        this.errMsg = '请上传申请公函'
        return false
      } else if (this.business_license == '') {
        this.errMsg = '请上传营业执照'
        return false
      } else if (this.ID_photo.length == 0){
        this.errMsg = '请上传身份证'
        return false
      } else {
          return true
      }

    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    resetAuth () {
      resetAuth().then(res => {
        this.$message({
          message: '重新认证申请成功',
          type: 'success'
        });
        this.logout()
      })
    },
    getVerifyProgress () {
      getVerifyProgress().then(res => {
        this.verifyTitle = res.data.title
        this.verifyContent = res.data.content
      })
    },
    getInstructions () {
      this.getAuthInstruction()
      this.nextStep(2)
    },
    getAuthInstruction () {
      getAuthInstruction().then(res => {
          this.instructions = res.data
      })
    },
    submitAuth (form) {
      this.$refs[form].validate((valid) => {
        if (!this.isUpload()) {
          this.$message({
            message: this.errMsg,
            type: 'warning'
          });
          return
        }
        if (valid) {
          this.saveAuth()
        } else {
          return false;
        }
      });
    },
    saveAuth () {
      this.form.business_license = this.business_license
      this.form.ID_photo = this.ID_photo
      this.form.official_letter = this.official_letter
      saveAuth(this.form).then(res => {
        this.activeStep = 4
      })
    },
    handleUploadLetterSuccess (res, file, fileList) {
      if (res.data.file.img_url)
        this.official_letter = res.data.file.img_url
    },
    handleUploadLicenseSuccess (res, file, fileList) {
      if (res.data.file.img_url)
        this.business_license = res.data.file.img_url
    },
    handleUploadCardSuccess (res, file, fileList) {
      let len = this.ID_photo.length
      if (res.data.file.img_url) {
        if (len >= 2) {
          this.ID_photo.shift()
          this.ID_photo.push(res.data.file.img_url)
        } else {
          this.ID_photo.push(res.data.file.img_url)
        }
      }
    },
    handleUploadOthersSuccess (res, file, fileList) {
      console.log('success')
      console.log(fileList)
      console.log(file)
    },
    fileLimit (file, fileList) {
      if (fileList.length > 5) {
        this.$refs.uploadOthers.abort(fileList[fileList.length - 1])
        this.$message({
          message: '文件个数不能超过5个',
          type: 'warning'
        });
      }
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
    downloadApplyFile () {
      window.location.href = 'http://jisi.poolbear.cn/Agents/downloadFiles/download_official_letter?f_name=renzhenggonghan'+'&token='+ getToken()
    },
    agree () {
      if (!this.agreement) {
        this.$message({
          message: '请选择同意协议',
          type: 'warning'
        });
        return
      }
      this.nextStep(3)
    }
  }
}
</script>
<style lang="scss" scoped>
  $font-color: #48576a;
  $a-color: #20a0ff;
  .merchant-auth{
    padding: 15px 41px;
    h1{
      font-size: 16px;
    }
    .content{
      padding: 15px;
      background-color: white;
      .title{
        font-size: 14px;
        margin-bottom: 19px;
      }
      .steps-desc{
        margin-top: 15px;
        .auth-btn{
          text-align: center;
          button{
            width: 111px;
            height: 31px;
            border-radius: 4px;
            background-color: #066dbf;
            color: white;
          }
        }
        .step-one{
          img{
            width: 59px;
            height: 59px;
            display: block;
            margin: 32px auto 12px auto;
          }
          .one-title, .one-desc{
            text-align: center;
            margin-bottom: 12px;
          }
          .one-title{
            font-size: 20px;
          }
          .one-desc{
            font-size: 16px;
          }
        }
        .step-two{
          .tips, .agree{
            margin-bottom: 15px;
          }
          .tips{
            border: 1px solid #999999;
            border-radius: 3px;
            padding: 10px 22px 10px 13px;
            font-size: 14px;
            line-height: 24px;
          }
        }
        .step-four{
          .rules{
            color: $font-color;
            font-size: 14px;
          }
        }
        .step-five{
          .check-success-box{
            padding-top: 42px;
            padding-bottom: 28px;
            width: 527px;
            margin: 0 auto;
            .check-content{
              padding-left: 25px;
              .check-title{
                font-size: 24px;
                margin-bottom: 18px;
                font-weight: 700;
              }
              .check-desc{
                font-size: 18px;
                margin-bottom: 18px;
                a{
                  color: $a-color;
                }
              }
              .check-title-two{
                font-size: 20px;
                margin-bottom: 35px;
                font-weight: 700;
              }
              .reset-auth{
                .note{
                  color: red;
                  padding: 8px 0;
                  line-height: 25px;
                }
              }
            }
          }
        }
      }
    }
    .desc{
      color: #8391a5;
      font-size: 12px;
      a{
        color: $a-color;
      }
    }
    .group-title{
      color: $font-color;
      font-size: 14px;
      border-bottom: 1px solid #bfcbd9;
      padding-bottom: 7px;
      margin-bottom: 14px;
    }
  }
</style>
