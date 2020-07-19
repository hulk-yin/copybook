import React from 'react';
import './index.css';
type IconType = "scan" | "zhong-o" | "zhong" | "setting"
interface IconProps {
    type: IconType
    size?: "middle" | "large" | "small"
    className?: string
}
export default (
    { size = "middle", type, className = "" }: IconProps
) => (<i
    className={`iconfont icon-${type} icon-${size}${className ? " " + className : ""} `}
/>);
