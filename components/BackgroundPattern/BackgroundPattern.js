import React, { Component } from 'react';
import { TweenMax, TimelineMax } from 'gsap';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      numbers: []
    }
    this.spans = []
  }

  componentDidMount() {
    this.checkVisibility();
    this.generateNumbers();
    this.animate();
    window.addEventListener('resize', this.generateNumbers);
  }

  componentDidUpdate() {
    this.checkVisibility();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.generateNumbers);
  }

  animate = () => {
    if (this.spans.length > 0) {
      const randoms = [];
      for (let i = 0; i < 30; i++) {
        let random;
        while(!random || randoms.includes(random)) {
          random = Math.floor(Math.random() * this.spans.length);
        }
        randoms.push(random)
      }
      randoms.forEach((number, index) => {
        const delay = .25 * index;
        TweenMax.fromTo(this.spans[number], 1.5, { y: -20 }, { y: 20, ease: Power2.easeInOut, delay: delay });
        TweenMax.fromTo(this.spans[number], .5, { opacity: 0, scale: 1, filter: 'blur(2px)' }, { opacity: 1, scale: 1.3, filter: 'blur(0px)', ease: Power3.easeIn, delay: delay });
        TweenMax.to(this.spans[number], 1, { opacity: 0, ease: Power3.easeOut, delay: delay + .5 });
        TweenMax.set(this.spans[number], { y: 0, delay: 1.5 + delay });
        TweenMax.to(this.spans[number], .5, { opacity: .2, scale: 1, ease: Power3.easeOut, delay: 1.5 + delay });
        if (index === randoms.length - 1) setTimeout(this.animate, 1000 + (delay * 1000));
      })
    } else {
      setTimeout(this.animate, 500);
    }
  }

  checkVisibility() {
    let visible = true;
    if (visible !== this.state.visible) this.setState({ visible })
  }

  generateNumbers = () => {
    const TILE_SIZE = 150;
    const numbers = [];
    this.numRows = Math.ceil(window.innerHeight / TILE_SIZE) + 1
    this.numCols = Math.ceil(window.innerWidth / TILE_SIZE) + 1
    for (let i = 0; i < this.numRows; i++) {
      numbers[i] = [];
      for (let j = 0; j < this.numCols; j++) {
        numbers[i].push(Math.floor(Math.random() * 2))
      }
    }
    this.setState({ numbers })
  }

  render () {
    const { visible, numbers } = this.state;
    return visible && (
      <div className='bg-pattern-container'>
        { numbers.map((row, index) => (
            <div className='bg-pattern row' key={ index }>
            { row.map((number, colIndex) => <span key={ colIndex } ref={ e => this.spans[index * row.length + colIndex] = e }>{ number }</span>) }
            </div>
          ))
        }
      </div>
    )
  }
}