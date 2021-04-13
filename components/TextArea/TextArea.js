import React, { Component } from 'react';
import {TweenMax, TimelineMax} from 'gsap';

export default class TextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      error: "",
      valid: !(this.props.isRequired && this.props.isRequired !== false),
      showError: false
    }
    this.maxLength = 500;
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidUpdate() {
    if (this.props.showError === true && this.state.showError === false) {
      this.validate(this.Input);
    }
  }

  handleChange = (e) => {
    this.validate(e.target);
    this.props.onChange(e);
  }

  validate = (target) => {
    if (!target) return;
    if (this.props.isRequired && this.props.isRequired !== false) {
      let valid = true, errMsg = "";
      if (target.value.length === 0) {
        valid = false;
        errMsg = "required";
      }
      this.setState({value: target.value, error: errMsg, valid, showError: true});
    } else {
      this.setState({value: target.value, error: "", valid: true, showError: true});
    }
  }

  render() {
    return (
      <div className="TextArea">
        <label htmlFor={this.props.id} className="Label">
          {this.props.label}
          {this.maxLength - this.state.value.length <= (this.maxLength/10) ? (` - ${  this.maxLength - this.state.value.length  } characters left`) : ""}
          {this.state.error ? (<span className="Error">{` - ${  this.state.error}`}</span>) : ""}
        </label>
        <textarea
          value={this.state.value}
          id={this.props.id}
          onChange={this.handleChange}
          className="TextField"
          ref={el => this.Input = el}
          maxLength={this.maxLength}
        />
      </div>
    );
  }
}
