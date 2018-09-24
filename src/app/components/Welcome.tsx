import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Header from '../containers/Header';

const style = {
    jumbotron: {
        width: "100%",
        backgroundColor: "#004d40",
        paddingTop: "50px",
        paddingBottom: "50px"
    },
    loginButton: {
        cursor: "pointer"
    },
};

export interface WelcomeProps {
}

export interface WelcomeState {
}

export default class Welcome extends React.Component {
    constructor(props, context) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header />
                <div style={style.jumbotron}>
                    <Typography variant="display3" color="secondary" align="center">
                        Welcome
                    </Typography>
                </div>
            </div>
        );
    }
}