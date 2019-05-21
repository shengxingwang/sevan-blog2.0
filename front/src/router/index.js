import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import asyncComponent from './../utils/asyncComponents';

import home from './../pages/home/home';
import Footer from './../components/footer';
import Errpage from './../pages/404/404';

const My = asyncComponent(() => import('../pages/my'));

// const about = asyncComponent(() => import('../pages/about/about'));
// const news = asyncComponent(() => import('../pages/news/news'));
// const arthome = asyncComponent(() => import('../pages/arthome'));
// const touch = asyncComponent(() => import('../pages/touch/touch'));

export default class routeConfig extends Component{
    render(){
        return (
                <Router>
                    <div className="wrap">
                        <Switch>
                            <Route exact path='/' component={home} />
                            <Route path='/my' component={My} />
                            {/* <Route path='/news' component={news} /> */}
                            {/* <Route path='/shows' component={shows} /> */}
                            {/* <Route path='/touch' component={touch} /> */}
                            <Route component={Errpage}/>
                        </Switch>
                        <Footer/>
                    </div>
                </Router>
        )
    }
}


