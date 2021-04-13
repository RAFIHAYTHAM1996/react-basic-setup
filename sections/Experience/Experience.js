'use strict';
import React from 'react';
import { TweenMax, TimelineMax } from 'gsap';
import ReactGA from 'react-ga';
// import GlitchSlideshow from '../../plugins/GlitchSlideshow/GlitchSlideshow';
import { InView } from 'react-intersection-observer';
import data from '../../util/data.json'
import settings from '../../util/settings'
import detect from '../../util/detect'

class Experience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      analyticsSubmitted: {
        scroll: false
      }
    }
    this.AnimationElements = []
    this.TechLists = []
    this.ASSET_PATH = settings.ASSET_PATH + 'images/'
  }
  componentDidMount() {
    TweenMax.to(this.container, 0.5, {autoAlpha: 1});
    TweenMax.set(this.AnimationElements, {autoAlpha: 0});
    // this.animateIn();

    detect.init();
    if(detect.device() === 'desktop') window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll()
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    TweenMax.set(this.container, {autoAlpha: 0});
    if(detect.device() === 'desktop') window.removeEventListener('mousemove', this.handleMouseMove)
  }
  setAnalyticSubmission = (name) => {
    if (name) {
      this.setState({analyticsSubmitted: {...this.state.analyticsSubmitted, [name]: true}})
    }
  }
  animateIn = () => {
    var tl = new TimelineMax({paused: true, delay: 0.5});
    tl.staggerFromTo(this.AnimationElements, 2, {autoAlpha: 0, y: 50}, {autoAlpha: 1, y: 0, ease: Expo.easeOut}, 0.25);
    tl.play();
  }
  handleScroll = () => {
    if (this.container.getBoundingClientRect().top < window.innerHeight && !this.state.analyticsSubmitted.scroll) {
      ReactGA.modalview('work');
      this.setAnalyticSubmission('scroll')
    }
    if (this.container.getBoundingClientRect().top < window.innerHeight) {
      this.animateIn();
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  intersectionObserverHandler = (inView, entry) => {
    if (inView) {
      const { inViewCallback } = this.props
      inViewCallback(this.container.id, '#111')
    }
  }

  chunk = (arr) => {
    let chunks = [], count = 0, baseChunkSize = 5, chunkSize;
    if(!settings.isServer()) {
      if(window.innerWidth < 576) {
        baseChunkSize = 2
      }
    }
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      chunkSize = count % 2 === 0 ? baseChunkSize : baseChunkSize + 1
      chunks.push(arr.slice(i, i + chunkSize));
      count++;
    }

    return chunks;
  }

  handleMouseMove = e => {
    const halfScreen = window.innerWidth / 2
    const x = e.clientX - halfScreen
    const offset = (x / halfScreen) * 150
    const altOffset = offset * -1
    this.TechLists.forEach((list, index) => {
      TweenMax.to(list, .6, { transform: `translateX(${ index % 2 === 0 ? offset : altOffset }px)` })
    })
  }

  render() {
    this.AnimationElements = []
    this.InputFields = []
    return <div
      id="section-experience"
      ref={el => this.container = el}
    >
     <InView onChange={ this.intersectionObserverHandler } threshold={.5}>
        {({ inView, ref, entry }) => (
          // <div className="previewContainer" ref={ref}>
          //   <GlitchSlideshow base={settings.ASSET_PATH + 'images/'} data={this.props.data} detect={this.props.detect}/>
          // </div>
          <div className='experience-container' ref={ref}>
            <div className='container'>
              <h2>Same places I’ve worked ..</h2>
              <ul className='companies'>
                { data.experience.companies.map((company, index) =>
                    <li key={company.name + index}>
                      <img key={index} src={`${this.ASSET_PATH}companies/${company.thumbnail}`} alt={company.name + ' Logo'} />
                    </li>
                )}
              </ul>
              <h2>.. and some freelance work I've done</h2>
              <ul className='projects row'>
                { data.experience.projects.map((project, index) =>
                    <li className='col-md-4 mb-5'  key={project.name + index}>
                      <a href={ project.link } target='_black' rel='noopener noreferer'>
                        <div className='project-info'>
                          <div className='project-thumbnail'>
                            <img key={index} src={`${this.ASSET_PATH}projects/${project.thumbnail}`} alt={project.name + ' snapshot'} />
                          </div>
                          <div className='project-desc'>
                            <h5 className='project-title'>{ project.name }</h5>
                            <p className='project-category'>{ project.category }</p>
                          </div>
                        </div>
                      </a>
                    </li>
                )}
              </ul>
              <h2>Technologies and methodologies I use</h2>
            </div>
            { this.chunk(data.experience.technologies).map((chunk, idx) => (
                <ul className={`technologies ${idx % 2 === 0 ? 'even' : 'odd'}`} ref={ e => this.TechLists[idx] = e } key={'chunk-' + idx}>
                  { chunk.map((technology, index) =>
                      <li key={technology.name + index}>
                        <img key={index} src={`${this.ASSET_PATH}technologies/${technology.thumbnail}`} alt={technology.name + ' Logo'} />
                      </li>
                  )}
                </ul>
              ))
            }
          </div>

        )}
      </InView>
    </div>;
  }
};

Experience.defaultProps = {
  windowWidth: 960,
  windowHeight: 570
};

export default Experience;
