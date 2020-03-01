import React from 'react';
import HanziWriter from '../hanzi-writer';

export default class Copybook extends React.Component<{ size: number, font: string, type: string, children: string }> {
    state = {
        visible: false
    }
    render() {
        const { size, type, font: fontFamily, children } = this.props
        const { visible } = this.state;
        return <div

        >
            <svg
                onClick={() => {
                    this.setState({ visible: true })
                }}
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    margin: 2,
                    border: "1px solid #999999"
                }}
                width={size}
                height={size}
                id="grid-background-target">
                <g id="matts">
                    {type === "mi" ? <React.Fragment>
                        <line x1="0" y1="0" x2={size} y2={size} strokeDasharray={`${size / 60} ${size / 100}`} stroke="#DDD" />
                        <line x1={size} y1="0" x2="0" y2={size} strokeDasharray={`${size / 60} ${size / 100}`} stroke="#DDD" />
                    </React.Fragment> : null}
                    <line x1={size / 2} y1="0" x2={size / 2} y2={size} strokeDasharray={`${size / 60} ${size / 100}`} stroke="#DDD" />
                    <line x1="0" y1={size / 2} x2={size} y2={size / 2} strokeDasharray={`${size / 60} ${size / 100}`} stroke="#DDD" />
                </g>
                <text
                    x={size * 0.5}
                    y={size * 0.5 * 1.22}
                    style={{
                        dominantBaseline: "middle",
                        textAnchor: "middle"
                    }}
                    fontSize={size * 0.75} fontFamily={fontFamily}>{children}</text>
            </svg>
            <HanziWriter
                visible={visible}
                onClose={() => {
                    this.setState({ visible: false })
                }}
            >{children}</HanziWriter>
        </div>
    }
}
