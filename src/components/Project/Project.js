import React, {Component} from 'react';
import Tween from 'gsap';
import { TweenLite, TweenMax, TimelineMax, EasePack, ScrollToPlugin } from 'gsap';
import { connect } from 'react-redux';
import BackButton from '../../../raw-assets/svg/BackButton.svg'
import ReactPlayer from 'react-player';
import projectsJSON from '../../../static/json/projects.json';
import config from '../../../config.json';
import detect from '../../util/detect/index';
import ActionButton from '../../components/ActionButton/ActionButton';

class Project extends Component{

  constructor(props) {
    super(props);
    this.state = {
      playing: [],
      orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
    };
		this.src = config.defaults.ASSET_PATH + "images/projects/";
  }

  componentDidMount(){
    this.orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
		this.InAnimationTimeline = this.CreateInAnimation();
    this.ProjectHeaderScrollAnimation = this.CreateProjectHeaderScrollAnimation();

    this.componentWillEnter();
    window.addEventListener('resize', this.handleResize);
    document.addEventListener('mousewheel', this.handleScroll);
    document.addEventListener('touchstart', this.handleTouchStart);
    document.addEventListener('touchmove', this.handleScroll);
    document.addEventListener('touchend', this.handleTouchEnd);
  }

  componentWillEnter(done) {
		this.InAnimationTimeline.play();
  }
  componentWillLeave() {

  }

	CreateInAnimation(){
    var timeline = new TimelineMax({paused: true}),
        HeaderChildren = this.ProjectHeader.children,
        BackButtonChildren = this.BackButton.children[0].children;

    timeline.to(this.HeadImage, 0, {alpha: 0});
    timeline.to(this.Content.children, 0, {y: window.innerHeight * 0.3, opacity: 0});
    timeline.to(this.ProjectHeader, 0, {y: -window.innerHeight * 0.3});
    timeline.to(this.BackButton, 0, {strokeDashoffset: 310, strokeDasharray: 310});
    timeline.to([BackButtonChildren[0], BackButtonChildren[2], BackButtonChildren[3]], 0, {fillOpacity: 0});
    timeline.to(this.Project, 0, {display: "block"});

    timeline.to(this.HeadImage, 0.5, {alpha: 1, delay: 0.5});
    timeline.staggerTo(this.Content.children, 1, {y: 0, ease: Power3.easeInOut, opacity: 1, delay: -0.5}, 0.1);
    timeline.to(this.ProjectHeader, 0.5, {y: 0, delay: -1});
    timeline.to(this.BackButton, 1, {strokeDashoffset: 0, ease: Power3.easeInOut, delay: -2});
    timeline.to(BackButtonChildren[0], 0.25, {fillOpacity: 1, strokeWidth: 0});
    timeline.to([BackButtonChildren[2], BackButtonChildren[3]], 0.25, {fillOpacity: 1});
    return timeline;
	}

  CreateProjectHeaderScrollAnimation = () => {
    var timeline = new TimelineMax({paused: true});

    // if (this.orientation === 'landscape') {
    //   timeline.to(this.ProjectHeader, 0.5, {boxShadow: "0 0.5vw 2.5vw rgba(0, 0, 0, 0.25)", ease: Power3.easeOut});
    //   timeline.to(this.ProjectHeader, 0.5, {height: "10vw", ease: Power3.easeOut, delay: -0.5});
    //   timeline.to(this.ProjectHeader.children[0], 0.5, {paddingTop: "2vw", height: "calc(100% - 2vw)", fontSize: "3.5vw", ease: Power3.easeOut, delay: -0.5});
    //   timeline.to(this.ProjectHeader.children[0].children[0], 0.5, {height: "7.5vw", width: "7.5vw", ease: Power3.easeOut, delay: -0.5});
    // } else {
    if (detect.device !== 'desktop') {
      timeline.to(this.ProjectHeader, 0.5, {boxShadow: "0 1vw 5vw rgba(0, 0, 0, 0.25)", ease: Power3.easeOut});
      timeline.to(this.ProjectHeader, 0.5, {height: "20vw", ease: Power3.easeOut, delay: -0.5});
      timeline.to(this.ProjectHeader.children[0], 0.5, {paddingTop: "6vw", height: "calc(100% - 6vw)", fontSize: "6vw", ease: Power3.easeOut, delay: -0.5});
      timeline.to(this.ProjectHeader.children[0].children[0], 0.5, {height: "12.5vw", width: "12.5vw", ease: Power3.easeOut, delay: -0.5});
    }
    // }

    return timeline;
  }

  BackAction = () => {
    this.InAnimationTimeline.eventCallback("onReverseComplete", () => {
      TweenMax.to(this.Project, 0, {display: "none"});
      this.context.router.goBack();
    })
    this.InAnimationTimeline.reverse();
  }

  handleResize = () => {
		this.setState({orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'});
	}

  handleScroll = (e) => {
    if ( (e.type.indexOf('wheel') > -1 && e.deltaY > 0) || (e.type === 'touchmove' && e.touches[0].clientY < this.deltaY)) {
      this.ProjectHeaderScrollAnimation.play();
    } else {
      this.ProjectHeaderScrollAnimation.reverse();
    }

    if (e.type === 'touchmove') {
      this.deltaY = e.touches[0].clientY;
    }
  }

  handleTouchStart = (e) => {
    this.deltaY = e.touches[0].clientY;
  }

  handleTouchEnd = (e) => {
    this.deltaY = 0;
  }

	render(){
    this.data = undefined;
    for(var i = 0, len = projectsJSON.projects.length; i < len; i++) {
      if (this.props.router.locationBeforeTransitions.pathname.indexOf(projectsJSON.projects[i].route) > -1) {
        this.data = projectsJSON.projects[i];
        break;
      }
    }

		return (
			this.data ? (
        <div className={"Project " + this.state.orientation} ref={item => this.Project = item} id="Project">
          <div className="ProjectHeader" ref={el => this.ProjectHeader = el} >
            <div className="Content">
              <svg className="BackButton" dangerouslySetInnerHTML={{__html: BackButton}} ref={el => this.BackButton = el} onClick={this.BackAction}></svg>
              <h1 className="Title">{this.data.title}</h1>
              <p className="Client">{this.data.client}</p>
            </div>
          </div>
          <div className="HeadContent">
            {
              detect.device === "desktop" ? (
                <div className="HeadInfo">
                  <h1 className="Title">{this.data.title}</h1>
                  <p className="Client">{this.data.client}</p>
                </div>
              ) : ""
            }
            <div className="HeadImage">
              <img src={this.src + this.data.assetPath + this.data.thumbImage} alt={this.data.thumbImage} ref={el => this.HeadImage = el}/>
            </div>
          </div>
          <div className="Content" ref={el => this.Content = el}>
            <p className="Copy">{this.data.description}</p>
            {
              this.data.images.map((item, index)=>{
                return (
                  <img src={this.src + this.data.assetPath + item} alt="Screenshot" key={index}/>
                )
              })
            }
            <p className="Copy">{this.data.copy}</p>
            {
              this.data.url ? (
                <ActionButton url={this.data.url} text={"Product Site"} />
              ) : ""
            }
          </div>
        </div>
      ) : ""
		);
	}

}

const mapStateToProps = (state, ownProps) => {
  return {
		section: state.section,
    router: state.routing
  }
};

const mapDispatchToProps = (dispatch) => {
	return{
	}
};

Project.contextTypes = {
  router: React.PropTypes.object,
  store: React.PropTypes.object
};

// export default Project;
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Project);
