#


## 1. 后台启动MongoDB服务(常驻)

`% mongod`

不行的话：

`$./mongod --dbpath=/data/db --fork --logpath=/data/logs`

或者

`$ sudo mongod -dbpath=/Users/bella/bellaData`


- dbpath是存放数据库的路径 --fork是后台启动 logpath是日志路径 这些都不可缺少

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
