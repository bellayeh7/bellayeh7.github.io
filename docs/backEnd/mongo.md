#

# 基础使用

> 参考官方文档 https://mongodb.net.cn/manual/reference/operator/update/#id1

## 1. 更新运算符

> 以下修饰符可用于更新操作；例如在`db.collection.update()`和中 `db.collection.findAndModify()`。

> 在以下格式的文档中指定运算符表达式：
> ```js
> {
>   <operator1>: { <field1>: <value1>, ... },
>   <operator2>: { <field2>: <value2>, ... },
>   ...
>  }
> ```

- **更新运算符**
  字段
  |名称 | 描述 |
  |---|---|
  |`$currentDate` | 将字段的值设置为当前日期（日期或时间戳）。|
  |`$inc`| 将字段的值增加指定的数量。|
  |`$min` |仅当指定值小于现有字段值时才更新该字段。|
  |`$max` |仅当指定值大于现有字段值时才更新该字段。|
  |`$mul` |将字段的值乘以指定的数量。|
  |`$rename` |重命名字段。|
  |`$set`| 设置文档中字段的值。|
  |`$setOnInsert`| 如果更新导致插入文档，则设置字段的值。对修改现有文档的更新操没有影响。|
  |`$unset` | 从文档中删除指定的字段。|


- **数组**
  运算符
  |名称 |描述|
  |---|---|
  |`$`| 充当占位符，以更新与查询条件匹配的第一个元素。|
  |`$[]`| 充当占位符，以更新匹配查询条件的文档的数组中的所有元素。|
  |`$[<identifier>]`| 充当占位符，以更新 `arrayFilters` 与查询条件匹配的文档中所有与条件匹配的元素。|
  |`$addToSet`| 仅当元素不存在于集合中时才将它们添加到数组中。|
  |`$pop`| 删除数组的第一项或最后一项。|
  |`$pull`| 删除所有与指定查询匹配的数组元素。|
  |`$push`| 将项目添加到数组。|
  |`$pullAll`| 从数组中删除所有匹配的值。|

- **修饰符**
  |名称 |描述|
  |---|---|
  |`$each`| 修改`$push`和`$addToSet` 运算符以附加多个项以进行数组更新。|
  | `$position`| 修改`$push` 运算符以指定要添加元素的数组中的位置。|
  | `$slice`| 修改`$push` 运算符以限制更新数组的大小。|
  | `$sort` 修改`$push` 运算符以对存储在数组中的文档重新排序。|


- **按位**
  |名称| 描述|
  |---|---|
  |`$bit`| 执行按位 `AND`，`OR` 和 `XOR` 整数值的更新。|


## 2. query selectors 文档

> https://www.mongodb.com/docs/manual/reference/operator/query/

## 3. 基本查询/高级查询

> https://juejin.cn/post/6844903808183730190

-----
# 入门

> 参考：https://juejin.cn/post/7067041813533556744

## 1. 启动 MongoDB

`% mongod`

不行的话：

`$./mongod --dbpath=/data/db --fork --logpath=/data/logs`

- dbpath 是存放数据库的路径 --fork 是后台启动 logpath 是日志路径 这些都不可缺少

或者

`$ sudo mongod -dbpath=/Users/bella/bellaData`

MongoDB 服务器启动后，访问 http://localhost:27017，如果出现这样的结果则表示已经成功：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd52ff14f3514480a1680228bcbbec87~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

> Mongo 后台管理 shell
> :要在 mongo 服务启动之后才能进入 shell

## 2. MongoDb web 用户界面

`$ ./mongod --dbpath=/data/db --rest`

- MongoDB 提供简单的 http 用户界面，要启动该功能 需要在启动的时候指定参数` --rest`

- mongoDB web 界面访问端口比服务多 100
  http://localhost:28017

## 3. 查看 mongo 进程

`$ ps -ef | grep mongo`

## 4. 关闭 mongo 进程

`$ sudo kill 74316(pid)`

mongo 启动关闭测试

## 5. mac 查看端口占用情况

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

MongoDB 中的数据存储结构:

数据库 database
集合 collection (一个集合存一类数据)
文档 document (集合中的一项)
数据字段 field
MongoDB 是文档型数据库, 存储的都是一些 JSON 格式数据

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
