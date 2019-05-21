import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.css';
import { getTag} from '../../store/actions';
import { getArtHot } from './../../api/api'

class sideInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            id:'',
            page:1,
            hotlist:[]
        }
    };
    componentWillMount(){
        getArtHot().then( res => {
            let data = res.data;
            if(data.code===200){
                let list = data.data.list;
                this.setState({
                    hotlist:list||[]
                })
            }
        })
    }
    componentDidMount(){
        // let tid = this.props.match.params.tid?this.props.match.params.tid:'';
        this.props.getTag();
    };
    render(){
        let taglist = this.props.TagListData.TagListData.list||[];
        let self=this;
        return(
                <div className="right-con">
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
                                        <Link className={self.state.id===item.tid?'active':''} to={`/my/arthome/${item.tid}`} key={i}>{item.tag}({item.count})</Link>
                                    )
                                }):''
                            }
                        </div>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = state => ({TagListData:state.TagListData});

const mapDispatchToProps =  {
        getTag
}
export default connect(mapStateToProps,mapDispatchToProps)(sideInfo);