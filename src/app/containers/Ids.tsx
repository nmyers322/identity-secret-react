import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { IdStore } from 'app/stores';
import ItemText from '../components/ItemText';
import { STORE_ID } from 'app/constants';
import Header from './Header';
import BottomNav from '../components/BottomNav';

export interface IdsProps extends RouteComponentProps<any> {
    /** MobX Stores will be injected via @inject() **/
    // [STORE_GENERIC]: GenericStore;
}

export interface IdsState {
}

@inject(STORE_ID)
@observer
export class Ids extends React.Component<IdsProps, IdsState> {
    constructor(props: IdsProps, context: any) {
        super(props, context);
        this.state = { };
    }

    render() {
        const idStore = this.props[STORE_ID] as IdStore;

        return (
            <div>
                <Header />
                { idStore.itemTexts.map((item: string) => (
                    <ItemText text={item} bold={true} />
                )) } 
                <BottomNav />
            </div>
        );
    }
}
