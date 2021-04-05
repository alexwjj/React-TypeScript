import * as React from "react";
import "./index.scss";
import {
  LayoutRow as Row,
  LayoutCol as Col,
  LayoutGrid as Grid,
  LayoutConfigProvider as ConfigProvider,
  ScrollAlert,
  AlertItem,
  Notify,
  Button,
} from "zent";

function Home() {
  const task = [
    {
      id: 1,
      title: "第一天的任务",
      description: "任务内容1111",
    },
    {
      id: 2,
      title: "第二天的任务",
      description: "任务内容2222",
    },
  ];
  const onCheckDetail = (task: any) => {
    Notify.info(`任务：${task.title}，内容：${task.description}只能看这么多哦，功能开发中`);
  };
  const onAddTask = () => {
    Notify.info("功能开发中");
  }
  return (
    <div>
      <ConfigProvider
        value={{
          rowGutter: 0,
          colGutter: 0,
        }}
      >
        <Grid>
          <div className="mtb10">
            <ScrollAlert>
              {task.map((task) => {
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
              <div className="task task-my">我的任务
              <Button
                        type="primary"
                        onClick={() => {
                          onAddTask();
                        }}
                      >
                        新建任务
                      </Button>
              </div>
            </Col>
            <Col span={6}>
              <div className="task task-my">TODO</div>
            </Col>
            <Col span={6}>
              <div className="task task-my">DOING</div>
            </Col>
            <Col span={6}>
              <div className="task task-my">DONE</div>
            </Col>
          </Row>
        </Grid>
      </ConfigProvider>
    </div>
  );
}

export default Home;
