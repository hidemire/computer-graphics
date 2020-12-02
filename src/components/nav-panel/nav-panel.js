import React, { useState, memo } from 'react';
import {
  Divider,
  Drawer,
  Hidden,
  List,
  ListItemText,
  ListItemIcon,
  ListItem,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import {
  HelpOutline as HelpOutlineIcon,
  Assignment as AssignmentIcon,
  AcUnit as AcUnitIcon,
  ThreeSixty as ThreeSixtyIcon,
  ColorLens as ColorLensIcon,
} from '@material-ui/icons';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  active: {
    backgroundColor: theme.palette.action.selected,
  },
}));

const tabs = [
  {
    name: 'Інфо',
    items: [
      {
        name: 'Вступ',
        path: '/introduction',
        icon: <AssignmentIcon />,
      },
      {
        name: 'Фрактали',
        path: '/fractals/help',
        icon: <HelpOutlineIcon />,
      },
      {
        name: 'Колірні моделі',
        path: '/color-model/help',
        icon: <HelpOutlineIcon />,
      },
      {
        name: 'Рух',
        path: '/movement/help',
        icon: <HelpOutlineIcon />,
      },
    ],
  },
  {
    name: 'Playgrounds',
    items: [
      {
        name: 'Фрактали',
        path: '/fractals',
        icon: <AcUnitIcon />,
      },
      {
        name: 'Колірні моделі',
        path: '/color-model',
        icon: <ColorLensIcon />,
      },
      {
        name: 'Рух',
        path: '/movement',
        icon: <ThreeSixtyIcon />,
      },
    ],
  },
];

function NavPanel({ window }) {
  const classes = useStyles();
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      {tabs.map(({ name, items }, index) => (
        <>
          <List key={name}>
            {items.map(({ name: itemName, icon, path }) => (
              <ListItem
                button
                key={itemName}
                component={NavLink}
                to={path}
                activeClassName={classes.active}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={itemName} />
              </ListItem>
            ))}
          </List>
          { index + 1 !== tabs.length ? <Divider /> : null }
        </>
      ))}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default memo(NavPanel);
