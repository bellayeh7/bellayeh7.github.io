#

# 常用指令

## 1. 配置环境变量

- 在这两个文件夹下 `export` 变量位置
> - ~/.zshrc
> - ~/.bash_profile

- 编辑并保存后，需要执行 `source ~/.zshrc` 或者 `source ~/.bash_profile`


## 2. 删除文件/文件夹 (例python)

> 删除文件夹： ```sudo rm -rf xxx```
>
> 删除文件夹： ```rm -rf xxx```
>
> 删除文件： ```rm -r xxx```


### 例子：卸载pkg安装的python相关文件夹:

- 第一步：删除框架

`sudo rm -rf /Library/Frameworks/Python.framework/Versions/3.11`

- 第二步：删除应用目录

`sudo rm -rf “/Applications/Python 3.11”`

- 第三步：删除指向 Python 的连接

`cd /usr/local/bin/`
`ls -l /usr/local/bin | grep ‘/Library/Frameworks/Python.framework/Versions/3.11’` 主要是显示有哪些链接
`brew prune` 删除这些链接

## 3. homebrew 卸载python

1. 直接 homebrew 卸载
```brew uninstall --ignore-dependencies python ```
2. 输入指令 `pip3 -V`

返回类似：
```
> pip3 -V
pip 22.0.4 from /Library/Frameworks/Python.framework/Versions/3.9/lib/python3.9/site-packages/pip (python 3.9)
```
则进入`/Library/Frameworks`，直接删除`Python.framework`

继续输入`pip3 -V`
还有类似返回，继续上述操作；
返回报错，说明好了。以上基本删光 python