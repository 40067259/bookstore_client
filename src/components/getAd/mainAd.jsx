import React,{Component} from 'react'
import Axios from 'axios'
import PubSub from 'pubsub-js'
export default class MainAd extends Component{

    state = {
        initView: true,
        loading: false,
        books: null,
        errorMsg: null
    }
    componentDidMount() {
        PubSub.subscribe('searchAd',(msg,searchName) => {
            this.setState({
                initView: false,
                loading: true,
                errorMsg: null,
                books: null
            })
            this.btnDisable = true
            const url = 'http://localhost:3000/ad/get/'+searchName
            const token = localStorage.getItem('myToken')
            const config = { headers: {'token':`${token}` } }
            Axios.get(url,config)
                .then(response => {
                    const result = response.data
                    if(result === '' || result == null)
                    this.setState({errorMsg:'Sorry,User not authenticated or not have such ad',loading:false})
                    else{
                        const users = result.map(item => {
                            return {title: item.title,price: item.price, cover: item.cover,
                                quantity:item.quantity,description:item.description}
                        })
                        this.setState({loading:false,users})
                    }
                })
                .catch(error => {
                    this.setState({loading:false,errorMsg:error.message})
                })
        })
    }

    render () {
        const{initView,loading,users,errorMsg} = this.state
        const{searchName} = this.props
        if(initView) return <div></div>
        else if(loading){
            return <h1 style={{color:'red'}}>Loading...</h1>
        }else if(errorMsg){
            return <div style={{width:1100,height:100,float:'right',marginTop:2}}>
                <h1 style={{color:'red',alignmentBaseline:'central'}}>{errorMsg}</h1>
                </div>
        }else{
            return (
                <div >
                    {
                        users.map((user,index) => (
                            <div className="smallCard"  key={index}>
                                <img src={`data:image/jpeg;base64,${user.cover}`} height="200" width="200"
                                     style={{fontSize:"30px",color:"yellowgreen",borderRadius:0}} alt="No cover"/>
                                <p className="card-text" style={{color:"red",fontSize:"40px"}}>Name: {user.title}</p>
                                <p className="card-text" style={{color:"yellow",fontSize:"20px"}}>Price: {user.price}</p>
                                <p className="card-text" style={{color:"green",fontSize:"20px"}}>Quantity: {user.quantity}</p>
                                <p  style={{color:"purple",fontSize:"20px"}}>Des: {user.description}</p>
                            </div>
                        ))
                    }
                </div>
            )
        }

    }
}