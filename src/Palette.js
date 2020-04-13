import React, { Component } from 'react';
import ColorBox from './ColorBox.js';
import Navbar from './Navbar';
import './Palette.css';

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
        {/* Navbar  */}
        <Navbar level={level} changeLevel={this.changeLevel} />
        <div className="Palette-colors">{colorBoxes}</div>
        {/* footer */}
      </div>
    );
  }
}
