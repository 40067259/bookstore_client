import React,{Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link,Route,Switch,Redirect} from "react-router-dom";

import Login from './login/login'
import Signup from "./signup/signup";
import PostAd from "./postAd/postAd";
import Nav from "./nav/nav";
import SearchContainer from "./search/searchContainer";
import Logout from "./logout/logout";
import GetAdContainer from "./getAd/getAdContainer";
import Delete from "./delete/delete";
import GetAllAds from "./getAllAds/getAllAds";
import Dropdown from "./dropdown/dropdown"

export default class App extends Component{

    render () {
        return (
            <div>
                <Nav/>
                <Switch>
                    <Route path={'/signup'} component={Signup}></Route>
                    <Route path={'/login'} component={Login}></Route>
                    <Route path={'/postAd'} component={PostAd}></Route>
                    <Route path={'/search'} component={SearchContainer}></Route>
                    <Route path={'/logout'} component={Logout}></Route>
                    <Route path={'/getAd'} component={GetAdContainer}></Route>
                    <Route path={'/delete'} component={Delete}></Route>
                    <Route path={'/getAllAd'} component={GetAllAds}></Route>
                    {<Redirect to={'/login'}/>}
                </Switch>
            </div>
        )
    }
}