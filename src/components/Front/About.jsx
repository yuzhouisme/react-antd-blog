import React, {Component, PropTypes} from 'react';
import {Button, Carousel, Col, Icon, Row} from 'antd';
import Header from '../Header';
import FooterLayout from '../../layouts/Layout/FooterLayout';
import styles from './Post.less';

let About = React.createClass({
  render() {
    return (
      <div>
        <Header location={this.props.location}/>

        <div className={styles.container}>
          <div className={styles.heading}>
            <Icon type="caret-right" className={styles.caretRight}/>
            ABOUT ME
            <Icon type="caret-left" className={styles.caretLeft}/>
          </div>
          <p className={styles.subheading}>
            "一个人在年轻的时候，做的每一件事情，能清楚的区分其中随机性所占的比例并能心平气和的接受它。"
          </p>
          <Row className={styles.partition} type="flex" align="middle" justify="center">
            <Col span={8}>
              <b>FROM:</b><br/>
              <span>广州，中国</span>
            </Col>
            <Col span={8}>
              <b>BORN ON:</b><br/>
              <span>21 July 88</span>
            </Col>
            <Col span={8}>
              <b>PROFESSIONAL:</b><br/>
              <span>软件程序设计师</span>
            </Col>
          </Row>
          <Row type="flex" align="middle" justify="center">
            <Col span={24}>
              <div className={styles.aboutPicture}></div>
            </Col>
          </Row>
          <Row type="flex" align="middle" justify="center">
            <Col span={24}>
              <h1 className={styles.title}>Build Things You Enjoy</h1>
              <p className={styles.paragraph}>
                我是瑜周，出生在中国的大东北，目前在广州生活。像大部分80年代的孩子，我玩任天堂的电视游戏机长大，并且很早的接触到了电脑。大概在三年级的时候，家里就有了一台386，那时开机就会进入DOS系统，然后再进入游戏。我对电脑一直很好奇，并且伴随着我的成长，在那个时代，互联网缓慢的入侵着现实世界。由于我的父亲从事电脑相关的工作，那时，我意识到，我想成为一名开发人员。
              </p>
              <p className={styles.paragraph}>
                在2006年的秋季，我作为大一新生入学，专业选读软件工程，我发现我热爱这个东西。在自由、无虑的大学四年，我的专业技能偏向嵌入式的方向，经常使用的编程语言是C语言，拎着块ARM7的板子进行着ARM／FPGA编程，那时，社会上就已经在传“智能家居”这一产品概念。然而，在我毕业那年，我发现我同样的热爱设计，热爱UI。于是我放弃了嵌入式方向的工作机会，选择了开发桌面应用的工作。初尝QT语言，并使用它完成Linux/Windows/Mac三平台的桌面应用开发。
              </p>
              <p className={styles.paragraph}>
                在差不多四年的工作中，我先后学习了C++、Java、Bash、Python、Object-C、HTML、CSS、JS、GO这些语言，并且在工作之外，与人分享学习及使用这些知识的相关经验，学无止境。
              </p>
              <p className={styles.paragraph}>
                现在，我在广州生活，做android/iOS的开发工作，另外我还可以编写服务端，前端使用React+NodeJS，后端则使用GO（Beego）。我热爱绘画，热爱设计，热爱Coding，热爱研究，希望你也同样的热爱你的生活。 － 这是生命中最好的奖励。
              </p>
              <p className={styles.paragraph}>
                Mail Me: yuzhouisme@me.com
              </p>
            </Col>
          </Row>
        </div>
        <FooterLayout/>
      </div>
    );
  }
});

export default About;
