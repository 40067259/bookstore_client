import React,{Component} from 'react'
import PropTypes from 'prop-types'
import PubSub from 'pubsub-js'

import './commnetItem.css'

export default class CommentItem extends Component{

    static propTypes = {
        comment: PropTypes.array.isRequired,
        index: PropTypes.number.isRequired
    }
    handleClick = () => {
        const{comment,index} = this.props
        //先提示
        if(window.confirm('Are you sure to delete '+comment.userName+" comment?")){
            //确定后删除
            PubSub.publish('deleteComment',index)//要是传多个数据封装成对象就OK

        }
    }
    render () {
        const{comment} = this.props
        return (
            <li className="list-group-item">
            <div className="handle">
                <a href="javascript:;" onClick = {this.handleClick}>Delete</a>
            </div>
            <p className="user"><span>{comment.userName}</span>&nbsp;<span>says:</span></p>
            <p className="sentence">{comment.content}</p>
        </li>
        )
    }
}