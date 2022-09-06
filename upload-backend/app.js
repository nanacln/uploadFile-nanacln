const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 8880;
const HOST = 'http://127.0.0.1';
// const HOST = 'http://106.14.172.134'
const HOSTNAME = `${HOST}:${PORT}`;
const apiRouter = require('./tool/router')

app.all('*',(req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept');
	res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
	res.header('X-Powered-By','3.2.1')
	//注释是为了避免图片上传后，图片访问使用跨域预览不展示
	// res.header('Content-Type','application/json;charset=utf-8')
	next();
});
app.use('',express.static(path.join(__dirname, 'static')));

app.listen(PORT, () => {
	console.log(`serve is runnig at ${HOSTNAME}`);
});




app.use(
	bodyParser.urlencoded({
		extended: false,
		limit: '1024mb',
	})
);
app.use(bodyParser.json({limit: '10mb'})); // for parsing application/json

app.use('/up',apiRouter)
