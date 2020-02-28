import React from 'react';
import './index.css';
export default ({ size = "middle", type, className = "", ...props }) => (
    <i
        className={`iconfont icon-${type} icon-${size}`}
        {...props}
    />);
