<template>
    <div class="news-detail-container">
        <!-- <el-button type="primary">发布新闻</el-button> -->
        <el-form label-position="left">
            <el-form-item label="新闻标题：">
                <el-input v-model="newsTitle" placeholder="请输入新闻的标题" style="width:50%;"></el-input>
            </el-form-item>
            <el-form-item label="新闻首页图片：">
                <el-upload
                    class="upload-demo"
                    :on-success="sucHandle"
                    :data="param"
                    :action="url"
                    :before-upload="beforeUpload"
                    :headers="headers">
                <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item label="是否置顶：">
                <el-switch
                    v-model="toTop"
                    on-color="#13ce66"
                    off-color="#ff4949"
                    on-value="1"
                    off-value="0">
                </el-switch>
            </el-form-item>
        </el-form>
        <div class="news-container">
            <tinymce 
                :height="300" 
                :url="url" 
                v-model="content" 
                @on-upload-success= "onEditorUploadComplete"
                @on-upload-fail   = "onEditorUploadFail"
                id='tinymce'>
            </tinymce>
        </div>
        <el-button style="margin-top:10px;" type="primary" @click="saveNews">保存</el-button>
    </div>
</template>
<script>
// import mceEditor from '@/components/Tinymce'
import Tinymce from '@/components/Tinymce'
import {getToken} from '@/utils/auth'
import {saveHandle} from '@/api/manage'
export default {
    data() {
        return {
            newsTitle: '',
            toTop: true,
            imgUrl: '',
            headers: {
                'Access-Token': getToken()
            },
            param: {
                state: 'title'
            },
            content:
                `<h1 style="text-align: center;">欢迎使用 TinyMCE 富文本编辑器!</h1><p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="//www.tinymce.com/images/glyph-tinymce@2x.png" alt="TinyMCE Logo" width="110" height="97" /><ul>
                    <li>您可以像使用word一样对文本进行样式修改；</li><li>支持上传本地图片及网络上的图片；</li><li>一起探索它更多的功能吧！</li>
                </ul>`,
            url: 'http://jisi.poolbear.cn/Agents/UploadFiles/upload_news_img',
        }
    },
    created() {

    },
    methods: {
        saveNews() {
            saveHandle(this.newsTitle,this.imgUrl,this.toTop,this.content).then(res => {
                this.$message({
                    type: 'success',
                    message: '保存成功!'
                });
            })
        },
        sucHandle(res) {
            this.imgUrl = res.data.file.img_url
        },
        onEditorUploadComplete(json, success) {
            success()
        },
        onEditorUploadFail() {
            this.$message.error('上传失败!')
        },
        beforeUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
            const isLt5M = file.size / (1024 * 1024 * 5) < 5;
            if (!isJPG) {
            this.$message.error('上传图片只能是jpg、jpeg、png格式!');
            }
            if (!isLt5M) {
            this.$message.error('上传图片大小不能超过 5MB!');
            }
            return isJPG && isLt5M;
        }
    },
    components: {
        Tinymce
        // mceEditor
    }
}
</script>
<style lang="scss">
.news-detail-container{
    padding: 20px;
    .news-container{
        margin-top: 20px;
        background-color: #fff;
    }
}
</style>

