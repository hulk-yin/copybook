import React from 'react';
import './index.css';
export default ({ size = "middle", type, className = "" }) => (
    <i
        className={`iconfont icon-${type} icon-${size}${className?" "+className:""} `}
    />);
