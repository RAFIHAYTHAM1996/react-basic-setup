import React, {Component} from 'react';
import bar from '../../../raw-assets/svg/bar.svg'
import HamburgerMenu from '../../../raw-assets/svg/HamburgerMenu.svg'
import { toggleMenu } from '../../actions/menu';
import { TweenMax, TimelineMax, EasePack } from 'gsap';
import Menu from '../Menu/Menu';
import keys from '../../reducers/keys.js';
import { connect } from 'react-redux';

class MenuButton extends Component{

  constructor(props) {
    super(props);
    this.onMenuToggle = this.props.onMenuToggle.bind(this);
    this.animateInOut = this.animateInOut.bind(this);
    this.tl = new TimelineMax({paused: true});
    this.OnAnimationDelay = 1;
    this.time = 0.3;
    this.GetCurrentSectionName = this.GetCurrentSectionName.bind(this);
  }

  componentDidMount(){
    this.HamburgerMenu = this.HamburgerMenu.childNodes[0].childNodes[1];
    this.circle = this.HamburgerMenu.childNodes[1];
    this.topHamburgerBar = this.HamburgerMenu.childNodes[3];
    this.middleHamburgerBar = this.HamburgerMenu.childNodes[5];
    this.bottomHamburgerBar = this.HamburgerMenu.childNodes[7];
    this.tl = this.createTimeline();
    this.animateInOut();
  }

  componentDidUpdate(){
    this.HamburgerMenu = this.HamburgerMenu.childNodes[0].childNodes[1];
    this.circle = this.HamburgerMenu.childNodes[1];
    this.topHamburgerBar = this.HamburgerMenu.childNodes[3];
    this.middleHamburgerBar = this.HamburgerMenu.childNodes[5];
    this.bottomHamburgerBar = this.HamburgerMenu.childNodes[7];
    this.animateInOut();
  }

  createTimeline = (done) => {
    this.tl.kill();
    this.tl.stop();
    this.tl = new TimelineMax({paused: true});
    this.tl.add(TweenMax.to([this.topHamburgerBar, this.middleHamburgerBar, this.bottomHamburgerBar], 0, {scaleX: 0, ease: Power1.easeIn}));
    this.tl.add(TweenMax.to(this.circle, this.time, {strokeDashoffset: 0, ease: Back.easeIn, delay: this.OnAnimationDelay}));
    this.tl.add(TweenMax.to(this.circle, this.time, {fillOpacity: 1, ease: Back.easeOut}));
    this.tl.add(TweenMax.to([this.topHamburgerBar, this.middleHamburgerBar, this.bottomHamburgerBar], this.time, {fillOpacity: 1, ease: Back.easeOut, delay: -this.time}));
    this.tl.add(TweenMax.to([this.topHamburgerBar, this.middleHamburgerBar, this.bottomHamburgerBar], this.time, {scaleX: 1, ease: Power1.easeIn}));
    this.tl.add(TweenMax.to(this.topHamburgerBar, this.time, {y: 0, ease: Power3.easeOut, delay: this.time/2}));
    this.tl.add(TweenMax.to(this.bottomHamburgerBar, this.time, {y: 0, ease: Power3.easeOut, delay: -this.time}));
    return this.tl;
  }

  animateInOut(){
    if(this.MenuButton){
      if(this.props.menuState === keys.MENU_OFF){
        this.tl.play();
      }
      else if(this.props.menuState === keys.MENU_ON){
        this.tl.reverse();
      }
    }
  }

  GetCurrentSectionName(){
    return this.props.routes.pathname || 'undefined';
  }

	render(){
		return (
			<div className="MenuButton" id="MenuButton" ref={el => this.MenuButton = el} style={{background: this.props.bgColor}} onClick={this.onMenuToggle}>
        <div className="HamburgerMenu">
          <svg dangerouslySetInnerHTML={{__html: HamburgerMenu}} ref={el => this.HamburgerMenu = el}>
          </svg>
        </div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
  return {
    menuState: state.menuToggle.menuState,
    routes: state.routing.locationBeforeTransitions,
    section: state.section
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMenuToggle: val => dispatch(toggleMenu(val))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuButton);
