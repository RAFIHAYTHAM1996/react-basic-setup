import React, {Component} from 'react';
import Tween from 'gsap';
import { TweenLite, TweenMax, TimelineMax, EasePack, ScrollToPlugin } from 'gsap';
import { connect } from 'react-redux';
import {setCurrSection} from '../../actions/sectionManager';

class Section extends Component{

  constructor(props) {
    super(props);
    this.tl = new TimelineMax({paused: true});
		this.setCurrSection = this.props.setCurrSection.bind(this);
  }

  componentDidMount(){
    this.componentWillEnter();
  }

  componentDidUpdate(){
    if(this.props.section.currSection !== this.props.section.nextSection && this.section.id.toLowerCase() !== this.props.section.nextSection){
      this.componentWillLeave(() => {
        this.setCurrSection(); this.context.router.push(this.props.section.nextSection);
      });
    }
  }

  componentWillEnter(done) {
    this.tl.kill();
    this.tl.add(TweenMax.to(this.section, 1, {opacity: 1, ease: Back.easeOut}));
    this.tl.add(TweenMax.to(this.section, 1, {scale: 1, ease: Back.easeOut, onComplete: done}));
    this.tl.play();
  }
  componentWillLeave(done) {
    this.tl.kill();
    this.tl.add(TweenMax.to(this.section, 1, {scale: 0.9, ease: Back.easeOut}));
    this.tl.add(TweenMax.to(this.section, 1, {opacity: 0, ease: Back.easeOut, onComplete: done}));
    this.tl.play();
  }

	render(){

		return (
			<div className="Section " ref={item => this.section = item} id={this.props.id}>
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
		setCurrSection: val => dispatch(setCurrSection(val))
	}
};

Section.contextTypes = {
  router: React.PropTypes.object,
  store: React.PropTypes.object
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Section);
