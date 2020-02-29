import React from 'react';
import { Modal } from 'antd-mobile';
const HanziWriter = require('hanzi-writer');
export default class Writer extends React.Component<{ visible: boolean, onClose: () => void }> {
    element?: Element | null
    writer?: any
    componentDidMount() {
        if (this.element) {
            this.write()
        }
    }
    componentDidUpdate() {
        if (this.element) {
            this.write();
        }
    }
    write() {
        const { children: word } = this.props;
        this.writer = HanziWriter.create(this.element, word, {
            width: 300,
            height: 300,
            padding: 30,
            showOutline: true,

            // strokeColor:"#c43b3b",
            // radicalColor:"#333333"
        });
        this.writer.animateCharacter();
    }
    render() {
        const { visible, children, ...props } = this.props;
        if (!visible || !children) { return null }
        return <Modal
            visible
            style={{
                height: "400px"
            }}
            {...props}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                ref={(el) => {
                    this.element = el;
                }}
                style={{
                    marginTop: "50",
                    border: "1px solid #999999"
                }}
                width="300"
                height="300"
                id="grid-background-target">
                <line x1="0" y1="0" x2="300" y2="300" strokeDasharray="5 3" stroke="#DDD" />
                <line x1="300" y1="0" x2="0" y2="300" strokeDasharray="5 3" stroke="#DDD" />
                <line x1="150" y1="0" x2="150" y2="300" strokeDasharray="5 3" stroke="#DDD" />
                <line x1="0" y1="150" x2="300" y2="150" strokeDasharray="5 3" stroke="#DDD" />
            </svg>
            <div style={{
                color: "#999999999",
                whiteSpace: "pre-line"
            }}>
                {`
                笔画顺序为楷体简体
                版权信息@https://hanziwriter.org
                `}
            </div>
        </Modal>
    }
}