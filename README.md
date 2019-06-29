# 项目介绍
 react + react-router + redux技术来实现好租客App

 # 下载项目后，安装配置node_modules
    npm install

 # 全局安装serve,进入启动的文件中
    npm i -g serve
    serve -p 8080
    localhost:8080

 # 本地启动端口，下载phpstudy,sqlyog数据库
    1.用户名:root,本地密码：123456，然后登录phpAdmin，
    2.线上密码：root
    *****
    3.在myapi,config中的config-dev.js，修改数据库连接密码

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

# 滚动条样式 
    .content{
        overflow-y:auto
    }
    .content::-webkit-scrollbar{
        width: 3px;
    }
    .content::-webkit-scrollbar-thumb{
        background-color: #CBDAEA;
        -webkit-border-radius: 2em;
        -moz-border-radius: 2em;
        border-radius: 2em;
        min-height: 2rem;
        background-clip: padding-box;
        border-radius: 5px;
    }
    .content::-webkit-scrollbar-track {
        background-color: #fff;
    }

# react数组遍历  
    1.map(item=>()) 
    2.forEach(item=>{}) 记得小驼峰

# promise.all()请求封装实现loading加载效果
    // 主页加载效果
    <Dimmer inverted active={this.state.loading} page>
        <Loader>Loading</Loader>
    </Dimmer>
    // 请求的封装
    doRequest = (url,dataName)=>{
        return this.axios.post(url).then(res=>{
            let {meta,data} = res
            if(meta.status === 200){
                this.setState({
                    [dataName]:data.list
                })
            }
        })
    }
    // 等页面加载完成后,钩子函数 初始化加载轮播图
    async componentDidMount(){
        // Promise.all()封装，实现数据加载效果
        await Promise.all([
            this.doRequest("homes/swipe",'imgList'),
            this.doRequest("homes/menu",'menuList'),
            this.doRequest("homes/info",'infoList'),
            this.doRequest("homes/faq",'faqList'),
            this.doRequest("homes/house",'houseList'),
        ])
        this.setState({
            loading:false
        })
    }

# react上拉刷新，下拉加载库 react-touch-loader
    npm i react-touch-loader

# react开启less支持 ，找node_modules配置文件 react-scripts
    npm install less less-loader -D
    注意：react所有的webpack配置文件都被 react-scripts 隐藏了

    1.找到webpacg.config.js，修改sass->改为less即可
    const sassRegex = /\.(scss|sass)$/;
    const sassModuleRegex = /\.module\.(scss|sass)$/;
    2.还有后面的sassstyle...文件都要改

# 头像裁切插件 react-avatar-editor

    