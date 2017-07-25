import React, {Component} from 'react';
import Section from '../../Components/Section/Section';
import Image from '../../components/Image/Image';
import { connect } from 'react-redux';
import UnderConstructionSvg from '../../../raw-assets/svg/UnderConstruction.svg';
import keys from '../../reducers/keys.js';

class UnderConstruction extends Component{

	constructor(props) {
		super(props);
		this.animateIn = this.animateIn.bind(this);
		this.tl = new TimelineMax();
		this.message = [..."Site is under construction"];
		this.delay = 2;
	}

	componentDidMount(){
		this.animateIn();
		this.delay = 1;
	}

	componentDidUpdate(){
		this.animateIn();
	}

	animateIn(){

		var text = [...document.querySelectorAll("#MainMessage span")];
		for(var i = 0; i < text.length; i++){
			if(text[i].innerHTML === " "){
				text.splice(i, 1);
				i -= 2;
			}
		}
		this.tl.add(TweenMax.staggerTo(text, 0.2, {opacity: "1", ease:Linear.easeNone, delay: 0.5}, 0.05));

		this.tl.play();
	}

	render(){
		return(
			<Section id="UnderConstruction">
				<Image id="LandingImage" src="./assets/images/portrait.jpg"/>
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
					<span>
						&nbsp;  
						<svg dangerouslySetInnerHTML={{__html: UnderConstructionSvg}}>
						</svg>
					</span>
				</div>
			</Section>
		);
	}
}

const mapStateToProps = (state, ownState) => {
	return{
		URLParams: state.routing.locationBeforeTransitions.hash,
	}
}

const mapDispatchToProps = (dispatch) =>{
	return{
	}
}

UnderConstruction.contextTypes = {
	router: React.PropTypes.object,
  store: React.PropTypes.object
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UnderConstruction);
