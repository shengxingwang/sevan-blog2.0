import React, { Component } from 'react';
import './news.css';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNewsList } from "./../../store/actions";
import Top from "./../../components/top/top";
import Message from './../../components/alert/alert'

class News extends Component{
    static propTypes = {
        getNewsList:propTypes.func.isRequired,
        newsData:propTypes.object.isRequired
    };
    state = {
        page:1,
        offset:10,
        totalPage:1,
        isControl:false,
        isOpen:false,
        alCon:'',
    };
    componentDidMount(){
        this.getNewData();
    };
    newsSearch(value){
    };
    prev(){
        this.setState({
            page:this.props.newsData.curPage+1,
        });
    };
    next(){
        this.setState({
            page:this.props.newsData.curPage-1,
        });
    };
    getNewData(){
        let data = {
            action:'getStatus',
            page:this.state.page,
            offset:this.state.offset
        };
        this.props.getNewsList(data);
    };

    showAler(url, event){
        this.setState({
            isControl:true,
            isOpen:true,
            alCon:"<img src="+url+" alt='大图' />",
        })
    };
    closeAlert() {
        this.setState({
            isControl:false,
            isOpen:false,
            alCon:'',
        })
    };
    render (){
        let StatuDom =  this.props.newsData.newsList.map((item, i) => {
            let imgStr = '';
            if(item.imgurl){
                let imgArr = item.imgurl.split('|');
                imgStr = imgArr.map((url,i)=>{
                    return (
                        <img key={i} onClick={this.showAler.bind(this,url)} src={url} alt={item.title} />
                    )
                });
            }
            return (
                <div key={i} className='statu-item'>
                    <div className='statu-img'>
                        {imgStr}
                    </div>
                    <div className='statu-det'>
                        <p className='statu-tit'>
                            <span className='t'>title：</span><span className='v'>{item.title}</span>
                        </p>
                        <p className='statu-time'>
                            <span className='t'>time：</span><span className='v'>{item.ptime}</span>
                            {item.address&&<span>{'locale：'+item.address}</span>}
                        </p>
                        <p className='contxt'>{item.ndesc}</p>
                        {item.turnUrl&&<a className='turnlink' href={item.turnUrl}>阅读全文</a>}
                    </div>
                </div>
            )
        });

        return(
            <div className='news-box rig-container'>
                <Top searchHand={this.newsSearch}></Top>
                <div className='news-list'>
                    {StatuDom}
                </div>
                <div className='btnGroup'>
                    <button disabled={this.props.newsData.curPage<=1} className='prev' onClick={this.prev}>上一页</button>
                    <label>{this.props.newsData.curPage}</label>
                    <button disabled={this.props.newsData.curPage>=this.props.newsData.totalPage} className='next' onClick={this.next}>下一页</button>
                </div>
                <Message closeAlert={this.closeAlert.bind(this)} isOpen={this.state.isOpen} isControl={this.state.isControl} alCon={this.state.alCon} />
            </div>
        )
    }
}
export default connect(state => ({
    newsData:state.newsData,
}),{
    getNewsList
})(News);
