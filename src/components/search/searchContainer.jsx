import React,{Component} from 'react'

import Search from './search'
import Main from './main'
import './search.css'

export default class SearchContainer extends Component{

    render () {
        return (
            <div  style={{color:'yellowgreen',backgroundColor:'gray'}}>
                <Search />
                <Main />
            </div>
        )
    }
}