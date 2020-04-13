import React, { Component } from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';

export default class Navbar extends Component {
  render() {
    const { level, changeLevel } = this.props;
    return (
      <header className="Navbar">
        <div className="logo">
          <a href="/">Color Picker</a>
        </div>
        <div className="slider-container">
          <span>Level: {level}</span>
          <div className="slider">
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              onAfterChange={changeLevel}
              step={100}
            />
          </div>
        </div>
      </header>
    );
  }
}
