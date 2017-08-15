import React, {Component} from 'react';
import Tween from 'gsap';
import { TweenLite, TweenMax, TimelineMax, EasePack, ScrollToPlugin } from 'gsap';
import { connect } from 'react-redux';
import {setCurrSection} from '../../actions/sectionManager';
import detect from '../../util/detect/';

class Section extends Component{

  constructor(props) {
    super(props);
    this.tl = new TimelineMax({paused: true});
		this.setCurrSection = this.props.setCurrSection.bind(this);
    this.orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
    this.animateOutDelay = this.orientation === 'landscape' ? 0 : 0.25;
    this.componentMounted = undefined;
  }

  componentDidMount(){
    this.componentWillEnter();
    this.setCurrSection();
    window.addEventListener('resize', this.handleResize);
  }

  componentDidUpdate(){
    if((this.props.section.currSection !== this.props.section.nextSection && this.section.id.toLowerCase() !== this.props.section.nextSection)){
      this.componentWillLeave(() => {
        this.context.router.push(this.props.section.nextSection);
      });
    }
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
    this.animateOutDelay = this.orientation === 'landscape' ? 0 : 0.25;
  }

  componentWillEnter(done) {
    var Content = this.section.children[0];
    this.tl.kill();
    this.tl.add(TweenMax.to(Content, 0, {display: "none"}));
    this.tl.add(TweenMax.staggerTo(Content.children, 0, {y: window.innerHeight * 0.1, opacity: 0}));
    this.tl.to(document.getElementsByClassName("Header")[0], 0, {y: -window.innerWidth * 0.3, display: "block"});

    if (this.orientation === 'landscape') {
      this.tl.add(TweenMax.fromTo(this.section, 0.5, {x: -window.innerWidth}, {x: 0}));
      this.tl.add(TweenMax.to(this.section, 1, {scale: 1, ease: Power3.easeOut}));
    } else {
      this.tl.add(TweenMax.fromTo(this.section, 0.5, {y: window.innerHeight}, {y: 0}));
    }
    this.tl.add(TweenMax.to(Content, 0.1, {display: "block"}));
    this.tl.to(document.getElementsByClassName("Header")[0], 1, {y: 0, ease: Power3.easeIn, delay: -1});
    this.tl.add(TweenMax.staggerTo(Content.children, 1, {y: 0, opacity: 1, ease: Power3.easeInOut, onComplete: done}, 0.1));
    this.tl.play();
  }
  componentWillLeave(done) {
    this.tl.kill();

    if (detect.device === 'desktop') {
      this.tl.add(TweenMax.to(document.getElementsByClassName("Header")[0], 0.5, {y: -window.innerWidth * 0.3, ease: Power3.easeIn}));
    } else {
      this.tl.add(TweenMax.to(document.getElementsByClassName("Header")[0], 0.5, {y: -window.innerWidth * 0.3, ease: Back.easeIn}));
    }

    if (this.orientation === 'landscape') {
      this.tl.add(TweenMax.to(this.section, 0.5, {x: window.innerWidth, ease: Power3.easeOut, delay: this.animateOutDelay / 2}));
      this.tl.add(TweenMax.to(this.section, 1, {scale: 0.9, ease: Power3.easeOut, onComplete: done}));
    } else {
      this.tl.add(TweenMax.to(this.section, 0.5, {y: -window.innerHeight, ease: Power3.easeOut, delay: this.animateOutDelay / 2, onComplete: done}));
    }
    this.tl.play();
  }

  componentDidMount() {
    this.componentMounted = this.props.router.locationBeforeTransitions.pathname === "/" ? "home" : this.props.router.locationBeforeTransitions.pathname;
  }

	render(){
		return (
			<div className="Section" ref={item => this.section = item} id={this.props.id} style={{backgroundColor: this.props.bgColor}}>
        {this.props.children}
			</div>
		);
	}

}

const mapStateToProps = (state, ownProps) => {
  return {
		section: state.section,
    router: state.routing
  }
};

const mapDispatchToProps = (dispatch) => {
	return{
		setCurrSection: val => dispatch(setCurrSection(val))
	}
};

Section.contextTypes = {
  router: React.PropTypes.object,
  store: React.PropTypes.object
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Section);
