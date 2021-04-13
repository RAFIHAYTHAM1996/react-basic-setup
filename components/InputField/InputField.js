import React, { Component } from 'react';

export default class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      error: "",
      valid: !(this.props.isRequired && this.props.isRequired !== false),
      showError: false
    }
  }

  componentDidUpdate() {
    if (this.props.showError === true && this.state.showError === false) {
      this.validate(this.Input);
    }
  }

  componentWillUnmount() {
    this.state = {};
  }

  validate = (target) => {
    if (!target) return;
    if (this.props.isRequired) {
      let valid = true, errMsg = "";
      if (target.value.length === 0) {
        valid = false;
        errMsg = "required";
      } else if (!this.props.skipValidation) {
          switch (this.props.type) {
            case "password":
              if (this.props.compareTo) {
                if (target.value !== this.props.compareTo) {
                  valid = false;
                  errMsg = "Passwords do not match. Please try again.";
                }
              } else if (target.value.length < 6 || target.value.length > 32) {
                valid = false;
                errMsg = "Password length must be between 6 and 32";
              }
              break;
            case "email":
              if (!target.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                valid = false;
                errMsg = "Please enter a valid email address";
              }
              break;
            default:
          }
        }
      this.setState({value: target.value, error: errMsg, valid, showError: true});
    } else if (this.props.format && target.value){
      // if (this.props.format === 'currency') {
      //   var val = StrUtils.getNumbers(target.value);
      //   this.setState({value: val, error: "", valid: true, showError: true});
      // }
    } else {
      this.setState({value: target.value, error: "", valid: true, showError: true});
    }
  }

  format = (value) => {
    if (value.length === 0) return value;
    if (this.props.format) {
      switch (this.props.format.toLowerCase()) {
        case "currency": {
          let firstCommaPos = value.length % 3,
              result = "$ ";

          if (value.length <= 3) return result + value;
          if (firstCommaPos > 0) {
            result += value.slice(0, firstCommaPos);
            result += ",";
          }
          for (let i = firstCommaPos; i < value.length; i++) {
            if (i > firstCommaPos) {
              result += ",";
            }
            result += value.slice(i, i + 3);
            i += 2;
          }
          return result;
          break;
        }
        default:
      }
    }

    return value;
  }

  getStyle = () => {
    let style = ""
    style = this.props.style ? this.props.style.toLowerCase() : "";
    style += ((!this.state.valid && this.state.showError) ? " invalid" : "");
    return style;
  }

  handleChange = (e) => {
    this.validate(e.target);
    this.props.onChange && this.props.onChange(e, this);
  }

  render() {
    return (
      <div className={`InputField ${  this.getStyle()}`}>
        <label>
          <span className="Label">
            {this.props.label}
            {this.state.showError && this.state.error !== "" ? <span className="Error">{ ` - ${  this.state.error}`}</span> : ""}
          </span>
          <input
            value={this.format(this.state.value)}
            id={this.props.id}
            ref={el => this.Input = el}
            onChange={this.handleChange}
            className="TextField"
            type={this.props.type || "text"}
          />
        </label>
      </div>
    );
  }
}
