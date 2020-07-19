import React from 'react';
import { List, Range } from 'antd-mobile';
// import { Week } from './typing.d';
import { InputProps } from 'antd-mobile/lib/input-item/Input';
import { timeFormat } from '../../uitls';
const TaskTimeRangItem: React.FC<InputProps & { value: [number, number], onChange: (range: [number, number]) => void }> = (props) => {
    const { value = [9 * 60, 10 * 60] } = props;
    // console.log(value)
    return (
        <React.Fragment>
            <List.Item
                extra={
                    <div>
                        {timeFormat(value[0])} - {timeFormat(value[1])}
                    </div>
                }
            >
                时间段
            </List.Item>

            <List.Item>
                <div style={{ padding: 20, paddingBottom: 40 }}>
                    <Range
                        min={6 * 60}
                        max={21 * 60}
                        step={5}
                        defaultValue={value as any}
                        {...{
                            marks: {
                                [60 * 6]: "06:00",
                                [60 * 9]: "09:00",
                                [60 * 12]: "12:00",
                                [60 * 15]: "15:00",
                                [60 * 18]: "18:00",
                                [60 * 21]: "21:00",
                            }
                        }}
                        onChange={(range:any) => props.onChange(range)}
                    />
                </div>
            </List.Item>
        </React.Fragment>

    )
}
export default TaskTimeRangItem
