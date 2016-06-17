import React, {Component, PropTypes} from 'react';
import { Button, Form, Input } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

let Login = React.createClass({
  render() {
    const { getFieldProps } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    return (
      <div>
        <Form horizontal form={this.props.form}>
          <FormItem
            {...formItemLayout}
            label="用户名"
          >
            <Input {...getFieldProps('username', {})} type="text" autoComplete="off" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="密码"
          >
            <Input {...getFieldProps('password', {})} type="password" autoComplete="off" />
          </FormItem>
        </Form>
      </div>
    );
  },
});

Login = createForm()(Login);

export default Login;
