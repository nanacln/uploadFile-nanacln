import SparkMD5 from "spark-md5";

import { uploadBigCheck, uploadBigUp, uploadBigMerge } from "./api";
function uploadBigHook() {
  let ext = "",
    fileArr: Array<Blob> = [],
    uploadChuncks = [],
    md5Val = "";
  const alreadyUpChuncks: { [propName: number]: number } = {};
  let startTime = 0;
  async function uploadBig(file: File) {
    ext = file.name.substr(file.name.lastIndexOf(".") + 1);
    fileArr = sliceFile(file);
    md5Val = (await md5File([file])) as string;
    await checkUpload();
    //多个请求并发
    ManyUploadSlice();
    //一次上传一个请求
    // startTime=new Date().getTime()
    // uploadSlice()
  }
  // 切割文件
  function sliceFile(file: Blob) {
    const files = [];
    const chunkSize = 1000 * 1024;
    for (let i = 0; i < file.size; i += chunkSize) {
      const end = i + chunkSize >= file.size ? file.size : i + chunkSize;
      const currentFile = file.slice(i, end > file.size ? file.size : end);
      files.push(currentFile);
    }
    return files;
  }
  // 获取文件md5值
  function md5File(files: Array<Blob>) {
    const spark = new SparkMD5.ArrayBuffer();
    let fileReader = null as unknown as FileReader;
    let i = 0;
    for (; i < files.length; i++) {
      fileReader = new FileReader();
      fileReader.readAsArrayBuffer(files[i]);
    }
    return new Promise((resolve) => {
      fileReader.onload = function (e) {
        spark.append((e.target as FileReader).result);
        if (i == files.length) {
          resolve(spark.end());
        }
      };
    });
  }
  async function checkUpload() {
    const data = await uploadBigCheck(md5Val);
    if (data.code === 200) {
      uploadChuncks = data.data as number[];
      uploadChuncks.forEach((e: number) => {
        alreadyUpChuncks[e] = 1;
      });
    }
  }
  function ManyUploadSlice() {
    let mergeFlag = false;
    let preIndex = -1;
    let NextIndex = 0;
    const len = 5 < fileArr.length ? 5 : fileArr.length;
    startTime = new Date().getTime();
    console.log("start", startTime);
    for (let i = 0; i < len && !mergeFlag; i++) {
      singleUpload(++preIndex, i);
    }
    function singleUpload(chunkIndex: number, i: number) {
      if (chunkIndex === fileArr.length) {
        mergeFlag = true;
        NextIndex = 0;
        preIndex = -1;
        mergeFile();
        return;
      }
      if (alreadyUpChuncks[chunkIndex]) {
        ++chunkIndex;
        ++preIndex;
        ++NextIndex;
        // state.rate = Math.round(((NextIndex ) / fileArr.length) * 100)
        singleUpload(preIndex, i);
        return;
      }
      const formData = new FormData();
      formData.append("file", fileArr[chunkIndex]);
      // formData.append('type','upload')
      formData.append("current", chunkIndex + "");
      // formData.append('total',fileArr.length+'')
      uploadBigUp(md5Val, formData)
        //  axios({
        //   url: `/bigFile/upload?md5Val=${md5Val}`,
        //   method: "post",
        //   data: formData,
        // })
        .then((data) => {
          if (data.code == 200) {
            if (preIndex < fileArr.length - 1) {
              ++NextIndex;
              // state.rate = Math.round(((NextIndex ) / fileArr.length) * 100)
              singleUpload(++preIndex, i);
            } else {
              ++NextIndex;
              if (NextIndex === fileArr.length) {
                mergeFlag = true;
                NextIndex = 0;
                preIndex = -1;
                mergeFile();
              } else {
                // state.rate = Math.round(((NextIndex ) / fileArr.length) * 100)
              }
            }
          }
        });
    }
  }

  async function mergeFile() {
    const data = await uploadBigMerge(md5Val, ext);

    if (data.code == 200) {
      // state.rate = 100
      // state.form.videoUrl = data.data.data.url
      // state.showUploadProgress = false
      console.log("end", new Date().getTime() - startTime);
      // nextTick(() => {
      //   state.currentRate = 0
      //   state.rate = 0
      // })
    } else {
      alert(data.msg);
    }
  }
  return {
    uploadBig,
  };
}

export default uploadBigHook;
