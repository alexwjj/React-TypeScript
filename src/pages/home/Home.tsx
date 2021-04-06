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
  const [dialogType, setDialogType] = React.useState<string>("");
  const [taskInfo, setTaskInfo] = React.useState<ITask>();

  const onAddTask = () => {
    // Notify.info("功能开发中");
    setDialogType("add");
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
    console.log(task);
    if (task?.status === TASK_STATUS.DONE) {
      setDialogType("detail");
      setTaskInfo(task);
      setDialogVisible(true);
      return;
    }
    if (
      task?.status === TASK_STATUS.TODO ||
      task?.status === TASK_STATUS.DOING
    ) {
      let newTask = taskList.filter((v) => v.id !== task.id);
      task.status += 1;
      newTask.push(task);
      setTaskList(newTask);
    }
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
                          onStatusChange(task);
                        }}
                      >
                        查看详情
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
                  type={dialogType}
                  visible={dialogVisible}
                  taskInfo={taskInfo}
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
                  <TaskCard
                    taskList={taskList}
                    onStatusChange={onStatusChange}
                  ></TaskCard>
                </Card>
              </div>
            </Col>
            <Col span={6}>
              <div className="task task_todo">
                <Card title="TODO">
                  <TaskCard
                    taskList={todoList}
                    onStatusChange={onStatusChange}
                  ></TaskCard>
                </Card>
              </div>
            </Col>
            <Col span={6}>
              <div className="task task_doing">
                <Card title="DOING">
                  <TaskCard
                    taskList={doingList}
                    onStatusChange={onStatusChange}
                  ></TaskCard>
                </Card>
              </div>
            </Col>
            <Col span={6}>
              <div className="task task_done">
                <Card title="DONE">
                  <TaskCard
                    taskList={doneList}
                    onStatusChange={onStatusChange}
                  ></TaskCard>
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
