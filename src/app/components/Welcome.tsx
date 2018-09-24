import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Header from '../containers/Header';
import { Auth } from '../App';
import { withAuth } from '@okta/okta-react';
import { inject, observer } from 'mobx-react';
import { STORE_ROUTER } from '../constants';
import { RouterStore } from '../stores';

const style = {
    jumbotron: {
        width: "100%",
        backgroundColor: "#dddddd",
        paddingTop: "50px",
        paddingBottom: "50px"
    },
    loginButton: {
        cursor: "pointer"
    },
};

export interface WelcomeProps {
    auth: Auth
}

export interface WelcomeState {
}

export default inject(STORE_ROUTER)(observer(withAuth(class Welcome extends React.Component<WelcomeProps, WelcomeState> {
    constructor(props, context) {
        super(props);
        this.checkAuthentication = this.checkAuthentication.bind(this);
    }

    async componentDidMount() {
        await this.checkAuthentication();
    }

    async componentDidUpdate() {
        await this.checkAuthentication();
    }

    async checkAuthentication() {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated) {
            const router = this.props[STORE_ROUTER] as RouterStore;
            router.push('/ids');
        }
    }

    render() {
        return (
            <div>
                <Header />
                <div style={style.jumbotron}>
                    <Typography variant="display3" color="primary" align="center">
                        Welcome
                    </Typography>
                </div>
            </div>
        );
    }
})));