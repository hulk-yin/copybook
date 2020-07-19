import React, { useState } from 'react';
import { List, Calendar } from 'antd-mobile';
import { CalendarProps } from 'antd-mobile/lib/calendar/PropsType';
import dayjs from 'dayjs';
const TaskDateRangItem: React.FC<CalendarProps & { value: [string, string], onChange: (range: [string, string]) => void }> = (props) => {
    const { value, onChange } = props;
    const [visibleCalendar, updateVisibleCalendar] = useState<boolean>(false)

    return (
        <React.Fragment>
            <List.Item
                arrow="horizontal"
                extra={
                    <div>
                        {dayjs(value[0]).format("YYYY-MM-DD")}
                        {value[1] && value[1] > value[0] ?
                            <div>
                                {dayjs(value[1]).format("YYYY-MM-DD")}
                            </div>
                            : null}
                    </div>
                }
                onClick={() => {
                    updateVisibleCalendar(true)
                }}
            >
                日期
            </List.Item>
            <Calendar
                visible={visibleCalendar}
                onCancel={() => {
                    updateVisibleCalendar(false)
                }}
                onConfirm={(startDate, endDate) => {
                    updateVisibleCalendar(false)
                    onChange([dayjs(startDate).format("YYYYMMDD"), dayjs(endDate).format("YYYYMMDD")])
                }}
                showShortcut
                type={"range"}
                // defaultDate={new Date(value[0]) || new Date()}
                defaultValue={[dayjs(value[0]).toDate(), dayjs(value[1]).toDate()] as any}
            />
        </React.Fragment>

    )
}
export default TaskDateRangItem
