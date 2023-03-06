#
# 1. 状态码
## 1-1 状态码分类
|状态码|含义|解释说明|
|---------|---|---|
| 1xx |服务器收到请求收到|1xx开头的请求表示服务端已经收到请求，但是还没有返回信息给客户端|
| 2xx |请求成功，如200|表示客户端已经成功请求数据|
| 3xx |重定向，如302|客户端收到3xx开头的状态码时，表示此时服务端已经不再管客户端所请求地址，让客户端去请 求另外的地址|
| 4xx |客户端错误，404|表示当客户端请求了一个服务端完全不认识的地址时，就会报出4xx的错误|
| 5xx |服务端错误，如500|表示此错误来源于服务端，比如服务端写的接口出现了bug等问题|

## 1-2 常见的状态码
|状态码|含义|用途|
|---------|---|---|
| 200 |OK 成功|一般用于 GET 和 POST 请求|
| 301 |Redirect Permanently 永久重定向|配合location，浏览器自动处理|
| 302 |Found 临时重定向|配合location，浏览器自动处理|
| 304 |Not Modified 资源未被修改|所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源|
| 403 |Forbidden 没有权限|服务器理解请求客户端的请求，但是拒绝执行此请求|
| 404 |Not Found 资源未找到|服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站 设计人员可设置"您所请求的资源无法找到"的个性页面|
| 500 |Internal server Error 服务器错误|服务器内部错误|
| 504 |Gateway Time-out网关超时|充当网关或代理的服务器，未及时从远端服务器获取请求|

**301 永久重定向**：

常见场景有，比如说你的一个网站，域名到期了，或者域名你不想用了，那么老的域名就可以返回一个 301 状态码并配合 location 让 location 的值等于新的域名，最终进行跳转，之后浏览器会记住新的域名，不会再访问老的域名。

**302 临时重定向**：

常见场景有百度，知乎、简书等等。比如说我们要在百度进入菜鸟教程，搜索出来后有一系列的列表，我们可以选择一个去进行一个点击。点击的那个不会直接进入菜鸟教程，而是先跳转到百度设置的一个临时地址，之后再跳转到菜鸟教程真实的地址。


# 2. http方法

## 2-1 methods
> - `get` 获取数据；
> - `post` 新建数据；
> - `patch/put` 更新数据；
> - `delete` 删除数据；
> - `head` 类似于get请求，只不过返回的响应中没有具体的内容，用户获取报头；
> - `options` 允许客户端查看服务器的性能，比如说服务器支持的请求方式等等；
> - `trace` 追踪路径；
> - `connect` 要求用隧道协议连接代理。

## 2-2 Restful API
- `Restful API` 是一种新的 API 设计方法（早已推广使用）。

- 传统 API 设计：把每个 url 当做一个功能。

- `Restful API` 设计：把每个 url 当做一个唯一的资源。

- **2-2-1 如何设计成一个资源？**

    1. 尽量不用 url 参数 

    传统 API 设计：`/api/list?pageIndex=2`
    
    `Restful API` 设计：`/api/list/2`

    2. 用 method 表示操作类型
    
    > 传统 API  设计：
    > - post请求：`/api/create-article`
    > - post请求：`/api/update-article?id=100`
    > - get请求：`/api/get-article?id=100`

    > `Restful API` 设计：
    >- post请求：`/api/article`
    >- post请求：`/api/article/100`
    >- get请求：`/api/article/100`


# 3. http头部
|请求头|含义|
|---|---|
|Accept|浏览器可接收的数据格式|
|Accept-Encoding|浏览器可以接收的算法，如gzip|
|Accept-Language|浏览器可接收的语言，如zh-CN|
|Connectionkeep-alive| 一次TCP连接重复使用|
|cookie|客户端接收到的Cookie信息|
|Host|指定原始的 URL 中的主机和端口|
|User-Agent（简称UA）|浏览器内核信息|
|Content-type|发送数据的格式，如application/json|

---

|响应头	|含义|
|---|---|
|Content-type|返回数据的格式，如application/json|
|Content-length	|返回数据的大小，多少字节|
|Content-Encoding|返回数据的压缩算法，如gzip|
|Set-Cookie|服务端向客户端设置cookie|

# 4. http缓存

## 4-1 缓存
>- 什么是缓存?
缓存是一种保存资源副本并在下次请求时直接使用该副本的技术。
>- 为什么需要缓存？
如果没有缓存的话，每一次网络请求都要加载大量的图片和资源，这会使页面的加载变慢许多。那缓存的目的其实就是为了尽量减少网络请求的体积和数量，让页面加载的更快。
（3）哪些资源可以被缓存？
>- 静态资源（js、css、img）

网站的 html 是不能被缓存的。因为网站在使用过程中 html 随时有可能被更新，随时有可能被替换模板。
网页的业务数据也是不能被缓存的。比如留言板和评论区，用户随时都可以在底下评论，那数据库的内容就会被频繁被更新。

## 4-2 http 缓存策略（强制缓存 + 协商缓存）
## 4-2-1 强制缓存
    强制缓存就是文件直接从本地缓存中获取，不需要发送请求。
- **图片示例:**

    1. 初次请求时，浏览器会向服务器发起请求，服务器接收到浏览器的请求后，返回资源并返回一个 `Cache-Control` 给客户端，该 `Cache-Control` 一般设置缓存的最大过期时间。
    ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5f04f37b588462ab7abf025cfa7c5a8~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

    2. 此时浏览器已经接收到 `cache-control` 的值，那么这个时候浏览器再次发送请求时，它会先检查它的 `cache-control` 是否过期，如果没有过期则直接从本地缓存中拉取资源，返回到客户端，而无需再经过服务器。

    ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a925e79ee724f1099df19d9e61fff32~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

    3. 强制缓存有过期时间，那么就意味着总有一天缓存会失效。那么假设某一天，客户端的 `cache-control` 失效了，那么它就没办法从本地缓存中拉取资源。于是它会像第一张图一样，重新向服务器发起请求，之后服务器会再次返回资源和 `cache-control` 的值。

    ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/52e861b7bcd4445f861147fe24e08ac1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)


- **Cache-Control**

    `Cache-Control`是存在于响应头`Response Headers`中；控制强制缓存的逻辑；
    例如：Cache-Control: max-age = 31536000（单位是秒）。

    |Cache-Control值|含义|
    |-----|---|
    |max-age|设置缓存的最大过期时间|
    |no-cache|不用本地缓存，正常的向服务端请求，服务端怎么处理我们不用管|
    |no-store|简单粗暴，直接从服务端拉取缓存|
    |private|只能允许最终用户做缓存，最终用户即电脑、手机等等|
    |public|允许中间路由或中间代理做缓存|

- **Expires**
    >- 同在 `Response Headers` 中
    >- 同为控制缓存的过期时间（早期使用）
    >- 如果 `cache-control` 与 `expires` 同时存在的话，` cache-control `的优先级高于 `expires`
    

## 4-2-2 协商缓存
>- 协商缓存，也叫对比缓存。
>- 它是一种服务端的缓存策略，即通过服务端来判断某件事情是不是可以被缓存。
>- 服务端判断客户端的资源，是否和服务端资源一样，如果一致则返回 304 ，反之返回 200 和最新的资源。

1. 下图中，表明了协商缓存的全过程。首先，如果客户端是第一次向服务器发出请求，则服务器返回资源和相对应的资源标识给浏览器。该资源标识就是对当前所返回资源的一种唯一标识，可以是`Etag`或者是`Last-Modified`，这两个字段将在图例结束后展开讲解。
之后如果浏览器再次发送请求时，浏览器就会带上这个资源标识。此时，服务端就会通过这个资源标识，可以判断出浏览器的资源跟服务端此时的资源是否一致，如果一致，则返回304，即表示`Not Found`资源未修改。如果判断结果为不一致，则返回200，并返回资源以及新的资源标识。至此就结束了协商缓存的过程。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5684907367bc4101b4e3f4bc23cdb760~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

2. 假设此时我们的协商缓存用`Last-Modified` 来判断。当浏览器第一次发送请求时，服务器返回资源并返回一个 `Last-Modified` 的值给浏览器。这个 `Last-Modified` 的值给到浏览器之后，浏览器会通过 `If-Modified-Since` 的字段来保存 `Last-Modified` 的值，且 `If-Modified-Since` 保存在请求头当中。
之后当浏览器再次发送请求时，请求头会带着 `If-Modified-Since` 的值去找服务器，服务器此刻就会匹配浏览器发过来的 `If-Modified-Since` 是否和自己最后一次修改的 `Last-Modified` 的值相等。如果相等，则返回 304 ，表示资源未被修改；如果不相等，则返回200，并返回资源和新的 `Last-Modified` 的值。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad59e3c8cf7a4399857021563503135a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

3. 假设此时我们的协商缓存用 `Etag` 来判断。当浏览器第一次发送请求时，服务器返回资源并返回一个 `Etag`  的值给浏览器。这个 `Etag` 的值给到浏览器之后，浏览器会通过 `If-None-Match` 的字段来保存` Etag` 的值，且 `If-None-Match` 保存在请求头当中。
之后当浏览器再次发送请求时，请求头会带着 `If-None-Match` 的值去找服务器，服务器此刻就会匹配浏览器发过来的 `If-None-Match` 是否和自己最后一次修改的 `Etag` 的值相等。如果相等，则返回 304 ，表示资源未被修改；如果不相等，则返回 200 ，并返回资源和新的 `Etag` 的值。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a1b3c3bc7e5741809fc6397cebae4f1c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

- **资源标识**

在响应头部 `Response Headers` 中，有两种资源标识：

`Last-Modified` 资源的最后修改时间，对应请求头为 `If-Modified-Since` ；
`Etag` 资源的唯一标识，所谓唯一，可以想象成时人类的指纹，具有唯一性；但 `Etag` 的本质是一个字符串；对应请求头为 `If-None-Match` 。

- **Last-Modified 和 Etag**

当响应头部 `Response Headers` 同时存在 `Last-Modified` 和 `Etag` 的值时，会优先使用 `Etag` ；
`Last-Modified` 只能精确到秒级；
如果资源被重复生成，而内容不变，则 `Etag` 更精确。

- **Headers示例**

由下图所示，响应头中的 `Last-Modified` 对应请求头中的 `If-Modified-Since` ， `Etag` 对应请求头中的 `If-None-Match`

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/626d5061d90c4089805063a000d41bc7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

- **流程图**

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6bab9cf4e4d64d9491934fa506881c09~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)


## 4-3 刷新操作，对缓存的影响
刷新操作。我们平常在上网时，总有某个时刻突然网卡了，这个时候人的本性总是非常不耐烦的，毫不犹豫的就来个刷新。但殊不知，刷新对缓存也存在一定的影响。下面我们一起来看下各种刷新姿势以及其对缓存的影响：

- **正常操作**

    定义： 地址栏输入 url ，跳转链接，前进后退等。

    对缓存的影响： 强制缓存有效，协商缓存有效。

- **手动刷新**

    定义：  F5 ，点击刷新按钮，右击菜单刷新。

    对缓存的影响： 强制缓存失效，协商缓存有效。

- **强制刷新**

    定义： ctrl + F5 。

    对缓存的影响： 强制缓存失效，协商缓存失效。


# 5. http报文

用于 HTTP 协议交互的信息被称为 HTTP 报文，请求端（客户端）的 HTTP 报文叫做请求报文；响应端（服务器端）的叫做响应报文，HTTP 报文本身是由多行数据构成的**字符串文本**。

- 示例：

![img](https://segmentfault.com/img/bVbvbXu?w=2374&h=778)

## 1. http 请求报文结构

- HTTP 报文大致可分为请求行、请求头、空行、请求主体四部分。也有人将报文分为请求首部（请求行+请求头）、空行、请求主体。通常，前几部分是必有的，最后的请求体不是必有的，每个部分结尾都用空行来作为结束标志。

![img](https://segmentfault.com/img/bVbvbwo?w=770&h=324)

> 请求行：请求方法（Method） + 空格 + 统一资源标识符（URI） + 空格 + HTTP版本 + CR LF ；
>
> 请求头：字段名 + 冒号 + 值 + CR LF ；
>
> 空行： 回车符（CR）+ 换行符（LF） ；
>
> 请求体： 由用户自定义添加，如post的body等

- **请求首部实例（谷歌浏览器Network面板）**

![img](https://segmentfault.com/img/bVbvbB0?w=449&h=285)


## 2. http 响应报文结构

响应报文结构与请求报文结构唯一的区别在于第一行中用状态信息代替了请求信息。状态行（status line）通过提供一个状态码来说明所请求的资源情况。

![img](https://segmentfault.com/img/bVbvbK9?w=759&h=286)

> 状态行：HTTP版本 + 空格 + 状态码 + 空格 + 状态码描述 + CR LF ；
>
> 响应头：字段名 + 冒号 + 值 + CR LF ；
>
> 空行： 回车符（CR）+ 换行符（LF） ；
>
> 响应体： 由用户自定义添加，如post的body等

**响应首部实例（谷歌浏览器的Network面板）**

![img](https://segmentfault.com/img/bVbvbLc?w=309&h=123)


## 3. 字段分类详情图

- http请求报文首部中的字段还可以细分为通用首部字段、实体首部字段、请求首部字段，同样，http响应报文首部中的字段还可以细分为通用首部字段、实体首部字段、响应首部字段

![img](https://segmentfault.com/img/bVbvb1p?w=189&h=160)

- 谷歌浏览器的Newwork面板只会把通用首部字段分出来，剩下的字段按请求头字段和响应头字段分成两类，不再做细分

![img](https://segmentfault.com/img/bVbvb17?w=314&h=94)

- 详情图查阅
![img](https://segmentfault.com/img/bV2tEC?w=1641&h=3134)


> [前往参阅更多](https://segmentfault.com/a/1190000019788537)