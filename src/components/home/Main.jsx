import React from "react"
// 引入轮播图样式 image-gallery.css
import "react-image-gallery/styles/css/image-gallery.css";
import "./Main.css"
import {Input,Grid,Icon,Item,Button} from "semantic-ui-react"
// 导包image-gallery
import ImageGallery from 'react-image-gallery';
class Main extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            imgList:[],
            menuList:[],
            infoList:[],
            faqList:[]
        }
    }
    // 获取轮播图数据
    getImgList = async ()=>{
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
    // 获取菜单数据
    getMenuList = async ()=>{
        let res = await this.axios.post("homes/menu")
        let {meta,data} = res
        if(meta.status === 200){
            this.setState({
                menuList:data.list
            })
        }else{
            console.log(meta.msg)
        }
    }
    // 获取资讯数据
    getInfoList = async ()=>{
        let res = await this.axios.post("homes/info")
        let {meta,data} = res
        if(meta.status === 200){
            this.setState({
                infoList:data.list
            })
        }else{
            console.log(meta.msg)
        }
    }
    // 获取问答数据
    getFaqList = async ()=>{
        let res = await this.axios.post("homes/faq")
        let {meta,data} = res
        console.log(res)
        if(meta.status === 200){
            this.setState({
                faqList:data.list
            })
        }else{
            console.log(meta.msg)
        }
    }

    // 等页面加载完成后,钩子函数 初始化加载轮播图
    componentDidMount(){
        this.getImgList()  
        this.getMenuList()
        this.getInfoList()
        this.getFaqList()
    }
    render(){
        return (
            <div className="main">
                <div className="search">
                <Input fluid icon={{ name: 'search', circular: true, link: true }} placeholder='搜房源...' />
                </div>
                <div className="content">
                   {/* 轮播图*/}
                    <div>
                        <ImageGallery items={this.state.imgList} 
                        showThumbnails={false} 
                        showFullscreenButton={false}
                        showPlayButton={false}
                        showBullets={true}/>
                    </div>
                    {/* 菜单栏 */}
                    <Menu data={this.state.menuList}/>
                    {/* 好客资讯 */}
                    <Info data={this.state.infoList}/>
                    {/* 好客问答*/}
                    <Faq data={this.state.faqList}/>

                    <div className="allH"></div>
                </div>
            </div>
        )
    }
}
export default Main



// 菜单的优化，封装为函数组件
// props 参数结构 {data}
function Menu({data}){
    return (
        <Grid padded divided className="menu">
            <Grid.Row  columns={4}>
                {data.map(item =>(
                    <Grid.Column key={item.id}>
                        <div className='home-menu-item'>
                            <Icon name='home' size='big' />
                        </div>
                        <div>{item.menu_name}</div>
                    </Grid.Column>
                ))}
            </Grid.Row>
        </Grid>
    )
}
// 好客资讯组件
function Info({data}){
    return (
        <div className='home-msg'>
          <Item.Group unstackable>
            <Item className='home-msg-img' >
              <Item.Image size='tiny' src={'http://localhost:9999/public/zixun.png'} />
              <Item.Content verticalAlign='top'>
                {
                    data.map(item =>(
                        <Item.Header key={item.id}>
                            <span>限购 ●</span>
                            <span>{item.info_title}</span>
                        </Item.Header>
                    ))
                }
                <div className="home-msg-more">
                  <Icon name='angle right' size='big' />
                </div>
              </Item.Content>
            </Item>
          </Item.Group>
        </div>
    )
}
// 好客问答组件
function Faq({data}){
    return (
        <div className='home-ask'>
          <div className='home-ask-title'>好客问答</div>
          <ul>
            {
                data.map(item=>(
                    <li key={item.question_id}>
                        <div>
                            <Icon name='question circle outline' />
                            <span>{item.question_name}</span>
                        </div>
                        <div>
                            {
                            item.question_tag.split(',').map((tag,index)=>{
                                return <Button key={index} basic color='green' size='mini'>{tag}</Button>
                                })
                            }
                            <div>
                                {item.atime} ● <Icon name='comment alternate outline' /> {item.qnum}
                            </div>
                        </div>
                    </li>
                ))
            }
          </ul>
        </div>
    )
}
