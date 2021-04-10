import { Dialog, Button } from "zent";
import React from "react";
import { FormInputField, Form, FormStrategy, Validators } from "zent";
interface IFormValue {
  title: string;
  description: string;
}
interface IProps {
  visible: boolean;
  type: string;
  taskInfo: any;
  onConfirmDialog: (value: IFormValue) => void;
  onCloseDialog(): void;
}

function TaskDialog(props: IProps) {
  const form = Form.useForm(FormStrategy.View);

  setTimeout(() => {
    if (props.type === "detail") {
      form.initialize(props.taskInfo);
    } else {
      form.clear();
    }
  }, 0);

  const resetForm = React.useCallback(() => {
    form.clear();
    form.model.clearError()
    props.onCloseDialog();
  }, [form, props]);
  const onSubmit = React.useCallback(
    (form) => {
      const value = form.getValue();
      props.onConfirmDialog(value);
      form.resetValue();
    },
    [props]
  );

  return (
    <div>
      <Dialog
        visible={props.visible}
        onClose={() => resetForm()}
        title={props.type === "add" ? "新建任务" : "任务详情"}
      >
        <Form layout="horizontal" form={form} disabled={props.type === "detail"} onSubmit={onSubmit}>
          <FormInputField
            name="title"
            label="任务名称:"
            validators={[
              Validators.minLength(2, "任务名称至少 2 个字"),
              Validators.maxLength(20, "任务名称最多 20 个字"),
            ]}
            helpDesc="任务名称为2-20个字"
            required="必填"
          />
          <FormInputField
            name="description"
            label="任务描述:"
            helpDesc="说说自己要干什么"
            validateOccasion={
              Form.ValidateOccasion.Blur | Form.ValidateOccasion.Change
            }
            required="必填"
          />
          {props.type === "add" ? (
            <div className="zent-form-actions">
              <Button type="primary" htmlType="submit">
                确定
              </Button>
              <Button type="primary" outline onClick={resetForm}>
                取消
              </Button>
            </div>
          ) : (
            ""
          )}

          {/* <Button htmlType="reset">重置</Button> */}
        </Form>
      </Dialog>
    </div>
  );
}

export default TaskDialog;
