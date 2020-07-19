/* eslint-disable import/prefer-default-export */

interface IdrawCalibrationProps {
  parts: 12 | 24 | 60 | 120
  size: [number, number, number?]
  textOffset?: number
}

interface IdrawClockOnePointerProps {
  parts: number
  postion: number
  offset?: {
    start?: number
    end?: number
  }
  lineWidth?: number
}

export default class Clock implements IClock {
  constructor(ctx: CanvasRenderingContext2D, options: { radius: number }) {
    this.ctx = ctx
    this.options = options
  }
  ctx: CanvasRenderingContext2D
  options: {
    radius: number
  }
  public drawClockBlank() {
    this.drawClockCalibration({
      parts: 24,
      size: [-18, -12, 3],
      textOffset: -20
    })
    this.drawClockCalibration({
      parts: 60,
      size: [-4, 0],
      textOffset: 20
    })
  };
  public drawClockPointer() {
    const ctx = this.ctx
    const { radius } = this.options
    //绘制表芯
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, 2 * Math.PI)
    ctx.fillStyle = "red"
    ctx.closePath();
    ctx.fill()
    //时针
    const now = new Date();
    const hours = new Date().getHours();
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()
    this.drawClockOnePointer({
      parts: 24,
      postion: hours + minutes / 60 + seconds / (60 * 60),
      offset: {
        start: -radius * 1.03,
        end: -radius * 0.4
      },
      lineWidth: 2
    })
    this.drawClockOnePointer({
      parts: 60,
      postion: minutes + seconds / 60,
      offset: {
        start: -radius * 1.05,
        end: -radius * 0.2
      },
      lineWidth: 1
    })
    this.drawClockOnePointer({
      parts: 60,
      postion: seconds,
      offset: {
        start: -radius * 1.1,
        end: radius * .1
      },
      lineWidth: 0.2
    })
  };
  private getRadian = (parts: number, count: number,) => -(2 * Math.PI / 360) * ((360 / parts * count + 180) % 360);
  private drawClockCalibration = (props: IdrawCalibrationProps) => {
    const ctx = this.ctx
    const { radius } = this.options
    const { parts, size: [inner, outer, size = 1], textOffset } = props
    // 绘制时刻度
    let x: number;
    let y: number;
    ctx.beginPath();
    for (let i = 0; i < parts; i++) {
      const radian = this.getRadian(parts, i)
      x = Math.sin(radian) * (radius + inner);
      y = Math.cos(radian) * (radius + inner);
      ctx.moveTo(x, y);
      x = Math.sin(radian) * (radius + outer);
      y = Math.cos(radian) * (radius + outer);
      ctx.lineTo(x, y);
      if (size) {
        ctx.lineWidth = size
      }
      if (textOffset) {
        x = Math.sin(radian) * (radius + outer + textOffset);
        y = Math.cos(radian) * (radius + outer + textOffset);
        ctx.fillText((i).toString(), x, y)
      }
    }
    ctx.stroke();
  }
  private drawClockOnePointer(props: IdrawClockOnePointerProps) {
    const ctx = this.ctx
    const { radius } = this.options
    const { parts, postion, offset = {}, lineWidth = 1 } = props
    const { start = 0, end = 0 } = offset
    let x, y;
    ctx.beginPath();
    const radian = this.getRadian(parts, postion)
    x = Math.sin(radian) * (radius + start);
    y = Math.cos(radian) * (radius + start);
    ctx.moveTo(x, y);
    x = Math.sin(radian) * (radius + end);
    y = Math.cos(radian) * (radius + end);
    ctx.lineTo(x, y);
    ctx.lineWidth = lineWidth
    ctx.stroke()
  }
}

