#



## 1. pyenv 常用指令

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


## 2. mac 安装 python 多版本 pyenv

- 使用 homebrew 安装 pyenv
> brew update
> brew install pyenv

- 配置pyenv环境变量：
    如果用的自带shell工具，则在Terminal执行：
    ```
    echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
    echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
    echo 'eval "$(pyenv init -)"' >> ~/.bashrc
    exec $SHELL -l
    ```

> 参考链接 https://www.cnblogs.com/jing99/p/13963048.html