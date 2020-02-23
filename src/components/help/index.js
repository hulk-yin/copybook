import React, { useState } from 'react';
import { Button, Modal, Toast } from 'antd-mobile';
import './help.css';
export default () => {
    const [visible, setVisible] = useState(false)
    return <div>
        <Button
            onClick={() => setVisible(true)}
        >帮助</Button>
        <Modal
            visible={visible}
            onClose={() => {
                setVisible(false)
            }}
            style={{
                height: "400px"
            }}
        >
            <div
                className="help-weixi-code"
            ></div>
            <div>
                二维码有效期[2020-03-01]
            </div>
            {/*             
            微信号(点击复制): <input 
            value="qq63683697"
            readOnly
            onClick={(e)=>{
                e.target.select();
                document.execCommand('Copy');   
                Toast.info("复制成功")
            }}
            /> */}
        </Modal>
    </div>
}