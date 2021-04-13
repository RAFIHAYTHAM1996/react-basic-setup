import React, { PureComponent } from 'react';
import { TweenMax, TimelineMax, EasePack, TextPlugin } from 'gsap';
import { enableScroll, disableScroll } from '../../util/scroll-control';

export default class Menu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    }
    this.Links = [];
  }

  componentDidMount() {
    this.fadeIn();
  }

  getTheme = () => this.props.theme ? this.props.theme : "dark"

  fadeIn = ()=>{
    const tl = new TimelineMax({paused: true});
    tl.fromTo(this.MenuButton, 0.5, { x: 0 }, { x: -70, ease: Expo.easeOut });
    tl.staggerTo([...this.Links], 1, { opacity: 1, ease: Expo.easeOut }, 0.125);
    tl.play();
  }

  toggle = () => {
    const time = .20;
    let paths = this.MenuBtn ? this.MenuBtn.children : [];

    if (this.state.collapsed) {
      // Expand
      var tl = new TimelineMax({paused: true});
      tl.to(paths[1], time * .7, { strokeDashoffset: 68 })
      tl.to([paths[0], paths[2]], time * .7, { strokeDashoffset: 0, delay: -time*.7 })
      tl.to(paths[0], time * .7, { y: 20 })
      tl.to(paths[2], time * .7, { y: -20, delay: -time * .7 })
      tl.to(paths[0], time, { rotationZ: "-45deg", transformOrigin: "center center", ease: Expo.easeOut })
      tl.to(paths[2], time, { rotationZ: "45deg", transformOrigin: "center center", ease: Expo.easeOut, delay: -time })
      tl.to(this.Menu, time * 2, { x: -this.Menu.getBoundingClientRect().width, ease: Quad.easeOut, delay: -time });
      tl.play();
    } else {
      // Collapse
      var tl = new TimelineMax({paused: true, delay: 0.25});
      tl.to(this.Menu, time*2, { x: 0, ease: Back.easeOut });
      tl.to([paths[0], paths[2]], time, { rotationZ: "0deg", transformOrigin: "center center", ease: Expo.easeIn, delay: -time})
      tl.to(paths[0], time, { y: -1, delay: -time })
      tl.to(paths[2], time, { y: 1 })
      tl.to(paths[2], time, { strokeDashoffset: 20, ease: Power3.easeInOut, delay: -time * 1.5 })
      tl.to(paths[1], time, { strokeDashoffset: 35, ease: Power3.easeInOut, delay: -time/2 })
      tl.to(paths[0], time, { x: 70, ease: Power3.easeIn, delay: -time * 2 })
      tl.set(paths[0], { x: -70 })
      tl.to(paths[0], time, { x: 0, ease: Power3.easeOut })
      tl.play();
    }

    this.props.moveContainer(this.state.collapsed)
    this.setState({collapsed: !this.state.collapsed})
  }

  goToSection = (name) => {
    if (name) {
      this.toggle();
      this.props.scrollToSection(name, enableScroll)
    }
  }

  render() {
    const theme = this.getTheme();
    this.Links = []
    return (
      <div className={`MenuContainer ${ theme }`} ref={el => this.Menu = el}>
        <div
          className={`MenuButton ${ theme }`}
          ref={el => this.MenuButton = el}
          onClick={this.toggle}
        >
          <svg viewBox="0 0 70 50" id="hamburger-menu" ref={el => this.MenuBtn = el}>
            <line x1={69} y1={5} x2={1} y2={5}/>
            <line x1={69} y1={25} x2={1} y2={25}/>
            <line x1={69} y1={45} x2={1} y2={45}/>
          </svg>
        </div>
        <ul
          className={`MenuLinkList ${  theme}`}
          ref={el => this.LinkList = el}
        >
          <li
            onClick={this.goToSection.bind(this, "section-landing")}
            ref={el => this.Links[0] = el}
            className={theme}
          >
            <a>
              <span className="LinkNumber">01</span>
              <svg className="MenuLinkLine" viewBox="0 0 30 3">
                <line x1="0" y1="2" x2="30" y2="2" />
              </svg>
              Home
            </a>
          </li>
          <li
            onClick={this.goToSection.bind(this, 'section-bio')}
            ref={el => this.Links[1] = el}
          >
            <a>
              <span className="LinkNumber">02</span>
              <svg className="MenuLinkLine" viewBox="0 0 30 3">
                <line x1="0" y1="2" x2="30" y2="2" />
              </svg>
              About Me
            </a>
          </li>
          <li
            onClick={this.goToSection.bind(this, 'section-experience')}
            ref={el => this.Links[2] = el}
          >
            <a>
              <span className="LinkNumber">03</span>
              <svg className="MenuLinkLine" viewBox="0 0 30 3">
                <line x1="0" y1="2" x2="30" y2="2" />
              </svg>
              Experience
            </a>
          </li>
          <li
            onClick={this.goToSection.bind(this, 'section-connect')}
            ref={el => this.Links[3] = el}
          >
            <a>
              <span className="LinkNumber">04</span>
              <svg className="MenuLinkLine" viewBox="0 0 30 3">
                <line x1="0" y1="2" x2="30" y2="2" />
              </svg>
              Let&#39;s Connect
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

Menu.propTypes = {
};

Menu.defaultProps = {
};
