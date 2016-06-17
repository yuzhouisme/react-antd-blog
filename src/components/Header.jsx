import React, {Component, PropTypes} from 'react';
import {Button, Col, Menu, Modal, Row} from 'antd';
import {Router, Route, IndexRoute, Link} from 'react-router';
import styles from './Header.less';
import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import Login from './Front/Login';

var thiz = undefined;
const Header = React.createClass({
  getInitialState() {
    return {
      current: this.props.location === undefined
        ? "/"
        : this.props.location.pathname,
      visible: false,
      logined: false,
    };
  },
  componentDidMount() {
    if (cookie.get("logined") !== undefined) {
      this.setState({
        logined: true,
      })
    }
  },
  showModal() {
    this.setState({ visible: true });
  },
  hideModal() {
    this.setState({ visible: false });
  },
  render() {
    thiz = this;
    return (
      <div>
        <Row type="flex" align="middle" justify="center">
          <Col xs={24} sm={6} md={5} lg={4}>
            <Row type="flex" align="middle" justify="center" className={styles.logo}>
              <img src="static/site/logo.png" width="32" height="32"/>
              <span className={styles.name}>yuzhouisme</span>
              <span className={styles.line}>
                |
              </span>
            </Row>
          </Col>
          <Col xs={12} sm={13} md={15} lg={17}>
            <Menu className={styles.menu} selectedKeys={[this.state.current]} mode="horizontal">
              <Menu.Item className={styles.item} key="/">
                <Link to="/">首页</Link>
              </Menu.Item>
              <Menu.Item className={styles.item} key="/about">
                <Link to="about">关于我</Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col xs={12} sm={5} md={4} lg={3}>
            <Row type="flex" align="middle" justify="end" className={styles.side}>
              <Button type="ghost" onClick={this.state.logined ? this.quit : this.showModal}>{this.state.logined ? '登出' : '登录'}</Button>
            </Row>
          </Col>
        </Row>
        <Modal title="登录" visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.hideModal}>
          <Login ref="login"/>
        </Modal>
      </div>
    );
  },
  handleSubmit() {
    const { getFieldValue } = this.refs.login;
    console.log(this.props);
    fetch('http://203.195.231.148:7013/v1/tickets/', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: getFieldValue('username'),
        password: getFieldValue('password')
      })
    })
    .then((req) => req.json())
    .then((json) => {
      console.log(json);
      if (json.success === "0") {
        cookie.set('logined', 'A9AED9F9-B1C5-429C-999C-793B991E0ABC');
        // 跳转
        thiz.props.history.replaceState(null, '/dashboard')
      }
    })
  },
  quit() {
    cookie.remove('logined');
    // 跳转
    this.props.history.replaceState(null, '/')
  }
});

export default Header;
