import React, { Component } from 'react';
import './shows.css';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import { getCommList } from './../../store/actions';

class Shows extends Component{
    static propTypes = {
        commData:propTypes.object.isRequired,
        getCommList:propTypes.func.isRequired
    };
    state={
        page:1,
        offset:30
    };
    reload=true;
    page = 1;
    // shouldComponentUpdate(nextProps, nextState){
    //     // return this.props.location!==nextProps.location;
    //     // console.log(this.state.page+"----"+nextState.page);
    //     return this.page !== nextProps.commData.curPage;
    // };
    componentDidUpdate(){
        this.reload = true;
        let scrollEle = document.getElementById("poemCard");
        let ele = document.getElementById("poemCard").childNodes;
        let arrH = [];
        ele.forEach((item,i) => {
            let itemH = item.offsetHeight;
            if(i<3){
                arrH.push(itemH+20);
                item.style.top = 20+"px";
                item.style.left = (30*i+(1.5*(i+1)))+"%";
            }else {
                let minHeight = Math.min.apply(null,arrH);
                let idx = arrH.indexOf(minHeight);
                item.style.top =(arrH[idx]+20)+"px";
                item.style.left = (30*idx+(1.5*(idx+1)))+"%";
                arrH[idx] = arrH[idx]+(itemH+20);
                scrollEle.style.height = arrH[idx]+"px";
            }
        });
    };
    componentDidMount(){
        this.getData(1);
    };
    getData(type){
        let data = {
            action:'getCouldComment',
            page:this.page,
            offset:this.state.offset
        };
        this.props.getCommList(data, type);
    };
    scrollLoad(event){
        let winH = document.documentElement.offsetHeight||document.body.offsetHeight;
        let scrllEle = event.target;
        let scrollH = scrllEle.scrollTop;
        let conH = scrllEle.firstChild.offsetHeight;
        // console.log(scrollH+"--"+winH+"--"+conH);
        if(scrollH+winH>=conH-30&&this.props.commData.curPage<this.props.commData.totalPage&&this.reload){
            this.reload = false;
            this.page=this.props.commData.curPage+1;
            this.getData();
        }
    };
    render() {
        let comm = this.props.commData.commList.map((item, i) => {
            return(
                <div key={i} className='item'>
                    <p>{item.comment}</p>
                    <p className='bomm'><span className='flag'>{item.nickname+"——"+item.ptime.split(" ")[0]}</span></p>
                </div>
            )
        });
        return (
            <div onScroll={this.scrollLoad.bind(this)} className='shows-box rig-container'>
                <div className='poem-card' id="poemCard">
                    {comm}
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    commData:state.commData
}),{
    getCommList
})(Shows)