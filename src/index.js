import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css"

// 引入semantic-ui-css  全局引入
import 'semantic-ui-css/semantic.min.css'
import App from './App.jsx';
import axios from "axios"
// 将axios对象绑定到react组件原型上，这样react的组件就可以使用了
React.Component.prototype.axios = axios

// 给axios配置默认的基础路径
axios.defaults.baseURL = "http://47.96.21.88:8086/"

// 给axios配置-响应拦截器，直接返回res.data数据
axios.interceptors.response.use(function(response){
    return response.data
},function(error){
    return error
})

ReactDOM.render(<App />, document.getElementById('root'));


 

// git init\ 初始化git仓库
// git status
// git add .
// git commit -m "初始化提交"

// gitee.com 马云
// https://github.com/feng-vip/react-my-home

// semantic-ui-react

