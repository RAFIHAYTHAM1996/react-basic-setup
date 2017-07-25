import React, {Component} from 'react';
import Section from '../../Components/Section/Section';
import InstagramProfile from '../../Components/InstagramProfile/InstagramProfile';
import { connect } from 'react-redux';

class About extends Component{

	constructor(props) {
  	super(props);
	}

	componentDidMount() {
  }

	componentDidUpdate(){
	}

	render(){
		return(
			<Section id="About">
				<div className="Content">
					<h1>Hi,</h1>
					<p>I&#39;m Rafi George, a Creative Developer from Toronto, Canada.</p>
					{
						//<InstagramProfile/>
					}
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

About.contextTypes = {
	router: React.PropTypes.object,
  store: React.PropTypes.object
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(About);
