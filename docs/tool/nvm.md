#
# nvm 个人常用指令

nvm ls

nvm use 19.6.0

nvm install 14.20.1

nvm uninstall 14.20.1

**npm config set registry https://registry.npm.taobao.org**

或者加个-g

# npm 常用指令

- 安装时执行，指定python版本
    npm install --python=python2.7

- 直接修改npm的python版本设置
    npm config set python python2.7

# npm 与 yarn 的指令

|NPM|YARN|说明|
|---|---|---|
|npm init|yarn init|初始化某个项目|
|npm install/link|yarn install/link|默认的安装依赖操作|
|npm install taco --save|yarn add taco|安装某个依赖，并且默认保存到package|
|npm uninstall taco --save|yarn remove taco|移除某个依赖项目|
|npm install taco --save-dev|yarn add taco --dev|安装某个开发时依赖项目|
|npm update taco --save|yarn upgrade taco|更新某个依赖项目|
|npm install taco --global|yarn global add taco|安装某个全局依赖项目|
|npm publish/login/logout|yarn publish/login/logout|发布/登录/登出，一 系列NPM Registry操作|
|npm init|yarn init|初始化某个项目|


# 更多关于 node-gyp 本地编译环境问题

[点击此处跳转至参考链接](https://www.chenhuojun.com/2020/07/12/%E4%B8%BAnode-gyp%E9%85%8D%E7%BD%AE%E6%9C%AC%E5%9C%B0%E7%BC%96%E8%AF%91%E7%8E%AF%E5%A2%83/)
