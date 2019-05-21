import React,{Component} from 'react';
import './alert.css';
import PropTypes from 'prop-types';

export default class Message extends Component{

    static propTypes = {
        isOpen:PropTypes.bool.isRequired,
        isControl:PropTypes.bool.isRequired,
        alCon:PropTypes.string.isRequired,
        closeAlert:PropTypes.func,
    };

    closeLayout(){
        this.props.closeAlert();
    };

    render() {
        return (
            this.props.isOpen&&<div className='layout'>
                    <div className={this.props.isControl?'alert-box':'alert-tip'}>
                        {this.props.isControl&&<i className='closebtn' onClick={this.closeLayout.bind(this)}></i>}
                        <div className='aler-con'>
                            <div dangerouslySetInnerHTML={{__html: this.props.alCon}}></div>
                        </div>
                    </div>
                </div>
        );
    }

};