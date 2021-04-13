import React, { Component, Fragment } from "react";
import { TweenMax, TimelineMax, EasePack, TextPlugin, Power1} from 'gsap';
import ReactGA from 'react-ga';
import Plx from 'react-plx';
import Page from "../layouts/main";
import Landing from "../sections/Landing/Landing";
import Experience from "../sections/Experience/Experience";
import Contact from "../sections/Contact/Contact";
import Bio from "../sections/Bio/Bio";
import BackgroundPattern from "../components/BackgroundPattern/BackgroundPattern";
import settings from "../util/settings";
import data from '../util/data.json';


class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      animDone: false,
      showBGPattern: false,
      detect: {}
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.setState({detect: this.Page.getDetect()})
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    if (!settings.isServer()) {
      var orientation = this.state.orientation;
      if (window.innerHeight >= window.innerWidth) {
        orientation = "portrait"
      } else {
        orientation = "landscape"
      }
      if (orientation != this.state.orientation) {
        document.body.className = document.body.className.replace(this.state.orientation, orientation);
        this.setState({orientation: orientation});
      }
    }
  }

  inViewCallback = (id, color) => {
    if(!settings.isServer()) {
      TweenMax.to(document.body, .5, { backgroundColor: color, ease: Power1.easeInOut })
      this.setState({ showBGPattern: id !== 'section-landing' })
    }
  }

  setAnimDone = () => {
    this.setState({animDone: true})
  }

  render() {
    const { showBGPattern } = this.state
    return (
      <Page id="Home" showMenu={this.state.animDone} ref={el => this.Page = el}>
        {/* { showBGPattern && <BackgroundPattern /> } */}

        <Landing scrollToSection={this.Page ? this.Page.scrollToSection : () => {}}
                 animDone={this.state.animDone}
                 setAnimDone={this.setAnimDone}
                 inViewCallback={this.inViewCallback} />

        { this.state.animDone && (
            <Fragment>
              <Bio data={data.features} inViewCallback={this.inViewCallback}  />
              <Experience data={data.projects} detect={this.Page && this.Page.getDetect()} inViewCallback={this.inViewCallback} />
              <Contact inViewCallback={this.inViewCallback} />
            </Fragment>
          )
        }
      </Page>
    )
  }
}

export default Index
