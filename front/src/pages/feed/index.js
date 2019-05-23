import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getArtDet } from './../../store/actions';
import { getTouch, putTouch } from './../../api/api';
import './style.css';

class ArtDet extends Component{
    constructor(props){
        super(props)
        this.state = {
            nick:'',
            email:'',
            friendlink:'',
            feed:'',
            page:1,
            totalPage:1,
            data:[],
            nodata:false,
            showFeed:false
        }
    }
    componentWillMount(){
        
    }
    getData(){
        let page = this.state.page;
        getTouch({page:page}).then( res => {
            const { totalPage, page, list } = res.data.data;
            this.setState({
                data:list,
                totalPage:totalPage,
                page:page
            })
        })
    }
    componentDidMount(){
        this.getData();
        this.scrollLoad();
    }
    toFeed(){
        this.setState({
            showFeed:true
        })
    }
    saveFeed(){
        let nick = this.state.nick.trim();
        let email = this.state.email.trim();
        let friendlink = this.state.friendlink.trim();
        let feed = this.state.feed.trim();
        let emailExp = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
        let linkexp = /^((https|http):\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[/=?%\-&_~`@[\]':+!]*([^<>""])*$/;
        if(!nick){
            alert('请填写您的称呼');
            return;
        }
        if(!email||!emailExp.test(email)){
            alert('请填写邮箱或检查邮箱格式！');
            return;
        }
        if(friendlink&&!linkexp.test(friendlink)){
            alert('请填写正确的网址！');
            return;
        }
        if(!feed){
            alert('请填您需要留言的内容');
            return;
        }
        if(feed.length>120){
            alert('留言的内容需控制在120字以内');
            return;
        }
        let data = {
            nick:nick,
            email:email,
            friendlink:friendlink,
            feed:feed
        }
        putTouch(data).then( res => {
            this.setState({
                showFeed:false
            });
            this.getData();
        })
    }
    cancel(){
        this.setState({
            showFeed:false
        });
    }
    feedInp(type,e){
        let ckeck = type;
        let value = e.target.value;
        if(ckeck==="nick"){
            this.setState({
                nick:value
            })
        }
        if(ckeck==="email"){
            this.setState({
                email:value
            })
        }
        if(ckeck==="site"){
            this.setState({
                friendlink:value
            })
        }
        if(ckeck==="feed"){
            this.setState({
                feed:value
            })
        }
    }
    scrollLoad(){
        let wrap = document.querySelector(".wrap");
        let flag = true;
        wrap.addEventListener("scroll",() =>{
            console.log(1);
            let totalH = wrap.scrollHeight;
            let scrollH = wrap.scrollTop;
            let wrapH = wrap.offsetHeight;
            if(parseInt(this.state.totalPage)<=parseInt(this.state.page)){
                console.log(2);
                this.setState({
                    nodata:true
                })
            }
            if((scrollH+wrapH)+40>totalH&&flag&&parseInt(this.state.totalPage)>parseInt(this.state.page)){
                flag = false;
                this.setState({
                    page:parseInt(this.state.page)+1
                })
                this.getData()
            }
        })
    }
    render(){
        let { data } = this.state;
        const toFeed = (
            <div className='feedmask'>
                <div className="FeedLay">
                    <div className="inp-box">
                        <input type="text" placeholder="称呼*" name="nick" onChange={this.feedInp.bind(this,'nick')} defaultValue={this.state.nick} />
                        <input type="text" placeholder="邮箱(不会公开)*" onChange={this.feedInp.bind(this,'email')} name="email" defaultValue={this.state.email} />
                        <input type="text" placeholder="网址(非必填)" onChange={this.feedInp.bind(this,'site')} name="friendlink" defaultValue={this.state.friendlink} />
                    </div>
                    <div className="feetinp">
                        <textarea placeholder="内容(120字内)" onChange={this.feedInp.bind(this,'feed')} defaultValue={this.state.friendcon}></textarea>
                    </div>
                    <div className="lay-footer">
                        <button className="cancel-btn" onClick={this.cancel.bind(this)}>取消</button>
                        <button className="save-btn" onClick={this.saveFeed.bind(this)}>留言</button>
                    </div>
                </div>
            </div>
        )
        return (
            <div className="art-home">
                <div className="container">
                    <div className="feed-box">
                        {this.state.showFeed ? toFeed : null}
                        <div className="feedBtn"><button onClick={this.toFeed.bind(this)}>留个脚印</button></div>
                        <div className="feedlist">
                            {
                                data.length ? data.map( item => <div key={item.id} className="item">
                                                        <div className="feedtxt">{item.feed}</div>
                                                        <p>————{item.nick}</p>
                                                    </div>) : <p className="tip">暂无留言信息</p>
                            }
                        </div>
                        { data.length&&this.state.nodata ? <p className="tip">已经到底了</p>:null}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({ArtDet:state.ArtData});

const mapDispatchToProps =  {
        getArtDet
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtDet)