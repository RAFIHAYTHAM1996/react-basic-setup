'use strict';
import React from 'react';
import { TweenMax, TimelineMax, Ease, Power2, Power1 } from 'gsap';
import TextPlugin from 'gsap/TextPlugin'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import ParticlesConfig from './particles-config';
import settings from '../../util/settings';
import ReactGA from 'react-ga';
import Plx from 'react-plx';
import Particles from 'react-particles-js';
import { InView } from 'react-intersection-observer';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      analyticsSubmitted: {
        introAnimDone: false
      }
    }
    this.AnimationElements = []
    this.svg = {letters: []}
    this.JobTitleText = ["Hi, I'm Rafi George...", "A Full-Stack Developer"]
  }
  componentDidMount() {
    TweenMax.to(this.container, 0.5, { display: "flex" });
    TweenMax.set(this.AnimationElements, { autoAlpha: 0 });

    if (!this.props.animDone) {
      var tl = new TimelineMax({paused: true, delay: 0.5, onComplete: ()=>{
        this.props.setAnimDone()
        this.furtherSetup();
      }})

      tl.fromTo(this.svg.path, 1, {strokeDashoffset: 1600}, {strokeDashoffset: 0, ease: Expo.easeOut})
      tl.staggerFromTo(this.svg.letters, 2, { autoAlpha: 0, x: 50}, {autoAlpha: 1, x: 0, ease: Expo.easeOut }, 0.1)

      tl.to(this.svg.path, 1, { strokeDashoffset: 1100, ease: Expo.easeOut, delay: -1 })
      tl.to(this.svg.path, 0.5, { y: 300, ease: Expo.easeOut })
      tl.to(this.clipPath, 0.4, { height: 900, ease: Expo.easeOut, delay: -0.5 })
      tl.to(this.svg.letters, 0.5, { autoAlpha: 0, ease: Expo.easeOut, delay: -0.5 })
      // tl.to(document.body, 0.5, { backgroundColor: settings.colors.primaryLight, ease: Expo.easeOut, delay: 0.25 })

      tl.play();
    } else {
      // TweenMax.to(document.body, 0.5, { backgroundColor: settings.colors.primaryLight, ease: Expo.easeOut })
      this.furtherSetup();
    }
  }
  componentWillUnmount() {
    // window.removeEventListener('scroll', this.handleScroll);
    TweenMax.set(this.container, {autoAlpha: 0});
  }
  componentDidUpdate() {
    if (this.GSVGFadeout) TweenMax.to(this.GSVGFadeout, 0.5, {autoAlpha: 0, delay: 1})
    if (this.Particles) TweenMax.to(this.Particles, 0.5, {opacity: 1, ease: Power1.easeInOut})
  }
  furtherSetup = () => {
    // window.addEventListener('scroll', this.handleScroll);
    // this.handleScroll()

    if (!this.state.analyticsSubmitted.introAnimDone) {
      ReactGA.modalview('landing');
      this.setAnalyticSubmission('introAnimDone')
    }

    var tl = new TimelineMax({ paused: true, delay: 0.5, onComplete: () => {
      const tlSVG = new TimelineMax({ paused: true });
      tlSVG.to(this.ScrollSVGPath, 0.5, { autoAlpha: 0 })
      tlSVG.set(this.ScrollSVGPath, { strokeDashoffset: 1000, autoAlpha: 1 })
      tlSVG.to(this.ScrollSVGPath, 1, { strokeDashoffset: 0, ease: Expo.easeOut })
      tlSVG.play();

      const tlCursor = new TimelineMax({ repeat: -1 });
      tlCursor.to(this.JobCursor, 0.125, {autoAlpha: 0, delay: 0.25});
      tlCursor.to(this.JobCursor, 0.125, {autoAlpha: 1, delay: 0.25});
      tlCursor.play();
    }});
    tl.to(this.JobTitle, 2, { text: this.JobTitleText[0], ease: Power2.easeOut });
    tl.to(this.JobTitle, .5, { text: '', delay: 2, ease: Power2.easeOut });
    
    tl.staggerTo([this.backgroundNameFirstText, this.backgroundNameSecondText], 2, { opacity: 0.2, delay: -0.5, ease: Power2.easeOut, onStart: () => {
      TweenMax.to(this.backgroundNameFirstText, 15, { x: 50, ease: Power2.easeOut });
      TweenMax.to(this.backgroundNameSecondText, 15, { x: -50, ease: Power2.easeOut });
    }}, 0.2);
    tl.fromTo(this.AnimationElements, 1, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, ease: Power2.easeOut, delay: -1 });
    
    tl.to(this.JobTitle, 2, { text: this.JobTitleText[1], ease: Power1.easeOut, delay: -1.25 });
    tl.play();

  }
  setAnalyticSubmission = (name) => {
    if (name) {
      this.setState({ analyticsSubmitted: { ...this.state.analyticsSubmitted, [name]: true }})
    }
  }

  intersectionObserverHandler = (inView, entry) => {
    if (inView) {
      const { inViewCallback } = this.props
      inViewCallback(this.container.id, settings.colors.primary)

      const { loaded } = this.state;
      if (!loaded) {
        this.setState({ loaded: true })
      }

    }
  }

  render() {
    var xOffset = 150, yOffset = 150 - 20, spacing = 25,
        // name = [..."B E T A".split(" ")];
        // spacing = 25,
        name = [..."R A F I G E O R G E".split(" ")];
    xOffset = 250 - (name.length/2 * spacing)

    this.svg.letters = []
    this.AnimationElements = []

    return <div
      id="section-landing"
      style={{ display: "none" }}
      ref={el => this.container = el}
    >
      { !this.props.animDone ?
        (
          <>
            <svg width="7.708in" height="11.861in" className="brand-svg centered light" viewBox="0 0 645 1000 ">
              <defs>
                <clipPath id="brand-clip-path">
                  <rect x="0" y="0" width="600" height="0" ref={el => this.clipPath = el} />
                </clipPath>
              </defs>
              <g transform="scale(0.95)">
                <path fill="none" ref={el => this.brandSVG = el} clipPath="url(#brand-clip-path)" stroke="rgb(1, 1, 1)" strokeWidth="30px" strokeLinecap="butt" strokeLinejoin="miter"
                 d="M171.000,46.000 C183.872,67.708 234.967,206.805 372.308,111.758 C594.828,-82.602 576.255,537.461 296.000,356.000 C50.578,197.781 507.000,823.000 507.000,823.000 C506.934,828.609 136.847,513.242 170.362,357.095 C197.805,229.232 301.000,312.000 301.000,312.000 C301.000,312.000 431.547,437.773 457.000,244.000 C482.453,50.227 354.988,174.299 346.000,178.000 C333.366,183.202 198.806,283.646 133.811,100.111 C69.787,-80.683 -14.932,586.065 26.000,241.000 C66.160,-97.559 171.000,46.000 171.000,46.000 Z"/>
              </g>
            </svg>

            <div id="intro-svg">
              <svg width="500" height="300" viewBox="0 0 500 300">
                <path d="M1,1 L499,1 L499,299 L1,299 Z" ref={el => this.svg.path = el}/>
                { name && name.length &&
                  name.map((letter, index) => {
                    return (
                      <text x={xOffset + (index * spacing)} key={index}
                            y={yOffset + 35} ref={el => this.svg.letters[index] = el}>{letter}</text>
                    )
                  })
                }
              </svg>
            </div>
          </>
        ) : (
          <InView onChange={ this.intersectionObserverHandler } threshold={.5}>
            {({ inView, ref, entry }) => (
              <div ref={ref}>
                { /* Particles */ }
                <div ref={el => this.Particles = el} style={{ opacity: 0 }}>
                 { inView &&
                    <Particles canvasClassName="particles-canvas" params={ParticlesConfig} />
                 }
                </div>
                { /* R SVG */ }
                <svg width="7.708in" height="11.861in" className="brand-svg gradient fixed"
                    onClick={this.props.scrollToSection.bind(this, 'Landing')}
                    ref={el => this.AnimationElements[0] = el}>
                  <defs>
                    <linearGradient y2="1" x2="1" y1="0" x1="0" id="brand-svg-gradient">
                    <stop stopColor={settings.shade(settings.colors.primaryLight, 0.2)} offset="0"/>
                    <stop stopColor={settings.shade(settings.colors.primaryLight, -0.3)} offset="1"/>
                    </linearGradient>
                  </defs>
                  <g transform="scale(0.045)">
                    <path fill="none" stroke="rgb(1, 1, 1)" strokeWidth="30px" strokeLinecap="butt" strokeLinejoin="miter"
                    d="M171.000,46.000 C183.872,67.708 234.967,206.805 372.308,111.758 C594.828,-82.602 576.255,537.461 296.000,356.000 C50.578,197.781 507.000,823.000 507.000,823.000 C506.934,828.609 136.847,513.242 170.362,357.095 C197.805,229.232 301.000,312.000 301.000,312.000 C301.000,312.000 431.547,437.773 457.000,244.000 C482.453,50.227 354.988,174.299 346.000,178.000 C333.366,183.202 198.806,283.646 133.811,100.111 C69.787,-80.683 -14.932,586.065 26.000,241.000 C66.160,-97.559 171.000,46.000 171.000,46.000 Z"/>
                  </g>
                </svg>

                { /* Rafi George (background) SVG */ }
                <svg id="background-name-svg" className="fixed">
                  <g id='background-name-main-group'>
                    <g ref={ e => this.backgroundNameFirstText = e } style={{ opacity: 0 }}>
                      <text id='first'>RAFI</text>
                    </g>
                    <g ref={ e => this.backgroundNameSecondText = e } style={{ opacity: 0 }}>
                      <text id='second'>GEORGE</text>
                    </g>
                  </g>
                </svg>

                <h1 className="jobtitle">
                  <span ref={el => this.JobTitle = el} key='job-title'>{/*This is set through animation*/}</span>
                  <span ref={el => this.JobCursor = el} key='job-title-cursor'>_</span>
                </h1>

                { /* Scroll Down SVG */ }
                <Plx className='scroll-icon'
                    parallaxData={[{
                      start: 0,
                      duration: 150,
                      properties: [
                        {
                          startValue: 1,
                          endValue: 0,
                          property: "opacity"
                        },
                        {
                          startValue: 0,
                          endValue: -50,
                          property: "translateY"
                        }
                      ]
                    }]}>
                  <svg viewBox="0 0 247 390" ref={el => this.AnimationElements[1] = el}
                      onClick={this.props.scrollToSection && this.props.scrollToSection.bind(this, 'section-bio')}>
                    <path id="wheel" d="M123.359,180 L123.359,250"/>
                    <path ref={ el => this.ScrollSVGPath = el } id="mouse" d="M236.717,123.359c0,-62.565 -50.794,-113.359 -113.358,-113.359c-62.565,0 -113.359,50.794 -113.359,113.359l0,143.237c0,62.565 50.794,113.359 113.359,113.359c62.564,0 113.358,-50.794 113.358,-113.359l0,-143.237Z"/>
                  </svg>
                </Plx>
              </div>
            )}
          </InView>
        )
      }
    </div>;
  }
};

Landing.defaultProps = {
  windowWidth: 960,
  windowHeight: 570
};

export default Landing;
