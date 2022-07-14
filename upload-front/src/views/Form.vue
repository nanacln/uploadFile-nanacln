<template>
  <div style="margin:40px">
    <form action="http://127.0.0.1:8880/upload_single" method="post" enctype="multipart/form-data" target="form">
      <el-button class="upload-btnBox" type="primary">
        选择文件<input type="file" name="file" class="input_file" @change="submit" />
      </el-button>
    </form>
    <iframe id="file-iframe" name="form" ></iframe>
  </div>
</template>
<script lang="ts" setup>
  const submit=()=>{
    (document.querySelector("form") as HTMLFormElement).submit()
  }
  
  document.querySelector('#file-iframe')&& (document.querySelector('#file-iframe') as HTMLIFrameElement).addEventListener('load',(E)=>{
    console.log(E);
    console.log(2222);
    
    
  })
</script>
