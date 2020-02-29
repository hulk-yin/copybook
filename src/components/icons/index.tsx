import React from 'react';
import './index.css';
interface IconProps {
    type: string;
    size?: "middle" | "large" | "small";
    className?: string
}
export default (
    { size = "middle", type, className = "" }: IconProps
) => (<i
    className={`iconfont icon-${type} icon-${size}${className ? " " + className : ""} `}
/>);
