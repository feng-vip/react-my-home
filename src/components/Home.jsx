import React from 'react';
import "./Home.css"
import { Grid,Icon} from "semantic-ui-react"
import { NavLink,Switch,Route}  from 'react-router-dom'
import Main from "./home/main/Main"
import Info from "./home/info/Info"
import My from "./home/my/My"
import Chat from "./home/chat/Chat"
// import Demo from "./home/Demo"
export default class Home extends React.Component {
    render(){
        return (
            <div className="home">
                <div className="home_content">
                    <Switch>
                        <Route exact path="/home" component={Main}></Route>
                        <Route path="/home/info" component={Info}></Route>
                        <Route path="/home/my" component={My}></Route>
                        <Route path="/home/chat" component={Chat}></Route>
                    </Switch>
                </div>
                <home className="home_menu">
                    <Grid>
                        <Grid.Row columns={4}>
                            <Grid.Column>
                                <NavLink exact to="/home">
                                    <Icon name="home"></Icon>
                                    <p>首页</p>
                                </NavLink>
                            </Grid.Column>
                            <Grid.Column>
                                <NavLink to="/home/info">
                                    <Icon name="paste"></Icon>
                                    <p>资讯</p>
                                </NavLink>
                            </Grid.Column>
                            <Grid.Column>
                                <NavLink to="/home/chat">
                                    <Icon name="phone"></Icon>
                                    <p>微聊</p>
                                </NavLink>
                            </Grid.Column>
                            <Grid.Column>
                                <NavLink to="/home/my">
                                    <Icon name="user"></Icon>
                                    <p>我的</p>
                                </NavLink>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </home>
            </div>
        )
    }
}