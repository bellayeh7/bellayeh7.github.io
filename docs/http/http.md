# 【1】cookie

## 1.cookie是怎样工作的

存储cookie是是浏览器提供的功能，`cookie` 其实是存储在浏览器中的纯文本，当网页要发`http`请求时，浏览器会先检查是否有相应的`cookie`，有则自动添加在`request header`中的`cookie`字段中。这些是浏览器自动帮我们做的，而且每一次`http`请求浏览器都会自动帮我们做。

每个域名下的cookie 的大小最大为4KB，每个域名下的`cookie`数量最多为20个

## 2.cookie的属性

### 1）expires

`expires`是`cookie`失效日期，`expires`必须是 `GMT` 格式的时间

如`expires=Thu, 25 Feb 2016 04:18:00 GMT`表示`cookie`讲在2016年2月25日4:18分之后失效，对于失效的`cookie`浏览器会清空。如果没有设置该选项，则默认有效期为`session`，即会话`cookie`。这种`cookie`在浏览器关闭后就没有了。

### 2）domain path

`domain`是域名，`path`是路径，两者加起来就构成了 URL，`domain`和`path`一起来限制 cookie 能被哪些 URL 访问。

如果没有设置这两个选项，则会使用默认值。`domain`的默认值为设置该`cookie`的网页所在的域名，`path`默认值为设置该`cookie`的网页所在的目录。

### 3）secure

`secure`选项用来设置`cookie`只在确保安全的请求中才会发送。当请求是`HTTPS`或者其他安全协议时，包含 `secure` 选项的 `cookie` 才能被发送至服务器。

### 4）httpOnly

这个选项用来设置`cookie`是否能通过 `js` 去访问。

在客户端是不能通过`js`代码去设置一个`httpOnly`类型的`cookie`的，这种类型的`cookie`只能通过服务端来设置。

## 3. cookie的作用

1.保存用户的登录状态

2.跟踪用户行为

3.HTTP是一个无状态协议，因此Cookie的最大的作用就是存储sessionId用来唯一标识用户？？？ 

# 【2】http,https

## 1.什么是协议？

网络协议是计算机之间为了实现网络通信而达成的一种“约定”或者”规则“，有了这种”约定“，不同厂商的生产设备，以及不同操作系统组成的计算机之间，就可以实现通信。

## 2.HTTP协议是什么？

HTTP协议是**超文本传输协议**的缩写，英文是Hyper Text Transfer Protocol。它是从WEB服务器传输超文本标记语言(HTML)到本地浏览器的传送协议。

设计HTTP最初的目的是为了提供一种发布和接收HTML页面的方法。

HTPP有多个版本，目前广泛使用的是HTTP/1.1版本。

## 3.HTTP原理

HTTP是一个基于TCP/IP通信协议来传递数据的协议，传输的数据类型为HTML 文件,、图片文件, 查询结果等。

浏览器作为HTTP客户端通过URL向HTTP服务端即WEB服务器发送所有请求。

![img](https://pic4.zhimg.com/80/v2-fbef2c48d13068978904f3d1688728ab_720w.jpg)

## 4.HTTP特点

1. http协议支持客户端/服务端模式，也是一种请求/响应模式的协议。
2. 简单快速：客户向服务器请求服务时，只需传送请求方法和路径。请求方法常用的有GET、HEAD、POST。
3. 灵活：HTTP允许传输任意类型的数据对象。传输的类型由Content-Type加以标记。
4. 无连接：限制每次连接只处理一个请求。服务器处理完请求，并收到客户的应答后，即断开连接，但是却不利于客户端与服务器保持会话连接，为了弥补这种不足，产生了两项记录http状态的技术，一个叫做Cookie,一个叫做Session。
5. 无状态：无状态是指协议对于事务处理没有记忆，后续处理需要前面的信息，则必须重传。

## 5.URI和URL的区别

HTTP使用统一资源标识符（Uniform Resource Identifiers, URI）来传输数据和建立连接。

- URI：Uniform Resource Identifier 统一资源**标识**符
- URL：Uniform Resource Location 统一资源**定位**符

URI 是用来标示 一个具体的资源的，我们可以通过 URI 知道一个资源是什么。

URL 则是用来定位具体的资源的，标示了一个具体的资源位置。互联网上的每个文件都有一个唯一的URL。

## 6.HTTP报文组成

### **请求报文构成**

1. 请求行：包括请求方法、URL、协议/版本
2. 请求头(Request Header)
3. 请求正文

### 响应报文构成

1. 状态行
2. 响应头
3. 响应正文

## 7.常见请求方法

- GET:请求指定的页面信息，并返回实体主体。
- POST:向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST请求可能会导致新的资源的建立和/或已有资源的修改。
- HEAD:类似于get请求，只不过返回的响应中没有具体的内容，用于获取报头
- PUT:从客户端向服务器传送的数据取代指定的文档的内容。
- DELETE:请求服务器删除指定的页面。

**post和get的区别：**

- 都包含请求头请求行，post多了请求body。
- get多用来查询，请求参数放在url中，不会对服务器上的内容产生作用。post用来提交，如把账号密码放入body中。
- GET是直接添加到URL后面的，直接就可以在URL中看到内容，而POST是放在报文内部的，用户无法直接看到。
- GET提交的数据长度是有限制的，因为URL长度有限制，具体的长度限制视浏览器而定。而POST没有。

## 8.响应状态码

**访问一个网页时，浏览器会向web服务器发出请求。此网页所在的服务器会返回一个包含HTTP状态码的信息头用以响应浏览器的请求。**

**状态码分类**：

- 1XX- 信息型，服务器收到请求，需要请求者继续操作。
- 2XX- 成功型，请求成功收到，理解并处理。
- 3XX - 重定向，需要进一步的操作以完成请求。
- 4XX - 客户端错误，请求包含语法错误或无法完成请求。
- 5XX - 服务器错误，服务器在处理请求的过程中发生了错误。

**常见状态码**：

- 200 OK - 客户端请求成功
- 301 - 资源（网页等）被永久转移到其它URL
- 302 - 临时跳转
- 304 - 重定向，请求资源与本地缓存相同，未修改
- 400 Bad Request - 客户端请求有语法错误，不能被服务器所理解
- 401 Unauthorized - 请求未经授权，这个状态代码必须和WWW-Authenticate报头域一起使用
- 403 Forbidden - 禁止访问
- 404 - 请求资源不存在，可能是输入了错误的URL
- 500 - 服务器内部发生了不可预期的错误
- 502 Bad Gateway - 网关无响应
- 503 Server Unavailable - 服务器端临时错误，服务器当前不能处理客户端的请求，一段时间后可能恢复正常。
- 504 Gateway Timeout - 网关超时。

## 9.为什么要用HTTPS

HTTP请求是明文传输，因此，HTTP协议不适合传输一些敏感信息

**一般http中存在如下问题：**

- 请求信息明文传输，容易被窃听截取。
- 数据的完整性未校验，容易被篡改
- 没有验证对方身份，存在冒充危险
- 

## 10.HTTPS

HTTPS 协议（HyperText Transfer Protocol over Secure Socket Layer）：一般理解为HTTP+SSL/TLS，通过 SSL证书来验证服务器的身份，并为浏览器和服务器之间的通信进行加密。

## 11.浏览器在使用HTTPS传输数据的流程是什么？

![img](https://pic4.zhimg.com/80/v2-a994fbf3094d737814fe01c2b919477b_720w.jpg)

1. 首先客户端通过URL访问服务器建立SSL连接。
2. 服务端收到客户端请求后，会将网站支持的证书信息（证书中包含公钥）传送一份给客户端。
3. 客户端的服务器开始协商SSL连接的安全等级，也就是信息加密的等级。
4. 客户端的浏览器根据双方同意的安全等级，建立会话密钥，然后利用网站的公钥将会话密钥加密，并传送给网站。
5. 服务器利用自己的私钥解密出会话密钥。
6. 服务器利用会话密钥加密与客户端之间的通信。

## 12.HTTPS的缺点

- HTTPS协议多次握手，导致页面的加载时间延长近50%；
- HTTPS连接缓存不如HTTP高效，会增加数据开销和功耗；
- 申请SSL证书需要钱，功能越强大的证书费用越高。
- SSL涉及到的安全算法会消耗 CPU 资源，对服务器资源消耗较大。

## 13.HTTPS和HTTP的区别

- HTTPS是HTTP协议的安全版本，HTTP协议的数据传输是明文的，是不安全的，HTTPS使用了SSL/TLS协议进行了加密处理。
- http和https使用连接方式不同，默认端口也不一样，http是80，https是443。

## 13. http、https不同（详细）

- 定义

  - http超文本传输协议，用于在浏览器和服务器之间传递信息，是以明文的形式发送的，不适合传输敏感信息，例如身份证密码

  - 安全套接字超文本传输协议，是在http的基础上增加了ssl协议，ssl是靠证书来对浏览器和服务器之间的通信进行加密。

    https协议是由ssl+http构成的，是可加密的，身份认证的网络协议

- 区别：

  - https需要申请证书
  - http是明文传输，https是加密传输
  - 连接方式不同，http端口80，https端口443
  - http是无状态链接，https由ssl+http构成的，是可以加密的，身份认证的网络协议

## 14. HTTP请求头



# 【3】TCP三次握手

1.由客户端发起，向服务端发送SYN

2.服务端收到SYN并返回ACK，SYN

3.客户端收到ACK，SYN并返回ACK确认

4.TCP三次握手的目的是确定服务端和客户端发送和接受能力的正常，建立一个稳定的连接通道

# TCP四次挥手

1.客户端发起挥手，携带SEQ和FIN

2.服务端接收消息并返回ACK，继续处理数据

3.服务端再次发送FIN,SEQ，进入等待状态

4.客户端返回ACK，开启等待计时

* 持续2MSL的目的是防止发送的包没有到达，服务端重新发送的包接收不到，无法关闭；
* 同时也防止包在传输过程中滞留导致对下一次的连接产生影响

5.因为不像建立连接的过程，接收方收到连接请求后可以立即发送SYN进行连接，释放资源时，接受方在收到发送方的释放连接请求后，还需要一段时间来处理未完成的发送请求，这里需要两次确认发送方的请求：第一次是未处理完，我还不能释放，但是收到了你的请求，告诉发送方一声，等等我；第二次确认表示已经处理完请求了，我也可以进行释放了。因此需要四次

# TCP和UDP的区别

1.tcp是面向连接的，udp是无连接的即发送前不需要先建立连接

2.tcp提供可靠的的服务，udp尽最大的努力交付，即不保证可靠交付

3.tcp面向字节流，udp面向报文，并且网络出现拥塞不会使得发送速率降低

4.tcp只能1对1，udp支持1对1，也支持1对多

5.tcp的首部较大为20字节，udp只有8字节

6.tcp是面向连接的可靠性传输，而udp是不可靠的

# 【4.1】强缓存，协商缓存

​	[详细介绍 HTTP Cache](https://www.jianshu.com/p/fb59c770160c)

## 1. 区别

1. 根据响应头header的字段（expires, catche-control）判断是强缓存还是协商缓存

2. 如果是强缓存，判断是否在有效时间内，在的直接从缓存中拿，**返回200状态码**。

3. 协商缓存会向服务端确认资源是否修改（last-modified/if-modified-since ,etag/if-none-match），如果没有就直接从缓存中取**返回304状态码**，如果修改了，服务端会返回修改的资源，**304状态码**。

- **简单说就是：**

  - **强缓存**的 `expires` 和 `cache-control` 都会**访问本地缓存直接验证**看是否过期，如果没过期直接使用本地缓存，并返回 200。

  - 但如果设置了 `no-cache` 和 `no-store` 则本地缓存会被忽略，会去**请求服务器验证**资源是否更新，如果没更新才继续使用本地缓存，此时返回的是 304。这就是**协商缓存**。协商缓存主要包括 `last-modified` 和 `etag`。

## 2. 四类缓存

浏览器读取优先级顺序：`Memory Cache、`

`Service Worker Cache、`

`HTTP Cache、`

`Push Cache`

- HTTP Cache 氛围强缓存和协商缓存

## 3. 强缓存

- expires: 资源过期时间
- cache-control
  - max-age: 资源多少秒之后无效
  - s-maxage：代理服务器起作用
  - public： 资源可以被所有客户端和代理服务器缓存
  - private：（默认）资源只能客户端缓存
  - no-cache：不直接询问浏览器缓存情况，而是直接向服务器**验证**当前资源是否更新（即协商缓存）
  - no-store：不实用缓存策略，不缓存请求或响应的任何内容
- pragma
  - 值有no-cache、no-store。
  - 三者同时出现，优先级：**pragma  >  cache-control  >  expires**

## 4. 协商缓存

- last-modefied： 记录资源最后修改的时间。

- etag：基于资源的内容编码生成一串唯一的标识字符串。服务端会根据该资源当前的内容生成对应的标识字符串和该字段进行对比。

  

#  【4.2】cookie，session，localstorage，sessionstorage

1.都是同源的，都保存在浏览器

2.Cookie：cookie数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递。而sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下,存储的大小很小只有4K左右。 （key：可以在浏览器和服务器端来回传递，存储容量小，只有大约4K左右）cookie只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭。

2.sessionStorage：仅在当前浏览器窗口关闭前有效，自然也就不可能持久保持，localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；cookie只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭。（key：本身就是一个回话过程，关闭浏览器后消失，session为一个回话，当页面不同即使是同一页面打开两次，也被视为同一次回话）localStorage：localStorage 在所有同源窗口中都是共享的；cookie也是在所有同源窗口中都是共享的。（key：同源窗口都会共享，并且不会失效，不管窗口或者浏览器关闭与否都会始终生效）

3.Session与cookie功能效果相同。Session与Cookie的区别在于Session是记录在服务端的，而Cookie是记录在客户端的。

# 【5】前端性能优化



[课程链接（已购买）](https://juejin.cn/book/6844733750048210957/section/6844733750102720526)



# 【6】浏览器渲染原理

[掘金的链接](https://juejin.cn/post/7025635250344558628#heading-27)



# 【7】在地址栏里输入一个URL,到这个页面呈现出来，中间会发生什么？

1.dns解析

2.tcp连接

3.发送http请求

4.服务器处理请求并返回http报文

5.浏览器渲染页面

6.连接结束



# WebSocket的实现和应用

# 


