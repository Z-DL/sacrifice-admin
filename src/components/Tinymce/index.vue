<template>
  <div class="tinymce-container editor-container">
    <textarea class="tinymce-textarea" :id="tinymceId"></textarea>
    <div class="editor-custom-btn-container">
      <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK"></editorImage>
    </div>
  </div>
</template>

<script>
import editorImage from './components/editorImage'
import plugins from './plugins'
import toolbar from './toolbar'
import {getToken} from '@/utils/auth'

export default {
  name: 'tinymce',
  components: { editorImage },
  props: {
    id: {
      type: String
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    maxSize: {
        default: 1024*1024*5,
        type: Number
    },
    accept: {
        default: 'image/jpeg, image/png, image/jpg',
        type: String
    },
    url: {
        type: String
    },
    menubar: {
      default: 'file edit insert view format table'
    },
    height: {
      type: Number,
      required: false,
      default: 360
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id || 'vue-tinymce-' + +new Date()
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() => window.tinymce.get(this.tinymceId).setContent(val))
      }
    }
  },
  mounted() {
    this.initTinymce()
  },
  activated() {
    this.initTinymce()
  },
  deactivated() {
    this.destroyTinymce()
  },
  methods: {
    initTinymce() {
      const _this = this
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        language: 'zh_CN',
        images_upload_handler: function (blobInfo, success, failure) {
            if (blobInfo.blob().size > _this.maxSize) {
                failure('文件体积过大')
            }
            if (_this.accept.indexOf(blobInfo.blob().type) >= 0) {
                uploadPic()
            } else {
                failure('图片格式错误')
            }
            function uploadPic () {
                const xhr = new XMLHttpRequest()
                const formData = new FormData()
                xhr.open('POST', _this.url)
                xhr.setRequestHeader('Access-Token',getToken())
                xhr.onload = function () {
                    if (xhr.status !== 200) {
                        // 抛出 'on-upload-fail' 钩子
                        _this.$emit('on-upload-fail')
                        failure('上传失败: ' + xhr.status)
                        return
                    }
                    const json = JSON.parse(xhr.responseText)
                    // 抛出 'on-upload-success' 钩子
                    const imgUrl = json.data.file.img_url
                    window.tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${imgUrl}" >`)
                    _this.$emit('on-upload-success' , json, success)
                }
                formData.append('file', blobInfo.blob())
                formData.append('state','content')
                xhr.send(formData)
            }
        },
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent({ format: 'raw' }))
          })
        }
      })
    },
    destroyTinymce() {
      if (window.tinymce.get(this.tinymceId)) {
        window.tinymce.get(this.tinymceId).destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
    imageSuccessCBK(arr) {
      const _this = this
      console.log('imageSuccessCBK')
      arr.forEach(v => {
        window.tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`)
      })
    }
  },
  destroyed() {
    this.destroyTinymce()
  }
}
</script>

<style scoped>
.tinymce-container {
  position: relative
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}
.editor-upload-btn {
  display: inline-block;
}
</style>
