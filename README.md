# smart-agriculture-curriculum-design
智慧农业课设-树莓派-前后树莓派端的三端对接
## 前端：React 其中client-smart-agriculture文件夹为React项目，使用umi作为脚手架 官网：https://umijs.org/zh-CN
      启动项目：npm install -> npm run start
      /service 封装的后台接口(需要更改接口请自行修改，我这里写请求地址的是localhost:3000)
      /src/pages/history  历史页面
      /src/pages/ListTableList  指令输入界面
      /user                     用户界面（未编写）
      /Welcome.jsx              健康主界面

## 后端： Node-koa
      启动项目：线上建议使用PM2进程守护工具自行部署，线下：npm intall -》 npm run start
      **注意**：关于user的内容并没有写

## 数据库：my-sql（需自己建表）

## 终端：树莓派 python，直接使用自带的python运行即可

