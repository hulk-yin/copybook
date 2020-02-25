import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import { TabBar } from 'antd-mobile';

// import logo from './logo.svg';
import { NavBar } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
import './App.css';
import './font.css';
import Hanzi from './pages/hanzi/index';
import Layout from './layout/index'
window._czc = window._czc || [];

function App() {
  return (
    <div>
      <HashRouter history={window.history}>
        <Switch>

          <Route path="/" children={(props) => <Layout {...props} >
            <Route to='/' component={Hanzi} />
            {/* <Route path='/hanzi' component={Hanzi} /> */}
            {/* <Route path='/zimu' component={Hanzi} /> */}
            {/* <Route path='/activities' component={Activities} /> */}
            {/* <Route path='/videos' component={Videos} /> */}
            {/* <Route path='/mine' component={Mine} /> */}
          </Layout>} />
        </Switch>

      </HashRouter>
    </div>
  )
}


export default App;
