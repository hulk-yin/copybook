import React from 'react';
import { List, Checkbox } from 'antd-mobile';
import { InputProps } from 'antd-mobile/lib/input-item/Input';
const list:Array<{value:Task.RepeatType,label:string}> = [
    { value: "none", label: "无" },
    { value: "day", label: "每日" },
    { value: "weekday", label: "工作日" },
    { value: "weekend", label: "周末" },
    { value: "other", label: "其他" }
]
const TaskRepeatTypeItem: React.FC<InputProps> = (props) => {
    // const [value,updateValue] = 
    // console.log(props)
    return (
        <List.Item
            onClick={(e)=> {
                const target = e.target as HTMLInputElement
                if (target.type === "checkbox") {
                    target.value = target.name
                    console.log(props)
                    props.onChange && props.onChange(e as any)
                }
                // e.stopPropagation()
                return false
            }}
        >
            循环任务
            <List.Item.Brief
            >
                {
                    list.map(item => <Checkbox
                        key={item.value}
                        checked={item.value === props.value}
                        name={item.value}
                    >{item.label}</Checkbox>)
                }
            </List.Item.Brief>
        </List.Item>

    )
}
export default TaskRepeatTypeItem
