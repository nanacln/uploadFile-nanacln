<template>
  <div>
    <h2>大文件上传</h2>
    <h3>单请求上传</h3>
    <div>
      <el-button class="upload-btnBox" type="primary">
        选择文件<input type="file" class="input_file" @change="uploadBigFile($event,1)" />
      </el-button>
    </div>
    <el-progress type="circle" :percentage="rate">
      <template #default="{ percentage }">
        <span class="percentage-value">{{ percentage }}%</span>
      </template>
    </el-progress>
    <div>上传耗费时间:{{(time/1000).toFixed(1)}}s</div>

    <h3>多请求并发上传</h3>
    <div>
      <el-button class="upload-btnBox" type="primary">
        选择文件<input type="file" class="input_file" @change="uploadBigFile($event,2)" />
      </el-button>
    </div>
    <el-progress type="circle" :percentage="rate2">
      <template #default="{ percentage }">
        <span class="percentage-value">{{ percentage }}%</span>
      </template>
    </el-progress>
    <div>上传耗费时间:{{(time2/1000).toFixed(1)}}s</div>
  </div>
</template>
<script lang="ts">
import { defineComponent,reactive, toRefs } from 'vue'
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
      const upFile = ((e.target as HTMLInputElement).files as FileList)[0]
      uploadBig(upFile,type)
      //避免第二次选用相同图片不触发事件
      ;(e.target as HTMLInputElement).value=''
    }
    return{
      uploadBigFile,
      ...toRefs(state)
    }
  },
})
</script>
