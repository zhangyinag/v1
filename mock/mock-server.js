var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var url=require('url');

var fs = require('fs');
var path = require('path');

var app = express();
app.use(cookieParser());
app.use(session({
  secret: '12345',
  name: 'sid',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
  cookie: {maxAge: 60000 },
  resave: false,
  saveUninitialized: true,
}));
app.use(bodyParser.json());


var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', ['http://192.168.1.10:8080']);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials','true');
  next();
};
app.use(allowCrossDomain);

let baseUrl = '';

//白名单
const whiteList = ['/login', '/books',]
//默认路由
app.all('/', function (req, res, next) {
  console.info(`access: [url - ${req.url} , query - ${req.query} , body - ${req.body}]`);
  if (!isOnWhiteList(req.url) && !req.session.auth) res.status(401).end()
  next(); // pass control to the next handler
});

app.all(resolveUrl('/401'), function (req, res) {
  res.status(401).end();
});

app.all(resolveUrl('/403'), function (req, res) {
  res.status(403).end();
});

app.all(resolveUrl('/404'), function (req, res) {
  res.status(404).end();
});

app.all(resolveUrl('/500'), function (req, res) {
  res.status(500).end();
});


let collection = {};
readFiles(path.dirname(require.main.filename) + '/data/');
registerRoutes();



var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});



//注册路由
function registerRoutes(){
  Object.keys(collection).forEach(function (key) {
    (collection[key].routes || []).forEach(function (route) {
      hasMethod('get',route.method) &&
      app.get(resolveUrl(route.url), function (req, res) {
         res.send(getData(key,route,req))
      });

      hasMethod('post',route.method) &&
      app.post(resolveUrl(route.url), function (req, res) {
        res.send(getData(key,route,req))
      });

      hasMethod('put',route.method) &&
      app.put(resolveUrl(route.url), function (req, res) {
        res.send(getData(key,route,req))
      });

      hasMethod('delete',route.method) &&
      app.delete(resolveUrl(route.url), function (req, res) {
        res.send(getData(key,route,req))
      });

      hasMethod('patch',route.method) &&
      app.patch(resolveUrl(route.url), function (req, res) {
        res.send(getData(key,route,req))
      });
    });
  })

  function hasMethod (method,methods) {
    if(!methods || !method){
      return false;
    }
    if(methods.toLowerCase().indexOf('all') !== -1){
      return true;
    }

    return methods.toLowerCase().indexOf(method.toLowerCase()) !== -1
  }

  function resp(data,success,errMsg){
    return {
      success: success === undefined ? true : success,
      data: data,
      errMsg: errMsg
    }
  }

  function getData(key,route,req){
    let handler = collection[key]['handler'];
    if(handler){
      try{
        return resp(handler(route,req));
      }catch (e){
        return resp(null,false,e.message);
      }
    }
    return resp(null,false,"not defined handler");
  }
}

//
function isOnWhiteList (url) {
  if(!url) return false
  return whiteList.some(function (v) {
    return url.startsWith(v)
  })
}

//
function resolveUrl(url){
  return baseUrl + url;
}


// 同步方法
function readFiles (filePath) {
  let files = fs.readdirSync(filePath);

  (files || []).forEach(function (filename) {
    var filedir = path.join(filePath, filename)
    let stats = fs.statSync(filedir)
    var isFile = stats.isFile()//是文件
    var isDir = stats.isDirectory()//是文件夹
    if (isFile) {
      console.log(filedir)
      let dat = require(filedir)
      console.log(dat)
      var key = dat.key;
      if(!key){
        console.error("不合法文件 ：[" +filedir +"]")
        return;
      }
      if(collection[key]){
        console.warn("检测到重复 key [" + key + "], 文件：[" + filedir + "] 不会导入");
        return;
      }
      collection[key] = dat;
    }
    if (isDir) {
      readFiles(filedir)//递归，如果是文件夹，就继续遍历该文件夹下面的文件
    }
  })
}
