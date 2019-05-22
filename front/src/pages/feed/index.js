import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getArtDet } from './../../store/actions';
import { lookhot } from './../../api/api';
import './style.css';

class ArtDet extends Component{
    constructor(props){
        super(props)
        this.state = {
            nick:'',
            email:'',
            friendlink:'',
            page:1
        }
    }
    componentDidMount(){
        let id = this.props.match.params.id;
        this.props.getArtDet({id:id});
        lookhot({id:id});
        console.log(id);
    }
    componentDidUpdate(){
    }
    render(){
        let { art } = this.props.ArtDet
        return (
            <div className="art-home">
                <div className="container">
                    <div className="feedBtn">留个脚印</div>
                    <div className=""></div>
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