import React from 'react';
import {BrowserRouter as Router,Switch,Link,Route,Redirect} from 'react-router-dom'
import {Button} from "semantic-ui-react"
import Login from './components/Login';
import Home from './components/Home';

export default class App extends React.Component{
    render(){
        return (
            <Router>
                {/* 编程式路由导航 */}
                <Switch>
                    {/* 如果是访问 / */}
                    <Redirect exact from="/" to="/login" />
                    <Route path="/home" component={Home}/>
                    <Route path="/login" component={Login}/>
                </Switch>
            </Router>
        )
    }
}