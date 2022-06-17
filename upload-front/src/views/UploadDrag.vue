<template>
  <div>
    <h2>拖拽上传</h2>
    <div id="dragBox" :class="{active:dragActive}" @dragenter="dragEnter" @dragover="dragOver" @drop="drop" @dragleave="dragLeave">
      将文件拖到此处
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue-demi";

import { UploadSingle } from "../tool/api";
import { ElMessage } from 'element-plus'
  const uploadMany=(files:FileList)=>{
    const upFiles = [...files]
    const _files= upFiles.map((item:File)=>{
      let formData = new FormData();
        formData.append("file", item);
        formData.append("filename", item.name);
        UploadSingle(formData)
          .then((res) => {
            const { code,url } = res;
            if (code === 0) {
              Promise.resolve(url)
            }else{
              Promise.reject('上传失败')
            }
          })
    })
    Promise.all(_files).then((res) => {
      let message='文件上传成功'
      if(res.length>1){
        message='批量上传成功'
      }
      ElMessage({
        message,
        type: 'success',
      })
    })
    .catch(()=>{
      ElMessage({
        message: '上传失败',
        type: 'error',
      })
    })
  }

let dragActive=ref(false)
//拖拽进入
const dragEnter=(e:Event)=>{
  console.log(11111);
  dragActive.value=true
  e.stopPropagation()
  e.preventDefault()
}
//拖拽中
const dragOver=(e:Event)=>{
  console.log(22222);
  e.stopPropagation()
  e.preventDefault()
}

//拖拽放下
const drop=(e)=>{
  console.log(3333333);
  dragActive.value=false
  e.preventDefault();
  const files=e.dataTransfer.files
  console.log(files);
  uploadMany(files)
  
}
const dragLeave=(e:Event)=>{
  console.log(444444);
  dragActive.value=false
  e.stopPropagation()
  e.preventDefault()
}
</script>
<style lang="scss" scoped>
#dragBox{
  height: 200px;
  width:200px;
  border:1px solid #eee;
  text-align: center;
  line-height: 200px;
  color:#666;
  &.active{
    border-color:#409eff;
  }
}
</style>
