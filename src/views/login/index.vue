<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
      <h2 class="login-title">世纪祭祀文化系统</h2>
      <div class="login-box">
        <h3 class="title">登录</h3>
        <el-form-item prop="username">
          <span class="svg-container svg-container_login">
            <icon-svg icon-class="yonghuming" />
          </span>
          <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <icon-svg icon-class="mima" ></icon-svg>
          </span>
          <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
            placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item class="loing-settings" prop="roles">
          <el-radio-group v-model="loginForm.roles">
            <el-radio label="temporary">临时账号</el-radio>
            <el-radio label="agents">代理商</el-radio>
            <el-radio label="terminal">管理员</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="12"><el-checkbox v-model="remember">记住密码</el-checkbox></el-col>
            <el-col :span="12" class="text-right"><a class="forgot">忘记密码?</a></el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <div class="login-btn" @click="handleLogin">登录</div>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'

export default {
  name: 'login',
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!isvalidUsername(value)) {
    //     callback(new Error('请输入正确的用户名'))
    //   } else {
    //     callback()
    //   }
    // }
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        roles: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户名'}],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        roles: [ { required: true, message: '请选择角色', trigger: 'change' }]
      },
      loading: false,
      remember: true
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/index/dashboard' })
          }).catch(() => {
            this.loading = false
          })
          console.log('error submit!!')
          return false
        } else {
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;
  $login_bg: #63809E;
  $text_color:#1A1A1A;

  .login-container {
    @include relative;
    height: 100vh;
    background: url('~/static/login_bg.jpg') no-repeat center center;
    .login-title{
      font-size: 30px;
      text-align: center;
    }
    .login-box{
      border: 1px solid #fff;
      border-radius: 5px;
      background-color: $login_bg;
      padding: 5px 40px;
    }
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #DFE2E4 inset !important;
      -webkit-text-fill-color: #333 !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $text_color;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title{
      font-size: 20px;
      color: #fff;
      font-weight: 700;
    }
    .login-form {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 400px;
      transform: translate(-50%, -50%);
    }
    .el-form-item.is-required {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: #DFE2E4;
      border-radius: 5px;
      color: $text_color;
    }
    .el-form-item.is-required.loing-settings{
      border: none;
      background: none;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
    .login-btn{
      width: 100%;
      height: 52px;
      line-height: 52px;
      cursor: pointer;
      color: #fff;
      border-radius: 5px;
      text-align: center;
      letter-spacing: 6px;
      background: linear-gradient(#416795, #395A82);
    }
    .text-right{
      text-align: right;
    }
    .loing-settings,
    .el-checkbox{
      color: #fff;
    }
    .forgot:hover{
      text-decoration: underline;
    }
  }
</style>
