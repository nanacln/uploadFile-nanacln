<template>
  <div>
    <h2>大文件上传</h2>
    <h3>单请求上传</h3>
    <div>
      <input type="file" @change="uploadBigFile($event,1)">
    </div>

    <h3>多请求并发上传</h3>
    <div>
      <input type="file" @change="uploadBigFile($event,2)">
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import uploadBigHook from '@/tool/uploadBigFile'
export default defineComponent({
  
  setup() {
    const {uploadBig}=uploadBigHook()
    const uploadBigFile=(e:Event,type:number)=>{
      const upFile = ((e.target as HTMLInputElement).files as FileList)[0];
      uploadBig(upFile,type)
    }
    return{
      uploadBigFile
    }
  },
})
</script>
