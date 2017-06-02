import React, {Component} from 'react';
import Section from '../../components/Section/Section';
import Image from '../../components/Image/Image';
import Masonry from 'masonry-layout';
import keys from '../../reducers/keys.js';
import { connect } from 'react-redux';
import { TweenMax, TimelineMax, EasePack, TextPlugin} from 'gsap';
import galleryImages from '../../../raw-assets/json/galleryImages.json';
import bar from '../../../raw-assets/svg/bar.svg';

class Work extends Component{

	constructor(props) {
    super(props);
    this.tl = new TimelineMax();
		this.message = [..."WORK"];
		this.delay = 2;
		this.src = "../../../assets/images/gallery/";
		this.scrollPosition = 0;
  }

  componentDidMount(){
		this.InAnimationTimeline = this.CreateInAnimation();
		this.animateIn();
		this.delay = 1;
  }

  componentDidUpdate(){
  }

	CreateInAnimation(){
		var elements = [...document.getElementsByClassName("galleryImage")],
				timeline = new TimelineMax({paused: true});
		timeline.staggerTo(elements,  0.3, {opacity: 1, ease: Power3.easeInOut}, 0.1);
		return timeline;
	}

	animateIn(){
		this.InAnimationTimeline.play();
	}

	toggleImage(itemSrc){
		var elements = [...document.getElementsByClassName("galleryImage")],
				EnlargedImageContainer = document.getElementById("EnlargedImageContainer"),
				EnlargedImage = document.getElementById("EnlargedImage"),
				Work = document.getElementById("Work");

		EnlargedImage.src = this.src + itemSrc;
		var timeline = new TimelineMax({paused: true});

		this.scrollPosition = Work.scrollTop;
		timeline.add(TweenMax.to(Work, 0.5, {scrollTop: 0, ease: Power3.easeInOut}));
		timeline.add(TweenMax.to(Work, 0, {overflowY: "hidden", ease: Power3.easeInOut}));
	 	timeline.add(TweenMax.staggerTo(elements, 0.3, {opacity: 0, ease: Power3.easeInOut}, 0.1));
		timeline.add(TweenMax.to(EnlargedImageContainer, 0, {display: "block", ease: Power3.easeInOut}));
		timeline.add(TweenMax.to(EnlargedImageContainer, 1, {opacity: 1, left: 0, ease: Back.easeOut}));
		timeline.add(TweenMax.to(EnlargedImage, 1, {height: "100vh", left: 0, top: 0, ease: Power3.easeInOut}));
		timeline.play();
	}

	closeEnlargedImageContainer(){
		var elements = [...document.getElementsByClassName("galleryImage")],
				EnlargedImageContainer = document.getElementById("EnlargedImageContainer"),
				EnlargedImage = document.getElementById("EnlargedImage"),
				Work = document.getElementById("Work");

		var timeline = new TimelineMax({paused: true});
		if(parseInt(EnlargedImageContainer.style.left) === 0){
			timeline.add(TweenMax.to(EnlargedImage, 1, {height: "80vh", left: "10vw", top: "10vh", ease: Power3.easeInOut}));
			timeline.add(TweenMax.to(EnlargedImageContainer, 1, {opacity: 0, left: "-100vw", ease: Back.easeOut}));
			timeline.add(TweenMax.to(EnlargedImageContainer, 0, {display: "none", delay: 0.5, ease: Power3.easeInOut}));
			timeline.add(TweenMax.staggerTo(elements, 0.3, {opacity: 1, ease: Power3.easeInOut}, 0.1));
			timeline.add(TweenMax.to(Work, 0, {overflowY: "scroll", ease: Power3.easeInOut}));
			timeline.add(TweenMax.to(Work, 0.5, {scrollTop: this.scrollPosition, ease: Power3.easeInOut}));
			timeline.play();
		}
	}

	render(){
		return(
			<Section id="Work">
				<div className="EnlargedImageContainer" id="EnlargedImageContainer" onClick={this.closeEnlargedImageContainer.bind(this)}>
					<img id="EnlargedImage" src="../../../assets/images/gallery/DSC_0786.jpg" />
				</div>
				<div className="grid">
					{
						galleryImages["images"].map((item, index) =>{
							return(
							<div className="grid-item galleryImage" id={"image" + index} key={"imageDiv" + index} onClick={this.toggleImage.bind(this, item.src)}>
								<div className="desc">
									{
										item.alt
									}
								</div>
								<img src={this.src + item.src} />
							</div>)
						})
					}
				</div>
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
