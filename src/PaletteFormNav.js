import React, { Component } from 'react';
import PaletteMetaFrom from './PaletteMetaForm';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/PaletteNavFormStyles';

class PaletteNavForm extends Component {
  state = {
    newPaletteName: '',
    formShowing: false,
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  showForm = () => {
    this.setState({ formShowing: true });
  };
  hideForm = () => {
    this.setState({ formShowing: false });
  };

  render() {
    const { classes, open, palettes, handleSubmit, handleDrawerOpen } = this.props;
    const { formShowing } = this.state;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="default"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Create A Palette
            </Typography>
          </Toolbar>
          <div className={classes.navBtns}>
            <Link to="/">
              <Button variant="contained" color="secondary" className={classes.button}>
                Go back
              </Button>
            </Link>
            <Button
              variant="contained"
              color="primary"
              onClick={this.showForm}
              className={classes.button}
            >
              Save
            </Button>
          </div>
        </AppBar>
        {formShowing && (
          <PaletteMetaFrom
            palettes={palettes}
            handleSubmit={handleSubmit}
            hideForm={this.hideForm}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles, { witheTheme: true })(PaletteNavForm);
