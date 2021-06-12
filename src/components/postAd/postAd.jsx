import React,{Component} from 'react'
import Axios from 'axios'
import '../login/login.css'

import {POST_AD_API_URL} from "../constant";

export default class PostAd extends Component{
    state = {
        isbn: null,
        itemName: null,
        price: null,
        stock: null,
        description: null,
        image: null,
        success: null,
        fail: null
    }

    handleIsbn = (e) => {
        const isbn = e.target.value
        this.setState({isbn})
    }

    handleItemName = (e) => {
        const itemName = e.target.value
        this.setState({itemName})
    }
    handlePrice = (e) => {
        const price = e.target.value
        this.setState({price})
    }
    handleStock = (e) => {
        const stock = e.target.value
        this.setState({stock})
    }
    handleDes = (e) => {
        const description = e.target.value
        this.setState({description})
    }
    handleImg = (e) => {
        const image = e.target.files[0];
        this.setState({image})
    }

    postAd = (e) => {
        const{itemName,price,stock,description,image,isbn} = this.state
        if(!itemName || !price || !stock) return
        let params = new FormData()
        params.append("title",itemName)
        params.append("ISBN",isbn)
        params.append("quantity",stock)
        params.append("description",description)
        params.append("price",price)
        params.append("cover",image)

        const token = localStorage.getItem('myToken')
        //const url = 'http://localhost:3000/ad/postAD'
        const url = POST_AD_API_URL
        console.log('token from postAd----->',token)
        const config = { headers: { 'Content-Type': 'multipart/form-data','token':`${token}` } }
        Axios.post(url,params,config).
        then( response => {
            const res = response.data
            console.log(res)
            this.setState({success:res,itemName: null,price: null,stock: null,
                                description: null,image: null})
        }).catch( error => {
            this.setState({fail:error.message})
        })
    }

    render () {
        const {isbn,itemName,price,stock,description,success,fail} = this.state
        if(success) return <div style={{marginTop:300,display:"flex",justifyContent:"center",alignItems:"center"}}><h1 style={{fontFamily:"fantasy", color:"lawngreen"}}>{success}</h1></div>
        else if(fail) return <div style={{marginTop:300,display:"flex",justifyContent:"center",alignItems:"center"}}><h1 style={{fontFamily:"monospace", color:"mediumpurple"}}>{fail}</h1></div>
        return (
            <div>
                <br/><br/><br/>
                <div className="container">
                    <div className="d-flex justify-content-center h-100">
                        <div className="card" style={{height:600, width:500}}>
                            <div className="card-header">
                                <h3>Ad Posting</h3>
                                <div className="d-flex justify-content-end social_icon">
                                    <span><i className="fab fa-facebook-square"></i></span>
                                    <span><i className="fab fa-google-plus-square"></i></span>
                                    <span><i className="fab fa-twitter-square"></i></span>
                                </div>
                            </div>
                            <div className="card-body">
                                <div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="ISBN"
                                               value = {isbn} onChange={this.handleIsbn}/>
                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="ItemName"
                                               value = {itemName} onChange={this.handleItemName}/>
                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-key"></i></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Price"
                                               value = {price} onChange={this.handlePrice}/>
                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-key"></i></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Stock"
                                               value = {stock} onChange={this.handleStock}/>
                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-key"></i></span>
                                        </div>
                                        <textarea className="form-control-plaintext" placeholder="Description"
                                                  style={{color:"yellowgreen"}} value ={description} onChange={this.handleDes}/>
                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                                        </div>
                                        <input type="file" className="form-control" placeholder="Item Image"
                                               name = "image" onChange={this.handleImg}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="button" value="PostAd" className="btn float-right login_btn" onClick={this.postAd}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}