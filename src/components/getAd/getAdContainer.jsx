import React,{Component} from 'react'

import MainAd from './mainAd'
import SearchAd from './searchAd'
import './getAd.css'

export default class SearchContainer extends Component{

    render () {
        return (
            <div  style={{color:'yellowgreen',backgroundColor:'gray'}}>
                <SearchAd />
                <MainAd />
            </div>
        )
    }
}