import React, { Component } from 'react';
import ColorBox from './ColorBox.js';
import Navbar from './Navbar';
import './Palette.css';

export default class Palette extends Component {
  state = {
    level: 500,
    format: 'hex',
  };
  changeLevel = (newLevel) => {
    this.setState({ level: newLevel });
  };

  changeFormat = (val) => {
    this.setState({ format: val });
  };

  render() {
    const { colors } = this.props.palette;
    const { level, format } = this.state;
    const colorBoxes = colors[level].map((color) => (
      <ColorBox background={color[format]} name={color.name} />
    ));
    return (
      <div className="Palette">
        {/* Navbar  */}
        <Navbar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat} />
        <div className="Palette-colors">{colorBoxes}</div>
        {/* footer */}
      </div>
    );
  }
}
