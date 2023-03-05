
## 1.什么是MVVM？

* MVVM是Model-View-ViewModel的缩写，是一种脱胎于MVC 模式的设计模式
* Model代表数据层，负责存放业务相关的数据
* View代表视图层，负责在页面上展示数据
* ViewModel的作用是同步View和Model之间的关联，它的核心是DOMListeners和Data Bindings两个工具。DOMListeners工具用于监听View中DOM的变化，并会选择性的传给Model；Data Bindings工具用于监听Model的数据变化，并将其更新给View

## 2.组件通讯

* 父传子：通过props 在父组件所使用的子组件上绑定需要传递的数据 在子组件的props属性中接收

* 子传父：子组件中使用自定义事件也就是($emit)传递出去一个事件及参数，然后再父组件里绑定这个事件，然后处理这个事件，获取传递的参数
* 非父子：创建一个空的vue实例，然后挂载到当前的vue实例的原型上，然后一个组件进行emit传递事件以及需要传递的数据。在另一个组件哪里就可以使用on来接收这个事件并处理这个传递参数，vuex

## 3.生命周期

* beforeCreate：vue实例挂载元素el和数据对象data都是undefined，还没有初始化
* created：vue实例对象的数据对象data有了，可以访问里面的数据和方法，未挂载到DOM，el还没有
* beforeMount：vue的el和data都初始化了，但是挂载之前未虚拟DOM节点
* mounted：vue实例挂载到真实的DOM上，就可以通过DOM获取DOM节点
* beforeUpdated：响应式数据更新时调用，发生在虚拟DOM打补丁之前，适合在更新之前访问现有的DOM，比如手动一处已添加的事件监听器
* updated：虚拟DOM重新渲染和打补丁之后调用，组成新的DOM已经更新避免在这个钩子函数中操作数据，防止死循环
* beforeDestroy：实例销毁前调用，实例还可以用，this能获取实例，常用于销毁定时器，解绑事件
* destroyed：实例销毁后调用，调用后所有事件监听器会被移除，所有的子实例都会被销毁

## 4.vue组件中data为什么必须是一个函数而Vue的根实例则没有此限制？

（源码地址：src/core/instance/state.js - initData() ）

保证复用组件（多实例）的时候数据不会互相干扰

Vue组件可能存在多个实例，如果用对象的形式定义data的话，则会导致多个组件共用一个data对象，当一个组件的data对象改变时，就会影响到所有对象，这样是不合理的，但是如果用函数的形式定义data的话，在initData时会返回一个全新的data对象，规避了多实例之间的污染问题。而在Vue根实例创建过程中则不存在该限制，也是因为根实例只能有一个，不会存在这个问题

## 5.Vue中v-if和v-show有什么区别？

v-if在进行切换时会直接对标签进行创建和销毁，不显示的标签不会加载在DOM树中。而v-show在进行切换时，只是对标签的display属性进行切换，通过display来显示隐藏元素。一般来说v-if的性能开销会比v-show大，切换频繁的标签更适合用v-show

## 6.Vue 中 computed 和 watch 有什么区别？

计算属性 computed：

1. 支持缓存，只有依赖数据发生变化时，才会重新进行计算函数；(比如计算支付的总价格)
2. 计算属性内不支持异步操作；
3. 计算属性的函数中都有一个 get(默认具有，获取计算属性)和 set(手动添加，设置计算属性)方法；
4. 计算属性是自动监听依赖值的变化，从而动态返回内容。

侦听属性 watch：

1. 不支持缓存，只要数据发生变化，就会执行侦听函数；
2. 侦听属性内支持异步操作；
3. 侦听属性的值可以是一个对象，接收 handler 回调，deep，immediate 三个属性；
4. 监听是一个过程，在监听的值变化时，可以触发一个回调，并做一些其他事情。

## 7.$nextTick 是什么

在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

## 8. v-for 中 key 的作用是什么？

key 是 Vue 使用 v-for 渲染列表时的节点标识。使用了 key 之后，当列表项发生变化时，Vue 会基于 key 的变化而重新排列元素顺序，并且移除 key 不存在的元素，提升运行效率。

## 9.vue中的key

1. key的作用主要是为了高效的更新虚拟DOM，其原理是vue在patch过程中通过key可以精准判断两个节点是否是同一个，从而避免频繁更新不同的元素，减少DOM操作量,提高性能
2. 不设置key的话可能还会在列表更新时引发一些隐蔽的bug
3. vue在使用相同标签名元素的过渡切换时，也会使用到key属性，其目的也是为了让vue可以区分它们，否则vue只会替换其内部属性的内容不会触发过渡效果

## 10. Vue 的双向数据绑定原理是什么？

Vue 采用数据劫持+订阅发布模式实现双向绑定。通过 Object.defineProperty()方法来为组件中 data 的每个属性添加 get 和 set 方法，在数据变动时，触发 set 里相应的监听回调函数，将变动信息发布给订阅者。主要有以下步骤：

1. 组件初始化时：
   * 创建一个dep 对象作为观察者（依赖收集、订阅发布的载体）；
   * 通过Object.defineProperty()方法对 data 中的属性及子属性对象的属性，添加 getter 和 setter 方法； 调用 getter 时，便去 dep 里注册函数。调用 setter 时，便去通知执行刚刚注册的函数。
2. 组件挂载时：
   * compile解析模板指令，将其中的变量替换成数据。然后初始化渲染页面视图，并将每个指令对应的节点绑定上更新函数、监听函数。后续一旦数据发生变化，便会更新页面。页面发生变化时也会相应发布变动信息；
   * 组件同时会定义一个watcher 类作为订阅者，watcher 可以视作 dep 和组件之间的桥梁。其在实例化时会向 dep 中添加自己，同时自身又有一个 update 方法，待收到 dep 的变动通知时，便会调用自己的 update 方法，触发 compile 中的相应函数完成更新。

## 11.如何动态更新对象或数组的值？

由于 JavaScript 的限制，Vue **不能检测**数组和对象的变化。尽管如此我们还是有一些办法来回避这些限制并保证它们的响应性。

```javascript
this.$set(要改变的数组/对象，要改变的位置/key，要改成的value)

this.$set(this.arr, 0, "OBKoro1");
// 改变数组 
this.$set(this.obj, "c", "OBKoro1"); // 改变对象

//数组原生方法造成的数据更新，可以被 Vue 监听到。如 splice()push()pop()等
```

## 12.常用的事件修饰符有哪些？

```
.stop：阻止冒泡；
.prevent：阻止默认行为；
.self：仅绑定元素自身可触发；
.once：只触发一次..
```

## 13.Vue 如何获取 DOM 元素？

首先先为标签元素设置 ref 属性，然后通过 this.$refs.属性值获取

```
<div ref="test"></div>

const dom = this.$refs.test
```

## 14.Vue 初始化页面闪动问题如何解决？

```
 出现该问题是因为在 Vue 代码尚未被解析之前，尚无法控制页面中 DOM 的显示，所以会看见模板字符串等代码。
解决方案是，在 css 代码中添加 v-cloak 规则，同时在待编译的标签上添加 v-cloak 属性：

[v-cloak] { display: none; }

<div v-cloak>
 {{ message }}
</div>


```

## 15.Vue 如何清除浏览器缓存？

1. 项目打包的时候给每个打包文件加上 hash 值，一般是在文件后面加上时间戳
2. 在 html 文件中加入 meta 标签，content 属性设置为no-cache;
3. 在后端服务器中进行禁止缓存设置。

## 16.Vue-router 路由有哪些模式？他们的区别是什么

一般有两种模式：

1. hash 模式：hash —— 即地址栏 URL 中的 # 符号（此 hash 不是密码学里的散列运算）。
   比如这个 URL：http://www.abc.com/#/hello，hash 的值为 #/hello。它的特点在于：hash 虽然出现在 URL 中，但不会被包括在 HTTP 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面。
2. history 模式：利用了 HTML5 中新增的 pushState() 和 replaceState() 方法。这两个方法应用于浏览器的历史记录栈，在当前已有的 back、forward、go 的基础之上，它们提供了对历史记录进行修改的功能。只是当它们执行修改时，虽然改变了当前的 URL，但浏览器不会立即向后端发送请求。

* pushState() 设置的新 URL 可以是与当前 URL 同源的任意 URL；而 hash 只可修改 #后面的部分，因此只能设置与当前 URL 同文档的 URL；
* pushState() 设置的新 URL 可以与当前 URL 一模一样，这样也会把记录添加到栈中；而 hash设置的新值必须与原来不一样才会触发动作将记录添加到栈中；
* pushState() 通过 stateObject 参数可以添加任意类型的数据到记录中；而 hash 只可添加短字符串；
* pushState() 可额外设置 title 属性供后续使用。

## 17.Vue-cli 项目中 assets 和 static 文件夹有什么区别？

**两者都是用来放静态资源为文件夹**。区别在于：

assets中的文件在运行npm run build的时候会被打包，简单来说就是会被压缩体积，代码格式化之类的。打包之后也会放在static中。static中的文件则不会被打包

## 18.Vuex 是什么？有哪几种属性？

Vuex是专为Vue设计的状态管理工具，采用集中式的存储管理Vue中的所有组件的状态

1. state属性：基本数据
2. getters属性：从state中派生出的属性
3. mutation属性：更新store中数据的唯一途径，其接收一个以state为第一参数的回调函数；
4. action属性：提交mutation以更改state，其中可以包含异步操作

```javascript
const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {
    increment2(context) {
      context.commit('increment');
    },
    fun(context) {
      context.dispatch('increment2');
    },
  },
});
```

5. module 属性：用于将 store分割成不同的模块。

   ```javascript
   const moduleA = {
     state: () => ({ ... }),
     mutations: { ... },
     actions: { ... },
     getters: { ... }
   }
   
   const moduleB = {
     state: () => ({ ... }),
     mutations: { ... },
     actions: { ... }
   }
   
   const store = new Vuex.Store({
     modules: {
       a: moduleA,
       b: moduleB
     }
   })
   
   store.state.a // -> moduleA 的状态
   store.state.b // -> moduleB 的状态
   ```

## 19.说一下v-model的原理

v-model本质就是一个语法糖，可以看成是value + input方法的语法糖,当input方法修改了data中的属性值时，defineProperty会监听data中每一个属性的get和set方法，从而一旦某个属性重新赋值，则能监听到变化来操作相应的页面

## 20.Vue模版编译原理知道吗，能简单说一下吗？

简单说：Vue的编译过程就是将template转化成render函数的过程。会经历以下阶段：

* 生成AST树
* 优化
* 转化成可执行的代码

首先解析模版，生成AST语法树(一种用JavaScript对象的形式来描述整个模板)。
使用大量的正则表达式对模板进行解析，遇到标签、文本的时候都会执行对应的钩子进行相关处理。

Vue的数据是响应式的，但其实模板中并不是所有的数据都是响应式的。有一些数据首次渲染后就不会再变化，对应的DOM也不会变化。那么优化过程就是深度遍历AST树，按照相关条件对树节点进行标记。这些被标记的节点(静态节点)我们就可以跳过对它们的比对，对运行时的模板起到很大的优化作用。

编译的最后一步是将优化后的AST树转换为可执行的代码

## 21.Vue中组件生命周期调用顺序

组件的调用顺序都是先父后子,渲染完成的顺序是先子后父。

组件的销毁操作是先父后子，销毁完成的顺序是先子后父。

**加载渲染过程**
父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount- >子mounted->父mounted

**子组件更新过程**
父beforeUpdate->子beforeUpdate->子updated->父updated

**父组件更新过程**
父 beforeUpdate -> 父 updated

**销毁过程**
父beforeDestroy->子beforeDestroy->子destroyed->父destroyed

## 22.你都做过哪些Vue的性能优化

**编码阶段**

* 路由懒加载

  ```javascript
  const router = new VueRouter({
      routes:[
          {path:'/foo',component:()=>import('./Foo.vue')}
      ]
  })
  ```

* keep-alive缓存页面

```vue
<template>
	<div id="app">
        <keep-alive>
            <router-view/>
    	</keep-alive>
    </div>
</template>
```



* 尽量减少data中的数据，data中的数据都会增加getter和setter，会收集对应的watcher

* v-if和v-for不能连用
* 在更多的情况下，使用v-if替代v-show
* key保证唯一
* 第三方模块按需导入
* 长列表滚动到可视区域动态加载
* 图片懒加载

**打包优化**

* 压缩代码
* 使用CDN加载第三方模块

## 23.在使用计算属性的时，函数名和data数据源中的数据可以同名吗？

不可以，会报错：The computed property "xxxx" is already defined in data

## 24.vue中data的属性可以和methods中的方法同名吗？为什么？

不可以，会报错：Method "xxx" has already been defined as a data property

## 25.怎么给vue定义全局的方法？

挂载到Vue的prototype上，把全局方法写在一个文件里面，然后for循环挂载到prototype上

## 26.v-if和v-for哪个优先级更高？

（源码地址：compiler/codegen/index.js）

1. 显然v-for优先于v-if被解析，因为同级使用时每个列表项都会有v-if的判断，源码中也有答案
2. 如果同时出现，每次渲染都会先执行循环再判断条件，无论如何循环都不可避免，浪费了性能
3. 要避免这种情况的话，可以再外层嵌套template，在这一层进行v-if判断，然后在内部v-for循环

## 27. 你怎么理解vue中的diff算法

1. diff算法：通过新旧虚拟DOM作对比（即diff），将变化的地方更新在真实的DOM上；另外，也需要diff高效的执行对比过程，从而降低时间复杂度
2. diff过程整体遵循深度优先、同层比较的策略；两个节点之间比较会根据他们是否拥有子节点或者文本节点做不同操作；比较两组子节点是算法的重点，首先假设头尾节点可能相同做4次比对尝试，如果没有找到相同节点才按照通用的方式遍历查找，查找结束再按情况处理剩下的节点；借助key可以非常精确的找到相同节

## 28.什么是虚拟DOM？

虚拟DOM就是将真实的DOM用js语言描述出来，运用diff算法更新数据之后再映射成真实的DOM（为了解决浏览器的性能问题）

## 29.组件化

1. 组件是独立和可复用的代码组织单元。组件系统是Vue核心特性之一，它使开发者使用小型、独立和通常可复用的组件构建大型应用
2. 组件化开发可以大幅提高开发效率、测试性和复用性
3. 组件按分类有：页面组件、业务组件和通用组件
4. vue中常见的组件化技术有：prop，自定义事件，插槽等，他们主要用于组件通信、扩展等
5. 遵循单向数据流的原则

## 30.谈一谈vue设计原则的理解

* 渐进式JavaScript框架
* 易用、灵活和高效

渐进式的JavaScript框架：

Vue被设计为可以自底向上逐层应用。Vue的核心库只关注视图层，不仅易于上手还便于与第三发库或既有项目整合。

## 31.vue3的新特性

* 更快
  * 虚拟DOM重写
  * 优化slots的生成
  * 静态树提升
  * 静态属性提升
  * 基于Proxy的响应式系统
* 更小：通过摇树优化核心库体积
* 更容易维护：TypeScript + 模块化


