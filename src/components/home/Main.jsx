import React from "react"
// 引入轮播图样式 image-gallery.css
import "react-image-gallery/styles/css/image-gallery.css";
import "./Main.css"
import {Input} from "semantic-ui-react"
// 导包image-gallery
import ImageGallery from 'react-image-gallery';
class Main extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            imgList:[]
        }
    }

    // 等页面加载完成后,钩子函数 初始化加载轮播图
    async componentDidMount(){
        let res = await this.axios.post("homes/swipe")
        let {meta,data} = res
        if(meta.status === 200){
            this.setState({
                imgList:data.list
            })
        }else{
            console.log(meta.msg)
        }

    }
    render(){
        return (
            <div className="main">
                <div className="search">
                <Input fluid icon={{ name: 'search', circular: true, link: true }} placeholder='搜房源...' />
                </div>
                <div className="content">
                    <div>
                        <ImageGallery items={this.state.imgList} 
                        showThumbnails={false} 
                        showFullscreenButton={false}
                        showPlayButton={false}
                        showBullets={true}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main