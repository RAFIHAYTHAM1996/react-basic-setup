import React, {Component} from 'react';
import Section from '../../components/Section/Section';
import Image from '../../components/Image/Image';
import keys from '../../reducers/keys.js';
import { connect } from 'react-redux';
import { TweenMax, TimelineMax, EasePack, TextPlugin} from 'gsap';
import ThreeModel from './ThreeJs/index.js';
import {toggleMenu} from '../../actions/menu';
import {changeSection} from '../../actions/sectionManager';

class Home extends Component{

	constructor(props) {
    super(props);
    this.animateInOut = this.animateInOut.bind(this);
    this.tl = new TimelineMax();
		this.message = [
			"A",
			"SOFTWARE ENGINEER",
			"WITH THE",
			"IMAGINATION",
			"OF AN",
			"ARTIST"
		];
		this.delay = 2;
		this.animatingFirstTime = true;
		this.onMenuToggle = this.props.onMenuToggle.bind(this);
    this.changeSection = this.props.changeSection.bind(this);
  }

  componentDidMount(){
		this.animateInOut();
		this.delay = 1;
  }

  componentDidUpdate(){
		this.animateInOut();
  }

  animateInOut(){

		var text = [...document.querySelectorAll("#MainMessage span")];
		for(var i = 0; i < text.length; i++){
			if(text[i].innerHTML === " "){
				text.splice(i, 1);
				i -= 2;
			}
		}
    if(this.props.menuState === keys.MENU_OFF && this.animatingFirstTime){
			this.animatingFirstTime = false;
			this.tl.add(TweenMax.staggerTo(text, 0.2, {opacity: "1", ease:Linear.easeNone, delay: 0.5}, 0.05));
    }
    else if(this.props.menuState === keys.MENU_ON && this.animatingFirstTime){
			this.animatingFirstTime = false;
			this.tl.add(TweenMax.staggerTo(text, 0.2, {opacity: "0", ease:Linear.easeNone, delay: 0}, 0.05));
    }

    this.tl.play();
  }

	OnClick(route){
		this.changeSection({nextSection: route});
	}

	render(){

		return(
			<Section id="Home" bgColor="">
				<div id="LandingImage">
					<Image src="./assets/images/background2.jpg"/>
				</div>
				<div className="MainMessage" id="MainMessage">
					<h1>Rafi George</h1>
					{this.message.map( (phrase, index) =>
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
						}
					)}
				</div>
				<div className="ViewWork" onClick={ this.OnClick.bind(this, "work") }>
					View Work
				</div>
				{ /* <ThreeModel /> */}
				{this.props.children}
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
