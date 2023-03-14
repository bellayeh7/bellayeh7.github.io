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

# 更多关于 node-gyp 本地编译环境问题

[点击此处跳转至参考链接](https://www.chenhuojun.com/2020/07/12/%E4%B8%BAnode-gyp%E9%85%8D%E7%BD%AE%E6%9C%AC%E5%9C%B0%E7%BC%96%E8%AF%91%E7%8E%AF%E5%A2%83/)
# python

### pyenv 常用指令

```
pyenv install --list # 列出可安装版本
pyenv install <version> # 安装对应版本
pyenv install -v <version> # 安装对应版本，若发生错误，可以显示详细的错误信息
pyenv versions # 显示当前使用的python版本
pyenv which python # 显示当前python安装路径
pyenv global <version> # 设置默认Python版本
pyenv local <version> # 当前路径创建一个.python-version, 以后进入这个目录自动切换为该版本
pyenv shell <version> # 当前shell的session中启用某版本，优先级高于global 及 local
```

> 参考链接：mac的pyenv安装（https://blog.csdn.net/qq_38915739/article/details/124255473）

# vim 常用指令

### 1. 输入

vim i	切换到输入模式，以输入字符

gg	跳转到文件开头

G	跳转到文件末尾

### 2. 翻页

Ctrl + d	将光标向下翻半屏，通常每次翻屏12行

Ctrl + u	将光标向上翻半屏，通常每次翻屏12行

### 3. 底线命令模式

vim 的底线命令模式：在命令模式下按:(注意是英文冒号)，此时vim的窗口左下方会出现一个:符号，这时就已经进入了底线命令模式了。
> 底线命令模式可以对文件中指定的内容进行保存、替换、查询、删除等等操作

:q	退出 vim 编辑器

:q!	不保存文件，直接退出 vim 编辑器

:w	只保存文件，但不退出 vim 编辑器

:wq	保存文件且退出 vim 编辑器

ZZ	


> 参考链接：mac的pyenv安装（https://juejin.cn/post/7070699702732783623）