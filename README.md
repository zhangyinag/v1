# v1

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests

# 启动测试服务器
npm run biuld-server

# 以build方式启动
npm run build-server

```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### 介绍


### 功能

> 架构

> 模拟服务器

> 登录/注销及权限

> http封装

> 菜单

> 权限字典 permissionMap

> 组件权限渲染

> 测试

> 主题与样式

> 杂项


#### 架构

```
├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 源代码
   │   ├── api                    // 所有请求
   │   ├── assets                 // 主题 图片等静态资源
   │     │   ├── themes                  // 主题文件夹
   │     │     │   ├── theme-orange             // 橙色主题包   
   │   ├── components             // 全局公用组件
   │     │   ├── ThemeLoader.vue                  // 主题加载组件 
   │   ├── directives              // 全局指令 
   │   ├── filters                // 全局 filter 
   │   ├── icons                  // 项目svg icons
   │   ├── router                 // 路由
   │   ├── store                  // 全局 store
   │     │   ├── index.js                  // 入口
   │     │   ├── mutation-types.js         // 所以mutation类型
   │     │   ├── actions.js               // 全局 actiones
   │     │   ├── getters.js               // 全局 gettters
   │     │   ├── modules              // 子模块
   │     │     │   ├── auth.js              // 验证实体
   │     │     │   ├── menu.js              // 菜单列表
   │     │     │   ├── permission.js              // 权限字典
   │     │     │   ├── errorLog.js              // 日志栈
   │   ├── styles                 // 全局样式
   │     │   ├── index.sass              // 入口
   │     │   ├── element-variables.scss     // element 变量
   │     │   ├── variables.scss              // 项目变量
   │   ├── utils                  // 全局公用方法
   │     │   ├── http.js              // http服务
   │     │   ├── validate.js          // 公用验证 
   │   ├── vendor                 // 公用vendor
   │   ├── views                  // views 页面文件
   │     │   ├── Login.vue          // 登陆页面
   │     │   ├── NotFound.vue          // 404页面 
   │     │   ├── NotAuthorized.vue     // 403页面 
   │     │   ├── Sidebar.vue          // 侧边栏页面    
   │     │   ├── Theme.vue           // 主题预览页面         
   │   ├── App.vue                // 入口页面
   │   ├── main.js                // 入口js 初始化 加载组件等
├── static                     // 第三方不打包资源
├── test                       // 测试文件夹
├── mock                   // 项目mock 模拟服务器及数据 mock-server.js
   │   ├── mock-server.js                // 模拟服务器
   │     ├── data          // 测试数据集 
├── doc                   // 项目文档
├── .babelrc                   // babel-loader 配置
├── .eslintrc.js               // eslint 配置项
├── .postcssrc.js              // postcss 配置项
├── .bs-config.json            // build 服务器配置项
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标 （未提供）
├── index.html                 // html模板
└── package.json               // package.json


```


#### 模拟服务器
##### session 支持

```
var app = express();
app.use(cookieParser());
app.use(session({
  secret: '12345',
  name: 'sid',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
  cookie: {maxAge: 60000 },
  resave: false,
  saveUninitialized: true,
}));
```

##### 跨域支持

```
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', ['http://localhost:8080']);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials','true');
  next();
};
```

##### 401/403/404/500 模拟
```
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
```

##### 基地址设置

```angularjs
let baseUrl = ''; 
```

##### 白名单
```
const whiteList = ['/login', '/books']
```

##### 数据集格式
```
// 路由配置 每个匹配路由将回传到handler， name 一般用于作为标识， 可作为handler的函数名
const routes = [{
  name: 'login', 
  url: '/login',
  method: 'post'
}]

// 数据集
const collection = []

// 路由匹配成功回调handler
const handler = function (route,req) {
  var h = handler[route.name]
  if(typeof h === "function"){
    return h(route,req);
  }
  throw new Error(`${route.url} not handled`);
}

module.exports = {
  routes: routes,
  key: 'auth', // 请保持每个文件都不一样， 服务启动时会有提示
  handler: handler
}



//---//


handler.login = function (route,req) {
  let empUm = req.body.username;
  let target = null
  collection.some(function (v) {
    if(v.empUm === empUm){
      target = v
      return true
    }
  })
  if(target) {
    req.session.auth = target
    return null;
  }
  throw new Error('not found user');
}

handler.logout = function (route,req) {
  req.session.auth = null
  return null
}

handler.getAuth = function (route,req) {
  if(!req.session.auth) throw new Error('no auth')
  return req.session.auth
}

handler.getPermission = function (route,req) {
  if(!req.session.auth) throw new Error('no auth')
  return req.session.auth.permissionMap
}
```

> 可以基于以上代码建立模板


#### 登录/注销及权限
> 验证实体auth存于store，登录分以下步：\
>- 将用户名密码发往服务器验证
>- 获取验证实体 auth， 并存于store.auth
>- 获取权限字典(permissionMap), 并存于store.permission
>- 设置auth.authenticated 为true, 表示已验证
>- 决定跳转的路由(如果有前一路由，转向前一路由，否则跳往admin)
>- 路由跳转

> 注销：\
>- 向服务端发送注销请求
>- 将store.auth.authenticated 滋味false

> 路由权限控制，路由permissionKey存于路由meta上， 通过设置全局前置守卫，对每个路由进入前进行拦截，逻辑如下：
>- 如果目标路由在白名单内,(/login, /403, /404),将store.auth.platform 设为该路由的所属平台（tmr/admin/''） 允许进入
>- 是否登陆 
>>- 未登陆 
>>>- 如果有用户名，则尝试登陆
>>>>- 成功，验证是否有进入权限
>>>>>- 有，将store.auth.platform 设为该路由的所属平台（tmr/admin/''），允许进入
>>>>>- 无，跳转到所属平台(store.auth.platform 判定)/全局的403页面
>>>>- 失败，则跳往登陆页
>>- 已登陆 
>>- 验证是否有进入权限
>>>- 有，将store.auth.platform 设为该路由的所属平台（tmr/admin/''），允许进入
>>>- 无，跳转到所属平台(store.auth.platform 判定)/全局的403页面


#### http封装

> 采用axios进行ajax请求, axios 支持防御 XSRF、拦截请求和响应，对蛞蝓设置及restful操作都比较方便

##### 基本配置
```
  baseURL: process.env.BASE_API, // api的base_url
  withCredentials: true,
  timeout: 5000 // 请求超时时间
```

##### http拦截器
>- 业务错误， 即 res.success 为false， 使用ElementUi 打印错误消息，Promise.resolve
>- 非200错误：Promise.reject
>>- 401， 弹出ElementUI提示框，询问是否跳转到登陆页 
>>- 403， 打印403错误
>>- 404， 打印404错误
>>- 500， 打印500错误


#### 菜单
> 所有菜单存储在store.menu.tmrMenus/adminMenus,每个菜单项都配有permissionKey用于权限判断，
   通过全局getters.menus 获取，该方法会进行权限筛选
   

#### 权限字典 permissionMap

```
 键名： 系统名/类型名/模块名/子模块/.../标识符 
 值：access：true/false 
     strategy: 'affirmed'/'denied'/inherit  //对其子模块没有匹配到的permission采用的策略：全部通过/全部拒绝/与父级相同

```   

> 系统名：admin/tmr/all （管理端/坐席端/通用） \
> 类型名：menu/route/component (菜单<建议denied>/路由<建议inherit>/组件<建议affirmed>)


#### 组件权限渲染
> 通过自定义组件 Permission 定义/并处理组件渲染问题 (还未实现) \
> 可定义一个placeholder来占位， 防止页面被弄乱
```
  <permission permissionKey='all.customer.detail.addTask'>
    <button>permission button</button>
    <button slot="placeholder">permission button</button>
  </permission>
```

#### 测试
> 请多写单元测试， test包中有实例，断言语法请参考chai断言语法， 可在coverage中才开测试报告

####  主题与样式
> 提供两种主题更改方式：
>- 静态：重载ElementUI样式， 请在 element-variables.scss 中修改
>- 动态：（需准备多套主题）用ElementUI在线主题生成工具生成一套主题，并使用工具加scope，通过
ThemeLoader组件将样式导入，并将scope类加载body， 请参考vue-element-admin 文档 \

- 生成scope代码
```
var path = require('path')
var gulp = require('gulp')
var cleanCSS = require('gulp-clean-css');
var cssWrap = require('gulp-css-wrap');

var customThemeName='.custom-theme'

gulp.task('css-wrap', function() {
  return gulp.src( path.resolve('./theme/index.css'))
    .pipe(cssWrap({selector:customThemeName}))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist'));
});

gulp.task('move-font', function() {
  return gulp.src(['./theme/fonts/**']).pipe(gulp.dest('dist/fonts'));
});

gulp.task('default',['css-wrap','move-font']);
```
> 自定义全局样式变量请自行在styles下新建对应模块的sass文件或写在variables.sass中


#### 杂项

##### 表单验证公用方法
> @/utils/validate.js

##### ESLint 
> 请确认配置好了ESLint, 我们将给予此作为代码编写规范 \
> 若使用webstorm，请确保ESLint是否指向了该项目的ESLint

##### normalize.css
> 添加了此css消除不同浏览器间的差异

##### nprogress
> 全局进度条, 可以在需要加载的地方使用该进度条， LoginVue 有实例

##### Restful 风格API
> 举个例子：
```
GET /zoos：列出所有动物园
POST /zoos：新建一个动物园
DELETE /zoos：删除所有动物园
PUT /zoos：批量更新(*)
POST /zoos/quiries： 高级查询动物园
POST /zoos/batch： 批量更新动物园
POST /zoos/delete：批量删除动物园 
GET /zoos/ID：获取某个指定动物园的信息
PUT /zoos/ID：更新某个指定动物园的信息（全量更新）
PATCH /zoos/ID：更新某个指定动物园的信息（打补丁更新）
DELETE /zoos/ID：删除某个动物园
GET /zoos/ID/animals：列出某个指定动物园的所有动物
DELETE /zoos/ID/animals/ID：删除某个指定动物园的指定动物
```
##### IE10 兼容性问题
> 添加babel-polyfill
> dev下不能正常显示，请使用build-server
> 还有一些未知问题

##### Chrome下调试
> 请安装Chrome插件dev-tools
> Chrome 支持源码调试

##### 错误日志
> 可以使用store.errorLog 记录错误日志

##### Promise
> 请尽可能使用Promise链式写法：
```
a.then()
  .then()
  .then()
  .then()
  .catch()
```
> 注：ES6 promise没有finally方法， 可自行扩展原型
  
##### @路径支持
> 若使用webstorm， 请配置webpack指向该项目的webpack.base.config.js, 否则不支持@路径

##### Vue支持
> 若使用webstorm不支持新建.vue文件，请自行添加.vue文件支持及配置模板





  
    







