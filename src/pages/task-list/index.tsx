import React, { useState, useEffect } from 'react';
// import { Button } from 'antd-mobile';
import TaskForm from './components//task-form';
import { Drawer, Button, List, NavBar, Icon, SwipeAction, Tag } from 'antd-mobile';
import dayjs from 'dayjs';
import * as service from './service';
import { useHistory } from 'react-router-dom';

const TaskList: React.FC<any> = (props) => {
  const history = useHistory()
  const [visible, updateVisible] = useState<boolean>(false);
  const [list, updateList] = useState<Task[]>([]);
  const [count, updateCount] = useState<number>(0)
  useEffect(() => {
    service.load().then(res => {
      updateList(res)
    })
  }, [count, visible])
  return <div>
    <Drawer
      open={visible}
      position="bottom"
      // docked={true}
      // enableDragHandle
      onOpenChange={() => updateVisible(!visible)}
      sidebar={<TaskForm
        visible={visible}
        task={{
          name: "学习",
          repeatDays: [],
          repeatType: "none",
          startTime: "9:0",
          endTime: "10:00",
          startDate: new Date(),
          endDate: new Date()
        }}
        onSubmit={(data) => {
          service.add(data)
          updateVisible(false)
        }}
        onCancel={() => updateVisible(false)}
      />}
    >
      <NavBar
        leftContent={<Icon type="left"
          onClick={() => {
            history.goBack()
          }}
        />}
      >计划管理</NavBar>
      <div>
        <Button onClick={() => updateVisible(true)}>添加计划</Button>
        <List>
          {list.map(task =>
            <SwipeAction
              key={task.id}
              right={[
                {
                  text: "删除",
                  onPress() {
                    service.remove(task.id)
                    updateCount(count + 1)
                  },
                  style: {
                    padding: "10px",
                    backgroundColor: "red"
                  }
                }
              ]}
            >
              <List.Item
                multipleLine
                align="top"
                extra={
                  `${task.startTime}-${task.endTime}`
                }
              >
                {task.name}
                <List.Item.Brief>
                  {task.repeatType === "day" ? <Tag selected >每天</Tag> : null}
                  {task.repeatType === "weekday" ? <Tag selected >工作日</Tag> : null}
                  {task.repeatType === "weekend" ? <Tag selected >周末</Tag> : null}
                  {task.repeatType === "other" ? task.repeatDays.map(v => <Tag selected  key={v}>{v}</Tag>) : null}
                  &nbsp;{dayjs(task.startDate).format("YY-MM-DD")}
                  {task.repeatType !== "none" ? ` - ${dayjs(task.endDate).format("YY-MM-DD")}` : null}
                </List.Item.Brief>
              </List.Item>
            </SwipeAction>
          )}
        </List>
        {props.children}
      </div>
    </Drawer>
  </div>
}
export default TaskList 