import React, {Component} from 'react';
import bar from '../../../raw-assets/svg/bar.svg'
import Arc from '../../../raw-assets/svg/Arc.svg'
import keys from '../../reducers/keys.js';
import { connect } from 'react-redux';
import {toggleMenu} from '../../actions/menu';
import {changeSection} from '../../actions/sectionManager';
import { TweenMax, TimelineMax, EasePack, TextPlugin} from 'gsap';

class Menu extends Component{

  constructor(props) {
    super(props);
    this.onMenuToggle = this.props.onMenuToggle.bind(this);
    this.changeSection = this.props.changeSection.bind(this);
    this.animateInOut = this.animateInOut.bind(this);
    this.tl = new TimelineMax({paused: true});
    this.routes = this.props.routes;
    this.orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
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
    var menuWidth = this.orientation === 'landscape' ? (window.innerWidth * 0.25) > 300 ? (window.innerWidth * 0.25) : 300 : window.innerWidth;
    var menuHeight = this.orientation === 'landscape' ? window.innerHeight * 0.86 : window.innerHeight;
    var sectionCover = document.getElementById("SectionCover");
    var front = document.querySelector(".CloseButton .front");
    var back = document.querySelector(".CloseButton .back");
    var xButtonDuration = 0.25, timeScale = 0.65;
    var menu = document.getElementById("Menu");

    this.tl.kill();
    this.tl.stop();

    this.tl = new TimelineMax({paused: true});
    this.tl.add(TweenMax.to(menu, 0, {visibility: "visible", delay: 0.3}));

    this.tl.add(TweenMax.to(front, 0, {scaleY: "0.3", ease: Power3.easeInOut}));
    this.tl.add(TweenMax.to(back, 0, {scaleY: "0.3", ease: Power3.easeInOut}));

    if (this.orientation === 'landscape') {
      this.tl.add(TweenMax.to(sectionCover, 0.5 * timeScale, {left: "0px", opacity: 0.3, ease: Power3.easeInOut}));
      this.tl.add(TweenMax.to(menu, 0.2 * timeScale, {width: menuWidth, ease: Power3.easeInOut, delay: -0.2 * timeScale}));
      this.tl.add(TweenMax.to(menu, 0.4 * timeScale, {height: menuHeight, ease: Power3.easeInOut}));
    } else {
      this.tl.add(TweenMax.to(sectionCover, 0.5 * timeScale, {top: "0px", opacity: 0.3, ease: Power3.easeInOut}));
      this.tl.add(TweenMax.to(menu, 0.4 * timeScale, {height: menuHeight, ease: Power3.easeInOut, delay: -0.2 * timeScale}));
    }

    // this.tl.add(TweenMax.staggerTo("ul.navList li a", 0.2 * timeScale, {height: 'auto', scale: 1, paddingTop: "5%", paddingBottom: "5%", delay: -0.1 * timeScale, ease: Back.easeOut}, 0.05));
    // this.tl.add(TweenMax.staggerTo("ul.navList li a", 1 * timeScale, {scaleY: 1, ease: Back.easeOut}, 0.05));
    this.tl.add(TweenMax.staggerTo("ul.navList li a", 0.5 * timeScale, {scaleY: 1, opacity: 1, ease: Back.easeOut}, 0.1));

    this.tl.add(TweenMax.to([back, front], 0.5 * timeScale, {scaleX: "1", ease: Power3.easeInOut}));

    this.tl.add(TweenMax.to(front, xButtonDuration, {transformOrigin:"center",rotation:45, ease: Back.easeOut, delay: -xButtonDuration*2}));
    this.tl.add(TweenMax.to(back, xButtonDuration, {transformOrigin:"center",rotation:-45, ease: Back.easeOut, delay: -xButtonDuration, onComplete: done}));

    return this.tl;
  }

  animateInOut(done){
    var menu = document.getElementById("Menu");

    if(menu){

      if(this.props.menuState === keys.MENU_OFF){
        this.tl.reverse();
      } else if(this.props.menuState === keys.MENU_ON){
        this.tl.play();
      }
    }
  }

  OnClick(route){
    this.onMenuToggle();
    this.changeSection({nextSection: route});
  }

	render(){
		return (
			<div className="Menu" id="Menu" style={{background: this.props.bgColor}}>
        <div className="CloseButton" id="CloseButton" onClick={this.onMenuToggle}>
          <svg dangerouslySetInnerHTML={{__html: bar}}></svg>
        </div>
        <ul className="navList">
          <li>
            <a onClick={ this.OnClick.bind(this, "home") }>Home</a>
          </li>
          <li>
            <a onClick={ this.OnClick.bind(this, "work") }>Work</a>
          </li>
          <li>
            <a onClick={ this.OnClick.bind(this, "contact") }>Contact</a>
          </li>
          <li>
            <a onClick={ this.OnClick.bind(this, "about") }>About</a>
          </li>
        </ul>
			</div>
		);
	}

}

Menu.contextTypes = {
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
)(Menu);
