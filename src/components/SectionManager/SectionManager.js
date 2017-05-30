import React, {Component} from 'react';
import Home from '../../sections/Home/Home';
import Work from '../../sections/Work/Work';
import Contact from '../../sections/Contact/Contact';
import Menu from '../../components/Menu/Menu';
import MenuButton from '../../components/MenuButton/MenuButton';
import Tween from 'gsap';
import { TweenLite, TweenMax, TimelineMax, EasePack, ScrollToPlugin } from 'gsap';
import { connect } from 'react-redux';
import {toggleMenu} from '../../actions/menu';
import {changeSection, setCurrSection} from '../../actions/sectionManager';

class SectionManager extends Component{

	constructor(props){
		super(props);
		this.tl = new TimelineMax();
		this.GetCurrentSection = this.GetCurrentSection.bind(this);
		this.changeSection = this.props.changeSection.bind(this);
		this.setCurrSection = this.props.setCurrSection.bind(this);
	}

	componentDidMount(){
		this.componentWillEnter();
	}

	componentDidUpdate(){
		var currSectionName = this.GetCurrentSection().id.toLowerCase();
		if(this.props.section.currSection !== this.props.section.nextSection && currSectionName !== this.props.section.nextSection){
			this.componentWillLeave(() => {
				this.setCurrSection(); this.context.router.push(this.props.section.nextSection);
			});
		}
	}

	componentWillEnter(done) {
		var sectionManager = document.getElementById("SectionManager");
		var currentSection = this.GetCurrentSection();
		this.tl.kill();
		this.tl.add(TweenMax.to(sectionManager, 0, {top: -(currentSection.offsetTop)}));
		this.tl.add(TweenMax.to(currentSection, 1, {opacity: 1, ease: Back.easeOut}));
		this.tl.add(TweenMax.to(currentSection, 1, {scale: 1, ease: Back.easeOut, onComplete: done}));
		this.tl.play();
	}
	componentWillLeave(done) {
		var currentSection = this.GetCurrentSection();
		this.tl.kill();
		this.tl.add(TweenMax.to(currentSection, 1, {scale: 0.9, ease: Back.easeOut}));
		this.tl.add(TweenMax.to(currentSection, 1, {opacity: 0, ease: Back.easeOut, onComplete: done}));
		this.tl.play();
	}

	GetCurrentSection(){
		const currentRoute = this.props.routes[this.props.routes.length - 1];
		currentRoute.path = currentRoute.path ? currentRoute.path.charAt(0).toUpperCase() + currentRoute.path.slice(1) : 'Home';
		return document.getElementById(currentRoute.path) ? document.getElementById(currentRoute.path) : 'undefined';
	}

	render(){
		return(
			<div className="SectionManager" id="SectionManager">
				<Home GetCurrentSection={this.GetCurrentSection}/>
				<Work GetCurrentSection={this.GetCurrentSection}/>
				<Contact GetCurrentSection={this.GetCurrentSection}/>
				{this.props.children}
			</div>
		);
	}

}

const mapStateToProps = (state, ownProps) => {
  return {
		menuState: state.menuToggle.menuState,
		section: state.section
  }
};

const mapDispatchToProps = (dispatch) => {
	return{
		onMenuToggle: val => dispatch(toggleMenu(val)),
		changeSection: val => dispatch(changeSection(val)),
		setCurrSection: val => dispatch(setCurrSection(val))
	}
};

SectionManager.contextTypes = {
  router: React.PropTypes.object,
  store: React.PropTypes.object
};

//export default SectionManager;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SectionManager);
