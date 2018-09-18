import { observable } from 'mobx';

export class GenericModel {
    @observable public text: string;

    constructor(text: string) {
        this.text = text;
    }
}

export default GenericModel;
