import React from 'react';
import { Modal } from 'antd-mobile';
const HanziWriter = require('hanzi-writer');
export default class Writer extends React.Component {
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
            showOutline: true
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
            <div
                style={{
                    width: 300,
                    height: 300,
                    margin:"auto"
                }}
                ref={(el) => {
                    this.element = el;
                }}
            />
            <div style={{
                color:"#999999999",
                whiteSpace:"pre-line"
            }}>
                {`
                笔画顺序为楷体简体
                版权信息@https://hanziwriter.org
                `}
            </div>
        </Modal>
    }
}