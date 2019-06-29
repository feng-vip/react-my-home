import React from "react"
import "./ChatWindow.css"
import {Form,Icon,TextArea,Button} from 'semantic-ui-react'
class ChatWindow extends React.Component{
    constructor(props){
        super(props)
        this.state={
            list:[]
        }
    }
    // 初始化获取；聊天列表是数据
    async componentDidMount(){
        let {from_user,to_user} = this.props.chatItem
        let res = await this.axios.post('chats/info',{
            from_user: from_user,
            to_user: to_user
          })
        console.log(res)
        let {meta,data} =res
        if(meta.status === 200){
            this.setState({
                list:data.list
            })
        }
    }
    render(){
        return (
            <div className='chat-window'>
                <div className="chat-window-title">
                 <Icon name='angle left' onClick={this.props.closeChatWindow} className='chat-ret-btn' size='large'/>
                <span>{this.props.chatItem.username}</span>
                </div>
                <div className="chat-window-content">
                    <ul>
                        {
                            this.state.list.map(item=>(
                                <li key={item.id} className={this.props.chatItem.from_user===item.from_user?
                                 'chat-info-left':'chat-info-right'}>
                                    <img src={item.avatar} alt=""/>
                                    <span>{item.chat_msg}</span>
                                </li>
                            ))
                        }
                       
                    </ul>
                </div>
                <div className="chat-window-input">
                <Form>
                    <TextArea placeholder='请输入内容...' />
                    <Button onClick={this.props.closeChatWindow}>关闭</Button>
                    <Button primary>发送</Button>
                </Form>
                </div>
            </div>
        )
    }
}
export default ChatWindow