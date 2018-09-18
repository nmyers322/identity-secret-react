import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Router, Route, Switch } from 'react-router';
import { GenericContainer } from 'app/containers/GenericContainer';

const renderDevTool = () => {
    if (process.env.NODE_ENV !== 'production') {
        const DevTools = require('mobx-react-devtools').default;
        return <DevTools />;
    }
};

// render react DOM
export const App = hot(module)(({ history }) => (
    <div className="App">
        {/* Header could go here */}
        <Router history={history}>
            <Switch>
                <Route path="/" component={GenericContainer} />
            </Switch>
        </Router>
        {/* Footer could go here */}
        { renderDevTool() }
    </div>
));