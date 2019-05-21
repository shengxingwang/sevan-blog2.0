import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.css';
import { getArt, getArtPage } from '../../store/actions';
import SideInfo from './../../components/sideInfo'

class Art extends Component{
    constructor(props){
        super(props);
        this.state = {
            tid:'',
            page:1,
            totalPage:1
        }
    };
    componentDidMount(){
        let tid = this.props.match.params.tid;
        this.setState({
            tid
        })
        this.props.getArt(this.state).then( res => {
            if(res.code===200){
                const { page, totalPage } = res.data;
                this.setState({
                    page,
                    totalPage
                })
            }
        })
        this.scrollLoad();
    };

    scrollLoad(){
        let wrap = document.querySelector(".wrap");
        let flag = true;
        wrap.addEventListener("scroll",() =>{
            let totalH = wrap.scrollHeight;
            let scrollH = wrap.scrollTop;
            let wrapH = wrap.offsetHeight;
            if((scrollH+wrapH)+40>totalH&&flag&&parseInt(this.state.totalPage)>parseInt(this.state.page)){
                flag = false;
                this.setState({
                    page:parseInt(this.state.page)+1
                })
                this.props.getArtPage(this.state).then( res => {
                    if(res.code===200){
                        flag = true;
                        const { page, totalPage } = res.data;
                        this.setState({
                            page,
                            totalPage
                        })
                    }
                });
            }
        })
    }
    componentWillReceiveProps(nextProps) {
        const tid = nextProps.match.params.tid;
        if(nextProps.match.params.tid!==this.state.id){
            this.props.getArt({tid:tid});
        }
        this.setState({
            tid:tid
        });
    }
    render(){
        let list  = this.props.ArtListData.ArtListData.list||[];
        return(
            <div className="art-home">
                <div className="container">
                    <div className="left-con">
                        <div className="artlist">
                            {
                                list.length ? list.map(function(item,i){
                                    return (
                                        <div className="item" key={i}>
                                                <Link to={`/my/itemArt/${item.aid}`}><h2 className="tit">{item.title}</h2></Link>
                                            <div className="descript">{item.descript}</div>
                                            <div className="info">
                                                <span>{item.create_at}</span><i className="space"> • </i><span>{item.hot}次阅读</span>
                                            </div>
                                        </div>
                                    )
                                }):''
                            }
                        </div>
                    </div>
                    <SideInfo></SideInfo>
                    {/* <div className="right-con">
                        <div className="hot-bar">
                            <h2 className='rig-tit'>热门文章</h2>
                            <div className="hot-list">
                                {
                                    this.state.hotlist.length ? this.state.hotlist.map( item => 
                                        <Link key={item.aid}  to={`/my/itemArt/${item.aid}`}><h3>{item.title}</h3></Link>
                                    ) : <p>暂无</p>
                                }
                            </div>
                        </div>
                        <div className="tag-bar">
                            <h2 className='rig-tit'>标签</h2>
                            <div className="tag-list">
                                {
                                    taglist.length ? taglist.map(function(item,i){
                                        return (
                                            <Link className={self.state.id===item.tid?'active':''} to={`/my/arthome/${item.tid}`} key={i}>{item.tag}</Link>
                                        )
                                    }):''
                                }
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({ArtListData:state.ArtListData});

const mapDispatchToProps = {
    getArt,
    getArtPage
}
export default connect(mapStateToProps,mapDispatchToProps)(Art);