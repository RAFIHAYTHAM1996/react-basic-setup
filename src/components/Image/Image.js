import React, {Component} from 'react';

class Image extends Component{
	render(){
		return (
			<img id={this.props.id} src={this.props.src} alt="Portrait"/>
		);
	}

}

export default Image;
