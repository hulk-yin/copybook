import React from 'react';
import { List } from 'antd-mobile';
import { timeFormat } from '../../../task-list/uitls';


interface IProps {
    data: Array<Task & { color: string }>
}

const TaskList: React.FC<IProps> = (props) => {
    const { data } = props
    return <List>
        {data.map(task => {
            return <List.Item key={task.id}>
                {task.name}
                <List.Item.Brief>
                    {timeFormat(task.startTime)} - {timeFormat(task.endTime)}
                </List.Item.Brief>
            </List.Item>
        })}
    </List>
}
export default TaskList;