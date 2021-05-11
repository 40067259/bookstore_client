import React,{Component} from 'react'
import PubSub from 'pubsub-js'

import CommentAdd from "../comment-add/comment-add"
import CommentList from "../comment-list/comment-list";


export default class CommentContainer extends Component{
    /*
    constructor(props) {
        super(props);
        this.state={
            comments:[
                {userName:'Tom',content:'React is amazing'},
                {userName:'Jack',content:'React is tricky'}
            ]
        }
        }
     */
    //给组件对象指定state属性(上面的是class属性添加state)
        state = {
            comments:[
                {userName:'Tom',content:'React is amazing'},
                {userName:'Jack',content:'React is tricky'}
            ]
        }

        componentDidMount() {
            //订阅消息(deleteComment)
            PubSub.subscribe('deleteComment', (msg,index) =>{
                this.deleteComment(index)
            })
        }

    addComment = (comment) => {
           const{comments} = this.state
            comments.unshift(comment)
            this.setState({comments})
        }

        deleteComment = (index) => {
            //信息处理
            const{comments} = this.state
            comments.splice(index,1)
            //更新状态
            this.setState({comments})
        }


    render () {
            const {comments} = this.state

        return (
            <div>
                <header className = "site-header jumbotron">
                    <div className = "container">
                        <div className = "row">
                            <div className = "col-xs-12">
                                <h1>Please write your comment about React</h1>
                            </div>
                        </div>
                    </div>
                </header>

                <div className ="container">
                    <CommentAdd addComment={this.addComment}/>
                    <CommentList comments={comments} />
                </div>

            </div>

        )
    }
}




