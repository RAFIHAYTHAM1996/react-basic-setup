'use strict';
import React from 'react';
import Tween from 'gsap';
import { TweenMax, TimelineMax, EasePack } from 'gsap';
import SectionManager from '../../components/SectionManager/SectionManager';
import Home from '../Home/Home';

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillEnter(done) {

  }
  componentWillLeave(done) {

  }

  render() {
    const style = {width: this.props.windowWidth, height: this.props.windowHeight};
    return <div
      style={style}
      id="Landing"
      ref={this.setContainer}
    >
      <Home />
    </div>;
  }
};

Landing.defaultProps = {
  windowWidth: 960,
  windowHeight: 570
};

export default Landing;
