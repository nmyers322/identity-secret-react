import * as React from 'react';
import * as style from './style.css';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { GenericStore, RouterStore } from 'app/stores';
import ItemText from '../../components/ItemText';
import {
    STORE_GENERIC,
    STORE_ROUTER
} from 'app/constants';

export interface GenericContainerProps extends RouteComponentProps<any> {
    /** MobX Stores will be injected via @inject() **/
    // [STORE_ROUTER]: RouterStore;
    // [STORE_GENERIC]: GenericStore;
}

export interface GenericContainerState {
}

@inject(STORE_GENERIC, STORE_ROUTER)
@observer
export class GenericContainer extends React.Component<GenericContainerProps, GenericContainerState> {
    constructor(props: GenericContainerProps, context: any) {
        super(props, context);
        this.state = { };
    }

    componentWillMount() {
        this.checkLocationChange();
    }

    componentWillReceiveProps(nextProps: GenericContainerProps, nextContext: any) {
        this.checkLocationChange();
    }

    checkLocationChange() {
        const router = this.props[STORE_ROUTER] as RouterStore;
        /* Possibly update the state based on router.location */
        console.log("Currently on: " + router.location.pathname.toString());
    }

    render() {
        const genericStore = this.props[STORE_GENERIC] as GenericStore;
        const { children } = this.props;

        return (
            <div className={style.normal}>
                { genericStore.itemTexts.map((item: string) => (
                    <ItemText text={item} bold={true} />
                )) }
                {children}
            </div>
        );
    }
}
