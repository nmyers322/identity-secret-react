import * as React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import IdsIcon from '@material-ui/icons/AccountCircle';
import AttributesIcon from '@material-ui/icons/Assignment';
import RequestsIcon from '@material-ui/icons/SwapHorizontalCircle';
import { withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import { RouterStore } from 'app/stores';
import { STORE_ROUTER } from 'app/constants';

const StyledBottomNavigation = withStyles({
    root: {
        position: "fixed",
        bottom: "10px",
        width: "100%",
        backgroundColor: "#FFFFFF"
    }
})(BottomNavigation);

export interface BottomNavProps {
};

export interface BottomNavState {
    value: number
};

@inject(STORE_ROUTER)
@observer
export class BottomNav extends React.Component<BottomNavProps, BottomNavState> {

    routes: object;

    constructor(props?: BottomNavProps, context?: any) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: 0
        };
        this.routes = {
            0: "ids",
            1: "attributes",
            2: "requests"
        }
    }

    handleChange = (event, value) => {
        const router = this.props[STORE_ROUTER] as RouterStore;
        this.setState({ value });
        router.push(this.routes[value], );
    }

    render() {
        let { value } = this.state;
        return (
            <StyledBottomNavigation
                onChange={this.handleChange}
                showLabels
                value={value}>
                <BottomNavigationAction label="IDs" icon={<IdsIcon />} />
                <BottomNavigationAction label="Attributes" icon={<AttributesIcon />} />
                <BottomNavigationAction label="Requests" icon={<RequestsIcon />} />
            </StyledBottomNavigation>
        );
    }
}

export default BottomNav;
