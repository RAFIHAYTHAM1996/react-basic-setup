import React, {Component} from 'react';
import Section from '../../Components/Section/Section';
import { connect } from 'react-redux';
import {PullFromInstagram, RequestInstagramAccessToken, SetInstagramAccessToken} from '../../actions/externalAPIs';

class About extends Component{

	constructor(props) {
  	super(props);
	}

	componentDidMount() {
		this.props.setInstagramAccessToken({access_token: "201262345.3af8d79.74976cd65f5749128754a9208c3c7d97"});
		this.props.pullFromInstagram({access_token: "201262345.3af8d79.74976cd65f5749128754a9208c3c7d97"});
		//this.props.requestInstagramAccessToken({redirectURL: "http://localhost:9966/about"});
  }

	render(){
		return(
			<Section id="About">
			<p style={{color: "white"}}>{this.props.data}</p>
			</Section>
		);
	}
}

const mapStateToProps = (state, ownState) => {
	return{
		URLParams: state.routing.locationBeforeTransitions.hash,
		InstagramAccessToken: state.PullFromInstagram.access_token,
		InstagramData: state.PullFromInstagram.data
	}
}

const mapDispatchToProps = (dispatch) =>{
	return{
		pullFromInstagram: val => dispatch(PullFromInstagram(val)),
		requestInstagramAccessToken: val => dispatch(RequestInstagramAccessToken(val)),
		setInstagramAccessToken: val => dispatch(SetInstagramAccessToken(val))
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
