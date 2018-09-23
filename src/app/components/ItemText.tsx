import * as React from 'react';

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

        return (
            <div>
                { this.props.text }
            </div>
        );
    }
}

export default ItemText;
