import React from 'react';
import { makeStyles } from '@material-ui/core';

import NavPanel from 'components/nav-panel/nav-panel';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function BaseTemplate({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NavPanel />
      <main className={classes.content}>
        {children}
      </main>
    </div>
  );
}

export default BaseTemplate;
