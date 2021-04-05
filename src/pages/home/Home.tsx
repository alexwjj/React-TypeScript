import React from "react";
import "./index.scss";
import { allList } from "./mock";
import TaskCard from "./task-card";
import { TASK_STATUS } from "./constants";
import { ITask } from "./types";
import TaskDialog from "./dialog";
import {
  LayoutRow as Row,
  LayoutCol as Col,
  LayoutGrid as Grid,
  LayoutConfigProvider as ConfigProvider,
  ScrollAlert,
  AlertItem,
  Notify,
  Button,
  Card,
} from "zent";

function Home() {
  const localTask = localStorage.getItem("taskList");
  const initialValue = localTask ? JSON.parse(localTask) : allList;
  const [taskList, setTaskList] = React.useState(initialValue);
  const [dialogVisible, setDialogVisible] = React.useState<boolean>(false);
  const onCheckDetail = (task: any) => {
    Notify.info(
      `任务：${task.title}，内容：${task.description}只能看这么多哦，功能开发中`
    );
  };
  const onAddTask = () => {
    // Notify.info("功能开发中");
    setDialogVisible(true);
  };
  const onCloseDialog = () => {
    setDialogVisible(false);
  };
  // useEffect(() => {
  //   localStorage.setItem('taskList', JSON.stringify(taskList))
  //   // Notify.warn('任务发生了改变')
  // }, [taskList])
  const onConfirmDialog = (form) => {
    const task = {
      id: Math.random(),
      status: TASK_STATUS.TODO,
      ...form,
    };
    setTaskList([...taskList, task]);
    Notify.success("保存成功");
    setDialogVisible(false);
  };
  const todoList: ITask[] = taskList.filter(
    (v) => v.status === TASK_STATUS.TODO
  );
  const doingList: ITask[] = taskList.filter(
    (v) => v.status === TASK_STATUS.DOING
  );
  const doneList: ITask[] = taskList.filter(
    (v) => v.status === TASK_STATUS.DONE
  );

  const onStatusChange = (task) => {
    // console.log(task, 'tasktasktask');
    // if (task?.status === 0 || task?.status === 1) {
    //   // let task = taskList.find((v) => v.id === task.id);
    //   // console.log(task, 'tasktasktask');
    //   // task[0].status +=1
    //   // setTaskList(taskList)
    // }
  };
  return (
    <div style={{ margin: "10px" }}>
      <ConfigProvider
        value={{
          rowGutter: 0,
          colGutter: 10,
        }}
      >
        <Grid>
          <div className="mtb10">
            <ScrollAlert>
              {taskList.map((task) => {
                return (
                  <AlertItem
                    key={task.id}
                    title={task.title}
                    description={task.description}
                    extraContent={
                      <Button
                        type="primary"
                        onClick={() => {
                          onCheckDetail(task);
                        }}
                      >
                        查看任务详情
                      </Button>
                    }
                  />
                );
              })}
            </ScrollAlert>
          </div>
          <Row>
            <Col span={6}>
              <div className="task task_my">
                <TaskDialog
                  title="新建任务"
                  visible={dialogVisible}
                  onConfirmDialog={onConfirmDialog}
                  onCloseDialog={onCloseDialog}
                ></TaskDialog>
                <Card
                  title="所有任务"
                  action={
                    <Button
                      type="primary"
                      onClick={() => {
                        onAddTask();
                      }}
                    >
                      新建任务
                    </Button>
                  }
                >
                  {taskList.map((task, index) => {
                    return (
                      <TaskCard
                        key={index}
                        task={task}
                        onStatusChange={onStatusChange(task)}
                      ></TaskCard>
                    );
                  })}
                </Card>
              </div>
            </Col>
            <Col span={6}>
              <div className="task task_todo">
                <Card title="TODO">
                  {todoList.map((task, index) => {
                    return <TaskCard key={index} task={task}></TaskCard>;
                  })}
                </Card>
              </div>
            </Col>
            <Col span={6}>
              <div className="task task_doing">
                <Card title="DOING">
                  {doingList.map((task, index) => {
                    return <TaskCard key={index} task={task}></TaskCard>;
                  })}
                </Card>
              </div>
            </Col>
            <Col span={6}>
              <div className="task task_done">
                <Card title="DONE">
                  {doneList.map((task, index) => {
                    return <TaskCard key={index} task={task}></TaskCard>;
                  })}
                </Card>
              </div>
            </Col>
          </Row>
        </Grid>
      </ConfigProvider>
    </div>
  );
}

export default Home;
