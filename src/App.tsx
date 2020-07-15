import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'

// import logo from './logo.svg';
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
import './App.css';
import Hanzi from './pages/hanzi/index';
import Setting from './pages/setting'
import Layout from './layout/index'
import Inspect from './pages/inspect';
import Clock from './pages/clock';
// declare var global: any;
declare var window: any;

// global = window;
window._czc = window._czc || [];

function App() {
  return (
    <div>
      <HashRouter>
        <Switch>
          {/* <Route path="/" >
            <Redirect to='/hanzi' />
          </Route> */}
          <Redirect exact path="/" to="/hanzi" />
          <Route path="/" children={(props: JSX.IntrinsicAttributes & { [x: string]: any; children: any; history: any; location: any; }) => <Layout {...props} >
            <Route path='/hanzi' component={Hanzi} />
            <Route path='/setting' component={Setting} />
            <Route path='/clock' component={Clock} />
            <Route path='/inspect' component={Inspect} />
            {/* <Route path='/mine' component={Mine} /> */}
          </Layout>} />
        </Switch>
      </HashRouter>
    </div>
  )
}


export default App;
