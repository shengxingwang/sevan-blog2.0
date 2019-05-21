import React, { Component } from 'react';
import './style.css';
class Loading extends Component{
    constructor(prop){
        super(prop);
        this.state = {
            loadimg:'./../../static/images/loading.gif'
        }
    }
    render() {
        return (
            <div className="loading">
                <img src={require('./../../static/images/loading.gif')} alt="加载动画"></img>
                <p>正在快马加鞭赶路中.....</p>
            </div>
        );
    }
}

export default Loading;