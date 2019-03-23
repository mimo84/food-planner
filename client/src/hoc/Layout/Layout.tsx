import * as React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '../../components/UI/AppBar/AppBar';

const styles = () => ({
  root: {
    flexGrow: 1
  }
});

interface Props extends WithStyles<typeof styles> {}
class Layout extends React.Component<Props> {
  render() {
    const { classes, children } = this.props;

    return (
      <div className={classes.root}>
        <AppBar />
        <Grid container spacing={16}>
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Layout);
