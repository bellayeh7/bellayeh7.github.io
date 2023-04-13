#

# 合并dev分支
- 1. `git branch dev` 创建分支
- 2. `git checkout dev` 切换分支
- 3. 拉取dev分支代码
  - 方法一：`git pull origin dev`
  - 方法二：
  ```js
  git branch --set-upstream-to=origin/dev
  git push
  ```
- 4. 切换到自己的分支  `git checkout xxx`
- 5. 合并你们的分支 `git merge dev`
- 6. 提交代码 `git push -u origin xxx`

# 给dev分支某版本打tag

```js
git checkout dev
git tag -f v1.0.3
git log
git push origin v1.0.3
```

# 常用指令
config --list  
config user.email 23@cc.com

add .

commit -m""

log

status

pull --rebase

pull  -》 fetch + merge

push

stash . 

reset

checkout xxx

branch xxx

remote -v

remote add upstream @git.coder.com/example


**echarts的官网链接** [echarts.apache.org/examples/en…](https://link.juejin.cn/?target=https%3A%2F%2Fecharts.apache.org%2Fexamples%2Fen%2Findex.html%23chart-type-sankey)

**echarts的更多示例链接** [www.makeapie.cn/echarts](https://link.juejin.cn/?target=https%3A%2F%2Fwww.makeapie.cn%2Fecharts)

# 1. 忽略不提交的文件

1. git status -s 查看仓库状态

2. git add src/pages/文件名 添加需要提交的文件名（加路径--参考git status 打印出来的文件路径）

3. git stash -u -k 忽略其他文件，把现修改的隐藏起来，这样提交的时候就不会提交未被add的文件

4. git commit -m "哪里做了修改可写入..."

5. git pull 拉取合并

6. git push 推送到远程仓库

7. git stash pop 恢复之前忽略的文件（非常重要的一步）



# 2. 强制覆盖本地的单个文件

1.   git fetch
2.   git checkout -m  《filename》

# 3. 配置

- 检查配置信息

  ```git
  git config --list
  ```

- 配置用户名

  ```git 
  git config --global user.name "loushengyue"
  ```


- 查看用户名
  ```git
  git config --global user.name
  ```
  
- 配置邮箱

  ```git
  git config --global user.email loushengyue@xx.com
  ```

- 查看邮箱
  ```git
  git config --global user.email
  ```

# 4. stash本地缓存

> 隐藏所有未提交的修改（包括暂存的和非暂存的）

- **1. 给stash加一个message，记录版本**

  ```git
  $ git stash save "test-cmd-stash呵呵呵"
  Saved working directory and index state On autoswitch: test-cmd-stash
  HEAD 现在位于 296e8d4 remove unnecessary postion reset in onResume function
  $ git stash list
  stash@{0}: On autoswitch: test-cmd-stash呵呵呵
  ```

- **2. 重新应用缓存**

  ```git
  $ git stash pop
  ```

- **3. 查看现有stash**

  ```git
  $ git stash list
  ```

- **4. 移除stash**

  - 删除单条

    ```git
    $ git stash drop // 后面可以跟着stash名字
    ```

    示例：

    ```git
    $ git stash list
    stash@{0}: WIP on master: 049d078 added the index file
    stash@{1}: WIP on master: c264051 Revert "added file_size"
    stash@{2}: WIP on master: 21d80a5 added number to log
    $ git stash drop stash@{0}
    Dropped stash@{0} (364e91f3f268f0900bc3ee613f9f733e82aaed43)
    ```

  - 删除所有缓存的stash

    ```git
    git stash clear
    ```

- **5. 查看指定stash的diff**

  ```git
  git stash show // 后面可以跟着stash名字
  ```

- **6. 初始化git**
```git init
    // 创建本地仓库
  git add -A
    // 将所有文件提交到暂存区
  git commit -m "testvue"
    // 将暂存区文件提交到本地仓库
  git remote add origin git@github.com:ChenGongWei/testvue.git
    // 连接GitHub远程仓库
  git push -u origin master
    // 将本地仓库的文件推送到GitHub远程仓库中
```


# 3. 提交规范

[具体查看文档](https://t3d0h0gdxm.feishu.cn/wiki/wikcnuTLeMKNtbZb2QTIWLpD18Q)


- **type(必须)：用于说明 git commit 的类别，早期只允许使用以下标识：**

  - feat：新功能（feature）
  - fix：修复bug
  - docs：文档（documentation）
  - style：格式（不影响代码运行的变动）
  - refactor：重构（即不是新增功能，也不是修改bug的代码变动）
  - perf：优化相关，比如提升性能、体验
  - test：增加测试
  - revert：回滚到上一个版本
  - build：构建过程或辅助工具的变动（如 gulp, webpack, npm 等）
  - ci：影响 CI 工具（Travis, Circle 等）相关配置文件及脚本的变动
  - chore：其它一些不影响功能代码和测试代码的变动（Conventional Commits 规范中新增类型）


- **scope(可选)：**用于说明 commit 影响的范围，视项目不同而不同。


- **subject(必须)：**subject 是 commit 目的的简短描述，不超过50个字符。
  - 建议使用中文（感觉中国人用中文描述问题能更清楚一些）
  - 结尾不加句号或其他标点符号
  - 根据以上规范 git commit message 将是如下的格式：


- **body(可选)：**填写详细描述，主要描述改动之前的情况及修改动机，对于小的修改不作要求，但是重大需求、更新等必须添加 body 来作说明。


- **footer(可选)：**footer 部分主要用于以下两种情况。
  - 不兼容变动：如果当前代码与上一个版本不兼容，则 footer 部分以 break changes 开头，后面是对变动的描述、以及变动理由和迁移方法。
  - 关闭 issue：如果当前 commit 针对某个 issue，那么可以在 footer 部分关闭这个 issue，比如 `Closes #234` 。