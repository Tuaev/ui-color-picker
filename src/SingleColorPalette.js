import React, { Component } from 'react';
import ColorBox from './ColorBox.js';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { Link } from 'react-router-dom';
import styles from './styles/PaletteStyles';
import { withStyles } from '@material-ui/core/styles';

class SingleColorPalette extends Component {
  state = {
    format: 'hex',
  };
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

  changeFormat = (val) => {
    this.setState({ format: val });
  };

  render() {
    const { classes } = this.props;
    const { format } = this.state;
    const { paletteName, emoji, id } = this.props.palette;
    const colorBoxes = this._shades.map((color) => (
      <ColorBox
        key={color.name}
        name={color.name}
        background={color[format]}
        showingFullPalette={false}
      />
    ));
    return (
      <div className={classes.Palette}>
        <Navbar handleChange={this.changeFormat} showingAllColors={false} />
        <div className={classes.colors}>
          {colorBoxes}
          <div className={classes.goBack}>
            <Link to={`/palette/${id}`}>Go Back</Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
