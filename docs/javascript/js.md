#
#  1、预编译
- 全局

  - 创建GO对象（global object window
  - 找变量声明，将变量声明作为GO对象的属性名，值赋予undefined
  - 找全局里的函数声明，将函数名作为GO对象的属性名，值赋予函数体

- 函数中

  1.创建AO对象（activation object  执行上下文对象）

  2.找形参和变量的声明，作为AO对象的属性名，值是undefined

  3.实参和形参相统一

  4.找函数声明，会覆盖变量的声明

> 例子：
>
> ```js
> var a = 1;
> console.log(a);
> console.log(c);
> function test(a) {
>     console.log(a);
>     console.log(b);
>     var a = 123;
>     console.log(a);
>     function a() {let a = 1}
>     console.log(a);
>     var b = function() {let b = 1}
>     console.log(b);
>     function d() {}
> }
> var c = function (){let c = 1}
> console.log(c);
> test(2);
> ```
>
> 输出：
>
> ```js
> 1
> undefined
> f() {let c = 1}
> f() {let a = 1}
> undefined
> 123
> 123
> f() {let b = 1}
> ```
>
> [详解在这里](https://blog.csdn.net/weixin_44456333/article/details/116137118)

# 2、this指向

==谁调用指向谁==

```js
var name = 222
var a = {
  name: 111,
  say: function () {
    console.log('this', this)
    console.log(this.name)
  }
}

var fun = a.say
fun()  //222
a.say()//111

var b = {
  name: 333,
  say: function (fun) {
    console.log('this', this)
    fun()
  }
}
b.say(a.say)//222
b.say = a.say
b.say()//333
```

# 3、箭头函数中的this

1.箭头函数中的this是在定义函数的时候绑定，而不是在执行函数的时候绑定

2.箭头函数中，this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，导致内部的this就是外层代码块的this.正是因为它没有this,所以也就不能用作构造函数

```js
var x = 11;
var obj = {
	x: 22,
  say: ()=>{
      console.log(this.x);
  }
}
obj.say()//11
```

# 4、深浅拷贝（18

浅拷贝:  浅拷贝是按位拷贝对象，它会创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值；如果属性是内存地址（引用类型），拷贝的就是内存地址 ，因此如果其中一个对象改变了这个地址，就会影响到另一个对象。

```js
function shallowCopy(obj){
	var target = {}
  for (var i in obj) {
      if(obj.hasOwnProperty(i)){
          target[i] = obj[i]
      }
  }
  return target
}
```

深拷贝:

方法一：

```js
function deepClone(obj){
    var cloneObj = new obj.constructor()
    var cloneObj = {}
    if (typeof obj !== 'object' || oldObj === null) {
    	return obj;
  	}
    if(obj instanceof Date) return new Date(obj)
    if(obj instanceof RegExp) return new RegExp(obj)
    for (var i in obj){
        if(obj.hasOwnProperty(i)){
         	 cloneObj[i] = deepClone(obj[i])   
        }
    }
    return cloneObj
}
```

方法二：

JSON.parse(JSON.stringify(obj))

缺点：Date,正则，函数会失效

| js的拷贝 | 和原数据是否指向同一对象 |  第一层数据为一般数据类型  |   第一层数据不是原始数据   |
| :------: | :----------------------: | :------------------------: | :------------------------: |
|   赋值   |            是            |  改变会使原始数据一同改变  |  改变会使原始数据一同改变  |
|  浅拷贝  |            否            | 改变不会使原始数据一同改变 |  改变会使原始数据一同改变  |
|  深拷贝  |            否            | 改变不会使原始数据一同改变 | 改变不会使原始数据一同改变 |

 

# 5、节流防抖（20

```js
/**
 * @description 函数节流
 * @param {Function} fn 需要进行节流操作的事件函数
 * @param {Number} interval 间隔时间
 * @returns {Function}
 */
export function throttle(fn, interval = 500) {
  let last = 0;

  return function () {
    const context = this;
    const args = arguments;

    let now = Date.now();
    if (now - last > interval) {
      last = now;
      fn.apply(context, args);
    }
  };
}
/**
 * @description 函数防抖
 * @param {Function} fn 需要进行防抖操作的事件函数
 * @param {Number} delay 延迟时间
 * @returns {Function}
 */
export function debounce(fn, delay = 1000) {
  let last = 0;
  let timer = null;

  return function () {
    const context = this;
    const args = arguments;

    let now = Date.now();

    if (now - last < delay) {
      clearTimeout(timer);
      time = setTimeout(() => {
        fn.apply(context, args);
        last = now;
      }, delay);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

```

# 6、js的作用域

1.全局作用域

* 全局作用域在页面打开时被创建，页面关闭时被销毁
* 编写在SCRIPT标签中的变量和函数，作用域为全局，在页面的任意位置都可以访问到
* 在全局作用域中有全局对象window，代表一个浏览器窗口，由浏览器创建，可以直接调用
* 全局作用域中声明的变量和函数会作为window对象的属性和方法保存

2.函数作用域

* 调用函数时，函数作用域被创建，函数执行完毕，函数作用域被销毁
* 每调用一次函数就会创建一个新的函=数作用域，他们之间是互相独立的
* 在函数作用域中可以访问到全局作用域中的变量，在函数外无法访问到函数作用域中的变量
* 在函数作用域中访问变量，函数时，会先在自身作用域中寻找，若没有找到，则会到函数的上一级作用域中寻找，一直到全局作用域

# 7、内存泄漏

- 闭包

- 意外的全局变量

- 被遗忘的定时器

- 脱离DOM的引用

# 8、es6新特性

[详细文档 - 阮一峰](https://es6.ruanyifeng.com/#docs/promise)

#### 1.const ,let 

`let`: 声明在代码块内有效的变量。

`const`: 声明一个只读的常量(一但声明，这个值不能被改变,对于引用类型，是引用的地址不能被改变,声明时必须赋值）

let表示声明变量，而const表示声明常量，两者都为块级作用域；const 声明的变量都会被认为是常量，意思就是它的值被设置完成后就不能再修改了：

#### 2.解构赋值

按照一定模式从数组或对象中提取值，然后对变量进行赋值（先提取，再赋值）

#### 3.模板字符串``

- `${}`中可以使用任意的javaScript表达试、运算、引用对象属性、函数调用等。结果是其返回值。

- `反撇号 `` ` 内可以换行，但是所有的空格和换行会被保留。

#### 4.函数的扩展

#### 5.数组的扩展

1. 扩展运算符。
2. 用于替代数组的`apply`。
3. Array.from()将类数组转为数组
4. 实例的方法
   - `find()``findIndex()`找出第一个符合条件的成页/下标（位置），找不到返回undefined
   - `entries()``keys()``values()` 用于遍历数组。（配合for...of)
   - `includes()` 是否存在指定元素(返回布尔值)

call apply bind的区别：
用于改变this的指向， 第一个参数为this指向的对像，后面的参数是作为函数的参数。
区加在于：call apply 会即调用，而bind是生成一个等待调用的函数。call bind参数是一个个用逗号罗列，而apply 是传入一个数组。

#### 6.箭头函数

> ES6 中，箭头函数就是函数的一种简写形式，使用括号包裹参数，跟随一个 =>，紧接着是函数体；
>
> - 不需要 function 关键字来创建函数
> - 省略 return 关键字
> - 继承当前上下文的 this 关键字

#### 7.for...of,for...in

for...of 用于遍历一个迭代器

```jsx
let letters = ['a', 'b', 'c'];
letters.size = 3;
for (let letter of letters) {
  console.log(letter);
}
// 结果: a, b, c
```

for...in 用来遍历对象中的属性

```jsx
 let stus = ["Sam", "22", "男"];
 for (let stu in stus) {
   console.log(stus[stu]);
  }
// 结果: Sam, 22, 男
```

#### 8.class继承

ES6 中支持 class 语法，不过，ES6的class不是新的对象继承模型，它只是原型链的语法糖表现形式。

# 9、手写map

~~~js
function map (arr, mapCallback){
    if(!Array.isArray(arr) || !arr.length || typeof mapCallback !== 'function'){
        return []
    } else {
        let result = []
        for (let i = 0,len = arr.length;i<len;i++){
            result.push(mapCallback(arr[i],i,arr))
        }
        return result
    }
}
~~~

# 10、event-loop(事件循环机制)

`Event Loop`即事件循环，是指浏览器或`Node`的一种解决`javaScript`单线程运行时不会阻塞的一种机制，也就是我们经常使用**异步**的原理。

三部分组成：调用栈，微任务队列，消息队列(宏任务)

JS调用栈采用的是后进先出的规则，当函数执行的时候，会被添加到栈的顶部，当执行栈执行完成后，就会从栈顶移出，直到栈内被清空。

`Javascript`单线程任务被分为**同步任务**和**异步任务**，同步任务会在调用栈中按照顺序等待主线程依次执行，异步任务会在异步任务有了结果后，将注册的回调函数放入任务队列中等待主线程空闲的时候（调用栈被清空），被读取到栈内等待主线程的执行。



首先把整个script当成宏任务执行，碰到同步代码直接执行，微任务放在微队列中，宏任务放在宏队列中，执行完后在执行微队列中的任务，全部执行完后在执行宏队列中的任务，一直这样循环，直到全部执行完

# 11、数组的扁平化

多维数组转化为一维数组

~~~js 
const arr = [1,[2,[3,[4,5]]],6]

//1.数组自带的方法
console.log(arr.flat(Infinity))

//2.利用正则表达式
const res2 = JSON.stringify(arr).replace(/\[|\]/g,'')
console.log(res2.split(','))

//3.正则改良版
const res3 = JSON.parse('[' + res2 + ']')

//4.递归实现
const array = []
const fn = (arr) => {
    for (let i = 0;i<arr.length;i++){
        if(Array.isArray(arr[i])){
            fn(arr[i])
        } else {
            array.push(arr[i])
        }
    }
}

//5.reduce
const newArr = (arr) => {
    return arr.reduce((pre,cur)=> {
        return pre.concat(Array.isArray(cur) ? newArr(cur) : cur)
    },[])
}
console.log(newArr(arr))
~~~

# 12、数组去重

1. **es6去重**

~~~ js
function unique(arr){
    return Array.from(new Set(arr))
}
~~~

2. **双重for循环**

~~~js
function unique(arr){
 	for(var i=0; i<arr.length;i++){
 		for(var j=i+1; j<arr.length;j++{
 			if(arr[i]==arr[j]){ //第一个等同于第二个，splice方法删除第二个
  				arr.splice(j,1);
  				j--;
 			}
 		}
 	}
	return arr;
}
~~~

3. **map**

~~~js
function unique(arr){
    let map = new Map()
    let newArr = []
    for(let i=0;i<arr.length;i++){
        if(map.has(arr[i])){
            map.set(arr[i],true)
        } else {
            map.set(arr[i],false)
            newArr.push(arr[i])
        }
    }
    return newArr
}
~~~

4. **reduce**

~~~js
function unique(arr){
    if(!Array.isArray(arr)) return false 
    arr.reduce((pre,cur)=>{
       if(!pre.includes(cur)) pre.push(cur)
       return pre
    },[]);
  return arr;
}
~~~

# 13、Promise

1. `Promise`的状态一经改变就不能再改变。
2. `.then`和`.catch`都会返回一个新的`Promise`。
3. `catch`不管被连接到哪里，都能捕获上层的错误。
4. 在`Promise`中，返回任意一个非 `promise` 的值都会被包裹成 `promise` 对象，例如`return 2`会被包装为`return Promise.resolve(2)`。
5. `Promise` 的 `.then` 或者 `.catch` 可以被调用多次, 当如果`Promise`内部的状态一经改变，并且有了一个值，那么后续每次调用`.then`或者`.catch`的时候都会直接拿到该值。
6. `.then` 或者 `.catch` 中 `return` 一个 `error` 对象并不会抛出错误，所以不会被后续的 `.catch` 捕获。
7. `.then` 或 `.catch` 返回的值不能是 promise 本身，否则会造成死循环。
8. `.then` 或者 `.catch` 的参数期望是函数，传入非函数则会发生值穿透。
9. `.then`方法是能接收两个参数的，第一个是处理成功的函数，第二个是处理失败的函数，再某些时候你可以认为`catch`是`.then`第二个参数的简便写法。
10. `.finally`方法也是返回一个`Promise`，他在`Promise`结束的时候，无论结果为`resolved`还是`rejected`，都会执行里面的回调函数。

11.`.all()`的作用是接收一组异步任务，然后并行执行异步任务，并且在所有异步操作执行完后才执行回调。

12.`.race()`的作用也是接收一组异步任务，然后并行执行异步任务，只保留取第一个执行完成的异步操作的结果，其他的方法仍在执行，不过执行结果会被抛弃。

 # 14、箭头函数和普通函数的区别



1. **this 指向不同**

   - 箭头函数的this本身没有prototype，即没有this，但它会在上下文查找。
   - 箭头函数的this继承自外层第一个普通函数的this。
   - 箭头函数本身的this指向不能改变，但可以修改它要继承的对象的this
   - 箭头函数的this指向全局，使用arguments会报未声明的错误。
   - 如果箭头函数外层没有普通函数，严格模式和非严格模式下它的this都会指向window(全局对象)

   - ==普通函数：this指向调用它的对象==

2. **构造函数，用 new**

   - 箭头函数不能用于构造函数，不能使用new，普通函数可以用于构造函数，以此创建对象实例。

   - 箭头函数使用new调用箭头函数会报错，不支持new.target，因为箭头函数没有constructor。

3. **匿名函数**
   - 箭头函数全部都是匿名函数，箭头函数不支持重命名函数参数，普通函数的函数参数支持重命名

4. 箭头函数语法更简洁优雅

# 15、new操作符的过程

new 操作符新建了一个空对象，这个对象原型指向构造函数的prototype，执行构造函数后返回这个对象。

# 16、为什么JavaScript是单线程？

- JavaScript的单线程主要和它的用途是相关的，它是浏览器脚本语言，**主要用途是与用户互动和操作dom**。

- 如果不是单线程的话就会带来很复杂的问题，比如js假如同时有两个线程，一个线程在某个dom节点上添加了内容，另一个删除了这个节点，那浏览器就不知道以那个线程为准了。

- 不过在HTML5提出了Web Worker（解决页面阻塞）标准，允许JavaScript脚本创建多个线程，但是子线程是完全受主线程控制的，且不得操作dom。还是没有改变JavaScript单线程的本质。



# 17、判断数组与对象？

- 方法一：

  ```js
  Object.prototype.toString.call(obj) // [object Object]
  Object.prototype.toString.call(arr) // [object Array]
  ```

- 方法二：

  ```js
  Array.isArray(arr) // true
  Array.isArray(obj) // false
  ```

- 方法三：

  ```js 
  arr instanceof(Array) // true
  obj instanceof(Array) // false
  ```

  

# 18、深浅拷贝（4

* 浅拷贝：只拷贝一层，更深层次对象级别的只拷贝引用地址
  1. **for(let key in obj)** 
  2. **for(let key of Object.keys(obj)) ** Object.keys(obj): [a,b] 
  3. **for(let [key,value] of Object.entries(obj))** Object.entries(obj): [["a",1],["b",2]]
  4. **getOwnPropertyNames + getOwnPropertyDescriptor + defineProperty**
  5. **Object.assign(target, source)**.
  6. **[...] 扩展运算符**

```javascript
//浅拷贝
let obj = {
    a:1,
    b:2
}
//【1】 for...in
function simpleClone1(obj){
    let cloneObj = {}
    for(let i in obj){
        cloneObj[i] = obj[i]
    }
    return cloneObj
}
let cloneObj = simpleClone1(obj)
console.log(obj1
//es6 写法
function simpleClone2(obj){
    let cloneObj = {}
    //【2】for...of
    for(let key of Object.keys(obj)){
        cloneObj[key] = obj[key]
    }
    //【3】entries
    for(let [key,value] of Object.entries(obj)){ 
        cloneObj[key] = value
    }
    return cloneObj
}
// es5的写法 
// getOwnPropertyNames + getOwnPropertyDescriptor + defineProperty
function simpleClone2(obj){
    let cloneObj = {}
    //【4】 es5
		Object.getOwnPropertyNames(obj).forEach((key)=>{
      // getOwnPropertyNames: ["a","b"]
    	// cloneObj[key] = obj[key]
    	let des = Object.getOwnPropertyDescriptor(obj,key)
        // {value: 1, writable: true, enumerable: true, configurable: true}
        // {value: 2, writable: true, enumerable: true, configurable: true}
        
    	Object.defineProperty(cloneObj,key,des)
	})
    return cloneObj
}

//【5】Object.assign(target, source)
// 第一级是深拷贝：
let a = {James: {age: 18}}
let b = Object.assign({}, a)
b.James = 20
console.log(b) // { James: 20 } 
console.log(a) // { James: { age: 18 } }

//【6】 [...arr] 扩展运算符
var a = { name: '周杰伦', age: 18, c: { d: 3 } }
var b = { ...a }
a.age = 20
a.c.d = 10
console.log(b)
```

* 深拷贝：多层拷贝，每层的数据都会拷贝
  1. 递归
  
  2. JSON.stringify
  
     (不能拷贝 时间对象、正则表达式、Error对象、函数、undefined、NaN)
  
     拷贝构造函数生成的对象的话，会丢失对象的`constructor`
  
  3. lodash库 
  
     var objects = [{ 'a': 1 }, { 'b': 2 }]; 
  
     var deep = _.cloneDeep(objects);    ···

```javascript
//深拷贝
let obj = {
    a:1,
    b:{
        c:2,
        d:{
            e:3,
            f:[1,2,3,4,5]
        }
    }
}
function deepClone(){
    let cloneObj = {}
    //这样还只是浅拷贝 当更改obj.b.c的值时 拷贝的对象也会改变
    for(let i in obj){
        cloneObj[i] = obj[i]
    }
    return cloneObj
}
let obj1 = deepClone(obj)
obj.b.c =10
console.log(obj1)

//手动拷贝三层
function deepClone1(obj) {
  let cloneObj = {}
  for (let i in obj) {
    if (typeof obj[i] === 'object' && obj[i] !== null) {
      cloneObj[i] = {}
      for (let j in obj[i]) {
        if (typeof obj[i][j] === 'object' && obj[i][j] !== null) {
          cloneObj[i][j] = {}
          for (let k in obj[i][j]) {
            cloneObj[i][j][k] = obj[i][j][k]
          }
        } else {
          cloneObj[i][j] = obj[i][j]
        }
      }
    } else {
      cloneObj[i] = obj[i]
    }
  }
  return cloneObj
}

//递归实现 缺陷只能克隆数组和json对象
function deepClone2(obj, cloneObj) {
  var cloneObj = cloneObj || {}
  for (let i in obj) {
    if (typeof obj[i] === 'object' && obj[i] !== null) {
        //判断是数组 不是就赋值为数组
      // cloneObj[i] = Array.isArray(obj[i]) ? [] : {}
      // cloneObj[i] = obj[i] instanceof Array ? [] : {}
      // cloneObj[i] =
      //   Object.prototype.toString.call(obj[i]) === '[object Array]' ? [] : {} //这个方法能判断所有的
      cloneObj[i] = obj[i].constructor === Array ? [] : {}

      cloneObj[i] = deepClone2(obj[i], cloneObj[i])
    } else {
      cloneObj[i] = obj[i]
    }
  }
  return cloneObj
}

//JSON.stringify
function deepClone3(obj) {
  return JSON.parse(JSON.stringify(obj))
}

//测试
let cloneObj = deepClone3(obj)
obj.b.d.f.push(55)
console.log(obj.b.d.f)
console.log(cloneObj.b.d.f)
```

```javascript
//最完善的深拷贝
//判断对象的类型
function jugeType(obj) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  }
  // if (obj instanceof Element) {
  //   return 'element'
  // }
  return map[toString.call(obj)]
}

function deepCopy3(obj) {
  const type = jugeType(obj)
  let copyObj = null
  if (type === 'array') {
    copyObj = []
    for (let i = 0; i < obj.length; i++) {
      copyObj.push(deepCopy3(obj[i]))
    }
  } else if (type === 'object') {
    copyObj = {}
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        copyObj[key] = deepCopy3(obj[key])
      }
    }
  } else {
    return obj
  }
  return copyObj
}

let obj = {
  a: 1,
  dates: [new Date(1536627600000), new Date(1540047600000)],
  b: {
    c: 2,
    d: {
      e: 3,
      F: function () {},
      reg: new RegExp('\\w+'),
    },
  },
}
let deepObj = deepCopy3(obj)
obj.b.c = 5
obj.b.d.e = 10
console.log('deepObj', deepObj)
```



# 19、判断数组的四种方法

假设 let a = []

1. **Array.isArray()**

   ```javascript
   Array.isArray(a) //true
   ```

2. **a instanceof Array**
   **只能判断Object Function Array**

   ```javascript
   //Object Function Array
   a instanceof Array //true
   ```

3. **Object.prototype.toString.call(a) === '[object Array]'** 
   **可以判断任何类型（Number String Object Array Function Null Undefined ）**

   ```javascript
   //Number String Object Array Function Null Undefined
   Object.prototype.toString.call(a) === '[object Array]' //true
   
   Object.prototype.toString.call(a) === '[object Number]' //true
   ```

4. **a.constructor === Array**
   **除了null和undefined 其它的都能判断**

   ```javascript
   //Number String Object Array Function
   a.constructor === Array //true
   
   a.constructor === String //true
   ```

# 20、防抖和节流（5

### [1]  次数区别

1. **限制函数的执行次数**：
1. 防抖：通过setTimeout的方式，在一定时间内，将多次触发变成一次触发
2. 节流：减少一段时间的触发频率

### [2] 防抖以及防抖的应用场景

* 登录、发短信等按钮避免用户点击太快，以致于发送了多次请求
* 调整窗口大小时
* scroll事件，当停止滚动后获取滚动条距离顶部的距离
* 搜索输入框查询，只需用户最后一次输入完，再发送请求防抖

```javascript
//防抖 最简单的写法
function debounce1(fn, wait) {
  let timer = null
  return function () {
    if (timer !== null) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      // 箭头函数中是没有arguments对象的
      fn.apply(this, arguments)
    }, wait)
  }
}
```

```javascript
//默认第一次点击触发的防抖
function debounce2(fn, wait) {
  let timer = null
  return function () {
    let firstClick = !timer
    console.log('firstClick', firstClick)
    if (timer) {
      clearTimeout(timer)
    }
    if (firstClick) {
      fn.call(this, arguments)
    }
    timer = setTimeout(() => {
      timer = null
    }, wait)
  }
}
```

```javascript
//用户用来设置是否需要第一次就触发的防抖
function debounce3(fn, wait, triggleNow) {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    if (triggleNow) {
      let firstClick = !timer
      if (firstClick) {
        fn.apply(this, arguments)
      }
      timer = setTimeout(() => {
        // 箭头函数中是没有arguments对象的
        timer = null
      }, wait)
    } else {
      timer = setTimeout(() => {
        // 箭头函数中是没有arguments对象的
        fn.apply(this, arguments)
      }, wait)
    }
  }
}
```

### [3]节流以及节流的应用场景

* scroll事件，滚动监听事件，每隔一秒计算一次位置信息
* 浏览器播放事件，每隔一秒计算一次进度信息
* input框实时搜索并发送请求展示下拉列表，每隔一秒发送一次请求

```javascript
function throttle(fn, delay) {
  let begin = 0
  return function () {
    let cur = new Date().getTime()
    if (cur - begin > delay) {
      fn.apply(this, arguments)
      begin = cur
    }
  }
}
```

# 21、栈与堆的区别

### 栈（stack）：

由操作系统自动分配释放，存放函数的参数值，局部变量的值等，调用完毕立即释放

一种先进后出的数据结构

### 堆（heap）：

一般由程序员分配释放，若程序员不释放，程序结束时可能由OS回收，分配方式倒是类似于链表

堆可以看成是一个树

> js中基本数据类型存放在栈中：Number String Boolean Null undefined Symbol
>
> 引用数据类型存放在堆中：Function Object Array

### 区别：

1. 栈使用的是一级缓存，被调用时处于存储空间中，调用完毕立即释放
2. 堆是存放在二级缓存中，生命周期由虚拟机的垃圾回收算法来决定（并不是没用了就释放了）

# 22、数组常用操作

* push(a,b,c...)	方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度
* unshift （a,b,c...）往数组的最前面添加元素，并返回该数组的新长度
* pop() 删除并返回数组的最后一个元素
* shift() 删除并返回数组的第一个元素
* splice (0,3,'213',12) 从数组中指定的位置删除指定个数（3）的元素 或者 替换删除的参数  后面的参数为所需要替换的参数,splice会改变原数组
* slice(2,4) 从数组中索引 0-3之间的元素数组（包含2不包含4），不会修改原数组，返回新数组
* join() 把数组的所有元素放入一个字符串。元素通过指定的分隔符隔离
* reverse() 颠倒数组中元素的顺序
* concat (arr1,arr2....) 不会修改原数组，连接数组

```JavaScript
//splice
let arr = [1,2,3,4,5]
arr.splice(0,3,1,2,3,4,5)
console.log(arr); //[1,2,3，4,5,4,5]

//slice
let arr = [1,2,3,4,5]
let arr1 = arr.slice(0,2)
console.log('arr1',arr1);//[1,2]
console.log('arr',arr);

```

# 23、数组常用函数

* map 对数组的每一项都运行给定的函数，返回每次函数调用的结果组成一个新数组，**原数组不改变**
* find 传入一个回调函数，找到数组中符合当前搜索规则的第一个元素，返回它，并且终止搜索。
* filter((item,index,arr)=>{}) 过滤掉不符合的元素，返回剩下的元素
* forEach((item,index,arr)=>{}) 遍历数组

```javascript
//map
let arr = [1,2,3,4,5]
let aaaa = arr.map((item)=>{
  return item *2
})
console.log(arr);//[1,2,3,4,5]
console.log(aaaa);//[2,4,6,8,10]


//find
const arr = [1, “2”, 3, 3, “2”]
console.log(arr.find(n => typeof n === “number”)) // 1

//filter
var arr = [1, 2, 4, 5, 6, 9, 10, 15];
var r = arr.filter( (x)=> {
    return x % 2 !== 0;
});
// [1, 5, 9, 15]
```

# 24、去除数组的空值

* filter
* forEach、map + push循环判断
* **拓展知识：**
  - **true：**`0 == ""` 、`false == ""` 、`[] == ""` 、`null == undefined`
  - **false：**`{} == ""` 、`null == ""` 、`undefined == ""` 

```javascript
//filter
arr.filter(d=>d)

//forEach
arr.forEach(item => {
if (item) {
    newArr.push(item)
}
})

//map
arr.map(function(val, index) {
    //过滤规则为，不为空串、不为null、不为undefined，也可自行修改
    if (val !== "" && val != undefined) {
        newArr.push(val);
    }
});
```

# 25、字符串的常用操作

* split(separator,howmany)  方法用于把一个字符串分割成字符串数组。separator 指定的分割的参数，返回数组的最大长度
* slice(satrt,end) 方法可提取字符串的某个部分，并以新的字符串返回被提取的部分。包括start，不包括end 可接受负数参数
* substring(start,stop) 和slice一样但是substring不接受负的参数

# 26、js实现栈操作

```javascript
class stack{
  constructor(){
    this.data = []
  }
  push(item){
    this.data.push(item)
  }
  pop(){
    if(this.data.length < 1){
      return false
    }
    console.log(this.data.pop())
  }
  isEmpty(){
    return this.data.length > 0 ? false : true
  }
}
let newStack = new stack()
newStack.push(2)
console.log(newStack.isEmpty());
console.log(newStack);
```

# 27、js实现队列操作

```javascript
class queue{
  constructor(){
    this.arr = []
  }
  push(item){
    this.arr.push(item)
  }
  pop(){
    if(this.arr.length < 1) return false
    this.arr.shift()
  }
  getFront(){
    return this.arr[0]
  }
  getRear(){
    return this.arr[this.arr.length -1]
  }
  clear(){
    arr = []
  }
  size(){
    return this.arr.length
  }
}

let newQueue = new queue()
newQueue.push(1)
newQueue.push(2)
newQueue.pop()
console.log('newQueue',newQueue);
```

# 28、用栈实现队列

```javascript
class myQueue{
  constructor(){
    this.stack1 = []
    this.stack2 = []
  }
  push(item){
    this.stack1.push(item)
  }
  pop(){
    if(this.stack2.length === 0){
      while(this.stack1.length > 0){
        this.stack2.push(this.stack1.pop())
      }
      if (this.stack1.length === 0 && this.stack2.length === 0) {
        return -1
    	}
    }
    return this.stack2.pop()
  }
  peek(){
    if(this.stack2.length > 0){
      return this.stack2[this.stack2.length -1]
    }else{
      return this.stack1[0]
    }
  }
  empty(){
    return this.stack1.length === 0 && this.stack2.length === 0
  }
}

let queue = new myQueue()
queue.push(1)
queue.push(2)
console.log(queue.pop());
console.log(queue.empty());
console.log('queue',queue);
```

# 29、用两个队列实现栈

```javascript
class myStack{
  constructor(){
    this.queue1 = []
    this.queue2 = []
  }
  push(item){
    // 向已有元素的队列中添加元素
    if(this.queue1.length !== 0){
      this.queue1.push(item)
    }else{
      this.queue2.push(item)
    }
  }
  pop(){
    if(this.queue1.length !== 0){
      // queue1不为空，则把queue1中除最后一个元素的其他元素移入queue2
      while(this.queue1.length != 1){
        this.queue2.push(this.queue1.shift())
      }
      return this.queue1.shift()
    }else if(this.queue2.length !== 0){
      // queue2不为空，则把queue2中除最后一个元素的其他元素移入queue1
      while(this.queue2.length != 1){
        this.queue1.push(this.queue2.shift())
      }
      return this.queue2.shift()
    }
    return false
  }
  peek(){
    if(this.queue1.length !== 0){
      // 与pop操作一样
      while(this.queue1.length != 1){
        this.queue2.push(this.queue1.shift())
      }
      let res = this.queue1.shift()
      this.queue2.push(res)
      return res
    }else if(this.queue2.length !== 0){
      while(this.queue2.length != 1){
        this.queue1.push(this.queue2.shift())
      }
      let res = this.queue2.shift()
      this.queue1.push(res)
      return res
    }
    return false
  }
  empty(){
    if(this.queue1.length !== 0 || this.queue2.length !== 0) return false
    return true
  }
}

let stack = new myStack()
stack.push(1)
stack.push(2)
console.log(stack.pop());
stack.push(3)
// console.log(stack.pop());
console.log(stack.peek());
console.log('stack',stack);
```

# 30、线程和进程的区别

* 进程：进程是有一定独立功能的程序，他是系统进行资源分配调度的一个独立单元
* 线程：线程是进程的一个实体，是CPU调度分派的基本单位，线程直接基本上不拥有系统资源

一个程序至少有一个进程，一个进程至少有一个线程，资源分配给进程，同一个进程下所有线程共享该进程的资源

# 31、闭包

* **概念：引用了外部自由变量的函数，就叫闭包**
* **LHS**：name='sdas' 当变量出现在赋值操作左侧是就是LHS操作，意味着给变量赋值写入内存
* **LHR**：var myName = name 当变量出现在赋值操作右侧就是LHR操作，意味着查找变量，从内存中读取

### 例题：

```javascript
//1
function test (){
    var num = []
    var i

    for (i = 0; i < 10; i++) {
        num[i] = function () {
            console.log(i)
        }
    }

    return num[9]
}

test()()//10

//2
var test = (function() {
    var num = 0
    return () => {
        return num++
    }
}())

for (var i = 0; i < 10; i++) {
    test()
} //num = 9

console.log(test())//10

//3
function foo(a,b){
  console.log(b);
  return {
    foo:function(c){
      return foo(c,a);
    }
  }
}
 
var func1=foo(0);//unde
func1.foo(1);//0
func1.foo(2);//0
func1.foo(3);//0
var func2=foo(0).foo(1).foo(2).foo(3);// undefined 0 1 2
var func3=foo(0).foo(1);//undefined 0
func3.foo(2);//1
func3.foo(3);//1
```

### 应用：

* 模拟私有变量
* 偏函数和柯里化
* 保存外部函数变量

1. 模拟私有变量

   ```javascript
   // 利用闭包生成IIFE，返回 User 类
   const User = (function() {
       // 定义私有变量_password
       let _password
   
       class User {
           constructor (username, password) {
               // 初始化私有变量_password
               _password = password
               this.username = username
           }
   
          login() {
              // 这里我们增加一行 console，为了验证 login 里仍可以顺利拿到密码
              console.log(this.username, _password)
              // 使用 fetch 进行登录请求，同上，此处省略
          }
       }
   
       return User
   })()
   
   let user = new User('xiuyan', 'xiuyan123')
   
   console.log(user.username)
   console.log(user.password)
   console.log(user._password)
   user.login()
   ```

2. 偏函数和与柯里化

   * 偏函数
     偏函数就是固定函数的一个或者几个入参，返回一个新的函数，偏函数强调的是把函数的入参拆解为两部分

     ```javascript
     //原函数
     function generateName(prefix, type, itemName) {
         return prefix + type + itemName
     }
     
     // 调用时一口气传入3个入参
     var itemFullName = generateName('大卖网', '母婴', '奶瓶')
     
     //偏函数改造
     function generateName(prefix) {
         return function(type, itemName) {
             return prefix + type + itemName
         }
     }
     
     // 把3个参数分两部分传入
     var itemFullName = generateName('大卖网')('母婴', '奶瓶')
     ```

   * 柯里化
     柯里化是把接受n个参数的1个函数改造为只接受一个参数的n个互相嵌套的函数的过程

     ```javascript
     //原函数
     function generateName(prefix, type, itemName) {
         return prefix + type + itemName
     }
     // itemName 是原有商品名
     generateName('大卖网', type, itemName)
     
     
     //改造之后
     function generateName(prefix) {  
         return function(type) {
             return function (itemName) {
                 return prefix + type + itemName
             }    
         }
     }
     
     // 生成大卖网商品名专属函数
     var salesName = generateName('大卖网')
     // “记住”prefix，生成大卖网母婴商品名专属函数
     var salesBabyName = salesName('母婴')
     // "记住“prefix和type，生成洗菜网生鲜商品名专属函数
     var vegFreshName = generateName('洗菜网')('生鲜')
     
     // 输出 '大卖网母婴奶瓶'
     salesBabyName('奶瓶')
     // 输出 '洗菜网生鲜菠菜'
     vegFreshName('菠菜')
     
     // 啥也不记，直接生成一个商品名
     var itemFullName = generateName('洗菜网')('生鲜')('菠菜')
     ```

3. 保存外部函数的变量

### 缺点：

* 内存泄漏
* 闭包会在父函数外部，改变父函数内部变量的值，如果把父函数当做对象使用，把闭包当做公用方法，内部变量当做私有属性，这时候就不要随便改变父函数内部变量的值

# 32、原型与原型链

原型分为两种：显式原型和隐式原型，每个构造函数都有一个显式原型，每个实例都有一个隐式原型，如果用构造函数去创建实例时，实例的隐式原型就会指向构造函数的显式原型

### 自由属性+原型继承属性

```javascript
function A() {
    this.name = 'a'
    this.color = ['green', 'yellow']
 }
 function B() {
   
 }
 B.prototype = new A()
 var b1 = new B()
 var b2 = new B()
 
 b1.name = 'change'//写操作
 b1.color.push('black')//读操作

console.log(b2.name) // 'a'
console.log(b2.color) // ["green", "yellow", "black"]
```

读操作和写操作的区别：

b1.name = 'change' 是一个赋值动作赋值动作不会沿着原型链往上找，只有读的操作会沿着原型链找 像b1.color.push('black')它走的是 **原型链** **查询 + 修改** 的流程，不是创建新属性的流程

### 原型链继承的几种方式

1. 原型链继承
2. 构造继承
3. 组合式继承

父类：

```javascript
function People(name){
    this.name = name || 'Annie'
    this.sleep = function(){
        console.log(this.name + '正在睡觉')
    }
}
//原型方法
People.prototype.eat = function(food){
    console.log(this.name + '正在吃：' + food);
}
```

原型链继承;

```javascript
function Woman(){}
Woman.prototype= new People();
Woman.prototype.name = 'haixia';
let womanObj = new Woman();
```



# 33、DOM常见操作

> 节点树：文档中 **所有的内容** 看成树上的节点
>
> 元素树：文档中 **所有的标签** 看成树上的节点

- 查找节点

  ```js
  document.getElementById('id属性值');
  document/element.getElementsByClassName('class属性值');
  document/element.getElementsByTagName('标签名');
  document.getElementsByName('name属性值');
  document/element.querySelector('CSS选择器');
  document/element.querySelectorAll('CSS选择器');
  document.documentElement; // 获取页面中的 HTML标签
  document.body;   // 获取页面中的 BODY标签
  document.all[''];   // 获取页面中的 所有元素节点的对象集合型
  ```

- 新建节点

  ```js
  document.createElement('元素名');
  document.createAttribute('属性名');
  document.createTextNode('文本内容');
  document.createComment('注释节点');
  document.createDocumentFragment( );
  ```

- 添加新节点

  ```js
  parent.appendChild( element/txt/comment/fragment ); // 向父节点的最后子节点追加新节点
  parent.insertBefore( newChild, existingChild ); // 向父节点的某个特定子节点之前插入新节点
  element.setAttributeNode( attributeName ); // 给元素增加属性节点
  element.setAttribute( attributeName, attributeValue ); // 给元素增加指定属性，并设定属性值
  ```

- 删除节点

  ```js
  parentNode.removeChild( existingChild );
  element.removeAttribute('属性名');
  element.removeAttributeNode( attrNode );
  ```

- 修改节点

  ```js
  parentNode.replaceChild( newChild, existingChild );
  element.setAttributeNode( attributeName );
  element.setAttribute( attributeName, attributeValue );
  ```

  ![DOM](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0fc9c1fb1a4b460796c054bb679e9493~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

# 34、BOM常见操作

- **window**

  - **注意：**
    - BOM的核心是window对象，表示浏览器的实例。
    - var声明的全局变量和全局函数都会变成window对象的属性和方法。
    - let、const则不会。

  - **window页面加载事件**
    - load
    - DOMContentLoaded
  - **window调整窗口**
    - resize
  - **window定时器**
    - setTimeout()、clearTimeout
    - setInterval()、clearInterval

- **location**

  - 访问location属性值
    - location.hash
    - location.href
    - location.host
    - location.hostName
    - location.port
    - location.pathname
    - location.search  (url中，查询字符串，以？开头)
    - location.protocol（页面使用的协议 http/https）
  - 修改location对象
    - window.assign('')   // 载入一个新的文档
    - window.location = ''
    - window.locatiobn.href = ''
    - window.location.replace('')
    - window.location.reload() （ture 参数可选可不选

- **history**

  - history.go()
  - history.forward()
  - history.back()
  - history.length

- **document**

- **navigator**

- **screen**

[参考链接]: https://juejin.cn/post/6991335343450488862#heading-7



# 35. JS的跨域问题、解决方案

- [参考地址](https://blog.csdn.net/lareinalove/article/details/84107476)

- 什么是跨域
  - 域名不同
  - 端口不同
  - 协议不同
  - 域名与域名对应的ip地址
- 解决方法
  1. 跨域资源共享（CORS
  2. JSONP
  3. document.domain（只适用于 Cookie 和 iframe 窗口，LocalStorage 和 IndexDB 无法通过这种方法）
  4. 使用window.name来进行跨域
  5. 使用HTML5的window.postMessage方法
  6. 通过WebSocket
  7. 图像ping（单向）
  8. 使用片段识别符来进行跨域



# 36. generator构造器

[参考大佬的链接](https://www.jianshu.com/p/92639e681e2a) 

- **generator介绍**

  - Generator 的中文名称是生成器，它是ECMAScript6中提供的新特性。在过去，封装一段运算逻辑的单元是函数。函数只存在“没有被调用”或者“被调用”的情况，不存在一个函数被执行之后还能暂停的情况，而Generator的出现让这种情况成为可能。
  - 通过`function*`来定义的函数称之为“生成器函数”（generator function），它的特点是可以中断函数的执行，每次执行`yield`语句之后，函数即暂停执行，直到调用返回的生成器对象的`next()`函数它才会继续执行。
  - 也就是说Generator 函数是一个状态机，封装了多个内部状态。执行 Generator 函数返回一个遍历器对象（一个指向内部状态的指针对象），调用遍历器对象的next方法，使得指针移向下一个状态。每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句）为止。

- **yield关键字**

  - 真正让Generator具有价值的是`yield`关键字，这个`yield`关键字让 Generator内部的逻辑能够切割成多个部分。

- **`.next()`调用时，返回一个对象**

  - `yield`除了切割逻辑外，它与`.next()`的行为息息相关。每次`.next()`调用时，返回一个对象，这个对象具备两个属性。

  - 一个属性是布尔型的`done`。它表示这个Generator对象的逻辑块是否执行完成。

  - 另一个属性是`value`，它来自于`yield`语句后的表达式的结果。

  - ```js
    let compute = function* (a, b) {
      var foo = yield a + b;
      console.log(foo);
    };
    
    let generator = compute(4, 2);
    generator.next(); // {value: 6, done: false}
    generator.next("Hello world!"); //Hello world! {value: undefined, done: true}
    ```

- **使用 Generator 编写状态切换逻辑代码**

  ```js
  function * loop(list, max=Infinity) {
      for(let i=0; i<max;i++) {
          yield list[i % list.length];
      }
  }
  
  function toggle(...actions) {
      let gen = loop(actions); 
    //错误写法：先调用loop(actions).next(); 
      return function(...args) {
          return gen.next().value.apply(this, args);
      }
  }
  
  switcher.addEventListener('click', toggle(
      e => e.target.className = 'off',
      e => e.target.className = 'warn',
      e => e.target.className = 'on'
  ));
  ```

  

# 37. JS排序算法

[排序算法详解](https://www.cnblogs.com/AlbertP/p/10847627.html)

# 38. 对象的创建模式
* Object构造函数模式
  ```
  var obj = {};
  obj.name = 'Tom'
  obj.setName = function(name){this.name=name}
  ```
* 对象字面量模式
  ```
  var obj = {
    name : 'Tom',
    setName : function(name){this.name = name}
  }
  ```
* 构造函数模式
  ```
  function Person(name, age) {
    this.name = name;
    this.age = age;
    this.setName = function(name){this.name=name;};
  }
  new Person('tom', 12);
  ```
* 构造函数+原型的组合模式
  ```
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }
  Person.prototype.setName = function(name){this.name=name;};
  new Person('tom', 12);
  ```
  
# 39. 继承模式
* 原型链继承 : 得到方法
  ```
  function Parent(){}
  Parent.prototype.test = function(){};
  function Child(){}
  Child.prototype = new Parent(); // 子类型的原型指向父类型实例
  Child.prototype.constructor = Child
  var child = new Child(); //有test()
  ```
* 借用构造函数 : 得到属性
  ```
  function Parent(xxx){this.xxx = xxx}
  Parent.prototype.test = function(){};
  function Child(xxx,yyy){
      Parent.call(this, xxx);//借用构造函数   this.Parent(xxx)
  }
  var child = new Child('a', 'b');  //child.xxx为'a', 但child没有test()
  ```
* 组合
  ```
  function Parent(xxx){this.xxx = xxx}
  Parent.prototype.test = function(){};
  function Child(xxx,yyy){
      Parent.call(this, xxx);//借用构造函数   this.Parent(xxx)
  }
  Child.prototype = new Parent(); //得到test()
  var child = new Child(); //child.xxx为'a', 也有test()
  ```
* new一个对象背后做了些什么?
  * 创建一个空对象
  * 给对象设置__proto__, 值为构造函数对象的prototype属性值   this.__proto__ = Fn.prototype
  * 执行构造函数体(给对象添加属性/方法)

# 40. 迭代器

忽略enumerable为false的属性：

1. for...in循环：只遍历对象自身的和继承的可枚举的属性。
2. Object.keys()：返回对象自身的所有可枚举的属性的键名。
3. JSON.stringify()：只串行化对象自身的可枚举的属性。
4. Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性