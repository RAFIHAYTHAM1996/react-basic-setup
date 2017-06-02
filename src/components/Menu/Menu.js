import React, {Component} from 'react';
import bar from '../../../raw-assets/svg/bar.svg'
import keys from '../../reducers/keys.js';
import { connect } from 'react-redux';
import {toggleMenu} from '../../actions/menu';
import {changeSection} from '../../actions/sectionManager';
import { TweenMax, TimelineMax, EasePack} from 'gsap';

class Menu extends Component{

  constructor(props) {
    super(props);
    this.onMenuToggle = this.props.onMenuToggle.bind(this);
    this.changeSection = this.props.changeSection.bind(this);
    this.animateInOut = this.animateInOut.bind(this);
    this.tl = new TimelineMax();
    this.routes = this.props.routes;
  }

  componentDidMount(){
    this.animateInOut();
  }

  componentDidUpdate(){
    this.animateInOut();
  }

  animateInOut(done){
    var menu = document.getElementById("Menu");
    var xButtonDuration = 0.75;

    this.tl.kill();

    if(menu){
      var menuWidth = (window.innerWidth * 0.25) > 300 ? (window.innerWidth * 0.25) : 300;
      var sectionCover = document.getElementById("SectionCover");
      var front = document.querySelector(".CloseButton .front");
      var back = document.querySelector(".CloseButton .back");

      if(this.props.menuState === keys.MENU_OFF){
        this.tl.add(TweenMax.to(front, xButtonDuration, {transformOrigin:"center",rotation:0, ease: Back.easeIn}));
        this.tl.add(TweenMax.to(back, xButtonDuration, {transformOrigin:"center",rotation:0, ease: Back.easeIn, delay: -xButtonDuration}));

        this.tl.add(TweenMax.to(front, 0.3, {scaleX: "0", ease: Power3.easeInOut}));
        this.tl.add(TweenMax.to(back, 0.3, {scaleX: "0", ease: Power3.easeInOut}));

        this.tl.add(TweenMax.staggerTo("ul.navList li a", 0.2, {height: "0", padding: "0 0 0 10%", ease: Back.easeOut, delay: -0.25}, 0.05).reverse(0));

        this.tl.add(TweenMax.to(menu, 0.2, {height: "5vw", ease: Power3.easeInOut}));
        this.tl.add(TweenMax.to(menu, 0.2, {width: "0px", ease: Power3.easeInOut}));

          this.tl.add(TweenMax.to(sectionCover, 0.5, {left: "100vw", opacity: 1, ease: Power3.easeInOut}));

        this.tl.add(TweenMax.to(menu, xButtonDuration, {visibility: "hidden", onComplete: done}));
      }
      else if(this.props.menuState === keys.MENU_ON){
        this.tl.add(TweenMax.to(menu, 0, {visibility: "visible", delay: 0.5}));

        this.tl.add(TweenMax.to(front, 0, {scaleY: "0.3", ease: Power3.easeInOut}));
        this.tl.add(TweenMax.to(back, 0, {scaleY: "0.3", ease: Power3.easeInOut}));

        this.tl.add(TweenMax.to(sectionCover, 0.5, {left: "0px", opacity: 0.3, ease: Power3.easeInOut}));

        this.tl.add(TweenMax.to(menu, 0.2, {width: menuWidth, ease: Power3.easeInOut, delay: -0.2}));
        this.tl.add(TweenMax.to(menu, 0.4, {height: "86%", ease: Power3.easeInOut}));

        this.tl.add(TweenMax.staggerTo("ul.navList li a", 0.2, {height: "3.5rem", padding: "5% 0 5% 10%", ease: Back.easeOut, delay: -0.2}, 0.1));

        this.tl.add(TweenMax.to(front, 0.5, {scaleX: "1", ease: Power3.easeInOut}));
        this.tl.add(TweenMax.to(back, 0.5, {scaleX: "1", ease: Power3.easeInOut, delay: -0.5}));

        this.tl.add(TweenMax.to(front, xButtonDuration, {transformOrigin:"center",rotation:45, ease: Back.easeOut}));
        this.tl.add(TweenMax.to(back, xButtonDuration, {transformOrigin:"center",rotation:-45, ease: Back.easeOut, delay: -xButtonDuration, onComplete: done}));
      }

      this.tl.play();
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
          <span ref={(span) => {this.CloseSVG = span}} dangerouslySetInnerHTML={{__html: bar}}></span>
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
