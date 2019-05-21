import React,{ Component } from 'react'
import './style.css'

class scrollBar extends Component{
    state = {
        showFlag:false,
    }

    backTop(){
        let timer =  setInterval(() => {
            let wrap = document.querySelector(".wrap");
            let dis = wrap.scrollTop;
            if(dis>0){
                wrap.scrollTo(0,dis-40);
            }else{
                clearInterval(timer);
            }
        }, 10);
        
    }

    scrollFun(){
        let wrap = document.querySelector(".wrap");
        wrap.addEventListener('scroll',()=>{
            let sh = wrap.scrollTop||document.documentElement.scrollTop;
            if(sh>200){
                this.setState({
                    showFlag:true
                })
            }else{
                this.setState({
                    showFlag:false
                })
            }
        })
    }

    componentDidMount(){
        this.scrollFun();
    }

    render(){
        return (
                this.state.showFlag ? <div className="scroll-box">
                    <div className="back-top" onClick={this.backTop.bind(this)}></div>
                </div> : null
        )
    }
}

export default scrollBar;