#

# 1、预编译

- 全局

  - 创建 GO 对象（global object window
  - 找变量声明，将变量声明作为 GO 对象的属性名，值赋予 undefined
  - 找全局里的函数声明，将函数名作为 GO 对象的属性名，值赋予函数体

- 函数中

  1.创建 AO 对象（activation object 执行上下文对象）

  2.找形参和变量的声明，作为 AO 对象的属性名，值是 undefined

  3.实参和形参相统一

  4.找函数声明，会覆盖变量的声明

> 例子：
>
> ```js
> var a = 1;
> console.log(a);
> console.log(c);
> function test(a) {
>   console.log(a);
>   console.log(b);
>   var a = 123;
>   console.log(a);
>   function a() {
>     let a = 1;
>   }
>   console.log(a);
>   var b = function () {
>     let b = 1;
>   };
>   console.log(b);
>   function d() {}
> }
> var c = function () {
>   let c = 1;
> };
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

# 2、this 指向

==谁调用指向谁==

```js
var name = 222;
var a = {
  name: 111,
  say: function () {
    console.log("this", this);
    console.log(this.name);
  },
};

var fun = a.say;
fun(); //222
a.say(); //111

var b = {
  name: 333,
  say: function (fun) {
    console.log("this", this);
    fun();
  },
};
b.say(a.say); //222
b.say = a.say;
b.say(); //333
```

# 3、箭头函数中的 this

1.箭头函数中的 this 是在定义函数的时候绑定，而不是在执行函数的时候绑定

2.箭头函数中，this 指向的固定化，并不是因为箭头函数内部有绑定 this 的机制，实际原因是箭头函数根本没有自己的 this，导致内部的 this 就是外层代码块的 this.正是因为它没有 this,所以也就不能用作构造函数

```js
var x = 11;
var obj = {
  x: 22,
  say: () => {
    console.log(this.x);
  },
};
obj.say(); //11
```

# 4、深浅拷贝（18

浅拷贝: 浅拷贝是按位拷贝对象，它会创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值；如果属性是内存地址（引用类型），拷贝的就是内存地址 ，因此如果其中一个对象改变了这个地址，就会影响到另一个对象。

```js
function shallowCopy(obj) {
  var target = {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      target[i] = obj[i];
    }
  }
  return target;
}
```

深拷贝:

方法一：

```js
function deepClone(obj) {
  var cloneObj = new obj.constructor();
  var cloneObj = {};
  if (typeof obj !== "object" || oldObj === null) {
    return obj;
  }
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      cloneObj[i] = deepClone(obj[i]);
    }
  }
  return cloneObj;
}
```

方法二：

JSON.parse(JSON.stringify(obj))

缺点：Date,正则，函数会失效

| js 的拷贝 | 和原数据是否指向同一对象 |  第一层数据为一般数据类型  |   第一层数据不是原始数据   |
| :-------: | :----------------------: | :------------------------: | :------------------------: |
|   赋值    |            是            |  改变会使原始数据一同改变  |  改变会使原始数据一同改变  |
|  浅拷贝   |            否            | 改变不会使原始数据一同改变 |  改变会使原始数据一同改变  |
|  深拷贝   |            否            | 改变不会使原始数据一同改变 | 改变不会使原始数据一同改变 |

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

# 6、js 的作用域

1.全局作用域

- 全局作用域在页面打开时被创建，页面关闭时被销毁
- 编写在 SCRIPT 标签中的变量和函数，作用域为全局，在页面的任意位置都可以访问到
- 在全局作用域中有全局对象 window，代表一个浏览器窗口，由浏览器创建，可以直接调用
- 全局作用域中声明的变量和函数会作为 window 对象的属性和方法保存

  2.函数作用域

- 调用函数时，函数作用域被创建，函数执行完毕，函数作用域被销毁
- 每调用一次函数就会创建一个新的函=数作用域，他们之间是互相独立的
- 在函数作用域中可以访问到全局作用域中的变量，在函数外无法访问到函数作用域中的变量
- 在函数作用域中访问变量，函数时，会先在自身作用域中寻找，若没有找到，则会到函数的上一级作用域中寻找，一直到全局作用域

# 7、内存泄漏

- 闭包

- 意外的全局变量

- 被遗忘的定时器

- 脱离 DOM 的引用

# 8、es6 新特性

[详细文档 - 阮一峰](https://es6.ruanyifeng.com/#docs/promise)

#### 1.const ,let

`let`: 声明在代码块内有效的变量。

`const`: 声明一个只读的常量(一但声明，这个值不能被改变,对于引用类型，是引用的地址不能被改变,声明时必须赋值）

let 表示声明变量，而 const 表示声明常量，两者都为块级作用域；const 声明的变量都会被认为是常量，意思就是它的值被设置完成后就不能再修改了：

#### 2.解构赋值

按照一定模式从数组或对象中提取值，然后对变量进行赋值（先提取，再赋值）

#### 3.模板字符串``

- `${}`中可以使用任意的 javaScript 表达试、运算、引用对象属性、函数调用等。结果是其返回值。

- ` 反撇号 ``  ` 内可以换行，但是所有的空格和换行会被保留。

#### 4.函数的扩展

#### 5.数组的扩展

1. 扩展运算符。
2. 用于替代数组的`apply`。
3. Array.from()将类数组转为数组
4. 实例的方法
   - ` find()``findIndex() `找出第一个符合条件的成页/下标（位置），找不到返回 undefined
   - ` entries()``keys()``values() ` 用于遍历数组。（配合 for...of)
   - `includes()` 是否存在指定元素(返回布尔值)

call apply bind 的区别：
用于改变 this 的指向， 第一个参数为 this 指向的对像，后面的参数是作为函数的参数。
区加在于：call apply 会即调用，而 bind 是生成一个等待调用的函数。call bind 参数是一个个用逗号罗列，而 apply 是传入一个数组。

#### 6.箭头函数

> ES6 中，箭头函数就是函数的一种简写形式，使用括号包裹参数，跟随一个 =>，紧接着是函数体；
>
> - 不需要 function 关键字来创建函数
> - 省略 return 关键字
> - 继承当前上下文的 this 关键字

#### 7.for...of,for...in

for...of 用于遍历一个迭代器

```jsx
let letters = ["a", "b", "c"];
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

#### 8.class 继承

ES6 中支持 class 语法，不过，ES6 的 class 不是新的对象继承模型，它只是原型链的语法糖表现形式。

# 9、手写 map

```js
function map(arr, mapCallback) {
  if (!Array.isArray(arr) || !arr.length || typeof mapCallback !== "function") {
    return [];
  } else {
    let result = [];
    for (let i = 0, len = arr.length; i < len; i++) {
      result.push(mapCallback(arr[i], i, arr));
    }
    return result;
  }
}
```

# 10、event-loop(事件循环机制)

`Event Loop`即事件循环，是指浏览器或`Node`的一种解决`javaScript`单线程运行时不会阻塞的一种机制，也就是我们经常使用**异步**的原理。

三部分组成：调用栈，微任务队列，消息队列(宏任务)

JS 调用栈采用的是后进先出的规则，当函数执行的时候，会被添加到栈的顶部，当执行栈执行完成后，就会从栈顶移出，直到栈内被清空。

`Javascript`单线程任务被分为**同步任务**和**异步任务**，同步任务会在调用栈中按照顺序等待主线程依次执行，异步任务会在异步任务有了结果后，将注册的回调函数放入任务队列中等待主线程空闲的时候（调用栈被清空），被读取到栈内等待主线程的执行。

首先把整个 script 当成宏任务执行，碰到同步代码直接执行，微任务放在微队列中，宏任务放在宏队列中，执行完后在执行微队列中的任务，全部执行完后在执行宏队列中的任务，一直这样循环，直到全部执行完

# 11、数组的扁平化

多维数组转化为一维数组

```js
const arr = [1, [2, [3, [4, 5]]], 6];

//1.数组自带的方法
console.log(arr.flat(Infinity));

//2.利用正则表达式
const res2 = JSON.stringify(arr).replace(/\[|\]/g, "");
console.log(res2.split(","));

//3.正则改良版
const res3 = JSON.parse("[" + res2 + "]");

//4.递归实现
const array = [];
const fn = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      fn(arr[i]);
    } else {
      array.push(arr[i]);
    }
  }
};

//5.reduce
const newArr = (arr) => {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? newArr(cur) : cur);
  }, []);
};
console.log(newArr(arr));
```

# 12、数组去重

1. **es6 去重**

```js
function unique(arr) {
  return Array.from(new Set(arr));
}
```

2. **双重 for 循环**

```js
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
```

3. **map**

```js
function unique(arr) {
  let map = new Map();
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (map.has(arr[i])) {
      map.set(arr[i], true);
    } else {
      map.set(arr[i], false);
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
```

4. **reduce**

```js
function unique(arr) {
  if (!Array.isArray(arr)) return false;
  arr.reduce((pre, cur) => {
    if (!pre.includes(cur)) pre.push(cur);
    return pre;
  }, []);
  return arr;
}
```

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

   - 箭头函数的 this 本身没有 prototype，即没有 this，但它会在上下文查找。
   - 箭头函数的 this 继承自外层第一个普通函数的 this。
   - 箭头函数本身的 this 指向不能改变，但可以修改它要继承的对象的 this
   - 箭头函数的 this 指向全局，使用 arguments 会报未声明的错误。
   - 如果箭头函数外层没有普通函数，严格模式和非严格模式下它的 this 都会指向 window(全局对象)

   - ==普通函数：this 指向调用它的对象==

2. **构造函数，用 new**

   - 箭头函数不能用于构造函数，不能使用 new，普通函数可以用于构造函数，以此创建对象实例。

   - 箭头函数使用 new 调用箭头函数会报错，不支持 new.target，因为箭头函数没有 constructor。

3. **匿名函数**

   - 箭头函数全部都是匿名函数，箭头函数不支持重命名函数参数，普通函数的函数参数支持重命名

4. 箭头函数语法更简洁优雅

# 15、new 操作符的过程

new 操作符新建了一个空对象，这个对象原型指向构造函数的 prototype，执行构造函数后返回这个对象。

# 16、为什么 JavaScript 是单线程？

- JavaScript 的单线程主要和它的用途是相关的，它是浏览器脚本语言，**主要用途是与用户互动和操作 dom**。

- 如果不是单线程的话就会带来很复杂的问题，比如 js 假如同时有两个线程，一个线程在某个 dom 节点上添加了内容，另一个删除了这个节点，那浏览器就不知道以那个线程为准了。

- 不过在 HTML5 提出了 Web Worker（解决页面阻塞）标准，允许 JavaScript 脚本创建多个线程，但是子线程是完全受主线程控制的，且不得操作 dom。还是没有改变 JavaScript 单线程的本质。

# 17、判断数组与对象？

- 方法一：

  ```js
  Object.prototype.toString.call(obj); // [object Object]
  Object.prototype.toString.call(arr); // [object Array]
  ```

- 方法二：

  ```js
  Array.isArray(arr); // true
  Array.isArray(obj); // false
  ```

- 方法三：

  ```js 
  arr instanceof(Array) // true
  obj instanceof(Array) // false
  ```

# 18、深浅拷贝（4

- 浅拷贝：只拷贝一层，更深层次对象级别的只拷贝引用地址
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

- 深拷贝：多层拷贝，每层的数据都会拷贝

  1. 递归

  2. JSON.stringify

     (不能拷贝 时间对象、正则表达式、Error 对象、函数、undefined、NaN)

     拷贝构造函数生成的对象的话，会丢失对象的`constructor`

  3. lodash 库

     var objects = [{ 'a': 1 }, { 'b': 2 }];

     var deep = \_.cloneDeep(objects); ···

```javascript
//深拷贝
let obj = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3,
      f: [1, 2, 3, 4, 5],
    },
  },
};
function deepClone() {
  let cloneObj = {};
  //这样还只是浅拷贝 当更改obj.b.c的值时 拷贝的对象也会改变
  for (let i in obj) {
    cloneObj[i] = obj[i];
  }
  return cloneObj;
}
let obj1 = deepClone(obj);
obj.b.c = 10;
console.log(obj1);

//手动拷贝三层
function deepClone1(obj) {
  let cloneObj = {};
  for (let i in obj) {
    if (typeof obj[i] === "object" && obj[i] !== null) {
      cloneObj[i] = {};
      for (let j in obj[i]) {
        if (typeof obj[i][j] === "object" && obj[i][j] !== null) {
          cloneObj[i][j] = {};
          for (let k in obj[i][j]) {
            cloneObj[i][j][k] = obj[i][j][k];
          }
        } else {
          cloneObj[i][j] = obj[i][j];
        }
      }
    } else {
      cloneObj[i] = obj[i];
    }
  }
  return cloneObj;
}

//递归实现 缺陷只能克隆数组和json对象
function deepClone2(obj, cloneObj) {
  var cloneObj = cloneObj || {};
  for (let i in obj) {
    if (typeof obj[i] === "object" && obj[i] !== null) {
      //判断是数组 不是就赋值为数组
      // cloneObj[i] = Array.isArray(obj[i]) ? [] : {}
      // cloneObj[i] = obj[i] instanceof Array ? [] : {}
      // cloneObj[i] =
      //   Object.prototype.toString.call(obj[i]) === '[object Array]' ? [] : {} //这个方法能判断所有的
      cloneObj[i] = obj[i].constructor === Array ? [] : {};

      cloneObj[i] = deepClone2(obj[i], cloneObj[i]);
    } else {
      cloneObj[i] = obj[i];
    }
  }
  return cloneObj;
}

//JSON.stringify
function deepClone3(obj) {
  return JSON.parse(JSON.stringify(obj));
}

//测试
let cloneObj = deepClone3(obj);
obj.b.d.f.push(55);
console.log(obj.b.d.f);
console.log(cloneObj.b.d.f);
```

```javascript
//最完善的深拷贝
//判断对象的类型
function jugeType(obj) {
  const toString = Object.prototype.toString;
  const map = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object",
  };
  // if (obj instanceof Element) {
  //   return 'element'
  // }
  return map[toString.call(obj)];
}

function deepCopy3(obj) {
  const type = jugeType(obj);
  let copyObj = null;
  if (type === "array") {
    copyObj = [];
    for (let i = 0; i < obj.length; i++) {
      copyObj.push(deepCopy3(obj[i]));
    }
  } else if (type === "object") {
    copyObj = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        copyObj[key] = deepCopy3(obj[key]);
      }
    }
  } else {
    return obj;
  }
  return copyObj;
}

let obj = {
  a: 1,
  dates: [new Date(1536627600000), new Date(1540047600000)],
  b: {
    c: 2,
    d: {
      e: 3,
      F: function () {},
      reg: new RegExp("\\w+"),
    },
  },
};
let deepObj = deepCopy3(obj);
obj.b.c = 5;
obj.b.d.e = 10;
console.log("deepObj", deepObj);
```

# 19、判断数组的四种方法

假设 let a = []

1. **Array.isArray()**

   ```javascript
   Array.isArray(a); //true
   ```

2. **a instanceof Array**
   **只能判断 Object Function Array**

   ```javascript
   //Object Function Array
   a instanceof Array; //true
   ```

3. **Object.prototype.toString.call(a) === '[object Array]'**
   **可以判断任何类型（Number String Object Array Function Null Undefined ）**

   ```javascript
   //Number String Object Array Function Null Undefined
   Object.prototype.toString.call(a) === "[object Array]"; //true

   Object.prototype.toString.call(a) === "[object Number]"; //true
   ```

4. **a.constructor === Array**
   **除了 null 和 undefined 其它的都能判断**

   ```javascript
   //Number String Object Array Function
   a.constructor === Array; //true

   a.constructor === String; //true
   ```

# 20、防抖和节流（5

### [1] 次数区别

1. **限制函数的执行次数**：
1. 防抖：通过 setTimeout 的方式，在一定时间内，将多次触发变成一次触发
1. 节流：减少一段时间的触发频率

### [2] 防抖以及防抖的应用场景

- 登录、发短信等按钮避免用户点击太快，以致于发送了多次请求
- 调整窗口大小时
- scroll 事件，当停止滚动后获取滚动条距离顶部的距离
- 搜索输入框查询，只需用户最后一次输入完，再发送请求防抖

```javascript
//防抖 最简单的写法
function debounce1(fn, wait) {
  let timer = null;
  return function () {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      // 箭头函数中是没有arguments对象的
      fn.apply(this, arguments);
    }, wait);
  };
}
```

```javascript
//默认第一次点击触发的防抖
function debounce2(fn, wait) {
  let timer = null;
  return function () {
    let firstClick = !timer;
    console.log("firstClick", firstClick);
    if (timer) {
      clearTimeout(timer);
    }
    if (firstClick) {
      fn.call(this, arguments);
    }
    timer = setTimeout(() => {
      timer = null;
    }, wait);
  };
}
```

```javascript
//用户用来设置是否需要第一次就触发的防抖
function debounce3(fn, wait, triggleNow) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    if (triggleNow) {
      let firstClick = !timer;
      if (firstClick) {
        fn.apply(this, arguments);
      }
      timer = setTimeout(() => {
        // 箭头函数中是没有arguments对象的
        timer = null;
      }, wait);
    } else {
      timer = setTimeout(() => {
        // 箭头函数中是没有arguments对象的
        fn.apply(this, arguments);
      }, wait);
    }
  };
}
```

### [3]节流以及节流的应用场景

- scroll 事件，滚动监听事件，每隔一秒计算一次位置信息
- 浏览器播放事件，每隔一秒计算一次进度信息
- input 框实时搜索并发送请求展示下拉列表，每隔一秒发送一次请求

```javascript
function throttle(fn, delay) {
  let begin = 0;
  return function () {
    let cur = new Date().getTime();
    if (cur - begin > delay) {
      fn.apply(this, arguments);
      begin = cur;
    }
  };
}
```

# 21、栈与堆的区别

### 栈（stack）：

由操作系统自动分配释放，存放函数的参数值，局部变量的值等，调用完毕立即释放

一种先进后出的数据结构

### 堆（heap）：

一般由程序员分配释放，若程序员不释放，程序结束时可能由 OS 回收，分配方式倒是类似于链表

堆可以看成是一个树

> js 中基本数据类型存放在栈中：Number String Boolean Null undefined Symbol
>
> 引用数据类型存放在堆中：Function Object Array

### 区别：

1. 栈使用的是一级缓存，被调用时处于存储空间中，调用完毕立即释放
2. 堆是存放在二级缓存中，生命周期由虚拟机的垃圾回收算法来决定（并不是没用了就释放了）

# 22、数组常用操作

- push(a,b,c...) 方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度
- unshift （a,b,c...）往数组的最前面添加元素，并返回该数组的新长度
- pop() 删除并返回数组的最后一个元素
- shift() 删除并返回数组的第一个元素
- splice (0,3,'213',12) 从数组中指定的位置删除指定个数（3）的元素 或者 替换删除的参数 后面的参数为所需要替换的参数,splice 会改变原数组
- slice(2,4) 从数组中索引 0-3 之间的元素数组（包含 2 不包含 4），不会修改原数组，返回新数组
- join() 把数组的所有元素放入一个字符串。元素通过指定的分隔符隔离
- reverse() 颠倒数组中元素的顺序
- concat (arr1,arr2....) 不会修改原数组，连接数组

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

- map 对数组的每一项都运行给定的函数，返回每次函数调用的结果组成一个新数组，**原数组不改变**
- find 传入一个回调函数，找到数组中符合当前搜索规则的第一个元素，返回它，并且终止搜索。
- filter((item,index,arr)=>{}) 过滤掉不符合的元素，返回剩下的元素
- forEach((item,index,arr)=>{}) 遍历数组

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

- filter
- forEach、map + push 循环判断
- **拓展知识：**
  - **true：**`0 == ""` 、`false == ""` 、`[] == ""` 、`null == undefined`
  - **false：**`{} == ""` 、`null == ""` 、`undefined == ""`

```javascript
//filter
arr.filter((d) => d);

//forEach
arr.forEach((item) => {
  if (item) {
    newArr.push(item);
  }
});

//map
arr.map(function (val, index) {
  //过滤规则为，不为空串、不为null、不为undefined，也可自行修改
  if (val !== "" && val != undefined) {
    newArr.push(val);
  }
});
```

# 25、字符串的常用操作

- split(separator,howmany) 方法用于把一个字符串分割成字符串数组。separator 指定的分割的参数，返回数组的最大长度
- slice(satrt,end) 方法可提取字符串的某个部分，并以新的字符串返回被提取的部分。包括 start，不包括 end 可接受负数参数
- substring(start,stop) 和 slice 一样但是 substring 不接受负的参数

# 26、js 实现栈操作

```javascript
class stack {
  constructor() {
    this.data = [];
  }
  push(item) {
    this.data.push(item);
  }
  pop() {
    if (this.data.length < 1) {
      return false;
    }
    console.log(this.data.pop());
  }
  isEmpty() {
    return this.data.length > 0 ? false : true;
  }
}
let newStack = new stack();
newStack.push(2);
console.log(newStack.isEmpty());
console.log(newStack);
```

# 27、js 实现队列操作

```javascript
class queue {
  constructor() {
    this.arr = [];
  }
  push(item) {
    this.arr.push(item);
  }
  pop() {
    if (this.arr.length < 1) return false;
    this.arr.shift();
  }
  getFront() {
    return this.arr[0];
  }
  getRear() {
    return this.arr[this.arr.length - 1];
  }
  clear() {
    arr = [];
  }
  size() {
    return this.arr.length;
  }
}

let newQueue = new queue();
newQueue.push(1);
newQueue.push(2);
newQueue.pop();
console.log("newQueue", newQueue);
```

# 28、用栈实现队列

```javascript
class myQueue {
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }
  push(item) {
    this.stack1.push(item);
  }
  pop() {
    if (this.stack2.length === 0) {
      while (this.stack1.length > 0) {
        this.stack2.push(this.stack1.pop());
      }
      if (this.stack1.length === 0 && this.stack2.length === 0) {
        return -1;
      }
    }
    return this.stack2.pop();
  }
  peek() {
    if (this.stack2.length > 0) {
      return this.stack2[this.stack2.length - 1];
    } else {
      return this.stack1[0];
    }
  }
  empty() {
    return this.stack1.length === 0 && this.stack2.length === 0;
  }
}

let queue = new myQueue();
queue.push(1);
queue.push(2);
console.log(queue.pop());
console.log(queue.empty());
console.log("queue", queue);
```

# 29、用两个队列实现栈

```javascript
class myStack {
  constructor() {
    this.queue1 = [];
    this.queue2 = [];
  }
  push(item) {
    // 向已有元素的队列中添加元素
    if (this.queue1.length !== 0) {
      this.queue1.push(item);
    } else {
      this.queue2.push(item);
    }
  }
  pop() {
    if (this.queue1.length !== 0) {
      // queue1不为空，则把queue1中除最后一个元素的其他元素移入queue2
      while (this.queue1.length != 1) {
        this.queue2.push(this.queue1.shift());
      }
      return this.queue1.shift();
    } else if (this.queue2.length !== 0) {
      // queue2不为空，则把queue2中除最后一个元素的其他元素移入queue1
      while (this.queue2.length != 1) {
        this.queue1.push(this.queue2.shift());
      }
      return this.queue2.shift();
    }
    return false;
  }
  peek() {
    if (this.queue1.length !== 0) {
      // 与pop操作一样
      while (this.queue1.length != 1) {
        this.queue2.push(this.queue1.shift());
      }
      let res = this.queue1.shift();
      this.queue2.push(res);
      return res;
    } else if (this.queue2.length !== 0) {
      while (this.queue2.length != 1) {
        this.queue1.push(this.queue2.shift());
      }
      let res = this.queue2.shift();
      this.queue1.push(res);
      return res;
    }
    return false;
  }
  empty() {
    if (this.queue1.length !== 0 || this.queue2.length !== 0) return false;
    return true;
  }
}

let stack = new myStack();
stack.push(1);
stack.push(2);
console.log(stack.pop());
stack.push(3);
// console.log(stack.pop());
console.log(stack.peek());
console.log("stack", stack);
```

# 30、线程和进程的区别

- 进程：进程是有一定独立功能的程序，他是系统进行资源分配调度的一个独立单元
- 线程：线程是进程的一个实体，是 CPU 调度分派的基本单位，线程直接基本上不拥有系统资源

一个程序至少有一个进程，一个进程至少有一个线程，资源分配给进程，同一个进程下所有线程共享该进程的资源

# 31、闭包

- **概念：引用了外部自由变量的函数，就叫闭包**
- **LHS**：name='sdas' 当变量出现在赋值操作左侧是就是 LHS 操作，意味着给变量赋值写入内存
- **LHR**：var myName = name 当变量出现在赋值操作右侧就是 LHR 操作，意味着查找变量，从内存中读取

### 例题：

```javascript
//1
function test() {
  var num = [];
  var i;

  for (i = 0; i < 10; i++) {
    num[i] = function () {
      console.log(i);
    };
  }

  return num[9];
}

test()(); //10

//2
var test = (function () {
  var num = 0;
  return () => {
    return num++;
  };
})();

for (var i = 0; i < 10; i++) {
  test();
} //num = 9

console.log(test()); //10

//3
function foo(a, b) {
  console.log(b);
  return {
    foo: function (c) {
      return foo(c, a);
    },
  };
}

var func1 = foo(0); //unde
func1.foo(1); //0
func1.foo(2); //0
func1.foo(3); //0
var func2 = foo(0).foo(1).foo(2).foo(3); // undefined 0 1 2
var func3 = foo(0).foo(1); //undefined 0
func3.foo(2); //1
func3.foo(3); //1
```

### 应用：

- 模拟私有变量
- 偏函数和柯里化
- 保存外部函数变量

1. 模拟私有变量

   ```javascript
   // 利用闭包生成IIFE，返回 User 类
   const User = (function () {
     // 定义私有变量_password
     let _password;

     class User {
       constructor(username, password) {
         // 初始化私有变量_password
         _password = password;
         this.username = username;
       }

       login() {
         // 这里我们增加一行 console，为了验证 login 里仍可以顺利拿到密码
         console.log(this.username, _password);
         // 使用 fetch 进行登录请求，同上，此处省略
       }
     }

     return User;
   })();

   let user = new User("xiuyan", "xiuyan123");

   console.log(user.username);
   console.log(user.password);
   console.log(user._password);
   user.login();
   ```

2. 偏函数和与柯里化

   - 偏函数
     偏函数就是固定函数的一个或者几个入参，返回一个新的函数，偏函数强调的是把函数的入参拆解为两部分

     ```javascript
     //原函数
     function generateName(prefix, type, itemName) {
       return prefix + type + itemName;
     }

     // 调用时一口气传入3个入参
     var itemFullName = generateName("大卖网", "母婴", "奶瓶");

     //偏函数改造
     function generateName(prefix) {
       return function (type, itemName) {
         return prefix + type + itemName;
       };
     }

     // 把3个参数分两部分传入
     var itemFullName = generateName("大卖网")("母婴", "奶瓶");
     ```

   - 柯里化
     柯里化是把接受 n 个参数的 1 个函数改造为只接受一个参数的 n 个互相嵌套的函数的过程

     ```javascript
     //原函数
     function generateName(prefix, type, itemName) {
       return prefix + type + itemName;
     }
     // itemName 是原有商品名
     generateName("大卖网", type, itemName);

     //改造之后
     function generateName(prefix) {
       return function (type) {
         return function (itemName) {
           return prefix + type + itemName;
         };
       };
     }

     // 生成大卖网商品名专属函数
     var salesName = generateName("大卖网");
     // “记住”prefix，生成大卖网母婴商品名专属函数
     var salesBabyName = salesName("母婴");
     // "记住“prefix和type，生成洗菜网生鲜商品名专属函数
     var vegFreshName = generateName("洗菜网")("生鲜");

     // 输出 '大卖网母婴奶瓶'
     salesBabyName("奶瓶");
     // 输出 '洗菜网生鲜菠菜'
     vegFreshName("菠菜");

     // 啥也不记，直接生成一个商品名
     var itemFullName = generateName("洗菜网")("生鲜")("菠菜");
     ```

3. 保存外部函数的变量

### 缺点：

- 内存泄漏
- 闭包会在父函数外部，改变父函数内部变量的值，如果把父函数当做对象使用，把闭包当做公用方法，内部变量当做私有属性，这时候就不要随便改变父函数内部变量的值

# 32、原型与原型链

原型分为两种：显式原型和隐式原型，每个构造函数都有一个显式原型，每个实例都有一个隐式原型，如果用构造函数去创建实例时，实例的隐式原型就会指向构造函数的显式原型

### 自由属性+原型继承属性

```javascript
function A() {
  this.name = "a";
  this.color = ["green", "yellow"];
}
function B() {}
B.prototype = new A();
var b1 = new B();
var b2 = new B();

b1.name = "change"; //写操作
b1.color.push("black"); //读操作

console.log(b2.name); // 'a'
console.log(b2.color); // ["green", "yellow", "black"]
```

读操作和写操作的区别：

b1.name = 'change' 是一个赋值动作赋值动作不会沿着原型链往上找，只有读的操作会沿着原型链找 像 b1.color.push('black')它走的是 **原型链** **查询 + 修改** 的流程，不是创建新属性的流程

### 原型链继承的几种方式

1. 原型链继承
2. 构造继承
3. 组合式继承

父类：

```javascript
function People(name) {
  this.name = name || "Annie";
  this.sleep = function () {
    console.log(this.name + "正在睡觉");
  };
}
//原型方法
People.prototype.eat = function (food) {
  console.log(this.name + "正在吃：" + food);
};
```

原型链继承;

```javascript
function Woman() {}
Woman.prototype = new People();
Woman.prototype.name = "haixia";
let womanObj = new Woman();
```

# 33、DOM 常见操作

> 节点树：文档中 **所有的内容** 看成树上的节点
>
> 元素树：文档中 **所有的标签** 看成树上的节点

- 查找节点

  ```js
  document.getElementById("id属性值");
  document / element.getElementsByClassName("class属性值");
  document / element.getElementsByTagName("标签名");
  document.getElementsByName("name属性值");
  document / element.querySelector("CSS选择器");
  document / element.querySelectorAll("CSS选择器");
  document.documentElement; // 获取页面中的 HTML标签
  document.body; // 获取页面中的 BODY标签
  document.all[""]; // 获取页面中的 所有元素节点的对象集合型
  ```

- 新建节点

  ```js
  document.createElement("元素名");
  document.createAttribute("属性名");
  document.createTextNode("文本内容");
  document.createComment("注释节点");
  document.createDocumentFragment();
  ```

- 添加新节点

  ```js
  parent.appendChild(element / txt / comment / fragment); // 向父节点的最后子节点追加新节点
  parent.insertBefore(newChild, existingChild); // 向父节点的某个特定子节点之前插入新节点
  element.setAttributeNode(attributeName); // 给元素增加属性节点
  element.setAttribute(attributeName, attributeValue); // 给元素增加指定属性，并设定属性值
  ```

- 删除节点

  ```js
  parentNode.removeChild(existingChild);
  element.removeAttribute("属性名");
  element.removeAttributeNode(attrNode);
  ```

- 修改节点

  ```js
  parentNode.replaceChild(newChild, existingChild);
  element.setAttributeNode(attributeName);
  element.setAttribute(attributeName, attributeValue);
  ```

  ![DOM](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0fc9c1fb1a4b460796c054bb679e9493~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

# 34、BOM 常见操作

- **window**

  - **注意：**

    - BOM 的核心是 window 对象，表示浏览器的实例。
    - var 声明的全局变量和全局函数都会变成 window 对象的属性和方法。
    - let、const 则不会。

  - **window 页面加载事件**
    - load
    - DOMContentLoaded
  - **window 调整窗口**
    - resize
  - **window 定时器**
    - setTimeout()、clearTimeout
    - setInterval()、clearInterval

- **location**

  - 访问 location 属性值
    - location.hash
    - location.href
    - location.host
    - location.hostName
    - location.port
    - location.pathname
    - location.search (url 中，查询字符串，以？开头)
    - location.protocol（页面使用的协议 http/https）
  - 修改 location 对象
    - window.assign('') // 载入一个新的文档
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

# 35. JS 的跨域问题、解决方案

- [参考地址](https://blog.csdn.net/lareinalove/article/details/84107476)

- 什么是跨域
  - 域名不同
  - 端口不同
  - 协议不同
  - 域名与域名对应的 ip 地址
- 解决方法
  1. 跨域资源共享（CORS
  2. JSONP
  3. document.domain（只适用于 Cookie 和 iframe 窗口，LocalStorage 和 IndexDB 无法通过这种方法）
  4. 使用 window.name 来进行跨域
  5. 使用 HTML5 的 window.postMessage 方法
  6. 通过 WebSocket
  7. 图像 ping（单向）
  8. 使用片段识别符来进行跨域

# 36. generator 构造器

[参考大佬的链接](https://www.jianshu.com/p/92639e681e2a)

- **generator 介绍**

  - Generator 的中文名称是生成器，它是 ECMAScript6 中提供的新特性。在过去，封装一段运算逻辑的单元是函数。函数只存在“没有被调用”或者“被调用”的情况，不存在一个函数被执行之后还能暂停的情况，而 Generator 的出现让这种情况成为可能。
  - 通过`function*`来定义的函数称之为“生成器函数”（generator function），它的特点是可以中断函数的执行，每次执行`yield`语句之后，函数即暂停执行，直到调用返回的生成器对象的`next()`函数它才会继续执行。
  - 也就是说 Generator 函数是一个状态机，封装了多个内部状态。执行 Generator 函数返回一个遍历器对象（一个指向内部状态的指针对象），调用遍历器对象的 next 方法，使得指针移向下一个状态。每次调用 next 方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个 yield 表达式（或 return 语句）为止。

- **yield 关键字**

  - 真正让 Generator 具有价值的是`yield`关键字，这个`yield`关键字让 Generator 内部的逻辑能够切割成多个部分。

- **`.next()`调用时，返回一个对象**

  - `yield`除了切割逻辑外，它与`.next()`的行为息息相关。每次`.next()`调用时，返回一个对象，这个对象具备两个属性。

  - 一个属性是布尔型的`done`。它表示这个 Generator 对象的逻辑块是否执行完成。

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
  function* loop(list, max = Infinity) {
    for (let i = 0; i < max; i++) {
      yield list[i % list.length];
    }
  }

  function toggle(...actions) {
    let gen = loop(actions);
    //错误写法：先调用loop(actions).next();
    return function (...args) {
      return gen.next().value.apply(this, args);
    };
  }

  switcher.addEventListener(
    "click",
    toggle(
      (e) => (e.target.className = "off"),
      (e) => (e.target.className = "warn"),
      (e) => (e.target.className = "on")
    )
  );
  ```

# 37. JS 排序算法

[排序算法详解](https://www.cnblogs.com/AlbertP/p/10847627.html)

# 38. 对象的创建模式

- Object 构造函数模式
  ```
  var obj = {};
  obj.name = 'Tom'
  obj.setName = function(name){this.name=name}
  ```
- 对象字面量模式
  ```
  var obj = {
    name : 'Tom',
    setName : function(name){this.name = name}
  }
  ```
- 构造函数模式
  ```
  function Person(name, age) {
    this.name = name;
    this.age = age;
    this.setName = function(name){this.name=name;};
  }
  new Person('tom', 12);
  ```
- 构造函数+原型的组合模式
  ```
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }
  Person.prototype.setName = function(name){this.name=name;};
  new Person('tom', 12);
  ```

# 39. 继承模式

- 原型链继承 : 得到方法
  ```
  function Parent(){}
  Parent.prototype.test = function(){};
  function Child(){}
  Child.prototype = new Parent(); // 子类型的原型指向父类型实例
  Child.prototype.constructor = Child
  var child = new Child(); //有test()
  ```
- 借用构造函数 : 得到属性
  ```
  function Parent(xxx){this.xxx = xxx}
  Parent.prototype.test = function(){};
  function Child(xxx,yyy){
      Parent.call(this, xxx);//借用构造函数   this.Parent(xxx)
  }
  var child = new Child('a', 'b');  //child.xxx为'a', 但child没有test()
  ```
- 组合
  ```
  function Parent(xxx){this.xxx = xxx}
  Parent.prototype.test = function(){};
  function Child(xxx,yyy){
      Parent.call(this, xxx);//借用构造函数   this.Parent(xxx)
  }
  Child.prototype = new Parent(); //得到test()
  var child = new Child(); //child.xxx为'a', 也有test()
  ```
- new 一个对象背后做了些什么?
  - 创建一个空对象
  - 给对象设置**proto**, 值为构造函数对象的 prototype 属性值 this.**proto** = Fn.prototype
  - 执行构造函数体(给对象添加属性/方法)

# 40. 迭代器

忽略 enumerable 为 false 的属性：

1. for...in 循环：只遍历对象自身的和继承的可枚举的属性。
2. Object.keys()：返回对象自身的所有可枚举的属性的键名。
3. JSON.stringify()：只串行化对象自身的可枚举的属性。
4. Object.assign()： 忽略 enumerable 为 false 的属性，只拷贝对象自身的可枚举的属性

# 41. 模块化-IIFE、AMD、UMD、ESM 的区别
> [详细参考地址](https://javascript.ruanyifeng.com/nodejs/module.html)
### IIFE（自执行函数）

- 创建的时候直接执行，返回一个参数对象（也可以只返回其他参数），对象中可以有方法、属性等，然后在外部进行调用，不会污染全局，也不会对外部更改。

```js
// 创建的自执行函数
var testUtils = function () {
  function test(data) {
    console.log(data);
  }
  return {
    test
  };
};
```

### CJS

- 每个文件就是一个模块，有自己的作用域。在一个文件里面的定义的变量、函数、类都是私有的，对其他文件不可见。CommonJS规范加载模块是同步的，由于Node.js主要作用域服务器变成，模块文件一般都已经存在于本地硬盘，所以加载起来都比较快，不用考虑非同步加载的方式，所以CommenJS规范比较实用。

特点：
> - 所有代码都运行在模块作用域，不会污染全局作用域。
> - 模块可以多次加载，但是只会在第一次加载的时候执行，然后会缓存一份，后面再引用返回的都是缓存。
> - 模块加载的顺序都是按照出现的位置来定。
> - 因为被输出的是拷贝值，则如果在外部对模块代码就行修改则不会生效。
> - 一般用于服务端的规范

### AMD（Asynchronous Module Definition）异步模块定义
- 跟CJS并称量大通用模块规范，主要用于客户端，因为客户端在加载的时候主要看中加载速度，如果像是CJS那样同步执行的话，在架子啊一个很大的组件的情况下会耽误时间，所以催生出了AMD恶化吨的一部规范

- AMD规范的引用组件方式
``` require([module], callback) ```
  第一个参数[module]，是一个数组，里面的成员就是要架子的模块；第二个参数callback，加载成功之后的毁掉函数。

  ```js
  // 引入loudash组件并使用
  require(['lodash'], function (lo) {
    lo.isArray([])
  })
  ```

### UMD
- 像是一个工厂，为了同时支持CJS和AMD的规范，判断谁的规范支持就是使用谁的规范，他的最外层是一个IIFE

### ESM
- es6实现了模块化功能，在es6之前，社区制定了一些模块加载方案，最主要的有CommonJS和AMD两种。前者用于服务器，后者用于浏览器。es6在语言标准的层面上，实现了模块功能，可以取代现有的CommonJS和AMD规范，成为浏览器和服务器通用的模块解决方案。
- es6模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS和AMD模块，都是只能在运行时确定这些东西。比如，CommonJS模块就是对象，输入时必须查找对象属性。

主要特点：
> - 完全替代CJS和AMD，淘汰了UMD，明明空间等规范。
> - 静态化，编译时加载，使页面加载速度快。
> - es6模块的运行机制和CommonJS不一样，它遇到模块加载命令import时，不会去执行模块，而是只生成一个动态的只读引用。等到真的需要用到时，再到模块里去取值。
> - import命令具有提升效果，因为是编译时记载，所以会比其他代码都先执行。


# 42. 浏览器的页面渲染过程
## 1. 页面生成过程
1.HTML 被 HTML 解析器解析成 DOM 树；
2.CSS  被 CSS 解析器解析成 CSSOM 树；
3.结合 DOM 树和 CSSOM 树，生成一棵渲染树(Render Tree)，这一过程称为 Attachment；
4.生成布局(flow)，浏览器在屏幕上“画”出渲染树中的所有节点；
5.将布局绘制(paint)在屏幕上，显示出整个页面。
第四步和第五步是最耗时的部分，这两步合起来，就是我们通常所说的渲染

## 2. 渲染：
> 在页面的生命周期中，网页生成的时候，至少会渲染一次。在用户访问的过程中，还会不断触发重排(reflow)和重绘(repaint)，不管页面发生了重绘还是重排，都会影响性能，最可怕的是重排，会使我们付出高额的性能代价，所以我们应尽量避免。

> 渲染的三个阶段 Layout，Paint，Composite Layers。
Layout：重排，又叫回流。
Paint:重绘，重排重绘这些步骤都是在 CPU 中发生的。
Compostite Layers：CPU 把生成的 BitMap（位图）传输到 GPU，渲染到屏幕。
CSS3 就是在 GPU 发生的：Transform  Opacity。在 GPU 发生的属性比较高效。所以 CSS3 性能比较高。

## 3. 渲染性能优化之渲染的5个阶段

- `JS` -> `Style` -> `Layout` -> `Paint` -> `Composite`

- 60fps和设备刷新率
- 像素管道
  - 5个关键阶段（核心知识点）
  - pipeline处理可视改变的3种方式
  JS/CSS > Style > Layout > Paint > Composite
  JS/CSS > Style >Paint > Composite
  JS/CSS > Style > Composite
- 浏览器渲染优化

### 60fps和设备刷新率
现如今绝大多数的设备每秒刷新60次。如果有animation或者transition运行时，或者用户在页面上滚动时，浏览器需要匹配设备的刷新率，并且在每次屏幕刷新时放一张新照片，或者一个frame。

每一帧大概有16ms的预算，因为（1second/60=16.66ms）。事实上，因为浏览器有内务工作要做，所以我们所有的工作都需要在10ms内完成。当你不能满足这个预算时，帧率就会下降，达不到60fps，屏幕上会明显感觉到卡顿。这通常叫做jank，很影响用户的体验。

**jank是什么**
Google也发现独立进程也减少了jank，这是Google团队对浏览器无反应性的称谓。

## 4. 像素管道

5个关键阶段（核心知识点）
你需要知道5个主要区域，并且在工作中要时刻保持对代码运行在那个区域心里有数。
这5个区域是你可以控制的，也是**像素到屏幕的管道**中的关键点：

![img](https://user-images.githubusercontent.com/19262750/76674223-df835b80-65e7-11ea-89f7-fdcaec8b7917.png)

- javascript进行一些可见的修改。 无论是jquery的animate函数，排序一个数据集合，还是向页面增加一个DOM元素。其实用必须使用js去触发这些可视改变，可以通过CSS Animations，Transition和Web Animations API这些通常使用的api。

- 样式计算（Style Calculations）
元素选择器选中元素。
这个阶段主要用于基于匹配的选择器，指明什么元素应用什么CSS规则。 比如.headline或者.nav>.nav__item。从这里开始，一旦规则已知，它们被应用并且每个元素的最终样式规则也会计算出

- 布局（Layout）
计算元素占据空间和位置。
一旦浏览器知道了每个元素该如何应用规则以后，它开始计算每一个元素需要在屏幕上占据多少空间。web的layout 模型意味着一个元素可以影响到其它的元素，例如<body>元素的宽度可以影响到它的子元素的宽度和沿着树上下移动，所以这个过程对于浏览器来说是非常复杂的。

- 绘制（Paint）
填充内容，一像素一像素去填充。
Painting指的是用像素去填充的阶段。它包括画出文本，颜色，图像，边框和阴影，基本上元素上的每个可视部分都在这个阶段完成。绘制一般需要在多个界面进行，一般叫做layer。

- 合成（Compositing）
多个layer按照层级合成在一起。
一旦页面的这些部分被明显的绘制在不同的layer上后，它们需要按照顺序最终渲染到屏幕上，这样页面才能保证正常渲染。对于元素而言，这个阶段非常重要，因为影响到了元素的重叠，因为一个失误可能导致一个元素出现在另一个元素之上。

流水线的每一个步都是一个减少jank的机会，所以你的代码触发了流水线的哪一个部分是必需要理解的。
有时你可能听到过“栅格化”与paint一起出现。这是因为paint一般需要做两项事情：1）创建需要绘制的列表 2）使用像素填充（这一步叫做栅格化）

每当我们在Devtools中看到paint时，应该将其视为栅格化。（在一些架构中创建待渲染的列表和栅格化是在不同的线程中进行的，但这并不是开发者可以控制的。）

如果改变了一个既不需要layout也不需要paint的属性，浏览器会跳过Layout和Paint两个阶段，直接进行Compositing阶段，进行合成。
在一个app生命周期中的高压点来说，最终版本是最便宜的而且最理想的，比如animation或scrolling。

提醒：如果想辨识”layout property“，”paint-only property“和”compositor-only property“，可以查阅一下。

性能是避免工作的艺术，并且可以使得你的工作尽可能的高效。在许多场景下，是与浏览器一起工作的，而不是与它对抗。值得注意的是，在管道中列出的工作在计算成本方面有所不同；有些任务比其他任务更昂贵。

让我们深入了解一下管道的不同部分。我们将研究常见的问题，以及如何诊断和修复它们。

### pipeline处理可视改变的3种方式

不比每一帧都去触发流水线的每一部分。事实上，当你创建了一个可视的变化时，pipeline有3种方式去处理给定的一个frame，可以使用JavaScript，CSS和Web动画

如果你**改变了一个”paint only“属性，比如background image，text color，或者shadows，换句话说就是不影响网页的layout的那些属性，浏览器会跳过layout的过程，**但是它最终还是会paint的



# 43. 重绘和重排
### 1. 对比
重绘：某些元素的外观被改变，例如：元素的填充颜色
重排：重新生成布局，重新排列元素。

就如上面的概念一样，单单改变元素的外观，肯定不会引起网页重新生成布局，但当浏览器完成重排之后，将会重新绘制受到此次重排影响的部分。比如改变元素高度，这个元素乃至周边dom都需要重新绘制。
也就是说：**重绘不一定导致重排，但重排一定会导致重绘。**

## 2. 重排（Reflow）
- 当DOM的变化影响了元素的几何信息(元素的的位置和尺寸大小)，浏览器需要重新计算元素的几何属性，将其安放在界面中的正确位置，这个过程叫做重排。
重排也叫回流，简单的说就是重新生成布局，重新排列元素。
> 下面情况会发生重排：
>
> - 页面初始渲染，这是开销最大的一次重排
> - 添加/删除可见的DOM元素
> - 改变元素位置
> - 改变元素尺寸，比如边距、填充、边框、宽度和高度等
> - 改变元素内容，比如文字数量，图片大小等
> - 改变元素字体大小
> - 改变浏览器窗口尺寸，比如resize事件发生时
> - 激活CSS伪类（例如：:hover）
> - 设置 style 属性的值，因为通过设置style属性改变结点样式的话，每一次设置都会触发一次reflow
> - 查询某些属性或调用某些计算方法：offsetWidth、offsetHeight等，除此之外，当我们调用 getComputedStyle方法，或者IE里的 currentStyle 时，也会触发重排，原理是一样的，都为求一个“即时性”和“准确性”。

### 2-1. 常见的引起重排的属性和方法：
|属性和方法|--|--|--|--|
|--|--|--|--|--|
|width|height|margin|padding|display|
|border-width|border|position|overflow|font-size|
|vertical-align|min-height|clientWidth|clientHeight|clientTop|
|clientLeft|offsetWidth|offsetHeight|offsetTop|offsetLeft|
|scrollWidth|scrollHeight|scrollTop|scrollLeft|--|
|scrollIntoView()|scrollTo()|getComputedStyle()|getBoundingClientRect()|scrollIntoViewIfNeeded()|

### 2-2. 重排的影响范围
由于浏览器渲染界面是基于流式布局模型的，所以触发重排时会对周围DOM重新排列，影响的范围有两种：

全局范围：从根节点html开始对整个渲染树进行重新布局。
局部范围：对渲染树的某部分或某一个渲染对象进行重新布局

### 2-3. 全局范围重排：

- 当p节点上发生reflow时，hello和body也会重新渲染，甚至h5和ol都会收到影响

```html
<body>
  <div class="hello">
    <h4>hello</h4>
    <p><strong>Name:</strong>BDing</p>
    <h5>male</h5>
    <ol>
      <li>coding</li>
      <li>loving</li>
    </ol>
  </div>
</body>
```

### 2-4. 局部范围重排

- 用局部布局来解释这种现象：把一个dom的宽高之类的几何信息定死，然后在dom内部触发重排，就只会重新渲染该dom内部的元素，而不会影响到外界。

## 3. 重绘（Repaints）


### 3-1. 概念：
- 当一个元素的外观发生改变，但没有改变布局,重新把元素外观绘制出来的过程，叫做重绘。

### 3-2. 常见的引起重绘的属性：
|属性：|--|--|--|--|
|--|--|--|--|--|
|color|border-style|visibility|background|text-decoration|
|background-image|background-position|background-repeat|outline-color|outline|
|outline-style|border-radius|outline-width|box-shadow|background-size|


## 4. 重排优化
### 4-1. 重排优化建议
- 重排的代价是高昂的，会破坏用户体验，并且让UI展示非常迟缓。通过减少重排的负面影响来提高用户体验的最简单方式就是尽可能的减少重排次数，重排范围。下面是一些行之有效的建议，大家可以用来参考。

### 4-2. 减少重排范围

- 我们应该尽量以局部布局的形式组织html结构，尽可能小的影响重排的范围。


- 尽可能在低层级的DOM节点上，而不是像上述全局范围的示例代码一样，如果你要改变p的样式，class就不要加在div上，通过父元素去影响子元素不好。


- 不要使用 table 布局，可能很小的一个小改动会造成整个 table 的重新布局。那么在不得已使用table的场合，可以设置table-layout:auto;或者是table-layout:fixed这样可以让table一行一行的渲染，这种做法也是为了限制reflow的影响范围。

### 4-3. 减少重排次数

#### 1. 样式集中改变
不要频繁的操作样式，对于一个静态页面来说，明智且可维护的做法是更改类名而不是修改样式，对于动态改变的样式来说，相较每次微小修改都直接触及元素，更好的办法是统一在 cssText 变量中编辑。虽然现在大部分现代浏览器都会有 Flush 队列进行渲染队列优化，但是有些老版本的浏览器比如IE6的效率依然低下。

```js
// bad
var left = 10;
var top = 10;
el.style.left = left + "px";
el.style.top = top + "px";

// 当top和left的值是动态计算而成时...
// better 
el.style.cssText += "; left: " + left + "px; top: " + top + "px;";

// better
el.className += " className";
```

#### 2. 分离读写操作
DOM 的多个读操作（或多个写操作），应该放在一起。不要两个读操作之间，加入一个写操作。

```js
// bad 强制刷新 触发四次重排+重绘
div.style.left = div.offsetLeft + 1 + 'px';
div.style.top = div.offsetTop + 1 + 'px';
div.style.right = div.offsetRight + 1 + 'px';
div.style.bottom = div.offsetBottom + 1 + 'px';


// good 缓存布局信息 相当于读写分离 触发一次重排+重绘
var curLeft = div.offsetLeft;
var curTop = div.offsetTop;
var curRight = div.offsetRight;
var curBottom = div.offsetBottom;

div.style.left = curLeft + 1 + 'px';
div.style.top = curTop + 1 + 'px';
div.style.right = curRight + 1 + 'px';
div.style.bottom = curBottom + 1 + 'px';
```

原来的操作会导致四次重排，读写分离之后实际上只触发了一次重排，这都得益于浏览器的渲染队列机制:
> 当我们修改了元素的几何属性，导致浏览器触发重排或重绘时。它会把该操作放进渲染队列，等到队列中的操作到了一定的数量或者到了一定的时间间隔时，浏览器就会批量执行这些操作。

#### 3. 将 DOM 离线

“离线”意味着不在当前的 DOM 树中做修改，我们可以这样做：


- 使用 `display:none`
一旦我们给元素设置 `display:none` 时（只有一次重排重绘），元素便不会再存在在渲染树中，相当于将其从页面上“拿掉”，我们之后的操作将不会触发重排和重绘，添加足够多的变更后，通过 display属性显示（另一次重排重绘）。通过这种方式即使大量变更也只触发两次重排。另外，`visibility : hidden` 的元素只对重绘有影响，不影响重排。


- 通过 `documentFragment` 创建一个 `dom` 碎片,在它上面批量操作 `dom`，操作完成之后，再添加到文档中，这样只会触发一次重排。


- 复制节点，在副本上工作，然后替换它


#### 4. 使用 absolute 或 fixed 脱离文档流

使用绝对定位会使的该元素单独成为渲染树中 `body` 的一个子元素，重排开销比较小，不会对其它节点造成太多影响。当你在这些节点上放置这个元素时，一些其它在这个区域内的节点可能需要重绘，但是不需要重排。


#### 5. 优化动画

- 可以把动画效果应用到 position属性为 absolute 或 fixed 的元素上，这样对其他元素影响较小。
动画效果还应牺牲一些平滑，来换取速度，这中间的度自己衡量：
比如实现一个动画，以1个像素为单位移动这样最平滑，但是Layout就会过于频繁，大量消耗CPU资源，如果以3个像素为单位移动则会好很多


- 启用GPU加速
GPU 硬件加速是指应用 GPU 的图形性能对浏览器中的一些图形操作交给 GPU 来完成，因为 GPU 是专门为处理图形而设计，所以它在速度和能耗上更有效率。
GPU 加速通常包括以下几个部分：Canvas2D，布局合成, CSS3转换（transitions），CSS3 3D变换（transforms），WebGL和视频(video)。


```js
 /*
  * 根据上面的结论
  * 将 2d transform 换成 3d
  * 就可以强制开启 GPU 加速
  * 提高动画性能
  */
  div {
    transform: translate3d(10px, 10px, 0);
  }
```


# 44. 待