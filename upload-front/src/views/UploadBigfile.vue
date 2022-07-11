<template>
  <div>
    <h2>大文件上传</h2>
    <h3>单请求上传</h3>
    <div>
      <input type="file" @change="uploadBigFile($event,1)">
    </div>
    <el-progress type="circle" :percentage="state.rate">
      <template #default="{ percentage }">
        <span class="percentage-value">{{ percentage }}%</span>
      </template>
    </el-progress>

    <h3>多请求并发上传</h3>
    <div>
      <input type="file" @change="uploadBigFile($event,2)">
    </div>
    <el-progress type="circle" :percentage="state.rate2">
      <template #default="{ percentage }">
        <span class="percentage-value">{{ percentage }}%</span>
      </template>
    </el-progress>
  </div>
</template>
<script lang="ts">
import { defineComponent,reactive } from 'vue'
import uploadBigHook from '@/tool/uploadBigFile'
export default defineComponent({
  
  setup() {
    const state=reactive({
      rate:0,
      rate2:0,
      url:'',
      url2:'',
      time2:0,
      time:0,
      showUploadProgress:false,
      showUploadProgress2:false
    })
    const {uploadBig}=uploadBigHook(state)
    const uploadBigFile=(e:Event,type:number)=>{
      const upFile = ((e.target as HTMLInputElement).files as FileList)[0];
      uploadBig(upFile,type)
    }
    return{
      uploadBigFile,
      state,
    }
  },
})
</script>
