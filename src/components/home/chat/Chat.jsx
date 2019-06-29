import React from "react"
import "./Chat.css"
import moment from "moment"
import ChatWindow from "./ChatWindow"
class Chat extends React.Component {
    constructor(props){
        super(props)
        this.state={
            list:[],
            isShow:false,
            chatItem:{}
        }
    }

    // 显示聊天窗口
    showChatWindow =(item)=>{
        this.setState({
            isShow:!this.state.isShow,
            chatItem:item
        })
    }
    // 关闭窗口
    closeChatWindow =()=>{
        this.setState({
            isShow:false
        })
    }
    async componentDidMount(){
        let res = await this.axios.post("chats/list")
        let {meta,data} = res
        // console.log(res.data.list)
        if(meta.status === 200){
            this.setState({
                list:data.list
            })
        }
    }
    render(){
        return (
            <div className='chat-container'>
                {/* 聊天窗口  */}
                {this.state.isShow && <ChatWindow closeChatWindow={this.closeChatWindow} chatItem={this.state.chatItem}></ChatWindow> }
                <div className="chat-title">聊天</div>
                <div className="chat-list">
                    <ul>
                       {this.state.list.map(item=>(
                            <li key={item.id} onClick={this.showChatWindow.bind(this,item)}>
                                <div className="avarter">
                                    <img src={item.avatar} alt="avarter"/>
                                    <span className="name">{item.username}</span>
                                    <span className="info">{item.chat_msg}</span>
                                    <span className="time">
                                        {moment(item.ctime).format("YYYY-MM-DD HH:mm:ss")}
                                    </span>
                                </div>
                            </li>
                       ))}
                    </ul>
                </div>
                {/* {this.state.isShow && <ChatWindow hideChat={this.closeWindow} currentInfo={this.state.currentInfo}/>} */}
            </div>
        )
    }
}

export default Chat