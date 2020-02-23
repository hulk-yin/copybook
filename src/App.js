import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import Matts from './matts';
function App() {
  const [str, setWords] = useState("你好！");
  const [size, setSize] = useState(200);
  const [type, setType] = useState("tian");
  const words = str.split("");
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
            onClick={() =>{
              const s= str;
              setWords("");
              setType('tian')
              requestAnimationFrame(()=>{
                setWords(s);
              })
            }}
          >田字格</button>
          <button
            onClick={() => {
              const s= str;
              setWords("");
              setType('mi')
              requestAnimationFrame(()=>{
                setWords(s);
              })
            }}
          >米字格</button>
        </div>
        <input className="words-input"
          defaultValue={str}
          onChange={(e) => {
            setWords(e.target.value)
          }}>
        </input>
      </header>
      <div className="copybook-page">
        {words.map((word, i) => <Matts type={type} size={size} key={i}>{word}</Matts>)}
      </div>
    </div>
  );
}

export default App;
