const fs = require('fs');
const path = require('path');

function mergeFile(filePath, newPath) {
  return new Promise((resolve, reject) => {
    let files = fs.readdirSync(filePath),
      newFile = fs.createWriteStream(newPath),
      filesArr = arrSort(files).reverse();
    main();
    function main(index = 0) {
      let currentFile = filePath + '/' + filesArr[index];
      let stream = fs.createReadStream(currentFile);
      stream.pipe(newFile, { end: false });
      stream.on('end', async function () {
        if (index < filesArr.length - 1) {
          index++;
          main(index);
        } else {
          try{
            await rmdirAsync(filePath)
            resolve({ code: 200 });
          }catch{
            //删除上传的音频切片文件夹失败，此时音频已合并成功
            resolve({ code: 200 });
          }
        }
      })
      stream.on('error', function (error) {
        reject({ code: 102, data: { error } })
      })
    }
  })
}
function arrSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (Number(arr[i]) >= Number(arr[j])) {
        let t = arr[i];
        arr[i] = arr[j];
        arr[j] = t;
      }
    }
  }
  return arr;
}
async function rmdirAsync(filepath) {
  let stat = fs.statSync(filepath)
  if (stat.isFile()) {
    fs.unlinkSync(filepath)
  } else {
    
    let dirs = fs.readdirSync(filepath)
    dirs = dirs.map(dir => rmdirAsync(path.join(filepath, dir)))

    fs.rmdirSync(filepath)
  }
}
module.exports = mergeFile