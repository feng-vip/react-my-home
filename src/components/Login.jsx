import React from 'react';
import { Form } from 'semantic-ui-react';
import {withRouter} from "react-router-dom"
import "./Login.css"

class Login extends React.Component {
    // 构造函数
    constructor(props){
        super(props)
        this.state={
            uname:"",
            pwd:""
        }
    }
    // 处理受控组件
    handlerChange = (e)=>{
        let {name,value} = e.target
        this.setState({
            [name]:value
        })
    }

    // 登录
    login = async (e)=>{
        // 阻止默认行为
        e.preventDefault()
        // 发送axios请求
        let {uname,pwd} = this.state
        let res = await this.axios.post("users/login",{ 
            uname,
            pwd
        })
        console.log(res)
        let {meta,data} = res
        if(meta.status === 200){
            // 1.将token保存到本地
            localStorage.setItem("myToken",data.token)
            localStorage.setItem("uid",data.uid)
            // 2.路由跳转到主页 home 页面
            console.log(meta.msg)
            this.props.history.push("/home")
        }else{
            console.log(meta.msg)
        }
    }

    // 渲染方法
    render(){
        return (
                <div className="login_container">
                    <div className="login_title">登录</div>
                    <div className="login_form">
                    <Form action="" onSubmit={this.login}> 
                        <Form.Field>
                            <Form.Input 
                                icon="user" 
                                size="big" 
                                iconPosition="left" 
                                name="uname"
                                autoComplete="off"
                                value={this.state.uname}
                                onChange={this.handlerChange}
                                required
                                placeholder='请输入用户名...' />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input 
                                icon="lock" 
                                size="big" 
                                iconPosition="left" 
                                name="pwd"
                                autoComplete="off"
                                value={this.state.pwd}
                                onChange={this.handlerChange}
                                required
                                placeholder='请输入密码...' />
                        </Form.Field>
                        <Form.Field>
                            <Form.Button size="big" fluid positive>登录</Form.Button>
                        </Form.Field>
                    </Form>
                    </div>
                </div>
        )
    }
}

export default withRouter(Login) 