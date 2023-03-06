## 跨域

- 当一台服务器资源从另一台服务器（不同 的域名或者端口）请求一个资源或者接口，就会发起一个跨域 HTTP 请求。举个简单的例子，从http://aaa.com/index.html,发送一个 Ajax 请求，请求地址是 http://bbb.com/下面的一个接口，这就是发起了一个跨域请求。

## 同源策略

一个域名请求地址的组成是:协议+域名+端口号+请求资源地址。
当协议、域名、端口号中任意一个不相同时, 都是不同源。

## 同源策略的限制内容

- Cookie、LocalStorage、IndexedDB 等存储性内容
- DOM 节点
- AJAX 请求不能发送

## 不会触发跨域的交互

- 跨域写操作（Cross-origin writes）
  例如超链接、重定向以及表单的提交操 作，特定少数的 HTTP 请求需要添加预检请求（preflight）

- 跨域资源嵌入（Cross-origin embedding）

  ```html
  <script> 标签嵌入的跨域脚本； o <link> 标签嵌入的 CSS 文件； o <img> 标签嵌入图片；

  <video> 和 <audio> 标签嵌入多媒体资源； o <object>, <embed>, <applet> 的插件；

  @font-face 引入的字体，一些浏览器允许跨域字体（cross-origin fonts），一些需要同源字体（same-origin fonts）；

  <frame> 和 <iframe> 载入的任何资源，站点可以使用 X-FrameOptions 消息头来组织这种形式的跨域交互。
  ```

## 跨域理解的误区

跨域并不是请求发不出去，请求能发出去，服务端能收到请求并正常返回结果，只是结果被浏览器拦截了。你可能会疑问明明通过表单的方式可以发起跨域请求，为什么 Ajax 就不会?因为归根结底，跨域是为了阻止用户读取到另一个域名下的内容，Ajax 可以获取响应，浏览器认为这不安全，所以拦截了响应。但是表单并不会获取新的内容，所以可以发起跨域请求。同时也说明了跨域并不能完全阻止 CSRF，因为请求毕竟是发出去了。

## 跨域解决方案

- 服务端进行设置默认允许某些域名跨域访问
- 从客户端入手想办法绕开同源安全策略

## 常见的解决方法

1. **jsonp**
   > 利用 `<script>` 标签没有跨域限制的漏洞，网页可以得到从其他来源动态产生的 JSON 数据。JSONP 请求一定需要对方的服务器做支持才可以。
   > JSONP 和 AJAX 相同，都是客户端向服务器端发送请求，从服务器端获取数据的方式。但 AJAX 属于同源策略，JSONP 属于非同源策略（跨域请求）
   > JSONP 优点是简单兼容性好，可用于解决主流浏览器的跨域数据访问的问题。缺点是仅支持 get 方法具有局限性,不安全可能会遭受 XSS 攻击。
2. **cors**
   > CORS（Cross-origin resource sharing），跨域资源共享。CORS 其实是浏览器制定的一个规范，浏览器会自动进行 CORS 通信，它的实现则主要在服务端，它通过一些 HTTP Header 来限制可以访问的域，例如页面 A 需要访问 B 服务器上的数据，如果 B 服务器 上声明了允许 A 的域名访问，那么从 A 到 B 的跨域请求就可以完成。对于那些会对服务器数据产生副作用的 HTTP 请求，浏览器会使用 OPTIONS 方法发起 一个预检请求（preflight request），从而可以获知服务器端是否允许该跨域请求，服 务器端确认允许后，才会发起实际的请求。在预检请求的返回中，服务器端也可以告知客 户端是否需要身份认证信息。我们只需要设置响应头，即可进行跨域请求。

虽然设置 CORS 和前端没什么关系，但是通过这种方式解决跨域问题的话，会在发送请求时出现两种情况，分别为简单请求和复杂请求。

1.  简单请求
    > 只要同时满足以下两大条件，就属于简单请求：
    > 1）使用 GET、HEAD、POST 方法之一；
    > 2）Content-Type 的值仅限于：text/plain、multipart/form-data、application/x-www-form-urlencoded，请求中的任意 XMLHttpRequestUpload 对象均没有注册任何事件监听器； XMLHttpRequestUpload 对象可以使用 XMLHttpRequest.upload 属性访问；
2.  复杂请求
    > 不符合以上条件的请求就肯定是复杂请求了。 复杂请求的 CORS 请求，会在正式通信之前，增加一次 HTTP 查询请求，称为"预检"请求,该请求是 option 方法 的，通过该请求来知道服务端是否允许跨域请求。
    我们用 PUT 向后台请求时，属于复杂请求，后台需被请求的 Servlet 中添加 Header 设置，Access-Control-Allow-Origin 这个 Header 在 W3C 标准里用来检查该跨域请求是否可以被通过，如果值为\*则表明当前页面可以跨域访问。默认的情况下是不允许的。

    默认情况下，可以写一个过滤器：
    ```java
        @WebFilter(filterName = "corsFilter", urlPatterns = "/*",
            initParams = {@WebInitParam(name = "allowOrigin", value = "*"),
                    @WebInitParam(name = "allowMethods", value = "GET,POST,PUT,DELETE,OPTIONS"),
                    @WebInitParam(name = "allowCredentials", value = "true"),
                    @WebInitParam(name = "allowHeaders", value = "Content-Type,X-Token")})

        public class CorsFilter implements Filter {
            private String allowOrigin;
            private String allowMethods;
            private String allowCredentials;
            private String allowHeaders;
            private String exposeHeaders;

            @Override
            public void init(FilterConfig filterConfig) throws ServletException {
                allowOrigin = filterConfig.getInitParameter("allowOrigin");
                allowMethods = filterConfig.getInitParameter("allowMethods");
                allowCredentials = filterConfig.getInitParameter("allowCredentials");
                allowHeaders = filterConfig.getInitParameter("allowHeaders");
                exposeHeaders = filterConfig.getInitParameter("exposeHeaders");
            }

            @Override
            public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
                HttpServletRequest request = (HttpServletRequest) servletRequest;
                HttpServletResponse response = (HttpServletResponse) servletResponse;
                if (!StringUtils.isEmpty(allowOrigin)) {
                    if(allowOrigin.equals("*")){
                        // 设置哪个源可以访问
                        response.setHeader("Access-Control-Allow-Origin", allowOrigin);
                    }else{
                        List<String> allowOriginList = Arrays.asList(allowOrigin.split(","));
                        if (allowOriginList != null && allowOriginList.size() > 0) {
                            String currentOrigin = request.getHeader("Origin");
                            if (allowOriginList.contains(currentOrigin)) {
                                response.setHeader("Access-Control-Allow-Origin", currentOrigin);
                            }
                        }
                    }
                }
                if (!StringUtils.isEmpty(allowMethods)) {
                    //设置哪个方法可以访问
                    response.setHeader("Access-Control-Allow-Methods", allowMethods);
                }
                if (!StringUtils.isEmpty(allowCredentials)) {
                    // 允许携带cookie
                    response.setHeader("Access-Control-Allow-Credentials", allowCredentials);
                }
                if (!StringUtils.isEmpty(allowHeaders)) {
                    // 允许携带哪个头
                    response.setHeader("Access-Control-Allow-Headers", allowHeaders);
                }
                if (!StringUtils.isEmpty(exposeHeaders)) {
                    // 允许携带哪个头
                    response.setHeader("Access-Control-Expose-Headers", exposeHeaders);
                }
                filterChain.doFilter(servletRequest, servletResponse);
            }

            @Override
            public void destroy() {}
        }
    ```

现在前端就可以跨域获取后台的数据了，后端是实现 CORS 通信的关键。

如果你的SpringBoot版本在2.0以上，以下代码配置即可完美解决你的前后端跨域请求问题：

```java
@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        final UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        final CorsConfiguration corsConfiguration = new CorsConfiguration();
        /*是否允许请求带有验证信息*/
        corsConfiguration.setAllowCredentials(true);
        /*允许访问的客户端域名*/
        corsConfiguration.addAllowedOrigin("*");
        /*允许服务端访问的客户端请求头*/
        corsConfiguration.addAllowedHeader("*");
        /*允许访问的方法名,GET POST等*/
        corsConfiguration.addAllowedMethod("*");
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
        return new CorsFilter(urlBasedCorsConfigurationSource);
    }
}
```

或者使用WebMvcConfigurationSupport，实现方式有很多，感兴趣的可以自行研究


3.  **@CrosOrigin 注解**
> 这个方法仅对Java有用。springboot中，在Controller类上添加一个 @CrossOrigin(origins ="*") 注解就可以实现对当前controller 的跨域访问了，当然这个标签也可以加到方法上，或者直接加到入口类上对所有接口进行跨域处理，注意这个注解只在JDK1.8版本以上才起作用。

4.  **使用 SpringCloud 网关**
> 服务网关(zuul)又称路由中心，用来统一访问所有api接口，维护服务。
Spring Cloud Zuul通过与Spring Cloud Eureka的整合，实现了对服务实例的自动化维护，所以在使用服务路由配置的时候，我们不需要向传统路由配置方式那样去指定具体的服务实例地址，只需要通过Ant模式配置文件参数即可。

5. **Node中间件代理(两次跨域)**

实现原理：同源策略是浏览器需要遵循的标准，而如果是服务器向服务器请求就无需遵循同源策略。这样的话，我们可以让服务器替我们发送一个请求，请求其他服务器下面的数据。然后我们的页面访问当前服务器下的接口就没有跨域问题了。 代理服务器，需要做以下几个步骤：
>   - 接受客户端请求。
>   - 将请求 转发给服务器。
>   - 拿到服务器 响应 数据。
>   - 将 响应 转发给客户端。


![img](https://img-blog.csdnimg.cn/20190828171045225.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MDkxMDM3Mg==,size_16,color_FFFFFF,t_70)


6. **nginx反向代理**
> 实现原理类似于Node中间件代理，需要你搭建一个中转nginx服务器，用于转发请求。
使用nginx反向代理实现跨域，是最简单的跨域方式。只需要修改nginx的配置即可解决跨域问题，支持所有浏览器，支持session，不需要修改任何代码，并且不会影响服务器性能。
实现思路：通过nginx配置一个代理服务器做跳板机，反向代理访问domain2接口，并且可以顺便修改cookie中domain信息，方便当前域cookie写入，实现跨域登录。
将nginx目录下的nginx.conf修改如下:

```conf
// proxy服务器
server {
    listen       81;
    server_name  www.domain1.com;
    location / {
        proxy_pass   http://www.domain2.com:8080;  #反向代理
        proxy_cookie_domain www.domain2.com www.domain1.com; #修改cookie里域名
        index  index.html index.htm;
 
        # 当用webpack-dev-server等中间件代理接口访问nignx时，此时无浏览器参与，故没有同源限制，下面的跨域配置可不启用
        add_header Access-Control-Allow-Origin http://www.domain1.com;  #当前端只跨域不带cookie时，可为*
        add_header Access-Control-Allow-Credentials true;
        add_header Access-Control-Allow-Methods GET, POST, OPTIONS;
        add_header Access-Control-Allow-Headers *;
    }
}
```

这样我们的前端代理只要访问 http:www.domain1.com:81/*就可以了

## 总结

> - CORS支持所有类型的HTTP请求，是跨域HTTP请求的根本解决方案
> - JSONP只支持GET请求，JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。
> - 不管是Node中间件代理还是nginx反向代理，主要是通过同源策略对服务器不加限制。
> - 日常工作中，用得比较多的跨域方案是cors和nginx反向代理


