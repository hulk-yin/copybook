import React from 'react';
import { Button, InputItem,  List, Toast } from 'antd-mobile';
import { createForm } from "rc-form";
import TaskRepeatTypeItem from './task-repeat-type-item';
import TaskRepeatDayItem from './task-repeat-day-item';
import { Week } from './typing.d'
import TaskTimeRangItem from './task-time-rang-item';
import TaskDateRangItem from './task-date-rang-item';

interface ISource extends Task<Week> { }
interface IProps {
    task: ISource
    onSubmit: (data: ISource) => void
    onCancel: () => void
}
const TaskForm: RCForm.FC<IProps, ISource> = (props) => {
    const { form, task } = props;
    const { getFieldProps, getFieldsValue, getFieldError,  setFieldsValue, validateFields } = form

    getFieldProps("startTime", { initialValue: task.startTime })
    getFieldProps("endTime", { initialValue: task.endTime })
    getFieldProps("startDate", {
        initialValue: task.startDate
    })
    getFieldProps("endDate", {
        initialValue: task.endDate
    })
    const values = getFieldsValue(["name", "repeatType", "repeatDays", "startDate", "endDate", "startTime", "endTime"]);
    return (
        <div
            style={{
                minHeight: 500,
                backgroundColor: "#FFF",
                marginBottom: 30,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }}>
            <List
                style={{
                    // minHeight: 500,
                    // backgroundColor: "#FFF"
                }}>
                <InputItem
                    placeholder="输入任务名称"
                    {
                    ...getFieldProps("name", {
                        initialValue: task.name,
                        rules: [{
                            required: true
                        }]
                    })
                    }
                    error={!!getFieldError("name")}
                    onErrorClick={() => {
                        Toast.info(getFieldError("name"))
                    }}
                >任务名称</InputItem>
                <TaskRepeatTypeItem
                    {
                    ...getFieldProps("repeatType", {
                        initialValue: task.repeatType,
                        getValueFromEvent(e) {
                            return (e.target as any).name
                        },
                        onChange(e) {
                            const value: Task.RepeatType = (e.target as any).name;
                            let days: Week[];
                            switch (value) {
                                case "day":
                                    days = [Week.Monday, Week.Tuesday, Week.Wednesday, Week.Thursday, Week.Friday, Week.Saturday, Week.Sunday]
                                    break;
                                case "weekday":
                                    days = [Week.Monday, Week.Tuesday, Week.Wednesday, Week.Thursday, Week.Friday]
                                    break;
                                case "weekend":
                                    days = [Week.Thursday, Week.Friday]
                                    break;
                                default:
                                    days = []
                            }
                            setFieldsValue({
                                repeatDays: days
                            })
                        }
                    })
                    }
                />
                <TaskRepeatDayItem
                    repeatType={values.repeatType || task.repeatType}
                    {
                    ...getFieldProps("repeatDays", {
                        initialValue: task.repeatDays,
                    })
                    }
                />
                <TaskDateRangItem
                    value={[values.startDate, values.endDate] as any}
                    onChange={(range: any) => {
                        setFieldsValue({
                            startDate: range[0],
                            endDate: range[1]
                        })
                    }}
                />
                <TaskTimeRangItem
                    value={[values.startTime || task.startTime, values.endTime || task.endTime] as any}
                    onChange={(range: any) => {
                        setFieldsValue({
                            startTime: range[0],
                            endTime: range[1]
                        })
                    }}
                />


            </List>

            <Button
                style={{
                    margin: 20
                }}
                type="primary"
                onClick={() => {
                    // props.onCancel()
                    validateFields((error, values) => {
                        // console.log(res)
                        if (!error) {
                            console.log({ ...task, ...values })
                            props.onSubmit({ ...task, ...values })
                        }
                    })
                    // form.s
                }}
            >保存</Button>
        </div>
    )
}

export default createForm()<IProps>(TaskForm)
