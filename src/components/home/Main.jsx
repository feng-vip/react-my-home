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
            imgList:[
                  {
                    original: 'http://47.96.21.88:8086/public/1.png'
                  },
                  {
                    original: 'http://47.96.21.88:8086/public/2.png'
                  },
                  {
                    original: 'http://47.96.21.88:8086/public/3.png'
                  }
            ]
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