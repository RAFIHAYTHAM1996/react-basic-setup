import React, {Component} from 'react';
import Tween from 'gsap';
import { TweenLite, TweenMax, TimelineMax, EasePack, ScrollToPlugin } from 'gsap';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import galleryJSON from '../../../static/json/gallery.json';

class Gallery extends Component{

  constructor(props) {
    super(props);
    this.state = {
      playing: []
    };
		this.src = "../../../assets/images/gallery/";
    this.thumbSrc = this.src + "thumbnails/";
		this.scrollPosition = 0;
    this.videos = [];
    this.close = this.close.bind(this);
  }

  componentDidMount(){
		this.InAnimationTimeline = this.CreateInAnimation();
    this.componentWillEnter();
  }

  componentWillEnter(done) {
		this.InAnimationTimeline.play();
  }
  componentWillLeave() {

  }

  close(callback){
    this.closeEnlargedImageContainer();
    this.OutAnimationTimeline = this.CreateOutAnimation(callback);
    this.OutAnimationTimeline.play();
  }

	CreateInAnimation(){
		var elements = [...document.getElementsByClassName("galleryItem")],
				timeline = new TimelineMax({paused: true});

    timeline.staggerTo(elements,  0.3, {opacity: 1, ease: Power3.easeInOut}, 0.1);

		return timeline;
	}

  CreateOutAnimation(callback){
    var elements = [...document.getElementsByClassName("galleryItem")],
				timeline = new TimelineMax({paused: true});

    timeline.staggerTo(elements,  0.3, {opacity: 0, ease: Power3.easeInOut}, 0.1);
    timeline.to(elements[0],  0.3, {opacity: 0, onComplete: callback});

		return timeline;
  }

	toggleImage(itemSrc){
		var elements = [...document.getElementsByClassName("galleryItem")],
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
		var elements = [...document.getElementsByClassName("galleryItem")],
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

	videoOnHover(index){
		var playing = this.state.playing;
		playing[index] = !this.videos[index].props.playing;
		this.setState({playing: playing});
	}

	render(){

		return (
			<div className="Gallery" ref={item => this.gallery = item} id="Gallery">
				<div className="EnlargedImageContainer" id="EnlargedImageContainer" onClick={this.closeEnlargedImageContainer.bind(this)}>
					<img id="EnlargedImage" src="../../../assets/images/gallery/DSC_0786.jpg" />
				</div>,
				<div className="grid">
					{
						this.props.category === "images" ? (
							galleryJSON["images"].map((item, index) =>{
								return(
								<div className="grid-item galleryItem" id={"image" + index} key={"imageDiv" + index} onClick={this.toggleImage.bind(this, item.src)}>
									<div className="desc">
										{
											item.alt
										}
									</div>
									<img src={this.thumbSrc + item.src} />
								</div>)
							})
						) : (
							galleryJSON["videos"].map((item, index) =>{
								return(
									<div className="grid-item galleryItem" id={"video" + index} key={"videoDiv" + index}>
										<ReactPlayer url={this.src + item.src} ref={vid => this.videos[index] = vid} loop playing={this.state.playing[index]} onMouseEnter={this.videoOnHover.bind(this, index)}
											onMouseLeave={this.videoOnHover.bind(this, index)} height="100%" width="100%"/>
									</div>
								)
							})
						)
					}
				</div>
        {this.props.children}
			</div>
		);
	}

}

const mapStateToProps = (state, ownProps) => {
  return {
		section: state.section
  }
};

const mapDispatchToProps = (dispatch) => {
	return{
	}
};

Gallery.contextTypes = {
  router: React.PropTypes.object,
  store: React.PropTypes.object
};

export default Gallery;
// export default connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(Gallery);
