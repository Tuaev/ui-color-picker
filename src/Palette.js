import React, { Component } from 'react';
import ColorBox from './ColorBox.js';
import './Palette.css';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

export default class Palette extends Component {
  state = {
    level: 500,
  };
  changeLevel = (newLevel) => {
    this.setState({ level: newLevel });
  };

  render() {
    const { colors } = this.props.palette;
    const { level } = this.state;
    const colorBoxes = colors[level].map((color) => (
      <ColorBox background={color.hex} name={color.name} />
    ));
    return (
      <div className="Palette">
        <Slider
          defaultValue={level}
          min={100}
          max={900}
          onAfterChange={this.changeLevel}
          step={100}
        />
        {/* Navbar  */}
        <div className="Palette-colors">{colorBoxes}</div>
        {/* footer */}
      </div>
    );
  }
}
