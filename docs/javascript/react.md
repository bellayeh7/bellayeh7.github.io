#
# 1. redux 和 redux-toolkit

## 1-1. 基本概念

### redux的组成部分

> - `store`：全局唯一的数据源   
> - `action`：改变 store 的唯一方法是触发 action
> - `reducer`：描述 action 是如何改变 store 的
> - 使用 store 的组件

### 三大原则

> - store 是唯一的
> - 只有 store 能改变自己的内容
> - reducer 必须是纯函数

## 1-2. store

### 创建

创建 store ，要是用`createStore`方法，并用 reducer 作为参数：
```js
// 引入 createStore 方法
import {createStore} from 'redux';
// 引入 reducer
import reducer from './reducer';
// 创建 store 并导出
const store = createStore(reducer);
export default store;
```

### 使用中间件

中间件是位于 action 和 store 之间的，是对于 dispatch 方法的包装。

如果使用中间件，则需要使用 applyMiddleware 包装，并作为 createStore 的第二个参数传入：

```js
import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'
const store = createStore(reducer, applyMiddleware([thunk/* ,others */]))
export default store;
```

### redux-thunk

因为 reducer 必须是纯函数，所以不能进行异步请求。此时需要在创建 action 前，如生命周期函数、回调函数中进行请求，再将请求结果作为 action 字段传入

使用 redux-thunk 后，此时传入 dispatch 的 action 不再只能是对象，还可以是函数。

```js
const action = (dispatch, getSate) => {
    // 异步请求
    // 使用请求结果触发世纪 改变 state 的 action
    dispatch({})
}
```

- `dispatch`：redux 的 dispatch 方法， 用于提交其他 action
- `getState`： redux 的 getState 方法，用于获取 state 数据

### redux-saga

> 用于管理代码副作用（如异步请求等）的库。

作用：使用 redux-saga 后，dispatch 派发的 action 不仅在 reducer 中接收到， saga函数 中也会对相应的时间做出相应。
1. 首先创建并导出sagas函数，是一个 generator 函数
2. 使用 takeEvery 函数对不同的 action 做出相应，它接收两个参数 action.type 和处理函数。
3. 处理函数 也可以是 generator 函数。在其中进行异步处理的请求， 并利用数据创建市级改变 state 的 action 。
4. 使用 yield put 触发 action 
    ```js
    import {takeEvery, put} from 'redux-saga/effects'

    function* myFunc() {
        const res = yield someRequest();
        const action = {
            type: 'another_type',
            res,
        }
        yield put(action);
    }

    function* mySaga() {
        yield takeEvery("my_type", myFunc)
    }
    export default mySaga;
    ```

5. 使用 createSagaMiddleware 创建saga中间件

```js
import createSagaMiddleware from "redux-saga"
const sagaMiddleware = createSagaMiddleware()
```

6. 引入saga函数，并调用 saga 中间件的run方法执行
```js
import todoSagas from './sagas'
sagaMiddleware.run(todoSagas)

```

7. 使用 `applyMiddleware`添加
```js
import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'
const store = createStore(reducer, applyMiddleware())
export default store
```

### redux-devtools（调试工具）
```js
import {composeWithDevTools} from 'redux-devtools-extension';
const middlewares = []
const composeEnhancers = compoeseWithDevtools(applyMiddleware(...middlewares))
const store = createStore(reducer, {}, composeEnhancers);
```

### 在组件中引入 store：

> 要获取 store 中的数据，使用getState方法。
> 要订阅 store 中数据的更新，使用subscribe方法。

```js
import React, { Component } from "react";
import store from "./store";

class Foo extends Component {
  constructor(props) {
    super(props);
    // 获取store中的数据
    this.state = store.getState();
    // 订阅更新
    store.subscribe(this.handleUpdate);
  }
  // 每次更新时触发回调
  handleUpdate = () => {
    this.setState(store.getState());
  };
}
```

## 1-3. reducer

- 接收当前的 state 和一个 action 对象，必要时决定如何更新状态，并返回新状态

- "Reducer" 函数的名字来源是因为它和 Array.reduce() 函数使用的回调函数很类似。

- reducer 是一个纯函数，接收 state 和 action 作为参数，并返回新的 state。

> 不能进行 ajax 请求，路由跳转
> 不能直接修改 state
> 必须返回 state

- reducer 中可以通过默认参数的形式定义 store 中数据的默认值

```js
// store中数据的默认值
const defaultState = {
    value: 'default'
}
const reducer = (state = defaultState, action) = >{
    const newState = JSON.parse(JSON.stringify(state))
    // ... 根据action对newState做修改，并返回
    return newState;
}
export default reducer

```

### reducer 拆分

当 reducer 的内容较多时，可以将其拆分到不同的文件之中，再在根文件中依次引入，并使用combineReducer进行聚合
```js
import { combineReducer } from "redux";
import fooReducer from "./foo.js";
import barReducer from "./bar.js";

export default combineReducer({
  foo: fooReducer,
  bar: barReducer,
});
```
最终 store 中的数据，也会多加一个层级，即：
```state.xx --> state.foo.xx```

### immutable
- 目的：将数据变为不可改变的，防止意外的在 reducer 中修改 state

- 使用fromJS方法将 JS 数据变为 immutable（不可改变的）对象，此后数据不能进行直接读取或修改，必须通过get和set方法

- fromJS方法进行转换后，对象的引用类型变量也会变为immutable对象。此时要用set方法做修改时，用于修改的引用型变量也要先转为immutable对象

- set 方法不会修改原始的数据，而是结合修改返回一个新的对象

```js
import { fromJS } from "immutable";
const defaultState = fromJS({
  inputValue: "default",
  list: [],
});
function reducer(state = defaultState, action) {
  const vlaue = state.get("inputValue");
  return state.set("list", fromJS([1, 2, 3]));
}
```

- 改变多个内容，使用merge方法
```js
state.merge({
  inputValue: "newValue",
  list: fromJS([1, 2, 3]),
});
```

- toJS方法：将immutable对象转换为普通 JS 对象

### React-immutable

- 将根 state 也变为 immutable 对象
```js
import { combineReducers } from "redux-immutable";
const reducer = combineReducers({
  // ...
});
```

## 1-4. action

- 用来描述 store 变化，通过dispatch方法触发。action 内必须用一个type字段描述变化的类型，除此之外的结构完全自定义。

```js
store.dispatch({
  type: "foo",
  value: "bar",
});
```

## 1-5. react-redux
### 使用connnect

- 在全局跟组件 App 外，使用react-redux提供的Provider组件进行包裹。
- 引入 store，并作为 prop 传入Provider

```js
import { Provider } from 'react-redux';
import store from './store'
const App = (
	<Provider store={store}>
    	<Com>
    </Provider>
)
```

- 在使用到 store 的组件中，引入connect方法，将 store 关联到组件的 props 并导出

```js
import React, { Component } from "react";
import { connect } from "react-redux";

class TodoList extends Component {
  render() {
    return (
      <input value={this.props.value} onChange={this.props.handleChange} />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    value: state.inputValue,
  };
};
const mapDispatchToProps = (dispatch) => ({
  handleChange(e) {
    console.log(e.target.value);
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
```
- connect方法接收两个参数，分别将 state 和 dispatch 关联到组件的 props。
- 在这之后，组件内使用state的值，以及触发action，就都可以从props中取值。

### 使用 Hooks

- 可以替代connect API

- 使用时，仍然是首先使用 Provider 组件进行包裹，并传入 store

### 1. 使用 Hooks - useSelector()

- 用于从 store 获取数据，等价于 connect 方法的第一个参数

```js
const result = useSelector(
    selector: Function,
    equalityFn?:Function
)
const selector = state => {
    // return ...
}
```
### 1-1. 和 connect 的 mapState 参数的异同
**相同点：**第一个参数都应该是纯函数
**不同**：

selector可以返回任何值，不只是Object。其返回值会作为useSelector的返回值
当派发了 action 后，会比较 selector 前后的返回值。如果不同，则强制组件重新渲染，否则组件不会重新渲染。
selector不接收 ownProps 作为第二个参数。
缺省 equalityFn 函数时使用===进行比较，connect 中使用浅比较。
在一个组件内可以多次调用useSelector。（action 被触发时只会进行一次重渲染）

当 selector 返回对象时，每次都触发重渲染。解决方法：

多次调用 useSelector，每次返回基本类型的值
使用 equalityFn 进行比较（react-redux 提供了shallowEqual进行浅比较）
创建 immutable 类型的对象

### 2. 使用 Hooks - useDispatch()

- 返回 Redux 的 dispatch 函数的引用，可以用来派发 action

```js
const dispatch = useDispatch();
dispatch({
  type: "action_type",
});
```

只要传给<Provider/>组件的store不发生变化，useDispatch返回的 dispatch 引用就不会发生变化。

### 3. 使用 Hooks - useStore()

返回 store 实例
```js
const store = useStore();
funcs.reduce((a, b) => (...args) => a(b(...args)));
```


## 1-6. redux toolkit

> 作用：更便捷的创建 Store、reducer、action creator。
> 组件中仍使用 useSelector 和 useDispatch；引入 store 仍使用 <Provider/>
### 1 创建 Store
使用 configureStore 函数 ，传入对象或是函数，与 react-redux 类似。
```js
import { configureStore } from "@reduxjs/toolkit";
import fooReducer from "./fooSlice";
const store = configureStore({
  reducer: {
    foo: fooReducer,
  },
});
```
- RTK默认添加了redux-thunk，如果要添加其他中间件的话，则加入 middleware 字段，取值为一个数组

```js
const store = configureStore({
  reducer: {},
  middleware: [A,B],
});
```
如果要定制化插件的话，取值也可以为函数：
```js
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: myCustomApiService,
      },
      serializableCheck: false,
    }),
})
```

### 2 切片（Slice）

- slice 是单个功能的 reducer 和 action 的集合

- 创建
使用 createSlice 函数创建 slice，需要传入三个字段：

> - name：切片名称
> - initialState：初识 state 值
> - reducers：由多个处理函数组成的对象

```js
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});
```
```js
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```
### 引入
- 导出 slice 的 reducer，在创建 store 时引入。
- 和 combineReducers 的区别
- 在 slice 的 reducer 中，可以直接修改state。

> 因为此处使用了 immer 这个库，修改并非作用在原始对象上，而是创建的副本上

### 3 Action
- 创建 slice 的同时，会自动创建slice.action字段，其中包含和 reducer 中同名的 action creator 。
```js 
counterSlice.actions.incrementByAmount(2);
```

### 4 使用 Thunk 编写异步逻辑
使用 thunk 需要在创建 store 时将 redux-thunk 添加到中间件中，不过 configureStore 已经默认添加该中间件。
创建一个 thunk 函数：
```js
export const incrementAsync = (amount) => (dispatch, getState) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};
store.dispatch(incrementAsync(5));
```
### createAsyncThunk
对于异步请求的操作，往往设计多个状态的改变（开始、成功、失败），使用 createAsyncThunk 可以自动创建 thunk 函数，会在相关节点自动触发相应的 action 。
创建时接受两个参数：

> - action 字符串的前缀
> - 进行异步逻辑的函数，返回一个带有数据或错误的 Promise

```js
import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await client.get("/fakeApi/posts");
  return response.data;
});
```
过程中会触发的 action：

> pending：请求开始
> fulfilled：请求成功
> rejected：请求失败

### extraReducers
对于在 slice 的 reducer 中不存在的 action，要在 slice 的 extraReducers 字段进行添加。
使用 createAsyncThunk 创建的 thunk 函数之后，要将其三种状态添加到 extraReducers 函数中。

三种状态并不是 “一定” 都要有
```js
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // omit existing reducers here
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

```