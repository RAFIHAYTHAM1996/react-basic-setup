import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Section from '../../components/Section/Section';
import Gallery from '../../components/Gallery/Gallery';
import Project from '../../components/Project/Project';
import keys from '../../reducers/keys.js';
import { connect } from 'react-redux';
import { TweenMax, TimelineMax, EasePack, TextPlugin} from 'gsap';
import BackButton from '../../components/BackButton/BackButton';
import Image from '../../components/Image/Image';
import projectsJSON from '../../../static/json/projects.json';
import config from '../../../config.json';
import detect from '../../util/detect';

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
		this.orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
		this.src = config.defaults.ASSET_PATH + "images/projects/";
  }

  componentDidMount(){
		TweenMax.to(document.getElementsByClassName("Header")[0], 0, {y: -window.innerWidth * 0.3});
		window.addEventListener('resize', this.handleResize);
		this.animateIn();
  }

  componentDidUpdate(){
  }

	handleResize = () => {
		this.orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
	}

	animateIn = (done) => {
		var tl = new TimelineMax({paused: true, delay: 1});
		tl.add(TweenMax.to(this.OptionsContainer.children, 0, {y: window.innerHeight * 0.3, opacity: 0, delay: -1}));

		tl.to(document.getElementsByClassName("Header")[0], 1, {y: 0, ease: Power3.easeOut, delay: -0.5});

		tl.add(TweenMax.staggerTo(this.OptionsContainer.children, 1, {y: 0, ease: Power3.easeInOut, opacity: 1, onComplete: done}, 0.2));
		tl.play();
	}

	CreateOptionContainerOutAnim(callback){
		var elements = [...document.getElementsByClassName("OptionCard")],
				OptionsContainer = document.getElementById("OptionsContainer"),
				timeline = new TimelineMax({paused: true});

		timeline.to(document.getElementsByClassName("Header")[0], 0, {y: 0});

		if (detect.device !== 'desktop') {
			timeline.staggerTo(this.OptionsContainer.children, 1, {y: window.innerHeight * 0.3, opacity: 0, ease: Back.easeIn}, 0.2);
			// timeline.to(document.getElementsByClassName("Header")[0], 1, {y: -window.innerWidth * 0.3, ease: Back.easeIn, delay: -1});
		} else {
			var duration = 1, elementsPerRow = 3, rows = this.OptionsContainer.children.length/elementsPerRow;
			for (var i = 0; i < rows; i++) {
				timeline.to([...this.OptionsContainer.children].slice(elementsPerRow * i, elementsPerRow * i + 3), duration, {opacity: 0, ease: Expo.easeOut, delay: -duration/2});
			}
		}
		timeline.to(OptionsContainer, 0.3, {height: "100%", width: "100%", top: 0, left: 0, ease: Back.easeIn, onComplete: callback});
		return timeline;
	}

	openProject(projectName){
		this.CreateOptionContainerOutAnim(() => {
			this.context.router.push("work/" + projectName);
		}).play();
	}

	render(){
		// navigator.geolocation.getCurrentPosition((position)=>{
	  //   console.log(position);
	  // });

		return(
			<Section id="Work">
				<div className="Content">
					<div id="OptionsContainer" ref={el => this.OptionsContainer = el}>
					{
						projectsJSON.projects.map( (function(item, index){
							return (
								<div className="OptionCard" onClick={this.openProject.bind(this, item.route)} key={index}>
									<div className="title">
										{item.title}
									</div>
									<img src={this.src + item.assetPath + item.thumbImage} alt={item.title + " Thumbnail"} />
									<div className="overlay"></div>
								</div>
							)
						}).bind(this))
					}
					</div>
					{this.props.children}
				</div>
			</Section>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
  return {
    menuState: state.menuToggle.menuState,
  }
};

const mapDispatchToProps = (dispatch) => {
	return {

	}
}

Work.contextTypes = {
  router: React.PropTypes.object,
  store: React.PropTypes.object
};

export default connect(
  mapStateToProps,
	mapDispatchToProps
)(Work);
