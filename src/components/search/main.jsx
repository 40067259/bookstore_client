import React,{Component} from 'react'
import Axios from 'axios'
import PubSub from 'pubsub-js'

import {SEARCH_AD_API_URL} from "../constant";
export default class Main extends Component{

    state = {
        initView: true,
        loading: false,
        books: [],
        errorMsg: null
    }
    componentDidMount() {
        //订阅消息(search)
        PubSub.subscribe('search',(msg,searchName) => {
            this.setState({
                initView: false,
                loading: true
            })
            //const url = 'http://localhost:3000/ad/searchGoogleBook/'+searchName
            const url = SEARCH_AD_API_URL+searchName
            const token = localStorage.getItem('myToken')
            console.log(token,'***********************')
            const config = { headers: {'token':`${token}` } }

            Axios.get(url,config)
                .then(response => {
                    //得到相应数据
                    const result = response.data
                    console.log(result)
                    if(result === '' || result == null){
                        this.setState({loading:false,errorMsg:'Sorry, user not authenticated'})
                    }
                    else{
                        const books = result.map(item => {
                            return {img: item.coverLink,title: item.title, description: item.description,isbn: item.isbn}
                        })
                        //更新状态（成功）
                        this.setState({loading:false,books})

                    }
                })
                .catch(error => {
                    //更新状态（失败）
                    this.setState({loading:false,errorMsg:'No authentication'})
                })

        })

    }

    render () {
        const{initView,loading,books,errorMsg} = this.state
        const{searchName} = this.props
        if(initView) return <div></div>
        else if(loading){
            return <h2 style={{display:"flex",justifyContent:"center"}}>Loading.......</h2>
        }else if(errorMsg){
            return <h2 style={{display:"flex",justifyContent:"center",color:"red"}}>{errorMsg}</h2>
        }else{
            return (
                <div className="row">
                    {
                        books.map((book,index) => (
                            <div className="card" key={index} style={{height:"400px"}}>
                                <img src={book.img} style={{borderRadius:0}}/>
                                <p className="card-text" style={{color:"red",fontSize:"20px"}}><span style={{fontSize:20}}>Name</span>: {book.title}</p>
                                <p className="card-text" style={{color:"yellow",fontSize:"10px"}}><span style={{fontSize:20}}>ISBN</span>: {book.isbn}</p>
                                <p  style={{color:"green",fontSize:"15px"}}><span style={{fontSize:20}}>Des</span>: {book.description}</p>
                            </div>
                        ))
                    }

                </div>
            )
        }

    }
}