import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Router, Route, Switch } from 'react-router';
import { Ids } from 'app/containers/Ids';
import Welcome from 'app/components/Welcome';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import { CLIENT_ID, ORG_URL } from './constants';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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
  typography: {
      fontFamily: "Noto Serif KR"
  }
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

// render react DOM
export const App = hot(module)(({ history }) => (
    <div className="App">
        <MuiThemeProvider theme={theme}>
            <Router history={history}>
                <Security {...securityConfig}>
                    <Switch>
                        <Route path="/" exact={true} component={Welcome} />
                        <SecureRoute path="/ids" component={Ids} />
                        <Route path="/implicit/callback" component={ImplicitCallback} />
                    </Switch>
                </Security>
            </Router>
        </MuiThemeProvider>
        { renderDevTool() }
    </div>
));