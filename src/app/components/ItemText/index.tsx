import * as React from 'react';
import * as classNames from 'classnames';
import * as style from './style.css';

export interface ItemTextProps {
    bold?: boolean,
    text: string
}

export interface ItemTextState {
}

export class ItemText extends React.Component<ItemTextProps, ItemTextState> {
    constructor(props?: ItemTextProps, context?: any) {
        super(props, context);
        this.state = {
        
        };
    }

    render() {
        const classes = classNames(
            {
                [style.bold]: this.props.bold
            },
            style.normal
        );

        return (
            <div className={classes}>
                { this.props.text }
            </div>
        );
    }
}

export default ItemText;
