import * as React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Logo from '../Logo/Logo';

const styles = {
  root: {
    flexGrow: 1
  }
};

function SimpleAppBar(props: WithStyles<'root'>) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Logo style={{ maxHeight: '40px' }} />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(SimpleAppBar);
