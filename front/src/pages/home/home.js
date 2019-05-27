import React,{Component} from 'react';
import './home.css';
import { Link } from 'react-router-dom';
class ItemHome extends Component{
    constructor(props){
        super(props);
        this.state = {
            tip:''
        }
    }
    static propTypes = {
    };
    componentDidMount(){
    };
    render(){
        return(
            <div className='home'>
                <div className="mask">
                    <div className="my-index">
                        <div className="head">
                            <img src={require('./../../static/images/h.jpg')} alt="头像"></img>
                            <div className="my-tit">Sevan 的 小 屋</div>
                            <div className="my-desc">总有一个意外，给你带来精彩</div>
                            <div className="my-guide">
                                <span><Link to='/my/arthome'>文章</Link></span>
                                <span><Link to='/my/about'>关于</Link></span>
                                <span><Link to='/my/filelog'>归档</Link></span>
                                <span><Link to='/my/feedme'>留言</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ItemHome;