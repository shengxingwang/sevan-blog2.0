import React,{Component} from 'react';
import './style.css'
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import { getNewsData } from "../../store/actions";

class About extends Component{
    constructor(props){
        super(props);
        this.state = {
            showImg:false,
            viewImg:'',
        };
        // this.preview = this.preview.bind(this)
    }
    static propTypes = {
        newsData:propTypes.object.isRequired,
        // getExpreData:propTypes.func.isRequired,
    };
    componentDidMount(){
        // this.props.getInfoData({uid:this.state.uid});
        this.props.getNewsData();
    };
    preview(url,e){
       this.setState({
            showImg:true,
            viewImg:url,
            wxshow:false
       })
    }
    closeDiolg(){
        this.setState({
            showImg:false
       })
    }
    showWx(){
        this.setState({
            wxshow:!this.state.wxshow
       })
    }
    render() {
        let { list } = this.props.newsData.newsdata;
        let { viewImg } = this.state;
        const imgview = (
            this.state.showImg?
            <div className="mask">
                <div className="dilog">
                    <span className="closebtn" onClick={this.closeDiolg.bind(this)}></span>
                    <img src={viewImg} alt="放大图"></img>
                </div>
            </div>:null
        )

        return (
            <div className='art-home'>
                { imgview }
                <div className="container">
                    <div className="about">
                        <div className="left-info">
                            <div className="about-head">
                                <div className="bg-box"><img className="bg-img" src={require('./../../static/images/list2.png')} alt="bg"></img></div>
                                <div className="sub-img">
                                    <img className={this.state.wxshow?'himg hide':'himg'} src={require('./../../static/images/h.jpg')} alt="bg"></img>
                                    <img className="wximg" src={require('./../../static/images/myweixin.jpg')} alt="weixin"></img>
                                </div>
                            </div>
                            <div className="info-ban">
                                <p className="item"><button onClick={this.showWx.bind(this)} className="friendbtn">friend me</button></p>
                                <p className="item">
                                    <span className="t iconfont">&#xe659;</span>
                                    <span className="v">我是sevan, 一名web前端开发工程师</span>
                                </p>
                                <p className="item">
                                    <span className="t iconfont">&#xe635;</span>
                                    <span className="v">书法，电影，音乐，旅行</span>
                                </p>
                                <p className="item">
                                    <span className="t iconfont">&#xe61e;</span>
                                    <span className="v">
                                        <a href="https://github.com/shengxingwang"><span className="iconfont">&#xe677;</span></a>
                                        <a href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=NQQGBAAEDAUFDA11REQbVlpY"><span className="iconfont">&#xe62b;</span></a>
                                        <a href="https://weibo.com/websevan"><span className="iconfont">&#xe660;</span></a>
                                    </span>
                                </p>
                                <p className="item">
                                    <span className="t iconfont">&#xe646;</span>
                                    <span className="v">总有一个意外，给你带来精彩</span>
                                </p>
                            </div>
                        </div>
                        <div className="rig-info">
                            <div className="info-news">
                                <h2 className="new-t">历史轨迹</h2>
                                <div className="new-list">
                                    <ul>
                                        {
                                            list.length ? list.map( item =>
                                                <li className="item" key={item.nid}>
                                                        <p className='icon-t'>{item.ptime}</p>
                                                        <div className="con-txt">{item.ndesc}</div>
                                                        <div className="newimg">
                                                        {
                                                            item.imgurl.split("|").length ? item.imgurl.split("|").map( (item, i) => 
                                                                <div key={i} className="imgitem" onClick={this.preview.bind(this,item)} ><img alt="newsimg" src={item}></img></div>
                                                            ):null
                                                        }
                                                </div></li>) : null
                                                
                                        }
                                        {/* <li className="item">
                                            <p className='icon-t'>2019-23-4</p>
                                            <div className="con-txt">asdasdasd案件搜低价爱谁就懂啊案件搜低价爱谁就懂啊哦啊死机案件搜低价爱谁就asdasdasd案件搜低价爱谁就懂啊案件搜低价爱谁就懂啊哦啊死机案件搜低价爱谁就懂啊哦啊死机案件搜低价爱谁就懂啊哦啊死机哦啊死机adadaasdasdasd案件搜低价爱谁就懂啊案件搜低价爱谁就懂啊哦啊死机案件搜低价爱谁就懂啊哦啊死机案件搜低价爱谁就懂啊哦啊死机哦啊死机adada懂啊哦啊死机案件搜低价爱谁就懂啊哦啊死机哦啊死机adada</div>
                                            <div className="newimg">
                                                <div className="imgitem"><img src={require('./../../static/images/h.jpg')}></img></div>
                                                <div className="imgitem"><img src={require('./../../static/images/h.jpg')}></img></div>
                                            </div>
                                        </li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default connect(state=>({
    newsData:state.newsData
}),{
    // getInfoData,
    getNewsData
})(About);