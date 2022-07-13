<template>
  <div>
    <h1>单一文件上传-FORM DATA</h1>
    <div>
      <el-button class="upload-btnBox" type="primary">
        选择文件<input type="file" class="input_file" @change="uploadFile" />
      </el-button>
      
    </div>
    <br>
    <br>
    <div>
      <h2>压缩上传</h2>
      <el-button class="upload-btnBox" type="primary">
        选择文件<input type="file" class="input_file" @change="uploadFile($event,true)" />
      </el-button>
    </div>
    <br>
    <br>
    <div>
      <h2>进度条</h2>
      <el-button class="upload-btnBox" type="primary">
        选择文件<input type="file" class="input_file" @change="uploadFile($event,false,true)" />
      </el-button>
      <br><br>
      <el-progress :percentage="progress" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { UploadSingle } from "../tool/api";
import { ElMessage } from 'element-plus'
export default defineComponent({
  setup() {
    const uploadFile = (file: Event,minifyFlag?:boolean,showProgress?:boolean) => {
      const upFile = ((file.target as HTMLInputElement).files as FileList)[0];
      if(minifyFlag){
        minifyImage(upFile)
      }else if(showProgress){
        upload(upFile,true)
      } else{
        upload(upFile)
      }
      (file.target as HTMLInputElement).value=''
    };
     interface fileQuality{
       quality:number
       width?:number
       height?:number
     }
     let progress=ref(0)

    const minifyImage=(fileobj:File)=>{
				const file=fileobj

				function photoCompress (file:File, w:fileQuality, objDiv:(base64Codes:string)=>void) {
					const ready = new FileReader()
					/* 开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容. */
					ready.readAsDataURL(file)
					ready.onload = function () {
						let re = ready.result as string
            console.log(re,88);
						canvasDataURL(re, w, objDiv)
					}
				}
				function canvasDataURL (path:string, obj:fileQuality, callback:(base64Codes:string)=>void) {
					var img = new Image()
					img.src = path
					img.onload = function () {
						var that = img
						// 默认按比例压缩
						var w = that.width
						var h = that.height
						var scale = w / h
						w = obj.width || w
						h = obj.height || (w / scale)
						var quality = 0.7 // 默认图片质量为0.7
						// 生成canvas
						var canvas = document.createElement('canvas')
						var ctx = canvas.getContext('2d')
						// 创建属性节点
						var anw = document.createAttribute('width')
						anw.nodeValue = w+''
						var anh = document.createAttribute('height')
						anh.nodeValue = h+''
						canvas.setAttributeNode(anw)
						canvas.setAttributeNode(anh)
						;(ctx as CanvasRenderingContext2D).drawImage(that, 0, 0, w, h)
						// 图像质量
						if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
							quality = obj.quality
						}
						// quality值越小，所绘制出的图像越模糊
						var base64 = canvas.toDataURL('image/jpeg', quality)
						// 回调函数返回base64的值
						callback(base64)
					}
				}
				function convertBase64UrlToBlob (urlData:string) {
					const arr = urlData.split(',')
					const mime = (arr[0].match(/:(.*?);/) as string[])[1]

					let bstr = atob(arr[1])
					let n = bstr.length
					let u8arr = new Uint8Array(n)
					while (n--) {
						u8arr[n] = bstr.charCodeAt(n)
					}
					return new Blob([u8arr], {type: mime})
				}
				if (file.size > 1024 * 1024) {
					photoCompress(file, {quality: 0.2}, (base64Codes) => {
						const bl = convertBase64UrlToBlob(base64Codes)
            const file2=new File([bl],'file_' + new Date().getTime() + '.jpg',{type:bl.type})
            upload(file2)
						// formData.append('file', bl, 'file_' + new Date().getTime() + '.jpg') // 文件对象
					
					})
				} else {
					upload(file)
				}
			}
      const upload=(upFile:File,showProgress?:boolean)=>{
        let formData = new FormData();
        formData.append("file", upFile);
        formData.append("filename", upFile.name);
        if(showProgress){
            UploadSingle(formData,{
                onUploadProgress: (e:{loaded:number,total:number}) => {
                    const { loaded, total } = e;
                    progress.value=(loaded / total) *100
                }
            })
          .then((res) => {
            const { code } = res;
            if (code === 0) {
              ElMessage({
                message: '上传成功',
                type: 'success',
              })
              return;
            }
            return Promise.reject("上传失败");
          })
          .catch((e) => {
            console.log(e);
          });
        }else{
          UploadSingle(formData)
          .then((res) => {
            const { code } = res;
            if (code === 0) {
              ElMessage({
                message: '上传成功',
                type: 'success',
              })
              return;
            }
            return Promise.reject("上传失败");
          })
          .catch((e) => {
            console.log(e);
          });
        }
        
      }
    return {
      uploadFile,
      progress
    };
  },
});
</script>
