import React from 'react';
import { Link } from 'react-router-dom';
import PaletteFormNav from './PaletteFormNav';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import DraggableColorList from './DraggableColorList';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useEffect } from 'react';
import { arrayMove } from 'react-sortable-hoc';

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();

  // const [background, setBackground] = React.useState(true);

  const [open, setOpen] = React.useState(true);
  const [currentColor, setCurrentColor] = React.useState('teal');
  const [colors, setColors] = React.useState(props.palettes[0].colors);
  const [newColorName, setNewColorName] = React.useState('');
  const [newPaletteName, setNewPaletteName] = React.useState('');
  const paletteIsFull = colors.length >= 20;

  useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
      return colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase());
    });
    ValidatorForm.addValidationRule('isColorUnique', (value) => {
      return colors.every(({ color }) => color !== currentColor);
    });
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const updateCurrentColor = (newColor) => {
    setCurrentColor(newColor.hex);
  };

  const addNewColor = () => {
    const newColor = { color: currentColor, name: newColorName };
    setColors([...colors, newColor]);
    setNewColorName('');
  };

  const handleChange = (evt) => {
    // setNewName(evt.target.value);
    if (evt.target.name === 'newColorName') setNewColorName(evt.target.value);
    if (evt.target.name === 'newPaletteName') setNewPaletteName(evt.target.value);
  };

  const clearColors = () => {
    setColors([]);
  };
  const randomColor = () => {
    const allColors = props.palettes.map((p) => p.colors).flat();
    const rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    setColors([...colors, randomColor]);
  };

  const handleSubmit = (paletteName) => {
    const newPalette = {
      paletteName: paletteName,
      id: paletteName.toLowerCase().replace(/\s/g, '-'),
      colors: colors,
    };
    props.savePalette(newPalette);
    props.history.push('/');
  };

  const removeColor = (colorName) => {
    setColors(colors.filter((color) => color.name !== colorName));
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };

  return (
    <div className={classes.root}>
      <PaletteFormNav
        open={open}
        classes={classes}
        palettes={props.palettes}
        handleSubmit={handleSubmit}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <Typography variant="h4">Design Your Palette</Typography>
        <div>
          <Button variant="contained" color="secondary" onClick={clearColors}>
            Clear Palette
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={randomColor}
            disabled={paletteIsFull}
            style={{ backgroundColor: paletteIsFull && 'grey' }}
          >
            Random Color
          </Button>
        </div>
        <ChromePicker color={currentColor} onChange={updateCurrentColor} />

        <ValidatorForm onSubmit={addNewColor}>
          <TextValidator
            value={newColorName}
            name="newColorName"
            onChange={handleChange}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={[
              'Enter a color name',
              'Color name must be unique',
              'Color already used',
            ]}
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={paletteIsFull}
            style={{ backgroundColor: paletteIsFull ? 'grey' : currentColor }}
          >
            {paletteIsFull ? 'Palette Full' : 'Add Color'}
          </Button>
        </ValidatorForm>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
        />
      </main>
    </div>
  );
}
