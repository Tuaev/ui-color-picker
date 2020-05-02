import React, { Component } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from './styles/ColorBoxStyles';
import { withStyles } from '@material-ui/core/styles';

class ColorBox extends Component {
  state = { copied: false };

  // Change copied state to true for 1.5s
  changeCopyState = () => {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  };

  render() {
    const { name, background, moreUrl, showingFullPalette, classes } = this.props;
    const { copied } = this.state;

    return (
      // Displays color and copys to clipboard on click.
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background }} className={classes.ColorBox}>
          <div
            style={{ background }}
            className={clsx(classes.copyOverlay, {
              [classes.showOverlay]: copied,
            })}
          />

          <div
            className={clsx(classes.copyMessage, {
              [classes.showMessage]: copied,
            })}
          >
            <h1>Copied</h1>
            <p className={classes.copyText}>{background}</p>
          </div>
          <div>
            <div className={classes.boxContent}>
              <span className={classes.colorName}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {showingFullPalette && (
            <Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
              <span className={classes.seeMore}>MORE</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);
