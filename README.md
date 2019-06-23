# 项目介绍
 react + react-router + redux技术来实现好租客App

 # 下载项目后，安装配置node_modules
    npm install

 # 全局安装serve,进入启动的文件中
    npm i -g serve
    serve -p 8080
    localhost:8080

 # window 修改端口号 
    set PORT=8888 && 
    mac | linux PORT=8888 &&

 # 安装 cross-env 跨平台  
    npm i cross-env -D
    cross-env PORT=8888

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

# 打开interface-document 进入myapi中
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

# 添加请求拦截器
    axios.interceptors.request.use(function (config) {
        if(!window.location.href.endsWith("/login")){
            config.headers.Authorization = localStorage.getItem("myToken")
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

# react轮播图专用库 React-Image-Gallery
    npm i react-image-gallery
    1.引入轮播图样式 image-gallery.css
        import "react-image-gallery/styles/css/image-gallery.css";
    2.导包
        import ImageGallery from 'react-image-gallery';
