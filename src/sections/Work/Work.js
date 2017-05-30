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
    this.animateInOut = this.animateInOut.bind(this);
    this.tl = new TimelineMax();
		this.message = [..."WORK"];
		this.delay = 2;
		this.src = "../../../assets/images/gallery/";
		this.scrollPosition = 0;
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
			this.tl.add(TweenMax.staggerTo(text, 0.2, {opacity: "1", ease:Linear.easeNone}, 0.05));
    }
    else if(this.props.menuState === keys.MENU_ON){
			this.tl.add(TweenMax.staggerTo(text, 0.2, {opacity: "0", ease:Linear.easeNone, delay: 0}, 0.05));
    }

    this.tl.play();
  }

	toggleImage(itemSrc){
		var elements = [...document.getElementsByClassName("galleryImage")],
				EnlargedImageContainer = document.getElementById("EnlargedImageContainer"),
				EnlargedImage = document.getElementById("EnlargedImage"),
				Work = document.getElementById("Work");

		EnlargedImage.src = this.src + itemSrc;
		var timeline = new TimelineMax();

		this.scrollPosition = Work.scrollTop;
		console.log(this.scrollPosition);
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

		var timeline = new TimelineMax();
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
