import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import loading from '../components/loading';
import loadAble from 'react-loadable';
import Layout from '../components/layout'


const loadComponent = (name) => loadAble({
  loader: () => import(`./${name}`),
  loading
})
class App extends Component {
  render() {
    return (
        <Layout history={this.props.history}>
            <Switch>
                <Route exact path="/home" component={loadComponent('articleList')}/>
                <Route exact path="/home/artlist" component={loadComponent('articleList')}/>
                <Route exact path="/home/addart" component={loadComponent('addArticle')}/>
                <Route exact path="/home/edite/:id" component={loadComponent('editeArticle')}/>
                <Route exact path="/home/taglist" component={loadComponent('taglist')}/>
                <Route exact path="/home/addnews" component={loadComponent('addNews')}/>
                <Route exact path="/home/newslist" component={loadComponent('newsList')}/>
                <Route exact path="/home/msglsit" component={loadComponent('msgLsit')}/>
                <Route exact path="/home/skitch" component={loadComponent('skitch')}/>
                <Route exact path="/home/classify" component={loadComponent('classify')}/>
                <Route component={loadComponent('404')}/>
            </Switch>
        </Layout>
    );
  }
}

export default App;
