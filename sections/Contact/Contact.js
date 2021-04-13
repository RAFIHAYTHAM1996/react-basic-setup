'use strict';
import React from 'react';
import { TweenMax, TimelineMax, EasePack, TextPlugin} from 'gsap';
import Recaptcha from 'react-google-recaptcha';
import settings from '../../util/settings';
import InputField from '../../components/InputField/InputField';
import TextArea from '../../components/TextArea/TextArea';
import fetch from 'isomorphic-fetch';
import ReactGA from 'react-ga';
import URLJoin from 'url-join';
import ParticleEffectButton from 'react-particle-effect-button'

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validCaptcha: false,
      showError: false,
      email: {
        submitted: false,
        sent: false,
        failed: false
      },
      analyticsSubmitted: {
        scroll: false,
        form: false
      },
      btn: {
        hidden: false,
        animating: false
      }
    }
    this.AnimationElements = []
    this.InputFields = []
  }
  componentDidMount() {
    TweenMax.to(this.container, 0.5, {autoAlpha: 1});
    TweenMax.set(this.AnimationElements, {autoAlpha: 0});
    this.animateIn();

    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll()
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    TweenMax.set(this.container, {autoAlpha: 0});
  }
  handleInputChange = (e, item)=>{

  }
  handleScroll = (e) => {
    if (this.container.getBoundingClientRect().top < window.innerHeight && !this.state.analyticsSubmitted.scroll) {
      ReactGA.modalview('contact');
      this.setAnalyticSubmission('scroll')
    }
    if (this.props.isResponsive) {
      if (this.container.getBoundingClientRect().top <= window.innerHeight/2) {
        this.animateIn();
        window.removeEventListener('scroll', this.handleScroll);
      }
    } else {
      if (this.container.getBoundingClientRect().top < window.innerHeights) {
        this.animateIn();
        window.removeEventListener('scroll', this.handleScroll);
      }
    }
  }
  setAnalyticSubmission = (name) => {
    if (name) {
      this.setState({analyticsSubmitted: {...this.state.analyticsSubmitted, [name]: true}})
    }
  }
  animateIn = () => {
    var tl = new TimelineMax({paused: true});
    tl.staggerFromTo(this.AnimationElements, 2, {autoAlpha: 0, y: 50}, {autoAlpha: 1, y: 0, ease: Expo.easeOut}, 0.25);
    tl.play();
  }
  handleReCaptcha = (value) => {
    this.setState({
      validCaptcha: value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    var allValid = true;
    for (var i = 0; i < this.InputFields.length; i++) {
      if (this.InputFields[i].id !== "website") {
        if (!this.InputFields[i].state.valid) {
          allValid = false;
          break;
        }
      }
    }
    if (!allValid) {
      this.setState({showError: true})
    } else if (!this.state.validCaptcha && !settings.isDev) {

    } else {
      // settings.server
      fetch(URLJoin(settings.server, '/forms/mail.php'), {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          "Content-type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify(this.getFormContent())
      }).then((response) => {
        if (!response.ok) {
          this.setState({email: {...this.state.email, failed: true}})
          throw new Error('Something went wrong');
        } else {
          this.setState({email: {...this.state.email, sent: true}})
        }
        ReactGA.event({
          category: 'Contact',
          action: 'Submit',
          label: response.ok ? 'Succeeded' : 'Failed'
        });
        return response.json();
      }).then((data)=>{
        // console.log(data)
      }).catch(msg => {
        this.setState({email: {...this.state.email, failed: true}})
      })
      this.toggleButton()
    }
  }
  getFormContent = () => {
    var obj = {};
    for (var i = 0; i < this.InputFields.length; i++) {
      obj[this.InputFields[i].props.id] = this.InputFields[i].state.value
    }
    return obj;
  }

  toggleButton = () => {
    if (this.state.btn.animating) return
    this.setState({btn: {
      hidden: !this.state.btn.hidden,
      animating: true
    }})
  }

  onBtnAnimComplete = () => {
    this.setState({btn: {
      ...this.state.btn, animating: false
    }, email: {...this.state.email, submitted: this.state.btn.hidden ? true : false}})
  }

  resetForm = () => {
    this.setState({email: {...this.state.email, submitted: false, sent: false, failed: false}});
    window.setTimeout(this.toggleButton, 1000);
  }

  render() {
    this.AnimationElements = []
    this.InputFields = []

    return <div
      id="section-connect"
      ref={el => this.container = el}
    >
      <div className='container'>
        <h1 className='mb-3'>Let's get to know each other!</h1>
        <p>Would you like me to help bring an idea to life? Or maybe have a coffee chat together?</p>
        <p>Send me an email at <a href={`mailto:rafihgeorge@gmail.com?subject=General Inquiry&body=Hi%20Rafi,%0d%0dMy name is ________ and I%20would%20like%20to ___________%0d%0dMy contact information is ___________%20`} rel='EMAIL'>rafihgeorge@gmail.com</a></p>
      </div>
    </div>;
  }
};
// {/* <div className="ContentContainer">
//   {
//     !this.state.email.submitted ? (
//       <form onSubmit={this.handleSubmit}>
//         <h1 ref={el => this.AnimationElements[0] = el}>Let&#8217;s Connect</h1>
//         {/* InputFields */}
//         <div className="row" ref={el => this.AnimationElements[1] = el}>
//           <div className="col-sm-6">
//             <InputField label="Name" id="name" showError={this.state.showError}
//                         ref={el => this.InputFields[0] = el}
//                         onChange={this.handleInputChange} isRequired />
//           </div>
//           <div className="col-sm-6">
//             <InputField label="Email" id="email" isRequired type="email"
//                         showError={this.state.showError} ref={el => this.InputFields[1] = el} />
//           </div>
//         </div>
//         {/* TextArea */}
//         <div className="row" ref={el => this.AnimationElements[2] = el}>
//           <div className="col-sm-12">
//             <TextArea label="I would like to.." id="message"
//                       isRequired showError={this.state.showError}
//                       onChange={this.handleInputChange} ref={el => this.InputFields[2] = el}/>
//           </div>
//         </div>
//         <div ref={el => this.AnimationElements[3] = el}>
//           { !settings.isDev &&
//             <div>
//               <Recaptcha
//                 key="captcha"
//                 className="captcha"
//                 onChange={this.handleReCaptcha}
//                 sitekey={settings.googleReCaptchaKey}
//                 theme="dark"
//               />
//               <h6 style={{color: "red", marginTop: 10}} className="thin">{this.state.showError && !this.state.validCaptcha ? "Please complete the reCAPTCHA" : ""}</h6>
//             </div>
//           }
//         </div>
//         <div ref={el => this.AnimationElements[4] = el}>
//           <ParticleEffectButton
//               color={settings.colors.secondary}
//               hidden={this.state.btn.hidden}
//               onComplete={()=>{this.onBtnAnimComplete()}}>
//             <button className="btn-styled">SEND</button>
//           </ParticleEffectButton>
//         </div>
//       </form>
//     ) : (
//       <div className="row">
//         <div className="col-sm-6">
//           { this.state.email.sent &&
//             <h2>Thanks for your email, I will get back to you shortly.</h2>
//           }
//           { this.state.email.failed && (
//             <div>
//               <h2>Sorry, there was an error sending your email. Please try again later.</h2>
//               <button className="btn-styled" style={{marginTop: 30}} onClick={this.resetForm}>TRY AGAIN</button>
//             </div>
//           )
//           }
//           { !this.state.email.sent && !this.state.email.failed &&
//             <h2>Sending email...</h2>
//           }
//         </div>
//       </div>
//     )
//   }
// </div> */}

Contact.defaultProps = {
  windowWidth: 960,
  windowHeight: 570
};

export default Contact;
