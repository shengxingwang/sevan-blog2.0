import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import asyncComponent from './../utils/asyncComponents';

import home from './../pages/home/home';
import Footer from './../components/footer';
import Errpage from './../pages/404/404';

const My = asyncComponent(() => import('../pages/my'));

export default class routeConfig extends Component{
    render(){
        return (
                <Router>
                    <div className="wrap">
                        <Switch>
                            <Route exact path='/' component={home} />
                            <Route path='/my' component={My} />
                            <Route component={Errpage}/>
                        </Switch>
                        <Footer/>
                    </div>
                </Router>
        )
    }
}


