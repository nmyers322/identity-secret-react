import * as React from 'react';
import * as style from './style.css';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { IdStore } from 'app/stores';
import ItemText from '../../components/ItemText';
import { STORE_ID } from 'app/constants';

export interface IdsContainerProps extends RouteComponentProps<any> {
    /** MobX Stores will be injected via @inject() **/
    // [STORE_GENERIC]: GenericStore;
}

export interface IdsContainerState {
}

@inject(STORE_ID)
@observer
export class IdsContainer extends React.Component<IdsContainerProps, IdsContainerState> {
    constructor(props: IdsContainerProps, context: any) {
        super(props, context);
        this.state = { };
    }

    render() {
        const idStore = this.props[STORE_ID] as IdStore;

        return (
            <div className={style.normal}>
                { idStore.itemTexts.map((item: string) => (
                    <ItemText text={item} bold={true} />
                )) } 
            </div>
        );
    }
}
