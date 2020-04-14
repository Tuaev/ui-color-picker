import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';

class PaletteList extends Component {
  render() {
    const { palettes } = this.props;
    return (
      <div>
        <MiniPalette />
        <div className="Palette-List">
          {palettes.map((palette) => (
            <p>
              <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
            </p>
          ))}
        </div>
      </div>
    );
  }
}
export default PaletteList;
