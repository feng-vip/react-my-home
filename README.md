# 项目介绍
 react + react-router + redux技术来实现好租客App

 # window 修改端口 set PORT=8888 && 
    mac | linux PORT=8888 &&
 # 安装 cross-env 跨平台  
    npm i cross-env -D
 # cross-env PORT=8888

 # 安装 路由
    npm i react-router-dom

 # 安装 ui 组件库
    npm i semantic-ui-react

 # 安装 semantic-ui-css 样式文件
    npm i semantic-ui-css

 # 引入样式 在index.js入口，全局引入
    import "semantic-ui-css/semantic.min.css"

# 安装axios
    npm i axios

# 打开接口文档 进入myapi中
    npm start

# axios的优化 async await
    1.await必须在async函数中使用，await可以在primise对象前使用
    2.await会暂停async函数的执行，等待primise的结果，才会继续执行async。

# 将axios对象绑定到react组件原型上，这样react的组件就可以使用了
    React.Component.prototype.axios = axios

 # 给axios配置默认的基础路径
    axios.defaults.baseURL = "http://47.96.21.88:8086/"

 # 给axios配置-响应拦截器，直接返回res.data数据
    axios.interceptors.response.use(function(response){
        return response.data
    },function(error){
        return error
    })
