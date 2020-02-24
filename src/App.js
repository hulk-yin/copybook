import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import { Picker, Stepper, TextareaItem, Button, Icon, } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
import './App.css';
import './font.css';
import Matts from './matts';
import Help from './components/help/index';
window._czc = window._czc || [];
function App() {
  const [str, setWords] = useState(``);
  const [size, setSize] = useState(160);
  const [type, setType] = useState("tian");
  const [font, setFont] = useState("FZKTJW");
  const [loadingFont, setLoadingFont] = useState(true)
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
    labelText:label,
    value
  }))
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Stepper
            showNumber
            max={400}
            min={40}
            value={size}
            step={10}
            onChange={(v) => {
              window._czc && window._czc.push(["_trackEvent", "setting", "size", '字体大小', v, 'stepper']);
              setSize(v)
            }}
          />
          &nbsp;
          &nbsp;
          <div>
            <Button
              inline
              size="small"
              type="ghost"
              icon={type === "tian" ? "check-circle-o" : "ellipsis"}
              onClick={() => {
                setWords("");
                setType('tian')
                window._czc && window._czc.push(["_trackEvent", "setting", "type", '田字格', 1, 'bt_tian']);

                requestAnimationFrame(() => {
                  setWords(str);
                })
              }}
            >田字格</Button>
            <Button
              inline
              size="small"
              type="ghost"
              icon={type === "mi" ? "check-circle-o" : "ellipsis"}
              onClick={() => {
                window._czc && window._czc.push(["_trackEvent", "setting", "type", '米字格', 1, 'bt_mi']);
                // _czc.push(["_trackEvent",category,action,label,value,nodeid]);

                setWords("");
                setType('mi')
                requestAnimationFrame(() => {
                  setWords(str);
                })
              }}
            >米字格</Button>

          </div>
          <div>
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
          </div>
        </div>
        <TextareaItem
          placeholder="在这里输入要生成字体的文字"
          defaultValue={str}
          onChange={setWords}
          onBlur={setWords}
          autoHeight
        />
      </header>
      {loadingFont ? <div>
        <Icon type="loading" />
        加载字体，请耐心等待
      </div>
        : null}
      <div className="copybook-page">
        {words.map((word, i) => <Matts type={type} font={font} size={size} key={i}>{word}</Matts>)}
      </div>
      <Help />
      <div style={{
        color: "#999",
        margin: "10px"
      }}>
        字体版权： 方正字体库(https://www.foundertype.com/)
      </div>
    </div>
  );
}

export default App;
