# 
## 1. 解释与编译
编程语言没有编译型和解释型的区别，只能说某个语言常见的执行方式为编译成新代码执行或解释器解释执行
编译器的输入是A语言的源代码，而输出是B语言；比如C++，被编译成汇编语言；
解释器的输入是A语言的源代码，它直接执行A语言；一般解释器的内部实现是一个编译器加一个虚拟机，编译器把输入语言编译成中间语言，虚拟机直接执行中间语言。

## 2. terminal
一个程序，是界面上打开的黑框框本身，比如 xterm、kvt 等。shell 运行于其中。

## 3. shell 概念
shell 是一个命令行解释器，顾名思义就是机器外面的一层壳，用于人机交互，只要是人与电脑之间交互的接口，就可以称为 shell。表现为其作用是用户输入一条命令，shell 就立即解释执行一条。不局限于系统、语言等概念、操作方式和表现方式等。 比如我们平时在黑框框里输入命令，叫 command-line interface (CLI)；在屏幕上点点点，叫graphical user interface (GUI)

## 4. Interactive 和 Non-interactive
Interactive，如果你打开 terminal，在里面输入 bash 代码，回车得到输出，你就是在运行一个 Interactive shell，它的特征是可以让用户输入，然后直接把输出打到界面上；如果你运行一个包含了若干行的 shell 脚本，这些 shell 代码就运行在Non-interactive shell 中。

## 5. Login 和 Non-login
login shell 是指登录系统后所获得的顶层 shell，比如最常用的 ssh 登录，登录完后得到一个 login shell
如果已经登录了桌面电脑，打开 terminal 进入的 shell 就是 Non-login shell。

## 6. 类型
常见的 shell 解释器有 sh、bash这两种，其他的 ksh、csh 和 zsh 等是不常见的。Mac OS 中默认安装了以上所有类型，Windows 需要自行安装，Linux 更不用说了。就像上面说的，只要一门语言有解释器，就可以作为 shell 使用。比如Java 有第三方解释器 Jshell，PHP有 PHP Shell。如果你用过 windows，那你对 cmd 这个词一定不陌生，它是 windows shell，官方名称叫做 command interpreter。

## 7. bash
Bash 是最常见的 shell，Mac系统10.15版本以下默认 shell 是 bash。
[bash官网这篇文章]描述了唤起 bash shell 时加载的不同文件：login shell 加载 `\~/.bash_profile` ，而 non-login shell 加载` \~/.bashrc` 。

## 8. zsh
很多人的 mac 中会使用 zsh 而不是 bash，一大半是因为 oh-my-zsh 这个配置集，它兼容 bash，还有自动补全等好用的功能。zsh 的配置文件`\~/.zshrc`。

## 9. 配置 shell
如上所说，shell 在启动时都会去找配置文件，然后运行它。你安装的一些脚本，如果想让它能够全局运行，就需要在配置文件中设置路径。有过设置路径后还是不管用的经历吗？
多半是因为把配置写在了错误的配置文件里。* 应该在配置shell（最常见的是配置默认命令）之前，使用 `echo $SHELL`，确认自己现在用的是什么shell后，再去编辑对应的配置文件 *


- 如Bash对应的配置文件 `~/.bash_profile`， Zsh对应的配置文件 `~/.zshrc`。


## 10. Shell的查看命令：
在现代的 Linux 上，sh 已经被 bash 代替，/bin/sh往往是指向/bin/bash的符号链接。如果你希望查看当前 Linux或MacOS的默认shell，那么可以输出 shell 环境变量：
`$ echo $SHELL`
如果想知道自己系统安装了哪些shell，使用如下命令可得到如下所示的信息。
`cat /etc/shells`

## 11. Shell的切换命令：

- 切换bash： `chsh -s /bin/bash`
- 切换zsh： `chsh -s /bin/zsh`
- 在终端app的系统偏好设置里手动设置。

## 12. 备注：
当从bash切换为zsh时，如果不想重新配置一遍.zshrc文件，可以__在.zshrc文件中加上`source ~/.bash_profile`，从而直接从.bash_profile文件读取配置。
