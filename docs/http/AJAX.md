# **一、什么是Ajax**

1、Ajax的全称是Asynchronous JavaScript and XML，即***\*异步JavaScript+XML\****。
2、它是一种技术方案，但并不是一种新技术。
3、它依赖的是现有的CSS/HTML/Javascript，而其中**最核心的依赖是浏览器提供的XMLHttpRequest对象。这个对象为向服务器发送请求和解析服务器响应提供了流畅的接口，使得浏览器可以发出HTTP请求与接收HTTP响应，实现在页面不刷新的情况下和服务端进行数据交互。**

***\*Ajax\****和**XMLHttpRequest** 两者的关系：我们使用XMLHttpRequest对象来发送一个Ajax请求。





# 二、一个完整的AJAX请求

```javascript
<script>
        var xhr = new XMLHttpRequest()
        //请求响应过程的当前活动阶段
        xhr.onreadystatechange = function(){
            console.log('readyState:',xhr.readyState)
        }
        xhr.open('GET','hello.json',true)
        xhr.send()
        //监听请求状态
        xhr.onload = function(){             //onload相当于readyState=4
            console.log(xhr.status)
            if((xhr.status >= 200 && xhr.status <= 300) || xhr.status === 304){
                console.log(xhr.responseText)
            }else{
                console.log(error)
            }
        }
</script>
```

上述代码中，XHR对象的`readyState`属性，**表示请求响应过程的当前活动阶段**。该属性可取的值如下：

- 0：未初始化。尚未调用open()方法。
- 1：启动。已经调用open()方法，但尚未调用send()方法。
- 2：发送。已经调用send()方法，但尚未接收到响应。
- 3：接收。已经接收到部分响应数据。
- **4：完成。**已经接收到全部响应数据，而且已经可以在客户端使用了。//`onload`表示`readyState = 4`



***\*【注意】\****
1、只要` ***\*readyState\****`属性的值由一个值变成另一个值，就会触发一次**`readystatechange`事件**
2、必须在调用open()方法之前指定***\*` `\*******\*`readystatechange`事件\****处理程序才能确保跨浏览器兼容性。

通过检测`window`对象是否有`XMLHttpRequest`属性来确定浏览器是否支持标准的`XMLHttpRequest`。注意，*不要*根据浏览器的`navigator.userAgent`来检测浏览器是否支持某个JavaScript特性，一是因为这个字符串本身可以伪造，二是通过IE版本判断JavaScript特性将非常复杂。

当创建了`XMLHttpRequest`对象后，要先设置`onreadystatechange`的回调函数。在回调函数中，通常我们只需通过`readyState === 4`判断请求是否完成，如果已完成，再根据`status === 200`判断是否是一个成功的响应。

`XMLHttpRequest`对象的`open()`方法有3个参数，第一个参数指定是`GET`还是`POST`，第二个参数指定URL地址，第三个参数指定是否使用异步，默认是`true`，所以不用写。

*注意*，千万不要把第三个参数指定为`false`，否则浏览器将停止响应，直到AJAX请求完成。如果这个请求耗时10秒，那么10秒内你会发现浏览器处于“假死”状态。

最后调用`send()`方法才真正发送请求。`GET`请求不需要参数，`POST`请求需要把body部分以字符串或者`FormData`对象传进去。

# 三、Ajax讲解

XMLHttpRequest是ajax的核心机制，它是在IE5中首先引入的，是一种支持异步请求的技术。简单的说，也就是javascript可以及时向服务器提出请求和处理响应，而不阻塞用户。达到无刷新的效果。

所以我们先从XMLHttpRequest讲起，来看看它的工作原理。

首先，我们先来看看XMLHttpRequest这个对象的属性。

它的属性有：

onreadystatechange 每次状态改变所触发事件的事件处理程序。

responseText 从服务器进程返回数据的字符串形式。

responseXML 从服务器进程返回的DOM兼容的文档数据对象。

status 从服务器返回的数字代码，比如常见的404（未找到）和200（已就绪）

status Text 伴随状态码的字符串信息

readyState 对象状态值

0 (未初始化) 对象已建立，但是尚未初始化（尚未调用open方法）

1 (初始化) 对象已建立，尚未调用send方法

2 (发送数据) send方法已调用，但是当前的状态及http头未知

3 (数据传送中) 已接收部分数据，因为响应及http头不全，这时通过responseBody和responseText获取部分数据会出现错误，

4 (完成) 数据接收完毕,此时可以通过通过responseXml和responseText获取完整的回应数据

![img](https://pic1.zhimg.com/80/v2-197732a06b752f1bd00b0d765c427a1c_720w.jpg)

如上所示，函数首先检查XMLHttpRequest的整体状态并且保证它已经完成（readyStatus=4），即数据已经发送完毕。然后根据服务器的设定询问请求状态，如果一切已经就绪（status=200），那么就执行下面需要的操作。

对于XmlHttpRequest的两个方法，open和send，其中open方法指定了：

a、向服务器提交数据的类型，即post还是get。

b、请求的url地址和传递的参数。

c、传输方式，false为同步，true为异步。默认为true。如果是异步通信方式(true)，客户机就不等待服务器的响应；如果是同步方式(false)，客户机就要等到服务器返回消息后才去执行其他操作。我们需要根据实际需要来指定同步方式，在某些页面中，可能会发出多个请求，甚至是有组织有计划有队形大规模的高强度的request，而后一个是会覆盖前一个的，这个时候当然要指定同步方式。

Send方法用来发送请求。

知道了XMLHttpRequest的工作流程，我们可以看出，XMLHttpRequest是完全用来向服务器发出一个请求的，它的作用也局限于此，但它的作用是整个ajax实现的关键，因为ajax无非是两个过程，发出请求和响应请求。并且它完全是一种客户端的技术。而XMLHttpRequest正是处理了服务器端和客户端通信的问题所以才会如此的重要。

现在，我们对ajax的原理大概可以有一个了解了。我们可以把服务器端看成一个数据接口，它返回的是一个纯文本流，当然，这个文本流可以是XML格式，可以是Html，可以是Javascript代码，也可以只是一个字。