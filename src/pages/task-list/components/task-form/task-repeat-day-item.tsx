import React from 'react';
import { List, Checkbox } from 'antd-mobile';
// import { Week } from './typing.d';
import { Week } from './typing.d'
import { InputProps } from 'antd-mobile/lib/input-item/Input';
const list: Array<{
    value: Week,
    label: string
}> = [
        { value: Week.Monday, label: "周一" },
        { value: Week.Tuesday, label: "周二" },
        { value: Week.Wednesday, label: "周三" },
        { value: Week.Thursday, label: "周四" },
        { value: Week.Friday, label: "周五" },
        { value: Week.Saturday, label: "周六" },
        { value: Week.Sunday, label: "周日" }
    ]
const TaskRepeatDayItem: React.FC<InputProps & { repeatType: Task.RepeatType, value?: Week[], onChange?: any }> = (props) => {
    const { value = [] } = props;
    // console.log(value)
    return (
        <List.Item
            onClick={(e: any) => {
                const target = e.target as HTMLInputElement
                if (target.type === "checkbox") {
                    target.value = target.name
                    if (props.repeatType === "other") {
                        const { name, checked }: any = target
                        const index = value.indexOf(name);
                        let ret = [...value]
                        if (checked && index === -1) {
                            ret.push(name)
                        }
                        if (!checked && index > -1) {
                            ret.splice(index, 1)
                        }
                        target.value = ret as any;
                        props.onChange && props.onChange(ret)
                    }
                }
            }}
        >
            <List.Item.Brief>
                {
                    list.map(item => <Checkbox
                        key={item.value}
                        checked={value.indexOf(item.value) > -1}
                        name={item.value as any}
                    >{item.label}</Checkbox>)
                }
            </List.Item.Brief>
        </List.Item>

    )
}
export default TaskRepeatDayItem
