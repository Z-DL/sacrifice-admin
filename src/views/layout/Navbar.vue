<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <levelbar></levelbar>
    <div class="sys-title">辽宁世纪祭祀网</div>
    <div class="user-info">
      <span>{{name}}</span>
      <span class="certification">{{certification}}</span>
      <span @click="logout" class="logout">退出</span>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Levelbar from './Levelbar'
import { getCertification } from '@/utils/auth'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Levelbar,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ]),
    certification() {
      return getCertification()
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()  // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .navbar {
        height: 50px;
        line-height: 50px;
        border-radius: 0px !important;
        .hamburger-container {
            line-height: 58px;
            height: 50px;
            float: left;
            padding: 0 10px;
        }
        .errLog-container {
            display: inline-block;
            position: absolute;
            right: 150px;
        }
        .screenfull {
            position: absolute;
            right: 90px;
            top: 16px;
            color: red;
        }
        .sys-title{
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          margin: auto;
          text-align: center;
        }
        .user-info{
          position: absolute;
          right: 20px;
          top: 0;
          font-size: 14px;
          color: #97a8be;
          span{
            margin-left: 6px;
          }
          .logout{
            cursor: pointer;
            &:hover{
              color: #20A0FF;
            }
          }
        }
    }
</style>

