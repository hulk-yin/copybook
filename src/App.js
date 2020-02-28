import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'

// import logo from './logo.svg';
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
import './App.css';
import Hanzi from './pages/hanzi';
import Setting from './pages/setting'
import Layout from './layout/index'
window._czc = window._czc || [];

function App() {
  return (
    <div>
      <HashRouter history={window.history}>
        <Switch>
          {/* <Route path="/" >
            <Redirect to='/hanzi' />
          </Route> */}
          <Redirect exact path="/" to="/hanzi" />
          <Route path="/" children={(props) => <Layout {...props} >
            <Route path='/hanzi' component={Hanzi} />
            <Route path='/setting' component={Setting} />
            {/* <Route path='/activities' component={Activities} /> */}
            {/* <Route path='/videos' component={Videos} /> */}
            {/* <Route path='/mine' component={Mine} /> */}
          </Layout>} >
          </Route>
        </Switch>

      </HashRouter>
    </div>
  )
}


export default App;
