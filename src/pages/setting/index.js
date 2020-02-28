import React, { useState } from 'react';
// import logo from './logo.svg';
import { Picker, Stepper, Button, SegmentedControl, WhiteSpace, WingBlank, NavBar } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'

import fontList from './font-list';
// import './App.css';
import './index.css';

window._czc = window._czc || [];
let sizeTimer;
export default () => {
  const [size, setSize] = useState(parseInt(window.localStorage.getItem("setting.size"), 10) || 60);
  const [type, setType] = useState(window.localStorage.getItem("setting.type") || "tian");
  const [font, setFont] = useState(window.localStorage.getItem("setting.font-family") || "FZKTJW");
  const fonts = fontList.map(({ label, value }) => ({
    label:label,
    labelText: label,
    value
  }))
  return (
    <div className="App">
      <NavBar >设置</NavBar>
      <div>
        <WhiteSpace />
        <WingBlank>
          <Stepper
            showNumber
            max={window.visualViewport ?
              Math.floor((window.visualViewport.width - (40 * 2)) / 10) * 10
              : 300}
            min={40}
            value={size}
            step={10}
            onChange={(v) => {
              window.localStorage.setItem("setting.size", v);
              clearTimeout(sizeTimer);
              sizeTimer = setTimeout(() => {
                window._czc && window._czc.push(["_trackEvent", "setting", "size", '字体大小', v, 'stepper']);
              }, 3000)
              setSize(v)
            }}
          />
        </WingBlank>
        <WhiteSpace />
        <WingBlank>
          <SegmentedControl
            values={(["田字格", "米字格"])}
            selectedIndex={type === 'mi' ? 1 : 0}
            onChange={(e) => {
              const { selectedSegmentIndex: v, value: label } = e.nativeEvent;
              const type = v === 1 ? "mi" : "tian";
              setType(type)
              window.localStorage.setItem("setting.type", type)
              window._czc && window._czc.push(["_trackEvent", "setting", "type", label, 1, 'bt_' + type]);
            }}
          />
        </WingBlank>
        <WhiteSpace />
        <WingBlank>
          <Picker
            data={fonts}
            value={[font]}
            cols={1}
            onOk={v => {
              const value = v[0];
              window.localStorage.setItem("setting.font-family",value) 
              const label = fonts.filter(({ value }) => value === v[0]).map(({ labelText }) => labelText)[0]
              window._czc && window._czc.push(["_trackEvent", "setting", "font", label, 1, 'font_select']);
              setFont(value)
            }}
          >
            <Button style={{
              fontFamily: font
            }}>
              选择字体-{fonts.filter(({ value }) => value === font).map(({ label }) => label)}</Button>
          </Picker>
        </WingBlank>
      </div>
    </div >
  );
} 