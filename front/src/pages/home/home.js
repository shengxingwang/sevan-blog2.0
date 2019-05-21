import React,{Component} from 'react';
import './home.css';

// import { connect } from 'react-redux';
// import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { getHomeNewsData, getStatusList } from "../../store/actions";
// import Top from "./../../components/top/top";

class ItemHome extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    static propTypes = {
        // getHomeNewsData:propTypes.func.isRequired,
        // homeData:propTypes.object.isRequired
    };
    state = {};
    componentDidMount(){
        // this.props.getHomeNewsData();
        // this.props.getStatusList({action:'getStatus'});
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


// const mapStateToProps = ({ homeData }) => ({ homeData })

// const mapDispatchToProps = (dispatch) => {
//   return {  
//         getHomeNewsData,
//         getStatusList
//     }
// }
export default ItemHome;
// export default connect(mapStateToProps,mapDispatchToProps)(ItemHome);