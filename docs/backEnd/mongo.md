#

> 参考：https://juejin.cn/post/7067041813533556744
## 1. 启动 MongoDB 

`% mongod`

不行的话：

`$./mongod --dbpath=/data/db --fork --logpath=/data/logs`
- dbpath是存放数据库的路径 --fork是后台启动 logpath是日志路径 这些都不可缺少

或者

`$ sudo mongod -dbpath=/Users/bella/bellaData`

MongoDB 服务器启动后，访问 http://localhost:27017，如果出现这样的结果则表示已经成功：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd52ff14f3514480a1680228bcbbec87~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

> Mongo 后台管理 shell
> :要在 mongo 服务启动之后才能进入shell

## 2. MongoDb web用户界面

`$ ./mongod --dbpath=/data/db --rest`

- MongoDB 提供简单的 http 用户界面，要启动该功能 需要在启动的时候指定参数` --rest`

- mongoDB web界面访问端口比服务多100
http://localhost:28017

## 3. 查看mongo进程

`$ ps -ef | grep mongo`

## 4. 关闭mongo进程

`$ sudo kill 74316(pid)`

mongo启动关闭测试

## 5. mac查看端口占用情况

`$ lsof -i tcp:27017`

- 如果有启动报错的情况 先查看 mongo 进程 如果有占用就 kill 掉，如果还不行就去`/data/db`下把 mongod.lock 删掉再启动

## 6. 常用指令

> show dbs 查看数据库
> 
> db 查看当前数据库
> 
> use database 切换数据库
> 
> show collections 查看集合列表

## 7. 基础概念

MongoDB中的数据存储结构:

数据库 database
集合 collection (一个集合存一类数据)
文档 document (集合中的一项)
数据字段 field
MongoDB是文档型数据库, 存储的都是一些 JSON 格式数据

```js
{
  // 数据库 database
  "test1": {
    // 集合 collection
    "users": [
      // 文档 document
      {
        // 数据字段 field
        "id": 1,
        "username": "小明",
        "password": "123456"
      },
      {
        "id": 2,
        "username": "小王",
        "password": "123456",
        "desc": "不错"
      }
      // ...
    ],
    "teachers": [
      {
        "id": 1,
        "name": "李老师"
      },
      {
        "id": 2,
        "name": "王老师",
      }
    ]
  },

  // 数据库
  "test2": {}

  // ...
}

```

## 8.