import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import { Picker, NavBar, Drawer, List, Stepper, TextareaItem, Button, Icon, SegmentedControl, WhiteSpace, WingBlank } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
import '.'
// import './App.css';
// import './font.css'; 
import Matts from '../../components/matts/index';
import Help from '../../components/help/index';

window._czc = window._czc || [];
let sizeTimer;
const Setting = () => {

  return <React.Fragment>


  </React.Fragment>
}
function App() {
  const [str, setWords] = useState(window.localStorage.getItem("current.words") || "");
  const [size, setSize] = useState(parseInt(window.localStorage.getItem("current.size"), 10) || 160);
  const [type, setType] = useState("tian");
  const [font, setFont] = useState("FZKTJW");
  const [loadingFont, setLoadingFont] = useState(true)
  const [docked, setDocked] = useState(false);

  useEffect(() => {
    const isLoad = document.fonts.check(size * 0.7 + "px " + font)
    setLoadingFont(!isLoad);
    if (!isLoad) {
      const fontInterval = setInterval(() => {
        const isLoad = document.fonts.check(size * 0.7 + "px " + font)
        if (isLoad) {
          setLoadingFont(!isLoad)
          clearInterval(fontInterval)
          setWords("");
          setTimeout(setWords, 30, str)
        }
      }, 100)
    }

  }, [size, font, str])
  const words = str.split("");
  // 字体来源：https://www.foundertype.com/
  const fonts = [{
    label: "方正楷体简体",
    value: "FZKTJW",
    offset: { x: 1, y: 1.09 }
  }, {
    label: "方正新楷体简体",
    value: "FZXKTJW"
    // }, {
    //   label: "田英章楷书",
    //   value: "TYZKSJW"
    // }, {
    //   label: "方正硬笔楷书简体",
    //   value: "FZYBKSJW",
    // }, {
    //   label: "庞中华钢笔字体",
    //   value: "PZHGBZTJW",
  }, {
    label: "方正字迹-仿颜简体	",
    value: "FZZJ-FYJW"
  }, {
    label: "书体坊王羲之楷",
    value: "STFWXZKJW"
  },
    // {
    //   label: "方正手迹-丁谦硬笔楷书",
    //   value: "FZSJ-DQYBKSJW"
    // }
  ].map(({ label, value }) => ({
    label: <font style={{
      fontFamily: value
    }}>{label}</font>,
    labelText: label,
    value
  }))
  return (
    <div className="App">
      <NavBar
        rightContent={
          <React.Fragment>
            <Help />
            <i
              onTouchEnd={() => {
                console.log("123");
                setDocked(!docked)
              }}
              className="iconfont icon-setting" />
          </React.Fragment>
        }
      >字帖生成</NavBar>
      <div style={{ marginTop: 0, }}>
        <Drawer
          position="top"
          style={{ top: 45, minHeight: document.documentElement.clientHeight - 45 }}
          contentStyle={{ color: '#A6A6A6', backgroundColor: "#edfbf6", textAlign: 'center', }}
          sidebarStyle={{ border: '1px solid #ddd' }}
          docked={docked}
          sidebar={<List className="App-header">
            <List.Item>
              <div>
                <WhiteSpace />
                <WingBlank>
                  <Stepper
                    showNumber
                    max={400}
                    min={40}
                    value={size}
                    step={10}
                    onChange={(v) => {
                      clearTimeout(sizeTimer);
                      sizeTimer = setTimeout(() => {
                        window.localStorage.setItem("current.size", v);
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
                      setWords("");
                      const type = v === 1 ? "mi" : "tian";
                      setType(type)
                      window._czc && window._czc.push(["_trackEvent", "setting", "type", label, 1, 'bt_' + type]);
                      requestAnimationFrame(() => {
                        setWords(str);
                      })
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
            </List.Item>
          </List>}
        >

          <TextareaItem
            style={{
              border: "1px dotted #CCC",
              padding: 5,
              fontFamily: font,
              maxHeight: 300
            }}
            placeholder="在这里输入要生成字体的文字"
            defaultValue={str}
            onChange={setWords}
            onBlur={(v) => {
              window.localStorage.setItem("current.words", v);
              setWords(v)
            }}
            autoHeight
          />
          {loadingFont ? <div>
            <Icon type="loading" />
            加载字体，请耐心等待
      </div>
            : null}
          <div className="copybook-page" onTouchEnd={() => setDocked(false)}>
            {words.map((word, i) => <Matts type={type} font={font} size={size} key={i}>{word}</Matts>)}
          </div>

          <div style={{
            color: "#999",
            margin: "10px",
            marginBottom: 40
          }}>
            字体版权： 方正字体库(https://www.foundertype.com/)
      </div>
        </Drawer>
      </div>
    </div >
  );
}

export default App;