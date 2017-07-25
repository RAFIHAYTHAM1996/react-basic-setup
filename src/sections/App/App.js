'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Preloader from '../../components/Preloader/Preloader';
import RotateScreen from '../../components/Rotate/Rotate';
import { setReady, setProgress, setAssets } from './actions';
import TransitionGroup from 'react-transition-group-plus';
import detect from '../../util/detect';
import Menu from '../../components/Menu/Menu';
import MobileMenu from '../../components/MobileMenu/MobileMenu';
import MenuButton from '../../components/MenuButton/MenuButton';
import RG from '../../../raw-assets/svg/RG.svg'
import { TweenMax, TimelineMax, EasePack, TextPlugin} from 'gsap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 960,
      height: 570
    };
    this.tl = new TimelineMax({paused: true});
    this.orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
    this.timeScale = 0.35;
  }

  onResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
    this.orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
  };

  componentWillMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  componentDidMount() {
    this.tl = this.createTimeline();
    this.tl.play();
  }

  createTimeline = (done) => {
    this.tl.kill();
    this.tl.stop();
    this.tl = new TimelineMax({paused: true});

    this.tl.add(TweenMax.to(this.circle, 0, {strokeDashoffset: 50, fillOpacity: 0}));
    this.tl.add(TweenMax.to(".Logo", 0, {strokeDashoffset: 120}));

    this.tl.add(TweenMax.to(this.circle, 1 * this.timeScale, {strokeDashoffset: 0, strokeDasharray: 0, ease: Power3.easeOut, delay: 1 * this.timeScale}));
    this.tl.add(TweenMax.to(this.circle, 1 * this.timeScale, {fillOpacity: 1, ease: Power3.easeOut}));
    this.tl.add(TweenMax.to(".Logo", 2 * this.timeScale, {strokeDashoffset: 0, ease: Power3.easeOut}));

    return this.tl;
  }

  getContent(isTestRoute) {
    if (this.props.ready || isTestRoute) {
      return React.cloneElement(this.props.children, {
        key: this.props.section,
        windowWidth: this.state.width,
        windowHeight: this.state.height,
      });
    } else {
      return <Preloader
        assetsList={this.props.assets}
        setProgress={this.props.onProgress}
        setReady={this.props.onReady}
        windowWidth={this.state.width}
        windowHeight={this.state.height}
      />
    }
  }

  handleOnClick = (route) => {
    console.log(this.props.children);
    this.props.children.componentWillLeave(() => {this.context.router.push(this.props.section.nextSection)});
  }

  render() {
    const isTestRoute = (location.pathname.split('/')[1] === 'test');

    return (
      <div id="app">
        <TransitionGroup id="content" component="div" transitionMode="out-in">
          {this.getContent(isTestRoute)}
          <MenuButton/>
          {
            detect.device === "desktop" ? <Menu parent={this}/> : <MobileMenu parent={this}/>
          }

          <svg viewBox="0 0 100 100" className="LogoBackground">
             <circle cx="50" cy="50" r="45" ref={el => this.circle = el}/>
          </svg>
          <svg dangerouslySetInnerHTML={{__html: RG}} className="Logo" ref={el => this.circleText = el} >
          </svg>

          <div className="SectionCover" id="SectionCover"/>
        </TransitionGroup>
        { detect.isPhone && <RotateScreen/> }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let section = ownProps.location.pathname.split('/').filter(Boolean)[0] || 'landing';
  return {
    progress: state.progress,
    ready: state.ready,
    assets: state.assets,
    section: section
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onProgress: val => dispatch(setProgress(val)),
    onReady: val => dispatch(setReady(val)),
    onSetAssets: val => dispatch(setAssets(val))
  }
};

App.defaultProps = {
  assets: [],
  progress: 0,
  ready: false
};

App.contextTypes = {
  router: React.PropTypes.object,
  store: React.PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
