import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  main: {
    backgroundColor: 'purple',
    border: '3px solid teal',
    '& h1': { color: 'white' },
  },
  secondary: {
    backgroundColor: 'brown',
    '& h1': { color: 'Pink', '& span': { backgroundColor: 'yellow' } },
  },
};

const MiniPalette = (props) => {
  const { classes } = props;
  console.log(classes);

  return (
    <div className={classes.main}>
      <h1>Mini Palette</h1>
      <section className={classes.secondary}>
        <h1>
          Mini Palette 2 <span>kadgajshdgasjhd</span>
        </h1>
        <span>kadgajshdgasjhd</span>
      </section>
    </div>
  );
};

export default withStyles(styles)(MiniPalette);
