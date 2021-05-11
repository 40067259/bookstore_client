import React,{Component} from 'react'
import PropTypes from 'prop-types'

import './commentList.css'
import CommentItem from "../commnet-item/Comment-item";


export default class CommentList extends Component{

    //static 给组件类添加属性。 若不添加就是给组件对象添加属性
    static protoType = {
        comments: PropTypes.array.isRequired,
    }

    render () {
        const{comments,deleteComment} = this.props
        const display = comments.length===0 ? 'block':'none'
        return (
            <div className="col-md-8">
                <h3 className="reply">Comments reply:</h3>
                <h2 style={{display:display}}>No Comments, Please Add!!!</h2>
                <ul className="list-group">
                    {
                        comments.map((comment,index)=><CommentItem comment={comment} key={index} index={index}/>)
                    }
                </ul>

            </div>
        )
    }
}
// CommentList.propTypes = {
//     comments: PropTypes.array.isRequired
// }