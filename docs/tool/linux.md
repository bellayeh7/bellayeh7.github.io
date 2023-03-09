
## nginx指令
- brew install nginx 安装
- brew info nginx 查看信息
- sudo nginx 启动服务
- sudo nginx -s stop 停止服务（直接走）
- sudo nginx -s reload  重新加载
- sudo nginx -s reopen 重新启动
- sudo nginx -s quit 退出（处理完事情走）
- open /opt/homebrew/etc/nginx/ 查看nginx安装目录


## 常用的Linux命令（以供参考）：
- whoami 查看当前用户名
- which nginx 查看nginx等用户安装程序、命令的位置及是否存在
- whereis cat 查看cat等系统程序、命令的位置及是否存在
- pwd 查看当前文件夹完整路径
- mv a b 将文件 a 重命名为 b
- cp a b 将文件 a 复制一份命名为 b
- du -h --max-depth=1 查看文件内存（mac：du -shc *）
- netstat -ntpl 查看本机所有端口进程
- telnet ip port 测试远程主机端口连通性
- tar -zcvf dist.tar.gz dist 当前文件夹下压缩
- distps aux | grep node 查看node进程
- kill -9 20713 杀掉20713进程
- tail -f filename 始终显示文件名为filename里最尾部的内容，并且不断刷新
- tail -n 10 filename 显示文件名为filename里最新的最后10行内容
- ssh -p 2222 user@host 使用user用户登录host主机的2222端口
- su admin 当前用户切成admin（sudo类似）
- scp -P 9527 user@ip:/path/dist ./ 使用user用户身份，将地址为ip的主机下path目录里的dist发送到当前目录下
- sz dist 下载dist文件（rz上传）
- open filename 使用系统默认的程序打开filename文件
- find -name test.txt（find <指定目录> <指定条件> <指定动作>）
- locate test.txt 在系统后台数据库中按文件名搜索test.txt的完整路径（有坑，依赖于/var/db/locate.database 是否存在）
- curl 127.0.0.1:3000 在本服务器上访问起的3000端口服务（wget 跟 curl 类似）
- top 命令式系统性能分析工具，作用跟Windows任务管理器和 Mac 活动监视器差不多
- host DNS查询工具（nslookup / dig查的信息比 host 更加完整）
- history 查看最近使用的命令行历史记录vim/vi [filename]、wq 和 q!   在命令行编辑一个文件，并保存退出/不保存退出
- cat filename  在命令行打印出一个文件内容
- ls | grep *.js   筛选出当前文件夹所有的 js后缀名的文件（| 是管道操作符，grep 是过滤操作符）
- lsof -i tcp:8080 快速找到 8080 端口的进程号（解决端口占用问题）


## 云服务器

[部署云服务器教程](https://blog.csdn.net/yangxbai/article/details/125439694)
[前端部署](https://juejin.cn/post/6844904032218120200#heading-0)




## oss对象存储
[阿里云oss操作](https://blog.csdn.net/qq_38420303/article/details/126627430)
[发布到OSS-使用jenkins自动发布](https://blog.csdn.net/qq_44930876/article/details/126517672?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-126517672-blog-126627430.pc_relevant_3mothn_strategy_recovery&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-126517672-blog-126627430.pc_relevant_3mothn_strategy_recovery)
[]