/**
 * demo1.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2018, Codrops
 * http://www.codrops.com
 */

import React from 'react';
import imagesLoaded from 'imagesloaded';
import settings from '../../util/settings';
import Plx from 'react-plx';
import { TweenMax, TimelineMax, EasePack} from 'gsap';

class Slide {
  constructor(el) {
    this.DOM = {el: el};
    this.DOM.slideImg = this.DOM.el.querySelector('.slide__img');
    this.bgImage = this.DOM.slideImg.style.backgroundImage;
  }
  layout() {
    this.DOM.glitchImgs = Array.from(this.DOM.slideImg.querySelectorAll('.glitch__img'));
  }
  changeBGImage(bgimage, pos = 0, delay = 0) {
    this.layout()
    setTimeout(() => this.DOM.glitchImgs[pos].style.backgroundImage = bgimage, delay);
  }
}

export default class GlitchSlideshow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0
    }
    this.DOM = {};
    this.DOM.slides = [];
    this.slides = [];
    this.glitchTime = 1200;
    this.totalGlitchSlices = 5;
    this.AnimationElements = []
    this.Timer = undefined
  }

  componentDidMount() {
    this.slidesTotal = this.DOM.slides.length;
    this.DOM.slides.forEach(slide => this.slides.push(new Slide(slide)));
    this.init();
    this.runAutomation();
  }

  componentDidUpdate() {
    this.runAutomation();
    this.animateInContent();
  }

  init = () => {
    var slideImgs = document.querySelectorAll('.slide__img')
    // Preload all the images in the page..
  	imagesLoaded(slideImgs, {background: true}, () => {
      slideImgs.forEach((image, pos) => {
        image.addEventListener('click', (ev) => {
          ev.preventDefault();
          if ( !this.isReady(pos) ) return;
          // this.navigate(pos);
        })
      });
    });
  }

  glitch = (slideFrom, slideTo) => {
    return new Promise((resolve, reject) => {
      slideFrom.DOM.slideImg.classList.add('glitch--animate');

      const slideFromBGImage = slideFrom.bgImage;
      const slideToBGImage = slideTo.bgImage;

      for (let i = this.totalGlitchSlices-1; i >= 0; --i) {
        slideFrom.changeBGImage(slideToBGImage, i, this.glitchTime/(this.totalGlitchSlices+1)*(this.totalGlitchSlices-i-1) + this.glitchTime/(this.totalGlitchSlices+1));
      }

      setTimeout(() => {
        slideFrom.DOM.slideImg.classList.remove('glitch--animate');

        // reset bgimages.
        for (let i = this.totalGlitchSlices-1; i >= 0; --i) {
          slideFrom.changeBGImage(slideFromBGImage, i, 0);
        }

        resolve();
      }, this.glitchTime);
    });
  }
  navigate = (pos, next, direct) => {
    if ( !this.isReady(pos, direct) ) return;
    this.isAnimating = true;

    var newCurrent = pos;
    if (!direct) {
      newCurrent = next ? pos + 1 : pos - 1;
      if (newCurrent == this.slidesTotal && next) newCurrent = 0
      else if (newCurrent == -1 && !next) newCurrent = this.slidesTotal - 1
    }

    this.glitch(this.slides[this.state.current], this.slides[newCurrent]).then(() => {
      this.DOM.slides[this.state.current].classList.remove('slide--current');
      this.setState({current: newCurrent});
      this.DOM.slides[newCurrent].classList.add('slide--current');
      this.isAnimating = false;
    });
  }
  isReady = (pos, direct) => {
    return !this.isAnimating && (direct || pos === this.state.current);
  }
  renderSubImgs = (path, index) => {
    // if current, or next
    if (index == this.state.current || (index == this.state.current + 1) || (this.state.current-1 == this.slidesTotal && index == 0)) {
      var str = ''
      for (var i = 0; i < 5; i++) {
        str += "<div class='glitch__img' style='background-image: " + path + "'></div>"
      }
      return str
    }
  }
  runAutomation = () => {
    const duration = 8000;
    if (this.Timer) clearTimeout(this.Timer);
    this.Timer = setTimeout(()=>{
      this.animateOutContent();
      this.navigate(this.state.current, true);
    }, duration)
    TweenMax.fromTo(this.NavTimer, duration/1000, {strokeDashoffset: 315}, {strokeDashoffset: 0, ease: Linear.easeInOut});
  }
  animateInContent = () => {
    TweenMax.staggerFromTo(this.AnimationElements, 1, {autoAlpha: 0, y: -10}, {autoAlpha: 1, y: 0, ease: Expo.easeOut}, 0.25);
  }
  animateOutContent = () => {
    TweenMax.to(this.NavTimer, 0.5, {opacity: 0})
    TweenMax.staggerFromTo(this.AnimationElements, 0.25, {autoAlpha: 1, y: 0}, {autoAlpha: 0, y: 20, ease: Expo.easeOut}, 0.125);
  }

  render() {
    this.AnimationElements = []
    var responsive = false, responsivePortrait = false;
    if (!settings.isServer()) {
      responsive = window.innerWidth < settings.responsiveBreakpoint ? true : false;
      responsive = window.innerHeight / window.innerWidth > 1 ? true : responsive;
      if (this.props.detect) {
        responsivePortrait = responsive && window.innerHeight / window.innerWidth > 1;
      }
    }
    return (
      <div>
        <div className="slides slides--fullscreen effect-1" ref={el => this.DOM.el = el}>
          { this.props.data.map((item, index) => {
              var imgSrc = item.images[0]
              if (responsivePortrait) {
                const dotPos = item.images[0].lastIndexOf('.');
                imgSrc = item.images[0].substr(0, dotPos) + '-phone' + item.images[0].substr(dotPos);
              }
              var path = "url('" + this.props.base + imgSrc + "')"
              return (
                <div className={"slide" + (index == 0 ? " slide--current" : "")} key={index} ref={el => this.DOM.slides[index] = el}>
                  <div className="slide__img glitch" style={{backgroundImage: path}}
                       dangerouslySetInnerHTML={{__html: this.renderSubImgs(path, index)}}>
                  </div>
                </div>
              )
            })
          }
        </div>
        { // Outline
          !responsive &&
          <Plx className="snippet-container outline"
               parallaxData={[{
                start: "self",
                duration: settings.isServer() ? 0 : window.innerHeight,
                properties: [
                  {
                    startValue: 1,
                    endValue: 0,
                    property: "opacity"
                  },
                  {
                    startValue: "rgba(255, 255, 255, 0.5)",
                    endValue: "rgba(255, 255, 255, 0)",
                    property: "backgroundColor"
                  },
                  {
                    startValue: 0,
                    endValue: responsive ? 0 : -100,
                    property: "translateY"
                  }
                ]
              }]}>
          </Plx>
        }

        <Plx className="snippet-container row"
             parallaxData={[{
               start: "self",
               duration: 150,
               properties: [
                 {
                   startValue: 0,
                   endValue: 1,
                   property: "opacity"
                 },
                 {
                   startValue: responsive ? -50 : 0,
                   endValue: responsive ? 0 : -50,
                   property: "translateY"
                 }
               ]
             }]}>
           <div className="ContentContainer">
            {
              // this.props.data[this.state.current].info.map((item, index) => {
              //   var lastAndOdd = (index == info.length - 1) && info.length % 2 != 0
              //   return (
              //     <div className={"snippet-info col-sm-6" + (lastAndOdd ? "lastOdd" : "")} key={index}>
              //       <h6 className="snippet-title" ref={el => this.AnimationElements[index*2] = el}>{item.title}</h6>
              //       <h5 className="snippet-content" ref={el => this.AnimationElements[(index*2) + 1] = el}>{item.content || ""}</h5>
              //     </div>
              //   )
              // })
            }

            {
              this.props.data[this.state.current].info.map((item, index) => {
                if (item.title == "name") {
                  return (
                    <div className="snippet-info col-12" key={index} style={{textAlign: "center"}}>
                      <h5 className="snippet-content" ref={el => this.AnimationElements[index] = el}>{item.content || ""}</h5>
                    </div>
                  )
                }
              })
            }

            <div className="nav-container">
              { this.props.data.map((item, index) => {
                  var curr = index == this.state.current ? true : false
                  return (
                     <svg className={"nav-circle" + (curr ? " active" : "")} key={index}
                          onClick={this.navigate.bind(this, index, null, true)} viewBox="0 0 102 102">
                       <circle className="nav-circle-border" cx="51" cy="51" r="50" />
                       <circle cx="51" cy="51" r="30" />
                       { curr &&
                          <g transform="rotate(-90 51 51)">
                            <circle className="nav-timer" cx="51" cy="51" r="50" ref={el => this.NavTimer = el} />
                          </g>
                       }
                    </svg>
                  )
                })
              }
            </div>
          </div>
        </Plx>
      </div>
    )
  }
}
