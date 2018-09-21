import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Router, Route, Switch } from 'react-router';
import { GenericContainer } from 'app/containers/GenericContainer';
import { Security, ImplicitCallback } from '@okta/okta-react';
import { CLIENT_ID, ORG_URL } from './constants';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Header from './containers/Header';

const securityConfig = {
  issuer: ORG_URL + '/oauth2/default',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: CLIENT_ID
};

const theme = createMuiTheme({
  palette: {
    primary: {
        main: "#004d40"
    },
    secondary: {
        main: "#f5f5f5"
    }
  },
});

export interface Auth {
  login(redirectUri: string): {};
  logout(redirectUri: string): {};
  isAuthenticated(): boolean;
  getAccessToken(): string;
}

const renderDevTool = () => {
    if (process.env.NODE_ENV !== 'production') {
        //const DevTools = require('mobx-react-devtools').default;
        //return <DevTools />;
    }
};

const topSpacerStyles = {
    height: 64
}

// render react DOM
export const App = hot(module)(({ history }) => (
    <div className="App">
        <MuiThemeProvider theme={theme}>
            <Router history={history}>
                <Security {...securityConfig}>
                    <Header />
                    <div className="TopSpacer" style={topSpacerStyles} />
                    <Switch>
                        <Route path="/" exact={true} component={GenericContainer} />
                        <Route path="/implicit/callback" component={ImplicitCallback} />
                    </Switch>
                </Security>
            </Router>
        </MuiThemeProvider>
        { renderDevTool() }
    </div>
));