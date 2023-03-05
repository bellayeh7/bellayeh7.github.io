- [刷卡前端实现1](https://segmentfault.com/q/1010000010550533/)

- [刷卡前端实现2](https://blog.csdn.net/aizuifengshaonian/article/details/115496471)

- https://blog.csdn.net/cntianya/article/details/108222494

- https://segmentfault.com/q/1010000008885433

- https://www.cnblogs.com/caiawo/p/13964003.html

- 

- [字节CSS](https://juejin.cn/post/6936913689115099143#heading-51)

- [50道CSS](https://segmentfault.com/a/1190000013325778)

  [50道](https://juejin.cn/post/6844903832552472583#heading-0)

- [HTML](https://blog.csdn.net/imber___zsk/article/details/122291553)

- [HTML2](https://www.php.cn/div-tutorial-480055.html)

# CSS

## 1. 水平垂直居中

1. **grid栅格布局，父元素设置**

   ```css
   .section{
      display: grid;
      align-content: center;
      justify-content: center;
   }
   .items{
   }
   ```

2. **grid栅格布局，子元素设置**

   ```css
   .section{
       display: grid;
   }
   .items{
       align-self: center;
       justify-self: center;
   }
   ```

3. **table-cell实现文字水平垂直居中（则margin属性会失效**)

   ```css
   .section{
       position: relative;
   }
   .items{
       background-color: #6495ED;
       /* 文字居中展示 */
       display: table-cell;
       vertical-align: middle;
       text-align: center;
       position: relative;
       top: 100px;
       left: 75px;
   }
   ```

4. **绝对定位;  top～right: 0;  margin: auto;**

   ```css
   .section{
       position: relative;
   }
   .items{
       width: 100px;
       height: 100px;
       position: absolute;
       top: 0;
       left: 0;
       right: 0;
       bottom: 0;
       margin: auto;
   }
   ```

5. **绝对定位；margin一半div宽高**

   ```css
   .section{
       position: relative;
   }
   .items{
       position: absolute;
       top: 50%;
       left: 50%;
       margin-left: -50px;
       margin-top: -50px;
       background-color: coral;
   }
   ```

6. **绝对定位；transform translate；**

   ```css
   .section{
       position: relative;
   }
   .items{
       position: absolute;
       top: 50%;
       left: 50%;
       /* translate()函数是css3的新特性.在不知道自身宽高的情况下，可以利用它来进行水平垂直居中 */
       transform: translate(-50%,-50%);
       background-color: red;
   }
   ```

7. **flex布局；父元素设置宽高；**

   ```css
   .section{
       width: 300px;
       height: 300px;
       display: flex;
       justify-content: center;	/* 弹性布局的左右居中对齐 */
       align-items: center;		/*弹性布局的垂直居中对齐*/
   }
   .items{
       background-color: greenyellow;
   }
   ```

8. **flex布局；子元素align-self： center**

   ```css
   .section{
       display: flex;
   }
   .items{
       background-color: crimson;
       margin: auto;
   }
   ```



## 2. BFC模型

- **BOX：css布局的基本单位**
  - Block-level box: display 属性为block，list-item，table的元素，会生成block-level box。参与 block fomatting context。
  - inline-level box: display 属性为inline, inline-table 的元素，慧生成inline-level box.并且参与 inline formatting context。
  - run-in block：css3中才有。

- **Formatting Context**
  - BFC：Block formatting context
  - IFC：Inline formatting context

**Block formatting context    -   块级格式化上下文。BFC是一个完全独立的空间（布局环境），让空间里的字元素不会影响到外面的布局。可以吧BFC看作是一个CSS元素属性。**

- **BFC的布局规则**
  - BFC就是一个块级元素，块级元素会在垂直方向一个接一个的排列。
  - Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。
  - 计算BFC高度的时候，浮动元素也参与计算。
  - BFC就是页面中的一个隔离的独立容器，容器里的标签不会影响到外部标签。
  - BFC的区域不会与float box重叠。
  
- **如何创建BFC**
  - 说法一：
    - float 的值不是 none。
    - position 的值不是 static 或者 relative。
    - display ： inline-block、table-cell、flex、table-caption、inline-flex。
    - overflow 的值不是 visible。
  - 说法二：
    - overflow: hidden;
    - position: absolute；
    - position: fixed;
    - display: inline-block;
    - display: table-cell;
    - display: flex;

- **BFC的作用**

  - 利用BFC避免margin重叠。
  - 自适应两栏布局。
  - 避免使用Float脱离文档流引起的高度塌陷

- **因为BFC内部的元素和外部的元素绝对不会互相影响，因此，当BFC外部存在浮动时，它不应该影响BFC内部的Box的布局，BFC会通过变窄，而不与浮动由重叠。**

  **同样，当BFC内部有浮动时，微了不影响外部元素的布局，BFC计算高度时会包括浮动的高度。避免margin重叠也是这样一个道理。**

## 3. 百分号%

- width、height、relative：width相对于父元素的宽；height相对于父元素的高进行计算。relative:top、bottom相对父元素的高;left 、right相对于父元素的宽进行计算。

- border-raudis：相对自身标签的宽高设置每个边角的垂直和水平半径。

- margin: left、right、top、bottom相当于父元素的宽度进行

- absolute：top、bottom相对定位元素的高;left 、right相对于定位元素的宽进行计算。同时位于absolute中的其他属性如width heiht margin等都相当于定位元素进行计算。

- line-hight设置内联元素垂直居中时,%相对于文本的行高进行计算，非父元素。

  [原文链接](https://blog.csdn.net/qq_40832236/article/details/88785184)

# HTML

## 1. 语义化的理解

- 对开发者友好，利于代码的可读性
- 对机器友好，让搜索引擎更容易读懂，利于seo

## 2. 如何分类标签

- 按闭合特征分类
  - 单标签元素 `<br />、<hr />、 <img />、 <input />、<area />、 <base />、 <link />、 <meta />`
  - 双标签元素 
- 按显示模式分类
  - 行内元素 `<a>超文本链接, <b>文本粗体, <em>强调文本, <i>斜体字, <span>文档中的节, <strong>强调文本`   
  - 块级元素  
  - 行内块元素 `<img>, <input>`
- 按功能分类
  - 文档标签
  - 排版标签
  - 文本格式化标签
  - 图像标签
  - 链接标签
  - 列表标签
  - 表格标签
  - 表单标签

 ## 3. 行内元素、行内块元素

- 行内元素

| a         | 锚点          | cite | 引用       | *label  | 表格标签 | span      | 文本内区块     |
| --------- | ------------- | ---- | ---------- | ------- | -------- | --------- | -------------- |
| br        | 换行          | code | 计算机代码 | q       | 短引用   | strike    | 中划线         |
| big/small | 大字体/小字体 | em   | 强调       | *select | 项目选择 | stong     | 粗体           |
| sub/sup   | 上标/下标     | i    | 斜体       | u       | 下划线   | *textarea | 多行文本输入框 |

- 行内块元素

  ```html
  <br/> //换行
  
  <hr> //分隔线
   
  <input> //文本框等
   
  <img> //图片
   
  <td> //单元格
    
  <select>
    
  <textarea>
    
  <label>
  ```

















