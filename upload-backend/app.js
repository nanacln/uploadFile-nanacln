const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const multipartry = require('multiparty');
const SparkMD5 = require('spark-md5');
const path = require('path');
const app = express();
const PORT = 8880;
const HOST = 'http://127.0.0.1';
const HOSTNAME = `${HOST}:${PORT}`;
const FONTHOSTNAME = `${HOST}:${8000}`; // 前端起的服务
const formidable = require('formidable')
const dirPath = path.join(__dirname, "./static/");

const mergeFile = require('./tool/util');

app.listen(PORT, () => {
	console.log(`serve is runnig at ${HOSTNAME}`);
});

app.all('*',(req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept');
	res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
	res.header('X-Powered-By','3.2.1')
	res.header('Content-Type','application/json;charset=utf-8')
	next();
});


app.use(
	bodyParser.urlencoded({
		extended: false,
		limit: '1024mb',
	})
);
app.use(bodyParser.json({limit: '10mb'})); // for parsing application/json
// 延迟函数
const delay = function (interval) {
	typeof interval !== 'number' ? interval === 1000 : interval;
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, interval);
	});
};

// 基于multiparty插件实现文件上传处理 & form-data解析
const uploadDir = `${__dirname}/static/upload`;
const baseDir = path.resolve(__dirname, '../');
const multipartry_load = function (req, auto) {
	typeof auto !== 'boolean' ? (auto = false) : null;
	let config = {
		maxFieldsSize: 200 * 1024 * 1024,
	};
	if (auto) config.uploadDir = uploadDir;
	return new Promise(async (resolve, reject) => {
		await delay(); //
		// 用来将客户端formData 结果解析
		new multipartry.Form(config).parse(req, (err, fields, files) => {
			if (err) {
				reject(err);
				return;
			}
			resolve({
				fields,
				files,
			});
		});
	});
};

// 检测文件是否已经存在
const exists = function (path) {
	return new Promise((resolve) => {
		fs.access(path, fs.constants.F_OK, (err) => {
			if (err) resolve(false);
			return resolve(true);
		});
	});
};

// 创建文件并写入到指定的目录 & 返回客户端结果
const writeFile = function (res, path, file, filename, stream) {
	return new Promise((resolve, reject) => {
		if (stream) {
		}
		fs.writeFile(path, file, (err) => {
			if (err) {
				reject(err);
				res.send({
					code: 1,
					msg: err,
				});
				return;
			}
			resolve();
			res.send({
				code: 0,
				msg: '上传成功',
				filename: filename,
				url: path.replace(baseDir, FONTHOSTNAME),
			});
		});
	});
};


app.post('/upload_single', async (req, res) => {
	try {
		let { files, fields } = await multipartry_load(req, true);
		let file = (files.file && files.file[0]) || {};
		res.send({
			code: 0,
			msg: '上传成功',
			originFilename: file.originFilename,
			url: file.path.replace(baseDir, FONTHOSTNAME),
		});
	} catch (err) {
		res.send({
			code: 1,
			msg: err,
		});
	}
});

app.post('/upload_single_base64', async (req, res) => {
  console.log(req.body,8888);
	let file = req.body.file;
	let filename = req.body.filename;
	let spark = new SparkMD5.ArrayBuffer(); // 根据文件内容,生成一个hash名字
	let suffix = /\.([0-9a-zA-Z]+)$/.exec(filename)[1];
	let isExists = false;
	let path;
	file = decodeURIComponent(file);
	file = file.replace(/^data:image\/\w+;base64,/, '');
	file = Buffer.from(file, 'base64'); // 将base64转成正常的文件格式
	spark.append(file);
	path = `${uploadDir}/${spark.end()}.${suffix}`;
	await delay();
	// 检测是否存在
	isExists = await exists(path);
	if (isExists) {
		res.send({
			code: 0,
			msg: 'file is exists',
			urlname: filename,
			url: path.replace(baseDir, FONTHOSTNAME),
		});
		return;
	}
	// fs.writeFile(res)
	writeFile(res, path, file, filename, false);
});



app.post('/bigFile/check',(req,res)=>{
	const body = req.body
  const md5Val = body.md5Val
  let bigDir = dirPath + "big/";
	if (!md5Val) {
    return res.json({
      code: 101,
      msg: "文件md5值不能为空！",
      data:''
    });
  }
	function check() {
    let filePath = `${bigDir}${md5Val}`;
    fs.readdir(filePath, (err, data) => {
      if (err) {
        fs.mkdir(filePath, (err) => {
          if (err) {
            return res.json({
              code: 101,
              msg: "获取失败！",
              data:{}
            });
          } else {
            return res.json({
              code: 200,
              msg: "获取成功！",
              data:[]
							
            });
          }
        });
      } else {
        return res.json({
          code: 200,
          msg: "获取成功！",
          data,
					
        });
      }
    });
  }
	check()
})
app.post('/bigFile/merge',(req,res)=>{
  const md5Val = req.body.md5Val
	async function merge(){
    let ext = req.body.ext;
    if (!ext) {
      return res.json({
          code: 101,
          msg: '文件后缀不能为空！',
					data: ''
      })
    }
    
    let oldPath = `${dirPath}big/${md5Val}`;
    let newPath = `${dirPath}doc/${md5Val}.${ext}`;
    let data = await mergeFile(oldPath, newPath);
    
    if (data.code == 200) {
      return res.json({
        code: 200,
        msg: '文件合并成功！',
        data: {
					url: `/doc/${md5Val}.${ext}`
				}
      })
    } else {
      return res.json({
        code: 101,
        msg: '文件合并失败！',
        data: data.data.error
      })
    }
  }
	merge()
})
app.post('/bigFile/upload',(req,res)=>{
	let md5Val = req.query.md5Val;
	function upload() {
    let form = formidable({
      multiples: true,
      uploadDir: `${dirPath}big/${md5Val}/`,
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.json(err);
      }
			const {current}=fields
			
			if (!current) {
				return res.json({
					code: 101,
					msg: "文件当前分片值不能为空！",
					data: "",
				});
			}
      let newPath = `${dirPath}big/${md5Val}/${current}`;
      fs.rename(files.file.filepath, newPath, function (err) {
        if (err) {
          return res.json(err);
        }
        return res.json({
          code: 200,
          msg: "get_succ",
          data: "",
        });
      });
    });
  }
	upload()
})