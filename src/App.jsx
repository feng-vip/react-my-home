import React from 'react';
import {HashRouter as Router,Switch,Link,Route,Redirect} from 'react-router-dom'
import Login from './components/Login';
import Home from './components/Home';

export default class App extends React.Component{
    render(){
        return (
            <Router>
                <div>
                    {/* 编程式路由导航 */}
                    <Switch>
                        {/* 如果是访问 / */}
                        <Redirect exact from="/" to="/home" />
                        <Route path="/home" component={Home}/>
                        <Route path="/login" component={Login}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}