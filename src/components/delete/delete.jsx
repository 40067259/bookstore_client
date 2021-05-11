import React,{Component} from 'react'

import '../search/search.css'
import '../search/new.css'
import Axios from "axios";

export default class Delete extends Component{

    state = {
        id: null,
        success: null,
        fail: null,
        errorMsg: null
    }

    delete = () => {
        const id = this.input.value
        const url = 'http://localhost:3000/ad/deleteAD/'+id
        const token = localStorage.getItem('myToken')
        console.log(token,'***********************')
        const config = { headers: {'token':`${token}` } }
        // let params = new FormData()
        // params.append("ID",id)
        Axios.delete(url,config)
            .then(response => {
                //得到相应数据
                const result = response.data
                console.log(result)
                if(result === '' || result == null){
                    this.setState({fail:true,errorMsg:'Sorry, user not authenticated'})
                }
                else{
                    const success = result
                    this.setState({success})
                }
            })

    }
    render () {
        const{errorMsg,success} = this.state
        return (
            <div className="s130" style={{backgroundImage:`url(https://getwallpapers.com/wallpaper/full/c/f/5/1527141.jpg)`}}>

                <form>
                   <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}><h4 style={{color:'red'}}>{errorMsg}</h4></div>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}><h4 style={{color:'red'}}>{success}</h4></div>
                    <br/>
                    <div className="inner-form">
                        <div className="input-field first-wrap">
                            <div className="svg-wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path
                                        d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                                </svg>
                            </div>
                            <input id="search" type="text" placeholder="Please enter id " ref={input => this.input = input}/>
                        </div>
                        <div className="input-field second-wrap">
                            <button className="btn-search" type="button" onClick={this.delete}>DELETE</button>
                        </div>
                    </div>
                    <span className="info">ex. Game, Tec, Books, Reference</span>
                </form>
            </div>
        )
    }
}