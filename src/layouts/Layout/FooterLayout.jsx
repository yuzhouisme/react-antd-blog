import React, {Component, PropTypes} from 'react';
import {Button, Col, Menu, Row} from 'antd';
import {Router, Route, IndexRoute, Link} from 'react-router';
import styles from './FooterLayout.less';

const FooterLayout = () => {
  return (
    <Row type="flex" align="middle" justify="center">
      <p>
        Copyright &copy;
        <a href="http://yuzhouisme.com">yuzhouisme.com</a>
        2015
      </p>
    </Row>
  );
};

export default FooterLayout;
