<template>
  <div class="company-box">
    <el-row>
      <el-col :xs="24" :md="12" style="border-right: 1px solid #1f2d3d;">
        <div class="content-box">
          <div class="company-image border-box margin-bottom">
            <div class="upload-img">
              <el-upload
                action="http://jisi.poolbear.cn/Agents/UploadFiles/upload_about_us"
                :headers="headers"
                :data="paramsOneImage"
                :on-success="handleUploadOneSuccess"
                :on-error="handleUploadFailed"
                :before-upload="checkFileUpload"
              >
                <el-button size="small" type="primary">上传图片</el-button>
              </el-upload>
            </div>
          </div>
          <div class="company-description border-box margin-bottom">
            <el-input style="width: 60%; margin-bottom: 10px" v-model="descriptions[0].title"></el-input>
            <el-input style="width: 90%" type="textarea" autosize v-model="descriptions[0].content"></el-input>
          </div>
          <div class="company-idea border-box margin-bottom">
            <div class="upload-img">
              <el-upload
                action="http://jisi.poolbear.cn/Agents/UploadFiles/upload_about_us"
                :headers="headers"
                :data="paramsTwoImage"
                :on-success="handleUploadTwoSuccess"
                :on-error="handleUploadFailed"
                :before-upload="checkFileUpload"
              >
                <el-button size="small" type="primary">上传图片</el-button>
              </el-upload>
            </div>
            <el-input style="width: 60%; margin-bottom: 10px" v-model="descriptions[1].title"></el-input>
            <el-input style="width: 90%" type="textarea" :rows="3" v-model="descriptions[1].content"></el-input>
          </div>
          <div class="company-image-three border-box margin-bottom">
            <div class="upload-img">
              <el-upload
                action="http://jisi.poolbear.cn/Agents/UploadFiles/upload_about_us"
                :headers="headers"
                :data="paramsThreeImage"
                :on-success="handleUploadThreeSuccess"
                :on-error="handleUploadFailed"
                :before-upload="checkFileUpload"
              >
                <el-button size="small" type="primary">上传图片</el-button>
              </el-upload>
            </div>
          </div>
          <div class="company-additional-info border-box margin-bottom">
            <el-input style="width: 90%; height: 120px" :rows="5" type="textarea"  v-model="descriptions[2].content"></el-input>
          </div>
          <div class="company-image-three border-box margin-bottom">
            <div class="upload-img">
              <el-upload
                action="http://jisi.poolbear.cn/Agents/UploadFiles/upload_about_us"
                :headers="headers"
                :data="paramsFourImage"
                :on-success="handleUploadFourSuccess"
                :on-error="handleUploadFailed"
                :before-upload="checkFileUpload"
              >
                <el-button size="small" type="primary">上传图片</el-button>
              </el-upload>
            </div>
          </div>
          <div class="company-additional-info border-box margin-bottom">
            <el-input style="width: 90%; height: 120px" :rows="5" type="textarea" v-model="descriptions[3].content"></el-input>
          </div>
          <div class="save">
            <el-button type="primary" @click="save">保存</el-button>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :md="12">
        <div class="content-box">
          <div class="one-image">
            <img :src="images[0]"/>
          </div>
          <div class="company-description margin-bottom">
            <div class="company-name">
              {{descriptions[0].title}}
            </div>
            <div class="company-desc">
              {{descriptions[0].content}}
            </div>
          </div>
          <div class="company-idea margin-bottom">
            <div class="idea-img">
             <img :src="images[1]">
            </div>
            <div class="idea-title">
              {{descriptions[1].title}}
            </div>
            <div class="idea-content">
              {{descriptions[1].content}}
            </div>

          </div>
          <div class="image-three margin-bottom">
              <img :src="images[2]"/>
          </div>
          <div class="company-additional-info-right border-box margin-bottom">
            {{descriptions[2].content}}
          </div>
          <div class="company-image-three-right border-box margin-bottom">
           <img :src="images[3]">
          </div>
          <div class="company-additional-info-right border-box margin-bottom">
            {{descriptions[3].content}}
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import { getCompany} from '@/api/web'
  import {getToken} from '@/utils/auth'

  export default {
    data() {
      return {
        headers: {
          'Access-Token': getToken()
        },
        paramsOneImage: {
          sorting: 1
        },
        paramsTwoImage: {
          sorting: 2
        },
        paramsThreeImage: {
          sorting: 3
        },
        paramsFourImage: {
          sorting: 4
        },
        images: [],
        descriptions: [
          {title: '', content: ''},
          {title: '', content: ''},
          {content: ''},
          {content: ''}
        ]
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.fetchData()
      })
    },
    methods: {
      handleUploadFailed (err) {
        this.$message({
          message: '文件上传失败',
          type: 'error'
        })
      },
      checkFileUpload (file) {
        console.log('check file', file)
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
      handleUploadOneSuccess (res) {
        this.images[0] = res.data.file.img_url
      },
      handleUploadTwoSuccess (res) {
        this.images[1] = res.data.file.img_url
      },
      handleUploadThreeSuccess (res) {
        this.images[2] = res.data.file.img_url
      },
      handleUploadFourSuccess (res) {
        this.images[3] = res.data.file.img_url
      },
      fetchData() {
        let obj = {}
        obj.type = 'read'
        getCompany(obj).then(res => {
          this.images = res.data.about_us_img
          this.descriptions = res.data.about_us_profile
        })
      },
      save () {
        let obj = {}
        obj.type = 'save'
        obj.about_us_img = this.images
        obj.about_us_profile = this.descriptions
        getCompany(obj).then(res => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.fetchData()
        })
      },
      cancel() {
        this.fetchData()
      },
      handleRemove(file, fileList) {
//        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
//        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
//        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
  }
</script>

<style lang="scss" scoped>
.company-box{
  width: 98%;
  margin: 30px auto;
  .content-box{
    width: 450px;
    margin: 0 auto;
    .border-box{
      border: 1px solid #666666;
    }
    .upload-img{
      margin: 15px auto;
      width: 70px;
    }
    .margin-bottom {
      margin-bottom: 23px;
    }
    .company-image{
      width: 100%;
      padding: 79px 0;
    }
    .company-description{
      height: 131px;
      padding: 10px 5px;
      text-align: center;
      .company-desc{
        padding: 8px 0;
        font-size: 12px;
        line-height: 20px;
      }
    }
    .company-idea{
      padding: 10px 5px;
      text-align: center;
      .idea-img{
        img{
          width: 311px;
          height: 91px;
        }
      }
      .idea-title{
        margin-top: 5px;
      }
      .idea-content{
        padding: 8px 10px;
        font-size: 12px;
        line-height: 20px;
      }
    }
    .company-image-three{
      padding: 64px 0;
    }
    .company-image-three-right{
      img{
        width: 100%;
        height: 175px;
      }
    }
    .image-three{
      img{
        width: 100%;
        height: 200px;
      }
    }
    .company-additional-info{
      padding: 22px 0;
      text-align: center;
    }
    .company-additional-info-right{
      padding: 10px 3px;
      font-size: 12px;
      line-height: 20px;
      text-indent:2em;
    }
    .save{
      text-align: center;
    }
    .one-image{
      img{
        height: 246px;
        width: 100%;
      }
    }
  }
}
</style>
