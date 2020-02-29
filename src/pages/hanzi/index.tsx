import React, { useState } from 'react';
import { NavBar, TextareaItem, } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
import '.'
import './index.scss';
import Matts from '../../components/matts';
import Help from '../../components/help/index';
declare var window: any;
window._czc = window._czc || [];
function App() {
  const [str, setWords] = useState(window.localStorage.getItem("current.words") || "");
  const size = parseInt(window.localStorage.getItem("setting.size"), 10) || 160
  const type = window.localStorage.getItem("setting.type") || "tian";
  const font = window.localStorage.getItem("setting.font-family") || "FZKTJW";
  const words = str.split("");

  return (
    <div className="App">

      <div style={{ marginTop: 45 }}>
        <TextareaItem
          style={{
            border: "1px dotted #CCC",
            padding: 5,
            fontFamily: font,
            maxHeight: 300,
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
        <div className="copybook-page">
          <div className="copybook-page-box" >
            {words.map((word: string, i: number) => <Matts type={type} font={font} size={size} key={i}>{word}</Matts>)}
          </div>
        </div>
        <div style={{
          color: "#999",
          margin: "10px",
          marginBottom: 40
        }}>
          字体版权： 方正字体库(https://www.foundertype.com/)
      </div>
      </div>

      <NavBar
        style={{
          position: "fixed",
          top: 0,
          width: "100%"
        }}
        rightContent={<Help />}
      >汉字字帖</NavBar>
    </div >

  );
}

export default App;
