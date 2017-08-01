import React, {Component} from 'react';
import {PullFromInstagram, RequestInstagramAccessToken} from '../../actions/externalAPIs';
import { connect } from 'react-redux';

class InstagramProfile extends Component{

	constructor(props){
		super(props);
	}

	componentDidMount(){
		this.props.pullFromInstagram({access_token: "201262345.3af8d79.74976cd65f5749128754a9208c3c7d97"});
		this.orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
		window.addEventListener('resize', this.handleResize);
	}

	handleResize = () => {
		this.orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
	}

	render(){
		return (
			<div id={this.props.id} className={"InstagramProfile " + this.orientation}>
				<img src={this.props.InstagramProfileData.profile_picture} id="profilePicture"/>
				<h1>Instagram</h1>
				<hr />
				{
					this.props.InstagramRecentMedia ? (
						<div className="flex">
						{
							this.props.InstagramRecentMedia.map( mediaItem => {
								return (
									<a href={mediaItem.link} target="_blank"  key={mediaItem.id}>
										<img src={mediaItem.images.standard_resolution.url} className="thumbnail"/>
									</a>
								)
							})
						}
						</div>
					) : ""
				}
			</div>
		);
	}
}

const mapStateToProps = (state, ownState) => {
	return{
		InstagramProfileData: state.PullFromInstagram.instagram_profile,
		InstagramRecentMedia: state.PullFromInstagram.instagram_recent_media,
	}
}

const mapDispatchToProps = (dispatch) =>{
	return{
		pullFromInstagram: val => dispatch(PullFromInstagram(val)),
		requestInstagramAccessToken: val => dispatch(RequestInstagramAccessToken(val))
	}
}

InstagramProfile.contextTypes = {
	router: React.PropTypes.object,
  store: React.PropTypes.object
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InstagramProfile);
