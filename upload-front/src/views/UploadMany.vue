<template>
  <div>
    <h2>多文件上传-多请求</h2>
    <input type="file" multiple  @change="uploadMany">
    <div style="margin-top:30px;">
      <el-image v-for="url in state.imgUrls" :key="url" :src="url" style="width: 100px; height: 100px" :preview-src-list="state.imgUrls"
      :initial-index="0" fit="cover"  lazy />
    </div>
    <br>
    <h2>多文件上传-单一请求</h2>
    <input type="file" multiple  @change="uploadManyFiles">
    
    <div style="margin-top:30px;">
      <el-image v-for="url in state.imgUrls2" :key="url" :src="url" style="width: 100px; height: 100px" :preview-src-list="state.imgUrls2"
      :initial-index="0" fit="cover"  lazy />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { UploadSingle,UploadMultipe } from "../tool/api";
import { ElMessage } from 'element-plus'
import { reactive } from "vue-demi";
import {ManyUploadState} from '../tool/type'
  const state=reactive<ManyUploadState>({
    imgUrls:[],
    imgUrls2:[]
  })
  const uploadMany=(e:Event)=>{
    const upFiles = [...(e.target as HTMLInputElement).files as FileList]
    const _files= upFiles.map((item:File)=>{
      return new Promise((resolve,reject)=>{
        let formData = new FormData();
        formData.append("file", item);
        formData.append("filename", item.name);
        UploadSingle(formData)
          .then((res) => {
            const { code,url } = res;
            if (code === 0) {
              resolve(url)
            }else{
              reject('上传失败')
            }
          })
      })
      
    })
    Promise.all(_files).then((res) => {
      state.imgUrls=res as string[]
      ElMessage({
        message: '批量上传成功',
        type: 'success',
      })
    })
    .catch(()=>{
      ElMessage({
        message: '批量上传失败',
        type: 'error',
      })
    })
  }
  const uploadManyFiles=(e:Event)=>{
    const upFiles = [...(e.target as HTMLInputElement).files as FileList]
    const formData=new FormData()
    upFiles.map((item:File)=>{
      formData.append("file", item);
    })
    UploadMultipe(formData)
      .then((res) => {
        const { code,url } = res;
        if (code === 0) {
          ElMessage({
            message: '批量上传成功',
            type: 'success',
          })
          state.imgUrls2=(url as string).split(',')
        }else{
          Promise.reject('上传失败')
        }
      })
  }
</script>
