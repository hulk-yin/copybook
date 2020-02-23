import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import './font.css';
import Matts from './matts';
function App() {
  const [str, setWords] = useState("春风冬雪花飞入");
  const [size, setSize] = useState(200);
  const [type, setType] = useState("tian");
  const [font, setFont] = useState("FZKTJW");
  const words = str.split("");
  const fonts = [{
    label: "方正楷体简体",
    fontname: "FZKTJW",
    offset: { x: 1, y: 1.09 }
  }, {
    label: "方正新楷体简体",
    fontname: "FZXKTJW"
  }]
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button
            onClick={() => setSize(Math.max(30, size - 10))}
          >-</button>{size}<button
            onClick={() => setSize(Math.min(300, size + 10))}
          >+</button>
          &nbsp;
          &nbsp;
          <button
            onClick={() => {
              setWords("");
              setType('tian')
              requestAnimationFrame(() => {
                setWords(str);
              })
            }}
          >田字格</button>
          <button
            onClick={() => {
              setWords("");
              setType('mi')
              requestAnimationFrame(() => {
                setWords(str);
              })
            }}
          >米字格</button>
          选择字体
          <select
            value={font}
            onChange={(e) => {
              setWords("");
              setFont(e.target.value)
              requestAnimationFrame(() => {
                setWords(str);
              })
            }}
          >
            {fonts.map((item) => (<option
              key={item.fontname}
              // selected={font === item.fontname}
              value={item.fontname}
            >
              {item.label}
            </option>))}
          </select>
        </div>
        <input className="words-input"
          defaultValue={str}
          placeholder="在这里输入要生成字体的文字"
          onChange={(e) => {
            setWords(e.target.value)
          }}>
        </input>
      </header>
      <div className="copybook-page">
        {words.map((word, i) => <Matts type={type} font={font} size={size} key={i}>{word}</Matts>)}
      </div>
    </div>
  );
}

export default App;
