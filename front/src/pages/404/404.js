import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './404.css'

class ErrorPage extends Component {
  render () {
    return (
      <div className="exception">
        <div className="imgBlock">
          <div className="imgEle"></div>
        </div>
        <div className="errcontent">
          <h1>404</h1>
          <div className="desc">抱歉，你访问的页面不存在</div>
          <div className="actions">
            <Link className='back' to='/'>返回首页</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default ErrorPage
