'use strict';
import React from 'react';
import { TweenMax, TimelineMax, EasePack, TextPlugin } from 'gsap';
import settings from '../../util/settings';
import ReactGA from 'react-ga';
import { InView, useInView } from 'react-intersection-observer';
import Feature from '../../components/Feature/Feature';
import BackgroundPattern from '../../components/BackgroundPattern/BackgroundPattern';

class Bio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      analyticsSubmitted: {
        scroll: false
      }
    }
    this.ASSET_PATH = settings.ASSET_PATH;
    this.AnimationElements = []
  }

  handleInputChange = (e, item)=> {

  }
  
  setAnalyticSubmission = (name) => {
    if (name) {
      this.setState({analyticsSubmitted: {...this.state.analyticsSubmitted, [name]: true}})
    }
  }

  appendElement = (el) => {
    if (el) this.AnimationElements.push(el)
  }

  intersectionObserverHandler = (inView, entry) => {
    if (inView) {
      const { inViewCallback } = this.props
      inViewCallback(this.container.id, '#111')
    }
  }

  render() {
    this.AnimationElements = []

    return <div
      id="section-bio"
      ref={el => this.container = el}
    >
      <InView onChange={ this.intersectionObserverHandler } threshold={.5}>
        {({ inView, ref, entry }) => {
          return (
            <div className='container' ref={ref}>
              <div className='row'>
                <div className='col-sm-4 d-none d-sm-inline'>
                    <picture>
                      {/* <source srcSet={`${settings.ASSET_PATH}images/profile.webp`} type="image/webp" /> */}
                      <img src={ `${settings.ASSET_PATH}images/profile.jpg` } className='profile-img' />
                    </picture>
                </div>
                <div className='d-inline d-sm-none mb-5'>
                  <picture>
                    {/* <source srcSet={`${settings.ASSET_PATH}images/profile.webp`} type="image/webp" /> */}
                    <img src={ `${settings.ASSET_PATH}images/profile.jpg` } className='profile-img' />
                  </picture>
                </div>
                <div className='offset-md-1 col-md-7 bio-container'>
                  <h2 className="bio-heading">Skillset Backed By Experience</h2>
                  <p className='bio-copy'>I've had the pleasure to collaborate with amazing teams and individuals across numerous industries. Having developed a wide variety of projects — ranging from fully animated landing pages, to highly available micro-services and everything in between — I'm capable of not only delivering high quality software, but also communicating effectively within a team.</p>
                  <p className='bio-copy'>Before diving into a project, I set out to strategize the development plan; eliminating any potential core issues and increasing development efficiency.</p>
                </div>
              </div>
            </div>
           )
        }}
      </InView>
        
      {/* <div className="ContentContainer">
        <div className="row">
          <h1 className="personalIntro">Hi, I'm Rafi George.</h1>
        </div>
        <div className="row flex-center">
          { this.props.data.map((item, index) => {
              return (
                <div className="feature-container col-md-6 col-xl-4" ref={el => this.appendElement(el)} key={index}>
                  <Feature text={item.text} icon={item.icon} />
                </div>
              )
            })
          }
        </div> 
      </div>*/}
    </div>;
  }
};

Bio.defaultProps = {
  windowWidth: 960,
  windowHeight: 570
};

export default Bio;
