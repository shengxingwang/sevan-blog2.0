import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getArtDet } from './../../store/actions';
import { lookhot } from './../../api/api';
import './style.css';

class ArtDet extends Component{
    constructor(props){
        super(props)
        this.state = {
            title:'zz'
        }
    }
    componentDidMount(){
        let id = this.props.match.params.id;
        this.props.getArtDet({id:id});
        lookhot({id:id});
    }
    componentDidUpdate(){
        window.initHtml();
    }
    hilgLight(){
        document.querySelectorAll('pre code').forEach((block) => {
        //    hljs.highlightBlock(block);
        });
    }
    render(){
        let { art } = this.props.ArtDet
        return (
            <div className="art-home">
                <div className="container">
                    <div className="art-content">
                        <h2 className="title">{art.title}</h2>
                        <div className="con-txt marked-box" dangerouslySetInnerHTML={{__html:art.editContent}}></div>
                        <div className="art-info">
                            <p className=""><span className="t">时间：</span><span className="v">{art.create_at}</span></p>
                            <p className=""><span className="t">作者：</span><span className="v">sevan</span></p>
                        </div>
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