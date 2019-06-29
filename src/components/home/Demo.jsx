import React from "react"
import Tloader from "react-touch-loader"
import "./style.less"
class Demo extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            hasMore:false,
            initializing:1,
            total:0 // 总条数
        }
    }
    refresh=(resolve,reject)=>{
        setTimeout(() => {
            // 获取第一页的数据
            this.setState({
                total:10,
                hasMore:true
            })
            resolve();
          }, 1e3);
    }
    loadMore=(resolve,reject)=>{
        setTimeout(() => {
            // 相当页数加+1
            let newTotal = this.state.total + 10
            this.setState({
                total:newTotal,
                hasMore:newTotal > 0 && newTotal < 50

            })
            resolve();
          }, 1e3);
    }
    // 钩子啊函数
    componentDidMount(){
        // 从后台获取的数据
        setTimeout(()=>{
            this.setState({
                total:10,
                hasMore:true,  //显示加载更多
                initializing:2 //进度条不显示
            })
        },1000)
    }
    render(){
        let {hasMore,initializing,total} = this.state
        let data = []
        for(var i=0;i<total;i++){
            data.push(<li key={i}><p>{i}</p></li>)
        }
        return (
            <div className="view">
                <Tloader
                    className="main"
                    onRefresh={this.refresh}
                    onLoadMore={this.loadMore}
                    hasMore={hasMore}
                    initializing={initializing}
                    >
                    <ul>
                        {data}
                    </ul>
                </Tloader>
            </div>
        )
    }
}
export default Demo