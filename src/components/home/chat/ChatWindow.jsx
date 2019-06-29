import React from "react"
import "./ChatWindow.css"
import {Form,Icon,TextArea,Button} from 'semantic-ui-react'
import handle from "./wsmain"
class ChatWindow extends React.Component{
    constructor(props){
        super(props)
        this.state={
            list:[],
            client:"",
            msgContent:""
        }
    }
    // 初始化获取；聊天列表是数据
    async componentDidMount(){
        let {from_user,to_user} = this.props.chatItem
        let res = await this.axios.post('chats/info',{
            from_user: from_user,
            to_user: to_user
          })
        let {meta,data} =res
        if(meta.status === 200){
            // 打开聊天窗口的时候，需要向服务器注册用户ID
            let currentUser=localStorage.getItem("uid")-0
            // 该回调函数用来处理服务器返回的消息（其实就是对方发送消息）
            // 其实就是接收对方返回的消息
            let client = handle(currentUser,(data)=>{
                console.log(data)
            })
            this.setState({
                list:data.list,
                client:client
            })
        }
    }

    // 给服务器发送数据，即时通信
    sendMsg=()=>{
        let pdata = {
            id:new Date().getTime(),
            from_user: this.props.chatItem.to_user,
            to_user: this.props.chatItem.from_user,
            chat_msg: this.state.msgContent,
            avatar:localStorage.getItem("user_avatar")
          }
        // 把消息发送出去
        this.state.client.emitEvent("msg_text_send",JSON.stringify(pdata));
        let newList=[...this.state.list,pdata]
        this.setState({
            msgContent:"",
            list:newList
        })
    } 
    // 受控组件，处理
    handleChange=(e)=>{
        this.setState({
            msgContent:e.target.value
        })
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
                                <li key={item.id} className={this.props.chatItem.to_user===item.to_user?
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
                    <TextArea placeholder='请输入内容...' value={this.state.msgContent} onChange={this.handleChange}/>
                    <Button onClick={this.props.closeChatWindow}>关闭</Button>
                    <Button primary onClick={this.sendMsg}>发送</Button>
                </Form>
                </div>
            </div>
        )
    }
}
export default ChatWindow