学了一段时间``React``和``Redux``基础后，终于手痒痒要自己来码demo了！

从头顺一遍，理清思路！GO！

### 页面浏览
![刚初始化的页面](https://upload-images.jianshu.io/upload_images/7016617-5b5e833c5e244d8f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![点击了6次Click Me按钮，4次Say Hello按钮](https://upload-images.jianshu.io/upload_images/7016617-bfd80218650e4138.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



### 一、安装
1.在安装好`` node.js ``以及 ``npm ``后，在全局安装好``create-react-app``后，就可以用这个命令在当前目录创建指定名字的react项目：
```
create-react-app react-demo
cd react-demo
yarn start  // 或者是 npm run start
```
2.安装其他依赖（推荐用淘宝镜像）
```
cnpm i react-redux --s
cnpm i redux --s
```

### 二、新建目录
![这是我的目录结构，都放在src下](https://upload-images.jianshu.io/upload_images/7016617-0a14db02b2e3cba6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

+ ``components``  // 用来放所有的组件
+ ``redux``  // 用来放所有的``redux``文件，再细分两个目录
  - ``actions``  // 用来放``redux``的所有``actions``
  - ``reducers``  //  用来放``redux``的所有``reducers``  ，通过``index.js``来结合所有的``reducers  ``
+ ``static``  // 用来放所有的静态资源（图片、样式等）
+ ``utils``  // 用来放一些工具（暂时没用到，把``creat-react-app``中产生的别的js放进去了）
+ ``views``  // 用来放所有页面
+ ``index.js``  // 这个不用说了吧，大佬

### 三、编写组件
在 src/components/ 下新建一个 Couter.js ：


![目录结构](https://upload-images.jianshu.io/upload_images/7016617-40a9f6ff16edff00.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

想实现的功能：


两个按钮，一个在点击的时候会自身加1，一个在点击的时候加 'hello!'。所以有：


两个事件：``onIncreaseClick``、`` onSayHello`` 。


两个参数： ``count``、 ``hello``。

```javascript
import React from 'react'
import { Component } from 'react'

class Counter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: props.count || 0,
            hello: props.hello || ''
        }
    }

    render() {
        const { count, hello, onIncreaseClick, onSayHello } = this.props
        // console.log(this.props)
        return (
            <div className="my-button">
                <button onClick={onIncreaseClick}>Click Me</button>
                <button onClick={onSayHello}>Say Hello</button>
                <div>
                    <div>Click Count: {count}</div>
                    <div>Say: {hello}</div>
                </div>
            </div>
        )
    }

    propTypes: {
        count: propTypes.number.isRequired,
        hello: propTypes.string.isRequired,
        onIncreaseClick: PropTypes.func.isRequired,
        onSayHello: PropTypes.func.isRequired
    }
}

export default Counter
```
### 四、编写redux
##### 1.写actions
+ 因为有两个事件，所以有两个action。
+ 在src/redux/actions/下新增两个js文件：
![目录](https://upload-images.jianshu.io/upload_images/7016617-52759d6cf093005a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
// increase.js
const increaseAction = {
    type: 'increase'
}

export default increaseAction

// hello.js
const sayHelloAction = {
    type: 'sayHello'
}

export default sayHelloAction
```
##### 2.写reducers
在 src/redux/reducers 目录下创建一个组件``Counter``的``redux``的``reducer``--``counter.js``，一个汇总所有``reducers``的``index.js``
![image.png](https://upload-images.jianshu.io/upload_images/7016617-673156cf241cda02.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
// counter.js
export default function counterReducer(state = initialState, action) {
    // console.log(state, 'counter')

    switch (action.type) {
        case 'increase': return Object.assign({}, state, {
            count: state.count + 1
        });
        case 'sayHello':  return Object.assign({}, state, {
            hello: state.hello + 'hello! '
        });
        default: return state;
    }
}

const initialState = {
    count: 0,
    hello: 'I say '
}
```

```
// index.js
import { combineReducers } from 'redux'
import counter from './counter'

const reducers = combineReducers({
    counter
})

export default reducers
```

### 五、编写页面
简简单单就一个页面，在 src/views/ 下新建一个App.js：
![目录](https://upload-images.jianshu.io/upload_images/7016617-68841035758ed4df.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
import React from 'react';
import { connect } from 'react-redux'
import Counter from '../components/Counter'
import increaseAction from "../redux/actions/increase";
import sayHelloAction from "../redux/actions/hello";

// Map Redux State to component props
const mapStateToProps = state => {
    // console.log(state, 123)
    return {
        count: state.counter.count,
        hello: state.counter.hello
    }
}
// Map Redux actions to component props
const mapDispatchToProps = dispatch => {
    return {
        onIncreaseClick: () => {
            dispatch(increaseAction)
        },
        onSayHello: () => {
            dispatch(sayHelloAction)
        }
    }
}
// Connect component
const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter)

export default App;
```

### 六、渲染出来
修改 src/index.js：
```
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './views/App'
import reducers from './redux/reducers'
import './static/index.css';
// import registerServiceWorker from './utils/registerServiceWorker';

// store
const store = createStore(reducers)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root'));
// registerServiceWorker();
```

### 完整项目代码：
https://github.com/LiaPig/react-redux-demo.git



