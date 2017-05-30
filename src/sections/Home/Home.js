import React, {Component} from 'react';
import Section from '../../components/Section/Section';
import Image from '../../components/Image/Image';
import keys from '../../reducers/keys.js';
import { connect } from 'react-redux';
import { TweenMax, TimelineMax, EasePack, TextPlugin} from 'gsap';

class Home extends Component{

	constructor(props) {
    super(props);
    this.animateInOut = this.animateInOut.bind(this);
    this.tl = new TimelineMax();
		this.message = [..."WHERE CREATIVE DESIGN MEETS STATE-OF-THE-ART TECHNOLOGY"];
		this.delay = 2;
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
    if(this.props.menuState === keys.MENU_OFF){
			this.tl.add(TweenMax.staggerTo(text, 0.2, {opacity: "1", ease:Linear.easeNone, delay: 0.5}, 0.05));
    }
    else if(this.props.menuState === keys.MENU_ON){
			this.tl.add(TweenMax.staggerTo(text, 0.2, {opacity: "0", ease:Linear.easeNone, delay: 0}, 0.05));
    }

    this.tl.play();
  }

	render(){

		return(
			<Section id="Home">
				<div className="MainMessage" id="MainMessage">
					{this.message.map( (character, index) =>
						{
							return(
								<span key={index}>
									{
										character === " " ? " " : character
									}
								</span>
							)
						}
					)}
				</div>
				<Image id="LandingImage" src="./assets/images/portrait.jpg"/>
				{this.props.children}
			</Section>
		);
	}
}
//export default Home;

const mapStateToProps = (state, ownProps) => {
  return {
    menuState: state.menuToggle.menuState,
		section: state.section
  }
};

export default connect(
  mapStateToProps
)(Home);
