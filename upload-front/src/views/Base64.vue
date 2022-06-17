<template>
  <div>
    <h1>头像裁剪-base64格式上传</h1>
    <input type="file" @change="changFile">
    <br>
    <br>
    <div class="cropper-box">
      <vueCropper
        ref="cropper"
        :img="imgSrc"
        :autoCrop="true"
      ></vueCropper>
    </div>
    <div @click="base64Upload">裁剪</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import {vueCropperElement} from '../tool/type'
import {UploadBase64} from '../tool/api'
export default defineComponent({
  setup() {
    let imgSrc=ref('')
    let visible=ref(false)
    const cropper=ref(null as unknown as vueCropperElement) 
    const changFile=(e:Event)=>{
      let file= ((e.target as HTMLInputElement).files as FileList)[0] 
      const reader= new FileReader()
      reader.onload=function(evt){
        visible.value=true
        imgSrc.value=(evt.target as FileReader).result as string
      }
      reader.readAsDataURL(file)
    }
    const base64Upload=()=>{
      cropper.value.getCropData((data:string) => {
        UploadBase64({file:data,filename:(new Date).getTime()+'.jpg'})
        .then(res=>{
          if(res.code===0){
            alert('上传成功')
          }
        })
      })
      
    }
    return {
      imgSrc,
      visible,
      cropper,
      base64Upload,
      changFile
    }
  },
  
})
</script>
<style lang="scss" scoped>
.cropper-box{
  position: relative;
  width:300px;
  height: 300px;
  margin:0 auto;
}
</style>