import React, { useState } from 'react';
import { Modal,Button } from 'antd-mobile';
// import html2canvas from 'html2canvas';
// import {saveAsPNG} from 'canvas2image';
import './index.css';
export default (props) => {
    const [visible, setVisible] = useState(false)
    // const [canvas,updateCanvas] = useState(null);
    return <div>
        <Button
            onClick={async () => {
                props.onPrint()
                await new Promise(resolve => setTimeout(resolve, 100))
                window.print();
                // saveAsPNG
                window._czc && window._czc.push(["_trackEvent", "help", "click", '打印', 1, 'print_btn']);
                // await new Promise(resolve => setTimeout(resolve, 100))
                // const _canvas = await html2canvas(document.getElementById("copybook-page"), {
                //     width: 1240,
                //     height: 1757
                // })
                // // updateCanvas(_canvas);
                // setVisible(true)
                // document.getElementById("preview-page").append(_canvas);
            }}
        >打印</Button>
        {/* <i
            className="iconfont icon-print"
            onClick={() => {
                window._czc && window._czc.push(["_trackEvent", "help", "click", '打印', 1, 'print_btn']);
                window.print();
                setVisible(true)
            }}
        /> */}
        <Modal
            visible={visible}
            onClose={() => {
                setVisible(false)
                props.onCancel();
            }}
            style={{
                // height: "600px"
            }}
        > <div id="preview-page"
            onClick={() => {
                setVisible(false)
                props.onCancel();
            }}
        ></div>
        </Modal>
    </div>
}