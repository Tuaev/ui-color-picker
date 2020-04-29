import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

class PaletteMetaForm extends Component {
  state = {
    open: true,
    newPaletteName: '',
  };

  componentDidMount() {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
      return this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  }

  handleChange = (evt) => {
    // setNewName(evt.target.value);
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { newPaletteName } = this.state;

    return (
      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={() => this.props.handleSubmit(newPaletteName)}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new beautiful palette. Make sure it's unique!
            </DialogContentText>
            <TextValidator
              label="Palette Name"
              value={newPaletteName}
              fullWidth
              margin="normal"
              name="newPaletteName"
              onChange={this.handleChange}
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={['Enter Palette Name', 'Palette Name already taken']}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    );
  }
}

export default PaletteMetaForm;
