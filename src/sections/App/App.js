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
import Image from '../../components/Image/Image';
import MobileDetect from 'mobile-detect';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 960,
      height: 570,
      loggedIn: false,
      device: ""
    };
    this.tl = new TimelineMax({paused: true});
    this.timeScale = 0.35;
  }

  onResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  componentWillMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  componentDidMount() {
    if (this.state.loggedIn) {
      this.tl = this.createTimeline();
      this.tl.play();
    }

    this.setState({device: detect.device});
  }

  createTimeline = (done) => {
    this.tl.kill();
    this.tl.stop();
    this.tl = new TimelineMax({paused: true});

    this.tl.add(TweenMax.to(this.circle, 0, {strokeDashoffset: 290, fillOpacity: 0}));
    this.tl.add(TweenMax.to(".Logo", 0, {strokeDashoffset: 230}));
    this.tl.to(".Header", 0, {y: -window.innerWidth * 0.3});

    this.tl.to(".Header", 1 * this.timeScale, {y: 0, ease: Power3.easeOut, delay: 3 * this.timeScale});
    this.tl.add(TweenMax.to(this.circle, 1 * this.timeScale, {strokeDashoffset: 0, ease: Power3.easeOut, delay: -1 * this.timeScale}));
    this.tl.add(TweenMax.to(this.circle, 1 * this.timeScale, {fillOpacity: 1, ease: Power3.easeOut}));
    this.tl.add(TweenMax.to(".Logo", 2 * this.timeScale, {strokeDashoffset: 0, ease: Power3.easeOut}));

    return this.tl;
  }

  componentDidUpdate = () => {
    var mobileDetect = new MobileDetect(navigator.userAgent);
    if ((mobileDetect.mobile() && detect.device === 'desktop') || (!mobileDetect.mobile() && detect.device !== 'desktop')) {
      location.reload();
    }
  }

  getContent(isTestRoute, children) {
    if (this.props.ready || isTestRoute) {
      return React.cloneElement(children, {
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

  checkPassword = () => {
    if (this.PasswordInput.value === '6229') {
      var tl = new TimelineMax({paused: true});
      tl.add(TweenMax.to(this.PasswordProtection, 1, {y: - window.innerHeight * 2, ease: Power3.easeIn}));
      tl.add(TweenMax.to(this.PasswordProtection, 0.1, {display: 'none', onComplete: () => {
        this.setState({loggedIn: true});
        this.tl = this.createTimeline();
        this.tl.play();
      }}));
      tl.play();
    } else {
      this.description.innerHTML = "INCORRECT PASSWORD";
    }
  }

  render() {
    const isTestRoute = (location.pathname.split('/')[1] === 'test');

    return (
      <div id="app">
      {
        !this.state.loggedIn ? (
          <div id="PasswordProtection" ref={el => this.PasswordProtection = el} >
            <div id="LandingImage">
              <Image src="./assets/images/EmoRoad.jpg"/>
            </div>
            <h1 className="description" ref={el => this.description = el} >SITE UNDER MAINTENANCE</h1>
            <input type="number" placeholder="PASSWORD" ref={el => this.PasswordInput = el} />
            <div className="ENTER" onClick={this.checkPassword}>
    					ENTER
    				</div>
          </div>
        ) : (
          <TransitionGroup id="content" component="div" transitionMode="out-in">
            {this.getContent(isTestRoute, this.props.children)}
            <div className="Header" ref={el => this.HEADER = el} >
              <MenuButton/>

              <svg viewBox="0 0 100 100" className="LogoBackground">
                 <circle cx="50" cy="50" r="45" ref={el => this.circle = el}/>
              </svg>
              <svg dangerouslySetInnerHTML={{__html: RG}} className="Logo" ref={el => this.circleText = el} onClick={ () => {
                this.context.router.push("/");
              } }>
              </svg>
            </div>

            {
              detect.device === "desktop" ? <Menu parent={this}/> : <MobileMenu parent={this}/>
            }

            <div className="SectionCover" id="SectionCover"/>
          </TransitionGroup>
        )
      }
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
    section: state.section,
    route: state.routing
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
