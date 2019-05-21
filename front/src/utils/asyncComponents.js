import React, { Component } from 'react';
import Loading from '../components/loading';

export default function asyncComponent(importComponent) {
    class AsyncComponent extends Component{
        constructor(props){
            super(props);
            this.state = {
                component:null
            };
        }
        async componentDidMount(){
            const {default: component } = await  importComponent();
            this.setState({component});
        }

        render(){
            const C = this.state.component;
            return C ? <C {...this.props} /> : <Loading {...this.props} />;
        }
    }
    return AsyncComponent;
}