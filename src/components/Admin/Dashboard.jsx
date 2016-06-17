import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import FooterLayout from '../../layouts/Layout/FooterLayout';
import { Button, Col, Form, Icon, Input, Menu, message, Row, Upload } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const Dragger = Upload.Dragger;
import styles from './Dashboard.less';
import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';

var files = [];
const props = {
  name: 'file',
  showUploadList: true,
  multiple: true,
  action: 'http://203.195.231.148:7013/v1/files/',
  onChange(info) {
    if (info.file.status === 'done') {
      console.log(info);
      files.push(info.file.name.substring(0, info.file.name.lastIndexOf("."))
        + "_" + info.file.response.fileSuffix
        + info.file.name.substr(info.file.name.indexOf('.')));
      message.success(info.file.name + ' 上传成功。');
    } else if (info.file.status === 'error') {
      message.error(info.file.name + ' 上传失败。');
    }
  }
};

var thiz = undefined;
var Dashboard = React.createClass({
  getInitialState() {
    return {
      current: "new",
      visibility: 'hidden',
    }
  },
  render() {
    if (cookie.get("logined") === undefined) {
      return (
        <div>
          <Header location={this.props.location} {...this.props} />
          <div className={styles.container}>
            <h3>您未登录，请登录 or 返回首页：）</h3>
            <a href="/"><Button type="primary" style={{ marginTop: 5 }}>返回首页</Button></a>
          </div>
        </div>
      );
    }

    thiz = this;
    const { getFieldProps } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };

    return (
      <div>
        <Header location={this.props.location} {...this.props} />

        <div className={styles.container}>
          <Row type="flex" align="start" justify="center">
            <Col span="6">
              <Menu className={styles.sidebar}
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="inline">
                <Menu.Item key="new">新建</Menu.Item>
                {this.renderPostList()}
              </Menu>
            </Col>
            <Col offset="1" span="10">
              <Form horizontal form={this.props.form}>
                <FormItem
                  {...formItemLayout}
                  label="Title"
                >
                  <Input {...getFieldProps('title', {})} type="text" autoComplete="off" />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="ROLE"
                >
                  <Input {...getFieldProps('role', {})} type="text" autoComplete="off" />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="BRAND"
                >
                  <Input {...getFieldProps('brand', {})} type="text" autoComplete="off" />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="FORMAT"
                >
                  <Input {...getFieldProps('format', {})} type="text" autoComplete="off" />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Subtitle"
                >
                  <Input {...getFieldProps('subtitle', {})} type="text" autoComplete="off" />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="CONTENT"
                >
                  <Input {...getFieldProps('content', {})} type="text" autoComplete="off" />
                </FormItem>
                <FormItem>
                  <Button type="primary" onClick={this.handleSubmit}>确定</Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button type="ghost" onClick={this.handleReset}>重置</Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button type="ghost" style={{visibility: this.state.visibility}} onClick={this.handleDelete}>删除</Button>
                </FormItem>
              </Form>
            </Col>
            <Col offset="1" span="6">
              <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">点击或将文件拖拽到此区域上传</p>
              <p className="ant-upload-hint">支持单个或批量上传</p>
            </Dragger>
            </Col>
          </Row>
        </div>

        <FooterLayout />
      </div>
    );
  },
  handleClick: function(e) {
    const { posts } = this.props;
    for (var i = 0; i < posts.list.length; i++) {
      if (e.key == posts.list[i].id) {
        var reserved = JSON.parse(posts.list[i].reserved);
        this.setState({
          current: e.key,
          visibility: 'visible',
        });
        this.props.form.setFieldsValue({
          title: posts.list[i].title,
          subtitle: posts.list[i].sub_title,
          content: posts.list[i].content,
          role: reserved.role,
          brand: reserved.brand,
          format: reserved.format,
        });
        return ;
      }
    }

    this.setState({
      current: "new",
      visibility: 'hidden',
    });
    this.props.form.resetFields();
  },
  renderPostList() {
    var doms = [];

    const { posts } = this.props;
    for (var i = 0; i < posts.list.length; i++) {
      doms.push(
        <Menu.Item key={posts.list[i].id}>
          {posts.list[i].title}
        </Menu.Item>
      );
    }
    return doms;
  },
  handleSubmit: function(e) {
    e.preventDefault();
    const { getFieldValue } = this.props.form;
    // 校验
    if (this.state.current === "new") {
      fetch('http://203.195.231.148:7013/v1/posts/', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: getFieldValue('title'),
          sub_title: getFieldValue('subtitle'),
          content: getFieldValue('content'),
          reserved: "{"+
            "\"role\":\""+getFieldValue('role')+"\","+
            "\"brand\":\""+getFieldValue('brand')+"\","+
            "\"format\":\""+getFieldValue('format')+"\""+
          "}",
          images_url: files.join(',')
        })
      })
      .then((req) => req.json())
      .then((json) => {
        if (json.success === "0") {
          const { dispatch } = thiz.props;
          dispatch({
            type: 'posts/get',
          });
          thiz.props.form.resetFields();
        }
      })
    } else {
      fetch('http://203.195.231.148:7013/v1/posts/'+this.state.current, {
        method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: getFieldValue('title'),
          sub_title: getFieldValue('subtitle'),
          content: getFieldValue('content'),
          reserved: "{"+
            "\"role\":\""+getFieldValue('role')+"\","+
            "\"brand\":\""+getFieldValue('brand')+"\","+
            "\"format\":\""+getFieldValue('format')+"\""+
          "}",
          images_url: files.join(',')
        })
      })
      .then((req) => req.json())
      .then((json) => {
        if (json.success === "0") {
          const { dispatch } = thiz.props;
          dispatch({
            type: 'posts/get',
          });
          thiz.props.form.resetFields();
        }
      })
    }
  },
  handleReset() {
    this.props.form.resetFields();
  },
  handleDelete() {
    fetch('http://203.195.231.148:7013/v1/posts/'+this.state.current, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((req) => req.json())
    .then((json) => {
      if (json.success === "0") {
        const { dispatch } = thiz.props;
        dispatch({
          type: 'posts/get',
        });
        thiz.props.form.resetFields();
      }
    })
  }
});

Dashboard = createForm()(Dashboard);

function mapStateToProps({
  posts
}, {location}) {
  return {posts: posts};
}

export default connect(mapStateToProps)(Dashboard);
