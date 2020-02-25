import React from 'react';
import { TabBar, NavBar, Drawer } from 'antd-mobile';
import { useHistory } from 'react-router-dom';

export default ({ children, history, location, ...props }) => {
  const pathname = location.pathname
  // const history = useHistory();
  return (
    <div>
    
      <div
        // style={{ position: 'fixed', height: 'calc(100% - 45px)', width: '100%', top: 45 }}
        style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}
        >
        <TabBar
          unselectedTintColor='#949494'
          tintColor='#33A3F4'
          barTintColor='white'
        >
          <TabBar.Item
            title='汉字'
            key='hanzi'
            icon={<div className='questions-icon' />}
            selectedIcon={<div className='questions-selected-icon' />}
            selected={pathname === "/" || pathname === '/hanzi'}
            onPress={() => {
              history.push("/hanzi")
              // browserHistory.push('/questions')
            }}
          >
            {pathname === "/" || pathname === '/hanzi' ? children : null}
          </TabBar.Item>
          {/* <TabBar.Item
            title='字母'
            key='zimu'
            icon={<div className='activities-icon' />}
            selectedIcon={<div className='activities-selected-icon' />}
            selected={pathname === '/zimu'}
            onPress={() => {
              history.push("/zimu")
              // browserHistory.push('/activities')
            }}
          >
            {pathname === '/zimu' ? children : null}
          </TabBar.Item> */}
        </TabBar>
      </div >
    </div>

  )
}