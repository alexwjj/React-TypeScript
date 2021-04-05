import { Dialog, Button } from "zent";
import * as React from "react";
import { FormInputField, Form, FormStrategy, Validators, Notify } from "zent";
interface IProps {
  visible: boolean;
  onConfirmDialog(): void;
  onCloseDialog(): void;
}

function TaskDialog(props) {
  const form = Form.useForm(FormStrategy.View);
  const onConfirm = () => {
    const value = form.getValue();
    if (!value.title || !value.description) {
      Notify.error("请填写完成再提交");
      return;
    }
    props.onConfirmDialog(form.getValue());
  };

  return (
    <div>
      <Dialog
        visible={props.visible}
        onClose={() => props.onCloseDialog()}
        footer={
          <div>
            <Button type="primary" onClick={() => onConfirm()}>
              确定
            </Button>
            <Button onClick={() => props.onCloseDialog()}>关闭</Button>
          </div>
        }
        title={props.title}
      >
        <Form layout="horizontal" form={form}>
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
          {/* <Button htmlType="reset">重置</Button> */}
        </Form>
      </Dialog>
    </div>
  );
}

export default TaskDialog;
