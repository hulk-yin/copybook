import React from 'react';
import { TabBar, } from 'antd-mobile';
import Icon from '../components/icons/index';
interface LayoutProps {
  children: any;
  history: any;
  location: any;
}
export default ({ children, history, location, ...props }: LayoutProps) => {
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
            icon={<Icon size="large" type="zhong-o" />}
            selectedIcon={<Icon size="large" type="zhong" />}
            selected={pathname === "/" || pathname === '/hanzi'}
            onPress={() => {
              history.push("/hanzi")
              // browserHistory.push('/questions')
            }}
          >
            {pathname === '/hanzi' ? children : null}
          </TabBar.Item>
          {/* <TabBar.Item
            title='检测'
            key='inspect'
            icon={<Icon size="large" type="scan" />}
            selectedIcon={<Icon size="large" type="scan" />}
            selected={pathname === '/inspect'}
            onPress={() => {
              history.push("/inspect")
            }}>
            {pathname === '/inspect' ? children : null}
          </TabBar.Item> */}
          <TabBar.Item
            title='设置'
            key='setting'
            icon={<Icon size="large" type="setting" />}
            selectedIcon={<Icon size="large" type="setting" />}
            selected={pathname === '/setting'}
            onPress={() => {
              history.push("/setting")
            }}
          >
            {pathname === '/setting' ? children : null}
          </TabBar.Item>
        </TabBar>
      </div >
    </div>

  )
}