import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import { Picker, Stepper, TextareaItem, Button, Icon } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
import './App.css';
import './font.css';
import Matts from './matts';
const BrowerLogger = require('alife-logger');
const __bl = BrowerLogger.singleton({pid:"d225hao5sm@01ab9cd471ac7f9",appType:"web",imgUrl:"https://arms-retcode.aliyuncs.com/r.png?",sendResource:true,enableLinkTrace:true,behavior:true});

function App() {
  const [str, setWords] = useState(``);
  const [size, setSize] = useState(160);
  const [type, setType] = useState("tian");
  const [font, setFont] = useState("FZKTJW");
  const [loadingFont, setLoadingFont] = useState(true)
  useEffect(() => {
    const isLoad = document.fonts.check(size * 0.7 + "px " + font)
    setLoadingFont(!isLoad)
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
  const fonts = [{
    label: "方正楷体简体",
    value: "FZKTJW",
    offset: { x: 1, y: 1.09 }
  }, {
    label: "方正新楷体简体",
    value: "FZXKTJW"
  }, {
    label: "书体坊王羲之楷",
    value: "STFWXZKJW"
  }, {
    label: "方正手迹-丁谦硬笔楷书",
    value: "FZSJ-DQYBKSJW"
  }].map(({ label, value }) => ({
    label: <font style={{
      fontFamily:value
    }}>{label}</font>,
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
            onChange={setSize}
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
                setFont(v[0])
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
    </div>
  );
}

export default App;
