import React, { useEffect, useState } from 'react';
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
import '.'
import './index.scss';
import { NavBar, Popover, Icon } from 'antd-mobile';
import { RouteProps, useHistory } from 'react-router-dom';
import { queryByDate } from '../task-list/service';
import { buildDateTime, str2color } from '../task-list/uitls';
import TaskList from './components/list';
import Clock from './components/clock';
declare var window: any;
window._czc = window._czc || [];
function App(props: RouteProps) {
  // props.
  const [clockTasks, updateClockTasks] = useState<Array<Clock.Task>>([])
  const [taskList, updateTaskList] = useState<Array<Task & { color: string }>>([])
  const history = useHistory();
  useEffect(() => {
    (async () => {
      const tasks = await (await queryByDate()).map(item => ({
        "color": str2color(item.name, { to: 0x999999 }),
        ...item
      }));
      updateTaskList(tasks);
      updateClockTasks(tasks.map(item => {
        const task: Clock.Task = {
          name: item.name,
          "color": item.color,
          "imgUrl": "",
          "start": buildDateTime(item.startDate, item.startTime),
          "end": buildDateTime(item.endDate, item.endTime),
        }
        return task
      }));
    })()
  }, [])
  return (
    <div className="clock">
      <NavBar
        rightContent={
          <Popover
            onSelect={({ props: { firstItem } }) => {
              history.push(firstItem)
            }}
            overlay={[
              <Popover.Item
                key="task-list"
                firstItem="/task-list"
              >
                计划管理
              </Popover.Item>
            ]}
          >
            <Icon type="ellipsis" />
          </Popover>
        }
      >今日计划</NavBar>
      <Clock data={clockTasks} />
      <TaskList data={taskList} />
    </div >
  );
}

export default App;
