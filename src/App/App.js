import React from 'react';
import { Router, Route, Link } from 'react-router-dom';

import { history, Role } from '../_helpers';
import { authenticationService } from '../_services';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { AdminPage } from '../AdminPage';
import { LoginPage } from '../LoginPage';
import { Home, Missions, Stats, Rocket } from "../Pages/index";

import Layout from '../Pages/Layout/index'
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
import NavLink from "../Pages/Layout/NavLink";
import Grid from '@material-ui/core/Grid';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isAdmin: false
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({
            currentUser: x,
            isAdmin: x && x.role === Role.Admin
        }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }



    



    render(props) {
        const { classes, children } = this.props;
        const { currentUser, isAdmin } = this.state;
        console.log(currentUser)
        console.log(isAdmin)
        return (
            <Router history={history}>
                <div>
                {/* <div>
                    {currentUser &&
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <div className="navbar-nav">
                                <Link to="/" className="nav-item nav-link">Home</Link>
                                {isAdmin && <Link to="/admin" className="nav-item nav-link">Admin</Link>}
                                <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                            </div>
                        </nav>
                    }
                    <div className="jumbotron">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 offset-md-3">
                                    <PrivateRoute exact path="/" component={HomePage} />
                                    <PrivateRoute path="/admin" roles={[Role.Admin]} component={AdminPage} />
                                    <Route path="/login" component={LoginPage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

<div>
      {currentUser &&
        <AppBar position="fixed" style={{ width: "85%", marginLeft: '240px' }} >
          <Toolbar>
            <Typography variant="h4" color="inherit" noWrap>
              {isAdmin ? <h3>Admin User</h3> : <h3>Normal User</h3>}
            </Typography>
            <div style={{ display: "flex", flex: 1 }} />
              {isAdmin ? <Typography variant="h6">Hello, Admin</Typography> : <Typography variant="h6">Hello, User</Typography>}
              <a style={{paddingLeft:'20px'}} onClick={this.logout}>Logout</a>
          </Toolbar>
        </AppBar>
      }
      {currentUser &&
      <Drawer
        style={{ width: "240px", flexShrink: 0 }}
        variant="permanent"
        // classes={{
        //   paper: classes.drawerPaper
        // }}
        anchor="left"
      >
        <div />
        <Divider />
        <List>
        {isAdmin ? <NavLink to="/rockets" icon={AirplanemodeActiveIcon}>
            Rockets
          </NavLink>: ''}
          <NavLink to="/mission" icon={BuildIcon}>
            Missions
          </NavLink>
          <NavLink to="/stat" icon={BarChartIcon}>
            Stats
          </NavLink>
        </List>
      </Drawer>
    }
      <main>
        {/* <div className={classes.toolbar} /> */}
        <Grid container>
        {children}
        </Grid>
      </main>
    </div>
    <main>
        <Grid container className="outerContainer">

            <PrivateRoute exact path="/" component={HomePage} />
            <PrivateRoute path="/admin" roles={[Role.Admin]} component={AdminPage} />
            <Route path="/login" component={LoginPage} />
            <Route exact path="/home"  component={Home} />
            <Route path="/mission" component={Missions} />
            <Route path="/rockets"  component={Rocket} />
            <Route path="/stat" component={Stats} />
        </Grid>
    </main>
    </div>
            </Router>
        );
    }
}

export default App ; 