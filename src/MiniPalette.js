import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/MiniPaletteStyles';
import DeleteIcon from '@material-ui/icons/Delete';

class MiniPalette extends PureComponent {
  deletePalette = (evt) => {
    evt.stopPropagation();
    this.props.openDialog(this.props.id);
  };

  handleClick = () => {
    this.props.goToPalette(this.props.id);
  };

  render() {
    const { paletteName, emoji, classes, colors } = this.props;
    const miniColorBoxes = colors.map((color) => (
      <div
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
        key={color.name}
      />
    ));

    return (
      <div className={classes.root} onClick={this.handleClick}>
        <DeleteIcon className={classes.deleteIcon} onClick={this.deletePalette} />

        <div className={classes.colors}>{miniColorBoxes}</div>
        <h5 className={classes.title}>
          {paletteName} <span className={classes.emoji}>{emoji}</span>
        </h5>
      </div>
    );
  }
}

export default withStyles(styles)(MiniPalette);
