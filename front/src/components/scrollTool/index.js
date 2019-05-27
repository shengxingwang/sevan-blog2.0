import React,{ Component } from 'react'
import './style.css';

var timer = null;
class scrollBar extends Component{
    state = {
        // showFlag:false,
        name:"scroll"
    }

    backTop(){
        clearInterval(timer);
        timer =  setInterval(() => {
            let wrap = document.querySelector(".wrap");
            let dis = wrap.scrollTop;
            if(dis>0){
                wrap.scrollTo(0,dis-40);
            }else{
                clearInterval(timer);
            }
        }, 10);
        
    }

    // scrollFun(){
    //     let wrap = document.querySelector(".wrap");
    //     wrap.addEventListener('scroll',()=>{
    //         let sh = wrap.scrollTop;
    //         if(sh>200){
    //             this.setState({
    //                 showFlag:true
    //             })
    //         }
    //     })
    // }

    componentDidMount(){
    }

    render(){
        return (
                 <div className="scroll-box">
                    <div className="back-top" onClick={this.backTop.bind(this)}></div>
                </div>
        )
    }
}

export default scrollBar;