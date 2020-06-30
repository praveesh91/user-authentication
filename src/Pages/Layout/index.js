import React,{useState, useEffect} from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import HomeIcon from "@material-ui/icons/Home";
import BuildIcon from '@material-ui/icons/Build';
import BarChartIcon from '@material-ui/icons/BarChart';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import NavLink from "./NavLink";
import Grid from '@material-ui/core/Grid';

import { Router, Route, Link } from 'react-router-dom';

import { history, Role } from '../../_helpers';
import { authenticationService } from '../../_services';
import { PrivateRoute } from '../../_components';
import { HomePage } from '../../HomePage';
import { AdminPage } from '../../AdminPage';
import { LoginPage } from '../../LoginPage';



const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});

function MainLayout(props) {
  const { classes, children } = props;

  const [isAdmin, setisAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    authenticationService.currentUser.subscribe(x => this.setState({
        currentUser: x,
        isAdmin: x && x.role === Role.Admin
    }));
  }, [])

  const logout = () => {
      authenticationService.logout();
      history.push('/login');
  }


  return (
    <div className={classes.root}>
      {currentUser &&
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              {isAdmin ? <h3>Admin User</h3> : <h3>Normal User</h3>}
            </Typography>
            <div style={{ display: "flex", flex: 1 }} />
              {isAdmin ? <h3>Hello, Admin</h3> : <h3>Hello, User</h3>}
            <Typography>Hello, User</Typography>
          </Toolbar>
        </AppBar>
      }
      {currentUser &&
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
        {isAdmin ? <NavLink activeOnlyWhenExact to="/" icon={HomeIcon}>
            Admin
          </NavLink>: 'null'}
          <NavLink to="/rockets" icon={AirplanemodeActiveIcon}>
            Rockets
          </NavLink>
          <NavLink to="/mission" icon={BuildIcon}>
            Missions
          </NavLink>
          <NavLink to="/stat" icon={BarChartIcon}>
            Stats
          </NavLink>
        </List>
      </Drawer>
    }
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container>
        {children}
        </Grid>
      </main>
    </div>
  );
}

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MainLayout);
