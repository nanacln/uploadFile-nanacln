<template>
  <div>
    <h2>多文件上传</h2>
    <input type="file" multiple  @change="uploadMany">
  </div>
</template>
<script lang="ts" setup>
import { UploadSingle } from "../tool/api";
import { ElMessage } from 'element-plus'
  const uploadMany=(e:Event)=>{
    const upFiles = [...(e.target as HTMLInputElement).files as FileList]
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
      console.log(res);
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
</script>
