import React, {Component} from 'react';
import bar from '../../../raw-assets/svg/bar.svg'
import SVGInline from "react-svg-inline";
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
    this.tl = new TimelineMax();
    this.OnAnimationDelay = 2;
    this.GetCurrentSectionName = this.GetCurrentSectionName.bind(this);
  }

  componentDidMount(){
    this.animateInOut();
  }

  componentDidUpdate(){
    this.animateInOut();
  }

  animateInOut(){
    var MenuButton = document.getElementById("MenuButton");

    if(MenuButton){
      this.tl.kill();
      if(this.props.menuState === keys.MENU_OFF){
        this.tl.add(TweenMax.to(MenuButton, 0, {right: "-16vw"}));
        this.tl.add(TweenMax.to(MenuButton, 0, {visibility: "visible", delay: this.OnAnimationDelay}));
        this.tl.add(TweenMax.fromTo(MenuButton, 0.5, {skewX: -30}, {right: "5vw", skewX: 0, opacity: 1, ease: Power1.easeIn}));
      }
      else if(this.props.menuState === keys.MENU_ON){
        var middleBar = document.getElementsByClassName("middle-bar")[0];
        this.tl.add(TweenMax.to(MenuButton, 0.5, {right: "0vw", skewX: 30, opacity: 0, ease: Power1.easeOut}));
        this.tl.add(TweenMax.to(MenuButton, 0.5, {visibility: "hidden"}));
      }
      this.tl.play();
    }
  }

  GetCurrentSectionName(){
    return this.props.routes.pathname || 'undefined';
  }

	render(){
		return (
			<div className="MenuButton" id="MenuButton" style={{background: this.props.bgColor}} onClick={this.onMenuToggle}>
      <div className="text">
        <svg xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 100 100" className="MenuFront">
         <text x="0" y="25">
           MENU
         </text>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 100 100" className="MenuBack">
         <text x="0" y="25">
           MENU
         </text>
        </svg>
      </div>
      <div className="HamburgerMenu">
        <svg dangerouslySetInnerHTML={{__html: bar}}>
        </svg>
        <svg dangerouslySetInnerHTML={{__html: bar}} className="middle-bar">
        </svg>
        <svg dangerouslySetInnerHTML={{__html: bar}}>
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
