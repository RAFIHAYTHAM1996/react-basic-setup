import React, {Component} from 'react';
import Section from '../../components/Section/Section';
import Gallery from '../../components/Gallery/Gallery';
import keys from '../../reducers/keys.js';
import { connect } from 'react-redux';
import { TweenMax, TimelineMax, EasePack, TextPlugin} from 'gsap';
import BackButton from '../../components/BackButton/BackButton';
import Image from '../../components/Image/Image';

class Work extends Component{

	constructor(props) {
    super(props);
		this.message = [..."WORK"];
		this.videos = [];
		this.state = {
			ready: false,
			category: "",
	    playing: [],
	    volume: 0.8,
  	}
  }

  componentDidMount(){
  }

  componentDidUpdate(){

  }

	CreateOptionContainerOutAnim(callback){
		var elements = [...document.getElementsByClassName("OptionCard")],
				OptionsContainer = document.getElementById("OptionsContainer"),
				timeline = new TimelineMax({paused: true});

		timeline.to(elements,  0.5, {opacity: 0, ease: Power3.easeInOut});
		timeline.to(elements,  0.2, {margin: "-15vw", ease: Back.easeIn, delay: -0.3});
		timeline.to(OptionsContainer, 0.3, {height: "100vh", width: "100vw", top: 0, left: 0, ease: Back.easeIn, onComplete: callback});
		return timeline;
	}

	showCategory(category){
		this.CreateOptionContainerOutAnim(() => {
			this.setState({ready: true, category: category});
		}).play();
	}

	closeGallery(){
		var callback = ()=>{
			this.setState({ready: false, category: ""});
		}
		this.gallery.close(callback.bind(this));
	}

	render(){
		navigator.geolocation.getCurrentPosition((position)=>{
	    console.log(position);
	  });

		return(
			<Section id="Work" bgColor="">
				{
					this.state.ready ? (
						<div>
							<Gallery category={this.state.category} ref={ el => this.gallery = el} />,
							<BackButton backAction={this.closeGallery.bind(this)}/>
						</div>
					) : (
						<div id="OptionsContainer">
							<div className="OptionCard" onClick={this.showCategory.bind(this, "images")}>
								<div className="title">
									Photography
								</div>
								<img src="../../../assets/images/work/photography.jpg" alt="Photography" />
							</div>
							<div className="OptionCard" onClick={this.showCategory.bind(this, "videos")}>
								<div className="title">
									<p className="top">Videography</p>
								</div>
								<img src="../../../assets/images/work/videography.jpg" alt="Videography" />
							</div>
							<div className="OptionCard">
								<div className="title">
									<p className="top">DSC_0776</p>
								</div>
								<img src="../../../assets/images/work/DSC_0776.jpg" alt="Videography" />
							</div>

						</div>
					)
				}
				{this.props.children}
			</Section>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
  return {
    menuState: state.menuToggle.menuState,
  }
};

export default connect(
  mapStateToProps
)(Work);
