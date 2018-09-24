import * as React from 'react';
import { IdModel } from '../models/IdModel';

export interface IdProps {
    id: IdModel
}

export interface IdState {
}

export class Id extends React.Component<IdProps, IdState> {
    constructor(props?: IdProps, context?: any) {
        super(props, context);
    }

    render() {
        return (
            <div>
                { this.props.id.id }
            </div>
        );
    }
}

export default Id;
