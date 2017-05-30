import React, {Component} from 'react';

class Section extends Component{

  constructor(props) {
    super(props);
  }

	render(){

		return (
			<div className="Section " id={this.props.id}>
        {this.props.children}
			</div>
		);
	}

}

export default Section;
