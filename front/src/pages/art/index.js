import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.css';
import { getArt, getArtPage } from '../../store/actions';
import ScrollBar from './../../components/scrollTool';
import SideInfo from './../../components/sideInfo'

class Art extends Component{
    constructor(props){
        super(props);
        this.state = {
            tid:'',
            page:1,
            totalPage:1,
            nodata:false
        }
    };
    _setState = true;
    componentDidMount(){
        let tid = this.props.match.params.tid;
        this.props.getArt({tid:tid}).then( res => {
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
                let page = parseInt(this.state.page)+1;
                this.props.getArtPage({tid:this.state.tid,page:page}).then( res => {
                    if(res.code===200){
                        const { page, totalPage } = res.data;
                        let nodata = false;
                        if(parseInt(page)>=parseInt(totalPage)){
                            nodata = true;
                        };
                        this.setState({
                            page,
                            totalPage,
                            nodata
                        }, () => {
                            flag = true;
                        });
                    }
                });
            }
        })
    }
    componentWillReceiveProps(nextProps) {
        const tid = nextProps.match.params.tid;
        if(nextProps.match.params.tid!==this.props.match.params.tid){
            this.props.getArt({tid:tid}).then( res => {
                if(res.code===200){
                    const { page, totalPage } = res.data;
                    if(this._setState){
                        this.setState({
                            tid,
                            page,
                            totalPage
                        })
                    }
                }
            });
        }
    }
    componentWillUnmount(){
        this._setState = false;
    }
    render(){
        let list  = this.props.ArtListData.ArtListData.list||[];
        return(
            <div className="art-home">
                <ScrollBar></ScrollBar>
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
                            { this.state.nodata ? <p className="tip">已经到底了</p>:null}
                        </div>
                    </div>
                    <SideInfo tid={this.state.tid}></SideInfo>
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