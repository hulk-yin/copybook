import React, { useEffect } from 'react';
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
import '.'
import './index.scss';
import { drawClockBlank, drawClockPointer } from './utils';
import { Tag } from 'antd-mobile';
declare var window: any;
window._czc = window._czc || [];
const taskList = [{
  name: "睡觉",
  color: "#666666",
  start: new Date(2020, 7, 14, 21, 0, 0),
  end: new Date(2020, 7, 15, 7, 0, 0),
  imgUrl: "http://5b0988e595225.cdn.sohucs.com/images/20180112/cb26e3a85670493dab8f6dd2625b3e77.jpeg",
}, {
  name: "起床-早餐",
  color: "#faef7b",
  start: new Date(2020, 7, 15, 7, 0, 0),
  end: new Date(2020, 7, 15, 7, 30, 0)
},
{
  name: "晨读",
  color: "#c6fa7b",
  start: new Date(2020, 7, 15, 7, 30, 0),
  end: new Date(2020, 7, 15, 8, 30, 0)
}, {
  name: "作业时间",
  color: "#7bc6fa",
  start: new Date(2020, 7, 15, 9, 40, 0),
  end: new Date(2020, 7, 15, 11, 40, 0)
}, {
  name: "少年宫培训一",
  color: "#faaf7b",
  start: new Date(2020, 7, 15, 13, 0, 0),
  end: new Date(2020, 7, 15, 16, 40, 0)
}, {
  name: "少年宫培训二",
  color: "#7bc6fa",
  start: new Date(2020, 7, 15, 18, 0, 0),
  end: new Date(2020, 7, 15, 19, 15, 0)
}
]
function App() {
  useEffect(() => {
    const canvas: HTMLCanvasElement = document.querySelector(".clock-canvas") || document.createElement("canvas")
    const ctx = canvas.getContext("2d");
    canvas.width = Math.min(window.innerWidth, window.innerHeight)
    canvas.height = Math.min(window.innerWidth, window.innerHeight)
    let requestID:number;
    if (ctx) {
      const w = ctx.canvas.width;
      const h = ctx.canvas.height;
      const zX = w / 2;
      const zY = h / 2;
      ctx.translate(zX, zY);
      const LayerBack = document.createElement("canvas");
      LayerBack.width = w;
      LayerBack.height = h;
      const ctxLayerBack = LayerBack.getContext("2d");
      const radius = Math.min(w, h) / 2 * .9 - 20;
      if (ctxLayerBack) {
        ctxLayerBack.translate(zX, zY)
        drawClockBlank(ctxLayerBack, { radius });
      }

      const LayerPointer = document.createElement("canvas");
      LayerPointer.width = w;
      LayerPointer.height = h;
      const ctxLayerPointer = LayerPointer.getContext("2d");
      if (ctxLayerPointer) {
        ctxLayerPointer.translate(zX, zY)
      }
      const drawShand = () => {
        if (ctx) {
          ctx.clearRect(-zX, -zY, 2 * zX, 2 * zY);
          if (ctxLayerPointer) {
            ctxLayerPointer.clearRect(-zX, -zY, 2 * zX, 2 * zY);
            drawClockPointer(ctxLayerPointer, {
              radius,
              taskList
            });
          }
          ctx.globalCompositeOperation = "destination-over"
          ctx.drawImage(LayerPointer, -zX, -zY)
          ctx.drawImage(LayerBack, -zX, -zY)
        }
        requestID= requestAnimationFrame(drawShand)
      }
      drawShand()
    }
    return ()=>{
      cancelAnimationFrame(requestID)
      // clearImmediate(rafHandler)
    }
  }, [])
  return (
    <div className="clock">
      <div id="img-container" style={{ display: "none" }}></div>
      {taskList.map(item => <Tag key={item.name} style={{ backgroundColor: item.color }} >{item.name}</Tag>)}
      <canvas className='clock-canvas'>
      </canvas>
    </div >
  );
}

export default App;
