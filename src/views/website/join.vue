<template>
    <div class="join-container">
        <el-button type="primary">修改加盟页详情</el-button>
        <div class="join-content-container">
            <el-row :gutter="40">
                <el-col :span="12">
                    <h4>修改内容：</h4>
                    <div class="upload-box">
                        <el-upload
                            class="upload-demo"
                            drag
                            action="http://jisi.poolbear.cn/Agents/UploadFiles/upload_join_us"
                            :headers="headers"
                            :file-list="fileList"
                            :multiple="false"
                            :before-upload="beforeUpload"
                            :on-success="sucHandle">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
                        </el-upload>
                    </div>
                    <div class="content-box">
                        <el-input v-model="adTitle" placeholder="请输入标题" class="content-title"></el-input>
                        <el-input v-model="proContent" placeholder="一句话概括" class="content-title" style="display:block;width:100%;margin-top:10px;"></el-input>
                        <el-row>
                            <el-col :span="12" class="p20">
                                <el-input type="text" v-model="focus[0]" class="focus-style"></el-input>
                                <el-input type="text" v-model="title[0]" class="title-style"></el-input>
                                <el-input type="textarea" v-model="detail[0]" class="detail-style"></el-input>
                            </el-col>
                            <el-col :span="12" class="p20">
                                <el-input type="text" v-model="focus[1]" class="focus-style"></el-input>
                                <el-input type="text" v-model="title[1]" class="title-style"></el-input>
                                <el-input type="textarea" v-model="detail[1]" class="detail-style"></el-input>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12" class="p20">
                                <el-input type="text" v-model="focus[2]" class="focus-style"></el-input>
                                <el-input type="text" v-model="title[2]" class="title-style"></el-input>
                                <el-input type="textarea" v-model="detail[2]" class="detail-style"></el-input>
                            </el-col>
                            <el-col :span="12" class="p20">
                                <el-input type="text" v-model="focus[3]" class="focus-style"></el-input>
                                <el-input type="text" v-model="title[3]" class="title-style"></el-input>
                                <el-input type="textarea" v-model="detail[3]" class="detail-style"></el-input>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="bottom-box">
                        <el-input v-model="coTitle" placeholder="请输入标题" class="content-title"></el-input>
                        <el-row class="p20" :gutter="10">
                            <el-col :span="8">
                                <el-input type="text" v-model="step[0]" class="step-style"></el-input>
                                <el-input type="textarea" v-model="stepContent[0]"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <el-input type="text" v-model="step[1]" class="step-style"></el-input>
                                <el-input type="textarea" v-model="stepContent[1]"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <el-input type="text" v-model="step[2]" class="step-style"></el-input>
                                <el-input type="textarea" v-model="stepContent[2]"></el-input>
                            </el-col>
                        </el-row>
                        <el-row class="p20" :gutter="10">
                            <el-col :span="8">
                                <el-input type="text" v-model="step[3]" class="step-style"></el-input>
                                <el-input type="textarea" v-model="stepContent[3]"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <el-input type="text" v-model="step[4]" class="step-style"></el-input>
                                <el-input type="textarea" v-model="stepContent[4]"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <el-input type="text" v-model="step[5]" class="step-style"></el-input>
                                <el-input type="textarea" v-model="stepContent[5]"></el-input>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="statement-box">
                        <p>因支付第三方管控7到8个工作日结算一次</p>
                        <p>申请加盟</p>
                    </div>
                    <el-button class="btn" type="primary" @click="saveHandle">保存</el-button>
                </el-col>
                <el-col :span="12" style="border-left: 1px solid #555;">
                    <h4>页面结构：</h4>
                    <div class="page-container">
                        <div class="top-banner" :style="{backgroundImage:`url(${imgUrl})`}"></div>
                        <div class="us-adv-box">
                        <div class="us-adv-title">{{adTitle}}</div>
                        <div class="us-adv-content">{{proContent}}</div>
                        <div class="advs-box flex-box">
                            <div class="adv-box" v-for="(item,index) in leading1" :key="index">
                                <div class="adv-img">{{item.focus}}</div>
                                <h2>{{item.title}}</h2>
                                <p>{{item.content}}</p>
                            </div>
                        </div>
                        <div class="advs-box flex-box">
                            <div class="adv-box" v-for="(item,index) in leading2" :key="index">
                                <div class="adv-img">{{item.focus}}</div>
                                <h2>{{item.title}}</h2>
                                <p>{{item.content}}</p>
                            </div>
                        </div>
                        </div>
                        <div class="cooperation-box">
                        <div class="cooperation-title">合作流程</div>
                        <div class="cooperation-content flex-box">
                            <div class="coo-item-box flex-item" v-for="(step,index) in steps1" :key="index">
                            <div class="bg-box">{{step.title}}</div>
                            <div class="square">{{index+1}}</div>
                            <p class="coo-text">{{step.content}}</p>
                            </div>
                        </div>
                        <div class="cooperation-content flex-box">
                            <div class="coo-item-box flex-item" v-for="(step,index) in steps2" :key="index">
                            <div class="bg-box">{{step.title}}</div>
                            <div class="square">{{index+4}}</div>
                            <p class="coo-text">{{step.content}}</p>
                            </div>
                        </div>
                        </div>
                        <div class="notice-box">
                            <h2>因支付第三方管控 7到8个工作日结算一次</h2>
                            <div class="join">申请加盟</div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import {joinData} from '@/api/web'
import {getToken} from '@/utils/auth'
export default {
    data() {
        return {
            adTitle: '我们的平台有什么',
            focus: ['唯一','团队','推广','便捷'],
            title: ['世纪墓园网2','完善的专业团队2','全覆盖的广告推广2','方便快捷的网络平台2'],
            detail: ['中国唯一一家提供代祭祀的网络平台2','提供给加盟商专业的客户、服务人员及技术人员','网络、电视、新闻全覆盖的推广，吸引更多的消费客户','多端网络平台同时上线，达到最高的使用需求'],
            coTitle: '合作流程',
            proContent: '覆盖全国各地的公墓商家，覆盖网络通过电视媒体等大范围推广',
            step: ['申请加盟','审核资料','补充信息','上传商品','营销','售后服务'],
            stepContent: ['步骤一的简要说明','步骤二的简要说明','步骤三的简要说明','步骤四的简要说明','步骤五的简要说明','步骤六的简要说明'],
            type: 'read',
            headers: {
                'Access-Token': getToken()
            },
            bannerImg: '',
            profile: {},
            leading1: [],
            leading2: [],
            steps: [],
            imgUrl: '',
            fileList: []
        }
    },
    computed: {
        steps1 () {
            return this.steps.slice(0, 3)
        },
        steps2 () {
            return this.steps.slice(3)
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            joinData().then(res => {
                if(res.code === 200) {
                    let data = res.data 
                    this.imgUrl = data.join_us_img
                    let imgName = data.join_us_img.substring(data.join_us_img.lastIndexOf('/')+1)
                    this.fileList = [{name: imgName, url: data.join_us_img}]
                    this.adTitle = data.join_us_profile.title
                    this.proContent = data.join_us_profile.content
                    this.leading1 = data.join_us_leading.slice(0,2)
                    this.leading2 = data.join_us_leading.slice(2)
                    this.steps = data.join_us_step
                    this.focus.splice(0, this.focus.length)
                    this.title.splice(0, this.title.length)
                    this.detail.splice(0, this.detail.length)
                    this.step.splice(0, this.step.length)
                    this.stepContent.splice(0, this.stepContent.length)
                    for(let i=0;i<data.join_us_leading.length;i++) {
                        this.focus.push(data.join_us_leading[i].focus)
                        this.title.push(data.join_us_leading[i].title)
                        this.detail.push(data.join_us_leading[i].content) 
                    }
                    for(let j=0;j<data.join_us_step.length;j++) {
                        this.step.push(data.join_us_step[j].title)
                        this.stepContent.push(data.join_us_step[j].content)
                    }
                }
            })
        },
        saveHandle() {
            let join_us_leading = []
            let join_us_step = []
            this.type = 'save'
            for(let i=0;i<this.title.length;i++){
                let temp = {
                    focus: this.focus[i],
                    title: this.title[i],
                    content: this.detail[i]
                }
                join_us_leading.push(temp)
            }
            for(let j=0;j<this.step.length;j++){
                let temp = {
                    title: this.step[j],
                    content: this.stepContent[j]
                }
                join_us_step.push(temp)
            }
            let join_us_profile = {title: this.coTitle, content: this.proContent}
            joinData(this.type,this.join_us_img,join_us_leading,join_us_profile,join_us_step ).then(res => {
                this.$message({
                    type: 'success',
                    message: '保存成功!'
                });
                this.getData()
            })
        },
        sucHandle(res, file) {
            this.join_us_img = res.data.file.img_url
        },
        beforeUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
            const isLt5M = file.size / (1024 * 1024) < 5;
            if (!isJPG) {
            this.$message.error('上传图片只能是jpg、jpeg、png格式!');
            }
            if (!isLt5M) {
            this.$message.error('上传图片大小不能超过 5MB!');
            }
            return isJPG && isLt5M;
        }
    }
}
</script>

<style lang="scss" scoped>
.join-container{
    padding: 20px;
    .join-content-container{
        text-align: center;
        margin-top: 20px;
        .upload-box,
        .content-box,
        .bottom-box,
        .statement-box{
            margin-top: 10px;
            padding: 10px;
            border: 1px solid #ccc;
            background-color: #fff;
            text-align: center;
            padding: 10px;
            .p20{
                padding: 20px;
            }
            .content-title{
                width: 180px;
                margin: 0 auto;
            }
            .focus-style{
                width: 60px;
                height: 52px;
            }
            .title-style{
                width: 150px;
                height: 35px;
                display: block;
                margin: 0 auto 10px;
            }
            
        }
        .step-style{
            width: 80px;
            height: 35px;
            margin: 0 auto 10px;
        }
    }
    .btn{
        margin-top: 20px;
    }
}
.page-container{
    background-color: #F1F1F1;
    padding-bottom: 10px;
    width: 375px;
    margin: 0 auto;
}
.top-banner{
    width: 100%;
    height: 130px;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .us-adv-box{
    background: url('~/static/img/middle.jpg');
    background-size: cover;
    text-align: center;
    padding: 20px 30px;
    box-sizing: border-box;
    .us-adv-title{
      font-size: 24px;
      margin-bottom: 20px;
    }
    .us-adv-content{
      font-size:12px;
      line-height: 30px;
    }
    .advs-box{
      width: 100%;
      margin-top: 20px;
      .adv-box{
        width: 50%;
        float: left;
        .adv-img{
          width: 100px;
          height: 100px;
          line-height: 100px;
          text-align: center;
          writing-mode: vertical-lr;/*从左向右 从右向左是 writing-mode: vertical-rl;*/
          margin: 0 auto;
          background: url('~/static/img/icon-circle.png') no-repeat center center;
          background-size: cover;
          font-size:20px;
        }
        h2{
          font-size:12px;
          font-weight: 700;
          margin: 10px 0;
          text-align: center;
        }
        p{
            font-size:12px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -moz-box-orient: vertical;
            box-orient: vertical;
            -webkit-line-clamp: 2;
            line-height: 20px;
            padding: 0 10px;
            text-align: center;
        }
      }
    }
  }
.cooperation-box{
.cooperation-title{
    text-align: center;
    line-height: 80px;
    font-size:24px;
    background: url('~/static/img/bottom.jpg');
    background-size: cover;
}
.cooperation-content{
    padding: 10px 30px 0;
    box-sizing: border-box;
    .coo-item-box{
    box-sizing: border-box;
    margin-bottom: 10px;
    .bg-box{
        width: 68px;
        height: 74px;
        line-height: 72px;
        text-align: center;
        background: url('~/static/img/dialog.png') no-repeat center center;
        background-size: cover;
        margin: 0 auto;
        font-size:12px;
    }
    .square{
        width: 20px;
        height: 20px;
        background-color: #FF0000;
        text-align: center;
        line-height: 20px;
        color: #fff;
        margin: 4px auto 20px;
        font-size:14px;
    }
    .coo-text{
        text-align: center;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -moz-box-orient: vertical;
        box-orient: vertical;
        -webkit-line-clamp: 2;
        font-size:12px;
    }
    }
}
}
.notice-box{
    text-align: center;
    margin: 20px 0 0;
    h2{
        font-weight: 700;
        color: red;
        font-size:16px;
    }
    .join{
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #000;
        border-radius: 40px;
        margin: 20px auto;
        font-weight: 700;
        font-size:12px;
    }
}
</style>

