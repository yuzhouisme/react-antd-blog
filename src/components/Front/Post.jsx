import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Carousel, Col, Icon, Row } from 'antd';
import Header from '../Header';
import FooterLayout from '../../layouts/Layout/FooterLayout';
import styles from './Post.less';

let Post = React.createClass({
  renderPost: function() {
    const { posts } = this.props;
    var doms = [];

    for (var i = 0; i < posts.list.length; i++) {
      var reserved = JSON.parse(posts.list[i].reserved);
      var imagesUrl = posts.list[i].images_url.split(',');
      var imagesDoms = [];
      if (imagesUrl != undefined && imagesUrl[0] != "") {
        for (var j = 0; j < imagesUrl.length; j++) {
          var backgroundImageUrl = "static/" + imagesUrl[j];
          imagesDoms.push(
            <Col xs={24} sm={24} md={8} lg={8} key={j}>
              <img className={styles.picture} src={backgroundImageUrl} draggable="false" width="90%" height="90%"/>
            </Col>
          );
        }
      }
      doms.push(
        <div key={i}>
          <div>
            <h1 className={styles.title}>{posts.list[i].title}</h1>
            <Row className={styles.partition} type="flex" align="middle" justify="center">
              <Col span={8}>
                <b>ROLE:</b><br /><span>{reserved.role}</span>
              </Col>
              <Col span={8}>
                <b>BRAND:</b><br /><span>{reserved.brand}</span>
              </Col>
              <Col span={8}>
                <b>FORMAT:</b><br /><span>{reserved.format}</span>
              </Col>
            </Row>
            <Row type="flex" align="middle" justify="center">
              <Col xs={24} sm={24} md={8} lg={8}>
                <div className={styles.subtitle}>
                  <h1 className={styles.summary}>At A Glance</h1>
                  <p><b>{posts.list[i].title}</b></p>
                  <p>{posts.list[i].sub_title}</p>
                </div>
              </Col>
              <Col xs={24} sm={24} md={16} lg={16}>
                <div className={styles.subtitle}>
                  <h1 className={styles.summary}>The Challenge</h1>
                  <p>{posts.list[i].content}</p>
                </div>
              </Col>
            </Row>
          </div>
          <div>
            <Row type="flex" align="middle" justify="center">
              <Col xs={24} sm={24} md={24} lg={24}>
                <h1 className={styles.summary}>Gallery</h1>
                {imagesDoms}
              </Col>
            </Row>
          </div>
        </div>
      );
    }
    return doms;
  },
  render() {
    const { posts } = this.props;
    return (
      <div>
        <Header location={this.props.location} {...this.props} />

        <div className={styles.container}>
          <div className={styles.heading}>
            <Icon type="caret-right" className={styles.caretRight}/>
            WORKS
            <Icon type="caret-left" className={styles.caretLeft}/>
          </div>
          <p className={styles.subheading}>
            <span>Swipe right/left</span> 可浏览我的作品
          </p>
          <Carousel>
            {this.renderPost()}
          </Carousel>
          <Row type="flex" align="middle" justify="center">
            <p>我的访客：{posts.visitors}人</p>
            <img src="static/site/small-icon.png" width="154px" height="44px" />
          </Row>
        </div>
        <FooterLayout />
      </div>
    );
  },
});

function mapStateToProps({
  posts
}, {location}) {
  return {posts: posts};
}

export default connect(mapStateToProps)(Post);
