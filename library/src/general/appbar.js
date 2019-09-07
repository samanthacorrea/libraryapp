import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  position: {
      position: "fixed",
      width: "100%",
      zIndex: "9999"
  }
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root + " " +classes.position}>
      <AppBar position="static" color="primary">
        <Toolbar className="text-center">
          <Typography variant="h6" className={classes.title + " text-uppercase"}>
            <b>{props.title}</b>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
