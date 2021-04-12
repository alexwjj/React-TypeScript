import * as React from "react";
import { Card, Button } from "zent";
// import { ITask } from "./types";
import { TASK_BTN_TEXT, TASK_BTN_STYLE } from "./constants";

// interface IProps extends ITask {
//   date?: string;
// }

function TaskCardItem(props) {
  const onStatusChange = React.useCallback(() => {
    props.onStatusChange(props.task);
  }, [props]);
  return (
    <>
      <Card
        style={{ marginTop: "10px" }}
        title={props.task.title}
        type="nested"
        action={
          <Button
            outline
            bordered={false}
            onClick={onStatusChange}
            type={TASK_BTN_STYLE[props.task.status]}
          >
            {TASK_BTN_TEXT[props.task.status]}
          </Button>
        }
      >
        <p>{props.task.description}</p>
      </Card>
    </>
  );
}

function TaskCard(props) {
  return props.taskList?.length ? (
    props.taskList.map((task, index) => {
      return (
        <TaskCardItem
          key={index}
          task={task}
          onStatusChange={props.onStatusChange}
        ></TaskCardItem>
      );
    })
  ) : (
    <div>暂无任务</div>
  );
}

export default TaskCard;
