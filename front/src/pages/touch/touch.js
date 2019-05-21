import React, {Component} from 'react';
import './touch.css';
import {putTouch} from "./../../api/api";

export default class Touch extends Component{
    state = {
        touchType:'',
        uName:'',
        job:'',
        comp:'',
        msgtxt:''
    };
    inputHande = (type, event) => {
        let val = event.target.value;
        switch (type) {
            case 'uName':
                this.setState({
                    uName:val.trim()
                });
                break;
            case 'touchType':
                this.setState({
                    touchType:val.trim()
                });
                break;
            case 'job':
                this.setState({
                    job:val.trim()
                });
                break;
            case 'comp':
                this.setState({
                    comp:val.trim()
                });
                break;
            case 'msgtxt':
                this.setState({
                    msgtxt:val.trim()
                });
                break;
            default:
                break;
        }
    };
    subForm = () => {
        let self = this;
        let data = this.state;
        if(!data.uName||!data.touchType||!data.msgtxt){
            alert('必填项不能为空,如称呼/联系方式/留言内容');
            return;
        }
        putTouch(this.state).then(res=>{
            if (res.data.code===200){
                alert('提交成功');
                self.setState({
                    touchType:'',
                    uName:'',
                    job:'',
                    comp:'',
                    msgtxt:''
                });
            }else {
                alert('提交失败');
            }
        });
    };
    render() {
        return (
            <div className='touch-box rig-container'>
                <h2 className='tit'>联系我：</h2>
                <div className='form-box'>
                    <div className='inp-item'>
                        <label>称呼：</label>
                        <input type='text'  value={this.state.uName} placeholder='姓名/称呼' onChange={this.inputHande.bind(this,'uName')} />
                    </div>
                    <div className='inp-item'>
                        <label>邮箱/微信/QQ：</label>
                        <input type='text' value={this.state.touchType} placeholder='邮箱/微信/QQ' onChange={this.inputHande.bind(this,'touchType')} />
                    </div>
                    <div className='inp-item'>
                        <label>职位：</label>
                        <input type='text' value={this.state.job} placeholder='您的职位' onChange={this.inputHande.bind(this,'job')}/>
                    </div>
                    <div className='inp-item'>
                        <label>所属公司：</label>
                        <input type='text' value={this.state.comp} placeholder='您的所在单位' onChange={this.inputHande.bind(this,'comp')}/>
                    </div>
                    <div className='inp-item'>
                        <label>留言：</label>
                        <textarea onChange={this.inputHande.bind(this,'msgtxt')} placeholder='对我说点啥吧！' value={this.state.msgtxt}></textarea>
                    </div>
                    <div className='inp-item'>
                        <button className='subBtn' onClick={this.subForm}>提交</button>
                    </div>
                </div>
            </div>
        );
    }
}