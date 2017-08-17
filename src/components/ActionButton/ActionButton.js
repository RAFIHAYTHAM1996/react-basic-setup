import React, {Component} from 'react';
import Tween from 'gsap';
import { TweenLite, TweenMax, TimelineMax, EasePack, ScrollToPlugin } from 'gsap';
import { connect } from 'react-redux';

class ActionButton extends Component{

  constructor(props) {
    super(props);
  }

  componentDidMount(){
  }

  componentWillEnter(done) {
  }
  componentWillLeave() {
  }

  OnClick = (url) => {
    window.location = url;
  }

	render(){

		return (
      <a className="ActionButton" onClick={ this.OnClick.bind(this, this.props.url) } ref={el => this.ActionButton = el}>
        <p>
          {this.props.text} <span className="arrow">&gt;</span>
        </p>
      </a>
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

ActionButton.contextTypes = {
  router: React.PropTypes.object,
  store: React.PropTypes.object
};

export default ActionButton;

// export default connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(ActionButton);
