<template>
  <div class="home-wrapper">
    <el-row>
      <el-col :xs="24" :md="12">
        <div class="home-left">
          <div class="home-title">
            修改内容
          </div>
          <div class="home-form">
            <div class="no1">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="form.home_title">
              </el-input>
            </div>
            <div class="no2">
              <el-upload
                class="upload_home_banner_one"
                ref="upload_home_banner_one"
                action="http://jisi.poolbear.cn/Agents/UploadFiles/upload_home_banner_one"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :headers="headers"
                :before-remove="beforeRemove"
                :auto-upload="false"
                :limit="5"
                name="sorting"
                :on-exceed="handleExceed"
                :file-list="banner_1">
                <el-button slot="trigger" size="small" type="primary">点击选取第一组轮播图</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success"
                           @click="submitUpload('upload_home_banner_one')">上传到服务器
                </el-button>
                <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5M</div>-->
              </el-upload>
            </div>
            <div class="no3">
              <el-input v-model="form.home_effect.title"
                        placeholder="请输入标题"
              ></el-input>
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="form.home_effect.content">
              </el-input>
            </div>
            <div class="no4">
              <el-upload
                class="upload_home_profile"
                ref="upload_home_profile"
                action="http://jisi.poolbear.cn/Agents/UploadFiles/upload_home_profile"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :headers="headers"
                :auto-upload="false"
                :file-list="profile_img"
                list-type="picture">
                <el-button slot="trigger" size="small" type="primary">点击选取公司描述图片</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success"
                           @click="submitUpload('upload_home_profile')">上传到服务器
                </el-button>
              </el-upload>
            </div>
            <div class="no3">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="form.home_profile.content">
              </el-input>
            </div>
            <div class="no2">
              <el-upload
                class="upload_home_banner_two"
                ref="upload_home_banner_two"
                action="http://jisi.poolbear.cn/Agents/UploadFiles/upload_home_banner_two"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :headers="headers"
                :before-remove="beforeRemove"
                :auto-upload="false"
                :limit="5"
                name="sorting"
                :on-exceed="handleExceed"
                :file-list="banner_2">
                <el-button slot="trigger" size="small" type="primary">点击选取第二组轮播图</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success"
                           @click="submitUpload('upload_home_banner_two')">上传到服务器
                </el-button>
                <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5M</div>-->
              </el-upload>
            </div>
            <div class="no6">
              <div class="title">我们的<span>六</span>大优势</div>
              <div class="content">
                <el-row>
                  <el-col :span="8">
                    <div class="num">{{1}}</div>
                    <div class="titles">
                      <el-input size="mini"
                                placeholder="请输入标题"
                                v-model="form.home_join['0'].title"></el-input>
                    </div>
                    <div class="details">
                      <el-input size="mini"
                                placeholder="请输入内容"
                                type="textarea"
                                v-model="form.home_join['0'].content"></el-input>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="num">{{2}}</div>
                    <div class="titles">
                      <el-input size="mini"
                                placeholder="请输入标题"
                                v-model="form.home_join['1'].title"></el-input>
                    </div>
                    <div class="details">
                      <el-input size="mini"
                                placeholder="请输入内容"
                                type="textarea" v-model="form.home_join['1'].content"></el-input>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="num">{{3}}</div>
                    <div class="titles">
                      <el-input size="mini"
                                placeholder="请输入标题"
                                v-model="form.home_join['2'].title"></el-input>
                    </div>
                    <div class="details">
                      <el-input size="mini"
                                placeholder="请输入内容"
                                type="textarea" v-model="form.home_join['2'].content"></el-input>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <div class="num">{{4}}</div>
                    <div class="titles">
                      <el-input size="mini"
                                placeholder="请输入标题" v-model="form.home_join['3'].title"></el-input>
                    </div>
                    <div class="details">
                      <el-input size="mini" placeholder="请输入内容" type="textarea"
                                v-model="form.home_join['3'].content"></el-input>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="num">{{5}}</div>
                    <div class="titles">
                      <el-input size="mini" placeholder="请输入标题" v-model="form.home_join['4'].title"></el-input>
                    </div>
                    <div class="details">
                      <el-input size="mini" placeholder="请输入内容" type="textarea"
                                v-model="form.home_join['4'].content"></el-input>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="num">{{6}}</div>
                    <div class="titles">
                      <el-input size="mini" placeholder="请输入标题" v-model="form.home_join['5'].title"></el-input>
                    </div>
                    <div class="details">
                      <el-input size="mini" placeholder="请输入内容" type="textarea"
                                v-model="form.home_join['5'].content"></el-input>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="submit">
              <el-button type="danger" @click="onSubmit()">提交修改内容</el-button>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :md="12">
        <div class="home-right">
          <div class="home-title">
            页面结构
          </div>
          <div class="home-construction">
            <div class="no1">
              {{homeData.home_title}}
            </div>
            <div class="no2">
              <el-carousel height="200px" indicator-position="none">
                <el-carousel-item v-for="item in home_banner_1" :key="item">
                  <img style="width: 100%" :src="item" alt="">
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="no3">
              <div class="title">
                {{homeData.home_effect.title}}
              </div>
              <div class="content">
                {{homeData.home_effect.content}}
              </div>
            </div>
            <div class="no4">
              <img style="width: 100%" :src="homeData.home_profile_img" alt="">
            </div>
            <div class="no5">
              <div class="content">
                {{homeData.home_profile.content}}
              </div>
              <div class="btn">
                了解更多
              </div>
            </div>
            <div class="no2">
              <el-carousel height="200px" indicator-position="none">
                <el-carousel-item v-for="item in home_banner_2" :key="item">
                  <img style="width: 100%" :src="item" alt="">
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="no6">
              <div class="title">我们的<span>六</span>大优势</div>
              <div class="content">
                <el-row>
                  <el-col :span="8" v-for="(item, index) in home_join.slice(0,3)" :key="item.title">
                    <div class="num">{{index + 1}}</div>
                    <div class="titles">{{item.title}}</div>
                    <div class="details">{{item.content}}</div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8" v-for="(item, index) in home_join.slice(3)" :key="item.title">
                    <div class="num">{{index + 4}}</div>
                    <div class="titles">{{item.title}}</div>
                    <div class="details">{{item.content}}</div>
                  </el-col>
                </el-row>
              </div>
              <div class="btn">加入我们</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {getIndex, uploadImg} from '@/api/web'
  import {getToken} from '@/utils/auth'

  export default {
    data() {
      return {
        headers: {
          'Access-Token': getToken()
        },
        homeData: {
          home_title: '', //第一部分文字
          home_banner_1: [],//第一组轮播图片地址，5张图片，数组格式
          home_effect: {
            content: '',
            title: '',
          },//作用简介，数组格式
          home_profile_img: '',//公司简介图片
          home_profile: {
            content: '',
            title: '',
          },//公司简介，数组格式
          home_banner_2: {
            '0': '',
            '1': '',
            '2': '',
            '3': '',
            '4': '',
            '5': '',
          },//第二组轮播图片地址，5张图片，数组格式
          home_join: {
            '0': {
              content: '',
              title: ''
            },
            '1': {
              content: '',
              title: ''
            },
            '2': {
              content: '',
              title: ''
            },
            '3': {
              content: '',
              title: ''
            },
            '4': {
              content: '',
              title: ''
            },
            '5': {
              content: '',
              title: ''
            },
          },//招商简介，数组格式
        },
        home_profile_img: [],
        profile_img: [],
        home_banner_1: [],
        banner_1: [],
        home_banner_2: [],
        banner_2: [],
        home_join: [],
        form: {
          home_title: '',
          home_banner_1: {
            '0': '',
            '1': '',
            '2': '',
            '3': '',
            '4': '',
            '5': '',
          },
          home_effect: {
            content: '',
            title: '',
          },
          home_profile_img: '',
          home_profile: {
            content: '',
            title: '',
          },
          home_banner_2: {
            '0': '',
            '1': '',
            '2': '',
            '3': '',
            '4': '',
            '5': '',
          },
          home_join: {
            '0': {
              content: '',
              title: ''
            },
            '1': {
              content: '',
              title: ''
            },
            '2': {
              content: '',
              title: ''
            },
            '3': {
              content: '',
              title: ''
            },
            '4': {
              content: '',
              title: ''
            },
            '5': {
              content: '',
              title: ''
            },
          },
        },
        rules: {
          home_title: [
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
      fetchData() {
        getIndex({type: 'read'}).then(res => {
          if (res.code === 200) {
            this.homeData = res.data
            this.form = JSON.parse(JSON.stringify(res.data))
            this.home_banner_1 = []
            this.home_banner_2 = []
            this.home_join = []
            for (let item of Object.keys(res.data.home_banner_1)) {
              this.home_banner_1.push(res.data.home_banner_1[item])
            }
            for (let item of Object.keys(res.data.home_banner_2)) {
              this.home_banner_2.push(res.data.home_banner_2[item])
            }
            for (let item of Object.keys(res.data.home_join)) {
              this.home_join.push(res.data.home_join[item])
            }
          }
        })
      },
      cancel() {
        this.fetchData()
      },
      onSubmit() {
        /*if (!this.form.commodity_img_url) {
          return this.$message({
            message: '图片为空，请先选择图片并且上传服务器再进行内容发布',
            type: 'warning'
          });
        }*/
        getIndex({type: 'save', ...this.form}).then(res => {
          if (res.code == 200) {
            this.$message({
              message: '恭喜你，首页界面修改成功',
              type: 'success'
            });
            this.form = {
              home_title: '',
              home_banner_1: {
                '0': '',
                '1': '',
                '2': '',
                '3': '',
                '4': '',
                '5': '',
              },
              home_effect: {
                content: '',
                title: '',
              },
              home_profile_img: '',
              home_profile: {
                content: '',
                title: '',
              },
              home_banner_2: {
                '0': '',
                '1': '',
                '2': '',
                '3': '',
                '4': '',
                '5': '',
              },
              home_join: {
                '0': {
                  content: '',
                  title: ''
                },
                '1': {
                  content: '',
                  title: ''
                },
                '2': {
                  content: '',
                  title: ''
                },
                '3': {
                  content: '',
                  title: ''
                },
                '4': {
                  content: '',
                  title: ''
                },
                '5': {
                  content: '',
                  title: ''
                },
              },
            }
            this.home_profile_img = []
            this.profile_img = []
            this.home_banner_1 = []
            this.banner_1 = []
            this.home_banner_2 = []
            this.banner_2 = []
            this.home_join = []
            this.fetchData()
          } else {
            this.$message({
              message: '首页界面修改失败',
              type: 'error'
            });
          }
        })
      },
      submitUpload(ref) {
        if (!this.$refs[ref].uploadFiles.length) {
          return this.$message({
            message: '图片为空，请先选择图片并且上传服务器再进行内容发布',
            type: 'warning'
          });
        }
        let file = this.$refs[ref].uploadFiles
        for (let i = 0; i < file.length; i++) {
          if (file[i].size>5*1024*1024) {
            this.$message({
              message: '图片最大不能超过5M',
              type: 'warning'
            })
            break
          }
          uploadImg(file[i].raw, ref, i + 1).then(res => {
            if (res.code === 200) {
              if (ref === 'upload_home_profile') {
                this.form.home_profile_img = res.data[0].img_url
              } else if (ref === 'upload_home_banner_one') {
                this.form.home_banner_1[i + ''] = res.data[0].img_url
              } else if (ref === 'upload_home_banner_two') {
                this.form.home_banner_2[i + ''] = res.data[0].img_url
              }

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
        }
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home-wrapper {
    padding: 20px;
    .home-left {
      border-right: 1px solid #1f2d3d;
      height: 1400px;
      padding-bottom: 100px;
      .home-form {
        width: 370px;
        margin: 0 auto;
        /*background: red;*/
        .no1 {
          height: 100px;
          box-sizing: border-box;
          padding: 20px;
          border: 1px solid #666666;
        }
        .no2 {
          height: 200px;
          box-sizing: border-box;
          padding: 20px;
          overflow: hidden;
          border: 1px solid #666666;
        }
        .no3 {
          height: 150px;
          box-sizing: border-box;
          padding: 20px;
          border: 1px solid #666666;
        }
        .no4 {
          height: 150px;
          box-sizing: border-box;
          padding: 20px;
          overflow: hidden;
          border: 1px solid #666666;
        }
        .no6 {
          text-align: center;
          padding: 20px;
          .title {
            padding-bottom: 20px;
            font-size: 14px;
            font-weight: 600;
            span {
              font-size: 16px;
            }
          }
          .content {
            .num {
              width: 60px;
              margin: 0 auto;
              height: 60px;
              line-height: 60px;
              font-size: 40px;
            }
            .titles {
              font-size: 14px;
              font-weight: 600;
              padding: 10px 0 5px;
              /*line-height: 30px;*/
            }
            .details {
              font-size: 12px;
              padding-bottom: 20px;
            }
          }
        }
      }
      .submit {
        text-align: center;
      }
    }
    .home-right {
      .home-construction {
        width: 370px;
        margin: 0 auto;
        background: url("../../assets/images/home/indexbg.png");
        height: 600px;
        .no1 {
          text-align: center;
          padding: 20px 0;
          font-size: 16px;
          width: 200px;
          margin: 0 auto;
        }
        .no2 {
          overflow: hidden;
        }
        .no3 {
          text-align: center;
          padding: 20px 60px;
          font-size: 16px;
          width: 100%;
          background: url("../../assets/images/home/qiniu.png");
          background-size: cover;
          .title {
            font-weight: 600;
            line-height: 30px;
          }
          .content {
            font-size: 12px;
          }
        }
        .no4 {
          width: 100%;
          height: 210px;
          overflow: hidden;
        }
        .no5 {
          background: url("../../assets/images/home/knowmore.png");
          background-size: cover;
          .content {
            padding: 30px 60px;
            font-size: 12px;
            font-weight: 600;
            text-align: center;

          }
          .btn {
            background: url("../../assets/images/home/btnbg.png") no-repeat center center;
            background-size: 100%;
            text-align: center;
            width: 100%;
            margin: 0 auto;
            height: 60px;
            line-height: 40px;
            color: white;
          }
        }
        .no6 {
          text-align: center;
          padding: 20px;
          background: url("../../assets/images/home/youshi.png");
          background-size: 100%;
          .title {
            padding-bottom: 20px;
            font-size: 14px;
            font-weight: 600;
            span {
              font-size: 16px;
            }
          }
          .content {
            .num {
              width: 60px;
              margin: 0 auto;
              height: 60px;
              line-height: 60px;
              font-size: 40px;
              background: url("../../assets/images/home/she.png") no-repeat;
              background-size: cover;
            }
            .titles {
              font-size: 14px;
              font-weight: 600;
              padding: 10px 0 5px;
              /*line-height: 30px;*/
            }
            .details {
              font-size: 12px;
              padding-bottom: 20px;
            }
          }
          .btn {
            background: url("../../assets/images/home/btnbg.png") no-repeat center center;
            background-size: 100%;
            text-align: center;
            width: 100%;
            margin: 0 auto;
            height: 60px;
            line-height: 40px;
            color: white;
          }
        }
      }
    }
    .home-title {
      text-align: center;
      padding-bottom: 20px;
      font-size: 16px;
      width: 200px;
      margin: 0 auto;
    }

  }

</style>
