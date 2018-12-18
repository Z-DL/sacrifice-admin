<template>
  <div class="seller-info">
    <h1>商户信息</h1>
    <el-form ref="form" :model="sellerForm" label-width="80px" label-position="left">
      <div class="group">
        <div class="title">
          公开信息
        </div>
        <div class="shop-icon flex-box">
          <div class="shop-icon-title">店铺标志</div>
          <div class="icon-box">
           <!-- <el-upload
              class="upload-demo"
              action="http://jisi.poolbear.cn/Agents/UploadFiles/upload_items_img"
              :on-success="handleSuccess">
              <img v-if="sellerForm.store" class="icon" :src="sellerForm.store"></img>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>-->
            <el-upload
              class="avatar-uploader"
              action="http://jisi.poolbear.cn/Agents/UploadFiles/upload_agents_logo"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :headers="headers">
              <img v-if="sellerForm.store_sign" :src="sellerForm.store_sign" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>

        </div>
        <el-form-item label="商铺名称">
          <el-input v-model="sellerForm.store_name"></el-input>
        </el-form-item>
        <!--<el-form-item label="商铺简介">-->
          <!--<el-input v-model="sellerForm.store_desc"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="认证请况">
          <el-input v-model="sellerForm.type" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="所在省份">
          <!--<el-input v-model="sellerForm.store_province"></el-input>-->
          <el-select filterable v-model="sellerForm.store_province" placeholder="请选择" @change="changeProvince">
            <el-option
              v-for="item in province"
              :key="item.province_id"
              :label="item.province_name"
              :value="item.province_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在城市">
          <!--<el-input v-model="sellerForm.store_city"></el-input>-->
          <el-select filterable v-model="sellerForm.store_city" placeholder="请选择">
            <el-option
              v-for="item in cities"
              :key="item.city_id"
              :label="item.city_name"
              :value="item.city_id">
            </el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="地址">
          <el-cascader
            :options="province"
            @active-item-change="handleProvinceChange"
            :props="props"
            v-model="sellerForm.address"
          ></el-cascader>
        </el-form-item>-->
      </div>
      <div class="group">
        <div class="title">
          注册信息
        </div>
        <el-form-item label="法人代表">
          <el-input v-model="sellerForm.legal_person" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="sellerForm.actual_name" :disabled="true"></el-input>
        </el-form-item disabled>
        <el-form-item label="联系电话">
          <el-input v-model="sellerForm.contact_number" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="开户行">
          <el-input v-model="sellerForm.bank_of_deposit" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="对公账户">
          <el-input v-model="sellerForm.bank_account" :disabled="true"></el-input>
        </el-form-item>
        <div class="remarks">
          如商户资质信息有变动，请重新申请认证
        </div>
      </div>
      <el-form-item style="text-align: center">
        <el-button type="primary" @click="save">保存更改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
  import { getSellersInfo, saveSellersInfo, getProvince, getCity, test } from '@/api/sellers'
  import { getToken } from '@/utils/auth'
export default{
  data () {
    return {
      sellerForm: {
      },
      headers: {
        'Access-Token': getToken()
      },
      province: [],
      cities: [],
      /*props: {
        value: 'province_id',
        label: 'province_name',
        children: 'city'
      }*/
    }
  },
  beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.getProvince()
      })
  },
  created () {
      this.fetchData()
//      this.getProvince()
  },
  methods :{
    changeProvince (value) {
      console.log('change province', value)
      this.getCity(value)
    },
    getProvince () {
      getProvince().then(response => {
        let pro = response.data
        this.province = pro
      })
    },
    getCity (val) {
      let params = {}
      params.province_id = val
      getCity(params).then(response => {
        let res = response.data
        if (res) {
          this.cities = res
        }
      })
    },
    handleProvinceChange (val) {
        let obj = {}
        obj.province_id = val[0]
        this.getCity(obj)
    },
    fetchData() {
      getSellersInfo().then(response => {
       this.sellerForm = response.data
      })
    },
    handleAvatarSuccess(res, file) {
      this.sellerForm.store_sign = res.data.file.img_url
    },
    save () {
      let seller = {}
      seller.store_sign = this.sellerForm.store_sign
      seller.store_name = this.sellerForm.store_name
      seller.store_province = this.sellerForm.store_province
      seller.store_city = this.sellerForm.store_city
      saveSellersInfo(seller).then(res => {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.fetchData()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .seller-info{
    padding: 15px 73px 42px 42px;
    h1{
      font-size: 16px;
    }
   .group{
     padding: 19px 47px 15px 11px;
     background-color: white;
     margin-bottom: 15px;
     .title{
       font-size: 16px;
       margin-bottom: 20px;
     }
     .shop-icon{
       margin-bottom: 20px;
       .shop-icon-title{
         font-size: 14px;
       }
       .icon-box{
         width: 94%;
         text-align: center;
       }
       .icon{
         height: 50px;
         width: 50px;
         border-radius: 4px;
       }
     }
     .remarks{
       color: #48576a;
       font-size: 14px;
     }
   }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    /*position: relative;*/
    /*overflow: hidden;*/
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 16px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .avatar {
    width: 50px;
    height: 50px;
    display: block;
  }
</style>
