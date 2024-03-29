
 # 基础知识题 

 # 【1】HTTP 】】】】】】】

## 1. 状态码 

 200 成功 

 301 永久重定向 

 302 临时重定向 

 304 资源未被修改 

 400 Bad request 

 401 Unauthorized 

 403 没有权限 

 404 资源未找到 

 500 服务器错误 

 504 网关超时 

 ## 2. URL到渲染过程 

 -  DNS查找 

 -  建立HTTP链接 

   -  HTTPS: 建立TLS链接 

 -  如果收到301，需要重新发起一条请求 

 -  服务器处理请求 

 -  解析文本，构建DOM树和CSS树 

 -  边解析DOM边加载子资源 

 -  解析到js标签时，会阻塞解析，需要加载、解析、执行完成后继续html解析 

   -  defer：同步加载，加载后最后执行 
   -  async : 同步加载，加载后阻塞执行 
   

 ## 3. HTTP的请求方法 

 -  get 获取 
 -  post 新建[数据]() 
 -  patch / put 更新[数据]() 
 -  delete 删除 

 ## 4. HTTP缓存 

 ## 强制缓存 200

 cache-control: 

 -  max-age=519400(秒) 
 -  no-chache 不用强制缓存 
 -  no-store 不用所有缓存 

 expires： 已被cache-control代替 

 ## 协商缓存 HTTP 304 

 资源标识： 

 -  Last-modified (response) ⇒ if-modified-since (request) 只能精确到秒 
 -  Etag (response) ⇒ if-none-match(request) 优先使用 

 ## 5. HTTPS加密原理 

 -  HTTP缺点 

   -  明文通信 
   -  不验证通信方身份 
   -  无法验证报文完整性 

 在 HTTPS 中，使用传输层安全性(TLS)或安全套接字层(SSL)对通信协议进行加密。也就是 HTTP + SSL(TLS) = HTTPS。 

 CA 证书中的 Hash 值，其实是用证书的私钥进行加密后的值（证书的私钥不在 CA 证书中）。然后客户端得到证书后，利用证书中的公钥去解密该 Hash 值，得到 Hash-a ；然后再利用证书内的签名 Hash [算法]()去生成一个 Hash-b 。最后比较 Hash-a 和 Hash-b 这两个的值。如果相等，那么证明了该证书是对的，服务端是可以被信任的；如果不相等，那么就说明该证书是错误的，可能被篡改了，浏览器会给出相关提示，无法建立起 HTTPS 连接。除此之外，还会校验 CA 证书的有效时间和域名匹配等。 

 ```js
 // key是证书的私钥，crt是签名的证书(公共)。 
 2_ [www.realtimeinterview.work.key](http://www.realtimeinterview.work.key) 
 -----BEGIN RSA PRIVATE KEY----- 
 1_ [www.realtimeinterview.work_bundle.crt](http://www.realtimeinterview.work_bundle.crt) 
 -----BEGIN CERTIFICATE----- 

 -----END CERTIFICATE----- 
 -----BEGIN CERTIFICATE----- 

 -----END CERTIFICATE----- 
 ```

 参考《图解HTTP》 

 ## 6. HTTP2 

 -  http1弊端 

 线头阻塞：TCP连接上只能发送一个请求，前面的请求未完成前，后续的请求都在排队等待。 

 多个TCP连接：虽然HTTP/1.1管线化可以支持请求并发，但是浏览器很难实现，chrome、firefox等都禁用了管线化。所以1.1版本请求并发依赖于多个TCP连接，建立TCP连接成本很高，还会存在慢启动的问题。 

 HTTP/1.1的方式，图片的加载时间主要耗时在stalled，stalled的意思是从TCP连接建立完成，到真正可以传输[数据]()之间的时间差。这就是队头阻塞 

 -  http2特点 
 -  二进制分帧层：采用二进制格式传输[数据]()而不是1.x的文本格式。 


 ![image.png]( https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6fa444bdd2bc47b18f76e7d2ea622ea7~tplv-k3u1fbpfcp-watermark.image?) 

 -  多路复用 (Multiplexing) 

   HTTP2建立一个TCP连接，一个连接上面可以有任意多个流（stream），消息分割成一个或多个帧在流里面传输。帧传输过去以后，再进行重组，形成一个完整的请求或响应。这使得所有的请求或响应都无法阻塞。 

 -  首部压缩（Header Compression） 

   我们在传输首部字段的时候，例如要传输method:GET,那我们只需要传输静态字典里面method:GET对应的索引值就可以了，一个字节搞定 

 -  服务端推送（Server Push） 

   客户端请求index.html，服务器端能够额外推送script.js和style.css。 实现原理就是客户端发出页面请求时，服务器端能够分析这个页面所依赖的其他资源，主动推送到客户端的缓存，当客户端收到原始网页的请求时，它需要的资源已经位于缓存。 

 ## 7. TCP与UDP有什么区别？ 


 ![image.png]( https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa08ef71e8cd4f4e93a32517c5fc4087~tplv-k3u1fbpfcp-watermark.image?) 

 ## 8. TCP如何保障自己的安全？ 

 **检验和：**TCP检验和的计算与UDP一样，在计算时要加上12byte的伪首部，检验范围包括TCP首部及[数据]()部分，但是UDP的检验和字段为可选的，而TCP中是必须有的。计算方法为：在发送方将整个报文段分为多个16位的段，然后将所有段进行反码相加，将结果存放在检验和字段中，接收方用相同的方法进行计算，如最终结果为检验字段所有位是全1则正确（UDP中为0是正确），否则存在错误。可以保证接收方能判断当前报文是否属于自己要接受的报文，如果为0，那就是，不为0，则不是，丢弃此报文。 

 **序列号** TCP 对每个报文进行编号，这些编号就是序列号。而序列号有多种作用 

 a：保证可靠性，当接收到的[数据]()失序时，就能立马知道 

 b：去除重复的报文，[数据]()传输过程中的确认应答，重发控制，重复控制等功能都要依靠序列号来实先。 

 c：提高效率，可以实现多次发送，一次确认。 

 **ACK应答机制**：发送的每一条消息，都需要对方发送一条消息来回复消息是否被收到。 

 **连接管理机制**：三次握手建立连接与四次挥手断开连接，保证了TCP的全双工工作。 

 **快重传和超时重传：**保证了[数据]()能够不丢失的传输[数据]()。（注意：超时重传机制和快重传机制，同时存在。谁先检验到报文失序，谁就生效。） 

 -  快重传：发送方连续收到3个接收方发送的同一个ack时，此时快速重传ack序号以及其之后的所有[数据]()报。 
 -  超时重传：当发送方发送了[数据]()给接收方，当时超过了约定的时间（RTO）也没有接收到确认消息，此时重传此报文。（Tips：RTO也就是重传超时时间，这个时间由TCP的自适应[算法]()生成） 

 **滑动窗口：**滑动窗口既提高了报文传输的效率，也避免了发送方发送过多的[数据]()而导致接收方无法正常处理的异常。[数据]()的发送方和接收方都有滑动窗口，对于发送方来说，窗口内就是可以发送的报文，当窗口的前沿紧挨的报文发送并且确认时，窗口向后移动。而窗口的后沿可以向前移动，当接收方处理不了那么多的报文时，就会发送消息告诉发送方，此时滑动窗口就需要缩小，所以后沿前移。但是TCP非常不建议窗口后沿前移。 

 **拥塞控制：**拥塞控制使得宏观网络中的资源能够合理的应用。实现的[算法]()有四个，慢开始，拥塞避免，快速回复，和快速重传. 

 1.慢开始指一开始发送报文时，不清楚网络中的情况，试探性的发送1cwnd(拥塞窗口)的[数据]()量。 

 2.如果没有到ssthresh(慢开始门限值)，则以指数形式增长，一直到门限值； 

 3.当到达门限值时，此时采用拥塞避免[算法]()让拥塞窗口缓慢增长，即每经过一个RTT（往返时间）就把发送方的拥塞窗口+1，不能是指数性增长了，一直到发生网络拥塞为止。 

 4.当发生网络拥塞时，把ssthresh的值设置为出现拥塞时发送窗口大小的一半，然后把拥塞窗口设置为1，再次执行慢开始[算法]()。 

 5.在发送方知道只是丢失了个别的报文段时，采用快恢复[算法]()，将门限值设置成拥塞窗口大小的一半，并将拥塞窗口设置为当前门限值，并执行拥塞避免[算法]()。 

 6.当发送方一连收到3个对同一个报文段的重复确认时，采用快速重传[算法]()，立即进行重传，这样就不会出现超时，可以使整个网络的吞吐量提高约20%。 

 ## 9. web安全 

 ## xss跨站请求攻击 

 -  在input中嵌入` <script> `，并发表文章，获取阅读的登陆者的cookie 
 -  替换特殊字符，script变为`&l;script `
 -  xss.js npm第三方库 

 ## csrf 跨站请求伪造 

 -  向用户发送邮件，内含需要借用cookie才能执行的url ，`<img [src=xxx.com/pay](http://src=xxx.com/pay)> `

 -  点击链接后，会直接借用cookie 

 -  方案： 
   -  使用post接口 
   -  增加验证，密码验证、短信等 

 ## 10. 线程进程协程 

 -  进程作为拥有资源的基本单位，线程作为调度和分配的基本单位。进程就是一段程序的执行过程例如启动的某个app。进程拥有代码和打开的文件资源、[数据]()资源、独立的内存空间，进程拥有独立的内存空间 
 -  线程，有时被称为轻量级进程（LightWeight Process，LWP），是操作系统调度（CPU调度）执行的最小单位。**线程共享所在进程中的内存空间** 
 -  协程，又称微线程，纤程。英文名Coroutine。一句话说明什么是线程：协程是一种用户态的轻量级线程，协程的调度完全由用户控制（进程和线程都是由cpu 内核进行调度）。 

 ```js
 进程与进程之间完全隔离，互不干扰，一个进程崩溃不会影响其他进程，避免一个进程出错影响整个程序 
 进程与进程之间需要传递某些[数据]()的话，就需要通过进程通信管道IPC来传递 
 一个进程中可以并发多个线程，每个线程并行执行不同的任务 
 一个进程中的任意一个线程执行出错，会导致这个进程崩溃 
 同一进程下的线程之间可以直接通信和共享[数据]() 
 当一个进程关闭之后，操作系统会回收该进程的内存空间 
 ```

 ```js
 浏览器从关闭到启动，然后新开一个页面至少需要：1个浏览器进程，1个GPU进程，1个网络进程，和1个渲染进程，一共4个进程； 
 后续如果再打开新的标签页：浏览器进程，GPU进程，网络进程是共享的，不会重新启动，然后默认情况下会为每一个标签页配置一个渲染进程，但是也有例外，比如从A页面里面打开一个新的页面B页面，而A页面和B页面又属于同一站点的话，A和B就共用一个渲染进程，其他情况就为B创建一个新的渲染进程 
 所以，最新的Chrome浏览器包括：1个浏览器主进程，1个GPU进程，1个网络进程，多个渲染进程，和多个插件进程 

 浏览器进程： 负责控制浏览器除标签页外的界面，包括地址栏、书签、前进后退按钮等，以及负责与其他进程的协调工作，同时提供存储功能 
 GPU进程：负责整个浏览器界面的渲染。Chrome刚开始发布的时候是没有GPU进程的，而使用GPU的初衷是为了实现3D CSS效果，只是后面网页、Chrome的UI界面都用GPU来绘制，这使GPU成为浏览器普遍的需求，最后Chrome在多进程架构上也引入了GPU进程 
 网络进程：负责发起和接受网络请求，以前是作为模块运行在浏览器进程一时在面的，后面才独立出来，成为一个单独的进程 
 插件进程：主要是负责插件的运行，因为插件可能崩溃，所以需要通过插件进程来隔离，以保证插件崩溃也不会对浏览器和页面造成影响 
 渲染进程：负责控制显示tab标签页内的所有内容，核心任务是将HTML、CSS、JS转为用户可以与之交互的网页，排版引擎Blink和JS引擎V8都是运行在该进程中，默认情况下Chrome会为每个Tab标签页创建一个渲染进程 
 ```

 ## 11. 进程间通信 

 `管道通信`：就是操作系统在内核中开辟一段缓冲区，进程1可以将需要交互的[数据]()拷贝到这个缓冲区里，进程2就可以读取了 

 `消息队列通信`：消息队列就是用户可以添加和读取消息的列表，消息队列里提供了一种从一个进程向另一个进程发送[数据]()块的方法，不过和管道通信一样每个[数据]()块有最大长度限制 

 `共享内存通信`：就是映射一段能被其他进程访问的内存，由一个进程创建，但多个进程都可以访问，共享进程最快的是`IPC`方式`信号量通信`：比如信号量初始值是1，进程1来访问一块内存的时候，就把信号量设为0，然后进程2也来访问的时候看到信号量为0，就知道有其他进程在访问了，就不访问了 

 `socket`：其他的都是同一台主机之间的进程通信，而在不同主机的进程通信就要用到socket的通信方式了，比如发起http请求，服务器返回[数据]() 

 ## 12. DNS的查询过程 

 基于 UDP 协议发起 DNS 查询 

 如果某个用户正在用浏览器`mail.baidu.com`的网址，当你敲下回车键的一瞬间： 

 -  1、检查**浏览器缓存**中是否存在该域名与IP地址的映射关系，如果有则解析结束，没有则继续 

 -  2、到**系统本地**查找映射关系，一般在`hosts`文件中，如果有则解析结束，否则继续 

 -  3、到**本地域名服务器**去查询，有则结束，否则继续 

   ```js
   如果你的电脑是直连运营商网络，一般默认设置情况下DNS为DHCP分配到的运营商的服务器地址。 
   如果你的电脑和运营商之间还加了无线或者有线路由，那极有可能路由器本身还内置了一个DNS转发器，这玩意的作用是将发往他所有的DNS请求转发到上层DNS。 
   此时由于路由器本身也接管了下挂电脑的DHCP服务，所以它分配给下面电脑的DNS地址就是它自身，所以你能看到电脑的DNS分配到的可能是192.168.1.1。 
   实际上就是路由器自身，而路由器的DNS转发器将请求转发到上层ISP的DNS。所以这里说DNS是局域网或者是运营商的都可以 
   ```

 -  4、**本地域名服务器**查询**根域名服务器**，该过程并不会返回映射关系，只会告诉你去下级服务器(顶级域名服务器)查询 

 -  5、**本地域名服务器**查询**顶级域名服务器**(即`com`服务器)，同样不会返回映射关系，只会引导你去二级域名服务器查询 

 -  6、**本地域名服务器**查询**二级域名服务器**(即`baidu.com`服务器)，引导去三级域名服务器查询 

 -  7、**本地域名服务器**查询**三级域名服务器**(即`mail.baidu.com`服务器)，此时已经是最后一级了，如果有则返回映射关系，则**本地域名服务器**加入自身的映射表中，方便下次查询或其他用户查找，同时返回给该用户的计算机，没有找到则网页报错 

 -  8、如果还有下级服务器，则依此方法进行查询，直至返回映射关系或报错 

 -  9、 进行缓存 

 ## 13. **浏览器在什么情况下会发起options预检请求？** 

 在非简单请求且跨域的情况下，浏览器会发起options预检请求。 

 # 【2】JS 】】】】】】

 ## 1. 基础[数据]()类型 

 -  `number` 

 -  `string` 

 -  `boolean` 

 -  `undefined` 

 -  `null` 

 -  `Symbol` Symbol 是 ES6 引入了一种新的原始[数据]()类型，表示独一无二的值。可用作对象的唯一属性名，这样其他人就不会改写或覆盖你设置的属性值。for···in，object.keys() 不能访问symbol为key的值。可以通过Object.getOwnPropertySymbols访问到 

   ```js
   let id1 = Symbol('id'); 
   let id2 = Symbol('id'); 
   console.log(id1 == id2) //false 
   ```

 ## 2. 引用[数据]()类型 

 对象(Object)、数组(Array)、函数(Function)。、 

 ## 3. JavaScript 判断是否为数组 

 ```js
 arr instanceof Array 
 Array.isArray(arr) 
 Object.prototype.toString.call(arr) === '[object Array]' 
 ```

 ## 4. 值类型和引用类型 

 值类型一般存在栈中 

 引用类型一般存在堆中，key为内存地址 

 ## 5. JS typeof用法 

 1. 'undefined'       --未定义的变量或值 
 1. 'boolean'         --布尔类型的变量或值 
 1. 'string'           --字符串类型的变量或值 
 1. 'number'         --数字类型的变量或值 
 1. 'object'          --对象类型的变量或值，或者null(这个是js历史遗留问题，将null作为object类型处理) 
 1. 'function'         --函数类型的变量或值 

 ## 6. 原型 

 每个class都有显式原型prototype 

 每个实例都有隐式原型__proto__ 

 实例的隐式原型指向class的prototype 

 可以通过hasOwnProperty检查是否为原型链上的属性 


 ![image.png]( https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9fdf8ab77dff460b97d62284a055fb75~tplv-k3u1fbpfcp-watermark.image?) 

 ## 7. 作用域 

 -  全局作用域 
 -  函数作用域 
 -  块级作用域 

 ## 8. 闭包 

 是作用域应用的特殊情况 

 -  函数作为返回值 
 -  函数作为参数 

 ## 9. this 

 -  在普通函数中执行 》 window 
 -  箭头函数 》 上级作用域的this 
 -  作为对象方法被调用 》 对象 
 -  在class中被new 》 实例本身 
 -  在call bind apply 》 参数对象 

 ## 7. call bind apply 

 -  call和apply都可以修改this的指向，第一个参数是要引用的对象，第二个参数是要传进函数的变量 
 -  不同点：call的变量参数是一个个参数；apply的变量参数是数组 
 -  bind()改过this后，不执行函数，会返回一个绑定新this的函数 

 ```js
 var obj = {}; 
 function f(x,y) { 
    console.log(this,x,y) 
 } 
 f.call(obj,1,2) 
 f.apply(obj,[1,2]) 
 var g = f.bind(obj,1,2) 
 ```

 ```js
 // 分析：这里的bind方***把它的第一个实参绑定给f函数体内的this，所以里的this即指向{x:1}对象； 
 // 从第二个参数起，会依次传递给原始函数，这里的第二个参数2即是f函数的y参数； 
 // 最后调用m(3)的时候，这里的3便是最后一个参数z了，所以执行结果为1+2+3=6 
 // 分步处理参数的过程其实是一个典型的函数柯里化的过程（Curry） 
  function f(y,z){ 
   return this.x+y+z; 
  } 
  var m = f.bind({x:1},2); 
  console.log(m(3)); // 6 
 ```

 ## 8. 箭头函数和普通函数的区别？ 

 ①（重点）函数体内的this对象就是定义时所在的对象，而不是使用时所在的对象。通常this指向是可变的，但在箭头函数中它是固定的。 

 ②不可以当作构造函数。也就是说不能使用new命令，否则会报错。 

 ③不可以使用arguments对象，该对象在函数体内不存在。如果要用可以用rest参数代替。 

 ④不可以使用yield命令，因此箭头函数不能用作Generator函数。 

 ## 9. 异步 

 -  JS是单线程语言， 
 -  JS和DOM渲染共用同一个线程，JS可以修改DOM结构 
 -  浏览器和Node已支持js启用进程，如web worker 

 ## 10. 异步循环处理 

 ```js
 function muti(num) { 
    return new Promise(resolve => { 
      setTimeout(() => { 
          resolve(num * num) 
      }, 1000) 
    }) 
 }; 

 const nums = [1,2,3]; 

 (async function() { 
    for(let i of nums) { 
      const res = await muti(i) 
      console.log(res) 
    } 
 })() 
 // 每隔一秒打印 
 ```

 ## 11. 宏任务和微任务 

 宏任务： setTimeout setInterval Ajax DOM事件 

 微任务： Promise async/await 

 ## 12. Event Loop 

 -  每次Callstack清空，即同步任务执行完 
 -  渲染DOM前会检查微任务 
 -  然后会检查是否需要DOM更新渲染 
 -  检查宏任务 
 -  再触发下一次Event loop，如果有宏任务在下一个loop执行 

 ## 13. Promise的三种状态 

 pending resolved rejected 

 ## 14. DOM api 

 ```js
 document.createElement('p') 
 divdom.appendChild(pdom) 
 divdom.removeChild(pdom) 
 divdom.childNodes 
 ```

 ## 15. 事件监听函数 

 addEventListenter 第一个参数表示事件名称（不含 on，如 "click"）；第二个参数表示要接收事件处理的函数；第三个参数为 useCapture 

 useCapture指定事件是否在捕获或冒泡阶段执行。 

 可能值: 

 -  true - 事件句柄在捕获阶段执行 
 -  false- 默认。事件句柄在冒泡阶段执行 

 ## 16. 事件冒泡 

 event.stopPropagation(); 阻止事件冒泡 

 event.preventDefault(); 

 ## 17. 同源策略 

 协议、域名、端口 

 加载图片、js无视同源策略 

 ## 18. 跨域解决方案： 

 -  <img />用于第三方统计上报 
 -  cors 

 ## 19. Cookie localstorage sessionstorage区别 

 -  cookie: document.cookie前端修改 , 最大4kb 
 -  localstorage 最大5M 
 -  sessionstorage 浏览器关闭则清空 

 ## 20. CommonJS和ES6 Module的区别 

 CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用 

 CommonJS 模块是运行时加载，ES6 模块是编译时输出接口 

 CommonJs 是单个值导出，ES6 Module可以导出多个 

 CommonJs 是动态语法可以写在判断里，ES6 Module 静态语法只能写在顶层 

 CommonJs 的 this 是当前模块，ES6 Module的 this 是 undefined 

 ```js
 // commonjs 
 module.exports= (params) => {} 

 // es6 
 export default = () => {} 
 export const a = () => {} 
 export function a () {} 
 ```

 ## 21. 如何遍历对象的值 

 -  for of 能遍历对象吗 

   `for of`适用遍历数/数组对象/字符串/`map`/`set`等拥有迭代器对象（`iterator`）的集合,但是不能遍历对象，因为没有迭代器对象，但如果想遍历对象的属性，你可以用`for in`循环（这也是它的本职工作）或用内建的`Object.keys()`方法 

 -  for in 和 for of 的区别 

 -  for in 的缺点 

   `for in`更适合遍历对象，当然也可以遍历数组，但是会存在一些问题， 

   比如： 

   1. `index`索引为字符串型数字，不能直接进行几何运算 
   1. 遍历顺序有可能不是按照实际数组的内部顺序 
   1. 使用`for in`会遍历数组所有的可枚举属性，包括原型，如果不想遍历原型方法和属性的话，可以在循环内部判断一下，使用`hasOwnProperty()`方法可以判断某属性是不是该对象的实例属性 

 ## 22. 判断变量类型的几种方法 

 ![image.png]( https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08195dfab5c64ddc803bd23297481c72~tplv-k3u1fbpfcp-watermark.image?) 
 ## 23. v8 的垃圾回收机制 

 []( https://juejin.cn/post/6981588276356317214)< https://juejin.cn/post/6981588276356317214> 

 `JavaScript` 的引用[数据]()类型是保存在堆内存中的，然后在栈内存中保存一个对堆内存中实际对象的引用，所以，`JavaScript` 中对引用[数据]()类型的操作都是操作对象的引用而不是实际的对象。可以简单理解为，栈内存中保存了一个地址，这个地址和堆内存中的实际值是相关的。 

 首先我们声明了一个变量 test，它引用了对象 {name: 'isboyjc'}，接着我们把这个变量重新赋值了一个数组对象，也就变成了该变量引用了一个数组，那么之前的对象引用关系就没有了。 

 JavaScript 垃圾回收机制的原理说白了也就是定期找出那些不再用到的内存（变量），然后释放其内存。 

 -  **标记清除[算法]()：(现在大多数浏览器都是基于标记清除[算法]())** 

   ```js
   垃圾收集器在运行的时候会给存储在内存中的所有变量都加上标记。 
   然后，它会去掉环境中的变量以及被环境中的变量引用的标记。而在此之后再被加上标记的变量将被视为准备删除的变量，原因是环境中的变量已经无法访问到这些变量了。 
   最后。垃圾收集器完成内存清除工作，销毁那些带标记的值，并回收他们所占用的内存空间。 
   ```

   -  引擎在执行 GC（使用标记清除[算法]()）时，需要从出发点去遍历内存中所有的对象去打标记，而这个出发点有很多，我们称之为一组 根 对象，而所谓的根对象，其实在浏览器环境中包括又不止于 全局Window对象、文档DOM树 等 

   **过程** 

   -  垃圾收集器在运行时会给内存中的所有变量都加上一个标记，假设内存中所有对象都是垃圾，全标记为0 
   -  然后从各个根对象开始遍历，把不是垃圾的节点改成1 
   -  清理所有标记为0的垃圾，销毁并回收它们所占用的内存空间 
   -  最后，把所有内存中对象标记修改为0，等待下一轮垃圾回收 

   **缺点** 

   标记清除[算法]()有一个很大的缺点，就是在清除之后，剩余的对象内存位置是不变的，也会导致空闲内存空间是不连续的，出现了 `内存碎片`（如下图），并且由于剩余空闲内存不是一整块，它是由不同大小内存组成的内存列表，这就牵扯出了内存分配的问题,假设我们新建对象分配内存时需要大小为 size，由于空闲内存是间断的、不连续的，则需要对空闲内存列表进行一次单向遍历找出大于等于 size 的块才能为其分配（如下图） 

   **方案** 

   标记整理（Mark-Compact）[算法]() 就可以有效地解决，它的标记阶段和标记清除[算法]()没有什么不同，只是标记结束后，标记整理算***将活着的对象（即不需要清理的对象）向内存的一端移动，最后清理掉边界的内存 

   **V8对标记清除的优化** 

   -  分代式垃圾回收 

​     -  V8 中将堆内存分为新生代和老生代两区域，采用不同的垃圾回收器也就是不同的策略管理垃圾回收 

   -  并行回收(Parallel) 

​     -  垃圾回收器在主线程上执行的过程中，开启多个辅助线程，同时执行同样的回收工作 

   -  增量标记与懒性清理 

​     -  增量就是将一次 GC 标记的过程，分成了很多小步，每执行完一小步就让应用逻辑执行一会儿，这样交替多次后完成一轮 GC 标记 
​     -  增量标记完成后，惰性清理就开始了。当增量标记完成后，假如当前的可用内存足以让我们快速的执行代码，其实我们是没必要立即清理内存的，可以将清理过程稍微延迟一下，让 `JavaScript` 脚本代码先执行，也无需一次性清理完所有非活动对象内存，可以按需逐一进行清理直到所有的非活动对象内存都清理完毕，后面再接着执行增量标记 

   -  并发回收 

​     -  主线程在执行 JavaScript 的过程中，辅助线程能够在后台完成执行垃圾回收的操作，辅助线程在执行垃圾回收的时候，主线程也可以自由执行而不会被挂起 

 -  **引用计数[算法]()** 

   -  当声明了一个变量并且将一个引用类型赋值给该变量的时候这个值的引用次数就为 1 
   -  如果同一个值又被赋给另一个变量，那么引用数加 1 
   -  如果该变量的值被其他的值覆盖了，则引用次数减 1 
   -  当这个值的引用次数变为 0 的时候，说明没有变量在使用，这个值没法被访问了，回收空间，垃圾回收器会在运行的时候清理掉引用次数为 0 的值占用的内存 

   ```js
   let a = new Object()    // 此对象的引用计数为 1（a引用） 
   let b = a      // 此对象的引用计数是 2（a,b引用） 
   a = null      // 此对象的引用计数为 1（b引用） 
   b = null       // 此对象的引用计数为 0（无引用） 
   ...       // GC 回收此对象 
   ```

   **优点** 

   引用计数[算法]()的优点我们对比标记清除来看就会清晰很多，首先引用计数在引用值为 0 时，也就是在变成垃圾的那一刻就会被回收，所以它可以立即回收垃圾 

   而标记清除[算法]()需要每隔一段时间进行一次，那在应用程序（JS脚本）运行过程中线程就必须要暂停去执行一段时间的 `GC`，另外，标记清除[算法]()需要遍历堆里的活动以及非活动对象来清除，而引用计数则只需要在引用时计数就可以了 

   **缺点** 

   首先它需要一个计数器，而此计数器需要占很大的位置，因为我们也不知道被引用数量的上限，还有就是无法解决循环引用无法回收的问题，这也是最严重的 

 ## 24. 如何排查内存泄漏 

 **常见原因：** 

 1. 闭包使用不当引起内存泄漏 

 1. 全局变量 

 1. 分离的DOM节点 

 1. 控制台的打印 

   -  因为console.log是全局方法，在log打印当前组件中的变量的时候，实际上就相当于全局持有了这个变量的引用，垃圾回收的时候是不释放内存的 

 1. 遗忘的定时器 

 1. 事件监听未移除：重复监听 

 **排查方法** 

 -  performance打开内存选项 
 -  memory标签 过一会搭一个堆快照查看统计信息 

 ## 25. map和weakmap区别(强引用，垃圾回收区别) 

 Set 

 -  是一种叫做集合的[数据]()结构(ES6新增的) 
 -  成员唯一、无序且不重复 
 -  `[value, value]`，键值与键名是一致的（或者说只有键值，没有键名） 
 -  允许储存任何类型的唯一值，无论是原始值或者是对象引用 
 -  可以遍历，方法有：`add`、`delete`、`has`、`clear` 

 WeakSet 

 -  成员都是对象 
 -  成员都是弱引用，可以被垃圾回收机制回收，可以用来保存 `DOM` 节点，不容易造成内存泄漏 
 -  不能遍历，方法有 `add`、`delete`、`has` 

 Map 

 -  是一种类似于字典的[数据]()结构，本质上是键值对的集合 
 -  可以遍历，可以跟各种[数据]()格式转换 
 -  操作方法有:`set`、`get`、`has`、`delete`、`clear` 

 WeakMap 

 -  只接受对象作为键名（`null` 除外），不接受其他类型的值作为键名 
 -  键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的 
 -  不能遍历，方法有 `get`、`set`、`has`、`delete` 

 ## 26. 记住0.1 + 0.2 !== 0.3 

 不管是 0.1 还是 0.2 我们的计算机都要先将它转化成二进制的 0.1 和 0.2 

 十进制的 0.1 转化为二进制时，得到的是一个无限循环小数：0.00011…，十进制的 0.2 转化为二进制时亦是如此 

 这里得到一个关键点：二进制无法「用有限的位数」来表示 0.1 和 0.2 

 ```js
 // 判断两个浮点数之间的差值的绝对值有没有超出误差精度： 
 function fn(a, b) { 
  return Math.abs(a - b) < Number.EPSILON 
 } 
 ```

 ## 27. 类数组转数组 

 ```js
 const arrayLike=document.querySelectorAll('div') 

 // 1.扩展运算符 
 [...arrayLike] 
 // 2.Array.from 
 Array.from(arrayLike) 
 // 3.Array.prototype.slice 
 Array.prototype.slice.call(arrayLike) 
 ```

 ## 28. async await 原理 

 async 函数是 Generator 函数的语法糖，Generator+自动执行器 

 ```js
 function readFile(a){ 
   return new Promise(resolve=>{ 
    setTimeout(()=>{ 
      console.log(a); 
      resolve(a); 
    },500) 
   }) 
 } 
 function *foo(){ 
  console.log('a'); 
  var result = yield readFile('b'); 
  console.log('c'); 
 } 
 //刚刚编写的自动执行器 
 function run(g){ 
  var res = g.next(); //记住res.value是个promise对象 
  if(!res.done){ 
   res.value.then(()=>{  //promise解决了才继续执行生成器内部函数 
    run(g); 
   })  
  } 
 } 
 run(foo()); 
 console.log('d'); 
 //
 a
 d //.5秒后
 b
 c
 ```

 ## 29. **nodeJS中的stream(流)的概念及作用？** 

 nodeJS中的流最大的作用是：读取大文件的过程中，不会一次性的读入到内存中。每次只会读取[数据]()源的一个[数据]()块。 

 然后后续过程中可以立即处理该[数据]()块([数据]()处理完成后会进入垃圾回收机制)。而不用等待所有的[数据]()。 

 Node.js中有四种基本的流类型，如下： 

 **1. Readable--可读的流(比如 fs.createReadStream()).** 

 **2. Writable--可写的流(比如 fs.createWriteStream()).** 

 **3. Duplex--可读写的流** 

 **4. Transform---在读写过程中可以修改和变换[数据]()的Duplex流。** 

 ```js
 const fs = require('fs'); 

 // 读取msg.txt中的字符串 hello world 
 const msg = fs.createReadStream('./msg.txt', { 
  highWaterMark: 5 
 }); 

 // 写入到1.txt中 
 const f1 = fs.createWriteStream('./1.txt', { 
  encoding: 'utf-8', 
  highWaterMark: 1 
 }); 

 // 监听读取的[数据]()过程，把读取的[数据]()写入到我们的1.txt文件里面去 
 msg.on('data', (chunk) => { 
  f1.write(chunk, 'utf-8', () => { 
   console.log('写入成功'); 
  }); 
 }); 
 ```

 ## 30. JS多线程通信 

 var worker = new Worker("test.js") 

 在创建了worker对象之后，我们可以通过worker的postMessage()来向后台线程发送消息。可以使用onmessage(msg) 来获取消息。 

 下面我们来看一下多线程之间通信，在这里实现多个worker之间通信实际上需要借助主线程，子线程A将消息发送给主线程，然后主线程将A线程发送的消息发送给B.下面是实现的代码。 

 ## 31. 严格模式 

 ## **'use strict'** ; 

 ecmascript6入门中写道 严格模式主要有以下限制。 

 -  变量必须声明后再使用 
 -  函数的参数不能有同名属性，否则报错 
 -  不能使用`with`语句 
 -  不能对只读属性赋值，否则报错 
 -  不能使用前缀 0 表示八进制数，否则报错 
 -  不能删除不可删除的属性，否则报错 
 -  不能删除变量`delete prop`，会报错，只能删除属性`delete global[prop]` 
 -  `eval`不会在它的外层作用域引入变量 
 -  `eval`和`arguments`不能被重新赋值 
 -  `arguments`不会自动反映函数参数的变化 
 -  不能使用`arguments.callee` 
 -  不能使用`arguments.caller` 
 -  禁止`this`指向全局对象 
 -  不能使用`fn.caller`和`fn.arguments`获取函数调用的堆栈 
-  增加了保留字（比如`protected`、`static`和`interface`） 

 ## 32. JSBridge 

 ## Native 调用 JS 

 > Native 调用 JS 一般就是直接 JS 代码字符串，有些类似我们调用 JS 中的 `eval` 去执行一串代码。 

 Android 4.4之后提供了**evaluateJavascript**来执行JS代码，并且可以获取返回值执行回调： 

 ```js
 String jsCode = String.format("window.showWebDialog('%s')", text); 
 webView.evaluateJavascript(jsCode, new ValueCallback<String>() { 
  @Override 
  public void onReceiveValue(String value) { 

  } 
 }); 
 ```

 iOS的UIWebView使用**stringByEvaluatingJavaScriptFromString**： 

 ```js
 NSString *jsStr = @"执行的JS代码"; 
 [webView stringByEvaluatingJavaScriptFromString:jsStr]; 
 ```

 iOS的WKWebView使用**evaluateJavaScript**： 

 ```js
 [webView evaluateJavaScript:@"执行的JS代码" completionHandler:^(id _Nullable response, NSError * _Nullable error) { 

 }]; 
 ```

 ## 33. JS调用Native 

- 拦截 Scheme 

 ## 34.设计模式 

 ## 观察者模式 

 ```js
 vm.$emit(event, […args]) // publish 
 vm.$on(event, callback) // subscribe 
 ```

 ## 中介者模式 

 不像观察者模式那样通过调用`pub/sub`的形式来实现，而是通过一个中介者统一来管理。 

 中介者模式包含两种角***r />  
 -  中介者（事件发布者） 
 -  通信者 

 Vue中的EventBus? 

 ## 代理模式 

 ES6中的`Proxy`对象 

 ## 工厂模式 

 工厂模式定义一个用于创建对象的接口，这个接口由子类决定实例化哪一个类。 

 ## 单例模式 

 单例模式旨在保证一个类仅有一个实例，并提供一个全局的访问点。 

# 【3】TS 】】】】】】

 ## 1. Interface和type的区别 

 大部分时候一样，两点区别 

 -  `type a = string | number` 直接声明联合类型时 interface无法实现这种写法，type 可以声[明基]()本类型 

 ## 2. never 和 void 的区别 

 -  **void 表示没有任何类型（可以被赋值为 null 和 undefined）** 。 
 -  **never 表示一个不包含值的类型，即表示永远不存在的值**。**拥有 void 返回值类型的函数能正常运行。** 
 -  **拥有 never 返回值类型的函数无法正常返回，无法终止，或会抛出异常。** 

 ## 3. **如何使 TypeScript 项目引入并识别编译为 JavaScript 的 npm 库包？** 

 选择安装 ts 版本，npm install @types/包名 --save； 

 对于没有类型的 js 库，需要编写同名的.d.ts文件 

 ## 4. 定义数组字符串 

 ```js
 type Foo= Array<string>; 
 interface Bar { 
    baz: Array<{ name: string, age: number}> 
 } 

 type Foo = string[]; 
 interface Bar { 
    baz : { name: string, age: number }[] 
 } 
 ```

 ## 5. **简述工具类型 `Exclude`、`Omit`、`Merge`、`Intersection`、`Overwrite`的作用。** 

 Exclude<T, U> 从 T 中排除出可分配给 U的元素。 

 Omit<T, K> 的作用是忽略T中的某些属性。 

 Merge<O1, O2> 是将两个对象的属性合并。 

 Compute<A & B> 是将交叉类型合并 

 Intersection<T, U>的作用是取T的属性,此属性同样也存在与U。 

 Overwrite<T, U> 是用U的属性覆盖T的相同属性。 

 ## 6. **keyof 和 typeof 关键字的作用？** 

 keyof 索引类型查询操作符 获取索引类型的属性名，构成联合类型。 

 typeof 获取一个变量或对象的类型。 

 # 【4】VUE 】】】】】】

 ## 1. v-html的问题 

 -  XSS风险 
 -  子元素会被覆盖 

 ## 2. computed和watch 

 -  computed有缓存，data不变则不会重新计算 
 -  watch深度监听： 

 ```js
 target: { 
    handler(old,val) { 
      // watch监听引用类型，拿不到oldvalue 
      // old === val 
    }, 
  deep:true 
 } 
 ```

 ## 3. v-if和v-show 

 -  v-if为false时无dom元素 
 -  v-show为false时style="display:none" 

 ## 4. v-for和v-if 

 -  Vue2: v-for优先级更高 
 -  Vue3: v-if优先级更高 

 ## 5. v-model修饰符 

 -  v-model.trim 
 -  v-model.lazy 
 -  v-model.number 

 ## 6. Vue组件生命周期 

 ![Untitled.png]( https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ca1296ed0324295875fa33f129d4590~tplv-k3u1fbpfcp-watermark.image?) 


 ## 7. 兄弟组件通信 

 ```js
 //event bus 
 import Vue from 'vue' 
 export default new Vue() 
 // use 
 import eventBus from './eventBus' 
 eventBus.$emit('my-event', newValue) 
 eventBus.$on('my-event', this.func) 
 ```

 **注意：**需要在beforeDestroy中解绑 eventBus.$off('my-event', this.func) 否则造成内存泄***r />  
 ## 8. 父子组件挂载顺序 

 1. parent created 
 1. child created 
 1. child mounted 
 1. parent mounted 

 ## 9. 具名插槽 

 ```html
 <!-- child  -->
 <slot name="a"> 
 <!-- parent  -->
 <SlotCom> 
    <template v-slot:a>xxx</template> 
 </SlotCom> 
 ```

 ## 9. 异步组件 

 -  用于异步加载大size组件,v-if为false时不会加载该组件 

 ```js
 components: { 
    Com: () => import('../Com.vue') 
 } 
 ```

 ## 10. Mixin 

 多个组件有相同逻辑，抽离出来 

 mixin是一个只有逻辑的vue结构组件，引入后可以使用mixin中的data和方法 

 -  问题： 

   -  代码不利于阅读，变量来源不明确 
   -  多mixin引发变量冲突 
   -  多对多mixin时容易复杂度过高 

 # 【4.1】Vuex 

 component >(dispatch)> actions(可以异步)>(commit)>mutations>state 

 # 【4.2】Vue-Router 

 -  history模式 

 ```js
 // nginx 配置 
 location / { 
  try_files $uri $uri/ /index.html; 
 } 
 ```

 ## Vue-Router原理 

 -  hash模式 

 ```js
window.onhashchange=(event => {event.oldURL; event.newURL}) 
 ```

 -  history模式 

 ```js
// 用pushstate方法，浏览器不会刷新页面 
// 向当前浏览器会话的历史堆栈中添加一个状态（state）。 
history.pushState(state,'', url) 
// 监听浏览器前进后退 
window.onpopstate = event => {event.state; location.pathname} 
 ```

 ## 

 ## 11. Vue响应式原理 

 发布订阅模式，结合Object.defineProperty的劫持能力 

 ## 12. 基本API： 

 Object.defineProperty() 

 **`configurable`** 

 当且仅当该属性的 `configurable` 键值为 `true` 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。**默认为 `false`**。 

 **`enumerable`** 

 当且仅当该属性的 `enumerable` 键值为 `true` 时，该属性才会出现在对象的枚举属性中。**默认为 `false`**。 

 ##  缺点： 

 -  深度监听时，data如果嵌套层数过多会导致递归过多，计算量大 

 -  无法监听数组变化 vm.items[indexOfItem] = newValue这种是无法检测的。 

 -  无法监听新增、删除属性（需要使用Vue.set和Vue.delete API 或 使用Object.assign({}, old)完全替换一个新对象） 

   -  解释：Vue 不能检测到对象属性的添加或删除。由于 Vue 会在初始化实例时对属性执行 getter/setter 转化过程，所以属性必须在 data 对象上存在才能让 Vue 转换它，这样才能让它是响应的 

 ![image.png]( https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f1a7a3a8fc947eca1e3ed4f899395a9~tplv-k3u1fbpfcp-watermark.image?) 

 ## 13. 手写一个Vue双向绑定 

 -  极简版本 

 ```html
 <main> 
  <p>请输入:</p> 
  <input type="text" id="input"> 
  <p id="p"></p> 
 </main> 
 ```
 ```js
 const obj = {}; 
 Object.defineProperty(obj, 'txt', { 
  get: function() { 
      
  }, 
  set: function(newVal) { 
   document.getElementById('input').value = newVal; 
   document.getElementById('p').innerHTML = newVal; 
  } 
 }); 

 const input = document.getElementById('input'); 
 input.addEventListener('keyup', function(e){ 
  obj.txt = e.target.value; 
 }) 
 ```

 -  完整版本 

 ```html
 // < https://juejin.cn/post/6844903589278646285> 
 <!DOCTYPE html> 
 <head> 
  <title>myVue</title> 
 </head> 
 <style> 
  #app { 
   text-align: center; 
  } 
 </style> 
 <body> 
  <div id="app"> 
   <form> 
    <input type="text" v-model="number"> 
    <button type="button" v-click="increment">增加</button> 
   </form> 
   <h3 v-bind="number"></h3> 
   <form> 
    <input type="text" v-model="count"> 
    <button type="button" v-click="incre">增加</button> 
   </form> 
   <h3 v-bind="count"></h3> 
  </div> 
 </body> 

 <script> 
  function myVue(options) { 
   this._init(options); 
  } 

  myVue.prototype._init = function (options) { 
   this.$options = options; 
   this.$el = document.querySelector(options.el); 
   this.$data = options.data; 
   this.$methods = options.methods; 
      //_binding保存着model与view的映射关系，也就是我们定义的Watcher的实例。当model改变时，我们会触发其中的指令类更新，保证view也能实时更新 
   this._binding = {}; 
   this._obverse(this.$data); 
   this._complie(this.$el); 
  } 

  myVue.prototype._obverse = function (obj) { 
   var _this = this; 
   Object.keys(obj).forEach(function (key) { //遍历data对象 
    if (obj.hasOwnProperty(key)) { 
     _this._binding[key] = {                                                                              
      _directives: [] 
     }; 
     var value = obj[key]; 
     if (typeof value === 'object') { 
      _this._obverse(value); //如果值还是对象，则遍历处理 
     } 
     var binding = _this._binding[key]; 
     Object.defineProperty(_this.$data, key, { 
      enumerable: true, 
      configurable: true, 
      get: function () { 
       return value; 
      }, 
      set: function (newVal) { 
       if (value !== newVal) { 
        value = newVal; 
        binding._directives.forEach(function (item) { 
         item.update(); 
        }) 
       } 
      } 
     }) 
    } 
   }) 
  } 

​    // 将view与model进行绑定 
  myVue.prototype._complie = function (root) { 
   var _this = this; 
   var nodes = root.children; 
   for (var i = 0; i < nodes.length; i++) { 
​    var node = nodes[i]; 
​    if (node.children.length) { 
​     this._complie(node); 
​    } 

​    if (node.hasAttribute('v-click')) { 
​     node.onclick = (function () { 
​      var attrVal = nodes[i].getAttribute('v-click'); 
​      return _this.$methods[attrVal].bind(_this.$data); 
​     })(); 
​    } 

​    if (node.hasAttribute('v-model') && (node.tagName = 'INPUT' || node.tagName == 'TEXTAREA')) { 
​     node.addEventListener('input', (function(key) { 
​      var attrVal = node.getAttribute('v-model'); 
​      _this._binding[attrVal]._directives.push(new Watcher( 
​       'input', 
​       node, 
​       _this, 
​       attrVal, 
​       'value' 
​      )) 

​      return function() { 
​       _this.$data[attrVal] = nodes[key].value; 
​      } 
​     })(i)); 
​    } 

​    if (node.hasAttribute('v-bind')) { 
​     var attrVal = node.getAttribute('v-bind'); 
​     _this._binding[attrVal]._directives.push(new Watcher( 
​      'text', 
​      node, 
​      _this, 
​      attrVal, 
​      'innerHTML' 
​     )) 
​    } 
   } 
  } 

  function Watcher(name, el, vm, exp, attr) { 
   this.name = name;     //指令名称，例如文本节点，该值设为"text" 
   this.el = el;       //指令对应的DOM元素 
   this.vm = vm;       //指令所属myVue实例 
   this.exp = exp;      //指令对应的值，本例如"number" 
   this.attr = attr;     //绑定的属性值，本例为"innerHTML" 

   this.update(); 
  } 

  Watcher.prototype.update = function () { 
   this.el[this.attr] = this.vm.$data[this.exp]; //比如 H3.innerHTML = this.data.number; 当number改变时，会触发这个update函数，保证对应的DOM内容进行了更新。 
  } 

  window.onload = function() { 
   var app = new myVue({ 
    el:'#app', 
    data: { 
     number: 0, 
     count: 0, 
    }, 
    methods: { 
     increment: function() { 
      this.number ++; 
     }, 
     incre: function() { 
      this.count ++; 
     } 
    } 
   }) 
  } 
 </script> 
 ```

 ## 14. Proxy和Object.defineproperty优劣对比 

 -  Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，Proxy是代理在对象级别的，defineProperty是代理到静态的值级别 

 ```js
 var obj = new Proxy({}, { 
  get: function (target, propKey, receiver) { 
   console.log(`getting ${propKey}!`); 
   return Reflect.get(target, propKey, receiver); 
  }, 
  set: function (target, propKey, value, receiver) { 
   console.log(`setting ${propKey}!`); 
   return Reflect.set(target, propKey, value, receiver); 
  } 
 }); 
 ```

 -  defineProperty 

   -  监听不了数组的变化 
   -  监听手段比较单一，只能监听set和get, Proxy有10几种监听 
   -  必须得把所有的属性全部添加defineProperty, Proxy对整个对象都会进行拦截 

 -  proxy 存在浏览器兼容性问题 

 ## 15. VDOM的diff[算法]() 

 -  两个数结构树diff的时间复杂度On^3 

   -  遍历一边tree1 遍历一边tree2 [排序]() 

 优化后On： 

 -  只比较统一层级，不跨级比较 
 -  tag不相同，直接删除重建，不再深度比较 
 -  tag和key都相同，认为是相同节点，不再深度比较 

 ## 16. v-for为什么使用key 

 在diff[算法]()中通过tag和key判断是否是相同节点 

 ## 17. data为什么是function 

 因为组件本质上是一个class类,使用的时候会进行实例化。 

 如果是对象，复用该组件的时候会发现，因为公用一个对象，所以他们的[数据]()会保持同步 

 ## 18. Vue3比Vue2有什么优势 

 -  体积更小，性能更好 
 -  TS支持（Vue3是TS开发的） 
 -  更好的逻辑抽离/代码组织 

 ## 19. Vue3的生命周期 

 Option API 
 -  beforeDestroy改名为了beforeUnmount 
 -  destroyed改名为了unmounted 
 -  其余相同 
    

 Composition API 

 import { onMounted } from 'vue'; 

 ```js
 export default { 
    setup() { 
      onMounted(() => {xxxx}) 
    } 
 } 
 ```

 ## 20. Option API和Composition API对比 

 -  option api有很多语法糖，不符合js语法逻辑 
 -  代码逻辑抽离 

 ## 21. Composition API和React Hook对比 

 -  setup只被调用一次，hooks是（组件渲染/更新时）多次调用 

 ## 22. Vue3升级了哪些功能 

 -  **composition api** 

   -  reactive: 做对象的响应式 

   -  ref 

​     -  ref 可以生成 值类型（即基本[数据]()类型） 的响应式[数据]()； 
​     -  ref 通过 .value 来修改值（一定要记得加上 .value ）； 
​     -  ref 不仅可以用于响应式，还可以用于模板的 DOM 元素。 

   -  toref: 

   -  torefs: 

​     -  toRefs 是针对整个对象的所有属性，目标在于将响应式对象（ reactive 封装）转换为普通对象 

   -  readonly 

   -  setup 

   -  watch和watchEffect 

   -  生命周期钩子函数 

 -  初始化实例从new Vue() 改成了Vue.createApp() 

   -  为了在多个new Vue时， 使用Vue.config之类的全局方法时不会污染其他Vue实例 

 -  emits属性: 规范化 

   ```js
   export default { 
      emits: ['onChangeData'], 
      setup(props, {emit}) { 
        emit('onChangeData', data) 
      } 
   } 
   ```

 -  支持@click="one(), two()" 语法糖 

 -  支持template根节点时不需要包裹组件 

 -  移除了filter 

 -  <teleport to="body"> 可以把组件直接挂载到body dom上 

 -  <suspense> 用来给异步组件未加载完成时给一个fallback的 组件（用于显示loading） 

 ## 23. setup中如何获取vue实例 

 setup中没有this（undefined），需要使用 getCurrentInstance 

 ## 24. 修饰符 

 **v-model** 

 -  `lazy`修饰符作用是，改变输入框的值时value不会改变，当光标离开输入框时，`v-model`绑定的值value才会改变 
 -  `trim`修饰符的作用类似于JavaScript中的`trim()`方法，作用是把`v-model`绑定的值的首尾空格给过滤掉 
 -  `number`修饰符的作用是将值转成数字，但是先输入字符串和先输入数字，是两种情况 

 **click** 

 -  `stop`修饰符的作用是阻止冒泡 
 -  事件默认是由里往外`冒泡`，`capture`修饰符的作用是反过来，由外网内`捕获` 
 -  `once`修饰符的作用是，事件只执行一次 
 -  `prevent`修饰符的作用是阻止默认事件（例如a标签的跳转） 
 -  `native`修饰符是加在自定义组件的事件上，保证事件能执行 

 ## 25. Vue.use 

 Vue.use方法主要做了如下的事： 

 1. 检查插件是否安装，如果安装了就不再安装 
 1. 如果没有没有安装，那么调用插件的install方法，并传入Vue实例 

 # 【5】React 】】】】】】

 ## 1. 封装组件集成原生组件的属性 

 ```js
  interface PinProps extends React.ComponentProps<typeof Rate> {} 
 ```

 ## 2. constructor为什么要bind this 

 当我们将这个函数引用赋值给某个其他变量并使用这个新的函数引用去调用该函数时，我们在 `display()` 中获得了不同的`this`值。 

 ```js
 var name = "uh oh! global"; 
 var outerDisplay = obj.display; 
 outerDisplay(); // uh oh! global 
 ```

 在上面的例子里，当我们调用 `outerDisplay()` 时，我们没有指定一个具体的上下文对象。这是一个没有所有者对象的纯函数调用。在这种情况下，`display()` 内部的 `this` 值回退到**默认绑定**。现在这个 `this` 指向全局对象，在严格模式下，它指向 `undefined`。 

 ## 3. react生命周期 


 ![image.png]( https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a17cfac1485448c1b53749efdf68ccec~tplv-k3u1fbpfcp-watermark.image?) 

 ## 4. 非受控组件 

 -  在上传按钮中需要使用非受控组件 

 必须操作DOM的时候 **

 ## 5. Portal 

 将组件移动到包裹外： 

 -  父组件z-index太低 

 ```js
 ReactDOM.createPortal(<div></div>, document.body) 
 ```

 ## 6. 异步组件 

 ```js
 const Home = React.lazy(() => import('views/home/home')); 
 ```

 ## 7. shouldComponentUpdate(nextProps,nextState) 

 因为React默认父组件有更新时，子组件无条件更新 

 ## 8. PureComponent 

 直接在SCU中实现了浅比较 

 ## 9. setState更新值 

 出于性能方面的考虑，React 可以将多次的 setState() 调用合并为一次 

 -  普通使用： 异步 

   ```js
   this.setState({ 
      count: count + 1 
   }, () => {callbackFunc() //解决异步问题}) 
   ```

 -  setTimeout和自己定义的addEventListener DOM事件 同步 

 > 在React中，**如果是由React引发的事件处理（比如通过onClick引发的事件处理），调用setState不会同步更新this.state，除此之外的setState调用会同步执行this.state** 。所谓“除此之外”，指的是绕过React通过addEventListener直接添加的事件处理函数，还有通过setTimeout/setInterval产生的异步调用。 

 > **原因：** 在React的setState函数实现中，会根据一个变量isBatchingUpdates判断是直接更新this.state还是放到队列中回头再说，而isBatchingUpdates默认是false，也就表示setState会同步更新this.state，但是，**有一个函数batchedUpdates，这个函数会把isBatchingUpdates修改为true，而当React在调用事件处理函数之前就会调用这个batchedUpdates，造成的后果，就是由React控制的事件处理过程setState不会同步更新this.state** 

 ## 10. fiber 

 将reconciliation阶段任务拆分 

 DOM需要渲染时暂停，空闲时恢复 

 window.requestIdleCallback 

 ## 11. React和Vue的区别 

 -  开发风格： React ⇒ JS Vue ⇒ html 
 -  React函数式编程 Vue声名式编程 
 -  Vue把想要的都给你 

 ## 12. hooks对比class的好处 

 函数式组件在hook之前更多承担渲染静态组件的职能。 

 -  业务代码更加聚合： 事件绑定卸载更清晰； 
 -  逻辑复用方便；相比较于class高阶组件 

 ## 13. hooks和class区别 

 -  命令式 VS 声明式 

   -  一个是被动触发，一个是主动声明。 

 -  去生命周期化 

   -  开发者能够将精力聚焦在更高的抽象层次上 

 -  去 this 化 

 # 【6】CSS 】】】】】】】

 ## 1. 优先级 

 优先级是由 `A` 、`B`、`C`、`D` 的值来决定的，其中它们的值计算规则如下： 

 1. 如果存在内联样式，那么 `A = 1`, 否则 `A = 0`; 
 1. `B` 的值等于 `ID选择器` 出现的次数; 
 1. `C` 的值等于 `类选择器` 和 `属性选择器` 和 `伪类` 出现的总次数; 
 1. `D` 的值等于 `标签选择器` 和 `伪元素` 出现的总次数 。 

 这样子直接看好像也还是很明白 ，那先上个例子： 

 ```js
 #nav-global > ul > li > a.nav-link 
 ```

 套用上面的[算法]()，依次求出 `A` `B` `C` `D` 的值： 

 1. 因为没有内联样式 ，所以 `A = 0`; 
 1. ID选择器总共出现了1次， `B = 1`; 
 1. 类选择器出现了1次， 属性选择器出现了0次，伪类选择器出现0次，所以 `C = (1 + 0 + 0) = 1`； 
 1. 标签选择器出现了3次， 伪元素出现了0次，所以 `D = (3 + 0) = 3`; 

 上面算出的`A` 、 `B`、`C`、`D` 可以简记作：`(0, 1, 1, 3)`。 

 为了熟悉掌握优先级[算法]() ，我们再来做一些练习： 

 ```js
 li                 /* (0, 0, 0, 1) */ 
 ul li                /* (0, 0, 0, 2) */ 
 ul ol+li              /* (0, 0, 0, 3) */ 
 ul ol+li              /* (0, 0, 0, 3) */ 
 h1 + *[REL=up]           /* (0, 0, 1, 1) */ 
 ul ol li.red            /* (0, 0, 1, 3) */ 
 li.red.level            /* (0, 0, 2, 1) */ 
 a1.a2.a3.a4.a5.a6.a7.a8.a9.a10.a11 /* (0, 0, 11,0) */ 
 #x34y                /* (0, 1, 0, 0) */ 
 li:first-child h2 .title      /* (0, 0, 2, 2) */ 
 #nav .selected > a:hover      /* (0, 1, 2, 1) */ 
 html body #nav .selected > a:hover /* (0, 1, 2, 3) */ 
 **比较规则是: 从左往右依次进行比较 ，较大者胜出，如果相等，则继续往右移动一位进行比较 。如果4位全部相等，则后面的会覆盖前面的** 
 ```

 ## 2. margin纵向重 

 相邻元素的margin-top和margin-bottom会重叠 

 空白内容的p标签也会重叠 

 ## 3. margin 负值 

 -  margin-top和margin-left会向上、左移动 
 -  margin-right和margin-bottom会让右方、下方元素向自己移动，自己不受影响 

 ## 4. Flex 

 `flex:1` 为：`flex: 1 1 0`; 

 ## 容器属性 

 -  fex-direction 
 -  flex-wrap 
 -  justify-content 
 -  align-items 
 -  align-content 多根轴线的对齐方式 

 ## 项目的属性 

 ```js
 order 定义项目的排列顺序。数值越小，排列越靠前，默认为0。 
 flex-grow 属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。 
 flex-shrink 属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。 
 flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间（main size） 
 flex 默认值为0 1 auto 
 align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性 
 ```

 ```css
 .item { 
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ] 
 } 
 ```

 ## 5. 元素垂直居中 

 ## 水平 

 -  行内元素： text-align: center; 

 -  块级元素：margin: 0 auto; 

 -  flex: justify-content: center; 

 -  absolute定位： 

   -  已知宽度： left: 50%; margin-left: -0.5*宽度 
   -  未知宽度： left: 50%; transform(translateX(-50%)) 

 ## 垂直 

 -  行内元素： display:inline-block; vertical-align:middle; 

 -  flex: aligin-items: center 

 -  absolute定位： 

   -  top: 50%;transform: translate( 0, -50%); 
   -  top: 50%;height: 高度; margin-top: -0.5高度; 

 ## 6. 用css画个三角形 

 ```css
 div { 
    width: 0; 
    height: 0; 
    border-bottom: 200px solid #000000; 
    border-others: 200px solid transparent; 
 } 
 ```

 ## 7. less sass理解 有什么好处 特点 

 1. 支持嵌套 
 1. 支持变量定义 
 1. 支持“模板函数”（自己定义的名称。。。），比如有些CSS需要做兼容前缀的话，你可以这样使用一个模板函数定义一下，调用的时候传入正常值就可以了。会自动生成前缀的CSS 

 ## 8. css样式隔离怎么做 

 ![image.png]( https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9c55f50c18d428091e4f45c9365ad7d~tplv-k3u1fbpfcp-watermark.image?) 

 ## 9. 伪类、伪元素 

 -  伪元素 

   -  :before 
   -  :after 

 -  伪类 

   -  visited 
   -  hover 
   -  active 
   -  focus 
   -  first-child 

 ## 10. BFC块级格式化上下文 

 一块独立渲染区域，内部渲染不影响边界以外的元素 

 形成条件： 

 -  float不是none 
 -  position是absolute或fixed 
 -  overflow不是visible 
 -  display是flex inline-block 

 ## 清除浮动 

 ```css
 .clearfix:after { 
   content: ''; 
   height: 0; 
   display: block; 
   clear: both; 
 } 
 ```

 ## 响应式 

 - @media screen and (max-width: 768px){} 

 ## 11. rem 移动端布局原理 

 相对于根html元素的fontsize相对长度单位 

##  12. Grid布局 

 ```css
 .container { 
  display: grid; 
  grid-template-columns: 100px 100px 100px; 
  grid-template-rows: 100px 100px 100px; 
    grid-row-gap: 20px; 
  grid-column-gap: 20px; 
    // 单元格内容的水平位置 
    justify-items: start | end | center | stretch; 
  align-items: start | end | center | stretch; 
    // 整个内容区域在容器里面的水平位置 
    justify-content: start | end | center | stretch | space-around | space-between | space-evenly; 
  align-content: start | end | center | stretch | space-around | space-between | space-evenly; 
 } 
 ```

##  13. less和scss区别 


 ![image.png]( https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93c5d447722341638317f62add98c594~tplv-k3u1fbpfcp-watermark.image?) 

 # 【7】JS高频手写代码题 】】】】】

 ## 1. 深拷贝 

 ```js
 function deepClone(obj = {}) { 
    //等同于 obj === null || obj === undefined 
    if(typeof obj !== 'object' || obj == null) { 
      return obj; 
    } 
    let result; 
    if (obj instanceof Array) { 
      result = []   
    }else { 
      result = {} 
    } 
    for (let key in obj) { 
      // 保证key不是原型的属性 
      if (obj.hasOwnProperty(key)) { 
        result[key] = deepClone(obj[key]); 
      } 
    } 
    return result; 
 } 
 ```

 ## 2. 手写bind函数 

 ```js
 Function.prototype.bind = function(context, ...args) { 
  var self = this; 
  return function F() { 
   // 考虑new的情况 
   if(this instanceof F) { 
    return new self(...args, ...arguments) 
   } 
   return self.apply(context, [...args, ...arguments]) 
  } 
 } 
 ```

 ## 3. 手写apply 

 ```js
 Function.prototype.apply = function(context = window, args) { 
  const fn = Symbol('fn'); 
  context[fn] = this; 
    // 将Function赋值到目标context对象上，然后执行context上临时加的Function方法，将结果返回，最后再把Function删除掉 
  const res = context[fn](...args); 
  delete context[fn]; 
  return res; 
 } 

 // 链接：< https://juejin.cn/post/6875152247714480136> 
 ```

 ## 4. 手写new 

 ```js
 function mynew(Func, ...args) { 
   // 1.创建一个新对象 
   const obj = {} 
   // 2.新对象原型指向构造函数原型对象 
   obj.__proto__ = Func.prototype 
   // 3.将构建函数的this指向新对象 
   let result = Func.apply(obj, args) 
   // 4.根据返回值判断 
   return result instanceof Object ? result : obj 
 } 
 ```

 ## 5. 手写Map 

 ```js
 Array.prototype._map = function (fn, thisArr) { 
    if (this == undefined) { 
     throw new TypeError('this is null or not undefined'); 
   } 
    if (Object.prototype.toString.call(fn) !== '[object Function]') { 
     throw new TypeError(fn + 'is not a function'); 
   } 
   let res = [] 
   let mapArr = this // [1, 2, 3] 
   for (let i = 0; i < mapArr.length; i++) { 
     res[i] = fn.call(thisArr, mapArr[i], i, mapArr) 
   } 
   return res 
 } 
 ```

 ## 6. 手写reduce 

 ```js
 Array.prototype.myReduce = function (cb, initialValue) { 
  const array = this//获取数组 
  let acc = initialValue || array[0]//acc相当于pre 
  const startIndex = initialValue ? 0 : 1 
  for (let i = startIndex; i < array.length; i++) { 
   const cur = array[i] 
   acc = cb(acc, cur, i, array) 
  } 
  return acc 
 } 
 ```

 ## 7. 函数珂里化 

 ```js
 function add() { 
  const _args = [...arguments]; 
  function fn() { 
   _args.push(...arguments); 
   return fn; 
  } 
  fn.toString = function() { 
   return _args.reduce((sum, cur) => sum + cur); 
  } 
  return fn; 
 } 
 ```

 ## 8. 手写JSONP 

 ```js
 const jsonp = ({ url, params, callbackName }) => { 
  const generateUrl = () => { 
   let dataSrc = ''; 
   for (let key in params) { 
    if (Object.prototype.hasOwnProperty.call(params, key)) { 
     dataSrc += `${key}=${params[key]}&`; 
    } 
   } 
   dataSrc += `callback=${callbackName}`; 
   return `${url}?${dataSrc}`; 
  } 
  return new Promise((resolve, reject) => { 
   const scriptEle = document.createElement('script'); 
   scriptEle.src = generateUrl(); 
   document.body.appendChild(scriptEle); 
   window[callbackName] = data => { 
    resolve(data); 
    document.removeChild(scriptEle); 
   } 
  }) 
 } 
 ```

 ## 9. 防抖函数debounce 

 触发高频事件后n秒内函数只会执行一次,如果n秒内高频事件再次触发,则重新计算时间。 

 ```js
 const debounce = (fn, time) => { 
  let timeout = null; 
  return function() { 
   clearTimeout(timeout) 
   timeout = setTimeout(() => { 
    fn.apply(this, arguments); 
   }, time); 
  } 
 }; 
 ```

 ## 10. 节流函数throttle 

 高频事件触发,但n秒内只会执行一次,所以节流会稀释函数的执行频率。 

 ```js

 const throttle = (fn, time) => { 
  let flag = true; 
  return function() { 
   if (!flag) return; 
   flag = false; 
   setTimeout(() => { 
    fn.apply(this, arguments); 
    flag = true; 
   }, time); 
  } 
 } 
 ```

 ## 11. Promise 

 ```js
 const PENDING = 'PENDING';   // 进行中 
 const FULFILLED = 'FULFILLED'; // 已成功 
 const REJECTED = 'REJECTED';  // 已失败 

 class Promise { 
  constructor(exector) { 
   this.status = PENDING; 
   this.value = undefined; 
   this.reason = undefined; 
   this.onFulfilledCallbacks = []; 
   this.onRejectedCallbacks = []; 

   const resolve = value => { 
    if (this.status === PENDING) { 
     this.status = FULFILLED; 
     this.value = value; 
     this.onFulfilledCallbacks.forEach(fn => fn(this.value)); 
    } 
   } 
   const reject = reason => { 
    if (this.status === PENDING) { 
     this.status = REJECTED; 
     this.reason = reason; 
     this.onRejectedCallbacks.forEach(fn => fn(this.reason)) 
    } 
   } 
   try { 
    exector(resolve, reject); 
   } catch(e) { 
    reject(e); 
   } 
  } 
  then(onFulfilled, onRejected) { 
   onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value; 
   onRejected = typeof onRejected === 'function'? onRejected : 
   // reason => { throw new Error(reason instanceof Error ? reason.message : reason) } 
   const self = this; 
   return new Promise((resolve, reject) => { 
    if (self.status === FULFILLED) { 
     try { 
      setTimeout(() => { 
       const result = onFulfilled(self.value); 
       result instanceof Promise ? result.then(resolve, reject) : resolve(result); 
      }); 
     } catch(e) { 
      reject(e); 
     } 
    } else if (self.status === REJECTED) { 
     try { 
      setTimeout(() => { 
       const result = onRejected(self.reason); 
       result instanceof Promise ? result.then(resolve, reject) : resolve(result); 
      }) 
     } catch(e) { 
      reject(e); 
     } 
    } else if (self.status === PENDING) { 
     self.onFulfilledCallbacks.push(() => { 
      try { 
       // 模拟微任务 
       setTimeout(() => { 
        const result = onFulfilled(self.value); 
        // 分两种情况： 
        // 1. 回调函数返回值是Promise，执行then操作 
        // 2. 如果不是Promise，调用新Promise的resolve函数 
        result instanceof Promise ? result.then(resolve, reject) : resolve(result); 
       }) 
      } catch(e) { 
       reject(e); 
      } 
     }); 
     self.onRejectedCallbacks.push(() => { 
      try { 
       setTimeout(() => { 
        const result = onRejected(self.reason); 
        result instanceof Promise ? result.then(resolve, reject) : resolve(result); 
       }) 
      } catch(e) { 
       reject(e); 
      } 
     }) 
    } 
   }); 
  } 
  catch(onRejected) { 
   return this.then(null, onRejected); 
  } 

  static resolve(value) { 
   if (value instanceof Promise) { 
    // 如果是Promise实例，直接返回 
    return value; 
   } else { 
    // 如果不是Promise实例，返回一个新的Promise对象，状态为FULFILLED 
    return new Promise((resolve, reject) => resolve(value)); 
   } 
  } 
  static reject(reason) { 
   return new Promise((resolve, reject) => { 
    reject(reason); 
   }) 
  } 
  static all(promiseArr) { 
   let index = 0, result = [] 
   return new Promise((resolve, reject) => { 
     promiseArr.forEach((p, i) => { 
       Promise.resolve(p).then(val => { 
         index++ 
         result[i] = val 
         if (index === promiseArr.length) { 
           resolve(result) 
         } 
       }, err => { 
         reject(err) 
       }) 
     }) 
   }) 
  } 
  static race(promiseArr) { 
   return new Promise((resolve, reject) => { 
    promiseArr.forEach(p => { 
     Promise.resolve(p).then( 
      val => resolve(val), 
      err => reject(err), 
     ) 
    }) 
   }) 
  } 
    static any(promiseArr) { 
      let index = 0 
   return new Promise((resolve, reject) => { 
     if (promiseArr.length === 0) return 
     promiseArr.forEach((p, i) => { 
       Promise.resolve(p).then(val => { 
         resolve(val) 
          
       }, err => { 
         index++ 
         if (index === promiseArr.length) { 
          reject(new AggregateError('All promises were rejected')) 
         } 
       }) 
     }) 
   }) 
    } 
 } 
 ```

 ## 12. 手写Ajax 

 ```js
 const getJSON = function(url) { 
  return new Promise((resolve, reject) => { 
   const xhr = new XMLHttpRequest(); 
   xhr.open('GET', url, false); // false代表异步 
   // xhr.setRequestHeader('Accept', 'application/json'); 
   xhr.onreadystatechange = function() { 
    if (xhr.readyState !== 4) return; 
    if (xhr.status === 200 || xhr.status === 304) { 
     resolve(xhr.responseText); 
    } else { 
     reject(new Error(xhr.responseText)); 
    } 
   } 
   xhr.send(); 
  }) 
 } 
 ```

 ## 13. 手写instanceof 

 ```js
 function instanceOf(left, right) { 
   let proto = left.__proto__ 
   while (true) { 
     if (proto === null) return false 
     if (proto === right.prototype) { 
       return true 
     } 
     proto = proto.__proto__ 
   } 
 } 
 ```

 ## 14. 虚拟Dom转真实Dom 

 ```js
 // 真正的渲染函数 
 function _render(vnode) { 
  // 如果是数字类型转化为字符串 
  if (typeof vnode === "number") { 
   vnode = String(vnode); 
  } 
  // 字符串类型直接就是文本节点 
  if (typeof vnode === "string") { 
   return document.createTextNode(vnode); 
  } 
  // 普通DOM 
  const dom = document.createElement(vnode.tag); 
  if (vnode.attrs) { 
   // 遍历属性 
   Object.keys(vnode.attrs).forEach((key) => { 
    const value = vnode.attrs[key]; 
    dom.setAttribute(key, value); 
   }); 
  } 
  // 子数组进行递归操作 
  vnode.children.forEach((child) => dom.appendChild(_render(child))); 
  return dom; 
 } 
 ```

 ## 15. DOM2JSON 

 ```js
 function dom2Json(domtree) { 
  let obj = {}; 
  obj.name = domtree.tagName; 
  obj.children = []; 
  domtree.childNodes.forEach((child) => obj.children.push(dom2Json(child))); 
  return obj; 
 } 
 ```

 ## 16. 手写Compose 

 ```js
 function compose(...fn) { 
  if (!fn.length) return (v) => v; 
  if (fn.length === 1) return fn[0]; 
  return fn.reduce( 
   (pre, cur) => 
    (...args) => 
     pre(cur(...args)) 
  ); 
 } 
 ```

 ## 17. 自动重试的Promise 

 ```js
 Promise.retry = (fun, limit = 5) => { 
   return new Promise((resolve, reject) => { 
     let __num = 1; 
     let __run = () => { 
       fun() 
         .then(res => { 
           resolve(res); 
         }) 
         .catch(err => { 
           if (__num++ >= limit) { 
             reject(err) 
           } else { 
             console.log('retry again!!') 
             __run() 
           } 
         }) 
     } 
     __run() 
   }) 
 } 
 ```

 ## 18. 大数相加 

 ```js
 let a = "9007199****40991"; 
 let b = "1234567899999999999"; 

 function add(a ,b) { 
   // 取两个数字的最大长度 
   let maxLength = Math.max(a.length, b.length); 
   // 用 0 去补齐长度 
   a = a.padStart(maxLength , 0); // "0009007199****40991" 
   b = b.padStart(maxLength , 0); // "1234567899999999999" 
   // 定义加法过程中需要用到的变量 
   let t = 0; 
   let f = 0;  // "进位" 
   let sum = ""; 
   for(let i = maxLength-1; i >= 0; i--){ 
    t = parseInt(a[i]) + parseInt(b[i]) + f; 
    f = Math.floor(t / 10); 
    sum = t % 10 + sum; 
   } 
   if(f == 1){ 
    sum = "1" + sum; 
   } 
   return sum; 
 } 
 ```

 ## 19. 千分位 

 ```js
 function toThousandsNum(num) { 
     var num = (num || 0).toString(),result = ''; 
     while (num.length > 3) { 
       //此处用数组的slice方法，如果是负数，那么它规定从数组尾部开始算起的位置 
       result = ',' + num.slice(-3) + result; 
       num = num.slice(0, num.length - 3); 
     } 
     // 如果数字的开头为0,不需要逗号 
     if (num){ 
      result = num + result 
     } 
     return result; 
 } 
 ```

 ## 20. 发布订阅 

 ```js
 class EventPubSub{ 
   constructor(){ 
     this.event = {}; 
   } 
   //订阅 
   on(type, callback){ 
     if(!this.event[type]){ 
       this.event[type] = [callback]; 
     }else{ 
       this.event[type].push(callback); 
     } 
   } 
   //解除订阅 
   off(type, callback){ 
     if(!this.event[type]){ 
       return; 
     } 
     this.event[type] = this.event[type].filter(item => { 
       return item != callback; 
     }) 
   } 
   //发布 
   emit(type, ..args){ 
     if(!this.event[type]){ 
       return; 
     } 
     this.event[type].forEach(callback => { 
       callback.apply(this, args); 
     }) 
   } 
   //执行一次 
   once(type, callback){ 
     function f(){ 
       callback(); 
       this.off(type, f); 
     } 
     this.on(type, f); 
   } 
 } 
 ```

 ## 21. ES5的继承 

 Object.create()做了两件事： 

 1. 创建了一个对象； 
 1. 将传递的参数作为原型。 

 ```js
 function inherit[Proto]()type(child, parent) { 
   let prototype = Object.create(parent.prototype) 
   prototype.constructor = child 
   child.prototype = prototype 
 } 
 inherit[Proto]()type(Dog, Animal) 
 ```

 ## 22. 事件代理 

 ```js
 window.onload = function(){ 
 var oUl = document.getElementById("ul1"); 
 oUl.onclick = function(ev){ 
 var ev = ev || window.event; 
 var target = ev.target || ev.srcElement; 
 if(target.nodeName.toLowerCase() == 'li'){ 
 alert(123); 
  alert(target.innerHTML); 
 } 
 } 
 } 
 ```

 # 【8】高频[算法题]() 】】】】】】

 ## **[无重复字符的最长子串](https://[leetcode]()-cn.com/problems/longest-substring-without-repeating-characters/)** 

  `https://[leetcode]()-cn.com/problems/longest-substring-without-repeating-characters/`

 ## **[相交[链表]()]( https://[leetcode]()-cn.com/problems/intersection-of-two-linked-lists/)** 

  `https://[leetcode]()-cn.com/problems/intersection-of-two-linked-lists/`
 ## **[[二分查找]()]( https://[leetcode]()-cn.com/problems/binary-search/)** 

 `https://[leetcode]()-cn.com/problems/binary-search/`
 ## **[[两数之和]()]( https://[leetcode]()-cn.com/problems/two-sum/)** 

 `https://[leetcode]()-cn.com/problems/two-sum/`

 ## **[[反转链表]()]( https://[leetcode]()-cn.com/problems/reverse-linked-list/)** 

 `https://[leetcode]()-cn.com/problems/reverse-linked-list/`

 ## **[环形[链表]()]( https://[leetcode]()-cn.com/problems/linked-list-cycle/)** 

 `https://[leetcode]()-cn.com/problems/linked-list-cycle/`

 ## **[[二叉树]()的中序遍历]( https://[leetcode]()-cn.com/problems/binary-tree-inorder-traversal/)** 

 `https://[leetcode]()-cn.com/problems/binary-tree-inorder-traversal/`

 ## **[三数之和]( https://[leetcode]()-cn.com/problems/3sum/)**

 `https://[leetcode]()-cn.com/problems/3sum/` 

 ## **[[二叉树]()的层序遍历]( https://[leetcode]()-cn.com/problems/binary-tree-level-order-traversal/)** 

 `https://[leetcode]()-cn.com/problems/binary-tree-level-order-traversal/`

 ## **[最大子序和]( https://[leetcode]()-cn.com/problems/maximum-subarray/)** 

 `https://[leetcode]()-cn.com/problems/maximum-subarray/`

 ## **[[斐波那契数列]()]( https://[leetcode]()-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/)** 

 `https://[leetcode]()-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/`

 ## **[翻转[二叉树]()]( https://[leetcode]()-cn.com/problems/invert-binary-tree/)** 

 `https://[leetcode]()-cn.com/problems/invert-binary-tree/`

 ## **[[链表]()中倒数第k个节点]( https://[leetcode]()-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/)**

 `https://[leetcode]()-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/` 

 ## **[两数相加]( https://[leetcode]()-cn.com/problems/add-two-numbers/)** 

 `https://[leetcode]()-cn.com/problems/add-two-numbers/`

 ## **[[排序]()数组]( https://[leetcode]()-cn.com/problems/sort-an-array/)** 

 `https://[leetcode]()-cn.com/problems/sort-an-array/`

 ## **[合并两个有序[链表]()]( https://[leetcode]()-cn.com/problems/merge-two-sorted-lists/)** 

 `https://[leetcode]()-cn.com/problems/merge-two-sorted-lists/`

 ## **[[最大数]()]( https://[leetcode]()-cn.com/problems/largest-number/)** 

 `https://[leetcode]()-cn.com/problems/largest-number/`

 ## **[只出现一次的数字]( https://[leetcode]()-cn.com/problems/single-number/)** 

 `https://[leetcode]()-cn.com/problems/single-number/`

 ## **[[最长公共前缀]()]( https://[leetcode]()-cn.com/problems/longest-common-prefix/)** 

 `https://[leetcode]()-cn.com/problems/longest-common-prefix/`

 ## **[移动零]( https://[leetcode]()-cn.com/problems/move-zeroes/)** 

 `https://[leetcode]()-cn.com/problems/move-zeroes/`

 ## **[[螺旋矩阵]()]( https://[leetcode]()-cn.com/problems/spiral-matrix/)** 

 `https://[leetcode]()-cn.com/problems/spiral-matrix/`

 ## **[爬楼梯]( https://[leetcode]()-cn.com/problems/climbing-stairs/)** 

 `https://[leetcode]()-cn.com/problems/climbing-stairs/`
 ## **[[最长回文子串]()]( https://[leetcode]()-cn.com/problems/longest-palindromic-substring/)** 

 `https://[leetcode]()-cn.com/problems/longest-palindromic-substring/`

 ## **[有效的括号]( https://[leetcode]()-cn.com/problems/valid-parentheses/)** 

 `https://[leetcode]()-cn.com/problems/valid-parentheses/`

 ## **[删除[链表]()的倒数第 N 个结点]( https://[leetcode]()-cn.com/problems/remove-nth-node-from-end-of-list/)** 

 `https://[leetcode]()-cn.com/problems/remove-nth-node-from-end-of-list/`

 ## **[删除[排序]()[链表]()中的重复元素 II]( https://[leetcode]()-cn.com/problems/remove-duplicates-from-sorted-list-ii/)** 

 `https://[leetcode]()-cn.com/problems/remove-duplicates-from-sorted-list-ii/`

 ## **[最长连续递增序列]( https://[leetcode]()-cn.com/problems/longest-continuous-increasing-subsequence/)** 

 `https://[leetcode]()-cn.com/problems/longest-continuous-increasing-subsequence/`

 ## **[最小栈]( https://[leetcode]()-cn.com/problems/min-stack/)** 

 `https://[leetcode]()-cn.com/problems/min-stack/`

 ## **[最长重复子数组]( https://[leetcode]()-cn.com/problems/maximum-length-of-repeated-subarray/)** 

 `https://[leetcode]()-cn.com/problems/maximum-length-of-repeated-subarray/`

 ## **[验证回文串]( https://[leetcode]()-cn.com/problems/valid-palindrome/)** 

 `https://[leetcode]()-cn.com/problems/valid-palindrome/`

 ## **[[买卖股票的最佳时机]()]( https://[leetcode]()-cn.com/problems/best-time-to-buy-and-sell-stock/)** 

 `https://[leetcode]()-cn.com/problems/best-time-to-buy-and-sell-stock/`

 ## **[[最长递增子序列]()]( https://[leetcode]()-cn.com/problems/longest-increasing-subsequence/)** 

 `https://[leetcode]()-cn.com/problems/longest-increasing-subsequence/`

 ## **[单词拆分]( https://[leetcode]()-cn.com/problems/word-break/)** 

 `https://[leetcode]()-cn.com/problems/word-break/`

 ## **[对称[二叉树]()]( https://[leetcode]()-cn.com/problems/symmetric-tree/)** 

 `https://[leetcode]()-cn.com/problems/symmetric-tree/`

 ## 最长增长子序列 

 []( https://[leetcode]()-cn.com/problems/longest-increasing-subsequence/)< https://[leetcode]()-cn.com/problems/longest-increasing-subsequence/> 

 ```js
 var lengthOfLIS = function (nums) { 
   const dp = new Array(nums.length).fill(1); 
   for (let i = 0; i < nums.length; i++) { 
     // i与i前面的元素比较 
     for (let j = 0; j < i; j++) { 
       // 找比i小的元素，找到一个，就让当前序列的最长子序列长度加1 
       if (nums[i] > nums[j]) { 
         dp[i] = Math.max(dp[i], dp[j] + 1); 
       } 
     } 
   } 
   // 找出最大的子序列 
   return Math.max(...dp); 
 }; 
 ```

 ## 基本计算器 

 []( https://[leetcode]()-cn.com/problems/basic-calculator-ii/)
 `https://[leetcode]()-cn.com/problems/basic-calculator-ii/`

 ---

 ```js
 var calculate = function (s) { 
   s = s.trim() 
   const stack = [] 
   let preSign = '+', num = 0, n = s.length 
   for (let i = 0; i < n; i++) { 
     if (s[i] >= '0') num = num * 10 + (s[i] - '0') 
     if (isNaN(Number(s[i])) || i === n - 1) { 
       switch (preSign) { 
         case '+': 
           stack.push(num) 
           break; 

​         case '-': 
​           stack.push(-num) 
​           break; 

​         case '*': 
​           stack.push(stack.pop() * num) 
​           break; 

​         default: 
​           stack.push(stack.pop() / num | 0) 
​           break; 
​       } 
​       preSign = s[i]; 
​       num = 0; 
​     } 
   } 
   return stack.reduce((a, b) => { return a + b }, 0) 
 }; 
 ```