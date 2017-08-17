import React, {Component} from 'react';
import Line from '../../../raw-assets/svg/Line.svg'
import Arc from '../../../raw-assets/svg/Arc.svg'
import RG from '../../../raw-assets/svg/RG.svg'
import keys from '../../reducers/keys.js';
import { connect } from 'react-redux';
import {toggleMenu} from '../../actions/menu';
import {changeSection} from '../../actions/sectionManager';
import { TweenMax, TimelineMax, EasePack, TextPlugin} from 'gsap';

class MobileMenu extends Component{

  constructor(props) {
    super(props);
    this.onMenuToggle = this.props.onMenuToggle.bind(this);
    this.changeSection = this.props.changeSection.bind(this);
    this.animateInOut = this.animateInOut.bind(this);
    this.tl = new TimelineMax({paused: true});
    this.routes = this.props.routes;
    this.orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
    this.timeScale = 0.35;
  }

  componentDidMount(){
    this.animateInOut();
    this.tl = this.createTimeline();
    window.addEventListener('resize', this.handleResize);
  }

  componentDidUpdate(){
    this.animateInOut();
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
  }

  createTimeline = (done) => {
    // var menuWidth = this.orientation === 'landscape' ? (window.innerWidth * 0.25) > 300 ? (window.innerWidth * 0.25) : 300 : window.innerWidth;
    // var menuHeight = this.orientation === 'landscape' ? window.innerHeight * 0.86 : window.innerHeight * 1.5;
    var sectionCover = document.getElementById("SectionCover");
    var front = document.querySelector(".CloseButton .front");
    var back = document.querySelector(".CloseButton .back");
    var xButtonDuration = 0.25;
    var SVGs = [], LinkTexts = [];

    for (var i = 0; i < this.LinksContainer.children.length; i++) {
      this.LinksContainer.children[i].tagName === "path" ? SVGs.push(this.LinksContainer.children[i]) : LinkTexts.push(this.LinksContainer.children[i]);
    }

    this.tl.kill();
    this.tl.stop();

    this.tl = new TimelineMax({paused: true});
    this.tl.add(TweenMax.to([SVGs, LinkTexts], 0, {fillOpacity: 0}));
    this.tl.add(TweenMax.to(this.circle, 0, {strokeDashoffset: 50, fillOpacity: 0}));
    this.tl.add(TweenMax.to(this.CenterLogo, 0, {strokeDashoffset: 230, stroke: "#eee", fillOpacity: 0}));
    this.tl.add(TweenMax.to(this.CloseButtonCircle, 0, {scale: 0.5, fillOpacity: 0}));
    this.tl.add(TweenMax.to(this.LinksContainer, 0, {rotationZ: -180, ease: Sine.easeOut}));
    this.tl.add(TweenMax.to([this.CloseButtonFrontLine, this.CloseButtonBackLine], 0, {scaleX: 0.01, scaleY: 0.5, rotationZ: 0}));

    this.tl.add(TweenMax.to(this.MobileMenu, 0, {visibility: "visible"}));

    this.tl.add(TweenMax.to(sectionCover, 1 * this.timeScale, {y: "0px", opacity: 0.3, ease: Expo.easeInOut, delay: 0.3 * this.timeScale}));
    this.tl.add(TweenMax.to(this.MobileMenu, 0.66 * this.timeScale, {height: "100%", ease: Expo.easeIn, delay: -0.66 * this.timeScale}));

    this.tl.add(TweenMax.to(this.CenterLogo, 2 * this.timeScale, {strokeDashoffset: 0, ease: Expo.easeInOut}));
    this.tl.add(TweenMax.to(this.circle, 2 * this.timeScale, {strokeDashoffset: 0, ease: Expo.easeInOut}));
    this.tl.add(TweenMax.to(this.circle, 1.33 * this.timeScale, {fillOpacity: 1, ease: Expo.easeInOut, delay: -1.33 * this.timeScale}));
    this.tl.add(TweenMax.to(this.CenterLogo, 0.66 * this.timeScale, {stroke: "#444", ease: Expo.easeInOut, delay: -0.66 * this.timeScale}));
    this.tl.add(TweenMax.to(this.LinksContainer, 1.33 * this.timeScale, {rotationZ: 0, ease: Back.easeOut, delay: -0.66 * this.timeScale}));
    this.tl.add(TweenMax.to(SVGs, 1.33 * this.timeScale, {fillOpacity: 1, delay: -1.33 * this.timeScale}));
    this.tl.add(TweenMax.to(LinkTexts, 1.33 * this.timeScale, {fillOpacity: 1}));

    this.tl.add(TweenMax.to(this.CloseButtonCircle, 0.5 * this.timeScale, {scale: 1, fillOpacity: 1, ease: Back.easeOut, delay: -2 * this.timeScale}));
    this.tl.add(TweenMax.to([this.CloseButtonFrontLine, this.CloseButtonBackLine], 0.3 * this.timeScale, {scaleX: 0.5, scaleY: 0.5, ease: Expo.easeOut}));
    this.tl.add(TweenMax.to(this.CloseButtonFrontLine, 0.3 * this.timeScale, {rotationZ: 45, ease: Expo.easeOut}));
    this.tl.add(TweenMax.to(this.CloseButtonBackLine, 0.3 * this.timeScale, {rotationZ: -45, ease: Expo.easeOut}));

    return this.tl;
  }

  animateInOut(done){
    if(this.MobileMenu){
      if(this.props.menuState === keys.MENU_OFF){
        this.tl.reverse();
      } else if(this.props.menuState === keys.MENU_ON){
        this.tl.play();
      }
    }
  }

  OnClick(route){
    this.onMenuToggle();
    // this.changeSection({nextSection: route});
    this.context.router.push(route);
  }

	render(){
		return (
			<div className="MobileMenu" id="MobileMenu" ref={el => this.MobileMenu = el} style={{background: this.props.bgColor}}>

        <div className="CloseButton" id="CloseButton" onClick={this.onMenuToggle}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" ref={el => this.CloseButtonCircle = el}>
            <circle cx="10" cy="10" r="10" className="circle"/>
          </svg>
          <svg dangerouslySetInnerHTML={{__html: Line}} ref={el => this.CloseButtonFrontLine = el} className="front"></svg>
          <svg dangerouslySetInnerHTML={{__html: Line}} ref={el => this.CloseButtonBackLine = el} className="back"></svg>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" className="LinksContainer" ref={el => this.LinksContainer = el}>
          <path d="M21.3,3.7l-8.8,8.8L3.7,3.7C5.9,1.4,9,0,12.5,0S19.1,1.4,21.3,3.7z" className="Link" key="home"  onClick={ this.OnClick.bind(this, "home")}/>
          <text transform="translate(10 6)">HOME</text>
          <path d="M25,12.5c0,3.5-1.4,6.6-3.7,8.8l-8.8-8.8l8.8-8.8C23.6,5.9,25,9,25,12.5z" className="Link" key="work"  onClick={ this.OnClick.bind(this, "work")} />
          <text transform="translate(17 13)">WORK</text>
          <path d="M21.3,21.3C19.1,23.6,16,25,12.5,25s-6.6-1.4-8.8-3.7l8.8-8.8L21.3,21.3z" className="Link" key="contact" onClick={ this.OnClick.bind(this, "contact")} />
          <text transform="translate(8.2 22)">CONTACT</text>
          <path d="M12.5,12.5l-8.8,8.8C1.4,19.1,0,16,0,12.5s1.4-6.6,3.7-8.8L12.5,12.5z" className="Link" key="about" onClick={ this.OnClick.bind(this, "about")} />
          <text transform="translate(1.8 13)">ABOUT</text>
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17" className="CenterCircle" >
          <g transform="translate(1 1)">
            <circle cx="7.5" cy="7.5" r="7.5" ref={el => this.circle = el}/>
          </g>
        </svg>

        <svg dangerouslySetInnerHTML={{__html: RG}} className="CenterLogo"  ref={el => this.CenterLogo = el}>
        </svg>

			</div>
		);
	}

}

MobileMenu.contextTypes = {
  router: React.PropTypes.object,
  store: React.PropTypes.object
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
    onMenuToggle: val => dispatch(toggleMenu(val)),
    changeSection: val => dispatch(changeSection(val))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileMenu);
