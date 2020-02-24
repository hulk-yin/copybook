import React from 'react';
import HanziWriter from '../hanzi-writer/index';

export default class Copybook extends React.Component {
    state = {
        visible: false
    }
    componentDidMount() {
        this.drawWord();
    }
    componentDidUpdate(oldProps) {
        this.ctx.save();
        const propNames = ["children", "size", 'type', "font"]
        if (propNames.some((name) => oldProps[name] !== this.props[name])) {
            requestAnimationFrame(() => {
                this.drawWord();
            })
        }
    }
    drawWord() {
        const { size } = this.props
        this.ctx.restore();
        this.ctx.clearRect(0, 0, size, size);
        const { type, children: word, } = this.props;
        switch (type) {
            case "mi":
                this.drawMWord();
                break;
            default:
                this.drawMatts();
        }
        this.setWord(word);

    }
    drawMatts() {
        const { size } = this.props
        var ctx = this.ctx;
        ctx.strokeStyle = "#0000ff";
        ctx.strokeRect(1, 1, size - 2, size - 2);
        this.ctx.setLineDash([size / 40, size / 40])
        // ctx.strokeRect(size / 4, size / 4, size / 2, size / 2);
        ctx.moveTo(size / 2, 0);
        ctx.lineTo(size / 2, size);
        ctx.stroke();
        ctx.moveTo(0, size / 2);
        ctx.lineTo(size, size / 2);
        ctx.stroke();
    }
    drawArc() {
        const { size } = this.props
        this.drawMWord();
        this.ctx.moveTo(size / 2, size / 2);
        // this.ctx.arc(100,100,70,0,2*Math.PI);
        this.ctx.stroke();
    }
    drawMWord() {
        const { size } = this.props
        this.drawMatts();
        this.ctx.setLineDash([size / 40, size / 40])
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(size, size);
        this.ctx.stroke();
        this.ctx.moveTo(0, size);
        this.ctx.lineTo(size, 0);
        this.ctx.stroke();
    }
    setWord(word) {
        const { size, font } = this.props
        this.ctx.textAlign = "center"
        this.ctx.textBaseline = "middle"
        this.ctx.font = size * 0.7 + "px " + font;
        this.ctx.fillText(word, size / 2, size / 2 * 1.09);
    }

    render() {
        const { size, children } = this.props
        const { visible } = this.state;
        return <div>        <canvas height={size} width={size}
            onClick={() => {
                this.setState({ visible: true })
            }}
            ref={(canvas) => {
                if (canvas)
                    this.ctx = canvas.getContext("2d")
            }}
        ></canvas >
            <HanziWriter
                visible={visible}
                onClose={() => {
                    this.setState({ visible: false })
                }}
            >{children}</HanziWriter>
        </div>
    }
}
