import Head from 'next/head'
import Menu from '../components/Menu/Menu'
import React, { Component } from "react";
import { TweenMax, TimelineMax, EasePack, TextPlugin} from 'gsap';
import Stats from '../util/stats';
import settings from '../util/settings';
import detect from '../util/detect/index.js';
import ReactGA from 'react-ga';

export default class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      introON: false,
      cursor: {
        paused: false,
        borderRadius: 25
      }
    }
    this.scrolling = false
  }

  componentDidMount() {
    // if (settings.isDev) Stats();
    detect.init();
    document.body.className = [...document.body.className.split(' '), ...detect.classes()].join(' ');
    window.addEventListener('mousemove', this.handleMouseMove)
    ReactGA.initialize(settings.GACcode)
    ReactGA.pageview(window.location.pathname)
  }

  scrollToSection = (id, callback)=>{
    if (!this.scrolling) {
      this.scrolling = true
      const cback = () => {
        this.scrolling = false
        if (typeof callback === "function") callback();
      }
      const el = document.getElementById(id);
      if (id) {
        TweenMax.to(window, 1, {scrollTo: {y: (window.pageYOffset + el.getBoundingClientRect().top), autoKill:false}, ease: Expo.easeInOut, onComplete: cback});
      }
    }
  }

  moveContainer = (collapsed) => {
    if (this.SectionsContainer) {
      if (collapsed) {
        TweenMax.to(this.SectionsContainer, 0.5, {x: -100, opacity: 0.2, ease: Power1.easeOut, delay: 0.125})
      } else {
        TweenMax.to(this.SectionsContainer, 0.5, {x: 0, opacity: 1, ease: Power1.easeOut})
      }
    }
  }

  getDetect = () => {
    return detect;
  }

  render() {
    return (
      <div id={this.props.id || ""}
           className={this.props.className || ""}>
        {
          // <div id="custom-cursor" ref={el => this.Cursor = el} style={{borderRadius: this.state.cursor.borderRadius}}></div>
        }
        { this.props.showMenu &&
          <Menu ref={el => this.Menu = el}
              scrollToSection={this.scrollToSection}
              theme={"light"}
              moveContainer={this.moveContainer} />
        }
        <div ref={el => this.SectionsContainer = el}>
          { this.props.children }
        </div>
      </div>
    )
  }
}
