import React, { Component } from 'react';
import SideInfo from './../../components/sideInfo';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import './style.css';
import { getGuiDang } from './../../store/actions'

class FileLog extends Component{
    constructor(prop){
        super(prop);
        this.state = {
            page:1
        }
    }
    componentWillMount(){
        this.props.getGuiDang();
    }
    render(){
        let dateData = this.props.dateData.dateData;
        const sublist = data => data.split("|").map( (item,i) => <dd key={i}><Link to={`/my/itemArt/${item.split("-")[1]}`}>{item.split("-")[0]}</Link></dd>)
        const list = (
            dateData.length ? dateData.map((item,i) => <dl key={i}><dt>{item.create_at}({item.cnt})</dt>{sublist(item.title)}</dl>):null
        )

        return(
            <div className="art-home">
                <div className="container">
                    <div className="left-con">
                        {list}
                    </div>
                    <SideInfo></SideInfo>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({dateData:state.dateData});

const mapDispatchToProps = {
    getGuiDang
}

export default connect(mapStateToProps,mapDispatchToProps)(FileLog);