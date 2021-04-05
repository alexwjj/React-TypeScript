import * as React from "react";
import { Card, Button, Notify } from "zent";
import { ITask } from "./types";
import { TASK_BTN_TEXT } from "./constants";

interface IProps extends ITask {
  date?: string;
}

function TaskCard(props) {
  const onChange = () => {
    // props.onStatusChange(props.task)
    Notify.info("功能开发中")
  }
  return (
    <>
      <Card
        style={{ marginTop: "10px" }}
        title={props.task.title}
        type="nested"
        action={<Button bordered={false} onClick={ onChange }>{TASK_BTN_TEXT[props.task.status]}</Button>}
      >
        <p>{props.task.description}</p>
      </Card>
    </>
  );
}
export default TaskCard;
