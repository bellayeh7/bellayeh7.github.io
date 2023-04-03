#
# less 与 scss
## 1. less、sass、scss是什么
> 1、Less：
> 是一种动态样式语言. 对CSS赋予了动态语言的特性，如变量、继承、运算、函数。
> Less 既可以在客户端上运行 (支持IE 6+, Webkit, Firefox)，也可在服务端运行。

2、Sass：

    是一种动态样式语言，Sass语法属于缩排语法，

>比css比多出好些功能(如变量、嵌套、运算,混入(Mixin)、继承、颜色处理，函数等)，更容易阅读。

Sass与Scss是什么关系?

Sass的缩排语法，对于写惯css前端的web开发者来说很不直观，也不能将css代码加入到Sass里面，因此sass语法进行了改良，Sass 3就变成了Scss(sassy css)。与原来的语法兼容，只是用{}取代了原来的缩进。

## 2. less和sass的相同之处
Less和Sass在语法上有些共性，比如下面这些：

1、混入(Mixins)——class中的class；

2、参数混入——可以传递参数的class，就像函数一样；

3、嵌套规则——Class中嵌套class，从而减少重复的代码；

4、运算——CSS中用上数学；

5、颜色功能——可以编辑颜色；

6、名字空间(namespace)——分组样式，从而可以被调用；

7、作用域——局部修改样式；

8、JavaScript 赋值——在CSS中使用JavaScript表达式赋值。

## 3. less和sass的区别
    Less和Sass的主要不同就是他们的实现方式。

    Less是基于JavaScript，是在客户端处理的。

    Sass是基于Ruby的，是在服务器端处理的。

    关于变量在Less和Sass中的唯一区别就是Less用@，Sass用$。

### 1、Less：

【两种注释方式】
```less

①//less中的注释，但这种不会被编译

②/*

 * 这也是less中的注释，但是会被编译

 */
```


【less中的变量】

1、声明变量:

    @变量名:变量值;

    使用变量: @变量名

    - less中变量的类型：

    ①数字类 1 10px

    ②字符串：无引号字符串 red ;有引号字符串 "haha"

    ③颜色类：red #000000 rgb()

    ④值列表类型：用逗号和空格分隔 10px solid red

    - 变量使用原则：

    多次频繁出现的值、需要修改的值，设为变量

- 2、混合(MiXins)

    ①无参混合

    声明：.name{}

    选择器中调用：.name;

    ②代参混合

    无默认值

    声明：.name(@param){}

    调用：.name(parValue);

    有默认值

    声明：.name(@param:value){} 

    调用：.name(parValue); //parValue可省

    >如果声明时，参数没有默认值，则调用时必须赋值，否则报错！
    >
    >无参混合，会在css中编译除同名的class选择器，有参的不会

- 3、less的匹配模式：

使用混合进行匹配，类似于if结构

声明：

.name(条件一，参数){}

.name(条件二，参数){}

.name(@_,参数){}

调用：

.name(条件值，参数值);

匹配规则：根据调用时提供的条件值去寻找与之匹配的"MiXins"执行，其中@_表示永远需要执行的部分

- 4、less中的运算

+ - * / 可带、可不带单位

颜色运算时，红绿蓝分三组计算，组内可进位，组间互不干涉

- 5、包含了传进来的所有参数：

border:@arguments;

- 6、less中的嵌套：保留HTML中的代码结构

①嵌套默认是后代选择器，如果需要子代选择器，则在子代前加>

②.&表示上一层 &:表示上一层的hover事件


### 2、Sass：

- 1、Sass中的变量

使用 $变量名：变量值，声明变量；

如果变量需要在字符串中嵌套，则需使用#加大括号包裹；

border-#{$left}:10px solid blue;

- 2、Sass中的运算

会将单位也进行运算，使用时需注意最终单位例：10px*10px=100px*px

- 3、sass中的嵌套：

选择器嵌套，属性嵌套，伪类嵌套

选择器嵌套：

　　    ul{ li{} } 后代

           ul{ >li{} } 子代

&:表示上一层 div{ ul{ li{ &=="div ul li" } } }

属性嵌套：

属性名与大括号之间必须有: 

例如:border:{color:red;}

伪类嵌套：ul{li{ &:hover{ "ul li:hover" } } }

- 4、混合宏、继承、占位符

①混合宏：

声明：@mixin name($param:value){}

调用：@include name(value);

>声明时，可以有参，可以无参；可带默认值，也可不带；但是，调用时，必须符合声明规范。同less
>
>优点：可以传参，不会生成同名class；
>
>缺点：会将混合宏中的代码，copy到对应的选择器中，产生冗余代码！

②继承：

声明：.class{}

调用：@extend .class;

>优点：继承的相同代码，会提取到并集选择器中，减少冗余代码
>
>缺点：无法进行传参，会在css中，生成一个同名class

③占位符：

声明：&class{}

调用：@extend %class;

>优点：继承相同代码，会提前到并集选择器；不会生成同名的class选择器
>
>缺点：无法进行传参

综上所述：当需要传递参数时，用混合宏；当有现成的class时用继承；当不需要参数，也不需要class时，用占位符

- 5、if条件结构：

@if 条件 {}@else {}

- 6、for循环结构：

//不包含10;

@for $i from 1 to 10{}

//包含10;

@for $i from 1 through 10{}



- 7、while循环结构：

$j: 1;

@while $j<10 {

    .while#{$j} {　　　　border:#{$j}px solid red;

　　}

　　$j: $j+1;

}

- 8、each循环遍历

@each item in a,b,c,d{//item表示每一项}

- 9、函数：

@function func($length) {　　$length1:$length*5;　　@return $length1;}//调用：

func(10px);

- 10、使用...将传进来的所有参数，接收到一个变量中

@mixin bordeRadius($param1...) {　　//使用...将传进来的所有参数，接收到一个变量中

　　border-radius:$param1;　　-webkit-border-radius:$param1;}


## 4. less与sass 总结
不管是Sass，还是Less，

都可以视为一种基于CSS之上的高级语言，

其目的是使得CSS开发更灵活和更强大，

Sass的功能比Less强大,

基本可以说是一种真正的编程语言了，

Less则相对清晰明了,易于上手,对编译环境要求比较宽松。

考虑到编译Sass要安装Ruby,而Ruby官网在国内访问不了,个人在实际开发中更倾向于选择Less，

但也会去尝试使用sass，毕竟为以后的工作做准备。

>处理机制不一样会带来什么不同？
>
>因为Less与Sass处理机制不一样，
>
>前者是通过客户端处理的，
>
>后者是通过服务端处理，
>
>相比较之下前者解析js会比后者慢一点。

