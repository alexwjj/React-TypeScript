import {
  Form,
  FormStrategy,
  Checkbox,
  Validators,
  FormNumberInputField,
  FormCheckboxGroupField,
  FormSingleUploadField,
  FormInputField,
  FormUploadField,
  FormImageUploadField,
  Button
} from "zent";
import React, { useCallback } from 'react';

/**
 * 自定义表单校验，内置组件接受 renderError 参数，若不传默认会显示 message
 */
function equalsPassword(value:string, ctx: any):any {
  if (value !== ctx.getSectionValue("password").password) {
    return {
      name: "passwordEqual",
      message: "两次填写的密码不一致",
    };
  }
  return null;
}

function idLength(value:any) {
  if (value.length !== 10 && value.length !== 15) {
    return {
      name: "idLength",
      message: "证件号码是10位或者15位数字",
    };
  }
}

function JJForm() {
  const form = Form.useForm(FormStrategy.View);
  const resetForm = useCallback(() => {
    form.resetValue();
  }, [form]);
  const onSubmit = useCallback((form) => {
    const value = form.getValue();
    console.log(value);
  }, []);
  return (
    <Form form={form} layout="horizontal" scrollToError onSubmit={onSubmit}>
      <FormInputField
        name="name"
        label="昵称:"
        required
        helpDesc="正则校验"
        validators={[
          Validators.required("请填写昵称"),
          Validators.pattern(/^[a-zA-Z]+$/, "昵称只能是字母"),
        ]}
      />
      <FormInputField
        name="password"
        label="密码:"
        required
        helpDesc="非空校验"
        validators={[Validators.required("请填写密码")]}
        props={{
          type: "password",
        }}
      />
      <FormInputField
        name="confirmPw"
        label="确认密码:"
        required
        helpDesc="自定义校验函数"
        validators={[equalsPassword]}
        props={{
          type: "password",
        }}
      />
      <FormInputField
        name="email"
        label="邮件:"
        helpDesc="邮件校验"
        validators={[Validators.email("请填写正确的邮件")]}
      />
      <FormInputField
        name="remark"
        label="备注:"
        helpDesc="文本输入"
        props={{ type: "textarea", showCount: true, maxCharacterCount: 10 }}
        validators={[Validators.maxLength(10, "备注不能超过10个字符")]}
      />
      <FormNumberInputField
        name="id"
        label="证件号码:"
        required
        helpDesc="自定义校验函数"
        validators={[idLength]}
      />
      <FormCheckboxGroupField
        name="hobbies"
        label="兴趣标签:"
        required
        helpDesc="长度校验"
        // @ts-ignore
        validators={[Validators.minLength(2, "请至少选择两个")]}
      >
        <Checkbox value="movie">电影</Checkbox>
        <Checkbox value="book">书籍</Checkbox>
        <Checkbox value="travel">旅行</Checkbox>
      </FormCheckboxGroupField>
      <FormSingleUploadField
        name="singleFile"
        label="单文件上传:"
        props={{
          tips: "文件大小不超过 2M",
          maxSize: 1024 * 1024 * 2,
        }}
        validators={[Validators.required("请上传文件")]}
      />
      <FormUploadField
        name="upload"
        label="文件上传:"
        props={{
          tips: "单个文件不超过 2M",
          maxAmount: 9,
          maxSize: 1024 * 1024 * 2,
        }}
        // @ts-ignore
        validators={[Validators.minLength(1, "请上传文件")]}
      />
      <FormImageUploadField
        name="imageUpload"
        label="图片文件上传:"
        props={{
          tips: "单个文件不超过 2M",
          maxAmount: 9,
          maxSize: 1024 * 1024 * 2,
        }}
        // @ts-ignore
        validators={[Validators.minLength(1, "请上传图片")]}
      />
      <div className="zent-form-actions">
        <Button type="primary" htmlType="submit">
          获取
        </Button>
        <Button type="primary" outline onClick={resetForm}>
          重置
        </Button>
      </div>
    </Form>
  );
}

export default JJForm