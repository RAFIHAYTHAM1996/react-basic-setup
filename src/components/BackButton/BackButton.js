import React, {Component} from 'react';
import Tween from 'gsap';
import { TweenLite, TweenMax, TimelineMax, EasePack, ScrollToPlugin } from 'gsap';
import { connect } from 'react-redux';
import LeftArrow from '../../../raw-assets/svg/LeftArrow.svg';
import X from '../../../raw-assets/svg/X.svg';

class BackButton extends Component{

  constructor(props) {
    super(props);
  }

  componentDidMount(){
  }

  componentWillEnter(done) {
  }
  componentWillLeave() {
    this.props.backAction();

    var tl = new TimelineMax({paused: true});
    tl.to(this.BackButton, 0.5, {marginLeft: "-15vh", ease: Back.easeIn});
    tl.play();
  }

	render(){

		return (
			<div className="BackButton" ref={item => this.BackButton = item} id="BackButton" onClick={this.componentWillLeave.bind(this)}>
        <svg dangerouslySetInnerHTML={{__html: LeftArrow}}>
        </svg>
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

BackButton.contextTypes = {
  router: React.PropTypes.object,
  store: React.PropTypes.object
};

export default BackButton;

// export default connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(BackButton);
