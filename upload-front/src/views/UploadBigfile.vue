<template>
  <div>
    <h2>大文件上传</h2>
    <div>
      <input type="file" @change="uploadBigFile">
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import uploadBigHook from '@/tool/uploadBigFile'
export default defineComponent({
  
  setup() {
    const {uploadBig}=uploadBigHook()
    const uploadBigFile=(e:Event)=>{
      const upFile = ((e.target as HTMLInputElement).files as FileList)[0];
      uploadBig(upFile)
    }
    return{
      uploadBigFile
    }
  },
})
</script>
