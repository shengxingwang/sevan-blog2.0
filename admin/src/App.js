import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import loading from './components/loading';
import loadAble from 'react-loadable';
import './static/css/init.css';
import './static/less/gloable.less';


const loadComponent = (name) => loadAble({
  loader: () => import(`./pages/${name}`),
  loading
})
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={loadComponent('login')}/>
            <Route path="/home" component={loadComponent('home')}/>
            {/* <Route path="/addart" component={loadComponent('addArticle')}/>
            <Route path="/artlist" component={loadComponent('articleList')}/>
            <Route path="/edite/:id" component={loadComponent('editeArticle')}/>
            <Route path="/taglist" component={loadComponent('taglist')}/>
            <Route path="/skitch" component={loadComponent('skitch')}/>
            <Route path="/classify" component={loadComponent('classify')}/> */}
            <Route component={loadComponent('404')}/>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
