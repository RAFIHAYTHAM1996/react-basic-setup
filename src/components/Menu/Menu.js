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
    var sectionCover = document.getElementById("SectionCover");
    var section = document.getElementsByClassName("Section");
    var front = document.querySelector(".CloseButton .front");
    var back = document.querySelector(".CloseButton .back");
    var xButtonDuration = 0.25, timeScale = 0.65;
    var menu = document.getElementById("Menu");
    this.tl.kill();
    this.tl.stop();

    this.tl = new TimelineMax({paused: true});
    this.tl.add(TweenMax.to(front, 0, {scaleX: 0, transformOrigin: "center", rotationZ: -45}));
    this.tl.add(TweenMax.to(back, 0, {scaleX: 0, transformOrigin: "center", rotationZ: 45}));
    this.tl.add(TweenMax.to(menu, 0, {visibility: "visible", delay: 0.3}));

    this.tl.add(TweenMax.to(sectionCover, 0.5 * timeScale, {x: "0px", opacity: 0.3, ease: Power3.easeInOut}));
    this.tl.add(TweenMax.to(menu, 0.2 * timeScale, {width: "30vw", ease: Power3.easeInOut, delay: -0.2 * timeScale}));
    this.tl.add(TweenMax.to(menu, 0.4 * timeScale, {height: "100%", ease: Power3.easeInOut}));

    this.tl.add(TweenMax.staggerTo("ul.navList li a", 0.5 * timeScale, {y: "5vw", opacity: 1, ease: Back.easeOut}, 0.1));

    this.tl.add(TweenMax.to([back, front], 0.5 * timeScale, {scaleX: "1", ease: Power3.easeInOut}));
    this.tl.add(TweenMax.to([back, front], 0.5 * timeScale, {rotationZ: 0, ease: Power3.easeInOut}));

    return this.tl;
  }

  animateInOut(done){
    var menu = document.getElementById("Menu");

    if(menu){

      if(this.props.menuState === keys.MENU_OFF){
        this.tl.timeScale(1.25);
        this.tl.reverse();
      } else if(this.props.menuState === keys.MENU_ON){
        this.tl.timeScale(1);
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
			<div className="Menu" id="Menu" style={{background: this.props.bgColor}}>
        <div className="CloseButton" id="CloseButton" onClick={this.onMenuToggle}>
          {
            // <svg dangerouslySetInnerHTML={{__html: bar}}></svg>
          }
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
            <line className="front" x1="2.5" y1="2.5" x2="7.5" y2="7.5"/>
            <line className="back" x1="7.5" y1="2.5" x2="2.5" y2="7.5"/>
          </svg>
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
