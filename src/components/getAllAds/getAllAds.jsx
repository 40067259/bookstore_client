import React,{Component} from 'react'
import Axios from "axios";

import './getAllAds.css'
import {GET_ALL_API_URL} from "../constant";

export default class GetAllAds extends Component{
    state = {
        users: [],
        errorMsg: null,
        load: true
    }
    componentDidMount() {
        const url = GET_ALL_API_URL
        const token = localStorage.getItem('myToken')
        const config = { headers: {'token':`${token}` } }
        Axios.get(url,config)
            .then(response => {
                const result = response.data
                if(result === '' || result == null && result == undefined)
                    this.setState({errorMsg:'Sorry,User not authenticated or no ad',load:false})
                else{
                    const users = result.map(item => {
                        return {title: item.title,price: item.price, cover: item.cover,
                            quantity:item.quantity,description:item.description,id:item.id}
                    })
                    this.setState({users,load:false})
                }
            })
            .catch(error => {
                this.setState({errorMsg:error.message,load:false})
            })
    }

    render () {
        const{users,errorMsg,load} = this.state
        if(load) return <div style={{width:1100,height:500,float:'right',marginTop:200}}>
            <h1 style={{color:'red',alignmentBaseline:'central',fontSize:40}}>Loading...</h1></div>
        if(errorMsg) return <div style={{width:1100,height:500,float:'right',marginTop:200}}>
            <h1 style={{color:'red',alignmentBaseline:'central',fontSize:40}}>{errorMsg}</h1></div>
        return (
                <div >
                    {
                        users.map((user,index) => (
                            <div className="card"  key={index}>
                                <img src={`data:image/jpeg;base64,${user.cover}`} height="200" width="200"
                                     style={{fontSize:"30px",color:"yellowgreen",borderRadius:0}} alt="No cover"/>
                                <p className="card-text" style={{color:"red",fontSize:"40px"}}>Name: {user.title}</p>
                                <p className="card-text" style={{color:"yellow",fontSize:"20px"}}>Price: {user.price}</p>
                                <p className="card-text" style={{color:"green",fontSize:"20px"}}>Quantity: {user.quantity}</p>
                                <p className="card-text" style={{color:"pink",fontSize:"15px"}}>ID:{user.id}</p>
                                <p className="card-text" style={{color:"purple",fontSize:"20px"}}>Des: {user.description}</p>
                            </div>
                        ))
                    }
                </div>
        )
    }
}