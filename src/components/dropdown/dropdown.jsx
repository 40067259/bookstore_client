import React,{Component} from 'react'

export default class App extends Component{
    render () {
        return (
                <div className="dropdown">
                    <button className="btn btn-outline-success dropdown-toggle"
                            data-toggle="dropdown">DropDown</button>
                    <a href="#" className="btn btn-outline-warning dropdown-toggle"
                       data-toggle="dropdown">DropDown2</a>
                    <div className="dropdown-menu">
                        <div className="dropdown-header">Languages</div>
                        <a hre="#" className="dropdown-item">HTML</a>
                        <a hre="#" className="dropdown-item">CSS</a>
                        <a hre="#" className="dropdown-item">JavaScript</a>
                        <div className="dropdown-divider"></div>
                        <a hre="#" className="dropdown-item">More</a>
                    </div>
                </div>

        )
    }
}