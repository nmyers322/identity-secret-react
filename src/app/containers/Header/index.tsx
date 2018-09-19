import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { withAuth } from '@okta/okta-react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {
    APP_TITLE
} from 'app/constants';
import { Auth } from '../../App';

export interface HeaderProps extends RouteComponentProps<any> {
    auth: Auth,
    styles: object
}

export interface HeaderState {
    authenticated: boolean,
    anchorEl: HTMLElement,
    drawerOpen: boolean
}

const styles = {
      root: {
          flexGrow: 1,
      },
      drawerList: {
          width: 250
      },
      grow: {
          flexGrow: 1,
      },
      loginButton: {
          cursor: "pointer"
      },
      menuButton: {
          marginLeft: -12,
          marginRight: 20,
      },
  };

export default withAuth(class Header extends React.Component<HeaderProps, HeaderState> {
    constructor(props: HeaderProps, context: any) {
        super(props, context);
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleMenu = this.handleMenu.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.state = {
            authenticated: false,
            anchorEl: null,
            drawerOpen: false
        };
    }

    async componentDidMount() {
        await this.checkAuthentication();
    }

    async componentDidUpdate() {
        await this.checkAuthentication();
    }

    async checkAuthentication() {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated) {
            this.setState({ authenticated: authenticated });
        }
    }

    handleMenu(event) {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose() {
        this.setState({ anchorEl: null });
    };

    async login() {
        this.props.auth.login('/');
    };

    async logout() {
        this.handleClose();
        this.props.auth.logout('/');
    }

    toggleDrawer() {
        this.setState({ drawerOpen: !this.state.drawerOpen });
    }

    render() {
        const { authenticated, anchorEl, drawerOpen } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div style={styles.root}>
                <Drawer
                    anchor={"left"}
                    open={drawerOpen}
                    onClose={this.toggleDrawer}
                >
                    <div style={styles.drawerList}>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <MenuIcon />
                                </ListItemIcon>
                                <ListItemText primary="Click here" />
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <MenuIcon />
                                </ListItemIcon>
                                <ListItemText primary="Click here" />
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton 
                            style={styles.menuButton} 
                            color="inherit" 
                            aria-label="Menu"
                            onClick={this.toggleDrawer}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" style={styles.grow}>
                            { APP_TITLE }
                        </Typography>
                        { authenticated && (
                            <div>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                    <MenuItem onClick={this.logout}>Log out</MenuItem>
                                </Menu>
                            </div>
                        )}
                        { !authenticated && (
                            <div>
                                <Typography variant="title" color="inherit" style={styles.loginButton} onClick={this.login}>
                                    Log in
                                </Typography>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
});
