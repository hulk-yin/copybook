import React, { useEffect, useState } from 'react';
import { Button, InputItem, Calendar, List, Checkbox, Toast, Range } from 'antd-mobile';
import { createForm } from "rc-form";
import dayjs from 'dayjs';
import TaskRepeatTypeItem from './task-repeat-type-item';
import TaskRepeatDayItem from './task-repeat-day-item';
import { Week } from './typing.d'

interface ISource extends Task<Week> { }
interface IProps {
    task: Partial<ISource>
    visible: boolean
    onSubmit: (data: ISource) => void
    onCancel: () => void
}
const TaskForm: RCForm.FC<IProps, ISource> = (props) => {
    const [visibleCalendar, updateVisibleCalendar] = useState<boolean>(false)
    const { form, task, visible } = props;

    useEffect(() => {
        if (visible === false) {
            // updateVisibleCalendar(visible);
        }
    }, [visible])
    const { getFieldProps, getFieldsValue, getFieldError, getFieldDecorator, setFieldsValue, validateFields } = form

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
                                    days=[]
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
                        getValueFromEvent(e) {
                            console.log(e)
                            // return (e.target as any).value
                        }
                    })
                    }
                />
                {/* {
                    getFieldDecorator("repeatDays", {
                        initialValue: task.repeatDays || [],
                        getValueFromEvent({ target }) {
                            if (values.repeatType === "other") {
                                const { name, checked }: any = target
                                const index = values.repeatDays.indexOf(name);
                                if (checked && index === -1) {
                                    return [...values.repeatDays, name]
                                }
                                if (!checked && index > -1) {
                                    values.repeatDays.splice(index, 1)
                                    return values.repeatDays
                                }
                            }

                            return values.repeatDays
                        }
                    })(

                        <List.Item
                        >
                            <List.Item.Brief>
                                <span style={{ fontSize: 12 }}>
                                    <Checkbox
                                        disabled={values.repeatType === "none"}
                                        checked={(values.repeatDays || task.repeatDays).indexOf(Week.Monday) > -1}
                                        name={Week.Monday}
                                    > 周一</Checkbox>
                                    <Checkbox
                                        disabled={values.repeatType === "none"}
                                        checked={(values.repeatDays || task.repeatDays).indexOf(Week.Tuesday) > -1}
                                        name={Week.Tuesday}
                                    > 周二</Checkbox>
                                    <Checkbox
                                        disabled={values.repeatType === "none"}
                                        checked={(values.repeatDays || task.repeatDays).indexOf(Week.Wednesday) > -1}
                                        name={Week.Wednesday}
                                    > 周三</Checkbox>
                                    <Checkbox
                                        disabled={values.repeatType === "none"}
                                        checked={(values.repeatDays || task.repeatDays).indexOf(Week.Thursday) > -1}
                                        name={Week.Thursday}
                                    > 周四</Checkbox>
                                    <Checkbox
                                        disabled={values.repeatType === "none"}
                                        checked={(values.repeatDays || task.repeatDays).indexOf(Week.Friday) > -1}
                                        name={Week.Friday}
                                    > 周五</Checkbox>
                                    <Checkbox
                                        disabled={values.repeatType === "none"}
                                        checked={(values.repeatDays || task.repeatDays).indexOf(Week.Saturday) > -1}
                                        name={Week.Saturday}
                                    > 周六</Checkbox>
                                    <Checkbox
                                        disabled={values.repeatType === "none"}
                                        checked={(values.repeatDays || task.repeatDays).indexOf(Week.Sunday) > -1}
                                        name={Week.Sunday}
                                    > 周日</Checkbox>
                                </span>
                            </List.Item.Brief>
                        </List.Item>
                    )
                } */}
                <List.Item
                    extra={
                        <div>
                            {values.startTime || task.startTime} - {values.endTime || task.endTime}
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
                            // defaultValue={[0, 10 * 5] as any}
                            defaultValue={[
                                ((task.startTime || "0:0").split(":") as any[]).reduce((a: string, b: string) => {
                                    return parseInt(a) * 60 + parseInt(b)
                                }),
                                ((task.endTime || "0:0").split(":") as any).reduce((a: string, b: string) => {
                                    return parseInt(a) * 60 + parseInt(b)
                                })
                            ] as any}
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
                            onChange={([start, end]: any) => {
                                setFieldsValue({
                                    startTime: [Math.floor(start / 60), start % 60].join(":"),
                                    endTime: [Math.floor(end / 60), end % 60].join(":")
                                })
                            }}
                        >
                        </Range>
                    </div>
                </List.Item>
                {
                    getFieldDecorator("startDate", {
                        initialValue: task.startDate,
                        rules: [{
                            required: true
                        }]
                    })(<List.Item
                        arrow="horizontal"
                        error={!!getFieldError("startDate")}
                        extra={
                            <div>
                                {dayjs(values.startDate).format("YYYY-MM-DD")}

                                {(values.repeatType || task.repeatType) !== "none" ?
                                    <div>
                                        {dayjs(values.endDate).format("YYYY-MM-DD")}
                                    </div>
                                    : null}
                            </div>
                        }
                        onClick={() => {
                            updateVisibleCalendar(true)
                        }}
                    >
                        日期
            </List.Item>)
                }

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
                            console.log(values)
                            props.onSubmit(values)
                        }
                    })
                    // form.s
                }}
            >保存</Button>
            <Calendar
                visible={visibleCalendar}
                onCancel={() => {
                    updateVisibleCalendar(false)
                }}
                onConfirm={(startDate, endDate) => {
                    updateVisibleCalendar(false)
                    setFieldsValue({
                        startDate,
                        endDate
                    })
                }}
                showShortcut
                type={(values.repeatType || task.repeatType) === "none" ? "one" : "range"}
                defaultDate={task.startDate || new Date()}
                defaultValue={(values.repeatType || task.repeatType) === "none" ? task.startDate : [task.startDate, task.endDate] as any}
            />
        </div>
    )
}
export default createForm()<IProps>(TaskForm)
