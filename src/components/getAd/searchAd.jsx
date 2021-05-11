import React,{Component} from 'react'
import './getAd.css'
import view from './img/view1.jpg'
import PubSub from "pubsub-js";
export default class SearchAd extends Component{

    state = {
        searchName: null
    }

    changeName = (e) => {
        const searchName = e.target.value
        this.setState({searchName})
        console.log(this.state.searchName,'***searchName***')
    }

    searchAd = () =>{
        //得到输入关键字
        const {searchName} = this.state
        console.log(searchName,'................')
        //判断是否有值,更新状态
        if(searchName){
            //发布消息(search)
            PubSub.publish('searchAd',searchName)
        }
    }

    render () {
        return (
                <div style={{width:1698,height:724,backgroundImage:`url("https://getwallpapers.com/wallpaper/full/6/5/5/1526542.jpg")`}}>
                    <br/><br/><br/><br/><br/><br/><br/>
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-10 col-lg-8">
                                <div className="card card-sm" style={{marginLeft:200,width:800,backgroundImage: `url(${view})`}}>
                                <div className="card-body row no-gutters align-items-center">
                                    <div className="col-auto">
                                        <i className="fas fa-search h4 text-body"></i>
                                    </div>
                                    <div className="col">
                                        <input className="form-control form-control-lg form-control-borderless"
                                               type="search" placeholder="Enter your ISBN to search" onChange={this.changeName}/>
                                    </div>

                                    <div className="col-auto">
                                        <button className="btn btn-lg btn-success" type="submit" onClick={this.searchAd}>Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
        )
    }
}