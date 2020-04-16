import React, { Component } from 'react';
import ColorBox from './ColorBox.js';

class SingleColorPalette extends Component {
  gatherShades = (palette, colorFilterBy) => {
    let shades = [];
    let allColors = palette.colors;

    for (let key in allColors) {
      shades = shades.concat(allColors[key].filter((color) => color.id === colorFilterBy));
    }
    return shades.slice(1);
    //return all shades of given color
  };

  _shades = this.gatherShades(this.props.palette, this.props.colorId);

  render() {
    const colorBoxes = this._shades.map((color) => (
      <ColorBox key={color.id} name={color.name} background={color.hex} showLink={false} />
    ));
    return (
      <div className="Palette">
        <h1>Single Color Palette</h1>
        <div className="Palette-colors">{colorBoxes}</div>
      </div>
    );
  }
}

export default SingleColorPalette;
