import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'; // ES6
import fa from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee, faUserAlt } from '@fortawesome/fontawesome-free-solid'
import { faSmileBeam } from '@fortawesome/free-solid-svg-icons'

export default class Feature extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {
    fa.library.add(faCheckSquare, faCoffee, faSmileBeam, faUserAlt);
  }

  getIcon = () => fa.findIconDefinition({iconName: this.props.icon})

  render() {
    return (
      <div className="Feature" ref={el => { this.Feature = el }}>
        <div className="feature-icon">
          <FontAwesomeIcon icon={this.getIcon()} />
        </div>
        <p className="feature-content">{this.props.text}</p>
      </div>
    );
  }
}

Feature.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string
};

Feature.defaultProps = {
  text: "",
  icon: ""
};
