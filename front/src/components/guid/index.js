import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
class Guid extends Component{
    constructor(prop){
        super(prop);
        this.state = {

        }
    }
    render() {
        let path = this.props.history.location.pathname;
        return (
            <div className="main-box">
                <div className="navBar">
                    <div className="container">
                        <ul className="bar">
                            <li className={path==="/"?'active':''}><Link to="/">首页</Link></li>
                            <li className={/my\/arthome/.test(path)?'active':''}><Link to="/my/arthome">文章</Link></li>
                            <li className={path==="/my/filelog"?'active':''}><Link to="/my/filelog">归档</Link></li>
                            <li className={path==="/my/about"?'active':''}><Link to="/my/about">关于</Link></li>
                            <li className={path==="/my/feedme"?'active':''}><Link to="/my/feedme">留言</Link></li>
                        </ul>
                    </div>
                </div>
                {this.props.children}
            </div>
        );
    }
}

export default Guid;