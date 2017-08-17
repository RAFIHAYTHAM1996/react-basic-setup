import React, {Component} from 'react';
import Section from '../../components/Section/Section';
import Image from '../../components/Image/Image';
import keys from '../../reducers/keys.js';
import { connect } from 'react-redux';
import { TweenMax, TimelineMax, EasePack, TextPlugin} from 'gsap';
import ThreeModel from './ThreeJs/index.js';
import {toggleMenu} from '../../actions/menu';
import {changeSection} from '../../actions/sectionManager';
import MobileDetect from 'mobile-detect';

class Home extends Component{

	constructor(props) {
    super(props);
    this.animateInOut = this.animateInOut.bind(this);
		this.message = [
			"A",
			"SOFTWARE ENGINEER",
			"WITH THE",
			"IMAGINATION",
			"OF AN",
			"ARTIST _"
		];
		this.animatingFirstTime = true;
		this.onMenuToggle = this.props.onMenuToggle.bind(this);
    this.changeSection = this.props.changeSection.bind(this);
		this.backgroundImage = "EmoRoad.jpg";

		var mobileDetect = new MobileDetect(navigator.userAgent);
    if (mobileDetect.mobile()) {
			var extIndex = this.backgroundImage.lastIndexOf(".");
			this.backgroundImage = this.backgroundImage.substr(0, extIndex) + "-mobile" + this.backgroundImage.substr(extIndex, this.backgroundImage.length - extIndex);
    }
  }

  componentDidMount(){
		this.animateInOut();
  }

  componentDidUpdate(){
		this.animateInOut();
  }

  animateInOut(){
		var text = [...document.querySelectorAll("#MainMessage span")],
				underscoreElement = undefined;

		for(var i = 0; i < text.length; i++){
			if(text[i].innerHTML === " " || (text[i].innerHTML === "_")){
				if (text[i].innerHTML === "_") {
					underscoreElement = text[i];
				}

				text.splice(i, 1);
				i -= 2;
			}
		}

    if(this.props.menuState === keys.MENU_OFF && this.animatingFirstTime){
			var timeline = new TimelineMax({paused: true, onComplete: () => {
				underscoreElement.className = "underscore";
			}});
			this.animatingFirstTime = false;
			timeline.to(this.Content.children, 0, {y: window.innerHeight * 0.1, opacity: 0});
			timeline.to(this.ViewWorkButton, 0, {transition: "none"});
			timeline.staggerTo(this.Content.children, 2, {y: 0, ease: Power3.easeInOut, opacity: 1, onComplete: ()=>{
				TweenMax.to(this.ViewWorkButton, 0, {transition: "all 0.3s ease-in-out"});
			}}, 0.3);
			timeline.add(TweenMax.staggerTo(text, 0, {opacity: "1", ease:Linear.easeNone, delay: -1}, 0.05));
			timeline.play();
    }
    else if(this.props.menuState === keys.MENU_ON && this.animatingFirstTime){
			var timeline = new TimelineMax({paused: true});
			this.animatingFirstTime = false;
			timeline.to(this.Content.children, 0, {y: 0, opacity: 0});
			timeline.to(this.ViewWorkButton, 0, {transition: "none"});
			timeline.staggerTo(this.Content.children, 2, {y: window.innerHeight * 0.1, ease: Power3.easeInOut, opacity: 1, onComplete: ()=>{
				TweenMax.to(this.ViewWorkButton, 0, {transition: "all 0.3s ease-in-out"});
			}}, 0.3);
			timeline.add(TweenMax.staggerTo(text, 0.2, {opacity: "0", ease:Linear.easeNone, delay: -0.2}, 0.05));
			timeline.play();
    }
  }

	OnClick(route){
		// this.changeSection({nextSection: route});
		this.context.router.push("work");
	}

	render(){

		return(
			<Section id="Home">
				<div className="Content" ref={el => this.Content = el} >
					<div className="MainMessage" id="MainMessage">
						<h1>Rafi George</h1>
						{
							this.message.map( (phrase, index) =>
							{
								var specialClass = index === 1 || index === 5 ? "special" : ""
								return (
									<div key={index} className={specialClass}>
									{
										[...phrase].map( (character, characterIndex) => {
											return (
												<span key={characterIndex}>
													{
														character === " " ? " " : character
													}
												</span>
											)
										})
									}
									</div>
								)
							})
						}
						</div>
						<div className="ViewWork" onClick={ this.OnClick.bind(this, "work") } ref={el => this.ViewWorkButton = el}>
							<p>
								View Work <span className="arrow">&gt;</span>
							</p>
						</div>
						{ /* <ThreeModel /> */}
						{this.props.children}
				</div>
				<div id="LandingImage">
					<Image src={"./assets/images/" + this.backgroundImage}/>
					<div className="Gradient"></div>
				</div>
			</Section>
		);
	}
}

Home.contextTypes = {
	router: React.PropTypes.object,
	store: React.PropTypes.object
}


const mapStateToProps = (state, ownProps) => {
  return {
    menuState: state.menuToggle.menuState,
		section: state.section,
		routes: state.routing.locationBeforeTransitions,
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
)(Home);
