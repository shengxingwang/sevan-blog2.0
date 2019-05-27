import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './style.css';

import Guid from './../../components/guid'
import asyncComponent from './../../utils/asyncComponents';
import Errpage from './../404/404';


const art = asyncComponent(() => import('./../art'));
const about = asyncComponent(() => import('./../about'));
const filelog = asyncComponent(() => import('./../filelog'));
const artItem = asyncComponent(() => import('../artItem'));
const feed = asyncComponent(() => import('../feed'));

class My extends Component{
    constructor(prop){
        super(prop);
        this.state = {
            tip:''
        }
    }
    render() {
        return (
            <Guid history={this.props.history}>
                <Switch>
                    <Route exact path='/my' component={art} />
                    <Route exact path='/my/arthome' component={art} />
                    <Route exact path='/my/arthome/:tid' component={art} />
                    <Route exact path='/my/about' component={about} />
                    <Route exact path='/my/filelog' component={filelog} />
                    <Route exact path='/my/itemArt/:id' component={artItem} />
                    <Route exact path='/my/feedme' component={feed} />
                    <Route component={Errpage} />
                </Switch>
            </Guid>
        );
    }
}

export default My;