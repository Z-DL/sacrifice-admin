<template>
  <div class="upload-box">
    <div style="margin-bottom: 15px">
      <el-upload
        action="http://jisi.poolbear.cn/Agents/UploadFiles/upload_instructions"
        :headers="headers"
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError">
        <el-button size="small" type="primary">上传认证须知</el-button>
      </el-upload>
    </div>
    <div>
      <el-upload
        action="http://jisi.poolbear.cn/Agents/UploadFiles/upload_official"
        :headers="headers"
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError"
      >
        <el-button size="small" type="primary">上传申请公函</el-button>
      </el-upload>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { getToken } from '@/utils/auth'
  export default{
    data () {
      return {
        headers: {
          'Access-Token': getToken()
        }
      }
    },
    methods: {
      handleUploadSuccess () {
        this.$message({
          message: '文件上传成功',
          type: 'success'
        });
      },
      handleUploadError () {
        this.$message({
          message: '文件上传失败，请重新上传',
          type: 'error'
        });
      }
    }
  }
</script>
<style lang="scss" scoped>
  .upload-box{
    text-align: center;
    padding-top: 30px;
  }
</style>
