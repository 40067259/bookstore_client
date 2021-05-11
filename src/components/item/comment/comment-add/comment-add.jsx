import React,{Component} from 'react'
import PropTypes from 'prop-types'

export default class CommentAdd extends Component{

    static propTypes ={
        addComment: PropTypes.func.isRequired
    }

    state = {
        userName:'',
        content: ''
    }
    handleSubmit = () => {
        //收集数据
        const comment = this.state
        //更新状态
        this.props.addComment(comment)
        //清除输入数据
        this.setState({
            userName:'',
            content:''
        })
    }
    handleNameChange = (event) => {
        const userName = event.target.value
        this.setState({userName})
    }
    handleContentChange = (event) =>{
        const content = event.target.value
        this.setState({content})
    }

    render () {
        const{userName,content}=this.state
        return (
            <div className="col-md-4">
                <form className = "form-horizontal">
                    <div className = "form-group">
                        <label>User Name</label>
                        <input className = "form-control" placeholder="User Name" value={userName} onChange={this.handleNameChange}/>
                    </div>
                    <div className="form-group">
                        <lable>Comments Area</lable>
                        <textarea className="form-control" rows="6" placeholder="Comments" value ={content} onChange={this.handleContentChange}></textarea>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button className="btn btn-default pull-right" type="button" onClick={this.handleSubmit}>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
