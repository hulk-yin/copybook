import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import { Picker, Stepper, TextareaItem, Button } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
import './App.css';
import './font.css';
import Matts from './matts';
function App() {
  const [str, setWords] = useState("春风冬雪花飞入");
  const [size, setSize] = useState(60);
  const [type, setType] = useState("tian");
  const [font, setFont] = useState("FZKTJW");

  useEffect(() => {
    const isLoad = document.fonts.check(size * 0.7 + "px " + font)
    if (!isLoad) {
      const fontInterval = setInterval(() => {
        const isLoad = document.fonts.check(size * 0.7 + "px " + font)
        if (isLoad) {
          setWords("");
          requestAnimationFrame(() => {
            setWords(str);
          })
          clearInterval(fontInterval)
        }
      }, 100)
    }

  })
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
  }]
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Stepper
            showNumber
            max={300}
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
              icon={type === "tian" ? "check-circle-o":"ellipsis"}
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
              icon={type === "mi" ? "check-circle-o":"ellipsis"}
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
              <Button>
                选择字体-{fonts.filter(({ value }) => value === font).map(({ label }) => label)}</Button>
            </Picker>
          </div>
        </div>

        <TextareaItem
            placeholder="在这里输入要生成字体的文字"
            defaultValue={str}
            onChange={setWords}
            autoHeight
          />
      </header>
      <div className="copybook-page">
        {words.map((word, i) => <Matts type={type} font={font} size={size} key={i}>{word}</Matts>)}
      </div>
    </div>
  );
}

export default App;
