import React,{Component} from 'react'
import Axios from 'axios'

export default class AdInfo extends Component{

    state = {
        books: null,
        fail: null
    }

    componentDidMount() {
        const url = 'http://localhost:3000/book/getMysales'
        Axios.get(url)
            .then(response => {
                //得到相应数据
                const result = response.data
                console.log(result)
                //const users = result.items.map(item => ({name: item.login},{url: item.html_url},{avatarUrl: item.avatar_url}))
                const books = result.books.map(book => {
                    return {itemName: book.itemName,price: book.price, stock: book.stock,image: book.image,
                            id: book.id,comments: book.comments}
                })
                //更新状态（成功）
                this.setState({books})

            })
            .catch(error => {
                //更新状态（失败）
                this.setState({fail:error.message})
            })
    }

    render () {
        const{fail,books} = this.state
        if(fail) return <div><h1>fail</h1></div>
        else if(books){
            return (
                <div >
                    {
                        books.map((book,index) => (
                            <div className="smallCard"  key={index}>
                                <img src={`data:image/jpeg;base64,${book.image}`} height="200" width="200"
                                     style={{fontSize:"30px",color:"yellowgreen"}} alt="No cover"/>
                                <p className="card-text" style={{color:"red",fontSize:"40px"}}>Title: {book.itemName}</p>
                                <p className="card-text" style={{color:"yellow",fontSize:"20px"}}>Price: {book.price}</p>
                                <p className="card-text" style={{color:"yellow",fontSize:"20px"}}>Stock: {book.stock}</p>
                                <p className="card-text" style={{color:"green",fontSize:"20px"}}>ID: {book.id}</p>
                                <p  style={{color:"purple",fontSize:"20px"}}>Des: {book.description}</p>
                                <ul className="list-group">
                                     <li className="list-group-item">
                                        <p className="user"><span>{book.comment.userName}</span>&nbsp;<span>says:</span></p>
                                        <p className="sentence">{book.comment.content}</p>
                                    </li>
                                </ul>
                            </div>
                        ))
                    }
                </div>
            )
        }
        return (
            <div>
                <h1>Your sales info is loading...</h1>
            </div>
        )
    }
}